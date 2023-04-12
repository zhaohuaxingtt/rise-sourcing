<!-- AB价-供应商表格 -->
<template>
  <div :ref="ref" v-loading="loading">
    <el-table
      :data="tableData"
      height="100%"
      class="header table"
      ref="table"
      :key="index"
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
                    <el-table-column>
                      <el-table-column
                        prop="supplierNameEn"
                        label="Supplier"
                        align="center"
                        minWidth="140"
                      ></el-table-column>
                    </el-table-column>
                  </el-table-column>
                  </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="Part No.">
        <el-table-column label="Part Name">
          <el-table-column label="Carline">
            <el-table-column label="Volume">
              <el-table-column label="Current Supplier">
                <el-table-column label="Current Average">
                  <el-table-column label="Rating" align="center">
                    <el-table-column
                      prop="te"
                      label="E"
                      minWidth="50"
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
                      minWidth="50"
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
                      minWidth="50"
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
          </div>
          <el-table-column :label="item.partNumDe" align="center">
            <el-table-column :label="item.carline" align="center">
              <template slot="header" slot-scope="scope">
                <tooltip :text="item.carline||item.carTypeNames.join('、')"></tooltip>
              </template>
              <el-table-column :label="item.volume" align="center">
                <template slot="header" slot-scope="scope">
                  {{ getInt(item.volume) | toThousands(true) }}
                </template>
                <el-table-column :label="item.CurrentSupplier" align="center">
                  <template slot="header" slot-scope="scope">
                    <span>{{ item.CurrentSupplier }}80%</span>/{{ item.CurrentSupplier }}20%
                  </template>
                  <el-table-column
                    :label="item.targetAPrice"
                    header-align="right"
                  >
                    <el-table-column :label="item.fsGsNum" align="center">
                      <template slot="header" slot-scope="scope">
                        {{ item.fsGsNum }}({{ item.factoryEn }})
                      </template>
                      <el-table-column
                        :prop="item.fsGsNum + 'lcAPrice'"
                        label="partAPrice"
                        align="right"
                        header-align="center"
                        minWidth="85"
                      >
                        <template slot="header" slot-scope="scope">
                          <p>A Price</p>
                        </template>
                        <template slot-scope="scope">
                          <p v-if="
                                scope.row[item.fsGsNum + 'quotationType'] ==
                                  'SKD' ||
                                scope.row[item.fsGsNum + 'quotationType'] ==
                                  'SKDLC'
                              ">
                            <span style="color: red" >*</span>
                            {{ scope.row[item.fsGsNum + "skdAPrice"] }}
                          </p>
                          <p v-else>
                            {{ scope.row[item.fsGsNum + "lcAPrice"] }}
                          </p>
                        </template>
                      </el-table-column>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column
                    :label="item.targetBPrice"
                    header-align="right"
                  >
                    <el-table-column :label="item.fsGsNum" align="center">
                      <el-table-column
                        :prop="item.fsGsNum + 'lcBPrice'"
                        label="partBPrice"
                        align="right"
                        header-align="center"
                        minWidth="85"
                      >
                        <template slot="header" slot-scope="scope">
                          <p>B Price</p>
                        </template>
                        <template slot-scope="scope">
                          <p v-if="
                                scope.row[item.fsGsNum + 'quotationType'] ==
                                  'SKD' ||
                                scope.row[item.fsGsNum + 'quotationType'] ==
                                  'SKDLC'
                              ">
                            <span style="color: red" >*</span>
                            {{ scope.row[item.fsGsNum + "skdBPrice"] }}
                          </p>
                          <p v-else>
                            {{ scope.row[item.fsGsNum + "lcBPrice"] }}
                          </p>
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
      <template v-for="item in fixedTitle">
        <el-table-column :key="item.prop">
          <el-table-column>
            <el-table-column>
              <el-table-column>
                <el-table-column>
                  <el-table-column :label="item.target" align="center">
                    <template slot="header" slot-scope="scope">
                      {{ getInt(item.target) | toThousands(true) }}
                    </template>
                    <el-table-column
                      :prop="item.prop"
                      :label="item.label"
                      :minWidth="item.width"
                      align="center"
                    >
                      <template slot="header" slot-scope="scope">
                        <template v-for="(text, index) in item.label">
                          <p :key="index">{{ text }}</p>
                        </template>
                      </template>
                      <template slot-scope="scope">
                        <template
                          v-if="
                            ['ltcList', 'ltcStartDateList'].includes(
                              item.prop
                            )
                          "
                        >
                          <p
                            v-for="(child, index) in scope.row[item.prop]"
                            :key="index"
                          >
                            {{ child }}
                          </p>
                        </template>
                        <template
                          v-else-if="['totalInvest'].includes(item.prop)"
                        >
                          <el-popover
                            placement="top-start"
                            trigger="hover"
                            v-if="scope.row.investFeeIsShared"
                          >
                            <div>
                              <div>
                                Apportioned amount：{{
                                  scope.row.toolingShareTotal
                                }}
                              </div>
                              <div>
                                Unassessed amount：{{
                                  scope.row.toolingNotShareTotal
                                }}
                              </div>
                            </div>
                            <div slot="reference">
                              <span style="color: red">*</span
                              >{{ scope.row[item.prop] }}
                            </div>
                          </el-popover>
                          <template v-else>
                            {{ scope.row[item.prop] }}
                          </template>
                        </template>
                        <template
                          v-else-if="
                            ['totalDevelopCost'].includes(item.prop)
                          "
                        >
                          <el-popover
                            placement="top-start"
                            trigger="hover"
                            v-if="scope.row.devFeeIsShared"
                          >
                            <div>
                              <div>
                                Apportioned amount：{{
                                  scope.row.developShareCostTotal
                                }}
                              </div>
                              <div>
                                Unassessed amount：{{
                                  scope.row.developNotShareCostTotal
                                }}
                              </div>
                            </div>
                            <div slot="reference">
                              <span style="color: red">*</span
                              >{{ scope.row[item.prop] }}
                            </div>
                          </el-popover>
                          <template v-else>
                            {{ scope.row[item.prop] }}
                          </template>
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
  </div>
