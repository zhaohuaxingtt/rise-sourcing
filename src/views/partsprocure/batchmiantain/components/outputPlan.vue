<template>
  <iCard class="outputPlan" title="零件产量计划" tabCard>
    <div class="body">
      <tablelist
        class="table"
        index
        :tableData="tableListData" 
        :tableTitle="tableTitle" 
        :tableLoading="loading" />
      <iPagination
        class="pagination margin-top30"
        @size-change="handleSizeChange($event, getUsage)"
        @current-change="handleCurrentChange($event, getUsage)"
        background
        :current-page="page.size"
        :page-sizes="page.pageSizes"
        :page-size="page.page"
        :layout="page.layout"
        :total="page.total" />
    </div>
  </iCard>
</template>

<script>
import { iCard, iPagination } from '@/components'
import tablelist from '@/views/partsign/home/components/tableList'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitle } from './data'

export default {
  components: { iCard, tablelist, iPagination },
  mixins: [ pageMixins ],
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.outputPlan {}
</style>