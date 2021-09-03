<template>
  <div class="cbdSummary">
    <div class="header">
      <div class="tip">{{ language("DANWEI", "单位") }}：RMB/Pc.</div>
    </div>
    <div class="content margin-top20">
      <tableList
        lang
        class="table"
        :selection="false"
        :tableTitle="tableTitle"
        :tableData="tableListData" />
    </div>
  </div>  
</template>

<script>

import tableList from "../../../tableList"
import { cbdSummaryTableTitle as tableTitle } from "../data"

export default {
  components: { tableList },
  model: {
    prop: "tableListData"
  },
  props: {
    tableListData: {
      type: Array,
      required: true,
      default: () => ([{ material: "0.00", makeCost: "0.00", discardCost: "0.00", manageFee: "0.00", otherFee: "0.00", profit: "0.00", apriceChange: "0.00" }])
    }
  },
  data() {
    return {
      tableTitle
    }
  }
}
</script>

<style lang="scss" scoped>
.cbdSummary {
  position: relative;

  .header {
    position: absolute;
    top: -34px;
    right: 0;

    .tip {
      font-size: 12px;
      line-height: 14px;
      font-weight: 400;
      color: #485465;
      font-weight: 400;
    }
  }
}
</style>