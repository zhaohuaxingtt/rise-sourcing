<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language('LK_GONGYINGSHANGPINGFENFUJIAN','供应商评分附件') }}</span>
      <div class="floatright" v-if="!disabled">
        <iButton @click="deleteItems" v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_PARTSCORING_DELETE|供应商评分附件-删除">
         {{ language('LK_SHANCHU','删除') }}
        </iButton>
        <upload-button
            @uploadedCallback="uploadAttachments"
            :upload-button-loading="uploadAttachmentsButtonLoading"
            class="margin-left8" v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_PARTSCORING_UPLOAD|供应商评分附件-上传附件"/>
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
        v-update
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
import {iCard, iButton, iPagination, iMessage, iMessageBox} from "rise";
import tablelist from 'pages/partsrfq/components/tablelist'
import {supplierRatingAttachmentTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import {getAllAnnex, deleteAnnex, uploadRfqAnnex} from "@/api/partsrfq/editordetail";
import uploadButton from 'pages/partsrfq/components/uploadButton'
import store from '@/store'
import {downloadFile, downloadUdFile} from "@/api/file";
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
  inject: ["getDisabled"],
  computed: {
    disabled() {
      return this.getDisabled()
    }
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
          const {code,data,total} = res;
          if(code==200 && data){
            this.tableListData = data;
            this.page.totalCount = total;
          }
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    deleteItems() {
      iMessageBox(
        this.language('LK_SHIFOUQUERENSHANCHU','是否确认删除?'), // 暂时处理
        this.language('LK_WENXINTISHI','温馨提示'),
        { confirmButtonText: this.language('LK_QUEDING','确定'), cancelButtonText: this.language('LK_QUXIAO','取 消') }
      ).then(async () => {
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
          fileName: data.name,
          fileSize: size,
          filePath: data.path,
          uploadId: data.id
        }
        const res = await uploadRfqAnnex(req)
        this.resultMessage(res)
        this.tableLoading = false
        this.uploadAttachmentsButtonLoading = false
        this.getTableList()
      }
    },
    async handleDownload(row) {
      // const req = {
      //   applicationName: 'rise',
      //   fileList: [row.fileName]
      // }
      // await downloadFile(req)
      await downloadUdFile(row.uploadId)
    }
  }
}
</script>

<style scoped>

</style>