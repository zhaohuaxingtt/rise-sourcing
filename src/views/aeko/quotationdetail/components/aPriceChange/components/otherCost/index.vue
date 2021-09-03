<template>
  <div class="otherCost">
    <i class="topCutLine" v-if="topCutLine"></i>
    <div class="main">
      <div class="header">
        <span class="title">2.5 {{ language("QITAFEIYONG", "其他费用") }}</span>
      </div>
      <div class="body margin-top20">
        <tableList
          lang
          class="table"
          :selection="false"
          :tableTitle="tableTitle"
          :tableData="tableListData">
          <template #itemTypeNameByLang="scope">
            <span>{{ typeof scope.row.itemTypeNameByLang === "function" ? scope.row.itemTypeNameByLang() : scope.row.itemTypeName }}</span>
          </template>
        </tableList>
      </div>
    </div>
  </div>
</template>

<script>
import { iButton } from "rise"
import tableList from "../../../tableList"
import { otherCostTableTitle as tableTitle } from "../data"

export default {
  components: { iButton, tableList },
  model: {
    prop: "tableListData",
    event: "change"
  },
  props: {
    topCutLine: {
      type: Boolean,
      default: false
    },
    tableListData: {
      type: Array,
      required: true,
      default: () => ([])
    }
  },
  data() {
    return {
      tableTitle
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.otherCost {
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