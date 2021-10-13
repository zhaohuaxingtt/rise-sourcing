<!--
 * @Author: YoHo
 * @Date: 2021-10-09 11:32:16
 * @LastEditTime: 2021-10-12 21:31:34
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div>
    <iCard class="mb-16">
      <p class="title">
        {{
          `${language("BIANDONGZHI", "变动值")}CBD - ${language(
            "HUIZONGBIAO",
            "汇总表"
          )}`
        }}
      </p>
      <el-table
        :data="tableData"
        :span-method="spanMethod"
        :row-class-name="totalRowClass"
      >
        <el-table-column
          v-for="(item, index) in SummaryTitle"
          :key="index"
          :prop="item.prop"
          :label="language(item.labelKey, item.label)"
          :render-header="item.renderHeader"
          :width="item.width"
          align="center"
        >
          <template v-if="item.children.length > 0">
            <el-table-column
              v-for="(child, cindex) in item.children"
              :key="cindex"
              :prop="child.prop"
              :label="language(child.labelKey, child.label)"
              :width="child.width"
              align="center"
            ></el-table-column>
          </template>
          <template slot-scope="{ row }">
            <template v-if="item.prop == 'index'">
              <div v-if="row.total != undefined" class="center-align">
                <span>TOTAL</span>
              </div>
              <div v-else>
                <span>{{ row[item.prop] }}</span>
              </div>
            </template>
            <template v-else-if="item.prop == 'partNum'">
              <div v-if="row.total != undefined" class="end-align">
                <span>{{ row.total }}</span>
              </div>
              <div v-else>
                {{ row[item.prop] }}
              </div>
            </template>
            <template v-else>
              {{ row[item.prop] }}
            </template>
          </template>
        </el-table-column>
      </el-table>
    </iCard>
    <switchParts
      :tableData="switchPartsTable"
      @getCbdDataQuery="getCbdDataQuery"
    />
    <iTabsList
      class="margin-top20"
      type="card"
      v-model="currentTab"
      @tab-click="tabChange"
    >
      <el-tab-pane
        v-for="(tab, $tabIndex) in tabs"
        :key="$tabIndex"
        :label="language(tab.key, tab.label)"
        :name="tab.name"
        v-permission.dynamic.auto="tab.permissionKey"
      >
        <template v-if="tab.name == currentTab">
          <component
            :ref="tab.name"
            :is="component"
            v-loading="loading"
            v-for="(component, $componentIndex) in tab.components"
            :class="$componentIndex !== 0 ? 'margin-top20' : ''"
            :Data="aPriceChangeData"
            :key="$componentIndex"
            :disabled="disabled"
          />
        </template>
      </el-tab-pane>
    </iTabsList>
  </div>
</template>

