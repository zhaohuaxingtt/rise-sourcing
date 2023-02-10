<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-02 23:24:33
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-10 09:40:14
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\abPrice\components\components\supplierBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div v-loading="loading">
    <div class="page-header margin-bottom20">
      <span>Unit:RMB</span>
      <span>Supplier Offer Comparison ( {{ detail.rfqId }} )</span>
      <span></span>
    </div>
    <el-table
      border
      :data="tableData"
      class="header"
      ref="table"
      :show-header="false"
      :span-method="arraySpanMethod"
    >
      <el-table-column prop="supplierName" align="left" :width="labelWidth">
        <template slot-scope="scope">
          <div v-if="scope.$index == 0" class="chart" ref="chart"></div>
          <template v-else>
            <div class="flex">
              <div class="legend margin-right5">
                <span
                  class="line"
                  :style="{ background: scope.row.color }"
                ></span
                ><span
                  class="point"
                  :style="{ background: scope.row.color }"
                ></span>
              </div>
              <span>
                {{ scope.row.supplierName }}
              </span>
            </div>
          </template>
        </template>
      </el-table-column>
      <template v-for="item in roundList">
        <el-table-column :key="item" :prop="item" align="center" minWidth="160">
          <!-- <template slot-scope="scope">{{scope.row.detailVOMap[item].schedule}}</template> -->

          <template slot-scope="scope">
            <!--------------------------------------------------------->
            <!------------------------内容是打勾------------------------>
            <!--------------------------------------------------------->
            <span
              v-if="
                scope.row.detailVOMap[item] &&
                scope.row.detailVOMap[item].schedule == 3
              "
              class="blue-color"
            >
              <span
                class="cursor blue-color"
                v-if="scope.row.detailVOMap[item].isNoBidOpen"
                >―</span
              >
              <icon
                v-else
                name="iconbaojiazhuangtailiebiao_yibaojia"
                symbol
              ></icon>
            </span>
            <!--------------------------------------------------------->
            <!------------------------内容是打叉------------------------>
            <!--------------------------------------------------------->
            <span
              v-else-if="
                scope.row.detailVOMap[item] &&
                scope.row.detailVOMap[item].schedule == 2
              "
              class="blue-color"
            >
              X
            </span>
            <!--------------------------------------------------------->
            <!------------------------内容是打叉------------------------>
            <!--------------------------------------------------------->
            <span v-else class="blue-color"> — </span>
            <!--------------------------------------------------------->
            <!------------------------内容是横岗百分比------------------->
            <!--------------------------------------------------------->
            <template v-else>
              <span
                class="blue-color"
                v-if="
                  scope.row.detailVOMap[item] &&
                  scope.row.detailVOMap[item].isNoBidOpen
                "
                >―</span
              >
              <template v-else>
                <span
                  v-if="
                    scope.row.detailVOMap[item] &&
                    scope.row.detailVOMap[item].quotationId
                  "
                  class="blue-color"
                  >{{ scope.row.detailVOMap[item].schedule }}</span
                >
                <span v-else>\</span>
              </template>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { icon } from "rise";
import barItem from "./barItem";
import { getLine } from "@/api/partsrfq/editordetail/abprice";
export default {
  components: {
    barItem,
    icon,
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
        if (val.rfqId) this.getLine();
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      roundList: [],
      tableData: [],
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
      labelWidth: 200,
      loading: false,
    };
  },
  created() {},
  mounted() {
    window.removeEventListener("resize", this.resize);
    // 创建dom元素之后在绘图.否则找不到元素
    // this.$nextTick(() => {
    //   this.drawLine();
    // });
  },
  methods: {
    resize() {
      this.charts && this.charts.resize();
    },
    drawLine() {
      let series = [];
      this.tableData.forEach((item, index) => {
        // index==0 是折线图占位用的
        if (index > 0) {
          let seriesItem = {
            name: item.supplierName,
            type: "line",
            label: {
              show: true,
              position: "right",
            },
            data: [],
            itemStyle: {
              color: item.color,
            },
          };
          this.roundList.forEach((key) => {
            seriesItem.data.push(item.detailVOMap?.[key]?.mixAPrice || "");
          });
          series.push(seriesItem);
        }
      });
      this.charts = this.$echarts.init(this.$refs.chart);
      let options = {
        title: {
          show: false,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          show: false,
        },
        grid: {
          left: this.labelWidth,
          right: "0",
          bottom: "30",
          containLabel: false,
        },
        xAxis: [
          {
            type: "category",
            data: this.roundList,
          },
        ],
        yAxis: [
          {
            type: "value",
            min: function (val) {
              return (
                val.min -
                Math.abs(parseFloat((val.max - val.min) / 10)).toFixed(2)
              );
            },
          },
        ],
        series: series,
      };
      this.charts.setOption(options);
    },
    getLine() {
      let colorList = [
        "#f7ae43",
        "#d732a7",
        "#6f90f5",
        "#57deda",
        "#9ed4e8",
        "#f49593",
        "#b2dc9e",
      ];
      console.log(this.detail.rfqId);
      if (this.detail.rfqId) {
        this.loading = true;
        getLine(this.detail.rfqId)
          .then((res) => {
            if (res?.code != 200) return;
            // 构建数据
            this.roundList = res.data.roundTableHead.map(
              (item) => "round" + item.round
            );
            this.tableData = [
              { type: "line" },
              ...res.data.roundQuotationVOS.map((item, index) => {
                let cIndex = index;
                if (index >= colorList.length)
                  cIndex = index % colorList.length;
                item.color = colorList[cIndex];
                return item;
              }),
            ];

            this.$nextTick(() => {
              setTimeout(() => {
                this.drawLine();
              }, 280);
            });
            return;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    colClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 2) {
        return "table-header";
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        if (columnIndex == 0) {
          return [1, this.roundList.length + 1];
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
.chart {
  width: 100%;
  height: 600px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
}
.legend {
  margin-left: 10px;
  width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .line {
    width: 40px;
    height: 4px;
    border-radius: 4px;
    position: absolute;
    z-index: 0;
  }
  .point {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    z-index: 1;
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