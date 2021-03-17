<template>

  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">询价附件</span>
      <div class="floatright">
        <iButton @click="deleteItems">删除</iButton>
        <upload-button @uploadedCallback="uploadAttachments" class="margin-left8 margin-right8"/>
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
import {getInquiryAttachmentTableList} from "@/api/partsrfq/editordetail";
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
      tableTitle: inquiryAttachmentTableTitle,
      tableLoading: false,
      selectTableData: []
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      this.tableLoading = true;
      getInquiryAttachmentTableList().then((res) => {
        this.tableListData = res.data;
        this.tableLoading = false;
      });
    },
    deleteItems() {
    },
    uploadAttachments() {
      this.tableLoading = true
      setTimeout(()=> {
        iMessage.error('附件上传失败')
        this.tableLoading =false
      },2000)
    },
    notifyAllSuppliers() {
    },
    notifySuppliersWhoHaveQuoted() {
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    handleOpenPage() {}
  }
}
</script>

<style scoped>

</style>