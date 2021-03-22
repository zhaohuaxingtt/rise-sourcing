<template>
  <div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <iButton @click="submit">提交</iButton>
          <iButton @click="recall">撤回</iButton>
        </div>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          :input-props="['pricing']"
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
import {tableTitle} from "./components/data";
import {pageMixins} from "@/utils/pageMixins";
import {getModelBudgetList, submitMoldBudget, cancelMoldBudget} from "@/api/partsrfq/editordetail";


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
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: []
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    //获取表格数据
    async getTableList() {
      const id = this.$route.query.id
      if (id) {
        this.tableLoading = true;
        try {
          const req = {
            rfqId: id
          }
          const res = await getModelBudgetList(req)
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
    async submit() {
      const req = {
        moldBudgetDTOs: this.selectTableData
      }
      const res = await submitMoldBudget(req)
      iMessage.success(res.desZh)
      this.getTableList()
    },
    async recall() {
      const moldBugetIds = this.selectTableData.map(item => {
        return item.id
      })
      const req = {moldBugetIds}
      const res = await cancelMoldBudget(req)
      iMessage.success(res.desZh)
      this.getTableList()
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    }
  }
}
</script>

<style scoped>

</style>