<template>
  <iCard class="outputRecord" tabCard>
    <template v-slot:header-control>
      <iButton @click="updateOutput" v-permission="PARTSPROCURE_EDITORDETAIL_OUTPUTPLAN_OUTPUTRECORD_UPDATE">{{ $t('LK_GENGXINZHIXUNJIACHANLIANG') }}</iButton>
    </template>
    <div class="body">
      <tableList
        class="table"
        index
        :indexLabel="$t('LK_BIANHAO')" 
        :tableData="tableListData" 
        :tableTitle="tableTitle" 
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange" />
      <iPagination
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
import { iCard, iButton, iPagination, iMessage } from '@/components'
import tableList from '@/views/partsign/editordetail/components/tableList'
import { getOutputPlan } from '@/api/partsprocure/editordetail'
import { pageMixins } from '@/utils/pageMixins'
import { outputRecordTableTitle as tableTitle } from './data'
import { cloneDeep } from 'lodash'

export default {
  components: { iCard, iButton, tableList, iPagination },
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
      multipleSelection: []
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
        'partRecordPageReqDTO.purchaseProjectId': '1374304053550661634',
        // this.params.purchasePrjectId,
        'partRecordPageReqDTO.size': this.page.pageSize
      }).
        then(res => {
          if (res.data && res.data.partRecordResPageDTO) {
            if (Array.isArray(res.data.partRecordResPageDTO.records) && res.data.partRecordResPageDTO.records[0] && Array.isArray(res.data.partRecordResPageDTO.records[0].outputPlanList)) {
              this.tableTitle = cloneDeep(tableTitle)
              
              res.data.partRecordResPageDTO.records[0].outputPlanList.forEach((planData, index) => {
                this.tableTitle.splice(index, 0, { props: planData.year, name: planData.year })
              })

              this.tableListData = res.data.partRecordResPageDTO.records.map(item => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.outputRecord {}
</style>