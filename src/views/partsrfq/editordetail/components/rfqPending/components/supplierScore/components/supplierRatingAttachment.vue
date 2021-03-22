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
        :hide-open-page="true"
        :index="true"
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
import {iCard, iButton, iPagination, iMessage} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {supplierRatingAttachmentTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import {getAllAnnex, deleteAnnex} from "@/api/partsrfq/editordetail";
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
      this.tableLoading = true;
      const id = this.$route.query.id
      if (id) {
        try {
          const req = {
            rfqId: id
          }
          const res = await getAllAnnex(req)
          this.tableListData = res.data;
          this.page.currPage = res.data.rfqCfPriceVO.pageNum
          this.page.pageSize = res.data.rfqCfPriceVO.pageSize
          this.page.totalCount = res.data.rfqCfPriceVO.total
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    async deleteItems() {
      const annexIds = this.selectTableData.map(item => {
        return item.id
      })
      const req = {annexIds}
      const res = await deleteAnnex(req)
      iMessage.success(res.desZh)
      this.getTableList()
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    uploadAttachments() {
      this.tableLoading = true
      this.uploadAttachmentsButtonLoading = true
      setTimeout(() => {
        iMessage.error('附件上传失败')
        this.tableLoading = false
        this.uploadAttachmentsButtonLoading = false
      }, 2000)
    }
  }
}
</script>

<style scoped>

</style>