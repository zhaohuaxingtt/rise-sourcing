<!-- AB价-零件表格:注意不能出现横向滚动条,翻页按钮会错位 -->
<template>
  <div ref="part-table" v-loading="loading">
    <div class="table-box">
      <el-table
        :data="tableData"
        class="header table"
        ref="table"
        border
        height="100%"
        :header-cell-class-name="cellClass"
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
                      <br>
                      <span class="link" @click="gotoDetail(scope.row)">({{scope.row.factoryEn}})</span>
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
                      <span>{{
                        scope.row.partName
                      }}</span>
                      <br>
                      <span>({{scope.row.partNameDe}})</span>
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
                      <span>{{
                        percent(scope.row.ebr)
                      }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-else
                    :prop="item.prop"
                    :width="item.width"
                    align="center"
                  >
              <template slot="header" slot-scope="scope">
                <p v-for="(text,index) in item.label" :key="index">{{text}}</p>
              </template></el-table-column>
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
                    minWidth="85"
                  >
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
                    minWidth="85"
                  >
                  </el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <template v-for="(item, index) in supplierList">
            <!-- :key="item.supplierId + index" -->
          <el-table-column
            :key="index"
            align="center"
          >
            <div slot="header" slot-scope="scope">
              {{ item.supplier || "-" }}
              <div
                v-if="index == 0"
                class="leftAllow"
                @click="leftAllow($event)"
              ></div>
              <div
                v-if="index == supplierList.length - 1"
                class="rightAllow"
                @click="rightAllow($event)"
              ></div>
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
                    minWidth="85"
                  >
                    <template slot="header" slot-scope="scope">
                      <p>A price</p>
                      <p>(LC)</p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :prop="item.supplierId + 'bPrice'"
                    label="B price(LC)"
                    align="right"
                    header-align="center"
                    minWidth="85"
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
        </template>
      </el-table>
    </div>
    <div :style="{ 'padding-right': gutter }">
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
        <el-table-column prop="Supplier" label="Supplier">
          <el-table-column
            label="A Price"
            prop="cfPartAPrice"
            minWidth="80"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="B Price"
            prop="cfPartBPrice"
            minWidth="80"
            align="center"
          >
          </el-table-column>
        </el-table-column>
        <template v-for="(item, index) in supplierList">
          <el-table-column
            :label="item.supplier"
            :key="item.supplierId + index"
            align="center"
          >
            <el-table-column
              :prop="item.supplierId + 'aPrice'"
              label="A price(LC)"
              align="center"
              minWidth="80"
            >
              <template slot="header" slot-scope="scope">
                <p>A price</p>
                <p>(LC)</p>
              </template>
              <template slot-scope="scope">
                <template v-if="scope.$index == 1">
                  <p
                    v-for="(text, index) in scope.row[
                      item.supplierId + 'aPrice'
                    ]"
                    :key="index"
                  >
                    {{ text.ltc }} from {{ text.ltcStartDate }}
                  </p>
                </template>
                <template v-else>{{
                  scope.row[item.supplierId + "aPrice"]
                }}</template>
              </template>
            </el-table-column>
            <el-table-column
              :prop="item.supplierId + 'bPrice'"
              label="B price(LC)"
              align="center"
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
    <template v-if="supplierAllData.length > 1">
      <div class="left" :style="left" @click="prev">
        <img :src="allowIcon" alt="">
      </div>
      <div class="right" :style="right" @click="next">
        <img :src="allowIcon" alt="">
      </div>
    </template>
  </div>
</template>

