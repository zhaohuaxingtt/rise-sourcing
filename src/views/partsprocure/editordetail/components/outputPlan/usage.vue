<template>
  <iCard class="usage" tabCard title="零件每车用量（当前版本：V1）">
    <div class="body">
      <tableList
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
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
  </iCard>
</template>

<script>
import { iCard, iPagination } from '@/components'
import tableList from '@/views/partsign/editordetail/components/tableList'
import { pageMixins } from '@/utils/pageMixins'
import { usageTableTitle as tableTitle } from './data'

export default {
  components: { iCard, tableList, iPagination },
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
.usage {
}
</style>