<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="95%" top="5vh" @close='clearDiolog' z-index="1000" class="iDialogAdd">
    <div slot="title" class="title">
      <div class="text">{{ $t(title) }}</div>
      <iButton @click="save" v-loading="saveLoading">{{ $t('LK_QUEREN') }}</iButton>
    </div>
    <div class="changeContent">
      <div v-loading="tableLoading">
        <div
            v-for="(item, index) in totalBudget"
            :key="index"
            class="tips"
        >
          {{item.tmCarTypeProName}}车型项目，总预算
          {{item.totalBudget}}。申请金额已超出总预算。
        </div>
        <div
            v-for="(item, index) in tableListData"
            :key="index"
            class="tips"
        >
          {{item.tmCarTypeProName}}车型项目，材料组
          {{item.categoryName}}，预算剩余为
          {{item.budgetLeftoverAmount}}，此次申请预算为
          {{item.budgetApplyAmountTotal}}，已超额原设定预算，请确定是否要审批？
        </div>
        <iTableList
            class="tableList"
            v-for="(item, index) in tableListData"
            :key="index"
            :tableData="item.applyParamVOList"
            :tableTitle="tableTitle"
            :selection="false"
            :showSummary="true"
            :getSummaries="() => item.summaries"
        >
          <template #budgetApplyAmount="scope">
            <div>{{ getTousandNum(scope.row.budgetApplyAmount) }}</div>
          </template>
        </iTableList>
        <div style="color: #999999;font-size: 14px;text-align: right;margin: 10px 0;">{{ $t('货币：人民币  |  单位：元  |  不含税 ') }}</div>
      </div>
    </div>
  </iDialog>
</template>
<script>
import {
  iButton,
  iDialog,
  iMessage,
  iPagination,
} from 'rise'
import {
  iTableList
} from '@/components'
import {alertList, form} from "../components/data";
import {alert, ratify} from "@/api/ws2/budgetApproval";
import {getTousandNum} from "@/utils/tool";

export default {
  components: {
    iButton,
    iDialog,
    iTableList,
  },
  props: {
    title: {type: String, default: '提示'},
    value: {type: Boolean},
    redMultipleSelection: {type: Array, default: () => []},
    multipleSelection: {type: Array, default: () => []}
  },
  data() {
    return {
      form: form,
      tableListData: [],
      totalBudget: [],
      tableTitle: alertList,
      tableLoading: false,
      saveLoading: false,
      getTousandNum: getTousandNum
    }
  },
  mounted() {
    // this.findAddColumnInvestmentBuild()
  },
  methods: {
    findAddColumnInvestmentBuild() {
      this.tableLoading = true
      alert(this.redMultipleSelection).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.tableListData = res.data.ratifyAlertVOList.map(item => {
            item.summaries = ['Total', '', this.getTousandNum(item.applyParamVOList.map(item => Number(item.budgetApplyAmount)).reduce((total, num) => total + num))]
            return item
          })
          this.totalBudget = res.data.dualAlertVOList
        } else {
          iMessage.error(result);
        }
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      });
    },
    clearDiolog() {
      this.$emit('input', false)
    },
    save() {
      this.saveLoading = true
      ratify({ids :this.multipleSelection}).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          iMessage.success(result);
          this.$emit('input', false)
          this.$emit('refresh')
        } else {
          iMessage.error(result);
        }
        this.saveLoading = false
      }).catch(() => {
        this.saveLoading = false
      });
    },
    reset() {
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.findAddColumnInvestmentBuild()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.iDialogAdd.el-dialog__wrapper {
  overflow: hidden;
  ::v-deep .el-dialog{
    height: 90%;
    overflow-y: auto;
  }
  ::v-deep .el-dialog__headerbtn{
    top: 34px;
    right: 40px;
  }
}

.title {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-right: 40px;

  .text {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
  }

  .star {
    position: absolute;
    right: -15px;
    top: 0;
    font-size: 30px;
    color: red;
  }
}

.changeContent {
  padding-bottom: 30px;
  color: #000000;
  ::v-deep .el-table__footer-wrapper{
    td{
      font-weight: bold;
    }
    td:last-of-type{
      color: #E30D0D;
    }
  }
  .tips{
    margin-bottom: 10px;
  }
  .tableList{
    margin-bottom: 30px;
  }
  ::v-deep .card {
    box-shadow: none;
    border-radius: 0;
    background: none;

    .cardBody {
      margin-top: 0;
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }

    .iSearch-content {
      border-bottom: 1px solid #E3E3E3;
      padding-bottom: 20px;
    }
  }

  .add {
    float: right;
    margin-bottom: 10px;
  }
}
</style>