</template>

<script>
import { analysisSummaryNomiGS } from "@/api/partsrfq/editordetail/abprice";
import { numberProcessor, toThousands } from "@/utils";
import tooltip from "../../../components/tooltip.vue";
export default {
  components: {
    tooltip,
  },
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
          label: ["LTC"],
          target: "",
          budget: "",
          width: "100",
        },
        {
          prop: "ltcStartDateList",
          label: ["LTC Start", " Date"],
          target: "",
          budget: "",
          width: "110",
        },
        {
          prop: "totalInvest",
          label: ["Total", "Invest"],
          target: "",
          budget: "",
          width: "130",
        },
        {
          prop: "releaseCostTotal",
          label: ["Total", "Release", "Cost"],
          target: "",
          budget: "",
          width: "130",
        },
        {
          prop: "totalTurnover",
          label: ["Total", "Turnover"],
          target: "",
          budget: "",
          width: "130",
        },
        {
          prop: "sopDate",
          label: ["Saving", "@100% Share"],
          target: "",
          budget: "",
          width: "130",
        },
      ],
      tableData: [],
      targetMixAPrice: "",
      targetMixBPrice: "",
      loading: false,
      showLength: 4,
      partAllData: [],
      allData: [],
      index: -1,
    };
  },
  computed: {
    partList() {
      if (this.index == -1) return [];
      return this.partAllData[this.index] || [];
    },
  },
  filters: {
    toThousands,
  },
  created() {
    this.analysisSummaryNomi();
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
    analysisSummaryNomi() {
      this.loading = true;
      analysisSummaryNomiGS({
        nomiId: this.$route.query.desinateId,
        // partTable携带partPrjCode, best ball携带的是fsNum
        fsGsNumList:
          this.row?.partPrjCode || this.row?.fsNum
            ? [this.row.partPrjCode || this.row?.fsNum]
            : undefined,
      })
        .then((res) => {
          if (res?.code != 200) return;
          this.index = 0;
          let tableData =
            res.data.nomiAnalysisSummarySuppliers.map((item) => {
              let ltcList = [];
              let ltcStartDateList = [];
              item.suggestFlag = [];
              item.isMinTtoList = [];
              item.analysisSummaryParts.forEach((child) => {
                item[child.fsGsNum + "lcAPrice"] = child.lcAPrice;
                item[child.fsGsNum + "lcBPrice"] = child.lcBPrice;
                item[child.fsGsNum + "skdAPrice"] = child.skdAPrice;
                item[child.fsGsNum + "skdBPrice"] = child.skdBPrice;
                item[child.fsGsNum + "quotationType"] = child.quotationType;
                if (child.suggestFlag)
                  item.suggestFlag.push(
                    child.fsGsNum + "lcAPrice",
                    child.fsGsNum + "lcBPrice"
                  );
                if (child.isMinTto)
                  item.isMinTtoList.push(
                    child.fsGsNum + "lcAPrice",
                    child.fsGsNum + "lcBPrice"
                  );
                if (!ltcList.includes(child.ltc)) ltcList.push(child.ltc);
                if (
                  !ltcStartDateList.includes(child.ltcStartDate) &&
                  child.ltc!=0
                )
                  ltcStartDateList.push(child.ltcStartDate);
              });
              item.ltcList = ltcList;
              item.ltcStartDateList = ltcStartDateList;
              return item;
            }) || [];
          let fixedTitle = JSON.parse(JSON.stringify(this.fixedTitle));
          this.targetMixAPrice = res.data.targetMixAPrice;
          this.targetMixBPrice = res.data.targetMixBPrice;
          fixedTitle[2].budget = res.data.sumBudgetTotalInvest;
          fixedTitle[2].target = res.data.targetTotalInvest;
          fixedTitle[3].target = res.data.targetSelTotalSel;
          fixedTitle[4].target = res.data.sumTotalTurnover;
          this.fixedTitle = fixedTitle;
          this.partAllData = _.chunk(res.data.headList, this.showLength);
          this.allData = res.data.headList;
          this.tableData = tableData;
        })
        .finally(() => {
          this.loading = false;
          this.$nextTick(() => {
            this.setColSpan();
            this.$emit("setPage", {
              index: this.index,
              showLength: this.showLength,
              total: this.allData.length,
            });
          });
        });
    },
    prev() {
      if (this.index < this.partAllData.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }
      this.$nextTick(() => {
        this.setColSpan();
        this.$emit("setPage", {
          index: this.index,
          showLength: this.showLength,
          total: this.allData.length,
        });
      });
    },
    next() {
      if (this.index > 0) {
        this.index--;
      } else {
        this.index = this.partAllData.length - 1;
      }
      this.$nextTick(() => {
        this.setColSpan();
        this.$emit("setPage", {
          index: this.index,
          showLength: this.showLength,
          total: this.allData.length,
        });
      });
    },
    // 表头单元格背景调整
    cellClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0 && columnIndex == 0) {
        return "white-bg unit";
      }

      if (rowIndex < 6) {
        if (columnIndex == 1) {
          return "supllier-header";
        }
        if (columnIndex == 2 && [4, 5].includes(rowIndex)) {
          return "current-header";
        }
        return "white-bg supllier-header";
      }
    },
    // 内容单元格蓝色背景调整
    colClass({ row, column, rowIndex, columnIndex }) {
      if (["partAPrice", "partBPrice"].includes(column.label)) {
        if (
          row.suggestFlag.includes(column.property) &&
          row.isMinTtoList.includes(column.property)
        ) {
          return "blue-border font-green";
        } else if (row.suggestFlag.includes(column.property)) {
          return "blue-border";
        } else if (row.isMinTtoList.includes(column.property)) {
          return "font-green";
        }
      }
      if (column.property == "totalTurnover") {
        if (row.isMinTto) {
          return "font-green";
        }
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
      if (this.row?.partPrjCode || this.row?.fsNum) {
        this.merge(row, 0, 2, this.partList.length * 2 + 7, "colSpan");
        this.merge(row, 1, 2, this.partList.length * 2 + 7, "colSpan");
        this.merge(row, 2, 2, this.partList.length * 2 + 7, "colSpan");
        this.merge(row, 3, 2, this.partList.length * 2 + 7, "colSpan");
        this.merge(row, 4, 2, this.partList.length * 2 + 7, "colSpan");
        this.merge(row, 5, 2, this.partList.length * 2 + 7, "colSpan");
      } else {
        this.merge(row, 0, this.partList.length + 2, 7, "colSpan");
        this.merge(row, 0, this.partList.length + 2, 4, "rowSpan");
      }
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
  font-size: 16px;
  .el-table__header {
    background: #fff;
    .supllier-header {
      padding-top: 0px;
      padding-bottom: 0px;
      font-size: 16px;
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
  .red {
    color: #f00;
  }
}
.table {
  ::v-deep .el-table__header {
    tr {
      background-color: #364d6e;
    }
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