<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-02 23:24:33
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-06 13:20:23
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\abPrice\components\components\supplierBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div v-loading="loading">
    <div class="page-header margin-bottom20">
      <span>Unit:RMB</span>
      <span>Supplier Offer Comparison ( {{ detail.Carline }} )</span>
      <div class="flex">
        <div class="legend">
          <span class="APrice margin-right10"></span> <span>A Price</span>
        </div>
        <div class="legend margin-left20">
          <span class="BPrice margin-right10"></span><span>BNK Price</span>
        </div>
      </div>
    </div>
    <el-table
      border
      :data="tableData"
      class="header"
      ref="table"
      :show-header="false"
      :span-method="arraySpanMethod"
    >
      <el-table-column prop="label" align="center" width="120">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0" class="chart" ref="chart">123</div>
          <template v-else>{{ scope.row.label }}</template>
        </template>
      </el-table-column>
      <template v-for="item in roundList">
        <el-table-column
          :key="item"
          prop="item"
          align="center"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import barItem from "./barItem";
import { analysisSummaryNomi } from "@/api/partsrfq/editordetail/abprice";
export default {
  components: {
    barItem,
  },
  props: {
    detail: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    detail: {
      handler(val) {
        if (val.fsNum) this.analysisSummaryNomi();
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      roundList: [1, 2, 3, 4, 5],
      tableData: [
        {
          label: "A-B Price Comparison",
        },
        {
          label: "Supplier1",
          item: "round1",
        },
        {
          label: "Supplier2",
          item: "Q",
        },
        {
          label: "Supplier3",
        },
      ],
      columnLabel: [
        "bar",
        "te",
        "q",
        "ltcStartDateList",
        "totalInvest",
        "totalDevelopCost",
        "totalTurnover",
      ], // 'bar不显示,只占位
      supplierList: [],
      fixedList: ["Recommendation", "F-Target", "KGF", "VSI"],
    };
  },
  mounted() {
    window.removeEventListener("resize", this.resize);
    // 创建dom元素之后在绘图.否则找不到元素
    this.$nextTick(()=>{
        this.drawLine();
    })
  },
  methods: {
    resize(){
      this.charts && this.charts.resize()
    },
    drawLine() {
      this.charts = this.$echarts.init(this.$refs.chart);
      let options = {
        title: {
          show: false,
        },
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          show: false,
        },
        grid: {
          left: "120",
          right: "0",
          bottom: "10",
          containLabel: false,
        },
        xAxis: [
          {
            type: "category",
            data: ['item1','item2','item3','item4','item5'],
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "APrice",
            type: "line",
            label: {
              show: true,
              position: "inside",
            },
            data: [12,313,23,123,14],
            itemStyle: {
              color: "#516894",
            },
          },
          {
            name: "BPrice",
            type: "line",
            label: {
              show: true,
              position: "inside",
            },
            data: [1,23,21,4,5],
            itemStyle: {
              color: "#d8ddd7",
            },
          },
        ],
      };
      this.charts.setOption(options);
    },
    analysisSummaryNomi() {
      analysisSummaryNomi({
        nomiId: "60003714" || this.$route.query.desinateId,
        fsGsNumList: this.detail?.fsNum ? [this.detail?.fsNum] : undefined,
      }).then((res) => {
        if (res?.code != 200) return;
        this.supplierList =
          res.data.nomiAnalysisSummarySuppliers.map((item) => {
            let ltcList = [];
            let ltcStartDateList = [];
            item.analysisSummaryParts.forEach((child) => {
              if (!ltcList.includes(child.ltc)) ltcList.push(child.ltc);
              if (!ltcStartDateList.includes(child.ltcStartDate))
                ltcStartDateList.push(child.ltcStartDate);
            });
            item.ltcList = ltcList;
            item.ltcStartDateList = ltcStartDateList;
            return item;
          }) || [];
        this.tableData[4].Recommendation = "222,000";
        this.tableData[5].Recommendation = "222,000";
        this.tableData[5]["F-Target"] = "222,000";
        this.tableData[5]["KGF"] = "222,000";
        this.tableData[6].Recommendation = "222,000";
        return;
      });
    },
    colClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 2) {
        return "table-header";
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        if (columnIndex == 0) {
          return [1, this.roundList.length+1];
        } else {
          return [0, 0];
        }
      }
    },
  },
    destroyed() {
        window.removeEventListener("resize", this.resize);
    },
};
</script>

<style lang="scss" scoped>
.chart{
    width: 100%;
    height: 300px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  .legend {
    display: flex;
    align-items: center;
    .APrice {
      height: 20px;
      width: 20px;
      background: #516894;
    }
    .BPrice {
      height: 20px;
      width: 20px;
      background: #d8ddd7;
    }
  }
}
.header {
  ::v-deep tr {
    padding: 0;
    .table-header {
      background: #364d6e;
      .cell {
        font-weight: 700;
        color: #fff;
      }
    }
    &:hover > td.table-header {
      background-color: #364d6e;
    }
    .cell {
      padding: 0;
    }
  }
}
.height160 {
  height: 160px;
}
.height120 {
  height: 120px;
}
.height40 {
  height: 40px;
}
.cell {
  display: inline-block;
  border: 1px solid #666;
  vertical-align: top;
}
</style>