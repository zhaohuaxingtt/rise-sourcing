<!-- AB价-best ball表格:注意不能出现横向滚动条,翻页按钮会错位 -->
<template>
  <div :ref="ref">
    <!-- 内容表 -->
    <div class="table-box">
    <el-table
      :data="tableData"
      class="header table"
      ref="table"
      height="100%"
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
            :minWidth="item.width"
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
            :minWidth="item.width"
            align="center"
          ></el-table-column>
        </template>
        <el-table-column label="F-target" align="center">
          <el-table-column
            label="A Price"
            prop="targetAPrice"
            minWidth="70"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="B Price"
            prop="targetBPrice"
            minWidth="70"
            align="center"
          >
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center">
        <div slot="header" slot-scope="scope">
          {{ label }}
          <div class="leftAllow" @click="leftAllow($event)"></div>
          <div class="rightAllow" @click="rightAllow($event)"></div>
        </div>
          <el-table-column label="APrice" align="center" prop="lcAPrice"></el-table-column>
          <el-table-column label="BPrice" align="center" prop="lcBPrice"></el-table-column>
          <el-table-column label="Invest" align="center" prop="invest"></el-table-column>
          <el-table-column label="Supplier" align="center" prop="supplierNameZh"></el-table-column>
          <el-table-column label="Rating" align="center">
            <el-table-column label="E" align="center" prop="erate" min-width="50"></el-table-column>
            <el-table-column label="Q" align="center" prop="qrate" min-width="50"></el-table-column>
            <el-table-column label="L" align="center" prop="lrate" min-width="50"></el-table-column>
          </el-table-column>
          <el-table-column label="LTC" align="center" prop="ltc"></el-table-column>
          <el-table-column
            label="LTC Start Date"
            align="center" prop="ltcStartDate" min-width="120"
          ></el-table-column>
          <el-table-column
            label="Develop Cost"
            align="center" prop="developCost" min-width="120"
          ></el-table-column>
          <el-table-column
            label="Total Turnover"
            align="center" prop="totalTurnover" min-width="120"
          ></el-table-column>
        </el-table-column>
    </el-table>
    </div>
    <!-- 汇总表 -->
    <div :style="{ 'padding-right': gutter }">
      <el-table
        class="total-table"
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
              :minWidth="item.width"
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
              :minWidth="item.width"
              align="center"
            ></el-table-column>
          </template>
          <el-table-column label="F-target" align="center">
            <el-table-column
              label="A Price"
              prop="targetAPrice"
              minWidth="70"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="B Price"
              prop="targetBPrice"
              minWidth="70"
              align="center"
            >
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column >
          <el-table-column label="APrice" align="center" prop="lcAPrice"></el-table-column>
          <el-table-column label="BPrice" align="center" prop="lcBPrice"></el-table-column>
          <el-table-column label="Invest" align="center" prop="invest"></el-table-column>
          <el-table-column label="Supplier" align="center" prop="supplierNameZh"></el-table-column>
          <el-table-column label="Rating" align="center">
            <el-table-column label="E" align="center" prop="erate" min-width="50"></el-table-column>
            <el-table-column label="Q" align="center" prop="qrate" min-width="50"></el-table-column>
            <el-table-column label="L" align="center" prop="lrate" min-width="50"></el-table-column>
          </el-table-column>
          <el-table-column label="LTC" align="center" prop="ltc"></el-table-column>
          <el-table-column
            label="LTC Start Date"
            align="center" prop="ltcStartDate" min-width="120"
          ></el-table-column>
          <el-table-column
            label="Develop Cost"
            align="center" prop="developCost" min-width="120"
          ></el-table-column>
          <el-table-column
            label="Total Turnover"
            align="center" prop="totalTurnover" min-width="120"
          ></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="left" :style="left" @click="tabChange"></div>
    <div class="right" :style="right" @click="tabChange"></div>
    <partTableDetail :visible.sync="visible" :row="row" />
  </div>
</template>

<script>
import { getAnalysisRecommendationNomi, getAnalysisBestBallNomi } from "@/api/partsrfq/editordetail/abprice";
import partTableDetail from "./partTableDetail";
import allow from "./allow.js";
export default {
  mixins:[allow],
    components: { partTableDetail },
  data() {
    return {
      ref:'best-ball',
      label:'Recommendation',
      fixedTitle: [
        {
          prop: "fsNum",
          label: "FS No. (Plant)",
          width: 120,
        },
        {
          prop: "partNum",
          label: "Part No.",
          width: 120,
        },
        {
          prop: "carTypeProjectNum",
          label: "Carline",
          width: 80,
        },
        {
          prop: "ebr",
          label: "EBR",
          width: 60,
        },
        {
          prop: "mixQty",
          label: "Mixed Qty",
          width: 80,
        },
        {
          prop: "volume",
          label: "Volume",
          width: 100,
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
          ebr: "LTC from Start Date",
        },
        {
          ebr: "Total Invest",
        },
      ],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.tableData = []
      const getData = this.label == 'Recommendation' ? getAnalysisRecommendationNomi : getAnalysisBestBallNomi
      getData({
        nomiId: "60003714" || this.$route.query.desinateId,
      }).then((res) => {
        if (res?.code == "200") {
          const tableData = res.data.analysisNomiPriceInfoList
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
        }
      });
    },
    spliceData() {},
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
      this.label = this.label == 'Best ball'?'Recommendation':'Best ball'
      this.getData()
    },
    // 表头单元格背景调整
    cellClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0 && columnIndex == 0) {
        return "white-bg unit";
      }
      return "";
    },
    // 内容单元格蓝色背景调整
    colClass({ row, column, rowIndex, columnIndex }) {
      if (["partAPrice", "partBPrice"].includes(column.label)) {
        return row[column.property] && row[column.property] < 20
          ? "blue-border"
          : "";
      }
      return "";
    },
    totalColClass({ row, column, rowIndex, columnIndex }) {
      if ([3, 4, 5].includes(columnIndex)) {
        return "table-header";
      }
    },
    gotoDetail(row) {
      this.row = row;
      console.log(row);
      this.$nextTick(() => {
        this.visible = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.table-box{
  height: calc(100% - 120px);
}
.header {
  ::v-deep th {
    padding: 0;
    .cell {
      padding: 0 8px;
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
    background: transparent;
    .white-bg {
      background: #f8f9fa;
      .cell {
        color: #000 !important;
      }
    }
    .unit {
      vertical-align: top;
    }
  }
  .blue-border {
    background: #bdd7ee;
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
}
.left {
  width: 14px;
  height: 40px;
  background: #00b0f0;
  border-radius: 10px;
  transform: translate(-8px, 20%);
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
}
.right {
  width: 14px;
  height: 40px;
  background: #00b0f0;
  border-radius: 10px;
  transform: translate(-8px, 20%);
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
}

.table{
  ::v-deep .el-table__header {
    background-color: #364d6e;
    tr:nth-child(even){
      background-color: #364d6e;
    }
  }
}
</style>