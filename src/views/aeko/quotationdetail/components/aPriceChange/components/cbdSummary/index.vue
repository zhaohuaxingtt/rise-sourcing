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
  data() {
    return {
      tableTitle,
      tableListData: [
        { a: "0.00", b: "0.00", c: "0.00", d: "0.00", e: "0.00", f: "0.00", g: "0.00" }
      ]
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