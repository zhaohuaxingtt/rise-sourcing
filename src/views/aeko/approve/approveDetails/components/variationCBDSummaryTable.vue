<!--
 * @Author: YoHo
 * @Date: 2021-10-09 11:32:16
 * @LastEditTime: 2021-10-12 08:59:13
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div>
    <iCard class="mb-16">
      <p class="title">变动值CBD - 汇总表</p>
      <el-table :data="tabledata" stripe :span-method="spanMethod">
        <el-table-column
          v-for="(item, index) in SummaryTitle"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <template v-if="item.children.length > 0">
            <el-table-column
              v-for="(child, cindex) in item.children"
              :key="cindex"
              :prop="child.prop"
              :label="child.label"
              :width="child.width"
              align="center"
            ></el-table-column>
          </template>
          <template slot-scope="{ row }">
            <template v-if="item.prop == 'col1'">
              <div v-if="row.total" class="center-align">
                <span>TOTAL</span>
              </div>
              <div v-else>
                <span>{{ row.col1 }}</span>
              </div>
            </template>
            <template v-else-if="item.prop == 'col2'">
              <template v-if="row.total">
                <div class="end-align">
                  <span>{{ row.total }}</span>
                </div>
              </template>
              <template v-else>
                {{ row.col2 }}
              </template>
            </template>
            <template v-else>
              {{ row[item.prop] }}
            </template>
          </template>
        </el-table-column>
      </el-table>
    </iCard>
    <switchParts />
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
            v-for="(component, $componentIndex) in tab.components"
            :class="$componentIndex !== 0 ? 'margin-top20' : ''"
            :key="$componentIndex"
            :partInfo="partInfo"
            :basicInfo="basicInfo"
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
import { SummaryTableTitle } from "../data.js";
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
      SummaryTitle: SummaryTableTitle,
      defaultTab: "0",
      partInfo: {},
      basicInfo: {},
      disabled: true,
      currentTab: "aPriceChange",
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
          components: ["developmentFee"],
          permissionKey: "AEKO_QUOTATION_CBD_TAB_KAIFAFEI|开发费",
        },
        {
          label: "终⽌费",
          name: "damages",
          key: "ZHONGZHIFEI",
          components: ["damages"],
          permissionKey: "AEKO_QUOTATION_CBD_TAB_ZHONGZHIFEI|终⽌费",
        },
        {
          label: "样件费",
          name: "sampleFee",
          key: "YANGJIANFEI",
          components: ["sampleFee"],
          permissionKey: "AEKO_QUOTATION_CBD_TAB_YANGJIANFEI|样件费",
        },
      ],
      tabledata: [
        {
          col1: "1",
          col2: "A23D654321",
          col3: "2.1 原材料/散件成本",
          col4: "",
          col5: "A23D654321",
          col6: "10.0000",
          col7: "件",
          col8: "2.0000",
          col9: "20.0000",
          col10: "A23D654321",
          col11: "9.0000",
          col12: "件",
          col13: "2.0000",
          col14: "18.0000",
          col15: "2.0000",
        },
        {
          col1: "2",
          col2: "A23D654321",
          col3: "2.1 原材料/散件成本",
          col4: "",
          col5: "A23D654321",
          col6: "10.0000",
          col7: "件",
          col8: "2.0000",
          col9: "20.0000",
          col10: "A23D654321",
          col11: "9.0000",
          col12: "件",
          col13: "2.0000",
          col14: "18.0000",
          col15: "2.0000",
        },
        {
          col1: "3",
          col2: "A23D654321",
          col3: "2.1 原材料/散件成本",
          col4: "",
          col5: "A23D654321",
          col6: "10.0000",
          col7: "件",
          col8: "2.0000",
          col9: "20.0000",
          col10: "A23D654321",
          col11: "9.0000",
          col12: "件",
          col13: "2.0000",
          col14: "18.0000",
          col15: "2.0000",
        },
        {
          col1: "TOTAL",
          col2: "RMB 2.0000",
          col3: "",
          col4: "",
          col5: "",
          col6: "",
          col7: "",
          col8: "",
          col9: "",
          col10: "",
          col11: "",
          col12: "",
          col13: "",
          col14: "",
          col15: "",
          total: "RMB 2.0000",
        },
      ],
    };
  },
  methods: {
    spanMethod({ row, columnIndex }) {
      if (row.total) {
        if (!columnIndex) {
          return [1, 1];
        } else if ((columnIndex = 1)) {
          return [1, Object.keys(row).length - 2];
        } else {
          return [0, 0];
        }
      }
      return [1, 1];
    },

    // 页签切换
    tabChange() {
      this.$nextTick(() => {
        const component = this.$refs[this.currentTab][0];
        if (typeof component.init === "function") component.init();
      });
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