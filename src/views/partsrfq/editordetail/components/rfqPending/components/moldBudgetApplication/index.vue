<template>
  <div>
    <iCard
      collapse
      v-permission.auto="
        PARTSRFQ_EDITORDETAIL_RFQPENDING_MOLDBUDGETAPPLICATION_INDEXPAGE |
          模具预算申请页面
      "
      :title="language('MOJUTOUZIYUSUAN','模具投资预算')"
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
    </template>
    <template slot="header-control">
      <div class="button-box">
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
            @click="moldBudgetApplicationVisible = true"
            >{{ language("LK_SHENQINGMUBIAOJIA", "申请目标价") }}</iButton
          >
        </template>
      </div>
    </template>
        <tableList
          index
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_MOLDBUDGETAPPLICATION_TABLE|模具预算申请表格"
        >
          <template #budget="scope">
            <iInput
              v-model="scope.row.budget"
              v-if="!disabled"
              @input="handleInput($event, scope.row)"
              @blur="handleBlurByBudget(scope.row.budget, scope.row)"
            />
            <span v-else>{{ scope.row.budget }}</span>
          </template>
        </tableList>
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
          :current-page="page.currPage"
          :total="page.totalCount"
        />
    </iCard>
    <!-- 申请模具预算弹窗 -->
    <moldBudgetApplicationDialog :visible.sync="moldBudgetApplicationVisible" />
  </div>
</template>

<script>
import { iCard, iButton, iPagination, iMessage, iInput, icon } from "rise";
import moldBudgetApplicationDialog from './components/moldBudgetApplicationDialog'
import { tableTitle } from "./components/data";
import { pageMixins } from "@/utils/pageMixins";
import {
  getModelBudgetList,
  patchMouldBudget,
  cancelMoldBudget,
} from "@/api/partsrfq/editordetail";
import store from "@/store";
import { rfqCommonFunMixins } from "pages/partsrfq/components/commonFun";
import tableList from "@/views/partsign/editordetail/components/tableList";
import { numberProcessor } from "@/utils";
import { iconName } from "@/views/partsrfq/editordetail/components/rfqPending/components/partDetaiList/data"

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    icon,
    tableList,
    iInput,
    moldBudgetApplicationDialog
  },
  mixins: [pageMixins, rfqCommonFunMixins],
  props: {
    todo: Boolean,
    status: String
  },
  data() {
    return {
      iconName,
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      moldBudgetApplicationVisible: false
    };
  },
  created() {
    this.getTableList();
  },
  inject: ["getDisabled"],
  computed: {
    disabled() {
      return this.getDisabled();
    },
  },
  methods: {
    toggle(type) {
      console.log(this[type]);
      this[type] = !this[type];
    },
    //获取表格数据
    async getTableList() {
      const id = this.$route.query.id;
      if (id) {
        this.tableLoading = true;
        try {
          const req = {
            rfqId: id,
            userId: store.state.permission.userInfo.id,
          };
          const res = await getModelBudgetList(
            {
              currPage: this.page.currPage,
              pageSize: this.page.pageSize,
            },
            [{ rfqIds: id }]
          );
          this.tableListData = Array.isArray(res.data.records)
            ? res.data.records.map((item) => ({
                ...item,
                budget: math.bignumber(item.budget || 0).toFixed(2),
              }))
            : [];
          // this.page.currPage = res.current
          // this.page.pageSize = res.size
          this.page.totalCount = res.data.total;
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
            item.approvalStatus === "submitted"
        )
      )
        return iMessage.warn(
          this.language("QINGWUXUANZEYITIJIAODESHUJU", "请勿选择已提交的数据")
        );

      //this.selectTableData = this.selectTableData.map(item => {
      //item.approvalStatus = 'submitted' //后台晓伟指出不转换
      //return item
      //})
      const req = this.selectTableData;
      const res = await patchMouldBudget({
        updateType: 1,
        mouldBudgetDTOS: req,
      });
      this.resultMessage(res);
      this.getTableList();
    },
    async recall() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.language("partsignLanguage.QingXuanZe", "请选择"));
        return false;
      }

      if (
        this.selectTableData.some(
          (item) =>
            item.approvalStatus === "已撤销" ||
            item.approvalStatus === "revoked"
        )
      )
        return iMessage.warn(
          this.language("QINGWUXUANZEYICHEXIAODESHUJU", "请勿选择已撤销的数据")
        );

      // this.selectTableData = this.selectTableData.map(item => {
      // item.approvalStatus = 'revoked' 晓伟说不用转换
      // return item
      // })
      const req = this.selectTableData;
      const res = await patchMouldBudget({
        updateType: 0,
        mouldBudgetDTOS: req,
      });
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
.card-header {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 20px 0;
  .card-title {
    display: inline-flex;
    align-items: center;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .tishi {
    display: inline-flex;
    align-items: center;
  }
  .tishi-icon {
    font-size: 18px;
    margin: 0 15px;
  }

  .danger {
    color: #f5222d;
  }
  .warning {
    color: #fa8c16;
  }
  .success {
    color: #389e0d;
  }
  .button-box {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-icon {
    font-size: 18px;
    margin: 0 20px;
  }
  .rotate {
    transform: rotate(180deg);
  }
}
</style>