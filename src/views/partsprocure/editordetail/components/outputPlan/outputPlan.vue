<template>
  <iCard class="outputPlan tabCard" title="询价产量计划" tabCard>
    <template v-slot:header-control>
      <iButton @click="handleSave" :loading="saveLoading" v-permission="PARTSPROCURE_EDITORDETAIL_OUTPUTPLAN_OUTPUTRECORD_SAVE">保存</iButton>
    </template>
    <div class="body">
      <tableList
        class="table"
        :selection="false"
        :tableData="tableListData" 
        :tableTitle="tableTitle" 
        :tableLoading="loading" />
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton } from '@/components'
import tableList from '@/views/partsign/editordetail/components/tableList'
import { getOutputPlan, updateOutputPlan } from '@/api/partsprocure/editordetail'
import { outputPlanTableTitle as tableTitle } from './data'
import { cloneDeep } from 'lodash'
import { iMessage } from '../../../../../components'

export default {
  components: { iCard, iButton, tableList },
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
      tableTitle: cloneDeep(tableTitle),
      tableListData: [
        { pc: '产量（PC）', info: {} }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      getOutputPlan({
        'partOutputPlanReqDTO.purchaseProjectId': '1374304053550661634'
        // this.params.purchasePrjectId
      })
        .then((res) => {
          this.tableTitle = cloneDeep(tableTitle)
          this.tableListData = [
            { pc: '产量（PC）', info: {} }
          ]

          if (res.data && res.data.partRecordsResDTO) {
            if (Array.isArray(res.data.partRecordsResDTO.outputPlanList)) {
              res.data.partRecordsResDTO.outputPlanList.forEach((planData, index) => {
                this.tableTitle.splice(1 + index, 0, { props: planData.year, name: planData.year })
                this.tableListData[0][planData.year] = planData.output
                this.tableListData[0].info[planData.year] = planData
              })

              this.tableListData[0].totalOutput = res.data.partRecordsResDTO.totalOutput
              this.tableListData[0].versionNum = res.data.partRecordsResDTO.versionNum
              this.tableListData[0].outputPlanList = res.data.partRecordsResDTO.outputPlanList
              this.tableListData[0].info.partNumpartNum = res.data.partRecordsResDTO.partNum
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
      this.tableTitle = cloneDeep(tableTitle)
      this.tableListData = [
        { pc: '产量（PC）', info: this.tableListData[0].info }
      ]
      
      data.outputPlanList.forEach((planData, index) => {
        this.tableTitle.splice(1 + index, 0, { props: planData.year, name: planData.year })
        this.tableListData[0][planData.year] = planData.output
        this.tableListData[0].info[planData.year] = planData
      })

      this.tableListData[0].totalOutput = data.totalOutput
      this.tableListData[0].versionNum = data.versionNum
      this.tableListData[0].outputPlanList = data.outputPlanList
    },
    handleSave() {
      this.saveLoading = true
      updateOutputPlan({
        partOutputPlanInsertFacadeDTOS: this.tableListData[0].outputPlanList
      })
        .then(res => {
          if (res.code == 200) {
            iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            this.getData()
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
          
          this.saveLoading = false
        })
        .catch(() => this.saveLoading = false)
    }
  }
}
</script>

<style lang="scss" scoped>
.outputPlan {
}
</style>