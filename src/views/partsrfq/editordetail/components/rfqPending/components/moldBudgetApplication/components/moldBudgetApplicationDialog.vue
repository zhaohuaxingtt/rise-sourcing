<template>
  <iDialog class="dialog" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">{{language('SHENQINGMUJUYUSUAN', '申请模具预算')}}</div>
      <div class="floatright">
        <iButton
          @click="submit"
          v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_MOLDBUDGETAPPLICATION_SUBMIT|模具预算申请提交">
          {{ language("LK_APPLAY", "申请") }}
        </iButton>
        <iButton
          @click="recall"
          v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_MOLDBUDGETAPPLICATION_RECALL|模具预算申请撤回"
          >{{ language("LK_CHEHUI", "撤回") }}
        </iButton>
      </div>
    </div>
    <div class="body">
     <tableList
        :isminHeight="true"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange">
        
        <template #budget="scope">
          <thousandsFilterInput v-if="!scope.row.disabled && !disabled" :inputValue="scope.row.budget" :numberProcessor="2" :handleArg="[scope.row]" @handleInput="handleInput" />
          <span v-else>{{ scope.row.budget | thousandsFilter(2) }}</span>
        </template>
        <!-- <template #budget="scope">
          <iInput
            v-model="scope.row.budget"
            v-if="!disabled"
            :placeholder="language('LK_QINGSHURU','请输入')"
          />
          <span v-else>{{ scope.row.budget }}</span>
        </template> -->
      </tableList>
    </div>
    <!-- <div slot="footer" class="footer">
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
    </div> -->
  </iDialog>
</template>

<script>
import {iDialog, iInput, iMessage, iButton, iPagination } from 'rise'
import tableList from "@/views/partsign/editordetail/components/tableList";
import {tableApplyTitle as tableTitle} from './data'
import { pageMixins } from "@/utils/pageMixins";
import {rfqCommonFunMixins} from "pages/partsrfq/components/commonFun";
import {
  patchMouldBudgetSubmit,
  patchMouldBudgetWithdrawal
} from "@/api/partsrfq/editordetail";
import filters from "@/utils/filters";
import thousandsFilterInput from 'rise/web/aeko/quotationdetail/components/thousandsFilterInput'
export default {
  components: { iDialog, iButton, iInput, tableList, iPagination, thousandsFilterInput},
  mixins: [pageMixins,rfqCommonFunMixins, filters],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tableListData:{
      type: Array,
      default:()=>[]
    }
  },
  data() {
    return {
      tableTitle,
      selectTableData: [],
      tableLoading: false
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.selectTableData = val

    },
    async submit() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.language("partsignLanguage.QingXuanZe", "请选择"));
        return false;
      }

      if (
        this.selectTableData.some(
          (item) =>
            item.approvalStatus === "SUBMITTED" ||
            item.approvalStatusDesc === "已提交"
        )
      )
        return iMessage.warn(
          this.language("QINGWUXUANZEYITIJIAODESHUJU", "请勿选择已提交的数据")
        );
      //this.selectTableData = this.selectTableData.map(item => {
      //item.approvalStatus = 'submitted' //后台晓伟指出不转换
      //return item
      //})
      const mouldBudgets = this.selectTableData
      // 处理输入的千分位数字
      mouldBudgets.forEach(item=>{
        item.budget = item.budget && item.budget.replaceAll(',','').replaceAll('，','')
      })
      const res = await patchMouldBudgetSubmit(
        mouldBudgets
      );
      this.resultMessage(res);
      // this.getTableList();
      if(res?.code=='200'){
        this.$store.dispatch('setTodoObj',this.$route.query.id);
        this.$emit('updateTable')
      }
    },
    async recall() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.language("partsignLanguage.QingXuanZe", "请选择"));
        return false;
      }
      const status = ["AGREE","DISAGREE","REVOKED","已审批","已驳回","已撤销"]
      let statusFlag = false
      this.selectTableData.forEach(val=>{
        status.includes(val.approvalStatus) || status.includes(val.approvalStatusDesc) ? statusFlag = true : ''
      })
      if (statusFlag)
        return iMessage.warn(
          this.language("ZHIYOUYITIJIAOZHUANGTAICAIKEYICHEHUI", "只有【已提交】状态才可以撤回")
        );
      const ids = this.selectTableData.map(val=>{
        if(val.id!==null){
          return val.id
        }
      })
      const res = await patchMouldBudgetWithdrawal(ids);
      this.resultMessage(res);
      // this.getTableList();
    },
    close() {
      this.$emit('update:visible', false)
      this.tableLoading = false
    },
    confirm() {
      this.$emit('confirm', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top;
    padding-bottom: $bottom;
  }
  .dialog-Header {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 40px;
  }

  ::v-deep .el-dialog {
    width: 1000px!important;
    position: absolute;
    margin: 0!important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .body {
      height: 100%;
      margin: 0 0 20px 0
    }

    .el-dialog__header {
      @include pdtb(30px, 30px);
    }

    .el-dialog__body {
      @include pdtb(6px, 0);
    }

    .pagination {
      margin-top: 0;
    }

    .el-dialog__footer {
       @include pdtb(28px, 28px);
    }
  }
}
</style>