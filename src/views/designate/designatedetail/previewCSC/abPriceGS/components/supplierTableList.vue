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
                    >
                      <template slot-scope="scope">
                        <tooltip :text="scope.row.supplierNameEn">
                          <template slot="content">
                            <p :title="scope.row.supplierFullNameZh">
                              {{ scope.row.supplierFullNameZh }}
                            </p>
                            <p :title="scope.row.supplierFullNameEn">
                              ({{ scope.row.supplierFullNameEn }})
                            </p>
                          </template>
                        </tooltip>
                      </template></el-table-column
                    >
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
              <el-table-column label="Budget">
                <el-table-column label="Current Supplier">
                  <el-table-column label="Current Price">
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
                <tooltip
                  :text="item.carline || item.carTypeNames.join('、')"
                ></tooltip>
              </template>
              <el-table-column :label="item.volume" align="center">
                <template slot="header" slot-scope="scope">
                  {{ getInt(item.volume) | toThousands(true) }}
                </template>
                <el-table-column :label="item.budget" align="center">
                  <template slot="header" slot-scope="scope">
                    {{ getInt(item.budget) | toThousands(true) }}
                  </template>
                  <el-table-column :label="item.CurrentSupplier" align="center">
                    <template slot="header" slot-scope="scope">
                      <tooltip :text="item.currentSupplier"></tooltip>
                    </template>
                    <el-table-column
                      :label="item.currentAPrice"
                      header-align="right"
                    >
                      <template slot="header" slot-scope="scope">
                        <el-popover
                          placement="top-start"
                          trigger="hover"
                          v-if="+item.selAPrice"
                        >
                          <div>
                            <div>
                              {{ language("零件目标价A价", "零件目标价A价") }}：{{
                                (
                                  deleteThousands(item.currentAPrice) -
                                  item.selAPrice
                                ).toFixed(2) | toThousands(true)
                              }}
                            </div>
                            <div>
                              {{ language("SEL目标价", "SEL目标价") }}：{{
                                (item.selAPrice || "0.00") | toThousands(true)
                              }}
                            </div>
                          </div>
                          <div slot="reference">
                            <p>
                              <span style="color: red">*</span>
                              <span>{{ item.currentAPrice }}</span>
                            </p>
                          </div>
                        </el-popover>
                        <template v-else>
                          {{ item.currentAPrice }}
                        </template>
                      </template>
                      <el-table-column :label="item.fsGsNum" align="center">
                        <template slot="header" slot-scope="scope">
                          <span
                            class="cursor decoration"
                            @click="gotoDetail(item)"
                            >{{ item.fsGsNum }} ({{ item.factoryEn }})</span
                          >
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
                            <p
                              v-if="
                                scope.row[item.fsGsNum + 'quotationType'] ==
                                  'SKD' ||
                                scope.row[item.fsGsNum + 'quotationType'] ==
                                  'SKDLC'
                              "
                            >
                              <span style="color: red">*</span>
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
                      :label="item.currentBPrice"
                      header-align="right"
                    >
                      <template slot="header" slot-scope="scope">
                        <el-popover
                          placement="top-start"
                          trigger="hover"
                          v-if="+item.selAPrice"
                        >
                          <div>
                            <div>
                              {{ language("零件目标价B价", "零件目标价B价") }}：{{
                                (
                                  deleteThousands(item.currentBPrice) -
                                  item.selAPrice
                                ).toFixed(2) | toThousands(true)
                              }}
                            </div>
                            <div>
                              {{ language("SEL目标价", "SEL目标价") }}：{{
                                (item.selAPrice || "0.00") | toThousands(true)
                              }}
                            </div>
                          </div>
                          <div slot="reference">
                            <p>
                              <span style="color: red">*</span>
                              <span>{{ item.currentBPrice }}</span>
                            </p>
                          </div>
                        </el-popover>
                        <template v-else>
                          {{ item.currentBPrice }}
                        </template>
                      </template>
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
                            <p
                              v-if="
                                scope.row[item.fsGsNum + 'quotationType'] ==
                                  'SKD' ||
                                scope.row[item.fsGsNum + 'quotationType'] ==
                                  'SKDLC'
                              "
                            >
                              <span style="color: red">*</span>
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
        </el-table-column>
      </template>
      <template v-for="item in fixedTitle">
        <el-table-column :key="item.prop">
          <el-table-column>
            <el-table-column>
              <el-table-column>
                <el-table-column :label="item.budget" align="center">
                  <template slot="header" slot-scope="scope">
                    {{ getInt(item.budget) | toThousands(true) }}
                  </template>
                  <el-table-column>
                    <el-table-column>
                      <el-table-column
                        :prop="item.prop"
                        :label="item.label"
                        :minWidth="item.width"
                        align="center"
                      >
                        <template slot="header" slot-scope="scope"
                          ><template v-if="item.tips">
                            <div class="icon-box">
                              <div class="margin-right5">
                                <p
                                  :key="index"
                                  v-for="(text, index) in item.label"
                                >
                                  {{ text }}
                                </p>
                              </div>
                              <el-tooltip
                                effect="light"
                                placement="top"
                                :content="item.tips"
                              >
                                <span>
                                  <icon symbol name="iconxinxitishi" />
                                </span>
                              </el-tooltip>
                            </div>
                          </template>
                          <template v-else>
                            <p :key="index" v-for="(text, index) in item.label">
                              {{ text }}
                            </p>
                          </template>
                        </template>
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
        </el-table-column>
      </template>
    </el-table>
    <partTableDetail :visible.sync="visible" v-if="visible" :row="itemFS" />
  </div>
