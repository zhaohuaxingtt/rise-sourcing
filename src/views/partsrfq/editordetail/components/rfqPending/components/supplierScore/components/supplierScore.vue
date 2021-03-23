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
        @openActionPropsPage="openActionPropsPage"
        @openMultiHeaderPropsPage="openMultiHeaderPropsPage"
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
    <!------------------------------------------------------------------------>
    <!--                  备注弹框                                          --->
    <!------------------------------------------------------------------------>
    <tpb-remarks
        v-model="dialogRemarks"
    />
  </iCard>
</template>

<script>
import {iCard, iPagination} from "@/components";
import tablelist from './supplierScoreTableList'
import {supplierScoreTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import tpbRemarks from './tpbRemarks'
import {getAllSupplier} from "@/api/partsrfq/editordetail";

export default {
  components: {
    iCard,
    iPagination,
    tablelist,
    tpbRemarks
  },
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: supplierScoreTitle,
      tableLoading: false,
      selectTableData: [],
      dialogRemarks: false
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
            rfqId: id
          }
          const res = await getAllSupplier(req)
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
    deleteItems() {
    },
    uploadAttachments() {

    },
    openActionPropsPage() {
      this.$router.push({
        path: '/partsrfq/editordetail/partScoring'
      })
    },
    openMultiHeaderPropsPage() {
      this.dialogRemarks = true
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
  }
}
</script>

<style scoped>

</style>