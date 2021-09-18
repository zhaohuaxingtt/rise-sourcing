<template>
  <div>
    <iCard v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_MOLDBUDGETAPPLICATION_INDEXPAGE">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <iButton @click="submit" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_MOLDBUDGETAPPLICATION_SUBMIT">{{ language('LK_TIJIAO','提交') }}</iButton>
          <iButton @click="recall" v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_MOLDBUDGETAPPLICATION_RECALL">{{ language('LK_CHEHUI','撤回') }}</iButton>
        </div>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          :input-props="['budget']"
          input-type="number"
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
  </div>
</template>

<script>
import {iCard, iButton, iPagination, iMessage} from 'rise';
import tablelist from 'pages/partsrfq/components/tablelist'
import {tableTitle} from "./components/data";
import {pageMixins} from "@/utils/pageMixins";
import {getModelBudgetList, patchMouldBudget, cancelMoldBudget} from "@/api/partsrfq/editordetail";
import store from '@/store'
import {rfqCommonFunMixins} from "pages/partsrfq/components/commonFun";

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist
  },
  mixins: [pageMixins, rfqCommonFunMixins],
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
            rfqId: id,
            userId: store.state.permission.userInfo.id
          }
          const res = await getModelBudgetList({
            currPage: this.page.currPage,
            pageSize: this.page.pageSize
          },
          [{ rfqIds: id }]
          )
          this.tableListData = res.data.records;
          // this.page.currPage = res.current
          // this.page.pageSize = res.size
          this.page.totalCount = res.data.total
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    async submit() {
      if(this.selectTableData.length == 0) {
        iMessage.warn(this.language('partsignLanguage.QingXuanZe','请选择'))
        return false
      }

      if (this.selectTableData.some(item => item.approvalStatus === "已提交" || item.approvalStatus === "submitted"))
        return iMessage.warn(this.language("QINGWUXUANZEYITIJIAODESHUJU", "请勿选择已提交的数据"))

      this.selectTableData = this.selectTableData.map(item => {
        item.approvalStatus = 'submitted'
        return item
      })
      const req = this.selectTableData
      const res = await patchMouldBudget({
        updateType: 1,
        mouldBudgetDTOS: req
      })
      this.resultMessage(res)
      this.getTableList()
    },
    async recall() {
      if(this.selectTableData.length == 0) {
        iMessage.warn(this.language('partsignLanguage.QingXuanZe','请选择'))
        return false
      }

      if (this.selectTableData.some(item => item.approvalStatus === "已撤销" || item.approvalStatus === "revoked"))
        return iMessage.warn(this.language("QINGWUXUANZEYICHEXIAODESHUJU", "请勿选择已撤销的数据"))

      this.selectTableData = this.selectTableData.map(item => {
        item.approvalStatus = 'revoked'
        return item
      })
      const req = this.selectTableData
      const res = await patchMouldBudget({
        updateType: 0,
        mouldBudgetDTOS: req
      })
      this.resultMessage(res)
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