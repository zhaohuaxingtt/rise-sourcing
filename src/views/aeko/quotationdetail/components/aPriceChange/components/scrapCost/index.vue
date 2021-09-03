<template>
  <div class="scrapCost">
    <i class="topCutLine" v-if="topCutLine"></i>
    <div class="main">
      <div class="header">
        <span class="title">2.3 {{ language("BAOFEICHENGBEN", "报废成本") }}</span>
      </div>
      <div class="body margin-top20">
        <tableList
          lang
          class="table"
          :selection="false"
          :tableTitle="tableTitle"
          :tableData="tableListData">
          <template #typeNameByLang="scope">
            <span>{{ typeof scope.row.typeNameByLang === "function" ? scope.row.typeNameByLang() : scope.row.typeName }}</span>
          </template>
          <template #newRatio="scope">
            <iInput class="input-center" v-model="scope.row.newRatio" :class="{ changeClass: scope.row.newRatio !== scope.row.sourceRatio }" @input="handleInputByNumber($event, 'newRatio', scope.row, 2)"></iInput>
          </template>
          <template #amount="scope">
            <span>{{ diffCompute(scope.row.sourceAmount, scope.row.newAmount) }}</span>
          </template>
        </tableList>
      </div>
    </div>
  </div>  
</template>

<script>
import { iButton, iInput } from "rise"
import tableList from "../../../tableList"
import { scrapCostTableTitle as tableTitle } from "../data"
import { numberProcessor } from "@/utils"

export default {
  components: { iButton, iInput, tableList },
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
  methods: {
    handleInputByNumber(value, key, row, precision) {
      this.$set(row, key, numberProcessor(value, precision))
    },
    diffCompute(a, b) {
      // eslint-disable-next-line no-undef
      return math.subtract(math.bignumber(b), math.bignumber(a)).toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
.scrapCost {
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

  ::v-deep .changeClass {
    input {
      font-style: italic;
      color: #1660F1;
    }
  }
}
</style>