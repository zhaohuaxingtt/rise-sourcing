<!-- AB价-best ball表格:注意不能出现横向滚动条,翻页按钮会错位 -->
<template>
  <div :ref="ref">
    <el-table
      class="total-table"
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
            minWidth="85"
            align="right"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            label="B Price"
            prop="targetBPrice"
            minWidth="85"
            align="right"
            header-align="center"
          >
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column>
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
            min-width="60"
          ></el-table-column>
          <el-table-column
            label="Q"
            align="center"
            prop="qrate"
            min-width="60"
          ></el-table-column>
          <el-table-column
            label="L"
            align="center"
            prop="lrate"
            min-width="60"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          label="A Price(LC)"
          align="right"
          header-align="center"
          prop="lcAPrice"
          minWidth="85"
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
          minWidth="85"
        >
          <template slot-scope="scope">
            {{ scope.row["lcBPrice"] | toThousands(true) }}
          </template></el-table-column
        >
        <el-table-column
          label="LTC"
          align="center"
          prop="ltc"
        ></el-table-column>
        <el-table-column
          label="LTC Start Date"
          align="center"
          prop="ltcStartDate"
          min-width="80"
        ></el-table-column>
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
          label="Develop Cost"
          align="right"
          header-align="center"
          prop="developCost"
          min-width="100"
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
</template>

<script>
import { numberProcessor, toThousands } from "@/utils";
export default {
  props: {
    totalData: { type: Array, default: () => [] },
  },
  data() {
    return {
      ref: "best-ball",
      label: "Best ball",
      fixedTitle: [
        {
          prop: "fsNum",
          label: ["FS No. (Plant)"],
          width: 130,
        },
        {
          prop: "partNum",
          label: ["Part No."],
          width: 140,
        },
        {
          prop: "carTypeProjectNum",
          label: ["Carline"],
          tooltip: true,
          width: 120,
        },
        {
          prop: "ebr",
          label: ["EBR"],
          width: 85,
        },
        {
          prop: "mixQty",
          label: ["Mixed", "Qty"],
          width: 60,
        },
        {
          prop: "volume",
          label: ["Volume"],
          width: 85,
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
    };
  },
  filters: {
    toThousands,
  },
  methods: {
    numberProcessor,
    getInt(val) {
      if (!val) return val;
      let result = val.split(",").join("");
      return (+result).toFixed(0);
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
      let className = "";
      if (columnIndex > 13) {
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
      if ([3, 4, 5].includes(columnIndex)) {
        return "table-header";
      }
    },
    gotoDetail(row) {
      this.row = JSON.parse(JSON.stringify(row));
      this.$nextTick(() => {
        this.visible = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
    td {
      background-color: #ffffff;
      padding-top: 0px;
      padding-bottom: 0px;
      color: #000;
      .cell {
        padding: 0 4px;
      }
    }
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