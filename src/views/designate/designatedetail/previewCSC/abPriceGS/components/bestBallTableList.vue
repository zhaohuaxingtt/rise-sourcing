<!-- AB价-best ball表格:注意不能出现横向滚动条,翻页按钮会错位 -->
<template>
  <div style="height: 100%" :ref="ref">
    <!-- 内容表 -->
    <el-table
      :data="tableData"
      class="header table"
      ref="table"
      height="100%"
      border
      show-summary
      :summary-method="summaryMethod"
      :header-cell-class-name="cellClass"
      :cell-class-name="colClass"
    >
      <!-- 左侧固定表头 -->
      <el-table-column label="Unit：RMB">
        <template v-for="item in fixedTitle">
          <el-table-column
            :key="item.prop"
            v-if="item.prop == 'fsNum'"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="center"
          >
            <template slot-scope="scope">
              <span class="link" @click="gotoDetail(scope.row)">{{
                scope.row[item.prop]
              }}</span>
              <br />
              <span class="link" @click="gotoDetail(scope.row)"
                >({{ scope.row.factoryEn }})</span
              >
            </template>
          </el-table-column>
          <el-table-column
            :key="item.prop"
            v-else-if="item.prop == 'volume'"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="right"
            header-align="center"
          >
            <template slot-scope="scope">
              {{ getInt(scope.row[item.prop]) | toThousands(true) }}
            </template>
          </el-table-column>
          <el-table-column
            :key="item.prop"
            v-else-if="item.prop == 'carTypeProjectNum'"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="center"
          >
            <template slot-scope="scope">
              <tooltip :text="scope.row.carTypeNames.join('、')" />
            </template>
          </el-table-column>
          <el-table-column
            :key="item.prop"
            v-else-if="item.tooltip"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="center"
          >
            <template slot-scope="scope">
              <tooltip :text="scope.row[item.prop]" />
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="center"
            ><template slot="header" slot-scope="scope">
              <p v-for="(text, index) in item.label" :key="index">
                {{ text }}
              </p>
            </template></el-table-column
          >
        </template>
        <el-table-column label="Current" align="center">
          <el-table-column
            label="Supplier"
            prop="currentSupplier"
            align="right"
            header-align="center"
            minWidth="85"
          >
            <template slot-scope="scope">
              <tooltip :text="scope.row.currentSupplier"></tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="A Price"
            prop="currentAPrice"
            align="right"
            header-align="center"
            minWidth="85"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                trigger="hover"
                v-if="+scope.row.selAPrice"
              >
                <div>
                  <div>
                    {{ language("零件目标价A价", "零件目标价A价") }}：{{
                      (
                        deleteThousands(scope.row.currentAPrice) -
                        scope.row.selAPrice
                      ).toFixed(2) | toThousands(true)
                    }}
                  </div>
                  <div>
                    {{ language("SEL目标价", "SEL目标价") }}：{{
                      (scope.row.selAPrice || "0.00") | toThousands(true)
                    }}
                  </div>
                </div>
                <div slot="reference">
                  <p>
                    <span style="color: red">*</span>
                    <span>
                      {{
                        deleteThousands(scope.row.currentAPrice)
                          | toThousands(true)
                      }}</span
                    >
                  </p>
                </div>
              </el-popover>
              <template v-else>
                {{
                  deleteThousands(scope.row.currentAPrice) | toThousands(true)
                }}
              </template>
            </template>
          </el-table-column>
          <el-table-column
            label="B Price"
            prop="currentBPrice"
            align="right"
            header-align="center"
            minWidth="85"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                trigger="hover"
                v-if="+scope.row.selAPrice"
              >
                <div>
                  <div>
                    {{ language("零件目标价A价", "零件目标价A价") }}：{{
                      (
                        deleteThousands(scope.row.currentBPrice) -
                        scope.row.selAPrice
                      ).toFixed(2) | toThousands(true)
                    }}
                  </div>
                  <div>
                    {{ language("SEL目标价", "SEL目标价") }}：{{
                      (scope.row.selAPrice || "0.00") | toThousands(true)
                    }}
                  </div>
                </div>
                <div slot="reference">
                  <p>
                    <span style="color: red">*</span>
                    <span>
                      {{
                        deleteThousands(scope.row.currentBPrice)
                          | toThousands(true)
                      }}</span
                    >
                  </p>
                </div>
              </el-popover>
              <template v-else>
                {{
                  deleteThousands(scope.row.currentBPrice) | toThousands(true)
                }}
              </template>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          {{ label }}
        </template>
        <el-table-column
          label="Supplier"
          align="center"
          prop="supplierNameEn"
          minWidth="100"
        >
          <template slot-scope="scope">
            <tooltip :text="scope.row['supplierNameEn']">
              <template slot="content">
                <p :title="scope.row.supplierFullNameZh">
                  {{ scope.row.supplierFullNameZh }}
                </p>
                <p :title="scope.row.supplierFullNameEn">
                  ({{ scope.row.supplierFullNameEn }})
                </p>
              </template>
            </tooltip>
          </template>
        </el-table-column>
        <el-table-column label="Rating" align="center">
          <el-table-column
            label="E"
            align="center"
            prop="erate"
            min-width="40"
          >
            <template slot-scope="scope">
              <span class="red" v-if="isCLevel(scope.row.erate)">{{
                scope.row.erate
              }}</span>
              <span v-else>{{ scope.row.erate }}</span>
            </template></el-table-column
          >
          <el-table-column
            label="Q"
            align="center"
            prop="qrate"
            min-width="40"
          >
            <template slot-scope="scope">
              <span class="red" v-if="isCLevel(scope.row.qrate)">{{
                scope.row.qrate
              }}</span>
              <span v-else>{{ scope.row.qrate }}</span>
            </template></el-table-column
          >
          <el-table-column
            label="L"
            align="center"
            prop="lrate"
            min-width="40"
          >
            <template slot-scope="scope">
              <span class="red" v-if="isCLevel(scope.row.lrate)">{{
                scope.row.lrate
              }}</span>
              <span v-else>{{ scope.row.lrate }}</span>
            </template></el-table-column
          >
        </el-table-column>
        <el-table-column
          label="A Price(LC)"
          prop="lcAPrice"
          align="right"
          header-align="center"
          minWidth="85"
        >
          <template slot="header" slot-scope="scope">
            <p>A Price</p>
          </template>
          <template slot-scope="scope">
            <span
              v-if="
                scope.row.quotationType == 'SKD' ||
                scope.row.quotationType == 'SKDLC'
              "
              style="color: red"
              >*</span
            >{{ numberProcessor(scope.row.lcAPrice, 2) | toThousands(true) }}
          </template></el-table-column
        >
        <el-table-column
          label="B Price(LC)"
          align="right"
          header-align="center"
          minWidth="85"
          prop="lcBPrice"
        >
          <template slot="header" slot-scope="scope">
            <p>B Price</p>
          </template>
          <template slot-scope="scope">
            <span
              v-if="
                scope.row.quotationType == 'SKD' ||
                scope.row.quotationType == 'SKDLC'
              "
              style="color: red"
              >*</span
            >{{ numberProcessor(scope.row.lcBPrice, 2) | toThousands(true) }}
          </template></el-table-column
        >
        <el-table-column
          label="LTC"
          align="center"
          prop="ltc"
        ></el-table-column>
        <el-table-column align="center" prop="ltcStartDate" min-width="80">
          <template slot="header" slot-scope="scope">
            <p>LTC</p>
            <p>Start</p>
            <p>Date</p>
          </template>
          <template slot-scope="scope">
            <template v-if="scope.row.ltc != 0">{{
              scope.row.ltcStartDate
            }}</template>
          </template></el-table-column
        >
        <el-table-column
          label="Invest"
          prop="invest"
          align="right"
          minWidth="85"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              v-if="scope.row.investFeeIsShared && scope.row.invest"
            >
              <div>
                <div>
                  Apportioned amount：{{ scope.row.toolingShareTotal }}
                </div>
                <div>
                  Unassessed amount：{{ scope.row.toolingNotShareTotal }}
                </div>
              </div>
              <div slot="reference">
                <span style="color: red">*</span>{{ scope.row.invest }}
              </div>
            </el-popover>
            <template v-else>
              {{ scope.row.invest }}
            </template>
          </template></el-table-column
        >
        <el-table-column
          align="right"
          header-align="center"
          prop="releaseCost"
          min-width="100"
        >
          <template slot="header" slot-scope="scope">
            <p>Release</p>
            <p>Cost</p>
          </template>
        </el-table-column>
        <el-table-column
          align="right"
          header-align="center"
          prop="totalTurnover"
          min-width="110"
          label="Total Turnover"
        >
          <template slot="header" slot-scope="scope">
              <div class="icon-box">
                <div class="margin-right5">
                  <p>Total</p>
                  <p>Turnover</p>
                </div>
                <el-tooltip effect="light" placement="top" content="base on RFQ volume and latest Quotation">
                  <span>
                    <icon symbol name="iconxinxitishi" />
                  </span>
                </el-tooltip>
              </div>
            </template></el-table-column
        >
      </el-table-column>
      <el-table-column>
        <el-table-column
          align="right"
          header-align="center"
          prop="saving"
          min-width="100"
        >
          <template slot="header" slot-scope="scope">
              <div class="icon-box">
                <div class="margin-right5">
                  <p>Saving</p>
                  <p>@100%</p>
                  <p>Share</p>
                </div>
                <el-tooltip effect="light" placement="top" content="Total Turnover + Develop cost + Release cost - TTO of current supplier">
                  <span>
                    <icon symbol name="iconxinxitishi" />
                  </span>
                </el-tooltip>
              </div>
            </template></el-table-column
        >
        <el-table-column
          align="right"
          header-align="center"
          prop="sopDate"
          min-width="80"
          label="SOP"
        >
          <template slot-scope="scope">
            {{ format(scope.row.sopDate) }}
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <partTableDetail :visible.sync="visible" :row="row" />
  </div>
