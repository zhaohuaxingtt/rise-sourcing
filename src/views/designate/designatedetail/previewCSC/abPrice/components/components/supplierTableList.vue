<!-- AB价-供应商表格 -->
<template>
  <div :ref="ref" v-loading="loading">
    <el-table
      :data="tableData"
      height="100%"
      class="header table"
      ref="table"
      :header-cell-class-name="cellClass"
      :cell-class-name="colClass"
    >
      <!-- 固定表头 -->
      <el-table-column label="Unit：RMB">
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
                      prop="te"
                      label="E"
                      width="50"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span class="red" v-if="isCLevel(scope.row.te)">{{
                          scope.row.te
                        }}</span>
                        <span v-else>{{ scope.row.te }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="q"
                      label="Q"
                      width="50"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span class="red" v-if="isCLevel(scope.row.q)">{{
                          scope.row.q
                        }}</span>
                        <span v-else>{{ scope.row.q }}</span>
                      </template></el-table-column
                    >
                    <el-table-column
                      prop="l"
                      label="L"
                      width="50"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span class="red" v-if="isCLevel(scope.row.l)">{{
                          scope.row.l
                        }}</span>
                        <span v-else>{{ scope.row.l }}</span>
                      </template></el-table-column
                    >
                  </el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <!-- 循环供应商 -->
      <template v-for="(item, index) in partList">
        <el-table-column
          :key="item.partNum + item.fsNum || index"
          align="center"
        >
          <div slot="header" slot-scope="scope">
            {{ item.partNum || "-" }}
            <div
              v-if="index == 0"
              class="leftAllow"
              @click="leftAllow($event)"
            ></div>
            <div
              v-if="index == partList.length - 1"
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
      <template v-for="item in fixedTitle">
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
    <template v-if="partAllData.length > 1">
      <div class="left" :style="left" @click="prev"></div>
      <div class="right" :style="right" @click="next"></div>
    </template>
  </div>
</template>

<script>
import { analysisSummaryNomi } from "@/api/partsrfq/editordetail/abprice";
import allow from "./allow.js";
export default {
  mixins: [allow],
  props: {
    row: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      ref: "supplier-table",
      fixedTitle: [
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
      loading: false,
      showLength:4,
      partAllData: [],
      index: 0,
    };
  },
  computed: {
    partList() {
      return this.partAllData[this.index] || [];
    },
  },
  created() {
    this.analysisSummaryNomi();
  },
  mounted() {
    // 注意一定要保证DOM渲染完成后在进行合并操作，否则会找不到元素
    this.$nextTick(() => {
      this.setColSpan();
    });
  },
  methods: {
    isCLevel(val) {
      return val.indexOf("c") > -1 || val.indexOf("C") > -1;
    },
    analysisSummaryNomi() {
      this.loading = true;
      analysisSummaryNomi({
        nomiId: "60003714" || this.$route.query.desinateId,
        fsGsNumList: this.row?.partPrjCode ? [this.row.partPrjCode] : undefined,
      })
        .then((res) => {
          if (res?.code != 200) return;
          this.partAllData = _.chunk(res.data.headList, this.showLength);
          this.index = 0;
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
          this.fixedTitle[2].budget = res.data.sumBudgetTotalInvest;
          this.fixedTitle[2].target = res.data.targetTotalInvest;
          this.fixedTitle[3].target = res.data.targetSelTotalSel;
          this.fixedTitle[4].target = res.data.sumTotalTurnover;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    prev() {
      if (this.index < this.partAllData.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }
    },
    next() {
      if (this.index > 0) {
        this.index--;
      } else {
        this.index = this.partAllData.length - 1;
      }
    },
    // 表头单元格背景调整
    cellClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0 && columnIndex == 0) {
        return "white-bg unit";
      }
      if (rowIndex < 6 && columnIndex > 1) {
        return "white-bg";
      }
    },
    // 内容单元格蓝色背景调整
    colClass({ row, column, rowIndex, columnIndex }) {
      if (["partAPrice", "partBPrice"].includes(column.label)) {
        return row[column.property] && row[column.property] < 20
          ? "blue-border"
          : "";
      }
    },
    // 表头合并
    setColSpan() {
      const row =
        this.$refs["supplier-table"].getElementsByClassName(
          "el-table__header"
        )[0].rows;
      //   行数据,行,列,合并数,方向
      this.merge(row, 0, 0, 6, "rowSpan");
      this.merge(row, 6, 2, 2, "colSpan");
      if (this.partList.length > 0) this.merge(row, 6, 4, 2, "colSpan");
      if (this.partList.length > 1) this.merge(row, 6, 6, 2, "colSpan");
      if (this.partList.length > 2) this.merge(row, 6, 8, 2, "colSpan");
      if (this.partList.length > 3) this.merge(row, 6, 10, 2, "colSpan");
      this.merge(row, 0, this.partList.length + 2, 7, "colSpan");
      this.merge(row, 0, this.partList.length + 2, 4, "rowSpan");
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
  },
};
</script>

<style lang="scss" scoped>
.header {
  ::v-deep th {
    padding: 0;
    .cell {
      padding: 0 10px;
    }
  }
}
::v-deep .el-table {
  .el-table__header {
    background: transparent;
    .white-bg {
      background: #fff;
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
    background: #00b0f0;
    float: left;
  }

  .rightAllow {
    position: relative;
    padding: 0;
    background: #00b0f0;
    float: right;
  }
  .red {
    color: #f00;
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
.table{
  ::v-deep .el-table__header {
    background-color: #364d6e;
    tr:nth-child(even){
      background-color: #364d6e;
    }
  }
}
</style>