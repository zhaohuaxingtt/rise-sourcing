<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-24 16:16:02
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-24 19:16:31
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\abPrice\components\partTableList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- AB价-零件表格:注意不能出现横向滚动条,翻页按钮会错位 -->
<template>
  <div ref="part-table" v-loading="loading">
    <div
      class="table-box"
      :style="{ height: `calc(100% - ${totalTableHeight}px)` }"
    >
      <el-table
        v-show="totalTableHeight"
        :data="tableData"
        class="header table"
        ref="table"
        :key="index"
        border
        height="100%"
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
                      <tooltip :text="scope.row.carProType"></tooltip>
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
                <el-table-column label="F-target" align="center">
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
        <template v-for="(item, index) in supplierList">
          <!-- :key="item.supplierId + index" -->
          <el-table-column :key="index" align="center">
            <div slot="header" slot-scope="scope">
              {{ item.supplierEn || "-" }}
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
                      <p>A price</p>
                      <p>(LC)</p>
                    </template>

                    <template slot-scope="scope">
                      {{
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
                      <p>B price</p>
                      <p>(LC)</p>
                    </template>
                    <template slot-scope="scope">
                      {{
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
    <div ref="total-table" :style="{ 'padding-right': gutter }">
      <el-table
        class="header total-table"
        border
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
    </div>
    <partTableDetail :visible.sync="visible" :row="row" />
  </div>
</template>

<script>
import { fsPartsAsRow } from "@/api/partsrfq/editordetail/abprice";
import partTableDetail from "./partTableDetail";
import { numberProcessor, toThousands } from "@/utils";
import tooltip from "../../components/tooltip.vue";
export default {
  components: { partTableDetail, tooltip },
  data() {
    return {
      ref: "part-table",
      fixedTitle: [
        {
          prop: "partPrjCode",
          label: ["FS No. (Plant)"],
          width: 140,
        },
        {
          prop: "partNo",
          label: ["Part No."],
          width: 150,
        },
        {
          prop: "partName",
          label: ["Part Name"],
          width: 160,
        },
        {
          prop: "carProType",
          label: ["Carline"],
          width: 120,
        },
        {
          prop: "ebr",
          label: ["EBR"],
          width: 60,
        },
        {
          prop: "ebrCalculatedValue",
          label: ["Mixed", "Qty"],
          width: 60,
        },
        {
          prop: "volume",
          label: ["Volume"],
          width: 90,
        },
      ],
      tableData: [],
      visible: false,
      row: {},
      totalData: [
        {
          carProType: "Mixed Price",
          aPrice: "",
          bPrice: "",
        },
        {
          carProType: "LTC from Start Date",
        },
        {
          carProType: "Total Invest",
          volume: "Target",
          aPrice: "",
        },
        {
          carProType: "Total Invest",
          volume: "Budget",
          aPrice: "",
        },
        {
          carProType: "Total Development",
          aPrice: "",
        },
        {
          carProType: "Total Turnover",
          isMinTto: [],
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
      fsPartsAsRow(this.$route.query.desinateId)
        .then((res) => {
          if (res?.code == "200") {
            let tableData =
              res.data.partInfoList?.map((item) => {
                item.suggestFlag = [];
                item.ttoStatus = [];
                item.bdlInfoList.forEach((child) => {
                  item[child.supplierId + "aPrice"] = child.lcAPrice;
                  item[child.supplierId + "bPrice"] = child.lcBPrice;
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
              obj[item.supplierId][item.rateType] = item.rate;
              obj[item.supplierId].supplier = item.supplierName;
              obj[item.supplierId].supplierEn = item.supplierNameEn;
            });
            totalData[5].isMinTto = [];
            let supplierList = Object.values(obj).map((item) => {
              totalData[0][item.supplierId + "aPrice"] = item.lcAPriceTotal;
              totalData[0][item.supplierId + "bPrice"] = item.lcBPriceTotal;
              totalData[1][item.supplierId + "aPrice"] = [];
              item.priceReduceDTOList.forEach((child) => {
                if (
                  !totalData[1][item.supplierId + "aPrice"].includes(
                    `${child.ltc} from ${child.ltcStartDate}`
                  )
                ) {
                  totalData[1][item.supplierId + "aPrice"].push(
                    `${child.ltc} from ${child.ltcStartDate}`
                  );
                }
              });
              totalData[2][item.supplierId + "aPrice"] = item.toolingTotal;
              totalData[4][item.supplierId + "aPrice"] = item.aPrice;
              totalData[5][item.supplierId + "aPrice"] = item.ttoTotal;
              if (item.isMinTto) {
                totalData[5].isMinTto.push(item.supplierId + "aPrice");
              }
              return item;
            });
            this.allData = supplierList;
            totalData[0]["aPrice"] =
              res.data.fsPriceInfo?.targetMixLcAPrice || "";
            totalData[0]["bPrice"] =
              res.data.fsPriceInfo?.targetMixLcBPrice || "";
            totalData[2]["aPrice"] =
              res.data.fsPriceInfo?.targetTotalInvest || "";
            totalData[3]["aPrice"] =
              res.data.fsPriceInfo?.budgetTotalInvest || "";
            totalData[4]["aPrice"] =
              res.data.fsPriceInfo?.targetSelTotalSel || "";
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
            this.totalData = totalData;
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
      return math.multiply(math.bignumber(val), 100).toString() + "%";
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
      this.merge(row, 0, 0, 7, "colSpan");
      this.merge(row, 0, 0, 4, "rowSpan");
      this.merge(row, 1, 7, 3, "rowSpan");
      this.merge(row, 4, 7, 2, "colSpan");
      this.$emit("setPage", {
        index: this.index,
        showLength: this.showLength,
        total: this.allData.length,
      });
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
    prev() {
      if (this.index < this.supplierAllData.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }
      this.$nextTick(() => {
        this.setColSpan();
      });
    },
    next() {
      if (this.index > 0) {
        this.index--;
      } else {
        this.index = this.supplierAllData.length - 1;
      }
      this.$nextTick(() => {
        this.setColSpan();
      });
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
      if (rowIndex == 0 && columnIndex > 7) {
        return "white-bg";
      }
      if (rowIndex < 4 && columnIndex > 8) {
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
.table-box {
  height: calc(100% - 280px);
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