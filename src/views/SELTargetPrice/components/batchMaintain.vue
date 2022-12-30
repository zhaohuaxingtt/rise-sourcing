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
          >
            <iButton :loading="uploadLoading">{{
              language("DAORUPILIANGWEIHU", "导入批量维护")
            }}</iButton>
          </el-upload>
          <i-button @click="exportExcel">导出</i-button>
          <i-button @click="submit">提交</i-button>
        </div>
      </div>
    </template>
    <iCard collapse title="待维护列表">
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
      <!-----------目标价·分摊--------------------------->
      <template #shareTargetPrice="scope">
        <thousandsFilterInput
          class="thousandsFilterInput"
          :numProcessor="0"
          :inputValue="scope.row['shareTargetPrice']"
          @handleInput="handleInput($event,scope.row,'shareTargetPrice')"
        />
      </template>
      <!-----------目标价·一次性--------------------------->
      <template #targetPrice="scope">
        <thousandsFilterInput
          class="thousandsFilterInput"
          :numProcessor="0"
          :inputValue="scope.row['targetPrice']"
          @handleInput="handleInput($event,scope.row,'targetPrice')"
        />
      </template>
        <!-- 期望目标价·分摊 -->
        <template #expectedShareTargetPrice="scope">
          <span>{{ scope.row.expectedShareTargetPrice | thousandsFilter(0)}}</span>
        </template>
        <!-- 期望目标价·一次性 -->
        <template #expectedTargetPrice="scope">
          <span>{{ scope.row.expectedTargetPrice | thousandsFilter(0)}}</span>
        </template>
        <!-- 预计A价分摊 -->
        <template #estimateShareAPrice="scope">
          <span>{{ scope.row.estimateShareAPrice | thousandsFilter }}</span>
        </template>
      </tableList>
    </iCard>
    <iCard class="margin-top20" title="申请记录">
      <tableList
        indexKey
        :selection="false"
        :tableData="applyTableData"
        :tableTitle="applyTableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #businessType="scope">
          {{getBusinessDesc(scope.row.businessType)}}
        </template>
        <!-- 期望目标价·分摊 -->
        <template #expectedShareTargetPrice="scope">
          <span>{{ scope.row.expectedShareTargetPrice | thousandsFilter(0)}}</span>
        </template>
        <!-- 期望目标价·一次性 -->
        <template #expectedTargetPrice="scope">
          <span>{{ scope.row.expectedTargetPrice | thousandsFilter(0)}}</span>
        </template>
        <!-- 目标价·分摊 -->
        <template #shareTargetPrice="scope">
          <span>{{ scope.row.shareTargetPrice | thousandsFilter(0)}}</span>
        </template>
        <!-- 目标价·一次性 -->
        <template #targetPrice="scope">
          <span>{{ scope.row.targetPrice | thousandsFilter(0)}}</span>
        </template>
        <!-- 预计A价分摊 -->
        <template #estimateShareAPrice="scope">
          <span>{{ scope.row.estimateShareAPrice | thousandsFilter }}</span>
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
      :isMaintain="isMaintain"
      :dialogVisible="approvalDialogVisible"
      @changeVisible="changeApprovalDialogVisible"
      @clearDialog="clearDialog"
      @handleConfirm="handleConfirm"
    ></approval-dialog>
  </iDialog>
</template>

<script>
import { iPage, iCard, iDialog, iInput, iPagination, iButton, iMessage } from "rise";
import tableList from "./tableList";
import approvalDialog from "./approvalDialog";
import { pageMixins } from "@/utils/pageMixins";
import { toBeMaintainTableTitle, applyTableTitle } from "./data";
import { numberProcessor } from "@/utils";
import filters from '@/utils/filters'
import thousandsFilterInput from "rise/web/aeko/quotationdetail/components/thousandsFilterInput";
import { getSelTargetPriceRecordList,submitSelTargetPrice, exportSelMaintainedList, uploadSelTargetFile } from "@/api/SELTargetPrice";
export default {
  mixins: [pageMixins, filters],
  components: {
    iPage,
    iCard,
    iDialog,
    iInput,
    tableList,
    iPagination,
    iButton,
    approvalDialog,
    thousandsFilterInput
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
    this.getApplyTableData()
  },
  methods: {
    getStatus(status){
      return this.options.sel_target_price_status?.find(item=>item.code==status)?.name || status
    },
    getBusinessDesc(type){
      return this.options.sel_target_business_type?.find(item=>item.code==type)?.name || type
    },
    clearDialog() {
      this.$emit("changeVisible", false);
    },
    // 输入整数，计算预计A价
    handleInput(value, row, name) {
      if(name=='shareTargetPrice'){
        this.$set(row, name, Number(value).toFixed(0)); // 目标价·分摊，输入整数
        this.$set(row, "estimateShareAPrice",numberProcessor(row.shareTargetPrice / row.releaseOutput, 2)); // 计算预计A价=  目标价·分摊/分摊量
      }else{
        this.$set(row, name, Number(value).toFixed(0)); // 目标价·分摊，输入整数
      }
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
        fsnrGsnrNum: this.tableData.map((item) => item.fsnrGsnrNum),
        size: this.page.pageSize,
      };
      getSelTargetPriceRecordList(params).then((res) => {
        if (res?.code == "200") {
          this.applyTableData = res.data;
          this.page.totalCount = res.total
        }
      });
    },
    // 导入批量维护
    upload(content) {
      const formData = new FormData();
      formData.append("uploadFile", content.file);
      uploadSelTargetFile(formData).then(res=>{
        if(res?.code=='200'){
          iMessage.success(res.desZh)
          let uploadData = res.data || []
          this.tableData = [...uploadData]
        }else{
          iMessage.error(res.desZh)
        }
      })
    },
    exportExcel(){
      if (this.selectItems.length < 1) {
        iMessage.warn(
          this.language("ZHISHAOXUANZEYITIAOJILU", "至少选择一条记录")
        );
        return;
      }
      exportSelMaintainedList({ taskDTOList:this.selectItems}).then(res=>{
        console.log(res);
      })
    },
    // 提交
    submit() {
      if(this.selectItems.length==0) return iMessage.warn(
          this.language("ZHISHAOXUANZEYITIAOJILU", "至少选择一条记录")
        );
        if(this.isMaintain){  // 如果是维护页面
          submitSelTargetPrice({
            taskDTOList:this.selectItems
          }).then(res=>{
            console.log('res=>',res);
            if(res?.code=='200'){
              iMessage.success(res.desZh)
              this.clearDialog()
              this.$emit('getTableList')
            }else{
              iMessage.error(res?.desZh || '提交失败')
            }
          })
        }else{  // 审批页面
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