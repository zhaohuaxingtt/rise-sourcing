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
    <div class="header clearFloat">
      <span class="title">附件列表 （当前版本V1）</span>
      <div class="control">
        <iButton>查看全部版本</iButton>
        <iButton>导出</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tablelist class="table" :tableData="tableListData" :tableTitle="tableTitle" :loading="loading"></tablelist>
      <iPagination
        class="pagination"
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
  .header {
    position: relative;

    .title {
      font-size: 18px;
      font-weight: bold;
      color: #001847;
    }

    .control {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);

      .el-button {
        font-weight: bold;

        & + .el-button {
          margin-left: 30px;
        }
      }
    }
  }

  .body {
    .pagination {
      margin-top: 30px;
    }
  }
}
</style>