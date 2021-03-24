<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">供应商评分附件</span>
      <div class="floatright">
        <iButton @click="deleteItems">删除</iButton>
        <upload-button
            @uploadedCallback="uploadAttachments"
            :upload-button-loading="uploadAttachmentsButtonLoading"
            class="margin-left8"/>
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

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist,
    uploadButton
  },
  mixins: [pageMixins],
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
            rfqId: id,
            userId: 12321
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
        res.result ? iMessage.success(res.desZh) : iMessage.error(res.desZh)
        this.getTableList()
      })
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    async uploadAttachments(content) {
      const id = this.$route.query.id
      if (id) {
        this.tableLoading = true
        this.uploadAttachmentsButtonLoading = true
        const formData = new FormData()
        formData.append('file', content.file)
        formData.append('rfqId', id)
        formData.append('userId', 12321)
        const res = await uploadRfqAnnex(formData)
        res.result ? iMessage.success(res.desZh) : iMessage.error(res.desZh)
        this.tableLoading = false
        this.uploadAttachmentsButtonLoading = false
        this.getTableList()
      }
    },
    handleDownload(row) {
      const url = row.filePath
      const a = document.createElement('a');
      a.setAttribute('download', '')
      a.setAttribute('href', url);
      a.setAttribute('target', '_blank');
      a.click();
    }
  }
}
</script>

<style scoped>

</style>