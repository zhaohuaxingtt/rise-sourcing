<!-- AB价-供应商表格 -->
<template>
  <div>
    <el-table
      :data="tableData"
      class="header"
      ref="table"
      :header-cell-class-name="cellClass"
      :cell-class-name="colClass"
    >
      <!-- 固定表头 -->
      <el-table-column label="Unit：RMB" align="center">
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
        <template slot="header" slot-scope="scope">
          <div>
            part No.
            <div class="leftAllow" @click="leftAllow($event)"></div>
          </div>
        </template>
        <el-table-column label="part Name">
          <el-table-column label="Carline">
            <el-table-column label="Volume">
              <el-table-column label="Budget">
                <el-table-column label="F-Target">
                  <el-table-column label="Rating" align="center">
                    <el-table-column
                      prop="te"
                      label="E"
                      width="50"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="q"
                      label="Q"
                      width="50"
                      align="center"
                    ></el-table-column>
                    <el-table-column
                      prop="l"
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
      <!-- 循环供应商 -->
      <template v-for="(item, index) in supplierList">
        <el-table-column :key="item.partNum" align="center">
          <div slot="header" slot-scope="scope">
            {{ item.partNum || "-" }}
            <div
              v-if="index == supplierList.length - 1"
              class="rightAllow"
              @click="rightAllow($event)"
            ></div>
          </div>
          <el-table-column :label="item.partNumDe" align="center">
            <el-table-column :label="item.carline" align="center">
              <el-table-column :label="item.volume" align="center">
                <el-table-column :label="item.budget" align="center">
                  <el-table-column :label="item.targetAPrice" align="center">
                    <el-table-column :label="item.fsGsNum" align="center">
                      <el-table-column
                        :prop="item.fsGsNum + 'lcAPrice'"
                        label="partAPrice"
                        align="center"
                      >
                        <template slot="header" slot-scope="scope">
                          <p>A price</p>
                          <p>(LC)</p>
                        </template>
                      </el-table-column>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="item.targetBPrice" align="center">
                    <el-table-column :label="item.fsGsNum" align="center">
                      <el-table-column
                        :prop="item.fsGsNum + 'lcBPrice'"
                        label="partBPrice"
                        align="center"
                      >
                        <template slot="header" slot-scope="scope">
                          <p>B price</p>
                          <p>(LC)</p>
                        </template>
                      </el-table-column>
                    </el-table-column>
                  </el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </template>
      <!-- 固定表头 -->
      <el-table-column>
        <el-table-column>
          <el-table-column>
            <el-table-column>
              <el-table-column>
                <el-table-column :label="targetMixAPrice" align="center">
                  <el-table-column label="Mixed Price" align="center">
                    <el-table-column
                      prop="mixAPrice"
                      label="A price"
                      align="center"
                    >
                    </el-table-column>
                  </el-table-column>
                </el-table-column>
              </el-table-column>
              <el-table-column>
                <el-table-column :label="targetMixBPrice" align="center">
                  <el-table-column label="Mixed Price" align="center">
                    <el-table-column
                      prop="mixBPrice"
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
                <el-table-column :label="item.budget" align="center">
                  <el-table-column :label="item.target" align="center">
                    <el-table-column
                      :prop="item.prop"
                      :label="item.label"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <template
                          v-if="
                            ['ltcList', 'ltcStartDateList'].includes(item.prop)
                          "
                        >
                          <p
                            v-for="(child, index) in scope.row[item.prop]"
                            :key="index"
                          >
                            {{ child }}
                          </p>
                        </template>
                        <template v-else>
                          {{ scope.row[item.prop] }}
                        </template>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </template>
    </el-table>
    <template v-if="supplierList.length">
      <div class="left" :style="left" @click="prev"></div>
      <div class="right" :style="right" @click="next"></div>
    </template>
  </div>
</template>

