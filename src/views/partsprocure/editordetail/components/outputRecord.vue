<template>
  <iCard class="outputRecord" tabCard>
    <template v-slot:header-control>
      <iButton>更新至询价产量</iButton>
    </template>
    <div class="body">
      <tablelist
        class="table" 
        :selection="false"
        indexLabel="编号" 
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
import { iCard, iButton, iPagination } from '@/components'
import tablelist from '@/views/partsign/home/components/tableList'
import { pageMixins } from '@/utils/pageMixins'
import { outputRecordTableTitle as tableTitle } from './data'

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
}
</script>

<style lang="scss" scoped>
.outputRecord {}
</style>