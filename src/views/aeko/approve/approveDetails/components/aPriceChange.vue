<!--
 * @Author: YoHo
 * @Date: 2021-10-09 16:02:48
 * @LastEditTime: 2021-10-15 11:20:15
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div class="aPriceChange">
    <iCard class="mb-20">
      <p class="title mb-20">{{ language("BIANDONGZHI", "变动值") }}</p>
      <div class="input">
        <span class="label"
          >{{ language("AJIABIANDONGHANFENTAN", "A价变动(含分摊)") }}:</span
        >
        <iText>{{ apriceChange }}</iText>
      </div>
    </iCard>
    <iCard class="mb-20">
      <p class="title mb-20">
        <span>{{ `${language("BIANDONGZHI", "变动值")} - CBD` }}</span>
        <span class="tip ml-12">{{ language("DANWEI", "单位") }}：RMB/Pc.</span>
      </p>
      <div>
        <tableList
          lang
          class="table"
          :selection="false"
          :tableTitle="setCloum"
          :tableData="tableData"
        />
      </div>
      <div>
        <i class="topCutLine"></i>
        <p class="title">
          2.1 {{ language("YUANCAILIAOSANJIANCHENGBEN", "原材料/散件成本") }}
        </p>
        <el-table
          :data="partsCostTableData"
          :span-method="spanMethod"
          :row-class-name="originRowClass"
          :empty-text="language('ZANWUSHUJU', '暂无数据')"
        >
          <el-table-column
            v-for="(item, index) in partsCostTableTitle"
            :key="index"
            :prop="item.prop"
            :label="language(item.labelKey, item.label)"
            :render-header="item.renderHeader"
            :min-width="item.width"
            align="center"
          >
            <template v-if="item.children.length > 0">
              <el-table-column
                v-for="(child, cindex) in item.children"
                :key="cindex"
                :prop="child.prop"
                :label="language(child.labelKey, child.label)"
                :render-header="child.renderHeader"
                :min-width="child.width"
                align="center"
              >
                <template slot-scope="{ row }">
                  <template v-if="child.isNew">
                    <div class="manufacturingMethodColumn">
                      <icon
                        symbol
                        v-if="row.partCbdType"
                        class="iconFont"
                        name="iconxinlingjianCBD"
                      />
                      <div>
                        <span>{{ row[child.prop] }}</span>
                      </div>
                    </div>
                  </template>
                  <template v-else>{{ row[child.prop] }}</template>
                </template>
              </el-table-column>
            </template>
            <template slot-scope="{ row }">
              <template v-if="item.type === 'Boolean'">{{
                row[item.prop] ? "是" : "否"
              }}</template>
              <template v-else>{{ row[item.prop] }}</template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <i class="topCutLine"></i>
        <p class="title">2.2 {{ language("ZHIZAOCHENGBEN", "制造成本") }}</p>
        <el-table
          :data="manufacturingCostTableData"
          :span-method="spanMethod"
          :row-class-name="originRowClass"
          :empty-text="language('ZANWUSHUJU', '暂无数据')"
        >
          <el-table-column
            v-for="(item, index) in manufacturingCostTableTitle"
            :key="index"
            :prop="item.prop"
            :label="language(item.labelKey, item.label)"
            :render-header="item.renderHeader"
            :min-width="item.width"
            align="center"
          >
            <template v-if="item.children.length > 0">
              <el-table-column
                v-for="(child, cindex) in item.children"
                :key="cindex"
                :prop="child.prop"
                :label="language(child.labelKey, child.label)"
                :render-header="child.renderHeader"
                :min-width="child.width"
                align="center"
              >
                <template slot-scope="{ row }">
                  <template v-if="child.isNew">
                    <div class="manufacturingMethodColumn">
                      <icon
                        symbol
                        v-if="row.isNew"
                        class="iconFont"
                        name="iconxinlingjianCBD"
                      />
                      <div>
                        <span>{{ row[child.prop] }}</span>
                      </div>
                    </div>
                  </template>
                  <template v-else>{{ row[child.prop] }}</template>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flexBox">
        <div v-if="Array.isArray(scrapCostTable) && scrapCostTable.length > 0">
          <i class="topCutLine"></i>
          <p class="title mb-20">
            2.3 {{ language("BAOFEICHENGBEN", "报废成本") }}
          </p>
          <div class="main">
            <tableList
              lang
              class="table"
              :selection="false"
              :tableTitle="scrapCostTableTitle"
              :tableData="scrapCostTable"
            >
            </tableList>
          </div>
        </div>
        <div
          v-if="
            Array.isArray(managementFeeTable) && managementFeeTable.length > 0
          "
        >
          <i class="topCutLine"></i>
          <p class="title mb-20">2.4 {{ language("GUANLIFEI", "管理费") }}</p>
          <div class="main">
            <tableList
              lang
              class="table"
              :selection="false"
              :tableTitle="manageCostTableTitle"
              :tableData="managementFeeTable"
            >
            </tableList>
          </div>
        </div>
        <div v-if="Array.isArray(otherFeesTable) && otherFeesTable.length > 0">
          <i class="topCutLine"></i>
          <p class="title mb-20">
            2.5 {{ language("QITAFEIYONG", "其他费用") }}
          </p>
          <div class="main">
            <tableList
              lang
              class="table"
              :selection="false"
              :tableTitle="otherCostTableTitle"
              :tableData="otherFeesTable"
            >
            </tableList>
          </div>
        </div>
        <div v-if="Array.isArray(profitTable) && profitTable.length > 0">
          <i class="topCutLine"></i>
          <p class="title mb-20">2.6 {{ language("LIRUN", "利润") }}</p>
          <div class="main">
            <tableList
              lang
              class="table"
              :selection="false"
              :tableTitle="profitTableTitle"
              :tableData="profitTable"
            >
            </tableList>
          </div>
        </div>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard, iText, icon } from "rise";
