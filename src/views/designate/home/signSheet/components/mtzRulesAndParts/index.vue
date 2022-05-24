<template>
  <div class="mtzRulesAndParts">
    <div class="inforFutitle">
      <span class="big_font">Regulation:</span>
      <br />
      <span class="big_font">MTZ Payment=(Effective Price-Base Price)*Raw Material Weight*Settle accounts Quantity*Ratio</span>
      <span class="big_small">When:effective price > base price *(1+threshold)</span>
    </div>
    <p class="tableTitle">MTZ Rules</p>
      <tableList class="margin-top20"
                  :tableData="mtzData.ruleTableListData"
                  :tableTitle="ruleTableTitle"
                  :index="true"
                  :selection="false"
                  border
                  lang
                  >
        <!-- <template slot-scope="scope"
                  slot="compensationPeriod">
          <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
        </template> -->
        <template slot-scope="scope"
                  slot="thresholdCompensationLogic">
          <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
        </template>
        <template slot-scope="scope"
          slot="supplierId">
          <span>{{scope.row.supplierId}}</span><br/>
          <span>{{scope.row.supplierName}}</span>
        </template>
      </tableList>

      <p class="tableTitle">MTZ Parts</p>
      <tableList class="margin-top20"
                  :tableData="mtzData.partTableListData"
                  :tableTitle="partTableTitle"
                  :index="true"
                  :selection="false"
                  border
                  lang
                  >
        <!-- <template slot-scope="scope"
                  slot="compensationPeriod">
          <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
        </template> -->
        <template slot-scope="scope"
                  slot="thresholdCompensationLogic">
          <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
        </template>
        <template slot-scope="scope"
          slot="supplierId">
          <span>{{scope.row.supplierId}}</span><br/>
          <span>{{scope.row.supplierName}}</span>
        </template>
      </tableList>
      <div class="signPreview-footer">
        <div class="tit"><span class="label">Approver:</span><span class="line"></span></div>
        <div class="time">{{currentDate}}</div>
      </div>
  </div>
</template>

<script>
import tableList from "@/views/partsign/editordetail/components/tableList"
import { ruleTableTitle, partTableTitle } from "./data"

export default {
  components: { tableList },
  props: {
    mtzData: {
      type: Object,
      default: () => ({
        ruleTableListData: [],
        partTableListData: []
      })
    }
  },
  computed: {
    currentDate() {
      return window.moment().format('YYYY-MM-DD')
    }
  },
  data() {
    return {
      ruleTableTitle,
      partTableTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
.mtzRulesAndParts {
  .inforFutitle {
    margin-bottom: 20px;
    padding:0.5rem 0;
    font-size:15px!important;
    line-height:25px;
    .big_font{
      font-weight: bold;
    }
    .big_small{
      padding-left:15px;
    }
  }
  .tableTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
    font-size: 18px;

    &:not(&:first-of-type) {
      margin-top: 30px;
    }
  }

  .signPreview-footer {
    // position: relative;
    height: 60px;
    display: flex;
    align-content: center;
    justify-content: space-between;
    align-items: flex-end;
    .tit {
      span {
        font-weight: bold;
        color: #000;
      }
      .line {
        display: inline-block;
        width: 315px;
        height: 20px;
        border-bottom: 1px solid #d4d4d4;
        margin-left: 20px;
      }
    }
    .time {
      color: #777777;
      display: inline-block;
    }
  }
}
</style>