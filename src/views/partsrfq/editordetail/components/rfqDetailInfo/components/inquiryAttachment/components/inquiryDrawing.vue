<template>

  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">询价图纸</span>
      <div class="floatright">
        <iButton @click="download">下载</iButton>
      </div>
    </div>
    <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
        open-page-props="b"
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
        :page-size="page.page"
        :layout="page.layout"
        :current-page='page.size'
        :total="page.total"
    />
  </iCard>
</template>

<script>
import {iCard, iButton, iPagination} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {inquiryDrawingTableTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import {getInquiryDrawingTableList} from "@/api/partsrfq/editordetail";

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist
  },
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: inquiryDrawingTableTitle,
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
      getInquiryDrawingTableList().then((res) => {
        this.tableListData = res.data;
        this.tableLoading = false;
      });
    },
    download() {
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