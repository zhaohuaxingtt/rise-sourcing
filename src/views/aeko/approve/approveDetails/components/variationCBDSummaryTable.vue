<!--
 * @Author: YoHo
 * @Date: 2021-10-09 11:32:16
 * @LastEditTime: 2021-11-15 15:19:00
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
        :empty-text="language('ZANWUSHUJU', '暂无数据')"
      >
        <el-table-column
          v-for="(item, index) in SummaryTitle"
          :key="index"
          :prop="item.prop"
          :label="language(item.labelKey, item.label)"
          :render-header="item.renderHeader"
          :min-width="item.width"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template v-if="item.children.length > 0">
            <el-table-column
              v-for="(child, cindex) in item.children"
              :key="cindex"
              :prop="child.prop"
              :label="language(child.labelKey, child.label)"
              :show-overflow-tooltip="true"
              :min-width="child.width"
              align="center"
            >
            <template slot-scope="{ row }">
              {{ row[child.prop] | floatNum(child.prop) }}
            </template>
            </el-table-column>
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
                <span>{{row.currency}} {{ row.total | floatNum('total') }}</span>
              </div>
              <div v-else>
                {{ row[item.prop] }}
              </div>
            </template>
            <template v-else-if="item.prop == 'typeName'">
              <span>
                {{
                  row.typeName &&
                  typeObj[row.typeName].seq +
                    language(
                      typeObj[row.typeName].labelKey,
                      typeObj[row.typeName].label
                    )
                }}
              </span>
            </template>
            <template v-else>
              {{ row[item.prop] | floatNum(item.prop) }}
            </template>
          </template>
        </el-table-column>
      </el-table>
    </iCard>
    <switchParts
      :workFlowId="workFlowId"
      :tableData="switchPartsTable"
      @getCbdDataQuery="getCbdDataQuery"
    />
    <iTabsList
      class="margin-top20"
      type="card"
      v-show="hasData"
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
            :apriceChange="apriceChangeVal"
            :key="$componentIndex"
            :workFlowId="workFlowId"
            :cbdCanEdit="cbdCanEdit"
            :quotationId="partsId"
            :partInfo="partInfo"
            :basicInfo="basicInfo"
            :currency="currency"
          />
        </template>
      </el-tab-pane>
    </iTabsList>
  </div>
</template>

