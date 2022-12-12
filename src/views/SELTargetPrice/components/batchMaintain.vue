<template>
  <iDialog
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    top="5vh"
  >
    <template slot="title">
      <div class="header">
        <span class="el-dialog__title">
          {{ $t("目标价维护") }}
        </span>

        <div class="float">
          <el-upload
            class="margin-left10 margin-right10"
            accept=".xlsx"
            style="display: inline-block"
            :http-request="upload"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <iButton :loading="uploadLoading">{{
              language("DAORUPILIANGWEIHU", "导入批量维护")
            }}</iButton>
          </el-upload>
          <i-button>导出</i-button>
          <i-button @click="submit">提交</i-button>
        </div>
      </div>
    </template>
    <iCard collapse class="margin-top20" title="待维护列表">
      <tableList
        indexKey
        :tableData="tableData"
        :tableTitle="toBeMaintainTableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
      <template #businessType="scope">
        {{getBusinessDesc(scope.row.businessType)}}
      </template>
      <template #shareTargetPrice="scope">
        <i-input v-model="scope.row['shareTargetPrice']" @change="changeEstimateShareAPrice(scope.row)"></i-input>
      </template>
      <template #targetPrice="scope">
        <i-input v-model="scope.row['targetPrice']"></i-input>
      </template>
      </tableList>
    </iCard>
    <iCard class="margin-top20" title="申请记录">
      <tableList
        indexKey
        :tableData="applyTableData"
        :tableTitle="applyTableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
      <template #businessType="scope">
        {{getBusinessDesc(scope.row.businessType)}}
      </template>
      </tableList>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
    <approval-dialog
      append-to-body
      :tableData="selectItems"
      :dialogVisible="approvalDialogVisible"
      @changeVisible="changeApprovalDialogVisible"
      @handleConfirm="handleConfirm"
    ></approval-dialog>
  </iDialog>
</template>

<script>
import { iPage, iCard, iDialog, iInput, iPagination, iButton, iMessage } from "rise";
import tableList from "./tableList";
import approvalDialog from "./approvalDialog";
import { pageMixins } from "@/utils/pageMixins";
import { toBeMaintainTableTitle, applyTableTitle } from "../maintenance/data";
import { applySelTargetPriceRecordList,submitSelTargetPrice } from "@/api/SELTargetPrice";
export default {
  mixins: [pageMixins],
  components: {
    iPage,
    iCard,
    iDialog,
    iInput,
    tableList,
    iPagination,
    iButton,
    approvalDialog,
  },
  props: {
    dialogVisible: { type: Boolean, default: false },
    tableData: { type: Array, default: () => [] },
    isMaintain: { type: Boolean, default: true },
    options: { type: Object, default: ()=>({}) },
    
  },
  data() {
    return {
      toBeMaintainTableTitle,
      applyTableTitle,
      applyTableData: [],
      selectItems:[],
      approvalDialogVisible: false,
    };
  },

  created() {
    console.log("res");
    this.getApplyTableData()
  },
  methods: {
    getStatus(status){
      return this.options.sel_target_price_status.find(item=>item.code==status)?.name || status
    },
    getBusinessDesc(type){
      return this.options.sel_target_business_type.find(item=>item.code==type)?.name || type
    },
    clearDialog() {
      this.$emit("changeVisible", false);
    },
    changeEstimateShareAPrice(row){
      this.$set(row,'estimateShareAPrice', (row.releaseOutput/row.shareTargetPrice) || 0)
    },
    handleSelectionChange(val){
      this.selectItems = val
    },
    changeApprovalDialogVisible(flag) {
      this.approvalDialogVisible = flag;
    },
    getApplyTableData() {
      let params = {
        current: this.page.currPage,
        rfqIds: this.tableData.map((item) => item.rfqId),
        size: this.page.pageSize,
      };
      applySelTargetPriceRecordList(params).then((res) => {
        if (res?.code == "200") {
          this.applyTableData = res.data;
          this.page.totalCount = res.total
        }
      });
    },
    // 导入批量维护
    upload(content) {
      const formData = new FormData();
      formData.append("file", content.file);
      // formData.append('applicationName', 'procurereq-service')
      // 上传接口 API
      let res = true;
    },
    // 提交
    submit() {
      
      if(this.selectItems.length==0) return iMessage.warn(
          this.language("ZHISHAOXUANZEYITIAOJILU", "至少选择一条记录")
        );
        if(this.isMaintain){
          submitSelTargetPrice({
            taskDTOList:this.selectItems
          }).then(res=>{
            if(res?.code=='200'){
              iMessage.success(res.desZh)
            }
          })
        }else{
          this.changeApprovalDialogVisible(true);
        }
    },
    // 提交通过
    handleConfirm() {},
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
}
</style>