<!--
 * @Author: haojiang
 * @Date: 2021-07-07 16:53:18
 * @LastEditTime: 2021-10-13 12:28:59
 * @LastEditors: Hao,Jiang
 * @Description: Bentchmark - Investment(RMB) 
 * @FilePath: /front-web/src/views/designate/designatedetail/decisionData/rsCapacityExpan/components/investment.vue
-->
<template>
  <div class="caexpan-card">
    <div class="tit">2 Benchmark - Investment(RMB)</div>
    <div class="caexpan-card-body">
      <el-table
        fit
        border
        tooltip-effect='light'
        :data='dataList'
        width="100%"
        @selection-change="handleSelectionChange"
        :empty-text="language('LK_ZANWUSHUJU','暂无数据')"
        :class="{monitorTable: true}">
        <el-table-column
          align='center'
          prop="supplierName"
          label="Supplier">
        </el-table-column>
        <el-table-column
          align='center'
          prop="nomiRecordInvestmentFee"
          label="CSC-Investition">
        </el-table-column>
        <el-table-column
          align='center'
          prop="nomiSuggestionInvestmentFee"
          label="New Investment">
        </el-table-column>
        <el-table-column
          align='center'
          prop="ComparedInvestment"
          label="Compared Investment">
        </el-table-column>
        <el-table-column
          align='center'
          prop="Comments"
          label="Comments">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
  },
  data() {
    return {
      dataList: [],
    }
  },
  watch: {
    data() {
      this.dataList = this.data
    }
  }
}
</script>
<style lang="scss" scoped>
.caexpan {
  .caexpan-card {
    .tit {
      padding: 15px 0;
    }
    .caexpan-card-body {
      padding-left: 20px;
    }
  }
}
</style>