</template>

<script>
import { analysisSummaryNomiGS } from "@/api/partsrfq/editordetail/abprice";
import { numberProcessor, toThousands, deleteThousands } from "@/utils";
import tooltip from "../../components/tooltip.vue";
import partTableDetail from "./partTableDetail";
import { icon } from "rise";
export default {
  name: "supplierTableList",
  components: {
    tooltip,
    partTableDetail,
    icon
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
          tips:'base on RFQ volume and latest Quotation'
        },
        {
          prop: "savingTotal",
          label: ["Saving", "@100%", "Share"],
          target: "",
          budget: "",
          width: "100",
          tips:'Total Turnover + Develop cost + Release cost - TTO of current supplier'
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
      itemFS: {},
      visible: false,
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
    deleteThousands,
    gotoDetail(row) {
      this.itemFS = JSON.parse(JSON.stringify(row));
      this.itemFS.fsNum = this.itemFS.fsGsNum;
      this.$nextTick(() => {
        this.visible = !this.visible;
      });
    },
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
      this.index = 0;
      analysisSummaryNomiGS({
        nomiId: this.$route.query.desinateId,
      })
        .then((res) => {
          if (res?.code != 200) return;
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
                  child.ltc != 0
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
          this.fixedTitle = fixedTitle;
          this.partAllData = _.chunk(res.data.headList, this.showLength);
          this.allData = res.data.headList;
          this.tableData = tableData;
          // this.$set(this, 'tableData', tableData)
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
    next() {
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
    prev() {
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

      if (rowIndex < 7) {
        if (columnIndex == 1) {
          return "supllier-header";
        }
        if (columnIndex < this.partList.length + 2 && [5].includes(rowIndex)) {
          return "current-header";
        }
        if (
          columnIndex < this.partList.length * 2 + 2 &&
          [6].includes(rowIndex)
        ) {
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
        this.$refs["supplier-table"]?.getElementsByClassName(
          "el-table__header"
        )[0].rows;
      this.$refs.table.doLayout(); // table重新布局
      //   行数据,行,列,合并数,方向
      this.merge(row, 0, 0, 7, "rowSpan");
      this.partList.forEach((item, i) => {
        this.merge(row, 7, i * 2 + 2, 2, "colSpan");
      });
      this.merge(row, 0, this.partList.length + 2, 6, "colSpan");
      this.merge(row, 0, this.partList.length + 2, 4, "rowSpan");
      // this.merge(row, 4, this.partList.length + 2, 6, "colSpan"); // Budget合并
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
    .icon-box{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .decoration {
      text-decoration: underline;
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