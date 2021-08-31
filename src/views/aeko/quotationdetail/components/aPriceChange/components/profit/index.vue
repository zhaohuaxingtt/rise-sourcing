<template>
  <div class="profit">
    <i class="topCutLine" v-if="topCutLine"></i>
    <div class="main">
      <div class="header">
        <span class="title">2.6 {{ language("LIRUN", "利润") }}</span>
      </div>
      <div class="body margin-top20">
        <tableList
          lang
          class="table"
          :selection="false"
          :tableTitle="tableTitle"
          :tableData="tableListData" />
      </div>
    </div>
  </div>  
</template>

<script>
import { iButton } from "rise"
import tableList from "../../../tableList"
import { profitTableTitle as tableTitle } from "../data"

export default {
  components: { iButton, tableList },
  props: {
    topCutLine: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableTitle,
      tableListData: []
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.profit {
  .topCutLine {
    display: block;
    border-top: 2px #BBC4D6 dashed;
    margin-bottom: 30px;
  }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .title {
      font-size: 18px;
      color: #131523;
      font-weight: bold;
    }

    .control {}
  }

  ::v-deep .table {
    .el-table__body-wrapper {
      height: 100px;  
      overflow: auto;
    }
  }
}
</style>