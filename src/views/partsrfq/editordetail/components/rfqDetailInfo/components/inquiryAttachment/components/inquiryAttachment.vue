<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">询价附件</span>
      <div class="floatright">
        <iButton @click="deleteItems">删除</iButton>
        <upload-button
            @uploadedCallback="uploadAttachments"
            :upload-button-loading="uploadAttachmentsButtonLoading"
            class="margin-left8 margin-right8"/>
        <iButton @click="notifyAllSuppliers">通知全部供应商</iButton>
        <iButton @click="notifySuppliersWhoHaveQuoted">通知已报价供应商</iButton>
      </div>
    </div>
    <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
        open-page-props="a"
        @openPage="handleOpenPage"
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
import {inquiryAttachmentTableTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import uploadButton from 'pages/partsrfq/components/uploadButton'
import {getRfqDataList} from "@/api/partsrfq/home";

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
      tableTitle: inquiryAttachmentTableTitle,
      tableLoading: false,
      selectTableData: [],
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
        const req = {
          otherInfoPackage: {
            findType: '03',
            rfqId: id,
            current: this.page.currPage,
            size: this.page.pageSize,
          }
        }
        try {
          const res = await getRfqDataList(req)
          this.tableListData = res.data;
          this.page.currPage = res.currPage
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.totalCount
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    deleteItems() {
    },
    uploadAttachments() {
      this.tableLoading = true
      this.uploadAttachmentsButtonLoading = true
      setTimeout(() => {
        iMessage.error('附件上传失败')
        this.tableLoading = false
        this.uploadAttachmentsButtonLoading = false
      }, 2000)
    },
    notifyAllSuppliers() {
    },
    notifySuppliersWhoHaveQuoted() {
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    handleOpenPage() {
    }
  }
}
</script>

<style scoped>

</style>