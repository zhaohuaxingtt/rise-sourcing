<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-02 23:24:33
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-12 20:52:13
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\abPrice\components\components\supplierBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div v-loading="loading">
    <div class="page-header margin-bottom20">
      <span>Unit:RMB</span>
      <span>Supplier Offer Comparison ( {{ detail.carTypeProjectNum }} )</span>
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
              />
            </template>
            <template
              v-if="['ltcStartDateList'].includes(columnLabel[scope.$index])"
            >
              <p v-for="(child, i) in item[columnLabel[scope.$index]]" :key="i">
                {{ child }}
              </p>
            </template>
            <template v-if="['te', 'q'].includes(columnLabel[scope.$index])">
              <span
                class="red"
                v-if="isCLevel(item[columnLabel[scope.$index]])"
                >{{ item[columnLabel[scope.$index]] }}</span
              >
              <span v-else>{{ item[columnLabel[scope.$index]] }}</span>
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
              />
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
  updated() {
    this.$nextTick(() => {
      setTimeout(() => {
        let rows =
          this.$refs.table.$el?.getElementsByClassName("el-table__body")[0].rows||[];
        let height = 225;
        for (let index = 1; index < rows.length; index++) {
          const element = rows[index];
          height += element.offsetHeight;
        }
        this.height = height;
      });
    }, 100);  // 这个100不精准,可能导致页面错误
  },
  data() {
    return {
      height: 0,
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
        { prop: "Recommendation", label: "Recommendation" },
        { prop: "F-Target", label: "F-Target" },
        { prop: "KGF", label: "KGF" },
        { prop: "VSI", label: "VSI" },
      ],
      loading: false,
    };
  },
  methods: {
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
          try {
            this.supplierList =
              res.data.nomiAnalysisSummarySuppliers.map((item) => {
                let ltcList = [];
                let ltcStartDateList = [];
                item.aPrice = item.mixAPrice;
                item.bPrice = item.mixBPrice;
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
            console.log(this.supplierList);
            this.fixedList[0].aPrice =
              res.data.recommendationNomi?.lcMixAPrice || "";
            this.fixedList[0].bPrice =
              res.data.recommendationNomi?.lcMixBPrice || "";
            this.fixedList[1].aPrice = res.data.targetMixAPrice;
            this.fixedList[1].bPrice = res.data.targetMixBPrice;
            this.fixedList[2].aPrice = "";
            this.fixedList[2].bPrice = "";
            this.fixedList[3].aPrice = "";
            this.fixedList[3].bPrice = "";
            this.tableData[4].Recommendation =
              res.data.recommendationNomi?.totalInvest || "";
            this.tableData[4]["F-Target"] = res.data.targetTotalInvest;
            this.tableData[5].Recommendation =
              res.data.recommendationNomi?.totalDevelopCost || "";
            this.tableData[5]["KGF"] = "";
            this.tableData[6].Recommendation =
              res.data.recommendationNomi?.totalTurnover || "";
          } catch (error) {
            console.log(error);
          }
          return;
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
.height160 {
  height: 160px;
}
.height120 {
  height: 120px;
}
.height40 {
  height: 40px;
}
.cell {
  display: inline-block;
  border: 1px solid #666;
  vertical-align: top;
  .red {
    color: #f00;
  }
}
</style>