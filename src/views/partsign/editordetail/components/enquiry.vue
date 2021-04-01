<!--
 * @Author: your name
 * @Date: 2021-02-24 16:57:16
 * @LastEditTime: 2021-03-27 17:45:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\editordetail\components\enquiry\index.vue
-->
<template>
  <iCard class="enquiry">
    <div class="header clearFloat">
      <span class="title">{{ $t('LK_FUJIANLIEBIAO') }} （{{ $t('LK_DANGQIANBANBEN') }}: V1）</span>
      <div class="control">
        <iButton @click="version" v-permission="PARTSIGN_EDITORDETAIL_ENQUIRY_ALL">{{ $t('LK_CHAKANQUANBUBANBEN') }}</iButton>
        <iButton @click="download" v-permission="PARTSIGN_EDITORDETAIL_ENQUIRY_DOWNLOAD">{{ $t('LK_XIAZAI') }}</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tableList class="table" index :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange">
        <template #tpPartAttachmentName="scope">
          <span class="link-underline" @click="preview(scope.row)">{{ scope.row.tpPartAttachmentName }}</span>
        </template>
        <template #updateDate="scope">
          <span>{{ scope.row.updateDate | dateFilter }}</span>
        </template>
      </tableList>
      <iPagination
        class="pagination"
        @size-change="handleSizeChange($event, getInfoAnnexPage)"
        @current-change="handleCurrentChange($event, getInfoAnnexPage)"
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
import { getInfoAnnexPage } from '@/api/partsign/editordetail'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'
// import {download} from '@/api/taskcenter/home'
import { downloadFile } from "@/api/file";
export default {
  components: { iCard, iButton, iPagination, tableList },
  mixins: [ pageMixins, filters ],
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
    this.getInfoAnnexPage()
  },
  methods: {
    getInfoAnnexPage() {
      this.loading = true
      getInfoAnnexPage({
        currPage: this.page.currPage,
        pageSize: this.page.pageSize,
        purchasingRequirementTargetId: this.data.purchasingRequirementTargetId
      })
        .then(res => { 
          if(res.data){
            this.tableListData = res.data.tpRecordList
          }
          this.page.totalCount = res.data.totalCount || 0
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
    async download() {
      if (!this.multipleSelection.length) {
        iMessage.warn(this.$t('LK_QINGXUANZHEXUYAOXIAZHAIWENJIAN'))
      }

      downloadFile({
        applicationName: 'rise-procurereq-service',
        fileList: this.multipleSelection.map(item => item.tpPartAttachmentName).join('&fileList=')
      })
    },
    preview(row) {
      downloadFile({
        applicationName: 'rise-procurereq-service',
        fileList: row.tpPartAttachmentName
      })
    },
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