<script>
import { iCard, iTabsList, iTableCustom } from "rise";
import switchParts from "./switchParts";
import aPriceChange from "./aPriceChange";
import mouldInvestmentChange from "./mouldInvestmentChange";
import developmentFee from "./developmentFee";
import damages from "./damages";
import sampleFee from "./sampleFee";
import { SummaryTableTitle, totalRowClass } from "../data.js";
import { alterationCbdSummary, cbdDataQuery } from "@/api/aeko/approve";
export default {
  components: {
    iCard,
    iTabsList,
    iTableCustom,
    switchParts,
    aPriceChange,
    mouldInvestmentChange,
    developmentFee,
    damages,
    sampleFee,
  },
  data() {
    return {
      loading:false,
      SummaryTitle: SummaryTableTitle,
      defaultTab: "0",
      partInfo: {},
      basicInfo: {},
      disabled: true,
      currentTab: "aPriceChange",
      aPriceChangeData: {},
      tabs: [
        {
          label: "A价变动(含分摊)",
          name: "aPriceChange",
          key: "AJIABIANDONGHANFENTAN",
          components: ["aPriceChange"],
          permissionKey: "AEKO_QUOTATION_CBD_TAB_BIANDONGZHICBD|变动值CBD",
        },
        {
          label: "模具投资变动",
          name: "mouldInvestmentChange",
          key: "MUJUTOUZIBIANDONG",
          components: ["mouldInvestmentChange"],
          permissionKey:
            "AEKO_QUOTATION_CBD_TAB_MUJUTOUZIBIANDONG|模具投资变动",
        },
        {
          label: "开发费",
          name: "developmentFee",
          key: "KAIFAFEI",
          // components: ["developmentFee"],
          permissionKey: "AEKO_QUOTATION_CBD_TAB_KAIFAFEI|开发费",
        },
        {
          label: "终⽌费",
          name: "damages",
          key: "ZHONGZHIFEI",
          // components: ["damages"],
          permissionKey: "AEKO_QUOTATION_CBD_TAB_ZHONGZHIFEI|终⽌费",
        },
        {
          label: "样件费",
          name: "sampleFee",
          key: "YANGJIANFEI",
          // components: ["sampleFee"],
          permissionKey: "AEKO_QUOTATION_CBD_TAB_YANGJIANFEI|样件费",
        },
      ],
      switchPartsTable: [],
      tableData: [],
      workFlowId: "",
      quotationId: "",
    };
  },
  mounted() {
    // this.getTableData();
    // this.getCbdDataQuery();
  },
  methods: {
    totalRowClass,
    spanMethod({ row, columnIndex }) {
      if (row.total) {
        if (!columnIndex) {
          return [1, 1];
        } else if ((columnIndex = 1)) {
          return [1, 14];
        } else {
          return [0, 0];
        }
      }
      return [1, 1];
    },

    // 页签切换
    tabChange() {
      this.loading = true
      this.$nextTick(() => {
        setTimeout(()=>{
          this.loading=false
        },2000)
        const component = this.$refs[this.currentTab][0];
        if (typeof component.init === "function") component.init();
      });
    },
    // 获取汇总表数据
    getTableData() {
      alterationCbdSummary({workFlowId:1}).then(({data})=>{
        let obj = {};
        data.forEach((item, index) => {
          item.index = index;
          obj[item.partNum]
            ? (obj[item.partNum] += item.alteration)
            : (obj[item.partNum] = item.alteration);
        });
        Object.keys(obj).forEach((key) => {
          let item = {
            index: "",
            partNum: key,
            total: "RMB " + (+obj[key]).toFixed(4),
          };
          data.push(item);
        });
        this.tableData = data.sort((a, b) => a.partNum - b.partNum);
      })
    },
    // 获取其它数据
    getCbdDataQuery(partsId) {
      this.loading = true
      setTimeout(()=>{
        this.loading = false
      },2000)
      let obj=JSON.parse(sessionStorage.getItem('AEKO-APPROVAL-DETAILS-ITEM'))
      let workFlowId = obj.workFlowId;
      let quotationId = partsId;
      cbdDataQuery({workFlowId, quotationId}).then(({data})=>{
        this.switchPartsTable = [data.extSnapshotVO];
        this.aPriceChangeData = data;
        this.loading = false
      })
      // let res = {
      //   data: {
      //     cbdId: 0,
      //     // CBD-变动值
      //     cbdLevelVO: {},
      //     // 切换零件
      //     extSnapshotVO: {},
      //     // 制造成本
      //     makeCostList: [],
      //     // 管理费
      //     manageFeeList: [],
      //     // 其它费用
      //     otherFeeList: [],
      //     // 利润
      //     profitVO: {},
      //     quotationId: 0,
      //     // 原材料/散件成本
      //     rawMaterialList: [],
      //     // 报废成本
      //     scrapVO: {},
      //     workFlowId: 0,
      //   },
      // };
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  height: 25px;
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  line-height: 21px;
  color: #000000;
  margin-bottom: 20px;
}
.mb-16 {
  margin-bottom: 16px;
}
::v-deep .el-table {
  tr {
    td {
      border: 0;
      .cell {
        font-size: 14px;
      }
    }
  }
  .center-align,
  .end-align {
    font-size: 15px;
    font-weight: bold;
  }
  .end-align {
    padding: 0 28px 0;
    text-align: right;
  }
  .totalRow {
    background: #f7faff;
  }
  .originRow {
    background: #f4f8ff;
  }
  .isNewRow {
    background: #ffffff;
  }
}
.i-select {
  width: 366px;
  height: 35px;
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(0, 38, 98, 0.15);
  opacity: 1;
  border-radius: 4px;
}
</style>