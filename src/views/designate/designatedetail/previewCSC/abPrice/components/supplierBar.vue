<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-02 23:24:33
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-16 09:35:30
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\abPrice\components\components\supplierBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div v-loading="loading">
    <div class="page-header margin-bottom20">
      <span>Unit:RMB</span>
      <span class="font-size20">Supplier Offer Comparison ( {{ detail.carTypeProjectNum }} )</span>
      <div class="flex">
        <div class="legend">
          <span class="APrice margin-right10"></span> <span>A Price</span>
        </div>
        <div class="legend margin-left20">
          <span class="BPrice margin-right10"></span><span>BNK Price</span>
        </div>
      </div>
    </div>
    <el-table
      border
      :data="tableData"
      class="header"
      ref="table"
      :key="tableData.length"
      :highlight-current-row="false"
      :cell-class-name="colClass"
      :show-header="false"
      :span-method="arraySpanMethod"
    >
      <el-table-column prop="label" align="center" width="120">
        <template slot-scope="scope">
          <p v-for="(text, index) in scope.row.label" :key="index">
            {{ text }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="subLabel"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column prop="remark" align="center" width="1"></el-table-column>
      <template v-for="item in supplierList">
        <el-table-column
          :key="item.supplierNameEn"
          align="center"
          minWidth="140px"
        >
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
              <p v-for="(child, i) in item[columnLabel[scope.$index]]" :key="i">
                {{ child }}
              </p>
            </template>
            <template
              v-else-if="['te', 'q'].includes(columnLabel[scope.$index])"
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
          minWidth="140px"
        >
          <template slot-scope="scope">
            <template v-if="scope.$index == 0">
              <barItem
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
import { analysisSummaryNomi } from "@/api/partsrfq/editordetail/abprice";
import { toThousands, deleteThousands } from "@/utils";
export default {
  components: {
    barItem,
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
        let height = 225; // 表格外其它内容高度
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
      height: 225,
      tableData: [
        {
          label: ["A-B Price", "Comparison"],
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
          label: ["LTC from Start", "Date"],
        },
        {
          label: ["Total Invest"],
          Recommendation: "",
          "F-Target": "",
          KGF: "",
          VSI: "",
        },
        {
          label: ["Total Develop", "Cost"],
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
        "ltcStartDateList",
        "totalInvest",
        "totalDevelopCost",
        "totalTurnover",
      ], // 'bar不显示,只占位
      supplierList: [],
      fixedList: [
        { prop: "Recommendation", label: "Recommendation", colorA: '#00abab' },
        { prop: "LTC", label: "After LTC", colorA: '#00abab' },
        { prop: "F-Target", label: "F-Target", colorA: '#77649b' },
        { prop: "KGF", label: "KGF", colorA: '#77649b' },
        { prop: "VSI", label: "VSI", colorA: '#77649b' },
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
          this.fixedList[3].bPrice = res.data.kmInfo?.tia || 0;
          allPrice.push(
            deleteThousands(res.data.kmInfo?.pca || 0),
            deleteThousands(res.data.kmInfo?.pcb || 0)
          );
          this.fixedList[4].aPrice = "";
          this.fixedList[4].bPrice = "";
          this.tableData[4].Recommendation =
            res.data.recommendationNomi?.totalInvest || "";
          this.tableData[4]["F-Target"] = res.data.targetTotalInvest;
          this.tableData[5].Recommendation =
            res.data.recommendationNomi?.totalDevelopCost || "";
          this.tableData[5]["KGF"] = "";
          this.tableData[6].Recommendation =
            res.data.recommendationNomi?.totalTurnover || "";
          this.max = Math.max(...allPrice);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    colClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 2) {
        if (rowIndex == 0) {
          return "table-header";
        }
        return "table-header";
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 && ![1, 2].includes(rowIndex)) {
        return [1, 2];
      }
      if (columnIndex == 1 && ![1, 2].includes(rowIndex)) {
        return [0, 0];
      }
      if (columnIndex == 0 && [1].includes(rowIndex)) {
        return [2, 1];
      }
      if (columnIndex == 0 && [2].includes(rowIndex)) {
        return [0, 0];
      }
      if (columnIndex == 2 && [7].includes(rowIndex)) {
        return [2, this.supplierList.length + 5];
      }
      if (
        columnIndex > 2 &&
        columnIndex < this.supplierList.length + 5 &&
        [7].includes(rowIndex)
      ) {
        return [0, 0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  .legend {
    display: flex;
    align-items: center;
    .APrice {
      height: 20px;
      width: 20px;
      background: #516894;
    }
    .BPrice {
      height: 20px;
      width: 20px;
      background: #d8ddd7;
    }
  }
}
.header {
  ::v-deep tr {
    padding: 0;
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
.font-size20{
  font-size: 20px;
}
</style>