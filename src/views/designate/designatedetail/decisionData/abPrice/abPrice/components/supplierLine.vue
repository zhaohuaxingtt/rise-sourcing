<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-02 23:24:33
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-28 13:08:45
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\abPrice\components\components\supplierBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div v-loading="loading">
    <div class="page-header margin-bottom20">
      <span class="font-size20"
        >Supplier Offer Comparison ( {{ detail.rfqId }} )</span
      >
    </div>
    <el-table
      border
      :data="tableData"
      class="header"
      ref="table"
      :header-cell-class-name="cellClass"
    >
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <div class="chart" ref="chart"></div>
        </template>
        <el-table-column
          prop="supplierNameEn"
          align="left"
          :width="labelWidth"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
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
                {{ scope.row.supplierNameEn }}
              </span>
            </div>
          </template>
        </el-table-column>
        <template v-for="(item, index) in roundList">
          <el-table-column
            :key="index + 'round' + item.round"
            :prop="'round' + item.round"
            align="center"
            minWidth="50"
          >
            <template slot-scope="scope">
              <!--------------------------------------------------------->
              <!------------------------内容是打勾------------------------>
              <!--------------------------------------------------------->
              <span
                v-if="
                  scope.row.detailVOMap['round' + item.round] &&
                  scope.row.detailVOMap['round' + item.round].schedule == 3
                "
                class="blue-color"
              >
                <span
                  class="cursor blue-color"
                  v-if="scope.row.detailVOMap['round' + item.round].isNoBidOpen"
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
                  scope.row.detailVOMap['round' + item.round] &&
                  scope.row.detailVOMap['round' + item.round].schedule == 2
                "
                class="blue-color"
              >
                X
              </span>
              <!--------------------------------------------------------->
              <!------------------------内容是横岗百分比------------------->
              <!--------------------------------------------------------->
              <template v-else>
                <span
                  v-if="
                    scope.row.detailVOMap['round' + item.round] &&
                    scope.row.detailVOMap['round' + item.round].quotationId
                  "
                  class="blue-color"
                  >{{
                    scope.row.detailVOMap["round" + item.round].schedule
                  }}</span
                >
                <span v-else>\</span>
              </template>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { icon } from "rise";
import barItem from "./barItem";
import { getLine } from "@/api/partsrfq/editordetail/abprice";
import { toThousands, deleteThousands } from "@/utils";
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
      labelWidth: 200,
      loading: false,
    };
  },
  mounted() {
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    resize() {
      this.charts && this.charts.resize();
    },
    fontSize(res) {
      const fontSize =
        parseFloat(document.getElementsByTagName("html")[0].style.fontSize) ||
        16;
      return res * (fontSize / 16);
    },
    drawLine() {
      let series = [];
      this.tableData.forEach((item, index) => {
        let seriesItem = {
          name: item.supplierNameEn,
          type: "line",
          label: {
            show: true,
            position: "right",
            fontSize: this.fontSize(18),
            formatter: (params) => {
              return toThousands(params.value, 2);
            },
          },
          data: [],
          itemStyle: {
            color: item.color,
          },
        };
        this.roundList.forEach((child) => {
          seriesItem.data.push(
            deleteThousands(
              item.detailVOMap?.["round" + child.round]?.mixAPrice || ""
            )
          );
        });
        series.push(seriesItem);
      });
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
            name: "Round",
            nameGap: -80,
            splitNumber: this.roundList.length,
            nameTextStyle: {
              fontSize: this.fontSize(18),
              verticalAlign: "bottom",
              fontFamily: "Arial",
            },
            data: this.roundList.map((item) => {
              return `${item.round}(${
                item.inquiryType == "询价轮" ? "Inquiry" : "Nego."
              })`;
            }),
            axisLabel: {
              fontSize: this.fontSize(18),
              color: "#000",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Unit: RMB",
            nameGap: 30,
            nameTextStyle: {
              fontSize: this.fontSize(18),
              align: "right",
              fontFamily: "Arial",
            },
            min: function (val) {
              return (
                val.min -
                Math.abs(parseFloat((val.max - val.min) / 10)).toFixed(2)
              );
            },
            axisLabel: {
              showMinLabel: false,
              fontSize: this.fontSize(18),
              color: "#000",
            },
          },
        ],
        textStyle: {
          fontFamily: "'Arial', 'Helvetica', 'sans-serif'",
        },
        series: series,
      };
      this.charts = this.$echarts.init(this.$refs.chart, null, {
        renderer: "svg",
      });
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
      if (this.detail.rfqId) {
        this.loading = true;
        getLine(this.$route.query.desinateId, this.detail.rfqId)
          .then((res) => {
            if (res?.code != 200) return;
            // 构建数据
            this.roundList = res.data.roundTableHead;
            this.tableData = [
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
    cellClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 1) {
        return "table-hidden";
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
  height: 400px;
}
.page-header {
  text-align: center;
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
    border-radius: 0px;
    position: absolute;
    z-index: 0;
  }
  .point {
    width: 8px;
    height: 8px;
    border-radius: 0px;
    z-index: 1;
  }
}
.header {
  ::v-deep tr {
  }
  ::v-deep tr {
    padding: 0;
    th {
      background: #fff;
      .cell {
        font-weight: 700;
        color: #fff;
      }
    }
    .table-hidden {
      display: none;
    }
    .cell {
      padding: 0;
    }
  }
}
.cell {
  display: inline-block;
  border: 1px solid #666;
  vertical-align: top;
}
.font-size20 {
  font-size: 20px;
}
.font-size16 {
  font-size: 16px;
}
</style>