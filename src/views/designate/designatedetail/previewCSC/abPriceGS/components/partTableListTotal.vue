<template>
  <el-table
    class="header total-table"
    :data="totalData"
    :show-header="false"
    :span-method="totalCellClass"
    :cell-class-name="totalColClass"
  >
    <!-- 左侧固定表头 -->
    <template v-for="(item, index) in fixedTitle">
      <el-table-column :key="index">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="right"
        ></el-table-column>
      </el-table-column>
    </template>
    
    <el-table-column label="Supplier" align="center">
      <el-table-column label="Rating" align="center">
        <el-table-column>
          <el-table-column>
            <el-table-column label="Current" align="center">
              <el-table-column
                label="Supplier"
                prop="supplier"
                align="center"
                minWidth="80"
              >
                <template slot-scope="scope">
                  {{ scope.row["supplier"] }}
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column>
        <el-table-column>
          <el-table-column>
            <el-table-column>
              <el-table-column
                label="A Price"
                prop="cfPartAPrice"
                align="right"
                header-align="center"
                minWidth="80"
              >
                <template slot-scope="scope">
                  {{ scope.row["cfPartAPrice"] | toThousands(true) }}
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="E" align="center">
        <el-table-column label="Q" align="center">
          <el-table-column label="L" align="center">
            <el-table-column label="F-target" align="center">
              <el-table-column
                label="B Price"
                prop="cfPartBPrice"
                align="right"
                header-align="center"
                minWidth="80"
              >
                <template slot-scope="scope">
                  {{ scope.row["cfPartBPrice"] | toThousands(true) }}
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table-column>
    <!-- <el-table-column>
      <el-table-column
        label="A Price"
        prop="aPrice"
        align="right"
        header-align="center"
        minWidth="80"
      >
        <template slot-scope="scope">
          <template v-if="scope.$index == 0">
            {{ scope.row["aPrice"] | toThousands(true) }}
          </template>
          <template v-else>
            {{ getInt(scope.row["aPrice"]) | toThousands(true) }}
          </template>
        </template>
      </el-table-column>
      <el-table-column
        label="B Price"
        prop="bPrice"
        align="right"
        header-align="center"
        minWidth="80"
      >
        <template slot-scope="scope">
          <template v-if="scope.$index == 0">
            {{ scope.row["bPrice"] | toThousands(true) }}
          </template>
          <template v-else>
            {{ getInt(scope.row["bPrice"]) | toThousands(true) }}
          </template>
        </template>
      </el-table-column>
    </el-table-column> -->
    <template v-for="(item, index) in supplierList">
      <el-table-column
        :label="item.supplierEn"
        :key="item.supplierId + index"
        align="center"
      >
        <el-table-column
          :prop="item.supplierId + 'aPrice'"
          label="A price(LC)"
          align="right"
          header-align="center"
          minWidth="80"
        >
          <template slot="header" slot-scope="scope">
            <p>A price</p>
          </template>
          <template slot-scope="scope">
            <template v-if="scope.$index == 0">
              <p
                v-for="(text, index) in scope.row[
                  item.supplierId + 'aPrice'
                ]"
                :key="index"
              >
                {{ text }}
              </p>
            </template>
            <template v-else-if="scope.$index == 1">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                v-if="
                  scope.row.investFeeIsShared.includes(
                    item.supplierId + 'aPrice'
                  )
                "
              >
                <div>
                  <div>
                    {{ language("FENTANJINE", "分摊金额") }}：{{
                      getInt(
                        scope.row[item.supplierId + "toolingShareTotal"]
                      ) | toThousands(true)
                    }}
                  </div>
                  <div>
                    {{ language("WEIFENTANJINE", "未分摊金额") }}：{{
                      getInt(
                        scope.row[item.supplierId + "toolingNotShareTotal"]
                      ) | toThousands(true)
                    }}
                  </div>
                </div>
                <div slot="reference">
                  <span style="color: red">*</span
                  >{{
                    getInt(scope.row[item.supplierId + "aPrice"])
                      | toThousands(true)
                  }}
                </div>
              </el-popover>
              <template v-else>
                {{
                  getInt(scope.row[item.supplierId + "aPrice"])
                    | toThousands(true)
                }}
              </template>
            </template>
            <!-- <template v-else-if="scope.$index == 4">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                v-if="
                  scope.row.devFeeIsShared.includes(
                    item.supplierId + 'aPrice'
                  )
                "
              >
                <div>
                  <div>
                    {{ language("FENTANJINE", "分摊金额") }}：{{
                      getInt(
                        scope.row[item.supplierId + "developShareCostTotal"]
                      ) | toThousands(true)
                    }}
                  </div>
                  <div>
                    {{ language("WEIFENTANJINE", "未分摊金额") }}：{{
                      getInt(
                        scope.row[
                          item.supplierId + "developNotShareCostTotal"
                        ]
                      ) | toThousands(true)
                    }}
                  </div>
                </div>
                <div slot="reference">
                  <span style="color: red">*</span
                  >{{
                    getInt(scope.row[item.supplierId + "aPrice"])
                      | toThousands(true)
                  }}
                </div>
              </el-popover>
              <template v-else>
                {{
                  getInt(scope.row[item.supplierId + "aPrice"])
                    | toThousands(true)
                }}
              </template>
            </template> -->
            <template v-else>{{
              getInt(scope.row[item.supplierId + "aPrice"])
                | toThousands(true)
            }}</template>
          </template>
        </el-table-column>
        <el-table-column
          :prop="item.supplierId + 'bPrice'"
          label="B price(LC)"
          align="right"
          header-align="center"
          minWidth="80"
        >
          <template slot="header" slot-scope="scope">
            <p>B price</p>
          </template>
        </el-table-column>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import { fsPartsAsRow } from "@/api/partsrfq/editordetail/abprice";
