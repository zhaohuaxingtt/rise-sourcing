<template>
  <div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">零件产量</span>
        <div class="floatright">
          <iButton @click="exports">导出</iButton>
        </div>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          :index="true"
          open-page-props="ninePartNum"
          @openPage="openPage"
          :openPageGetRowData="true"
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
  </div>
</template>

<script>
import {iCard, iButton, iPagination, iMessage} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {partsProductionTableTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import {getRfqDataList} from "@/api/partsrfq/home";
import {excelExport} from "@/utils/filedowLoad";

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
      tableTitle: partsProductionTableTitle,
      tableLoading: false,
      selectTableData: []
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
            findType: '05',
            rfqId: id,
            current: this.page.currPage,
            size: this.page.pageSize,
          }
        }
        try {
          const res = await getRfqDataList(req)
          this.tableListData = res.data.partOutputPlanVO.partOutputPlanVOList;
          this.page.currPage = res.data.partOutputPlanVO.pageNum
          this.page.pageSize = res.data.partOutputPlanVO.pageSize
          this.page.totalCount = res.data.partOutputPlanVO.total
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    exports() {
      if (this.selectTableData.length == 0)
        return iMessage.warn('请选择需要导出的数据')
      excelExport(this.selectTableData, this.tableTitle)
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    openPage(row) {
      const rfqId = this.$route.query.id;
      const rfqPlanId = row.rfqPlanId;
      const purchasePrjectId = row.purchaseTargetId;
      const partNum = row.ninePartNum
      this.$router.push({
        path: `/partsprocure/editordetail?partNum=${partNum}&tab=outputPlan`
      })
    }
  }
}
</script>

<style scoped>

</style>