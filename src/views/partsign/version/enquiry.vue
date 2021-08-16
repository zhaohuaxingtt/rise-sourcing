<template>
  <iPage class="version">
    <iCard class="card">
      <div class="header clearFloat">
        <span class="title">{{ language('LK_QUANBUBANBEN','全部版本') }}</span>
        <div class="control">
          <iButton v-permission="PARTSIGN_EDITORDETAIL_ENQUIRY_VERSION_DOWNLOAD" @click="download">{{ language('LK_XIAZAI','下载') }}</iButton>
        </div>
      </div>
      <div class="body margin-top25">
        <tableList index height="100%" class="table" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange">
          <template #version="scope">
            <span class="link-underline" @click="volume(scope.row)">{{ scope.row.version }}</span>
          </template>
          <template #createDate="scope">
            <span>{{ scope.row.createDate | dateFilter }}</span>
          </template>
        </tableList>
      </div>
      <div class="footer">
        <iPagination v-update
          class="pagination"
          @size-change="handleSizeChange($event, getAttachmentVersion)"
          @current-change="handleCurrentChange($event, getAttachmentVersion)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="tableListData ? tableListData.length : 0" />
      </div>
    </iCard>
    <enquiryDialog :visible.sync="enquiryVisible" :params="enquiryParams" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iMessage } from 'rise'
import tableList from '@/views/partsign/editordetail/components/tableList'
import enquiryDialog from '@/views/partsign/editordetail/components/enquiryDialog'
import { getAttachmentVersion, getAttachment } from '@/api/partsign/editordetail'
import { enquiryTableTitle as tableTitle } from './components/data'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'
import { downloadFile, downloadUdFile } from '@/api/file'

export default {
  components: { iPage, iCard, iPagination, tableList, enquiryDialog, iButton },
  mixins: [ pageMixins, filters ],
  data() {
    return {
      tableTitle,
      tableListData: [],
      enquiryVisible: false,
      enquiryParams: {},
      purchasingRequirementTargetId: "",
      multipleSelection: []
    }
  },
  created() {
    this.purchasingRequirementTargetId = this.$route.query.purchasingRequirementTargetId
    this.getAttachmentVersion()
  },
  methods: {
    getAttachmentVersion() {
      this.loading = true
      getAttachmentVersion({
        currPage: this.page.currPage,
        pageSize: this.page.pageSize,
        status: "1",
        purchasingRequirementObjectId: this.purchasingRequirementTargetId
      })
        .then(res => {
          if (res.data.attachmentVersionVOS) {
            this.tableListData = Array.isArray(res.data.attachmentVersionVOS.tpRecordList) ? res.data.attachmentVersionVOS.tpRecordList : []
            this.page.totalCount = res.data.attachmentVersionVOS.totalCount || 0
          } else {
            this.tableListData = []
            this.page.totalCount = 0
          }
          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    volume(data) {
      this.enquiryVisible = true
      this.enquiryParams = { ...data, purchasingRequirementTargetId: this.purchasingRequirementTargetId, status: "1" }
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    async download() {
      if (this.multipleSelection.length !== 1) return iMessage.warn(this.language('LK_QINGXUANZHEYIGEXUYAOXIAZAIBANBEN','请选择一个需要下载的版本'))
      const data = this.multipleSelection[0]
      
      this.downLoading = true
      const infoRes = await getAttachment({
        version: data.version,
        currPage: 1,
        pageSize: 999999,
        status: "1",
        purchasingRequirementTargetId: data.purchasingRequirementTargetId
      })

      if (infoRes.code != 200) {
        this.downLoading = false
        return iMessage.error(`${ this.$i18n.locale === 'zh' ? infoRes.desZh : infoRes.desEn }`)
      }

      if(infoRes.data.attachmentVOS){
        const list = infoRes.data.attachmentVOS.tpRecordList
        if (list.length == 0) {
          this.downLoading = false
          return iMessage.error(this.language('LK_SUOXUANBANBENWUFUJIAN','所选版本无附件'))
        }

        // await downloadFile({
        //   applicationName: 'rise-procurereq-service',
        //   fileList: list.map(item => item.tpPartAttachmentName).join('&fileList=')
        // })
        await downloadUdFile(list.map(item => item.uploadId))

        this.downLoading = false
      } else {
        iMessage.error(this.language('LK_SUOXUANBANBENWUFUJIAN','所选版本无附件'))
        this.downLoading = false
      }
    },
    // back() {
    //   this.$router.go(-1)
    // }
  }
}
</script>

<style lang="scss" scoped>
.version {
  .card {
    height: 100%;

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
      height: calc(100vh - 300px);
    }

    .pagination {
      margin-top: 30px;
    }
  }
}
</style>