<template>
  <iCard class="usage" tabCard title="零件每车用量" collapse>
    <template v-slot:header-control>
      <iButton>导出</iButton>
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
import { iCard, iButton, iPagination } from '@/components'
import tablelist from '@/views/partsign/home/components/tableList'
import { pageMixins } from '@/utils/pageMixins'
import { usageTableTitle as tableTitle } from './data'

export default {
  components: { iCard, iButton, tablelist, iPagination },
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