<script>
import { fsPartsAsRow } from "@/api/partsrfq/editordetail/abprice";
import partTableDetail from "./partTableDetail";
import allowIcon from "@/assets/images/icon/allow.png";
import allow from "./allow.js";
export default {
  mixins: [allow],
  components: { partTableDetail },
  data() {
    return {
      allowIcon,
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
          width: 80,
        },
        {
          prop: "ebr",
          label: ["EBR"],
          width: 80,
        },
        {
          prop: "ebrCalculatedValue",
          label: ["Mixed", "Qty"],
          width: 80,
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
          volume: "Target",
          aPrice: "",
        },
        {
          carProType: "Total Development",
          volume: "Budget",
          aPrice: "",
        },
        {
          carProType: "Total Turnover",
        },
      ],
      index: 0,
      showLength: 5,
      supplierAllData: [],
      loading: false,
    };
  },
  computed: {
    supplierList() {
      return this.supplierAllData[this.index] || [];
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    // 注意一定要保证DOM渲染完成后在进行合并操作，否则会找不到元素
    this.$nextTick(()=>{
      this.setColSpan();
    })
  },
  methods: {
    getData() {
      this.loading = true;
      fsPartsAsRow(this.$route.query.desinateId)
        .then((res) => {
          if (res?.code == "200") {
            const tableData =
              res.data.partInfoList?.map((item) => {
                item.bdlInfoList.forEach((child) => {
                  item[child.supplierId + "aPrice"] = child.lcAPrice;
                  item[child.supplierId + "bPrice"] = child.lcBPrice;
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
            let supplierList = Object.values(obj).map((item) => {
              totalData[0][item.supplierId + "aPrice"] = item.lcAPriceTotal;
              totalData[0][item.supplierId + "bPrice"] = item.lcBPriceTotal;
              totalData[1][item.supplierId + "aPrice"] =
                item.priceReduceDTOList;
              totalData[2][item.supplierId + "aPrice"] = item.toolingTotal;
              totalData[4][item.supplierId + "aPrice"] = item.aPrice;
              totalData[6][item.supplierId + "aPrice"] = item.ttoTotal;
              return item;
            });
            totalData[0]["aPrice"] =
              res.data.fsPriceInfo?.targetMixLcAPrice || "";
            totalData[0]["bPrice"] =
              res.data.fsPriceInfo?.targetMixLcBPrice || "";
            totalData[2]["aPrice"] =
              res.data.fsPriceInfo?.targetTotalInvest || "";
            totalData[3]["aPrice"] =
              res.data.fsPriceInfo?.budgetTotalInvest || "";
            totalData[6]["aPrice"] =
              res.data.fsPriceInfo?.targetSelTotalSel || "";
            this.index = 0;
            this.supplierAllData = _.chunk(supplierList, this.showLength);
            let lastIndex = this.supplierAllData.length - 1;
            if (this.supplierAllData[lastIndex].length < 5) {
              let count = 5 - this.supplierAllData[lastIndex].length;
              for (let i = 0; i < count; i++) {
                this.supplierAllData[lastIndex].push({ supplierId: i });
              }
            }
            this.totalData = totalData;
            this.tableData = tableData;
          }
        })
        .finally(() => {
          this.loading = false;
          this.$nextTick(()=>{
            // 注意一定要保证DOM渲染完成后在进行合并操作，否则会找不到元素
            this.setColSpan();
          })
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
        this.$refs["part-table"].getElementsByClassName("el-table__header")[0]
          .rows;
      //   行数据,行,列,合并数,方向
      this.merge(row, 0, 0, 7, "colSpan");
      this.merge(row, 0, 0, 4, "rowSpan");
      this.merge(row, 1, 7, 3, "rowSpan");
      this.merge(row, 4, 7, 2, "colSpan");
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
    // 计算统计表表头合并
    totalCellClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 && rowIndex == 0) {
        return [7, 3];
      } else if (columnIndex < 3 && rowIndex < 7) {
        return [0, 0];
      }
      if ([0, 1, 6].includes(rowIndex)) {
        if (columnIndex == 3) {
          return [1, 4];
        } else if ([4, 5, 6].includes(columnIndex)) {
          return [0, 0];
        }
      }
      if ([2, 4].includes(rowIndex)) {
        if (columnIndex == 3) {
          return [2, 3];
        } else if ([4, 5].includes(columnIndex)) {
          return [0, 0];
        }
      }
      if ([3, 5].includes(rowIndex)) {
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
          if ([1, 6].includes(rowIndex)) {
            return [1, 2];
          } else if ([2, 4].includes(rowIndex)) {
            return [2, 2];
          } else if ([3, 5].includes(rowIndex)) {
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
    },
    next() {
      if (this.index > 0) {
        this.index--;
      } else {
        this.index = this.supplierAllData.length - 1;
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
      if (["partAPrice", "partBPrice"].includes(column.label)) {
        return row[column.property] && row[column.property] < 200
          ? "blue-border"
          : "";
      }
    },
    totalColClass({ row, column, rowIndex, columnIndex }) {
      if ([3, 4, 5, 6].includes(columnIndex)) {
        return "table-header";
      }
    },
    gotoDetail(row) {
      this.row = row;
      console.log(row);
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
    padding-top: 3px;
    padding-bottom: 3px;
    .cell{
      padding-left: 1px;
      padding-right: 1px;
    }
  }
  ::v-deep td {
    .cell {
      padding-left: 2px;
      padding-right: 2px;
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
    .white-bg {
      background: #fff;
      .cell {
        white-space: normal;
        font-weight: 500;
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
    float: left;
  }

  .rightAllow {
    position: relative;
    padding: 0;
    float: right;
  }
  .red {
    color: #f00;
  }
}

.total-table {
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
}
.left {
  transform: translate(-2px, 18px);
}
.right {
  transform: translate(-12px, 18px);
}

.table {
  ::v-deep .el-table__header {
    background-color: #364d6e;
    tr:nth-child(even) {
      background-color: #364d6e;
    }
  }
}
</style>