<script>
import { analysisSummaryNomi } from "@/api/partsrfq/editordetail/abprice";
export default {
  data() {
    return {
      supplierList: [],
      supplierList1: [
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
      supplierList2: [
        {
          supplierName: "供应商12",
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
          supplierName: "供应商22",
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
          supplierName: "供应商32",
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
          prop: "ltcList",
          label: "LTC",
          target: "",
          budget: "",
        },
        {
          prop: "ltcStartDateList",
          label: "LTC Start Date",
          target: "",
          budget: "",
        },
        {
          prop: "totalInvest",
          label: "Total Invest",
          target: "",
          budget: "",
        },
        {
          prop: "totalDevelopCost",
          label: "Total Develop Cost",
          target: "",
          budget: "",
        },
        {
          prop: "totalTurnover",
          label: "Total Turnover",
          target: "",
          budget: "",
        },
      ],
      tableData: [],
      targetMixAPrice: "",
      targetMixBPrice: "",
      left: {
        position: "fixed",
        top: 0,
        left: 0,
      },
      right: {
        position: "fixed",
        top: 0,
        left: 0,
      },
    };
  },
  // 暂定,数据变化时重新触发定位
  updated() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.positionAllow();
      }, 32);
    });
  },
  created() {
    this.analysisSummaryNomi();
  },
  methods: {
    analysisSummaryNomi() {
      analysisSummaryNomi({
        nomiId: "60003714" || this.$route.query.desinateId,
      }).then((res) => {
        this.supplierList = res.data.headList || [];
        this.tableData =
          res.data.nomiAnalysisSummarySuppliers.map((item) => {
            let ltcList = [];
            let ltcStartDateList = [];
            item.analysisSummaryParts.forEach((child) => {
              item[child.fsGsNum + "lcAPrice"] = child.lcAPrice;
              item[child.fsGsNum + "lcBPrice"] = child.lcBPrice;
              if (!ltcList.includes(child.ltc)) ltcList.push(child.ltc);
              if (!ltcStartDateList.includes(child.ltcStartDate))
                ltcStartDateList.push(child.ltcStartDate);
            });
            item.ltcList = ltcList;
            item.ltcStartDateList = ltcStartDateList;
            return item;
          }) || [];
        this.targetMixAPrice = res.data.targetMixAPrice;
        this.targetMixBPrice = res.data.targetMixBPrice;
        this.fledTitle[2].budget = res.data.sumBudgetTotalInvest;
        this.fledTitle[2].target = res.data.targetTotalInvest;
        this.fledTitle[3].target = res.data.targetSelTotalSel;
        this.fledTitle[4].target = res.data.sumTotalTurnover;
        this.$nextTick(function () {
          // if (this.supplierList.length) {
          this.setColSpan();
          this.positionAllow();
          // }
        });
      });
    },
    prev() {
      console.log("更新表格数据:上一页");
      this.supplierList = this.supplierList1;
    },
    next() {
      console.log("更新表格数据:下一页");
      this.supplierList = this.supplierList2;
    },

    cellClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0 && columnIndex == 0) {
        return "white-bg";
      }
      if (rowIndex < 6 && columnIndex > 1) {
        return "white-bg";
      }
    },
    colClass({ row, column, rowIndex, columnIndex }) {
      if(['partAPrice','partBPrice'].includes(column.label)){
        return row[column.property]&&(row[column.property]<20) ? 'blue-border' : ''
      }
    },
    // 表头合并
    setColSpan() {
      const row = document.getElementsByClassName("el-table__header")[0].rows;
      //   行数据,行,列,合并数,方向
      this.merge(row, 0, 0, 6, "rowSpan");
      this.merge(row, 6, 2, 2, "colSpan");
      if (this.supplierList.length > 0) this.merge(row, 6, 4, 2, "colSpan");
      if (this.supplierList.length > 1) this.merge(row, 6, 6, 2, "colSpan");
      if (this.supplierList.length > 2) this.merge(row, 6, 8, 2, "colSpan");
      if (this.supplierList.length > 3) this.merge(row, 6, 10, 2, "colSpan");
      this.merge(row, 0, this.supplierList.length + 2, 7, "colSpan");
      this.merge(row, 0, this.supplierList.length + 2, 4, "rowSpan");
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
    // 点击事件触发定位右箭头
    rightAllow(event) {
      this.right.top = -event.layerY + "px";
      this.right.left = -event.layerX + "px";
    },
    // 点击事件触发定位左箭头
    leftAllow(event) {
      this.left.top = -event.layerY + "px";
      this.left.left = -event.layerX + "px";
    },
    // 触发定位元素,点击事件
    positionAllow() {
      const rightAllow = document.getElementsByClassName("rightAllow")[0];
      rightAllow && rightAllow.click();
      const leftAllow = document.getElementsByClassName("leftAllow")[0];
      leftAllow && leftAllow.click();
    },
    resize(){
      this.$nextTick(() => {
        this.setColSpan();
        this.positionAllow();
      });
    }
  },

  mounted() {
    window.addEventListener("resize", this.resize);
    // 注意一定要保证DOM渲染完成后在进行合并操作，否则会找不到元素
    this.$nextTick(() => {
      this.setColSpan();
    });
  },
  destroyed(){
    window.removeEventListener('resize',this.resize)
  }
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
::v-deep .el-table {
  .el-table__header {
    background: transparent;
    .white-bg {
      background: #f8f9fa;
      .cell {
        color: #000 !important;
      }
    }
  }
  .blue-border{
    background: #bdd7ee;
  }
  .leftAllow {
    position: relative;
    padding: 0;
    background: red;
    float: left;
  }

  .rightAllow {
    position: relative;
    padding: 0;
    background: red;
    float: right;
  }
}
.left {
  width: 14px;
  height: 60px;
  background: red;
  border-radius: 10px;
  transform: translate(-110%, 20%);
}
.right {
  width: 14px;
  height: 60px;
  background: red;
  border-radius: 10px;
  transform: translate(10%, 20%);
}
</style>