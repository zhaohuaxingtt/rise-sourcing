<template>
  <div>
    <div class="header">
      <el-radio-group v-model="leftModel">
        <el-radio-button label="mouldInvestment">{{ $t('模具投资') }}</el-radio-button>
        <el-radio-button label="modelBag">{{ $t('车型包') }}</el-radio-button>
      </el-radio-group>
      <div class="rightModel">
        <div :class="[rightModel === 1 ? 'active' : '']" @click="rightModel = 1">{{ $t('材料组汇总') }}</div>
        <div :class="[rightModel === 2 ? 'active' : '']" @click="rightModel = 2">{{ $t('零件号明细') }}</div>
      </div>
    </div>
    <div v-if="leftModel === 'mouldInvestment'">
      <summaryPart v-if="rightModel === 1"></summaryPart>
      <partNoPart v-if="rightModel === 2"></partNoPart>
    </div>
    <div v-if="leftModel === 'modelBag'" style="margin-top: 20px;font-size: 22px">
      车型包正在开发中，敬请期待！
    </div>
  </div>
</template>

<script>
import {iMessage} from 'rise';
import {
  getInvestmentHistoryMaterial
} from "@/api/ws2/dataBase";
import summaryPart from "./mouldInvestment/summary";
import partNoPart from "./mouldInvestment/partNo";
import {form, dataBaseData} from "../budgetManagement/components/data";
import {pageMixins} from "@/utils/pageMixins";

export default {
  mixins: [pageMixins],
  components: {
    summaryPart,
    partNoPart,
  },
  data() {
    return {
      leftModel: 'mouldInvestment',
      rightModel: 1,
      form: form,
      loadingiSearch: false,
      tableLoading: false,
      tableListData: [],
      tableTitle: dataBaseData,

    }
  },
  created() {
    this.getTableListFn()
  },
  methods: {
    getTableListFn() {
      this.tableLoading = true;
      let params = {
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getInvestmentHistoryMaterial(params)
          .then((res) => {
            const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
            if (Number(res.code) === 0) {
              this.page.currPage = res.pageNum;
              this.page.pageSize = res.pageSize;
              this.page.totalCount = res.total;
              this.tableListData = res.data;
            } else {
              iMessage.error(result)
            }
            this.tableLoading = false;
          }).catch(() => (this.tableLoading = false));
    },
    sure() {

    },
    reset() {

    }
  }
}
</script>

<style scoped lang="scss">


.header {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #E3E3E3;
  padding-top: 20px;
  margin-top: 2px;

  .rightModel {
    display: flex;

    > div {
      font-size: 14px;
      font-weight: 400;
      line-height: 40px;
      color: #909091;
      opacity: 1;
      margin-left: 20px;
      cursor: pointer;

      &.active {
        font-size: 16px;
        font-weight: bold;
        color: #1763F7;
        opacity: 1;
        position: relative;
        margin-left: 30px;

        &::before {
          content: '';
          display: block;
          width: 4px;
          height: 16px;
          background: #1763F7;
          opacity: 1;
          border-radius: 10px;
          position: absolute;
          top: 50%;
          left: -10px;
          transform: translateY(-50%);
        }
      }
    }
  }

  // el-radio-group begin样式
  ::v-deep .el-radio-button__inner {
    font-size: 16px;
    border-color: #F5F6F7;
    padding: 10px 20px;
    background: #F5F6F7;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.08) !important;
  }

  ::v-deep .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 10px 0 0 10px;
  }

  ::v-deep .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0 10px 10px 0;
  }

  ::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    color: #1660F1;
    font-weight: bold;
    background-color: #ffffff;
    //border-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.08) !important;
  }

  // el-radio-group end样式
}
</style>