import tableList from "rise/web/quotationdetail/components/tableList";
import {
  cbdSummaryTableTitle,
  partsCostTableTitle,
  manufacturingCostTableTitle,
  scrapCostTableTitle,
  manageCostTableTitle,
  otherCostTableTitle,
  profitTableTitle,
  originRowClass,
} from "../data.js";
export default {
  components: {
    iCard,
    iText,
    icon,
    tableList,
  },
  props: {
    Data: {
      type: Object,
      default: () => {
        return {
          // CBD-变动值
          cbdLevelVO: {},
          // // 切换零件
          extSnapshotVO: {},
          // 原材料/散件成本
          rawMaterialList: [],
          // // 制造成本
          makeCostList: [],
          // // 管理费
          manageFeeList: [],
          // // 其它费用
          otherFeeList: [],
          // // 利润
          profitVO: {},
          // // 报废成本
          scrapVO: {},
        };
      },
    },
  },
  data() {
    return {
      partsCostTableTitle,
      manufacturingCostTableTitle,
      scrapCostTableTitle,
      manageCostTableTitle,
      otherCostTableTitle,
      profitTableTitle,
      apriceChange: 0,
      setCloum: cbdSummaryTableTitle,
    };
  },
  computed: {
    // 变动值-CBD
    tableData() {
      if (this.Data.cbdLevelVO?.id) {
        return [this.Data.cbdLevelVO];
      }
      return [];
    },
    // 原材料/散件成本
    partsCostTableData() {
      return this.Data.rawMaterialList;
    },
    // 制造成本
    manufacturingCostTableData() {
      return this.Data.makeCostList;
    },
    // 报废成本
    scrapCostTable() {
      if (this.Data.scrapVO?.id) {
        return [this.Data.scrapVO];
      }
      return [];
    },
    // 管理费
    managementFeeTable() {
      return this.Data.manageFeeList;
    },
    // 其它费用
    otherFeesTable() {
      return this.Data.otherFeeList;
    },
    // 利润
    profitTable() {
      if (this.Data.profitVO?.id) {
        return [this.Data.profitVO];
      }
      return [];
    },
  },
  methods: {
    originRowClass,
  },
};
</script>

<style lang="scss" scoped>
.aPriceChange {
  ::v-deep .el-table {
    .originRow {
      background: #f4f8ff;
    }
    .isNewRow {
      background: #ffffff;
    }
  }
  .title {
    font-size: 18px;
    font-family: Arial;
    font-weight: bold;
    color: #000000;
    margin-bottom: 30px;
    .tip {
      font-size: 14px;
      font-family: Arial;
      font-weight: 400;
      color: #485465;
      opacity: 0.7;
    }
  }
  .input {
    // width: 366px;
    width: 100%;
    display: flex;
    align-items: center;

    .label {
      // width: 126px;
      font-size: 16px;
      margin-right: 20px;
    }

    ::v-deep .itext {
      width: 220px;
    }
  }
  .iconFont-xin {
    font-size: 17px;
  }
  .topCutLine {
    display: block;
    width: 100%;
    height: 0px;
    margin: 30px 0;
    border: 1px dashed #bbc4d6;
  }
  .flexBox {
    display: flex;
    flex-wrap: wrap;

    & > div {
      width: 50%;
      box-sizing: border-box;

      &:nth-of-type(odd) {
        ::v-deep .topCutLine {
          margin-right: 2px;
        }

        ::v-deep .main {
          padding-right: 55px;
        }
      }

      &:nth-of-type(even) {
        ::v-deep .topCutLine {
          margin-left: 2px;
        }

        ::v-deep .main {
          padding-left: 55px;
        }
      }

      &:last-of-type:not(&:nth-of-type(even)) {
        ::v-deep .topCutLine {
          width: 200%;
        }
      }
    }
  }

  .manufacturingMethodColumn {
    position: relative;

    ::v-deep .iconFont {
      width: 30px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      font-size: 12px;
    }

    & > div:not(.iconFont) {
      padding-left: 40px;
    }
  }
  .mb-20 {
    margin-bottom: 20px;
  }
  .ml-12 {
    margin-left: 12px;
  }
}
</style>