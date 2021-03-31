<template>
  <iCard class="outputRecord" tabCard collapse :title="$t('LK_LINGJIANCHANLIANGJILU')">
    <template v-slot:header-control>
      <iButton v-permission="PARTSPROCURE_OUTPUTPLAN_OUTPUTRECORD_UPDATE">{{$t('LK_GENGXINZHIXUNJIACHANLIANG')}}</iButton>
    </template>
    <div class="body">
      <tablelist
        class="table"
        index
        :tableData="tableListData" 
        :tableTitle="tableTitle" 
        :tableLoading="loading" />
      <iPagination
        class="pagination margin-top30"
        @size-change="handleSizeChange($event, getData)"
        @current-change="handleCurrentChange($event, getData)"
        background
        :current-page="page.size"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from '@/components'
import tablelist from '@/views/partsign/home/components/tableList'
import { getOutputPlan } from '@/api/partsprocure/editordetail'
import { pageMixins } from '@/utils/pageMixins'
import { outputRecordTableTitle as tableTitle } from './data'
import { cloneDeep } from 'lodash'

export default {
  components: { iCard, iButton, tablelist, iPagination },
  mixins: [ pageMixins ],
  props: {
    params: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      loading: false,
      tableTitle: cloneDeep(tableTitle),
      tableListData: [],
      multipleSelection: [],
      startYear: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true

      getOutputPlan({
        'partRecordPageReqDTO.current': this.page.currPage,
        'partRecordPageReqDTO.purchaseProjectId': this.params.purchasePrjectId,
        'partRecordPageReqDTO.size': this.page.pageSize,
        'partRecordPageReqDTO.year': this.startYear
      }).
        then(res => {
          if (res.data && res.data.partRecordResPageDTO) {
            if (Array.isArray(res.data.partRecordResPageDTO.data) && res.data.partRecordResPageDTO.data[0] && Array.isArray(res.data.partRecordResPageDTO.data[0].outputPlanList)) {
              this.tableTitle = cloneDeep(tableTitle)
              
              res.data.partRecordResPageDTO.data[0].outputPlanList.forEach((planData, index) => {
                this.tableTitle.splice(index, 0, { props: planData.year, name: planData.year, key: planData.year })
              })

              this.tableListData = res.data.partRecordResPageDTO.data.map(item => {
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
                  result[planData.year] = planData.output
                })

                return result
              })
            }

            this.page.totalCount = res.data.partRecordResPageDTO.total || 0
          }

          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    updateOutput() {
      if (this.multipleSelection.length !== 1) return iMessage.warn('请选择一条计划更新至询价产量')
      this.$emit('updateOutput', this.multipleSelection[0])
    },
    updateStartYear(startYear) {
      this.startYear = startYear
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.outputRecord {}
</style>