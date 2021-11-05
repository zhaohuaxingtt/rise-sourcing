<template>
  <iCard class="outputPlan tabCard" :title="language('LK_XUNJIACHANLIANGJIHUA','询价产量计划')" tabCard collapse v-permission="PARTSPROCURE_OUTPUTPLAN_OUTPUTRECORD_INDEXPAGE">
    <template v-slot:header-control v-if="!disabled">
      <iButton @click="handleSave" :loading="saveLoading" v-permission.auto="PARTSPROCURE_OUTPUTPLAN_OUTPUTRECORD_SAVE|保存">{{language('LK_BAOCUN','保存')}}</iButton>
    </template>
    <div class="body">
      <el-table
        :empty-text="language('LK_ZANWUSHUJU','暂无数据')"
        :data="tableListData"
        v-loading="loading"
        ref="table">
        <template v-for="(items, $index) in tableTitle">
          <el-table-column :key="$index" align="center" v-if="$index == 1" :prop="items.props" :label="language(items.key,items.name)">
            <template v-slot:header>
              <iSelect v-model="startYear" class="select" @change="handleStartYearChange" v-if="!disabled">
                <el-option
                  v-for="(item, $index) in years"
                  :key="$index"
                  :label="item"
                  :value="item" />
              </iSelect>
              <span v-else>{{ startYear }}</span>
            </template>
            <template v-slot="scope">
              <iInput class="input" v-model="scope.row[startYear]" v-if="!disabled" @input="handleInput($event, startYear)"/>
              <span v-else>{{ scope.row[startYear] }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="$index == 0" :key="$index" align="center" :label="language(items.key,items.name)">
            <template v-slot>
              <span>{{ language('LK_CHANLIANGPC','产量（PC）') }}</span>
            </template>
          </el-table-column>
          <el-table-column v-else :key="$index" align="center" :label="language(items.key,items.name)" :prop="items.props">
            <template v-slot="scope">
              <iInput class="input" v-if="!disabled" :disabled="$index == tableTitle.length - 1 || $index == tableTitle.length - 2" v-model="scope.row[items.props]" @input="handleInput($event, items.props)"/>
              <span v-else>{{ scope.row[items.props] }}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, iSelect, iInput, iMessage } from 'rise'
import { getOutputPlan, updateOutputPlan } from '@/api/partsprocure/editordetail'
import { outputPlanTableTitle as tableTitle } from './data'
import { cloneDeep } from 'lodash'

export default {
  components: { iCard, iButton, iSelect, iInput },
  inject: ['getDisabled'],
  props: {
    params: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      loading: false,
      saveLoading: false,
      years: [],
      startYear: '',
      tableTitle: cloneDeep(tableTitle),
      tableListData: [
        { pc: '产量（PC）', info: {} }
      ],
    }
  },
  computed: {
    disabled() {
      return typeof this.getDisabled === "function" &&this.getDisabled()
    }
  },
  created() {
    this.getData()
    this.years = []
  },
  methods: {
    getData() {
      this.loading = true
      getOutputPlan({
        'purchaseProjectId': this.params.id,
        'year': this.startYear || undefined
      })
        .then((res) => {
          this.tableTitle = cloneDeep(tableTitle)
          this.tableListData = [
            { pc: '产量（PC）', info: {} }
          ]

          if (res.data) {
            if (Array.isArray(res.data.outputPlanList)) {
              res.data.outputPlanList.forEach((planData, index) => {
                if (index === 0) {
                  this.startYear = planData.year
                  this.$emit('updateStartYear', this.startYear)
                } else {
                  this.tableTitle.splice(index, 0, { props: planData.year, name: planData.year, key: planData.year })
                }
                this.$set(this.tableListData[0], planData.year, planData.output)
                // this.tableListData[0][planData.year] = planData.output
                this.tableListData[0].info[planData.year] = planData
              })

              this.years = []
              for (let i = -9; i < 10; i ++) {
                this.years.push(+this.startYear + i)
              }
              this.$refs.table.doLayout()

              this.tableListData[0].totalOutput = res.data.totalOutput
              this.tableListData[0].versionNum = res.data.versionNum
              this.tableListData[0].outputPlanList = res.data.outputPlanList
              this.tableListData[0].info.partNumpartNum = res.data.partNum
              // this.tableListData[0].info.id = res.data.partRecordsResDTO.id
              // this.tableListData[0].info.output = res.data.partRecordsResDTO.output
              // this.tableListData[0].info.purchaseProjectId = res.data.partRecordsResDTO.purchaseProjectId
            }
          }
          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    updateOutput(data) {
      this.tableListData[0].outputPlanList.forEach(planData => {
        this.$set(this.tableListData[0], planData.year, data[planData.year])
      })

      this.tableListData[0].totalOutput = data.totalOutput
      this.tableListData[0].versionNum = data.versionNum
      this.tableListData[0].outputPlanList = data.outputPlanList
    },
    handleSave() {
      this.saveLoading = true
      updateOutputPlan({
          partOutputPlanInsertList: this.tableListData[0].outputPlanList,
          purchasingProjectId: this.params.id}).then(res => {
          if (res.code == 200) {
            iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            this.getData()
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
          
          this.saveLoading = false
        })
        .catch(() => this.saveLoading = false)
    },
    handleStartYearChange() {
      this.tableTitle = cloneDeep(tableTitle)
      this.years = []
      for (let i = -9; i < 10; i ++) {
        this.years.push(this.startYear + i)
        if (i >= 1) {
          this.tableTitle.splice(i, 0, { props: this.startYear + i, name: this.startYear + i })
        }
      }

      this.$refs.table.doLayout()
      this.$emit('updateStartYear', this.startYear)
      this.getData()
    },
    handleInput(val, key) {
      this.tableListData[0][key] = (val + '').replace(/\D/g, '').replace(/([0]*)(0|[1-9]+[0-9]+)/, "$2")
      if (Array.isArray(this.tableListData[0].outputPlanList)) {
        this.tableListData[0].totalOutput = this.tableListData[0].outputPlanList.reduce((acc, cur) => {
          if (key == cur.year) cur.output = this.tableListData[0][key]

          return window.math.add(acc, this.tableListData[0][cur.year])
        }, 0)
      }
    },
    clearTime(){
      this.startYear = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.outputPlan {
  .select {
    ::v-input {
      input {
        height: 30px!important;
      }
    }
  }

  .input {
    height: 30px!important;
    margin: 2px 0;

    ::v-deep input {
      height: 30px!important;
    }
  }
}
</style>