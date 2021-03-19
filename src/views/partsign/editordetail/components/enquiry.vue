<!--
 * @Author: your name
 * @Date: 2021-02-24 16:57:16
 * @LastEditTime: 2021-02-26 14:56:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\editordetail\components\enquiry\index.vue
-->
<template>
  <iCard class="enquiry">
    <div class="header clearFloat">
      <span class="title">附件列表 （当前版本V1）</span>
      <div class="control">
        <iButton @click="version">查看全部版本</iButton>
        <iButton @click="download">下载</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tableList class="table" index :tableData="data" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange">
        <template #a="scope">
          <span class="link-underline" @click="preview">{{ scope.row.a }}</span>
        </template>
        <template #c="scope">
          <span>{{ scope.row.c }}</span>
        </template>
      </tableList>
      <iPagination
        class="pagination"
        @size-change="handleSizeChange($event, getEnquiryList)"
        @current-change="handleCurrentChange($event, getEnquiryList)"
        background
        :current-page="page.size"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
    <!-- <volumeDialog :visible.sync="volumeVisible" /> -->
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from '@/components'
// import volumeDialog from './volumeDialog'
import tableList from './tableList'
import { enquiryTableTitle as tableTitle } from './data'
import { getEnquiryList } from '@/api/partsign/editordetail'
import { pageMixins } from '@/utils/pageMixins'

export default {
  components: { iCard, iButton, iPagination, tableList },
  mixins: [ pageMixins ],
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      loading: false,
      volumeVisible: false,
      multipleSelection: []
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
      // this.volumeVisible = true
      // this.$router.push({
      //   path:'/partsign/version'
      // })
      window.open('/#/partsign/version', '_blank')
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    download() {
      if (!this.multipleSelection.length) {
        iMessage.warn('请选择需要下载文件')
      }
    },
    preview() {},
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
    }
  }

  .body {
    .pagination {
      margin-top: 30px;
    }
  }
}
</style>