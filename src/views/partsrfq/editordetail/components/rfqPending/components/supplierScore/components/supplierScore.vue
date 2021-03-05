<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">供应商评分</span>
    </div>
    <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
        @openViewPage="openViewPage"
        @openEditPage="openEditPage"
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
import {iCard, iPagination} from "@/components";
import tablelist from './supplierScoreTableList'
import {supplierScoreTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import {getSupplierRatingAttachment} from "@/api/partsrfq/editordetail";

export default {
  components: {
    iCard,
    iPagination,
    tablelist
  },
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: supplierScoreTitle,
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
      getSupplierRatingAttachment().then((res) => {
        this.tableListData = res.data;
        this.tableLoading = false;
      });
    },
    deleteItems() {
    },
    uploadAttachments() {

    },
    openViewPage() {},
    openEditPage() {},
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
  }
}
</script>

<style scoped>

</style>