<!-- AB价-best ball表格:注意不能出现横向滚动条,翻页按钮会错位 -->
<template>
  <div :ref="ref">
    <!-- 内容表 -->
    <el-table
      :data="tableData"
      class="header table"
      ref="table"
      border
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
            v-else-if="item.prop == 'ebr'"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ percent(scope.row.ebr) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="item.prop"
            v-else-if="item.prop == 'mixQty'"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="center"
            ><template slot="header" slot-scope="scope">
              <p v-for="(text, index) in item.label" :key="index">
                {{ text }}
              </p>
            </template>
            <template slot-scope="scope">
              <span>{{ numberProcessor(scope.row.mixQty, 2) }}</span>
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
        <el-table-column label="F-target" align="center">
          <el-table-column
            label="A Price"
            prop="targetAPrice"
            align="right"
            header-align="center"
            minWidth="80"
          >
            <template slot-scope="scope">
              {{
                numberProcessor(scope.row.targetAPrice, 2) | toThousands(true)
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="B Price"
            prop="targetBPrice"
            align="right"
            header-align="center"
            minWidth="80"
          >
            <template slot-scope="scope">
              {{
                numberProcessor(scope.row.targetBPrice, 2) | toThousands(true)
              }}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          {{ label }}
          <div class="leftAllow" @click="leftAllow($event)"></div>
          <div class="rightAllow" @click="rightAllow($event)"></div>
        </template>
        <el-table-column
          label="A Price(LC)"
          prop="lcAPrice"
          align="right"
          header-align="center"
          minWidth="80"
        >
          <template slot="header" slot-scope="scope">
            <p>A price</p>
            <p>(LC)</p>
          </template>
          <template slot-scope="scope">
            {{ numberProcessor(scope.row.lcAPrice, 2) | toThousands(true) }}
          </template></el-table-column
        >
        <el-table-column
          label="B Price(LC)"
          align="right"
          header-align="center"
          minWidth="80"
          prop="lcBPrice"
        >
          <template slot="header" slot-scope="scope">
            <p>B price</p>
            <p>(LC)</p>
          </template>
          <template slot-scope="scope">
            {{ numberProcessor(scope.row.lcBPrice, 2) | toThousands(true) }}
          </template></el-table-column
        >
        <el-table-column
          label="Invest"
          prop="invest"
          align="right"
          minWidth="100"
          header-align="center"
        ></el-table-column>
        <el-table-column
          label="Supplier"
          align="center"
          prop="supplierNameEn"
          minWidth="100"
        ></el-table-column>
        <el-table-column label="Rating" align="center">
          <el-table-column
            label="E"
            align="center"
            prop="erate"
            minWidth="40"
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
            minWidth="40"
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
            minWidth="40"
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
          label="LTC"
          align="center"
          prop="ltc"
        ></el-table-column>
        <el-table-column align="center" prop="ltcStartDate" min-width="100">
          <template slot="header" slot-scope="scope">
            <p>LTC Start</p>
            <p>Date</p>
          </template></el-table-column
        >
        <el-table-column
          align="right"
          header-align="center"
          prop="developCost"
          min-width="110"
        >
          <template slot="header" slot-scope="scope">
            <p>Develop</p>
            <p>Cost</p>
          </template></el-table-column
        >
        <el-table-column
          align="right"
          header-align="center"
          prop="totalTurnover"
          min-width="110"
          label="Total Turnover"
        >
          <template slot="header" slot-scope="scope">
            <p>Total</p>
            <p>Turnover</p>
          </template></el-table-column
        >
      </el-table-column>
    </el-table>
    <!-- 汇总表 -->
    <div ref="total-table" :style="{ 'padding-right': gutter }">
      <el-table
        class="header total-table"
        border
        :data="totalData"
        :span-method="totalCellClass"
        :cell-class-name="totalColClass"
        :show-header="false"
      >
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
              </template>
            </el-table-column>
            <el-table-column
              v-else
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center"
            ></el-table-column>
          </template>
          <el-table-column label="F-target" align="center">
            <el-table-column
              label="A Price"
              prop="targetAPrice"
              minWidth="80"
              align="right"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              label="B Price"
              prop="targetBPrice"
              minWidth="80"
              align="right"
              header-align="center"
            >
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column
            label="A Price(LC)"
            align="right"
            header-align="center"
            prop="lcAPrice"
            minWidth="80"
          >
            <template slot-scope="scope">
              {{ scope.row["lcAPrice"] | toThousands(true) }}
            </template>
          </el-table-column>
          <el-table-column
            label="B Price(LC)"
            align="right"
            header-align="center"
            prop="lcBPrice"
            minWidth="80"
          >
            <template slot-scope="scope">
              {{ scope.row["lcBPrice"] | toThousands(true) }}
            </template></el-table-column
          >
          <el-table-column
            label="Invest"
            align="right"
            header-align="center"
            prop="invest"
            minWidth="100"
          >
            <template slot-scope="scope">
              {{ getInt(scope.row["invest"]) | toThousands(true) }}
            </template></el-table-column
          >
          <el-table-column
            label="Supplier"
            align="center"
            prop="supplierNameZh"
            minWidth="100"
          ></el-table-column>
          <el-table-column label="Rating" align="center">
            <el-table-column
              label="E"
              align="center"
              prop="erate"
              min-width="40"
            ></el-table-column>
            <el-table-column
              label="Q"
              align="center"
              prop="qrate"
              min-width="40"
            ></el-table-column>
            <el-table-column
              label="L"
              align="center"
              prop="lrate"
              min-width="40"
            ></el-table-column>
          </el-table-column>
          <el-table-column
            label="LTC"
            align="center"
            prop="ltc"
          ></el-table-column>
          <el-table-column
            label="LTC Start Date"
            align="center"
            prop="ltcStartDate"
            min-width="100"
          ></el-table-column>
          <el-table-column
            label="Develop Cost"
            align="right"
            header-align="center"
            prop="developCost"
            min-width="110"
          >
            <template slot-scope="scope">
              {{ getInt(scope.row["developCost"]) | toThousands(true) }}
            </template></el-table-column
          >
          <el-table-column
            label="Total Turnover"
            align="right"
            header-align="center"
            prop="totalTurnover"
            min-width="110"
          >
            <template slot-scope="scope">
              {{ getInt(scope.row["totalTurnover"]) | toThousands(true) }}
            </template></el-table-column
          >
        </el-table-column>
      </el-table>
    </div>
    <partTableDetail :visible.sync="visible" :row="row" />
  </div>
</template>

<script>
import {
  getAnalysisRecommendationNomi,
  getAnalysisBestBallNomi,
} from "@/api/partsrfq/editordetail/abprice";
import partTableDetail from "./partTableDetail";
import { numberProcessor, toThousands, deleteThousands } from "@/utils";
export default {
  components: { partTableDetail },
  data() {
    return {
      ref: "best-ball",
      label: "Best ball",
      fixedTitle: [
        {
          prop: "fsNum",
          label: ["FS No. (Plant)"],
          width: 120,
        },
        {
          prop: "partNum",
          label: ["Part No."],
          width: 140,
        },
        {
          prop: "carTypeProjectNum",
          label: ["Carline"],
          width: 120,
        },
        {
          prop: "ebr",
          label: ["EBR"],
          width: 60,
        },
        {
          prop: "mixQty",
          label: ["Mixed", "Qty"],
          width: 60,
        },
        {
          prop: "volume",
          label: ["Volume"],
          width: 90,
        },
      ],
      tableData: [],
      visible: false,
      row: {},
      totalData: [
        {
          ebr: "Mixed Price",
        },
        {
          ebr: "Target",
        },
        {
          ebr: "Budget",
        },
      ],
      totalTableHeight: 120,
    };
  },
  filters: {
    toThousands,
  },
  updated() {
    this.$nextTick(() => {
      this.totalTableHeight = this.$refs["total-table"]?.scrollHeight + 1;
    });
  },
  created() {
    this.getData();
  },
  mounted(){
    this.$nextTick(() => {
        this.positionAllow();
      });
  },
  methods: {
    numberProcessor,
    getInt(val) {
      if (!val) return val;
      let result = val.split(",").join("");
      return (+result).toFixed(0);
    },
    percent(val) {
      return math.multiply(math.bignumber(val), 100).toString() + "%";
    },
    getData() {
      this.index = this.label == "Best ball" ? 0 : 1
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
            totalData[0]["targetAPrice"] = res.data.targetMixAPrice;
            totalData[0]["targetBPrice"] = res.data.targetMixBPrice;
            totalData[0]["lcAPrice"] = res.data.lcMixAPrice;
            totalData[0]["lcBPrice"] = res.data.lcMixBPrice;
            totalData[0]["invest"] = res.data.totalInvest;
            totalData[0]["developCost"] = res.data.totalDevelopCost;
            totalData[0]["totalTurnover"] = res.data.totalTurnover;
            totalData[1]["invest"] = res.data.totalTargetInvest;
            totalData[1]["developCost"] = res.data.targetSelTotalSel;
            totalData[2]["invest"] = res.data.totalBudgetTotalInvest;
            this.totalData = totalData;
            this.tableData = tableData;
          }else{
            this.tableData = [];
          }
        })
        .finally(() => {
          this.$nextTick(() => {
            this.$emit('setPage',{index:this.label == "Best ball" ? 0 : 1, total:2})
            // this.positionAllow();
          });
        });
    },
    isCLevel(val) {
      return val.indexOf("c") > -1 || val.indexOf("C") > -1;
    },
    // 计算表头合并
    merge(row, rowIndex, colIndex, span, type = "colSpan") {
      const col = row[rowIndex].cells;
      if (!(row || col)) return;
      if (rowIndex < 0 || colIndex < 0 || span < 0) return;
      let rowSpan = row[rowIndex].cells[colIndex].rowSpan;
      let colSpan = row[rowIndex].cells[colIndex].colSpan;
      if (type == "colSpan") {
        for (let r = 0; r < rowSpan; r++) {
          let rIndex = r + rowIndex;
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
        }
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
        return [3, 3];
      } else if (columnIndex < 3 && rowIndex < 3) {
        return [0, 0];
      }
      if ([0, 1, 2].includes(rowIndex)) {
        if (columnIndex == 3) {
          return [1, 3];
        } else if ([4, 5].includes(columnIndex)) {
          return [0, 0];
        }
      }
      if ([2, 4].includes(rowIndex)) {
        if (columnIndex == 3) {
          return [2, 3];
        } else if ([4, 5].includes(columnIndex)) {
          return [0, 0];
        }
      }
      if ([3, 5].includes(rowIndex)) {
        if (columnIndex == 3) {
          return [0, 0];
        } else if ([4, 5].includes(columnIndex)) {
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
      if (rowIndex == 0 && columnIndex == 0) {
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
      if (["Total Turnover"].includes(column.label)) {
        if (row.isMinTto) {
          return "font-green";
        }
      }
    },
    totalColClass({ row, column, rowIndex, columnIndex }) {
      if ([3, 4, 5].includes(columnIndex)) {
        return "table-header";
      }
    },
    gotoDetail(row) {
      this.row = row;
      this.$nextTick(() => {
        this.visible = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.table-box {
  height: 600px;
}
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
      .cell{
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
  }
  .leftAllow {
    position: relative;
    padding: 0;
    float: left;
  }

  .rightAllow {
    position: relative;
    padding: 0;
    float: right;
  }
  .red {
    color: #f00;
  }
}

.total-table {
  font-size: 16px !important;
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