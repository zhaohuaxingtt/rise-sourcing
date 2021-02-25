<template>
  <div class="usage">
    <div class="header">
      <iButton @click="version">查看全部版本</iButton>
    </div>
    <div class="body">
      <tablelist class="table" :tableData="tableListData" :tableTitle="tableTitle" :loading="loading"></tablelist>
      <el-pagination
        @size-change="handleSizeChange($event, getEnquiryList)"
        @current-change="handleCurrentChange($event, getEnquiryList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.total" />
    </div>
    </div>
  </div>
</template>

<script>
import { iButton } from '@/components'
import tablelist from './components/tablelist'
import { tableTitle } from './components/data'
import { getEnquiryList } from '@/api/partsign/editordetail'
import { pageMixins } from '@/utils/pageMixins'

export default {
  components: { tablelist, iButton },
  mixins: [ pageMixins ],
  data() {
    return {
      tableTitle,
      tableListData: [],
      loading: false
    }
  },
  created() {
    this.getEnquiryList()
  },
  methods: {
    getEnquiryList() {
      this.loading = true
      getEnquiryList({})
        .then(res => { 
          this.tableListData = res.data
          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    version() {
      window.open('/#/version', '_blank', 'width=900,height=600,menubar=no,toolbar=no,status=no,scrollbars=yes')
    }
  }
}
</script>

<style lang="scss" scoped>
.usage {
  .body {
    margin-top: 12px;
    
    .pagination {
      text-align: right;
      margin-top: 12px;
    }
  }
}
</style>