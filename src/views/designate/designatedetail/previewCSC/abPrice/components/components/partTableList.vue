<!-- AB价-零件表格 -->
<template>
  <div>
    <el-table :data="tableData" class="header" ref="table">
      <el-table-column>
        <el-table-column>
          <el-table-column>
            <el-table-column>
              <el-table-column>
                <el-table-column>
                  <el-table-column
                    prop="supplier"
                    label="Supplier"
                    align="center"
                  ></el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="part No.">
        <el-table-column label="part Name">
          <el-table-column label="Carline">
            <el-table-column label="Volume">
              <el-table-column label="Budget">
                <el-table-column label="F-Target">
                  <el-table-column label="Rating" align="center">
                    <el-table-column
                      prop="E"
                      label="E"
                      width="50"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="Q"
                      label="Q"
                      width="50"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="L"
                      label="L"
                      width="50"
                      align="center"
                    ></el-table-column>
                  </el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <template v-for="item in supplierList">
        <el-table-column
          :label="item.supplierName"
          :key="item.sapCode"
          align="center"
        >
          <el-table-column :label="item.partName" align="center">
            <el-table-column :label="item.Carline" align="center">
              <el-table-column :label="item.Volume" align="center">
                <el-table-column :label="item.BudgetA" align="center">
                  <el-table-column :label="item['F-TargetA']" align="center">
                    <el-table-column :label="item.FSNo" align="center">
                      <el-table-column
                        prop="aPrice"
                        label="A price"
                        align="center"
                      ></el-table-column>
                    </el-table-column>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="item.BudgetA" align="center">
                  <el-table-column :label="item['F-TargetB']" align="center">
                    <el-table-column :label="item.FSNo" align="center">
                      <el-table-column
                        prop="bPrice"
                        label="B price"
                      ></el-table-column>
                    </el-table-column>
                  </el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </template>

      <el-table-column>
        <el-table-column>
          <el-table-column>
            <el-table-column>
              <el-table-column>
                <el-table-column>
                  <el-table-column label="Mixed Price" align="center">
                    <el-table-column
                      prop="aPrice"
                      label="A price"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="bPrice"
                      label="B price"
                      align="center"
                    ></el-table-column>
                  </el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <template v-for="item in fledTitle">
        <el-table-column :key="item.prop">
          <el-table-column>
            <el-table-column>
              <el-table-column>
                <el-table-column>
                  <el-table-column>
                    <el-table-column
                      :prop="item.prop"
                      :label="item.label"
                      align="center"
                    ></el-table-column>
                  </el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supplierList: [
        {
          supplierName: "供应商1",
          sapCode: "001",
          partName: "供应商1-零件号",
          Carline: "供应商1-Carline",
          Volume: "供应商1-Volume",
          BudgetA: "供应商1-BudgetA",
          BudgetB: "供应商1-BudgetB",
          "F-TargetA": "供应商1-F-TargetA",
          "F-TargetB": "供应商1-F-TargetB",
          FSNo: "供应商1-FSNo",
        },
        {
          supplierName: "供应商2",
          sapCode: "002",
          partName: "供应商2-零件号",
          Carline: "供应商2-Carline",
          Volume: "供应商2-Volume",
          BudgetA: "供应商2-BudgetA",
          BudgetB: "供应商2-BudgetB",
          "F-TargetA": "供应商2-F-TargetA",
          "F-TargetB": "供应商2-F-TargetB",
          FSNo: "供应商2-FSNo",
        },
        {
          supplierName: "供应商3",
          sapCode: "003",
          partName: "供应商3-零件号",
          Carline: "供应商3-Carline",
          Volume: "供应商3-Volume",
          BudgetA: "供应商3-BudgetA",
          BudgetB: "供应商3-BudgetB",
          "F-TargetA": "供应商3-F-TargetA",
          "F-TargetB": "供应商3-F-TargetB",
          FSNo: "供应商3-FSNo",
        },
        {
          supplierName: "供应商4",
          sapCode: "004",
          partName: "供应商4-零件号",
          Carline: "供应商4-Carline",
          Volume: "供应商4-Volume",
          BudgetA: "供应商4-BudgetA",
          BudgetB: "供应商4-BudgetB",
          "F-TargetA": "供应商4-F-TargetA",
          "F-TargetB": "供应商4-F-TargetB",
          FSNo: "供应商4-FSNo",
        },
      ],
      fledTitle: [
        {
          prop: "LTC",
          label: "LTC",
        },
        {
          prop: "LTC Start Date",
          label: "LTC Start Date",
        },
        {
          prop: "Total Invest",
          label: "Total Invest",
        },
        {
          prop: "Total Develop Cost",
          label: "Total Develop Cost",
        },
        {
          prop: "Turnover",
          label: "Total Turnover",
        },
      ],
      tableData: [
        {
          label: "label",
          prop: "prop",
          col: "col1",
        },
        {
          label: "label",
          prop: "prop",
          col: "col2",
        },
        {
          label: "label",
          prop: "prop",
          col: "col3",
        },
        {
          label: "label",
          prop: "prop",
          col: "col4",
        },
        {
          label: "label",
          prop: "prop",
          col: "col5",
        },
      ],
    };
  },

  methods: {
    setColSpan() {
      const row = document.getElementsByClassName("el-table__header")[0].rows;
      //   行数据,行,列,合并数,方向
      this.merge(row, 0, 0, 6, "rowSpan");
      this.merge(row, 6, 2, 2, "colSpan");
      this.merge(row, 6, 4, 2, "colSpan");
      this.merge(row, 6, 6, 2, "colSpan");
      this.merge(row, 6, 8, 2, "colSpan");
      this.merge(row, 6, 10, 2, "colSpan");
    },
    // 计算表头合并
    merge(row, rowIndex, colIndex, span, type = "colSpan") {
      const col = row[rowIndex].cells;
      if (!(row || col)) return;
      if (rowIndex < 0 || colIndex < 0 || span < 0) return;
      if (type == "colSpan") {
        let colSpan = row[rowIndex].cells[colIndex].colSpan;
        for (let i = 1; i < span; i++) {
          let index = i + colIndex;
          colSpan += row[rowIndex].cells[index].colSpan;
          if (colSpan == span) {
            row[rowIndex].cells[index].style.display = "none";
            break;
          }
          if (colSpan > span) {
            row[rowIndex].cells[index].colSpan = colSpan - span;
            break;
          }
          row[rowIndex].cells[index].style.display = "none";
        }
      }
      if (type == "rowSpan") {
        let rowSpan = row[rowIndex].cells[colIndex].rowSpan;
        for (let i = 1; i < span; i++) {
          let index = i + rowIndex;
          rowSpan += row[index].cells[colIndex].rowSpan;

          if (rowSpan == span) {
            row[index].cells[colIndex].style.display = "none";
            break;
          }
          if (rowSpan > span) {
            row[index].cells[colIndex].rowSpan = rowSpan - span;
            break;
          }
          row[index].cells[colIndex].style.display = "none";
        }
      }
      row[rowIndex].cells[colIndex][type] = span;
    },
  },

  mounted() {
    // 注意一定要保证DOM渲染完成后在进行合并操作，否则会找不到元素
    this.$nextTick(function () {
      this.setColSpan();
    });
  },
};
</script>

<style lang="scss" scoped>
.header {
  ::v-deep th {
    padding: 0;
    .cell {
      padding: 0;
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
  .leftAllow {
    position: relative;
    padding: 0;
    &::after {
      content: "";
      width: 20px;
      height: 100px;
      background: red;
      position: fixed;
      z-index: 999;
      margin-left: -20px;
    }
  }
  
  .rightAllow {
    position: relative;
    padding: 0;
    &::before {
      content: "";
      width: 20px;
      height: 100px;
      background: red;
      position: fixed;
      z-index: 999;
    }
  }
}
</style>