</template>

<script>
import tooltip from "../../components/tooltip.vue";
import {
  getAnalysisRecommendationNomi,
  getAnalysisBestBallNomi,
} from "@/api/partsrfq/editordetail/abprice";
import partTableDetail from "./partTableDetail";
import bestBallTableListTotal from "./bestBallTableListTotal";
import { numberProcessor, toThousands, deleteThousands } from "@/utils";
import { icon } from "rise";
export default {
  components: { partTableDetail, tooltip, bestBallTableListTotal, icon },
  data() {
    return {
      ref: "best-ball",
      label: "Best ball",
      fixedTitle: [
        {
          prop: "fsNum",
          label: ["GS No. (Plant)"],
          width: 130,
        },
        {
          prop: "partNum",
          label: ["Part No."],
          width: 120,
        },
        {
          prop: "carTypeProjectNum",
          label: ["Carline"],
          tooltip: true,
          width: 120,
        },
        {
          prop: "volume",
          label: ["Volume"],
          width: 80,
        },
      ],
      tableData: [],
      visible: false,
      row: {},
      totalData: [
        {
          partNum: "Total",
        },
        {
          partNum: "Budget",
        },
      ],
    };
  },
  filters: {
    toThousands,
  },
  created() {
    this.getData();
  },
  methods: {
    numberProcessor,
    deleteThousands,
    format(date) {
      if (!date) return "";
      return window.moment(date).format("YYYY-MM");
    },
    getInt(val) {
      if (!val) return val;
      let result = val.split(",").join("");
      return (+result).toFixed(0);
    },
    percent(val) {
      return (val * 100).toFixed(2) + "%";
    },
    getData() {
      this.index = this.label == "Best ball" ? 0 : 1;
      const getData =
        this.label == "Recommendation"
          ? getAnalysisRecommendationNomi
          : getAnalysisBestBallNomi;
      getData({
        nomiId: this.$route.query.desinateId,
      })
        .then((res) => {
          if (res?.code == "200") {
            let tableData = res.data.analysisNomiPriceInfoList;
            const totalData = JSON.parse(JSON.stringify(this.totalData));
            totalData[0]["invest"] = res.data.totalInvest;
            totalData[0]["totalReleaseCost"] = res.data.totalReleaseCost;
            totalData[0]["totalTurnover"] = res.data.totalTurnover;
            totalData[0]["totalSaving"] = res.data.totalSaving;
            totalData[1]["invest"] = res.data.totalBudgetTotalInvest;
            this.totalData = totalData;
            this.tableData = tableData;
          } else {
            this.tableData = [];
          }
        })
        .finally(() => {
          this.$nextTick(() => {
            this.setColSpan();
            this.$emit("setPage", {
              index: this.label == "Best ball" ? 0 : 1,
              total: 2,
            });
            this.$refs.table.doLayout(); // table重新布局
          });
        });
    },
    isCLevel(val) {
      if (!val) return val;
      return val.indexOf("c") > -1 || val.indexOf("C") > -1;
    },
    setColSpan() {
      const row =
        this.$refs["best-ball"]?.getElementsByClassName("el-table__footer")[0]
          .rows;
      //   行数据,行,列,合并数,方向
      this.merge(row, 0, 0, 20, "colSpan");
    },
    // 计算表头合并
    merge(row, rowIndex, colIndex, span, type = "colSpan") {
      const col = row[rowIndex].cells;
      if (!(row || col)) return;
      if (rowIndex < 0 || colIndex < 0 || span < 0) return;
      let rowSpan = row[rowIndex].cells[colIndex].rowSpan;
      let colSpan = row[rowIndex].cells[colIndex].colSpan;
      if (type == "colSpan") {
        // for (let r = 0; r < rowSpan; r++) {
        let rIndex = rowIndex;
        let colSpan_ = row[rIndex].cells[colIndex].colSpan;
        for (let i = 1; i < span; i++) {
          let cIndex = i + colIndex;
          colSpan_ += row[rIndex].cells[cIndex].colSpan;
          if (colSpan_ == span) {
            row[rIndex].cells[cIndex].style.display = "none";
            break;
          }
          if (colSpan_ > span) {
            row[rIndex].cells[cIndex].colSpan = colSpan_ - span;
            break;
          }
          row[rIndex].cells[cIndex].style.display = "none";
        }
        // }
      }
      if (type == "rowSpan") {
        for (let c = 0; c < colSpan; c++) {
          let cIndex = c + colIndex;
          let rowSpan_ = row[rowIndex].cells[cIndex].rowSpan || 1;
          for (let i = 1; i < span; i++) {
            let rIndex = i + rowIndex;
            rowSpan_ += row[rIndex].cells[cIndex].rowSpan;
            if (rowSpan_ == span) {
              row[rIndex].cells[cIndex].style.display = "none";
              break;
            }
            if (rowSpan_ > span) {
              row[rIndex].cells[cIndex].rowSpan = rowSpan_ - span;
              break;
            }
            row[rIndex].cells[cIndex].style.display = "none";
          }
        }
      }
      row[rowIndex].cells[colIndex][type] = span;
    },
    // 计算统计表表头合并
    totalCellClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 && rowIndex == 0) {
        return [3, 1];
      } else if (columnIndex == 0 && rowIndex < 3) {
        return [0, 0];
      }
      if ([0, 1].includes(rowIndex)) {
        if (columnIndex == 1) {
          return [1, 3];
        } else if ([2, 3].includes(columnIndex)) {
          return [0, 0];
        }
      }
    },
    tabChange() {
      this.label = this.label == "Best ball" ? "Recommendation" : "Best ball";
      this.getData();
    },
    // 表头单元格背景调整
    cellClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0 && [0, 2].includes(columnIndex)) {
        return "white-bg unit";
      } else if (rowIndex == 0) {
        return "primary-label";
      }
      return "";
    },
    // 内容单元格蓝色背景调整
    colClass({ row, column, rowIndex, columnIndex }) {
      if (["A Price(LC)", "B Price(LC)"].includes(column.label)) {
        if (this.label == "Best ball") {
          // best_ball 全绿,只判断蓝色背景
          if (row.suggestFlag) {
            return "blue-border font-green";
          } else {
            return "font-green";
          }
        } else {
          if (row.isFsMinTto) {
            // recommendation 全蓝, 但是绿色需要判断
            return "blue-border font-green";
          } else {
            return "blue-border";
          }
        }
      }
      if ([4, 5, 6].includes(columnIndex)) {
        return "current-column";
      }
      let className = "";
      if (columnIndex > 6 && columnIndex < 18) {
        if (this.label == "Best ball") {
          // best_ball 全绿,只判断蓝色背景
          if (row.suggestFlag) {
            className += "blue-border";
          }
        } else {
          className += "blue-border";
        }
      }
      if (["Total Turnover"].includes(column.label)) {
        if (this.label == "Best ball") {
          className += " font-green";
        } else if (row.isFsMinTto) {
          className += " font-green";
        }
      }
      return className;
    },
    totalColClass({ row, column, rowIndex, columnIndex }) {
      if ([1, 2, 3].includes(columnIndex)) {
        return "table-header";
      }
    },
    gotoDetail(row) {
      this.row = JSON.parse(JSON.stringify(row));
      this.$nextTick(() => {
        this.visible = true;
      });
    },
    summaryMethod(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = <bestBallTableListTotal totalData={this.totalData} />;
          return;
        }
      });
      return sums;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  ::v-deep th {
    padding-top: 4px;
    padding-bottom: 4px;
    .cell {
      padding: 0 4px;
    }
  }
  ::v-deep td {
    padding-top: 4px;
    padding-bottom: 4px;
    .cell {
      padding: 0 4px;
    }
  }
}
.table-header-content {
  ::v-deep tr {
    padding: 0;
    .cell {
      color: #000 !important;
    }
  }
}
::v-deep .el-table {
  .hidden {
    display: none;
  }
  .el-table__header {
    .primary-label {
      height: 36px;
      line-height: 36px;
      .cell {
        line-height: 36px !important;
        height: 100%;
      }
    }
    .white-bg {
      background: #fff;
      .cell {
        color: #000 !important;
      }
    }
    .icon-box{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .el-table__footer-wrapper {
    .el-table__footer {
      .has-gutter {
        & > tr {
          & > td {
            padding: 0;
            .cell {
              padding: 0;
            }
            &:first-of-type {
              border-right: 0;
            }
          }
        }
      }
    }
  }
  .red {
    color: #f00;
  }
}

.total-table {
  // font-size: 16px !important;
  ::v-deep .el-table__row {
    height: unset !important;
  }

  ::v-deep tr {
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
  }
  ::v-deep td {
    padding-top: 0px;
    padding-bottom: 0px;
    .cell {
      padding: 0 4px;
    }
  }
}
.left {
  transform: translate(-11px, -4.5px);
  width: 12px;
  height: 105px;
  background: #0092eb;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  z-index: 999;
  .icon {
    transform: rotate(180deg);
    width: 12px;
    user-select: none;
  }
}
.right {
  transform: translate(-3px, -4.5px);
  width: 12px;
  height: 105px;
  background: #0092eb;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  z-index: 999;
  .icon {
    width: 12px;
    user-select: none;
  }
}

.table {
  ::v-deep .el-table__header {
    background-color: #364d6e;
    tr:nth-child(even) {
      background-color: #364d6e;
    }
  }
}

.tips {
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  .legend {
    display: inline-block;
    width: 25px;
    height: 20px;
    background: #bdd7ee;
  }
}
</style>