import { numberProcessor, toThousands } from "@/utils";
export default {
  props: {
    totalData: { type: Array, default: () => [] },
    supplierList: { type: Array, default: () => [] },
    index: { type: String | Number, default: -1 },
  },
  data() {
    return {
      ref: "part-table",
      fixedTitle: [
        {
          prop: "partPrjCode",
          label: ["GS No. (Plant)"],
          width: 130,
        },
        {
          prop: "partNo",
          label: ["Part No."],
          width: 140,
        },
        {
          prop: "partName",
          label: ["Part Name"],
          width: 150,
        },
        {
          prop: "carProType",
          label: ["Carline"],
          width: 120,
        },
        {
          prop: "volume",
          label: ["Volume"],
          width: 85,
        },
      ],
      row: {},
      showLength: 4,
      allData: [],
      loading: false,
      totalTableHeight: 310,
    };
  },
  watch:{
    totalData:{
      handler(val){
        console.log(val);
      },
      deep:true,
    }
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
    percent(val) {
      return (val * 100).toFixed(2) + "%";
    },
    isCLevel(val) {
      if (!val) return val;
      return val.indexOf("c") > -1 || val.indexOf("C") > -1;
    },
    setColSpan() {
      const row =
        this.$refs["part-table"]?.getElementsByClassName("el-table__header")[0]
          .rows;
          console.log(row);
      //   行数据,行,列,合并数,方向
      this.merge(row, 0, 0, 5, "colSpan");
      this.merge(row, 0, 0, 4, "rowSpan");
      this.merge(row, 1, 5, 3, "rowSpan");
      this.merge(row, 1, 5, 2, "colSpan");
      this.merge(row, 4, 5, 3, "colSpan");
      this.$nextTick(() => {
        setTimeout(() => {
          this.totalTableHeight = this.$refs["total-table"]?.scrollHeight;
        }, 0);
      });
    },
    // 计算表头合并
    merge(row, rowIndex, colIndex, span, type = "colSpan") {
      if (!row) return;
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
        return [5, 5];
      } else if (columnIndex < 5) {
        return [0, 0];
      }
      if (columnIndex == 5) {
        return [1, 3];
      } else if ([6, 7].includes(columnIndex)) {
        return [0, 0];
      }
      if(columnIndex > 7){
        if(!(columnIndex % 2)){
          return [1, 2]
        }
        return [0,0]
      }
      // for (let i = 0; i < this.supplierList.length; i++) {
      //   if ([2 * i + 6].includes(columnIndex)) {
      //     return [1, 2];
      //   }
      //   if ([2 * i + 7].includes(columnIndex)) {
      //     return [0, 0];
      //   }
      // }
    },
    rowClass({ row, rowIndex }) {
      if (rowIndex < 4) {
        return "table-header-small";
      }
    },
    // 表头单元格背景调整
    cellClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0 && columnIndex == 0) {
        return "white-bg unit";
      }
      if (rowIndex == 0 && columnIndex > 5) {
        return "white-bg";
      }
      if (rowIndex < 4 && columnIndex > 7) {
        return "white-bg";
      }
    },
    // 内容单元格蓝色背景调整
    colClass({ row, column, rowIndex, columnIndex }) {
      if (["A price(LC)", "B price(LC)"].includes(column.label)) {
        if (
          row.suggestFlag.includes(column.property) &&
          row.ttoStatus.includes(column.property)
        ) {
          return "blue-border font-green";
        } else if (row.suggestFlag.includes(column.property)) {
          return "blue-border";
        } else if (row.ttoStatus.includes(column.property)) {
          return "font-green";
        }
      }
    },
    totalColClass({ row, column, rowIndex, columnIndex }) {
      if ([3, 4, 5, 6].includes(columnIndex)) {
        return "table-header";
      }
      if (rowIndex == "5") {
        if (row.isMinTto.includes(column.property)) {
          return "font-green";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>

::v-deep .el-table {
  .hidden {
    display: none;
  }
  .el-table__header {
    .white-bg {
      background: #fff;
      .cell {
        color: #000 !important;
      }
    }
  }
  .red {
    color: #f00;
  }
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
    background: #fff;
    .table-header-small {
      th {
        font-size: 16px;
        padding-top: 0px;
        padding-bottom: 0px;
      }
      .unit {
        .cell {
          padding-top: 1px;
        }
      }
    }
    .white-bg {
      background: #fff;
      .cell {
        white-space: normal;
        font-weight: 500;
        color: #000 !important;
      }
    }
  }
  .partName {
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
    background-color: #ffffff;
    padding-top: 0px;
    padding-bottom: 0px;
    .cell {
      padding: 0 4px;
    }
  }
}
</style>