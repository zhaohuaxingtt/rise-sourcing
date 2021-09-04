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
          <template #ratio="scope">
            <iInput class="input-center" v-model="scope.row.ratio" :class="{ changeClass: scope.row.ratio !== scope.row.ratio }" @input="handleInputByNumber($event, 'ratio', scope.row, 2, computeChangeAmount)"></iInput>
          </template>
        </tableList>
      </div>
    </div>
  </div>  
</template>

<script>
/* eslint-disable no-undef */

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
    },
    sumData: {
      type: Object,
      required: true,
      default: () => ({
        sourceMaterialCostSum: "0",
        newMaterialCostSum: "0",
        sourceLaborCostSum: "0",
        newLaborCostSum: "0",
        sourceDeviceCostSum: "0",
        newDeviceCostSum: "0"
      })
    }
  },
  data() {
    return {
      tableTitle
    }
  },
  watch: {
    sumData: {
      handler() {
        this.computeChangeAmount()
      },
      deep: true
    }
  },
  methods: {
    handleInputByNumber(value, key, row, precision, cb) {
      this.$set(row, key, numberProcessor(value, precision))

      if (typeof cb === "function") {
        cb(value, key, row)
      }
    },
    computeChangeAmount() {
      const sourceSum = math.evaluate(`${ this.sumData.sourceMaterialCostSum || 0 } + ${ this.sumData.sourceLaborCostSum || 0 } + ${ this.sumData.sourceDeviceCostSum || 0 }`)
      const newSum = math.evaluate(`${ this.sumData.newMaterialCostSum || 0 } + ${ this.sumData.newLaborCostSum || 0 } + ${ this.sumData.newDeviceCostSum || 0 }`)
      const changeAmount = math.evaluate(`(${ newSum } / (1 - (${ this.tableListData[0].ratio || 0 } / 100)) - ${ newSum }) - (${ sourceSum } / (1 - (${ this.tableListData[0].originRatio || 0} / 100)) - ${ sourceSum })`).toFixed(2)

      this.$set(this.tableListData[0], "changeAmount", changeAmount)
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