<!--
 * @Author: your name
 * @Date: 2021-02-24 16:57:16
 * @LastEditTime: 2021-02-26 14:56:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\editordetail\components\enquiry\index.vue
-->
<template>
  <div class="enquiry">
    <div class="header">
      <iButton>查看全部版本</iButton>
    </div>
    <div class="body">
      <tablelist class="table" :tableData="tableListData" :tableTitle="tableTitle" :loading="loading"></tablelist>
      <iPagination
        @size-change="handleSizeChange($event, getEnquiryList)"
        @current-change="handleCurrentChange($event, getEnquiryList)"
        background
        :current-page="page.size"
        :page-sizes="page.pageSizes"
        :page-size="page.page"
        :layout="page.layout"
        :total="page.total" />
    </div>
  </div>
</template>

<script>
import { iButton, iPagination } from '@/components'
import tablelist from './components/tablelist'
import { tableTitle } from './components/data'
import { getEnquiryList } from '@/api/partsign/editordetail'
import { pageMixins } from '@/utils/pageMixins'

export default {
  components: { tablelist, iButton, iPagination },
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
    }
  }
}
</script>

<style lang="scss" scoped>
.enquiry {
  .body {
    margin-top: 12px;

    .pagination {
      text-align: right;
      margin-top: 12px;
    }
  }
}
</style>