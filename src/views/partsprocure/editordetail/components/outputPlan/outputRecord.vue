<template>
  <iCard class="outputRecord" tabCard collapse :title="language('LK_LINGJIANCHANLIANGJILU','零件产量记录')">
    <template v-slot:header-control v-if="!disabled">
      <iButton v-permission.auto="PARTSPROCURE_OUTPUTPLAN_OUTPUTRECORD_UPDATE|更新至询价产量" @click="updateOutput">{{language('LK_GENGXINZHIXUNJIACHANLIANG','更新至询价产量')}}</iButton>
    </template>
    <div class="body">
      <tablelist
        class="table"
        radio
        index
        :tableData="tableListData" 
        :tableTitle="tableTitle" 
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange" />
      <iPagination
        v-update
        class="pagination margin-top30"
        @size-change="handleSizeChange($event, getData)"
        @current-change="handleCurrentChange($event, getData)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from 'rise'
import tablelist from '@/views/partsign/home/components/tableList'
import { getOutputPlanMarks } from '@/api/partsprocure/editordetail'
import { pageMixins } from '@/utils/pageMixins'
import { outputRecordTableTitle as tableTitle } from './data'
import { cloneDeep } from 'lodash'
import { partProjTypes } from '@/config'

export default {
  components: { iCard, iButton, tablelist, iPagination },
  mixins: [ pageMixins ],
  inject: ['getDisabled'],
  props: {
    params: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      partProjTypes,
      loading: false,
      tableTitle: cloneDeep(tableTitle),
      tableListData: [],
      multipleSelection: [],
      startYear: ''
    }
  },
  computed: {
    disabled() {
      return (typeof this.getDisabled === "function" && this.getDisabled()) || this.isOnlyPartNumChange
    },
    isOnlyPartNumChange() {
      return this.params.partProjectType == this.partProjTypes.JINLINGJIANHAOGENGGAI
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      getOutputPlanMarks({
        current: this.page.currPage,
        size: this.page.pageSize,
        'purchaseProjectId': this.params.id,
        'year': this.startYear
      }).
        then(res => {
          if (res.code == 200) {
            if (Array.isArray(res.data) && res.data && Array.isArray(res.data[0].outputPlanList)) {
              this.tableTitle = cloneDeep(tableTitle)
              
              res.data[0].outputPlanList.forEach((planData, index) => {
                this.tableTitle.splice(index, 0, { props: planData.year + "", name: planData.year + "", key: planData.year + "" })
              })

              this.tableListData = res.data.map(item => {
                const result = {
                  totalOutput: item.totalOutput,
                  versionNum: item.versionNum,
                  updateReason: item.updateReason,
                  outputPlanList: item.outputPlanList,
                  info: {
                    partNum: item.partNum
                  }
                }

                item.outputPlanList.forEach(planData => {
                  result[planData.year] = planData.outputInt
                })

                return result
              })
            }

            this.page.totalCount = res.total || 0
          }

          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    updateOutput() {
      if (this.multipleSelection.length !== 1) return iMessage.warn(this.language('LK_QINGXUANZHEYITIAOJIHUAGENGXIN','请选择一条计划更新至询价产量'))
      this.$emit('updateOutput', this.multipleSelection[0])
      console.log(this.tableListData)
    },
    updateStartYear(startYear) {
      this.startYear = startYear
      this.getData()
    },
    clearTime(){
      this.startYear = ''
    }
  }
}
</script>