<script>
import { iCard, iTabsList, iTableCustom, iMessage } from "rise";
import switchParts from "./switchParts";
import aPriceChange from "./aPriceChange";
import mouldInvestmentChange from "./mouldInvestmentChange";
import developmentFee from "./developmentFee";
import damages from "./damages";
import sampleFee from "./sampleFee";
import { SummaryTableTitle, totalRowClass, floatFixNum, list, typeObj } from "../data.js";
import { alterationCbdSummary, cbdDataQuery, alterationCbdSummaryByLinie } from "@/api/aeko/approve";
import { getQuotationInfo, getAekoQuotationSummary } from "@/api/aeko/quotationdetail"
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
      loading: false,
      hasData: false,
      SummaryTitle: SummaryTableTitle,
      currentTab: "aPriceChange",
      aPriceChangeData: {},
      aPriceChangeObj: {},
      partsId: "",
      typeObj: typeObj,
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
          components: [
            "mouldInvestmentChange"
          ],
          permissionKey:
            "AEKO_QUOTATION_CBD_TAB_MUJUTOUZIBIANDONG|模具投资变动",
        },
        {
          label: "开发费",
          name: "developmentFee",
          key: "KAIFAFEI",
          components: [
            "developmentFee"
          ],
          permissionKey: "AEKO_QUOTATION_CBD_TAB_KAIFAFEI|开发费",
        },
        {
          label: "终⽌费",
          name: "damages",
          key: "ZHONGZHIFEI",
          components: [
            "damages"
          ],
          permissionKey: "AEKO_QUOTATION_CBD_TAB_ZHONGZHIFEI|终⽌费",
        },
        {
          label: "样件费",
          name: "sampleFee",
          key: "YANGJIANFEI",
          components: [
            "sampleFee"
          ],
          permissionKey: "AEKO_QUOTATION_CBD_TAB_YANGJIANFEI|样件费",
        },
      ],
      switchPartsTable: [],
      tableData: [],
      workFlowId: "",
      quotationId: "",
      partInfo:{},
      basicInfo:{},
      cbdCanEdit:true,
      currency: 'RMB'
    };
  },
  computed: {
    apriceChangeVal() {
      return (+this.switchPartsTable[0]?.apriceChange).toFixed(4) || 0;
    },
  },
  created() {
    this.queryParams = this.$route.query;
    let str_json = window.atob(this.queryParams.transmitObj);
    let transmitObj = JSON.parse(decodeURIComponent(escape(str_json)));
    this.transmitObj = transmitObj
    this.workFlowId =
      transmitObj.aekoApprovalDetails.workFlowId ||
      transmitObj.aekoApprovalDetails.workFlowDTOS[0]?.workFlowId ||
      "";
    this.workFlowId ? this.getTableData() : this.alterationCbdSummaryByLinie();
  },
  methods: {
    totalRowClass,
    // 获取基础信息
    async getBasicInfo(quotationId) {
      await getQuotationInfo(quotationId).then(async (res) => {
        const {code, data = {}} = res;
        if (code == 200) {
          const {
            aekoPartInfo = {},
            quotationPriceSummaryInfo = {},
            rfqId = '',
            fsnrGsnrNum = '',
            source = '',
            round,
            objectAekoId
          } = data;
          this.partInfo = {
            ...aekoPartInfo,
            quotationId,
            rfqId,
            fsNum: fsnrGsnrNum,
            round,
            objectAekoId
          };
          this.basicInfo = data;
          this.currency = quotationPriceSummaryInfo.currency || "RMB"
          let item = {
            ...quotationPriceSummaryInfo,
            originAPrice:quotationPriceSummaryInfo.originalAPrice,
            tooling:quotationPriceSummaryInfo.toolingCost,
            source:source
          }
          this.switchPartsTable = [item];
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch((err) => {
      }).finally(() => this.loading = false);
    },
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
      this.$nextTick(() => {
        const component =
          this.$refs[this.currentTab] && this.$refs[this.currentTab][0];
        if (component && typeof component.init === "function") component.init();
      });
    },
    // 获取汇总表数据
    getTableData() {
      alterationCbdSummary({ workFlowId: this.workFlowId }).then((res) => {
        if (res?.code === "200") {
          let data = res?.data || [];
          let aPriceChangeObj = {};
          data.length &&
            data.forEach((item, index) => {
              item.index = 1 + index;
              if (aPriceChangeObj[item.partNum]) {
                aPriceChangeObj[item.partNum] = {
                  total: math.add(
                    aPriceChangeObj[item.partNum].total,
                    math.bignumber(item.alteration || 0)
                  ),
                  partNum: item.partNum,
                  currency: item.currency || 'RMB'
                };
              } else {
                aPriceChangeObj[item.partNum] = {
                  total: math.bignumber(item.alteration || 0),
                  partNum: item.partNum,
                  currency: item.currency || 'RMB'
                };
              }
            });
          Object.keys(aPriceChangeObj).forEach((key) => {
            let item = {
              index: "",
              partNum: aPriceChangeObj[key].partNum,
              total: +aPriceChangeObj[key].total,
              currency: aPriceChangeObj[key].currency
            };
            data.push(item);
          });
          let arr_group = {};
          data.forEach((i) => {
            if (!arr_group[i.partNum]) {
              arr_group[i.partNum] = [i];
            } else {
              arr_group[i.partNum] = [...arr_group[i.partNum], i];
            }
          });
          this.aPriceChangeObj = aPriceChangeObj;
          let arr = Object.values(arr_group).reduce((arr, i) => {
            return [...arr, ...i];
          }, []);
          this.tableData = arr;
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      });
    },
    // 审批单预览查询
    alterationCbdSummaryByLinie(){
      let params = {
        requirementAekoId:this.transmitObj.aekoApprovalDetails.requirementAekoId,
        linieId:this.transmitObj.aekoApprovalDetails.linieId
      }
      alterationCbdSummaryByLinie(params).then(res=>{
        if (res?.code === "200") {
          let data = res?.data || [];
          let aPriceChangeObj = {};
          data.length &&
            data.forEach((item, index) => {
              item.index = 1 + index;
              if (aPriceChangeObj[item.partNum]) {
                aPriceChangeObj[item.partNum] = {
                  total: math.add(
                    aPriceChangeObj[item.partNum].total,
                    math.bignumber(item.alteration || 0)
                  ),
                  partNum: item.partNum,
                  currency: item.currency || 'RMB'
                };
              } else {
                aPriceChangeObj[item.partNum] = {
                  total: math.bignumber(item.alteration || 0),
                  partNum: item.partNum,
                  currency: item.currency || 'RMB'
                };
              }
            });
          Object.keys(aPriceChangeObj).forEach((key) => {
            let item = {
              index: "",
              partNum: aPriceChangeObj[key].partNum,
              total: +aPriceChangeObj[key].total,
              currency: aPriceChangeObj[key].currency
            };
            data.push(item);
          });
          let arr_group = {};
          data.forEach((i) => {
            if (!arr_group[i.partNum]) {
              arr_group[i.partNum] = [i];
            } else {
              arr_group[i.partNum] = [...arr_group[i.partNum], i];
            }
          });
          this.aPriceChangeObj = aPriceChangeObj;
          let arr = Object.values(arr_group).reduce((arr, i) => {
            return [...arr, ...i];
          }, []);
          this.tableData = arr;
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      })
    },
    // 获取A价变动其它数据
    getCbdDataQuery(partsId) {
      this.partsId = partsId;
      this.loading = true;
      if (!partsId) {
        this.hasData = false;
        this.loading = false;
        return;
      }
      if(this.workFlowId){
        cbdDataQuery({ workFlowId: this.workFlowId, quotationId: partsId }).then(
          (res) => {
            if (res?.code === "200") {
              let data = res.data;
              this.cbdCanEdit = data.cbdCanEdit
              if(data.cbdCanEdit == null) this.cbdCanEdit = true
              this.switchPartsTable = [data?.extSnapshotVO];
              this.aPriceChangeData = data;
              this.loading = false;
              this.hasData = true;
              this.currency = data?.extSnapshotVO.currency || 'RMB'
            } else {
              this.loading = false;
              iMessage.warn(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          }
        );
      }else{
        this.getAekoQuotationSummary(partsId)
      }

      this.tabChange();
    },
    getAekoQuotationSummary(quotationId) {
      this.loading = true
      this.getBasicInfo(quotationId)
      this.tabChange()
      getAekoQuotationSummary({ quotationId })
      .then(res => {
        if (res.code == 200) {
          let aPriceChangeData = {
              // CBD-变动值
              cbdLevelVO: {},
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
          }
          this.loading = false;
          this.hasData = true;
          let cbdLevelVO = {
            materialChange:res.data.materialChange||0,
            makeCostChange:res.data.makeCostChange||0,
            discardCostChange:res.data.discardCostChange||0,
            manageFeeChange:res.data.manageFeeChange||0,
            otherFee:res.data.otherFee||0,
            profitChange:res.data.profitChange||0,
          }
          aPriceChangeData.cbdLevelVO = cbdLevelVO
          aPriceChangeData.profitVO = res.data.profitVO||{}
          aPriceChangeData.scrapVO = res.data.scrapVO||{}
          aPriceChangeData.otherFeeList = res.data.otherFeeList||[]
          aPriceChangeData.manageFeeList = res.data.manageFeeList||[]
          aPriceChangeData.makeCostList = res.data.makeCostList||[]
          aPriceChangeData.rawMaterialList = res.data.rawMaterialList||[]
          this.aPriceChangeData = aPriceChangeData
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .finally(() => this.loading = false)
    },
  },
  filters:{
    floatNum(val, prop){
      if(list.includes(prop)){
        return floatFixNum(val)
      }
      return val
    }
  }
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