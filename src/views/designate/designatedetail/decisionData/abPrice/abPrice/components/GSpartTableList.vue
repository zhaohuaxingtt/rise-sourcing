<!-- AB价-best ball表格:注意不能出现横向滚动条,翻页按钮会错位 -->
<template>
  <div :ref="ref">
    <!-- 内容表 -->
    <div class="table-box">
      <el-table
        :data="tableData"
        class="header table"
        ref="table"
        border
        :header-cell-class-name="cellClass"
        :cell-class-name="colClass"
      >
        <!-- 左侧固定表头 -->
        <el-table-column label="Unit：RMB">
          <template v-for="item in fixedTitle">
            <el-table-column
              :key="item.prop"
              v-if="item.prop == 'fsNum'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center"
            >
              <template slot-scope="scope">
                <span class="link" @click="gotoDetail(scope.row)">{{
                  scope.row[item.prop]
                }}</span>
                <br />
                <span class="link" @click="gotoDetail(scope.row)"
                  >({{ scope.row.factoryEn }})</span
                >
              </template>
            </el-table-column>
            <el-table-column
              :key="item.prop"
              v-else-if="item.prop == 'volume'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="right"
              header-align="center"
            >
              <template slot-scope="scope">
                {{ getInt(scope.row[item.prop]) | toThousands(true) }}
              </template>
            </el-table-column>
            <el-table-column
              :key="item.prop"
              v-else-if="item.prop == 'carTypeProjectNum'"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center"
            >
              <template slot-scope="scope">
                <tooltip
                  :text="
                    scope.row[item.prop] || scope.row.carTypeNames.join('、')
                  "
                />
              </template>
            </el-table-column>
            <el-table-column
              :key="item.prop"
              v-else-if="item.tooltip"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center"
            >
              <template slot-scope="scope">
                <tooltip :text="scope.row[item.prop]" />
              </template>
            </el-table-column>
            <el-table-column
              v-else
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center"
              ><template slot="header" slot-scope="scope">
                <p v-for="(text, index) in item.label" :key="index">
                  {{ text }}
                </p>
              </template></el-table-column
            >
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
              align="right"
              header-align="center"
              minWidth="85"
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
                      (deleteThousands(scope.row.targetAPrice) - scope.row.selAPrice).toFixed(2)
                        | toThousands(true)
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
                    <span>
                {{
                  deleteThousands(scope.row.targetAPrice) | toThousands(true)
                }}</span>
                  </p>
                </div>
              </el-popover>
              <template v-else>
                {{
                  deleteThousands(scope.row.targetAPrice) | toThousands(true)
                }}
              </template>
            </template>
            </el-table-column>
            <el-table-column
              label="B Price"
              prop="targetBPrice"
              align="right"
              header-align="center"
              minWidth="85"
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
                      (deleteThousands(scope.row.targetBPrice) - scope.row.selAPrice).toFixed(2)
                        | toThousands(true)
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
                    <span>
                {{
                  deleteThousands(scope.row.targetBPrice)| toThousands(true)
                }}</span>
                  </p>
                </div>
              </el-popover>
              <template v-else>
                {{
                  deleteThousands(scope.row.targetBPrice)| toThousands(true)
                }}
              </template>
            </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="Detail">
          <el-table-column
            label="Supplier"
            align="center"
            prop="supplierNameEn"
            minWidth="100"
          >
            <template slot-scope="scope">
              <tooltip
                :text="scope.row['supplierNameEn']"
                :content="
                  scope.row.supplierNameZh + ' ' + scope.row.supplierNameEn
                "
              />
            </template>
          </el-table-column>
          <el-table-column label="Rating" align="center">
            <el-table-column
              label="E"
              align="center"
              prop="erate"
              min-width="40"
            >
              <template slot-scope="scope">
                <span class="red" v-if="isCLevel(scope.row.erate)">{{
                  scope.row.erate
                }}</span>
                <span v-else>{{ scope.row.erate }}</span>
              </template></el-table-column
            >
            <el-table-column
              label="Q"
              align="center"
              prop="qrate"
              min-width="40"
            >
              <template slot-scope="scope">
                <span class="red" v-if="isCLevel(scope.row.qrate)">{{
                  scope.row.qrate
                }}</span>
                <span v-else>{{ scope.row.qrate }}</span>
              </template></el-table-column
            >
            <el-table-column
              label="L"
              align="center"
              prop="lrate"
              min-width="40"
            >
              <template slot-scope="scope">
                <span class="red" v-if="isCLevel(scope.row.lrate)">{{
                  scope.row.lrate
                }}</span>
                <span v-else>{{ scope.row.lrate }}</span>
              </template></el-table-column
            >
          </el-table-column>
          <el-table-column
            label="A Price(LC)"
            prop="lcAPrice"
            align="right"
            header-align="center"
            minWidth="85"
          >
            <template slot="header" slot-scope="scope">
              <p>A Price</p>
            </template>
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row.quotationType == 'SKD' ||
                  scope.row.quotationType == 'SKDLC'
                "
                style="color: red"
                >*</span
              >{{ numberProcessor(scope.row.lcAPrice, 2) | toThousands(true) }}
            </template></el-table-column
          >
          <el-table-column
            label="B Price(LC)"
            align="right"
            header-align="center"
            minWidth="85"
            prop="lcBPrice"
          >
            <template slot="header" slot-scope="scope">
              <p>B Price</p>
            </template>
            <template slot-scope="scope">
              <span
                v-if="
                  scope.row.quotationType == 'SKD' ||
                  scope.row.quotationType == 'SKDLC'
                "
                style="color: red"
                >*</span
              >{{ numberProcessor(scope.row.lcBPrice, 2) | toThousands(true) }}
            </template></el-table-column
          >
          <el-table-column
            label="LTC"
            align="center"
            prop="ltc"
          ></el-table-column>
          <el-table-column align="center" prop="ltcStartDate" min-width="90">
            <template slot="header" slot-scope="scope">
              <p>LTC Start</p>
              <p>Date</p>
            </template>
            <template slot-scope="scope">
              <template v-if="scope.row.ltc != 0">{{
                scope.row.ltcStartDate
              }}</template>
            </template></el-table-column
          >
          <el-table-column
            label="Invest"
            prop="invest"
            align="right"
            minWidth="85"
            header-align="center"
          >
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                trigger="hover"
                v-if="scope.row.investFeeIsShared && scope.row.invest"
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
                  <span style="color: red">*</span>{{ scope.row.invest }}
                </div>
              </el-popover>
              <template v-else>
                {{ scope.row.invest }}
              </template>
            </template></el-table-column
          >
          <el-table-column
            align="right"
            header-align="center"
            prop="developCost"
            min-width="100"
          >
            <template slot="header" slot-scope="scope">
              <p>Release</p>
              <p>Cost</p>
            </template>
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                trigger="hover"
                v-if="scope.row.devFeeIsShared && scope.row.developCost"
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
                  <span style="color: red">*</span>{{ scope.row.developCost }}
                </div>
              </el-popover>
              <template v-else>
                {{ scope.row.developCost }}
              </template>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            header-align="center"
            prop="totalTurnover"
            min-width="90"
            label="Total Turnover"
          >
            <template slot="header" slot-scope="scope">
              <p>Total</p>
              <p>Turnover</p>
            </template></el-table-column
          >
        </el-table-column>
        <el-table-column>
          <el-table-column
            align="right"
            header-align="center"
            prop="saving"
            min-width="130"
          >
            <template slot="header" slot-scope="scope">
              <p>Saving</p>
              <p>@100% Share</p>
            </template></el-table-column
          >
          <el-table-column
            align="right"
            header-align="center"
            prop="sopDate"
            min-width="80"
            label="SOP"
          >
            <template slot-scope="scope">
              {{ format(scope.row.sopDate) }}
            </template></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <partTableDetail :visible.sync="visible" :row="row" />
  </div>
