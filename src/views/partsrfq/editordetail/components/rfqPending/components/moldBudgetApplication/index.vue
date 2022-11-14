<template>
  <div>
    <iCard
      collapse
      v-permission.auto="
        PARTSRFQ_EDITORDETAIL_RFQPENDING_MOLDBUDGETAPPLICATION_INDEXPAGE |
          模具预算申请页面
      "
      :title="language('MOJUTOUZIYUSUAN', '模具投资预算')"
      :defalutCollVal="status == '已完成' || !todo"
    >
      <template slot="subInfo">
        <div
          v-if="todo"
          :class="{
            danger: status == '未申请',
            warning: status == '未完成',
            success: status == '已完成',
          }"
          class="tishi"
        >
          <icon symbol :name="iconName[status]" class="tishi-icon"></icon>
          <span class="status">{{ status }}</span>
        </div>
        <el-popover
          v-else
          placement="right"
          trigger="click"
          content="请确保申请预算和实际投资费在同一零件上（定点校验零件模具投资费是否小于等于已审批投资预算）"
        >
          <icon
            slot="reference"
            symbol
            name="iconzhongyaoxinxitishi"
            class="tishi-icon"
          ></icon>
        </el-popover>
      </template>
      <template slot="header-control">
        <div class="button-box" v-if="!disabled">
          <template v-if="!todo">
            <iButton
              @click="submit"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_RFQPENDING_MOLDBUDGETAPPLICATION_SUBMIT |
                  模具预算申请提交
              "
              >{{ language("LK_TIJIAO", "提交") }}</iButton
            >
            <iButton
              @click="recall"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_RFQPENDING_MOLDBUDGETAPPLICATION_RECALL |
                  模具预算申请撤回
              "
              >{{ language("LK_CHEHUI", "撤回") }}</iButton
            >
          </template>
          <template v-else>
            <iButton
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_RFQPENDING_MOLDBUDGETAPPLICATION_SHENGQINGMUBIAOJIA |
                  模具预算申请目标价
              "
              @click="moldBudgetApplicationVisible = true"
              >{{ language("LK_SHENQINGMUBIAOJIA", "申请目标价") }}</iButton
            >
          </template>
        </div>
      </template>
      <tableList
        :isminHeight="true"
        index
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        v-permission.auto="
          PARTSRFQ_EDITORDETAIL_RFQPENDING_MOLDBUDGETAPPLICATION_TABLE |
            模具预算申请表格
        "
      >
        <template #budget="scope">
          <iInput
            v-model="scope.row.budget"
            v-if="!scope.row.disabled && !disabled"
            @input="handleInput($event, scope.row)"
            @blur="handleBlurByBudget(scope.row.budget, scope.row)"
          />
          <span v-else>{{ scope.row.budget }}</span>
        </template>
      </tableList>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <!-- <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.totalCount"
        /> -->
    </iCard>
    <!-- 申请模具预算弹窗 -->
    <moldBudgetApplicationDialog
      :visible.sync="moldBudgetApplicationVisible"
      @updateTable="getTableList"
    />
  </div>
</template>

<script>
import { iCard, iButton, iPagination, iMessage, iInput, icon } from "rise";
import moldBudgetApplicationDialog from "./components/moldBudgetApplicationDialog";
import { tableTitle } from "./components/data";
import { pageMixins } from "@/utils/pageMixins";
import {
  getModelBudgetList,
  patchMouldBudget,
  cancelMoldBudget,
  patchMouldBudgetSubmit,
  patchMouldBudgetWithdrawal,
} from "@/api/partsrfq/editordetail";
import store from "@/store";
import { rfqCommonFunMixins } from "pages/partsrfq/components/commonFun";
import tableList from "@/views/partsign/editordetail/components/tableList";
import { numberProcessor } from "@/utils";
import { iconName } from "@/views/partsrfq/editordetail/components/rfqPending/components/partDetaiList/data";

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    icon,
    tableList,
    iInput,
    moldBudgetApplicationDialog,
  },
  mixins: [pageMixins, rfqCommonFunMixins],
  props: {
    todo: Boolean,
  },
  inject: ["getDisabled"],
  data() {
    return {
      iconName,
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      moldBudgetApplicationVisible: false,
    };
  },
  created() {
    this.getTableList();
  },
  computed: {
    status() {
      return this.$store.state.rfq.todoObj["mouldBudgetStatusDesc"].status;
    },
    disabled() {
      return this.getDisabled();
    },
  },
  methods: {
    //获取表格数据
    async getTableList() {
      const rfqId = this.$route.query.id;
      if (rfqId) {
        this.tableLoading = true;
        try {
          const res = await getModelBudgetList(rfqId);
          console.log(Array.isArray(res.data), res.data, "1111111111");
          if (res && res.code === "200") {
            this.tableListData = Array.isArray(res.data)
              ? res.data.map((item) => ({
                  ...item,
                  budget: math.bignumber(item.budget || 0).toFixed(2),
                  disabled: item.approvalStatus == "已审批",
                }))
              : [];
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
          }
          // this.page.currPage = res.current
          // this.page.pageSize = res.size
          // this.page.totalCount = res.data.total;
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    async submit() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.language("partsignLanguage.QingXuanZe", "请选择"));
        return false;
      }

      if (
        this.selectTableData.some(
          (item) =>
            item.approvalStatus === "已提交" ||
            item.approvalStatus === "SUBMITTED"
        )
      )
        return iMessage.warn(
          this.language("QINGWUXUANZEYITIJIAODESHUJU", "请勿选择已提交的数据")
        );

      //this.selectTableData = this.selectTableData.map(item => {
      //item.approvalStatus = 'submitted' //后台晓伟指出不转换
      //return item
      //})
      const mouldBudgets = this.selectTableData;
      const res = await patchMouldBudgetSubmit(mouldBudgets);
      this.resultMessage(res);
      this.getTableList();
    },
    async recall() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.language("partsignLanguage.QingXuanZe", "请选择"));
        return false;
      }
      // const status = ["AGREE","DISAGREE","REVOKED","已审批","已驳回","已撤销"]
      const status = ["DISAGREE","REVOKED","已驳回","已撤销"]
      let statusFlag = false
      this.selectTableData.forEach(val=>{
        status.includes(val.approvalStatus) || status.includes(val.approvalStatusDesc) ? statusFlag = true : ''
      })
       if (statusFlag)
        return iMessage.warn(
          this.language(
            "ZHIYOUYITIJIAOZHUANGTAICAIKEYICHEHUI",
            "只有【已提交】状态才可以撤回"
          )
        );
      // this.selectTableData = this.selectTableData.map(item => {
      // item.approvalStatus = 'revoked' 晓伟说不用转换
      // return item
      // })
      const ids = this.selectTableData.map((val) => {
        if (val.id !== null) {
          return val.id;
        }
      });
      const res = await patchMouldBudgetWithdrawal(ids);
      this.resultMessage(res);
      this.getTableList();
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    handleInput(value, row) {
      this.$set(row, "budget", numberProcessor(value, 2));
    },
    handleBlurByBudget(val, row) {
      this.$set(row, "budget", math.bignumber(val || 0).toFixed(2));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>