<!-- AB价-best ball表格:注意不能出现横向滚动条,翻页按钮会错位 -->
<template>
  <el-table
    class="header total-table"
    :data="totalData"
    :span-method="totalCellClass"
    :cell-class-name="totalColClass"
    :show-header="false"
  >
    <el-table-column label="Unit：RMB">
      <template v-for="item in fixedTitle">
        <el-table-column
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        ></el-table-column>
      </template>
      <el-table-column label="F-target" align="center">
        <el-table-column
          label="Supplier"
          prop="supplier"
          align="right"
          header-align="center"
          minWidth="85"
        >
          <template slot-scope="scope">
            {{ scope.row.supplier }}
          </template>
        </el-table-column>
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
        label="LTC"
        align="center"
        prop="ltc"
      ></el-table-column>
      <el-table-column
        label="LTC Start Date"
        align="center"
        prop="ltcStartDate"
        min-width="110"
      ></el-table-column>
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
</template>

<script>
import { numberProcessor, toThousands } from "@/utils";
export default {
  props: {
    totalData: { type: Array, default: () => [] },
  },
  data() {
    return {
      fixedTitle: [
        {
          prop: "fsNum",
          label: ["GS No. (Plant)"],
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
          prop: "volume",
          label: ["Volume"],
          width: 85,
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
    // 计算统计表表头合并
    totalCellClass({ rowIndex, columnIndex }) {
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
    totalColClass({ columnIndex }) {
      if ([1, 2, 3].includes(columnIndex)) {
        return "table-header";
      }
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