</template>

<script>
import tooltip from "../../../components/tooltip.vue";
import {
  getNomiEffectiveQuotation
} from "@/api/partsrfq/editordetail/abprice";
import partTableDetail from "./partTableDetail";
import { numberProcessor, toThousands, deleteThousands } from "@/utils";
export default {
  components: { partTableDetail, tooltip },
  data() {
    return {
      ref: "detail",
      label: "Detail",
      fixedTitle: [
        {
          prop: "fsNum",
          label: ["FS No. (Plant)"],
          width: 130,
        },
        {
          prop: "partNum",
          label: ["Part No."],
          width: 120,
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
          width: 80,
        },
      ],
      tableData: [],
      visible: false,
      row: {},
      totalTableHeight: 120,
    };
  },
  filters: {
    toThousands,
  },
  updated() {
    this.$nextTick(() => {
      this.totalTableHeight = this.$refs["total-table"]?.scrollHeight + 1;
    });
  },
  created() {
    this.getData();
  },
  methods: {
    numberProcessor,
    deleteThousands,
    format(date){
      if(!date) return ''
      return window.moment(date).format('YYYY-MM')
    },
    getInt(val) {
      if (!val) return val;
      let result = val.split(",").join("");
      return (+result).toFixed(0);
    },
    percent(val) {
      return (val * 100).toFixed(2) + "%";
    },
    getData() {
      this.index = this.label == "Best ball" ? 0 : 1;
      getNomiEffectiveQuotation(this.$route.query.desinateId)
        .then((res) => {
          if (res?.code == "200") {
            let tableData = res.data.analysisNomiPriceInfoList.map((child,i)=>{
              let item = JSON.parse(JSON.stringify(child))
              let next = res.data.analysisNomiPriceInfoList[1+i]
              if(!next||(next.fsNum != item.fsNum)){
                item.underline = true
              }else{
                item.underline = false
              }
              return item
            });
            this.tableData = tableData;
            console.log('tableData=>',tableData);
          } else {
            this.tableData = [];
          }
        });
    },
    isCLevel(val) {
      if (!val) return val;
      return val.indexOf("c") > -1 || val.indexOf("C") > -1;
    },
    // 表头单元格背景调整
    cellClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0 && [0,2].includes(columnIndex)) {
        return "white-bg unit";
      } else if (rowIndex == 0) {
        return "primary-label";
      }
      return "";
    },
    // 内容单元格蓝色背景调整
    colClass({ row, column, rowIndex, columnIndex }) {
      let className = ''
      if (["A Price(LC)", "B Price(LC)"].includes(column.label)) {
        if (row.suggestFlag) {
          className = "blue-border font-green";
        } else {
          className = "font-green";
        }
      }
      if (["Total Turnover"].includes(column.label)) {
        if (this.label == "Best ball") {
          className = "font-green";
        } else
          if (row.isMinTto) {
          className = "font-green";
        }
      }
      if(row.underline) className += ' fs-group'
      return className
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
  .el-table__footer-wrapper {
    .el-table__footer {
      .has-gutter {
        & > tr {
          & > td {
            padding: 0;
            .cell {
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
  .fs-group{
    border-bottom: 5px solid #365d63 !important;
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