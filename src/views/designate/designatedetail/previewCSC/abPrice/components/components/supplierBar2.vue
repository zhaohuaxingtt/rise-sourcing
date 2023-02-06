<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-02 23:24:33
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-06 12:30:26
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\abPrice\components\components\supplierBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="page-header margin-bottom20">
      <span>Unit:RMB</span>
      <span>Supplier Offer Comparison ( {{ detail.carTypeProjectNum }} )</span>
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
      :highlight-current-row="false"
      :cell-class-name="colClass"
      :show-header="false"
      :span-method="arraySpanMethod"
    >
      <el-table-column
        prop="label"
        align="center"
        width="120"
      ></el-table-column>
      <el-table-column prop="subLabel" align="center" width="60">
      </el-table-column>
      <el-table-column prop="remark" align="center" width="1">
      </el-table-column>
      <template v-for="item in supplierList">
        <el-table-column :key="item.supplier" align="center" minWidth="140px">
          <template slot-scope="scope">
            <div
              v-if="scope.row.label == 'A-B Price Comparison'"
              class="bar"
              ref="bar"
            ></div>
            <template
              v-if="['ltcStartDateList'].includes(columnLabel[scope.$index])"
            >
              <p v-for="(child, i) in item[columnLabel[scope.$index]]" :key="i">
                {{ child }}
              </p>
            </template>
            <template v-else>
              {{ item[columnLabel[scope.$index]] }}
            </template>
          </template>
        </el-table-column>
      </template>
      <template v-for="prop in fixedList">
        <el-table-column
          :prop="prop"
          :key="prop"
          align="center"
          minWidth="140px"
        >
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { analysisSummaryNomi } from "@/api/partsrfq/editordetail/abprice";
export default {
  props: {
    detail: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    detail: {
      handler(val) {
        this.analysisSummaryNomi();
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      tableData: [
        {
          label: "A-B Price Comparison",
        },
        {
          label: "Rating",
          subLabel: "E",
        },
        {
          label: "Rating",
          subLabel: "Q",
        },
        {
          label: "LTC from Start Date",
        },
        {
          label: "Total Invest",
          Recommendation: "",
          "F-Target": "",
          KGF: "",
          VSI: "",
        },
        {
          label: "Total Develop Cost",
          Recommendation: "",
          "F-Target": "",
          KGF: "",
          VSI: "",
        },
        {
          label: "Total Turnover",
          Recommendation: "",
          "F-Target": "",
          KGF: "",
          VSI: "",
        },
        {
          label: "Strategy",
          remark: `这是一段文字描述描述这是一段文字描述描述这是一段文字描述描述这是一段文
                字描述描述这是一段文字描述描述这是一段文字描述描述这是一段文字描述描述这是一段文字描述描述`,
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
      apiInfos: {},
      charts: null,
    };
  },
  methods: {
    analysisSummaryNomi() {
      analysisSummaryNomi({
        nomiId: "60003714" || this.$route.query.desinateId,
        fsGsNumList: this.detail?.fsGsList || undefined,
      }).then((res) => {
        if (res?.code != 200) return;
        this.apiInfos = res.data;
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
        this.$nextTick(() => {
          this.drawBar();
        });
      });
    },
    colClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 2) {
        return "table-header";
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        if (columnIndex == 3) {
          return [1, this.supplierList.length + 5];
        } else if (columnIndex > 3) {
          return [0, 0];
        }
      }
      if (columnIndex == 0 && ![1, 2].includes(rowIndex)) {
        return [1, 2];
      }
      if (columnIndex == 1 && ![1, 2].includes(rowIndex)) {
        return [0, 0];
      }
      if (columnIndex == 0 && [1].includes(rowIndex)) {
        return [2, 1];
      }
      if (columnIndex == 0 && [2].includes(rowIndex)) {
        return [0, 0];
      }
      if (columnIndex == 2 && [7].includes(rowIndex)) {
        return [2, this.supplierList.length + 5];
      }
      if (
        columnIndex > 2 &&
        columnIndex < this.supplierList.length + 5 &&
        [7].includes(rowIndex)
      ) {
        return [0, 0];
      }
    },
    toNumber(num1, num2) {
      return (parseFloat(num1) + parseFloat(num2)).toFixed(2);
    },
    drawBar() {
      this.totalList = [
        // supplier
        ...this.supplierList.map((item) =>
          this.toNumber(item.mixAPrice, item.mixBPrice)
        ),
        // recommendation
        this.toNumber(
          this.apiInfos.recommendationNomi.lcMixAPrice,
          this.apiInfos.recommendationNomi.lcMixBPrice
        ),
        // F-target
        // KGF
        // VSI
      ];
      this.charts = this.$echarts.init(this.$refs.bar[0]);
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
          left: "0",
          right: "0",
          bottom: "40",
          containLabel: false,
        },
        xAxis: [
          {
            type: "category",
            data: [
              ...this.supplierList.map((item) => item.supplier),
              ...this.fixedList,
            ],
            // axisTick: {
            //   show: false,
            // },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "APrice",
            type: "bar",
            label: {
              show: true,
              position: "inside",
            },
            // barWidth:'60',
            barMaxWidth: "140",
            barMinWidth: "40",
            barMinHeight: "10",
            stack: "Supplier",
            data: [
              ...this.supplierList.map((item) => item.mixAPrice),
              this.apiInfos.recommendationNomi.lcMixAPrice,
            ],
            itemStyle: {
              color: "#516894",
            },
          },
          {
            name: "BPrice",
            type: "bar",
            label: {
              show: true,
              position: "inside",
            },
            barMaxWidth: "140",
            barMinWidth: "40",
            barMinHeight: "10",
            stack: "Supplier",
            data: [
              ...this.supplierList.map((item) => item.mixBPrice),
              this.apiInfos.recommendationNomi.lcMixAPrice,
            ],
            itemStyle: {
              color: "#d8ddd7",
            },
          },
          {
            name: "Total",
            type: "bar",
            label: {
              show: true,
              position: "top",
              distance: 15,
              fontWeight: "bold",
              formatter: (params) => {
                return this.totalList[params.dataIndex] || "";
              },
            },
            stack: "Supplier",
            data: [
              ...this.supplierList.map(() => 0),
              ...this.fixedList.map(() => 0),
            ],
          },
        ],
      };
      this.charts.setOption(options);
    },
  },
};
</script>

<style lang="scss" scoped>
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
.bar {
  height: 300px;
}
</style>