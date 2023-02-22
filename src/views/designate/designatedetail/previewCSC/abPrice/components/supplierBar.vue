<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-02 23:24:33
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-22 17:21:47
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\abPrice\components\components\supplierBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div v-loading="loading">
    <div class="page-header margin-bottom20">
      <span>Unit:RMB</span>
      <span class="font-size20"
        >Supplier Offer Comparison ( {{ detail.carTypeProjectNum }} )</span
      >
      <div class="legend-box">
        <div>
          <div class="legend-item">
            <span class="legend APrice margin-right10"></span>
            <span>A Price</span>
          </div>
          <div class="legend-item margin-top10">
            <span class="legend BPrice margin-right10"></span
            ><span>BNK Price</span>
          </div>
        </div>
        <div class="margin-left20">
          <div class="legend-item">
            <span class="legend GAP margin-right10"></span>
            <span>plausible GAP</span>
          </div>
          <div class="legend-item margin-top10">
            <span class="legend Field margin-right10"></span
            ><span>Green Field</span>
          </div>
        </div>
      </div>
    </div>
    <!-- height="calc(100% - 75px)" -->
    <el-table
      border
      :data="tableData"
      class="header"
      ref="table"
      :key="tableData.length"
      :highlight-current-row="false"
      :cell-class-name="colClass"
      :row-class-name="rowClass"
      :show-header="false"
      :span-method="arraySpanMethod"
    >
      <el-table-column prop="label" align="center" width="90" fixed>
        <template slot-scope="scope">
          <p v-for="(text, index) in scope.row.label" :key="index">
            {{ text }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="subLabel"
        align="center"
        width="40"
        fixed
      ></el-table-column>
      <el-table-column prop="remark" align="center" width="1"></el-table-column>
      <template v-for="(item, index) in supplierList">
        <!-- :key="item.supplierNameEn" -->
        <el-table-column :key="index" align="center" minWidth="160px">
          <template slot-scope="scope">
            <template v-if="scope.$index == 0">
              <barItem
                :height="height"
                :key="item.supplierNameEn"
                :barName="item.supplierNameEn"
                :data="item"
                :max="max"
              />
            </template>
            <template
              v-else-if="
                ['ltcStartDateList'].includes(columnLabel[scope.$index])
              "
            >
              <template v-if="item[columnLabel[scope.$index]].length < 3">
                <p
                  v-for="(child, i) in item[columnLabel[scope.$index]]"
                  :key="i"
                >
                  {{ child }}
                </p>
              </template>
              <template v-else>
                <el-tooltip popper-class="font-family" effect="light" placement="top">
                  <div slot="content">
                    <p
                      v-for="(child, i) in item[columnLabel[scope.$index]]"
                      :key="i"
                    >
                      {{ child }}
                    </p>
                  </div>
                  <div>
                    <p
                      v-for="(child, i) in item[
                        columnLabel[scope.$index]
                      ].slice(0, 2)"
                      :key="i"
                    >
                      {{ child }}
                    </p>
                    <p>...</p>
                  </div>
                </el-tooltip>
              </template>
            </template>
            <template
              v-else-if="['te', 'q', 'l'].includes(columnLabel[scope.$index])"
            >
              <span
                class="red"
                v-if="isCLevel(item[columnLabel[scope.$index]])"
                >{{ item[columnLabel[scope.$index]] }}</span
              >
              <span v-else>{{ item[columnLabel[scope.$index]] }}</span>
            </template>
            <template
              v-else-if="
                ['totalInvest', 'totalDevelopCost', 'totalTurnover'].includes(
                  columnLabel[scope.$index]
                )
              "
            >
              <span>{{
                getInt(item[columnLabel[scope.$index]]) | toThousands(true)
              }}</span>
            </template>
            <template v-else>
              {{ item[columnLabel[scope.$index]] }}
            </template>
          </template>
        </el-table-column>
      </template>
      <template v-for="item in fixedList">
        <el-table-column
          :prop="item.prop"
          :key="item.prop"
          align="center"
          minWidth="160px"
          fixed="right"
        >
          <template slot-scope="scope">
            <template v-if="scope.$index == 0">
              <barItemVSI
                v-if="item.prop == 'VSI'"
                :key="item.prop"
                :height="height"
                :barName="item.label"
                :data="item"
                :vsi="detail.vsi"
                :color="item.colorA"
                :max="max"
              />
              <barItemKGF
                v-else-if="item.prop == 'KGF'"
                :key="item.prop"
                :height="height"
                :barName="item.label"
                :data="item"
                :max="max"
              />
              <barItem
                v-else
                :key="item.prop"
                :height="height"
                :barName="item.label"
                :data="item"
                :colorA="item.colorA"
                :max="max"
              />
            </template>
            <template
              v-else-if="
                ['totalInvest', 'totalDevelopCost', 'totalTurnover'].includes(
                  columnLabel[scope.$index]
                )
              "
            >
              <span>{{
                getInt(scope.row[item.prop]) | toThousands(true)
              }}</span>
            </template>
            <template v-else>
              {{ scope.row[item.prop] }}
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import barItem from "./barItem";
import barItemVSI from "./barItemVSI";
import barItemKGF from "./barItemKGF";

