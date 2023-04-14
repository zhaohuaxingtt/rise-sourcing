<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-24 16:16:02
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-04-14 10:33:17
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\abPrice\abPriceGS\components\partTableList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- AB价-零件表格:注意不能出现横向滚动条,翻页按钮会错位 -->
<template>
  <div ref="part-table" v-loading="loading">
    <div class="table-box">
      <el-table
        :data="tableData"
        class="header table"
        ref="table"
        :key="index"
        show-summary
        :summary-method="summaryMethod"
        :header-cell-class-name="cellClass"
        :header-row-class-name="rowClass"
        :cell-class-name="colClass"
      >
        <!-- 左侧固定表头 -->
        <template v-for="item in fixedTitle">
          <el-table-column :key="item.prop" label="Unit：RMB">
            <el-table-column>
              <el-table-column>
                <el-table-column>
                  <el-table-column
                    v-if="item.prop == 'partPrjCode'"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <span class="link" @click="gotoDetail(scope.row)">{{
                        scope.row.partPrjCode
                      }}</span>
                      <br />
                      <span class="link" @click="gotoDetail(scope.row)"
                        >({{ scope.row.factoryEn }})</span
                      >
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-else-if="item.prop == 'partName'"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <tooltip>
                        <template slot="content">
                          <p class="partName" :title="scope.row.partName">
                            {{ scope.row.partName }}
                          </p>
                          <p class="partName" :title="scope.row.partNameDe">
                            ({{ scope.row.partNameDe }})
                          </p>
                        </template>
                        <template slot="text">
                          <p class="partName" :title="scope.row.partName">
                            {{ scope.row.partName }}
                          </p>
                          <p class="partName" :title="scope.row.partNameDe">
                            ({{ scope.row.partNameDe }})
                          </p>
                        </template>
                      </tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-else-if="item.prop == 'carProType'"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <tooltip :text="scope.row.carTypeNames.join('、')" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-else-if="item.prop == 'ebr'"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <span>{{ percent(scope.row.ebr) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-else-if="item.prop == 'ebrCalculatedValue'"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    align="center"
                  >
                    <template slot="header" slot-scope="scope">
                      <p v-for="(text, index) in item.label" :key="index">
                        {{ text }}
                      </p>
                    </template>
                    <template slot-scope="scope">
                      <span>{{
                        numberProcessor(scope.row.ebrCalculatedValue, 2)
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-else-if="item.prop == 'volume'"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    align="center"
                  >
                    <template slot-scope="scope">
                      {{ getInt(scope.row[item.prop]) | toThousands(true) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-else
                    :prop="item.prop"
                    :width="item.width"
                    align="center"
                  >
                    <template slot="header" slot-scope="scope">
                      <p v-for="(text, index) in item.label" :key="index">
                        {{ text }}
                      </p>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </template>
        <el-table-column label="Supplier" align="center">
          <el-table-column label="Rating" align="center">
            <el-table-column>
              <el-table-column>
                <el-table-column label="Current" align="center">
                  <el-table-column
                    label="Supplier"
                    prop="currentSupplier"
                    align="center"
                    minWidth="80"
                  >
                    <template slot-scope="scope">
                      {{ scope.row["currentSupplier"] }}
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
                    prop="currentAPrice"
                    align="right"
                    header-align="center"
                    minWidth="80"
                  >
                    <template slot-scope="scope">
                      <el-popover
                        placement="top-start"
                        trigger="hover"
                        v-if="+scope.row.selAPrice"
                      >
                        <div>
                          <div>
                            {{ language("零件目标价A价", "零件目标价A价") }}：{{
                              (
                                scope.row.currentAPrice - scope.row.selAPrice
                              ).toFixed(2) | toThousands(true)
                            }}
                          </div>
                          <div>
                            {{ language("SEL目标价", "SEL目标价") }}：{{
                              (scope.row.selAPrice || "0.00")
                                | toThousands(true)
                            }}
                          </div>
                        </div>
                        <div slot="reference">
                          <p>
                            <span style="color: red">*</span>
                            <span>{{
                              scope.row["currentAPrice"] | toThousands(true)
                            }}</span>
                          </p>
                        </div>
                      </el-popover>
                      <template v-else>
                        {{ scope.row["currentAPrice"] | toThousands(true) }}
                      </template>
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
                    prop="currentBPrice"
                    align="right"
                    header-align="center"
                    minWidth="80"
                  >
                    <template slot-scope="scope">
                      <el-popover
                        placement="top-start"
                        trigger="hover"
                        v-if="+scope.row.selAPrice"
                      >
                        <div>
                          <div>
                            {{ language("零件目标价A价", "零件目标价A价") }}：{{
                              (
                                scope.row.currentBPrice - scope.row.selAPrice
                              ).toFixed(2) | toThousands(true)
                            }}
                          </div>
                          <div>
                            {{ language("SEL目标价", "SEL目标价") }}：{{
                              (scope.row.selAPrice || "0.00")
                                | toThousands(true)
                            }}
                          </div>
                        </div>
                        <div slot="reference">
                          <p>
                            <span style="color: red">*</span>
                            <span>{{
                              scope.row["currentBPrice"] | toThousands(true)
                            }}</span>
                          </p>
                        </div>
                      </el-popover>
                      <template v-else>
                        {{ scope.row["currentBPrice"] | toThousands(true) }}
                      </template>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <template v-for="(item, index) in supplierList">
          <el-table-column :key="item.supplierId + index" align="center">
            <div slot="header" slot-scope="scope">
                <tooltip :text="item.supplierEn">
                  <template slot="content">
                    <p>{{ item.supplier }}</p>
                    <p>{{ item.supplierEn }}</p>
                  </template>
                </tooltip>
            </div>
            <el-table-column :label="item.TE" align="center">
              <template slot-scope="scope" slot="header">
                <span class="red" v-if="isCLevel(item.TE)">{{ item.TE }}</span>
                <span v-else>{{ item.TE }}</span>
              </template>
              <el-table-column :label="item.Q" align="center">
                <template slot-scope="scope" slot="header">
                  <span class="red" v-if="isCLevel(item.Q)">{{ item.Q }}</span>
                  <span v-else>{{ item.Q }}</span>
                </template>
                <el-table-column :label="item.L" align="center">
                  <template slot-scope="scope" slot="header">
                    <span class="red" v-if="isCLevel(item.L)">{{
                      item.L
                    }}</span>
                    <span v-else>{{ item.L }}</span>
                  </template>
                  <el-table-column
                    :prop="item.supplierId + 'aPrice'"
                    label="A price(LC)"
                    align="right"
                    header-align="center"
                    minWidth="80"
                  >
                    <template slot="header" slot-scope="scope">
                      <p>A Price</p>
                    </template>

                    <template slot-scope="scope">
                      <span
                        v-if="
                          scope.row[item.supplierId + 'quotationType'] ==
                            'SKD' ||
                          scope.row[item.supplierId + 'quotationType'] ==
                            'SKDLC'
                        "
                        style="color: red"
                        >*</span
                      >{{
                        scope.row[item.supplierId + "aPrice"]
                          | toThousands(true)
                      }}
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
                      <p>B Price</p>
                    </template>
                    <template slot-scope="scope">
                      <span
                        v-if="
                          scope.row[item.supplierId + 'quotationType'] ==
                            'SKD' ||
                          scope.row[item.supplierId + 'quotationType'] ==
                            'SKDLC'
                        "
                        style="color: red"
                        >*</span
                      >{{
                        scope.row[item.supplierId + "bPrice"]
                          | toThousands(true)
                      }}
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <partTableDetail :visible.sync="visible" :row="row" />
  </div>
</template>

<script>
import { gsParts } from "@/api/partsrfq/editordetail/abprice";
import partTableDetail from "./partTableDetail";
import { numberProcessor, toThousands } from "@/utils";
import tooltip from "../../../components/tooltip.vue";
import partTableListTotal from "./partTableListTotal.vue";
export default {
  components: { partTableDetail, tooltip, partTableListTotal },
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
      tableData: [],
      visible: false,
      row: {},
      totalData: [
        {
          supplier: "LTC from Start Date",
        },
        {
          supplier: "Total Invest",
          volume: "Target",
        },
        {
          supplier: "Total Budget",
          volume: "Target",
        },
        {
          supplier: "Total Release Cost",
          volume: "Cost",
        },
        {
          supplier: "Total Turnover",
          isMinTto: [],
        },
        {
          supplier: "Saving @100% Share",
        },
      ],
      index: -1,
      showLength: 4,
      supplierAllData: [],
      allData: [],
      loading: false,
      totalTableHeight: 310,
    };
  },
  computed: {
    supplierList() {
      if (this.index == -1) return [];
      return this.supplierAllData[this.index] || [];
    },
  },
  created() {
    this.getData();
  },
  filters: {
    toThousands,
  },
  mounted() {
    // 注意一定要保证DOM渲染完成后在进行合并操作，否则会找不到元素
    this.$nextTick(() => {
      this.setColSpan();
    });
  },
  methods: {
    numberProcessor,
    getInt(val) {
      if (!val) return val;
      let result = val.split(",").join("");
      return (+result).toFixed(0);
    },
    getData() {
      this.loading = true;
      gsParts(this.$route.query.desinateId)
        .then((res) => {
          if (res?.code == "200") {
            let tableData =
              res.data.partInfoList?.map((item) => {
                item.suggestFlag = [];
                item.ttoStatus = [];
                item.bdlInfoList.forEach((child) => {
                  item[child.supplierId + "aPrice"] = child.lcAPrice;
                  item[child.supplierId + "bPrice"] = child.lcBPrice;
                  item[child.supplierId + "quotationType"] = child.quotationType;
                  if (child.suggestFlag)
                    item.suggestFlag.push(
                      child.supplierId + "aPrice",
                      child.supplierId + "bPrice"
                    );
                  if (child.ttoStatus)
                    item.ttoStatus.push(
                      child.supplierId + "aPrice",
                      child.supplierId + "bPrice"
                    );
                });
                return item;
              }) || [];
            const totalData = JSON.parse(JSON.stringify(this.totalData));
            let obj = {};
            res.data.bdlPriceTotalInfoList?.forEach((item) => {
              obj[item.supplierId] = item;
            });
            res.data.bdlRateInfoList?.forEach((item) => {
              obj[item.supplierId][item.rateType] = item.rateList;
              obj[item.supplierId].supplier = item.supplierName;
              obj[item.supplierId].supplierEn = item.supplierNameEn;
            });
            totalData[1].investFeeIsShared = [];
            totalData[4].isMinTto = [];
            let supplierList = Object.values(obj).map((item) => {
              totalData[0][item.supplierId + "aPrice"] = [];
              item.priceReduceDTOList.forEach((child) => {
                if (
                  !totalData[0][item.supplierId + "aPrice"].includes(
                    `${child.ltc} from ${child.ltcStartDate}`
                  ) &&
                  child.ltc != 0
                ) {
                  totalData[0][item.supplierId + "aPrice"].push(
                    `${child.ltc} from ${child.ltcStartDate}`
                  );
                }
              });

              totalData[1][item.supplierId + "aPrice"] = item.toolingTotal;
              if (item.investFeeIsShared) {
                totalData[1].investFeeIsShared.push(item.supplierId + "aPrice");
                totalData[1][item.supplierId + "toolingShareTotal"] =
                  item.toolingShareTotal;
                totalData[1][item.supplierId + "toolingNotShareTotal"] =
                  item.toolingNotShareTotal;
              }
              totalData[2][item.supplierId + "aPrice"] = item.budget;
              totalData[3][item.supplierId + "aPrice"] = item.releaseCost;
              totalData[4][item.supplierId + "aPrice"] = item.ttoTotal;
              if (item.isMinTto) {
                totalData[4].isMinTto.push(item.supplierId + "aPrice");
              }
              totalData[5][item.supplierId + "aPrice"] = item.totalSaving;
              return item;
            });
            this.allData = supplierList;
            let supplierAllData = _.chunk(supplierList, this.showLength);
            let lastIndex = supplierAllData.length - 1;
            if (supplierAllData[lastIndex].length < this.showLength) {
              let count = this.showLength - supplierAllData[lastIndex].length;
              for (let i = 0; i < count; i++) {
                supplierAllData[lastIndex].push({ supplierId: i });
              }
            }
            this.supplierAllData = supplierAllData;
            this.index = 0;
            this.totalData = JSON.parse(JSON.stringify(totalData));
            this.$nextTick(() => {
              this.tableData = tableData;
            });
          }
        })
        .finally(() => {
          this.loading = false;
          this.$nextTick(() => {
            // 注意一定要保证DOM渲染完成后在进行合并操作，否则会找不到元素
            this.setColSpan();
          });
        });
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
      //   行数据,行,列,合并数,方向
      this.merge(row, 0, 0, 5, "colSpan");
      this.merge(row, 0, 0, 4, "rowSpan");
      this.merge(row, 1, 5, 3, "rowSpan");
      this.merge(row, 1, 5, 2, "colSpan");
      this.merge(row, 4, 5, 3, "colSpan");
      this.$emit("setPage", {
        index: this.index,
        showLength: this.showLength,
        total: this.allData.length,
      });
      const row_footer =
        this.$refs["part-table"]?.getElementsByClassName("el-table__footer")[0]
          .rows;
      if (this.tableData.length)
        this.mergeFooter(row_footer, 0, 0, 8 + this.showLength * 2);
      this.$nextTick(() => {
        setTimeout(() => {
          this.totalTableHeight = this.$refs["total-table"]?.scrollHeight;
        }, 0);
        this.$refs.table.doLayout();
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
    // 计算表格合计行合并
    mergeFooter(row, rowIndex, colIndex, span) {
      if (!row) return;
      const col = row[rowIndex].cells;
      if (!(row || col)) return;
      if (rowIndex < 0 || colIndex < 0 || span < 0) return;
      let rIndex = rowIndex;
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
      row[rowIndex].cells[colIndex].colSpan = span;
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
      if(["Supplier", "A Price", "B Price"].includes(column.label)){
        return "current-column"
      }
    },
    gotoDetail(row) {
      this.row = JSON.parse(JSON.stringify(row));
      this.$nextTick(() => {
        this.visible = true;
      });
    },
    summaryMethod(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = (
            <partTableListTotal
              totalData={this.totalData}
              supplierList={this.supplierList}
            />
          );
          return;
        }
      });
      return sums;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-box {
  height: 100%;
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
  .el-table__footer-wrapper {
    .el-table__footer {
      .has-gutter {
        & > tr {
          & > td {
            padding: 0;
            & > .cell {
              padding: 0;
            }
            &:first-of-type {
              border-right: 0;
            }
          }
        }
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
    padding-top: 0px;
    padding-bottom: 0px;
    .cell {
      padding: 0 4px;
    }
  }
}
.left {
  transform: translate(-12px, 0px);
  width: 12px;
  height: 84px;
  background: #0092eb;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  z-index: 999;
  .icon {
    transform: rotate(180deg);
    width: 12px;
    user-select: none;
  }
}
.right {
  transform: translate(-3px, 0px);
  width: 12px;
  height: 84px;
  background: #0092eb;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  z-index: 999;
  .icon {
    width: 12px;
    user-select: none;
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