<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ $t('LK_GONGYINGSHANGPINGFENFUJIAN') }}</span>
      <div class="floatright">
        <iButton @click="deleteItems" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_PARTSCORING_DELETE">
         {{ $t('LK_SHANCHU') }}
        </iButton>
        <upload-button
            @uploadedCallback="uploadAttachments"
            :upload-button-loading="uploadAttachmentsButtonLoading"
            class="margin-left8" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_PARTSCORING_UPLOAD"/>
      </div>
    </div>
    <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
        openPageProps="fileName"
        :openPageGetRowData="true"
        @openPage="handleDownload"
    ></tablelist>
    <!------------------------------------------------------------------------>
    <!--                  表格分页                                          --->
    <!------------------------------------------------------------------------>
    <iPagination
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page='page.currPage'
        :total="page.totalCount"
    />
  </iCard>
</template>

<script>
import {iCard, iButton, iPagination, iMessage, iMessageBox} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {supplierRatingAttachmentTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import {getAllAnnex, deleteAnnex, uploadRfqAnnex} from "@/api/partsrfq/editordetail";
import uploadButton from 'pages/partsrfq/components/uploadButton'
import store from '@/store'
import {downloadFile} from "@/api/file";
import {rfqCommonFunMixins} from "pages/partsrfq/components/commonFun";

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist,
    uploadButton
  },
  mixins: [pageMixins, rfqCommonFunMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: supplierRatingAttachmentTitle,
      tableLoading: false,
      selectTableData: [],
      dialogUploadAttachment: false,
      attachmentList: [],
      uploadAttachmentsButtonLoading: false
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    async getTableList() {
      const id = this.$route.query.id
      if (id) {
        this.tableLoading = true;
        try {
          const req = {
            fileType: 1,
            rfqId: id,
            userId: store.state.permission.userInfo.id
          }
          const res = await getAllAnnex(req)
          this.tableListData = res.records;
          this.page.currPage = res.current
          this.page.pageSize = res.size
          this.page.totalCount = res.total
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    deleteItems() {
      iMessageBox('是否确认删除?').then(async () => {
        const annexIds = this.selectTableData.map(item => {
          return item.id
        })
        const req = {annexIds}
        const res = await deleteAnnex(req)
        this.resultMessage(res)
        this.getTableList()
      })
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    async uploadAttachments(data, size) {
      const id = this.$route.query.id
      if (id) {
        this.tableLoading = true
        this.uploadAttachmentsButtonLoading = true
        const req = {
          rfqId: id,
          userId: store.state.permission.userInfo.id,
          fileType: 1,
          fileName: data.fileName,
          fileSize: size,
          filePath: data.filePath
        }
        const res = await uploadRfqAnnex(req)
        this.resultMessage(res)
        this.tableLoading = false
        this.uploadAttachmentsButtonLoading = false
        this.getTableList()
      }
    },
    async handleDownload(row) {
      const req = {
        applicationName: 'rise',
        fileList: [row.fileName]
      }
      await downloadFile(req)
    }
  }
}
</script>

<style scoped>

</style>