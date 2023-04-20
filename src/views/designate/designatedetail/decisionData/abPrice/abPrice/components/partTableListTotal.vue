<!-- AB价-零件表格:注意不能出现横向滚动条,翻页按钮会错位 -->
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
        >
          <template slot-scope="scope">
            <template v-if="scope.row.tips">
              <div class="icon-box">
                <div class="margin-right5">
                  {{ scope.row[item.prop] }}
                </div>
                <el-tooltip
                  effect="light"
                  placement="top"
                  :content="scope.row.tips"
                >
                  <span>
                    <icon symbol name="iconxinxitishi" />
                  </span>
                </el-tooltip>
              </div>
            </template>
            <template v-else>{{ scope.row[item.prop] }}</template>
          </template></el-table-column>
      </el-table-column>
    </template>
    <el-table-column>
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
    </el-table-column>
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
            <p>(LC)</p>
          </template>
          <template slot-scope="scope">
            <template v-if="scope.$index == 0">
              {{
                scope.row[item.supplierId + "aPrice"] | toThousands(true)
              }}
            </template>
            <template v-else-if="scope.$index == 1">
              <p
                v-for="(text, index) in scope.row[
                  item.supplierId + 'aPrice'
                ]"
                :key="index"
              >
                {{ text }}
              </p>
            </template>
            <template v-else-if="scope.$index == 2">
              <el-popover
                placement="top-start"
                trigger="hover"
                v-if="
                  scope.row.investFeeIsShared.includes(
                    item.supplierId + 'aPrice'
                  )
                "
              >
                <div>
                  <div>
                    Apportioned amount：{{
                      getInt(scope.row[item.supplierId + "toolingShareTotal"]) | toThousands(true)
                    }}
                  </div>
                  <div>
                    Unassessed amount：{{
                      getInt(scope.row[item.supplierId + "toolingNotShareTotal"]) | toThousands(true)
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
            <template v-else-if="scope.$index == 4">
              <el-popover
                placement="top-start"
                trigger="hover"
                v-if="
                  scope.row.devFeeIsShared.includes(
                    item.supplierId + 'aPrice'
                  )
                "
              >
                <div>
                  <div>
                    Apportioned amount：{{
                      getInt(scope.row[item.supplierId + "developShareCostTotal"]) | toThousands(true)
                    }}
                  </div>
                  <div>
                    Unassessed amount：{{
                      getInt(scope.row[
                        item.supplierId + "developNotShareCostTotal"
                      ]) | toThousands(true)
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
            <p>(LC)</p>
          </template>
        </el-table-column>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import { numberProcessor, toThousands } from "@/utils";
import { icon } from "rise";
export default {
  components:{icon},
  props: {
    totalData: { type: Array, default: () => [] },
    supplierList: { type: Array, default: () => [] },
    index: { type: String | Number, default: -1 },
  },
  data() {
    return {
      fixedTitle: [
        {
          prop: "partPrjCode",
          label: ["FS No. (Plant)"],
          width: 120,
        },
        {
          prop: "partNo",
          label: ["Part No."],
          width: 130,
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
          prop: "ebr",
          label: ["EBR"],
          width: 85,
        },
        {
          prop: "ebrCalculatedValue",
          label: ["Mixed", "Qty"],
          width: 60,
        },
        {
          prop: "volume",
          label: ["Volume"],
          width: 85,
        },
      ],
      row: {},
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
    // 计算统计表表头合并
    totalCellClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 && rowIndex == 0) {
        return [7, 3];
      } else if (columnIndex < 3 && rowIndex < 7) {
        return [0, 0];
      }
      if ([0, 1, 4, 5].includes(rowIndex)) {
        if (columnIndex == 3) {
          return [1, 4];
        } else if ([4, 5, 6].includes(columnIndex)) {
          return [0, 0];
        }
      }
      if ([2].includes(rowIndex)) {
        if (columnIndex == 3) {
          return [2, 3];
        } else if ([4, 5].includes(columnIndex)) {
          return [0, 0];
        }
      }
      if ([3].includes(rowIndex)) {
        if (columnIndex == 3) {
          return [0, 0];
        } else if ([4, 5].includes(columnIndex)) {
          return [0, 0];
        }
      }
      if ([7].includes(columnIndex) && rowIndex > 0) {
        return [1, 2];
      }
      if ([8].includes(columnIndex) && rowIndex > 0) {
        return [0, 0];
      }
      for (let i = 0; i < this.supplierList.length; i++) {
        if ([2 * i + 9].includes(columnIndex)) {
          if ([1, 4, 5].includes(rowIndex)) {
            return [1, 2];
          } else if ([2].includes(rowIndex)) {
            return [2, 2];
          } else if ([3].includes(rowIndex)) {
            return [0, 0];
          }
        }
        if ([2 * i + 10].includes(columnIndex) && rowIndex > 0) {
          return [0, 0];
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
.table-box {
  height: 600px;
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
    background: #fff;
    padding-top: 0px;
    padding-bottom: 0px;
    color: #000;
    .cell {
      padding: 0 4px;
      .icon-box{
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }
}
</style>