import { analysisSummaryNomi } from "@/api/partsrfq/editordetail/abprice";
import { toThousands, deleteThousands } from "@/utils";
export default {
  components: {
    barItem,
    barItemVSI,
    barItemKGF,
  },
  props: {
    detail: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    detail: {
      handler(val) {
        this.analysisSummaryNomi();
      },
      deep: true,
      immediate: true,
    },
  },
  filters: {
    toThousands,
  },
  updated() {
    this.$nextTick(() => {
      setTimeout(() => {
        let rows =
          this.$refs.table.$el?.getElementsByClassName("el-table__body")[0]
            .rows || [];
        let height = 290; // 表格外其它内容高度
        for (let index = 1; index < rows.length; index++) {
          const element = rows[index];
          height += element.offsetHeight;
        }
        this.height = height;
      });
    }, 100); // 这个100不精准,可能导致页面错误
  },
  data() {
    return {
      height: 290, // 表格外其它内容高度
      tableData: [
        {
          label: ["Mixed Price", "Comparison"],
        },
        {
          label: ["Rating"],
          subLabel: "E",
        },
        {
          label: ["Rating"],
          subLabel: "Q",
        },
        {
          label: ["Rating"],
          subLabel: "L",
        },
        {
          label: ["LTC"],
        },
        {
          label: ["Invest"],
          Recommendation: "",
          "F-Target": "",
          KGF: "",
          VSI: "",
        },
        {
          label: ["Dev. Cost"],
          Recommendation: "",
          "F-Target": "",
          KGF: "",
          VSI: "",
        },
        {
          label: ["Total Turnover"],
          Recommendation: "",
          "F-Target": "",
          KGF: "",
          VSI: "",
        },
        // {
        //   label: "Strategy",
        //   remark: `这是一段文字描述描述这是一段文字描述描述这是一段文字描述描述这是一段文
        //         字描述描述这是一段文字描述描述这是一段文字描述描述这是一段文字描述描述这是一段文字描述描述`,
        // },
      ],
      columnLabel: [
        "bar",
        "te",
        "q",
        "l",
        "ltcStartDateList",
        "totalInvest",
        "totalDevelopCost",
        "totalTurnover",
      ], // 'bar不显示,只占位
      supplierList: [],
      fixedList: [
        { prop: "Recommendation", label: "Recommendation", colorA: "#395e78" },
        { prop: "LTC", label: "After LTC", colorA: "#395e78" },
        { prop: "F-Target", label: "F-Target", colorA: "#97a0bb" },
        { prop: "KGF", label: "KGF" },
        { prop: "VSI", label: "VSI", colorA: "#97a0bb" },
      ],
      loading: false,
      max: null,
    };
  },
  methods: {
    getInt(val) {
      if (!val) return val;
      let result = val.split(",").join("");
      return (+result).toFixed(0);
    },
    isCLevel(val) {
      return val.indexOf("c") > -1 || val.indexOf("C") > -1;
    },
    analysisSummaryNomi() {
      this.loading = true;
      analysisSummaryNomi({
        nomiId: this.$route.query.desinateId,
        fsGsNumList: this.detail?.fsGsList || undefined,
      })
        .then((res) => {
          if (res?.code != 200) return;
          this.max = null;
          let allPrice = [];
          this.supplierList =
            res.data.nomiAnalysisSummarySuppliers.map((item) => {
              let ltcList = [];
              let ltcStartDateList = [];
              item.aPrice = item.mixAPrice;
              item.bPrice = item.mixBPrice;
              allPrice.push(item.mixAPrice, item.mixBPrice);
              item.analysisSummaryParts.forEach((child) => {
                if (!ltcList.includes(child.ltc)) ltcList.push(child.ltc);
                if (
                  !ltcStartDateList.includes(
                    `${child.ltc} from ${child.ltcStartDate}`
                  )
                )
                ltcStartDateList.push(
                  `${child.ltc} from ${child.ltcStartDate}`
                );
              });
              item.ltcList = ltcList;
              item.ltcStartDateList = ltcStartDateList;
              return item;
            }) || [];
          this.fixedList[0].aPrice =
            res.data.recommendationNomi?.lcMixAPrice || 0;
          this.fixedList[0].bPrice =
            res.data.recommendationNomi?.lcMixBPrice || 0;
          allPrice.push(
            deleteThousands(res.data.recommendationNomi?.lcMixAPrice || 0),
            deleteThousands(res.data.recommendationNomi?.lcMixBPrice || 0)
          );
          this.fixedList[1].aPrice = deleteThousands(
            res.data.ltcPriceInfo.ltcMixAPrice || 0
          );
          this.fixedList[1].bPrice = deleteThousands(
            res.data.ltcPriceInfo.ltcMixBPrice || 0
          );
          allPrice.push(
            deleteThousands(res.data.ltcPriceInfo?.ltcMixAPrice || 0),
            deleteThousands(res.data.ltcPriceInfo?.ltcMixAPrice || 0)
          );
          this.fixedList[2].aPrice = res.data.targetMixAPrice;
          this.fixedList[2].bPrice = res.data.targetMixBPrice;
          allPrice.push(
            deleteThousands(res.data.targetMixAPrice || 0),
            deleteThousands(res.data.targetMixBPrice || 0)
          );
          this.fixedList[3].aPrice = res.data.kmInfo?.pca || 0;
          this.fixedList[3].bPrice = res.data.kmInfo?.openGap || 0;
          this.fixedList[3].cPrice = res.data.kmInfo?.greenFieldMeasure || 0;
          allPrice.push(
            deleteThousands(res.data.kmInfo?.pca || 0),
            deleteThousands(res.data.kmInfo?.openGap || 0),
            deleteThousands(res.data.kmInfo?.greenFieldMeasure || 0)
          );
          this.fixedList[4].aPrice = "";
          this.fixedList[4].bPrice = "";
          this.tableData[5].Recommendation =
            res.data.recommendationNomi?.totalInvest || "";
          this.tableData[6].Recommendation =
            res.data.recommendationNomi?.totalDevelopCost || "";
          this.tableData[7].Recommendation =
            res.data.recommendationNomi?.totalTurnover || "";
          this.tableData[5]["F-Target"] = res.data.targetTotalInvest;
          this.tableData[6]["KGF"] = "";
          this.max = Math.max(...allPrice);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    colClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        if (columnIndex < 2) {
          return "table-header none-border";
        }
        return "none-border";
      } else {
        if (columnIndex < 2) {
          return "table-header";
        }
      }
    },
    rowClass({ row }) {
      // return ["E", "Q", "L"].includes(row.subLabel) ? "small" : "";  // 暂时保留,避免后续又要调整
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 && [1].includes(rowIndex)) {
        return [3, 1];
      }
      if (columnIndex == 0 && ![1, 2, 3].includes(rowIndex)) {
        return [1, 2];
      }
      if (columnIndex == 1 && ![1, 2, 3].includes(rowIndex)) {
        return [0, 0];
      }
      if (columnIndex == 0 && [2, 3].includes(rowIndex)) {
        return [0, 0];
      }
      // if (columnIndex == 2 && [7].includes(rowIndex)) {
      //   return [2, this.supplierList.length + 5];
      // }
      // if (
      //   columnIndex > 2 &&
      //   columnIndex < this.supplierList.length + 5 &&
      //   [7].includes(rowIndex)
      // ) {
      //   return [0, 0];
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  align-items: center;
  .legend-box {
    display: flex;
    flex-flow: row;
    .legend-item {
      display: flex;
    }
  }
  .legend {
    display: flex;
    align-items: center;
    height: 20px;
    width: 20px;
  }
  .APrice {
    background: #c4dcde;
  }
  .BPrice {
    background: #d8ddd7;
  }
  .GAP {
    background: #f9ce03;
  }
  .Field {
    background: #069444;
  }
}
.header {
  ::v-deep tr {
    padding: 0;
    &.small {
      height: unset !important;
      td {
        padding: 3px;
      }
    }
    .none-border {
      border: 0 !important;
    }
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
    .cell {
      padding: 0;
    }
  }
}
.cell {
  display: inline-block;
  border: 1px solid #666;
  vertical-align: top;
  .red {
    color: #f00;
  }
}
.font-size20 {
  font-size: 20px;
  font-weight: bold;
}
</style>