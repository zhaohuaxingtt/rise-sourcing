<!--
 * @Author: your name
 * @Date: 2021-05-24 13:45:08
 * @LastEditTime: 2022-12-26 22:05:10
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\designate\suggestion\components\mouldBudgetManagementDialog.vue
-->
<template>
  <iDialog
    class="mouldBudgetManagementDialog"
    v-bind="$props"
    :visible.sync="visible"
    v-on="$listeners"
  >
    <template #title>
      <p class="title">{{ language("MUJUYUSUANGUANLI", "模具预算管理") }}</p>
      <div class="control" id="control" v-if="!nominationDisabled && !rsDisabled">
        <iButton :loading="submitLoading" @click="handleSubmit">{{ language("TIJIAO", "提交") }}</iButton>
        <iButton :loading="recallLoading" @click="handleRecall">{{ language("CHEHUI", "撤回") }}</iButton>
      </div>
    </template>
    <div class="body">
      <tableList
        index
        height="100%"
        v-show="visible"
        class="table"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        :lang="true"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #partNum="scope">
          <span class="link" @click="jump(scope.row)">{{ scope.row.partNum }}</span>
        </template>
        <template #applyTime="scope">
          <span>{{ scope.row.applyTime | dateFilter("YYYY-MM-DD") }}</span>
        </template>
        <template #budget="scope">
          <iInput class="input-center" v-model="scope.row.budget" v-if="!nominationDisabled && !rsDisabled" @input="handleInputByBudget($event, scope.row)" @blur="handleBlurByBudget(scope.row.budget, scope.row)" />
          <span v-else>{{ scope.row.budget }}</span>
        </template>
      </tableList>
    </div>
    <template #footer class="footer">
      <!-- <iPagination v-update
        class="pagination"
        @size-change="handleSizeChange($event, getMouldBudget)"
        @current-change="handleCurrentChange($event, getMouldBudget)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" /> -->
    </template>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput, iPagination, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { mouldBudgetManagementDialogTableTitle as tableTitle } from "./data"
import filters from "@/utils/filters"
import { numberProcessor } from "@/utils"
import { pageMixins } from "@/utils/pageMixins"
import { getMouldBudget, patchMouldBudget } from "@/api/designate"
import {rfqCommonFunMixins} from "pages/partsrfq/components/commonFun";
import {
  patchMouldBudgetSubmit,
  patchMouldBudgetWithdrawal
} from "@/api/partsrfq/editordetail";
export default {
  components: { iDialog, iButton, iInput, iPagination, tableList },
  mixins: [ filters, pageMixins, rfqCommonFunMixins ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    rfqIds: {
      type: Array,
      require: true,
      default: () => ([])
    },
    fsIds: {
      type: Array,
      require: true,
      default: () => ([])
    },
    supplierIds: {
      type: Array,
      require: true,
      default: () => ([])
    }
  },
  watch: {
    visible(nv) {
      if (nv) { 
        // 请求
        this.getMouldBudget()
      } else {
        this.tableListData = []
        this.multipleSelection = []
      }

      this.$emit("update:visible", nv)
    },
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: state => state.nomination.nominationDisabled,
      rsDisabled: state => state.nomination.rsDisabled,
    }),
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      submitLoading: false,
      recallLoading: false
    };
  },
  methods: {
    // 获取列表
    getMouldBudget() {
      this.loading = true

      // const form = {
        // currPage: this.page.currPage,
        // pageSize: this.page.pageSize,
        // rfqIds: this.rfqIds.map(item => ({ rfqIds: item })),
        const fsList = this.fsIds
        // supplierIds: this.supplierIds.map(item => ({ supplierIds: item })),
      // }
      getMouldBudget(fsList)
      .then(res => {
       if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data.map(item => ({ ...item, budget: math.bignumber(item.budget || 0).toFixed(2) })) : []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    // 跳转rfq
    jump(row) {},
    // 投资预算
    handleInputByBudget(val, row) {
      this.$set(row, "budget", numberProcessor(val, 2))
    },
    handleBlurByBudget(val, row) {
      this.$set(row, "budget", math.bignumber(val || 0).toFixed(2))
    },
    // 提交
    handleSubmit() {
      if (this.multipleSelection.length < 1) {
        return iMessage.warn(this.language("QINGXUANZEZHISHAOYITIAOSHUJU", "请选择至少一条数据"))
      }
      //   if (
      //   this.multipleSelection.some(
      //     (item) =>
      //       item.approvalStatus === "已提交" ||
      //       item.approvalStatusDesc === "SUBMITTED"
      //   )
      // )
      //   return iMessage.warn(
      //     this.language("QINGWUXUANZEYITIJIAODESHUJU", "请勿选择已提交的数据")
      //   );
      this.submitLoading = true
      const mouldBudgets = this.multipleSelection
      patchMouldBudgetSubmit(mouldBudgets)
      .then(res => {
        if (res.code == 200) {
          this.getMouldBudget()
          this.$emit("submit", this.multipleSelection.filter(item => !res.data.includes(item)))
          // this.$emit("update:visible", false)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.submitLoading = false
      })
      .catch(() => this.submitLoading = false)
    },
    // 撤回
    handleRecall() {
      if (this.multipleSelection.length < 1) {
        return iMessage.warn(this.language("QINGXUANZEZHISHAOYITIAOSHUJU", "请选择至少一条数据"))
      }
      const status = ["AGREE","DISAGREE","REVOKED","已审批","已驳回","已撤销"]
      let statusFlag = false
      this.multipleSelection.forEach(val=>{
        status.includes(val.approvalStatus) || status.includes(val.approvalStatusDesc) ? statusFlag = true : ''
      })
       if (statusFlag)
        return iMessage.warn(
          this.language("ZHIYOUYITIJIAOZHUANGTAICAIKEYICHEHUI", "只有【已提交】状态才可以撤回")
        );
        const ids = this.multipleSelection.map(val=>{
        if(val.id!==null){
          return val.id
        }
      })
      this.recallLoading = true
      patchMouldBudgetWithdrawal(ids)
      .then(res => {
        if (res.code == 200) {
        //  if (!res.data || !res.data.length) {
            iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            this.getMouldBudget()
          // } else {
            // iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            // if (this.multipleSelection.length === res.data.length) {
              // iMessage.warn(`${ this.language("RFQBIANHAO", "RFQ编号") }: ${ res.data.join(", ") } ${ this.language("CHONGFUCHEHUI", "重复撤回") }`)
            // } else {
              // iMessage.warn(`${ this.language("RFQBIANHAO", "RFQ编号") }: ${ res.data.join(", ") } ${ this.language("CHONGFUCHEHUI", "重复撤回") }, ${ this.language("QIYUSHUJUZHENGCHANGCHEHUI", "其余数据正常撤回") }`)
              // this.getMouldBudget()
            // }
          // }

          this.$emit("recall", this.multipleSelection.filter(item => !res.data.includes(item)))
          // this.$emit("update:visible", false)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.recallLoading = false
      })
      .catch(() => this.recallLoading = false)
    }
  }
};
</script>

<style lang="scss" scoped>
.mouldBudgetManagementDialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top !important;
    padding-bottom: $bottom !important;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
  }

  ::v-deep .el-dialog__header {
    position: relative;
  }

  .control {
    position: absolute;
    top: 50%;
    right: 94px;
    transform: translate(0, -50%);
  }

  ::v-deep .el-dialog {
    width: 1745px !important;
    // position: absolute;
    margin: 0 !important;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    overflow-x: hidden;

    .body {
      height: 580px;
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