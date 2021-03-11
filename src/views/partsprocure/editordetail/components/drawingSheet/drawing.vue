<template>
  <iCard class="outputRecord" tabCard title="图纸">
    <template v-slot:header-control>
      <iButton>删除</iButton>
      <iButton>上传附件</iButton>
    </template>
    <div class="body">
      <tableList
        class="table"
        index
        indexLabel="编号" 
        :tableData="tableListData" 
        :tableTitle="tableTitle" 
        :tableLoading="loading">
        <template #a="scope">
          <span class="link-underline" @click="preview">{{ scope.row.a }}</span>
        </template>
      </tableList>
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
import tableList from '@/views/partsign/editordetail/components/tableList'
import { pageMixins } from '@/utils/pageMixins'
import { tableTitle } from './data'

export default {
  components: { iCard, iButton, tableList, iPagination },
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
.outputRecord {}
</style>