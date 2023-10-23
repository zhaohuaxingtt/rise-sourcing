<!--
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:17:25
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-04-18 15:59:28
 * @Description: 上会/备案RS单
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\rs\components\meeting\index.vue
-->

<template>
  <div class="meeting isPreview" ref="meeting">
    <div class="rs-content">
      <div class="page-flex">
        <div class="page-header">
          <div class="title">
            <p>CSC定点推荐 - {{ cardTitle }} {{ cardTitleEn }}</p>
          </div>
          <div class="control">
            <div class="nomiId">
              定点申请单号：{{
                $route.query.desinateId ? $route.query.desinateId : nominateId
              }}
            </div>
            <div
              class="singleSourcing cursor"
              @click="gotoSingle"
              v-if="isSingle"
            >
              Single Sourcing
            </div>
          </div>
        </div>
        <div class="rsTop page-top">
          <div class="rsTop-left">
            <div
              class="rsTop-left-item"
              v-for="(item, index) in leftTitle"
              :key="index"
            >
              <div class="rsTop-left-item-title">
                <p>{{ item.name }}{{ item.enName }}:</p>
              </div>
              <div class="rsTop-left-item-value">
                <p
                  class="value"
                  :title="
                    basicData[item.props] + (item.props == 'lifeTime'
                      ? basicData[item.props] && 'WK'
                      : '')
                  "
                >
                  {{ basicData[item.props] }}
                  {{
                    item.props == "lifeTime"
                      ? basicData[item.props] && "WK"
                      : ""
                  }}
                </p>
              </div>
            </div>
          </div>
          <div class="rsTop-right">
            <div
              v-for="(item, index) in rightTitle"
              :key="index"
              class="rsTop-right-item"
            >
              <template v-if="Array.isArray(item)">
                <div class="rsTop-right-item-title">
                  <div v-for="(subItem, subIndex) in item" :key="subIndex">
                    {{ subItem.name }} {{ subItem.enName }}
                    <br v-if="subIndex < item.length - 1" />
                  </div>
                </div>
                <div class="rsTop-right-item-value">
                  <div v-for="(subItem, subIndex) in item" :key="subIndex">
                    {{
                      subItem.props === "currency"
                        ? basicData.currencyMap &&
                          basicData.currencyMap[basicData.currency]
                          ? basicData.currencyMap[basicData.currency].code
                          : basicData.currency
                        : basicData[subItem.props]
                    }}<br v-if="subIndex < item.length - 1" />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="rsTop-right-item-title">
                  {{ item.name }} {{ item.enName }}:
                </div>
                <div
                  class="rsTop-right-item-value"
                  v-if="item.props == 'suppliersNow'"
                >
                  <div
                    v-for="(item, index) in basicData[item.props]"
                    :key="index"
                  >
                    <el-tooltip
                      :content="`${item.shortNameZh}/${item.shortNameEn}`"
                      placement="top"
                      effect="light"
                    >
                      <div
                        style="
                          overflow: hidden;
                          text-overflow: ellipsis;
                          width: 100%;
                        "
                      >
                        <span style="white-space: nowrap"
                          >{{ item.shortNameZh }}/</span
                        >
                        <span style="white-space: nowrap">{{
                          item.shortNameEn
                        }}</span
                        ><br />
                      </div>
                    </el-tooltip>
                  </div>
                </div>
                <div class="rsTop-right-item-value" v-else>
                  <span
                    v-if="item.props == 'mtz' || item.props == 'isApportion'"
                    style="word-wrap: break-word"
                    >{{ basicData[item.props] | booleanFilter }}</span
                  >
                  <span
                    v-else-if="
                      item.props == 'plannedInvest' || item.props == 'setPrice'
                    "
                    style="word-wrap: break-word"
                    >{{ basicData[item.props] | toThousands(true) }}</span
                  >
                  <span
                    v-else
                    v-html="basicData[item.props]"
                    style="word-wrap: break-word"
                  ></span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div
        class="rsCard-content"
        ref="body-table"
      >
        <div class="rsCard">
          <tableList
            height="100%"
            v-update
            :selection="false"
            indexKey
            :tableLoading="tableLoading"
            :tableTitle="tableTitle"
            :tableData="tableData"
            class="rsTable table"
            :cell-class-name="cellClass"
            @onScroll="onScroll"
            border
          >
            <template #fsnrGsnrNum="scope">
              <div>
                <p>{{ scope.row.fsnrGsnrNum }}</p>
                <p>
                  {{
                    scope.row.purchasingFactoryShortName
                      ? `(${scope.row.purchasingFactoryShortName})`
                      : ""
                  }}
                </p>
              </div>
            </template>

            <!-- 供应商 -->
            <template #supplierName="scope">
              <span>{{ scope.row.supplierName }}</span>
              <br />
              <span>{{ scope.row.supplierNameEn }}</span>
            </template>
            <!-- 年降 -->
            <template #ltc="scope">
              <span>{{ resetLtcData(scope.row.ltcs, "ltc") }}</span>
            </template>

            <!-- 年降开始时间 -->
            <template #beginYearReduce="scope">
              <span>{{ resetLtcData(scope.row.ltcs, "beginYearReduce") }}</span>
            </template>

            <template #status="scope">
              <div v-if="scope.row.status === 'SKDLC'">
                <p>SKD</p>
                <p>LC</p>
              </div>
              <span v-else>{{ scope.row.status }}</span>
            </template>

            <template #svwCode="scope">
              <span>{{ scope.row.svwCode || scope.row.svwTempCode }}</span>
            </template>
            <template #presentPrice="scope">
              <span>{{ scope.row.presentPrice | toThousands }}</span>
            </template>

            <template #cfTargetAPrice="scope">
              <el-popover
                placement="top-start"
                trigger="hover"
                :disabled="!scope.row.selAPrice"
              >
                <div>
                  <div>
                    {{ language("零件目标价A价", "零件目标价A价") }}：{{
                      (scope.row.partTargetAPrice || "0.00") | toThousands(true)
                    }}
                  </div>
                  <div>
                    {{ language("SEL目标价A价", "SEL目标价A价") }}：{{
                      (scope.row.selAPrice || "0.00") | toThousands(true)
                    }}
                  </div>
                </div>
                <div slot="reference">
                  <p>
                    <span v-if="+scope.row.selAPrice" style="color: red"
                      >*</span
                    >
                    <template v-if="scope.row.cfApplyType === 'SKDLC'">
                      <p>
                        {{ scope.row.cfTargetSkdAPrice | toThousands(true) }}
                      </p>
                      <p>{{ scope.row.cfTargetAPrice | toThousands(true) }}</p>
                    </template>
                    <span v-else-if="scope.row.cfApplyType === 'SKD'">{{
                      scope.row.cfTargetSkdAPrice | toThousands(true)
                    }}</span>
                    <span v-else>{{
                      scope.row.cfTargetAPrice | toThousands(true)
                    }}</span>
                  </p>
                </div>
              </el-popover>
            </template>

            <template #cfTargetBPrice="scope">
              <div v-if="scope.row.cfApplyType === 'SKDLC'">
                <p>{{ scope.row.cfTargetSkdBPrice | toThousands }}</p>
                <p>{{ scope.row.cfTargetBPrice | toThousands }}</p>
              </div>
              <span v-else-if="scope.row.cfApplyType === 'SKD'">{{
                scope.row.cfTargetSkdBPrice | toThousands
              }}</span>
              <span v-else>{{ scope.row.cfTargetBPrice | toThousands }}</span>
            </template>

            <template #aprice="scope">
              <div v-if="scope.row.status === 'SKDLC'">
                <p>{{ scope.row.skdAPrice | toThousands }}</p>
                <p>{{ scope.row.aprice | toThousands }}</p>
              </div>
              <span v-else-if="scope.row.status === 'SKD'">{{
                scope.row.skdAPrice | toThousands
              }}</span>
              <span v-else>{{ scope.row.aprice | toThousands }}</span>
            </template>
            <template #bprice="scope">
              <div v-if="scope.row.status === 'SKDLC'">
                <p>{{ scope.row.skdBPrice | toThousands }}</p>
                <p>{{ scope.row.bprice | toThousands }}</p>
              </div>
              <span v-else-if="scope.row.status === 'SKD'">{{
                scope.row.skdBPrice | toThousands
              }}</span>
              <span v-else>{{ scope.row.bprice | toThousands }}</span>
            </template>

            <template #investFee="scope">
              <div v-if="scope.row.status === 'SKDLC'">
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  :disabled="!scope.row.investFeeIsShared"
                >
                  <div>
                    <div>
                      {{ language("FENTANJINE", "分摊金额") }}：{{
                        scope.row.moldApportionPrice ||
                        "0.00" | thousandsFilter(0)
                      }}
                    </div>
                    <div>
                      {{ language("WEIFENTANJINE", "未分摊金额") }}：{{
                        scope.row.unShareInvestPrice ||
                        "0.00" | thousandsFilter(0)
                      }}
                    </div>
                  </div>
                  <div slot="reference">
                    <p>{{ scope.row.skdInvestFee | thousandsFilter(0) }}</p>
                    <p>
                      <span
                        v-if="scope.row.investFeeIsShared"
                        style="color: red"
                        >*</span
                      >
                      <span>{{
                        scope.row.investFee | thousandsFilter(0)
                      }}</span>
                    </p>
                  </div>
                </el-popover>
              </div>
              <span v-else-if="scope.row.status === 'SKD'">
                <p>{{ scope.row.skdInvestFee | thousandsFilter(0) }}</p>
              </span>
              <span v-else>
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  :disabled="!scope.row.investFeeIsShared"
                >
                  <div>
                    <div>
                      {{ language("FENTANJINE", "分摊金额") }}：{{
                        scope.row.moldApportionPrice ||
                        "0.00" | thousandsFilter(0)
                      }}
                    </div>
                    <div>
                      {{ language("WEIFENTANJINE", "未分摊金额") }}：{{
                        scope.row.unShareInvestPrice ||
                        "0.00" | thousandsFilter(0)
                      }}
                    </div>
                  </div>
                  <div slot="reference">
                    <span v-if="scope.row.investFeeIsShared" style="color: red"
                      >*</span
                    >
                    <span>{{ scope.row.investFee | thousandsFilter(0) }}</span>
                  </div>
                </el-popover>
              </span>
            </template>

            <template #devFee="scope">
              <div v-if="scope.row.status === 'SKDLC'">
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  :disabled="!scope.row.devFeeIsShared"
                >
                  <div>
                    <div>
                      {{ language("FENTANJINE", "分摊金额") }}：{{
                        scope.row.developApportionPrice ||
                        "0" | thousandsFilter(0)
                      }}
                    </div>
                    <div>
                      {{ language("WEIFENTANJINE", "未分摊金额") }}：{{
                        scope.row.unShareDevPrice || "0" | thousandsFilter(0)
                      }}
                    </div>
                  </div>
                  <div slot="reference">
                    <p>{{ scope.row.skdDevFee | thousandsFilter(0) }}</p>
                    <p>
                      <span
                        v-if="scope.row.investFeeIsShared"
                        style="color: red"
                        >*</span
                      >
                      <span>{{ scope.row.devFee | thousandsFilter(0) }}</span>
                    </p>
                  </div>
                </el-popover>
              </div>
              <span v-else-if="scope.row.status === 'SKD'">
                <p>{{ scope.row.skdDevFee | toThousands }}</p>
              </span>
              <span v-else>
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  :disabled="!scope.row.devFeeIsShared"
                >
                  <div>
                    <div>
                      {{ language("FENTANJINE", "分摊金额") }}：{{
                        scope.row.developApportionPrice ||
                        "0" | thousandsFilter(0)
                      }}
                    </div>
                    <div>
                      {{ language("WEIFENTANJINE", "未分摊金额") }}：{{
                        scope.row.unShareDevPrice || "0" | thousandsFilter(0)
                      }}
                    </div>
                  </div>
                  <div slot="reference">
                    <span v-if="scope.row.devFeeIsShared" style="color: red"
                      >*</span
                    >
                    <span>{{ scope.row.devFee | thousandsFilter(0) }}</span>
                  </div>
                </el-popover>
              </span>
            </template>
            <template #addFee="scope">
              <span>{{ scope.row.addFee | toThousands }}</span>
            </template>
            <template #savingFee="scope">
              <span>{{ scope.row.savingFee | toThousands }}</span>
            </template>
            <template #turnover="scope">
              <span>{{ scope.row.turnover | thousandsFilter(0) }}</span>
            </template>

            <template #share="scope">
              <span>{{ +scope.row.share || 0 }}</span>
            </template>
            <div slot="append">
              <div class="out-compute">
                <span style="color: red">*</span><span>代表投资费已分摊</span>
                <div class="beizhu margin-top10">
                  备注 Remarks:
                  <div class="beizhu-value">
                    <p
                      v-for="(item, index) in remarkItem"
                      :key="index"
                      v-html="remarkProcess(item && item.value)"
                    ></p>
                  </div>
                </div>
                <div
                  v-if="
                    projectType === partProjTypes.DBLINGJIAN ||
                    projectType === partProjTypes.DBYICHIXINGCAIGOU
                  "
                  style="text-align: right"
                >
                  汇率：Exchange rate:
                  <span
                    class="exchangeRageCurrency"
                    v-for="item in exchangeRageCurrency"
                    :key="item"
                  >
                    1{{
                      basicData.currencyMap && basicData.currencyMap[item]
                        ? basicData.currencyMap[item].code
                        : item
                    }}={{ basicData.currencyRateMap[item]
                    }}{{
                      basicData.currencyMap.RMB
                        ? basicData.currencyMap.RMB.code
                        : "RMB"
                    }}
                  </span>
                </div>
                <div v-else>
                  <div class="margin-top10">
                    <template v-if="basicData.currency == 'RMB'">
                      Exchange rate: 1RMB=1RMB
                    </template>
                    <template v-else>
                      <p
                        v-for="(exchangeRate, index) in exchangeRates"
                        :key="index"
                      >
                        Exchange rate{{
                          exchangeRate.fsNumsStr ? ` ${index + 1}` : ""
                        }}: {{ exchangeRate.str
                        }}{{
                          exchangeRate.fsNumsStr
                            ? `（${exchangeRate.fsNumsStr}）`
                            : ""
                        }}
                      </p>
                    </template>
                  </div>
                </div>
              </div>
              <div
                v-if="!showSignatureForm && !isAuth"
                class="checkDate Application margin-top10"
              >
                <p class="application-date">
                  {{
                    `Application Date：${dateFilter(processApplyDate, "YYYY-MM-DD")}`
                  }}
                </p>
                <div class="checkList">
                  <div
                    class="checkList-item"
                    v-for="(item, index) in checkList"
                    :key="index"
                  >
                    <icon
                      v-if="item.approveStatus === true"
                      symbol
                      name="iconrs-wancheng"
                    ></icon>
                    <icon
                      v-else-if="item.approveStatus === false"
                      symbol
                      name="iconrs-quxiao"
                    ></icon>
                    <div v-else class="">-</div>
                    <div class="checkList-item-info">
                      <span>Dept.:</span>
                      <span class="checkList-item-info-depart">{{
                        item.approveDeptNumName
                      }}</span>
                    </div>
                    <div class="checkList-item-info">
                      <span>Date:</span>
                      <span>{{ dateFilter(item.approveDate, "YYYY-MM-DD") }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                title="Prototype Cost List"
                class="margin-top20"
                v-if="!showSignatureForm && PrototypeList.length > 5"
              >
                <el-table :data="PrototypeList" class="prototypeList">
                  <template v-for="(items, index) in prototypeTitleList">
                    <el-table-column
                      :key="index"
                      :prop="items.props"
                      align="center"
                      :label="language(items.i18nKey, items.i18nName)"
                    ></el-table-column>
                  </template>
                </el-table>
              </div>
            </div>
          </tableList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { iCard, iButton, iInput, icon, iMessage } from "rise";
import {
  nomalDetailTitle,
  nomalDetailTitleGS,
  nomalDetailTitlePF,
  nomalDetailTitleBlue,
  nomalTableTitle,
  meetingRemark,
  checkList,
  gsDetailTitleBlue,
  gsTableTitle,
  sparePartTableTitle,
  accessoryTableTitle,
  prototypeTitleList,
  dbTableTitle,
  resetLtcData,
  remarkProcess,
  leftTitle,
  rightTitle,
  RSTableTitle,
} from "./data";
import tableList from "../tableList";
import {
  getList,
  getRemark,
  updateRemark,
  getPrototypeList,
  getDepartApproval,
  searchRsPageExchangeRate,
  reviewListRs,
} from "@/api/designate/decisiondata/rs";
import { partProjTypes } from "@/config";
import { findFrontPageSeat, decisionDownloadPdfLogo } from "@/api/designate";
import { toThousands } from "@/utils";
import filters from "@/utils/filters";
import { transverseDownloadPDF } from "@/utils/pdf";
import rsPdf from "./rsPdf";
import { dateFilter } from "../circulation/data";

export default {
  mixins: [filters],
  props: {
    nominateId: { type: String },
    showSignatureForm: { type: Boolean, default: false },
  },
  components: { iCard, tableList, iButton, iInput, icon, rsPdf },
  data() {
    return {
      // 零件项目类型
      partProjTypes,
      remarks: {},
      leftTitle,
      rightTitle,
      // leftTitle: nomalDetailTitle,
      // rightTitle: nomalDetailTitleBlue,
      // tableTitle: RSTableTitle,
      tableData: [],
      basicData: {},
      remarkItem: [],
      checkList: checkList,
      resetRemarkType: "",
      saveLoading: false,
      PrototypeList: [],
      prototypeTitleList: prototypeTitleList,
      processApplyDate: "",
      projectType: "",
      isSingle: false,
      suppliers: "",
      exchangeRates: [],
      isAuth: false,
      pdfData: {},
      firstCount: 0,
      count: 0,
      fileList: [],
      tableLoading: false,
      // otherTableHeight:0,
      prototypeListPageHeight: 0,
      tableHeight: 0,
      otherPageHeight: 0,
      hasLastPage: false,
      tableList: [],
      prototypeTableList: [],
      remarkList: [],
      residualRemark: [],
      showpdf: true,
      html: "",
      scrollLeft:null
    };
  },
  filters: {
    toThousands,
    booleanFilter(val) {
      const obj = {
        true: "Y",
        false: "N",
      };

      return obj[val] || val;
    },
    // kFilter(val) {
    //   if (val) return math.divide(math.bignumber(val), 1000).toString()
    //   return val
    // }
  },
  computed: {
    exchangeRageCurrency() {
      if (this.basicData.currencyRateMap) {
        const exchangeRageCurrency = [];
        for (var key in this.basicData.currencyRateMap) {
          if (key) {
            exchangeRageCurrency.push(key);
          }
        }
        return exchangeRageCurrency;
      }
      return [];
    },
    // leftTitle() {
    //   // GS
    //   if (
    //     [partProjTypes.GSLINGJIAN, partProjTypes.GSCOMMONSOURCING].includes(
    //       this.projectType
    //     )
    //   ) {
    //     return nomalDetailTitleGS;
    //   }
    //   // 配附件
    //   if (
    //     [partProjTypes.PEIJIAN, partProjTypes.FUJIAN].includes(this.projectType)
    //   ) {
    //     return nomalDetailTitlePF;
    //   }
    //   // 其他
    //   return nomalDetailTitle;
    // },
    // rightTitle() {
    //   // GS
    //   if (
    //     [partProjTypes.GSLINGJIAN, partProjTypes.GSCOMMONSOURCING].includes(
    //       this.projectType
    //     )
    //   ) {
    //     return nomalDetailTitleBlue;
    //   }
    //   // 其他
    //   return gsDetailTitleBlue;
    // },
    tableTitle() {
      if (this.projectType === partProjTypes.PEIJIAN) {
        console.log("PEIJIAN");
        return sparePartTableTitle;
      } else if (this.projectType === partProjTypes.FUJIAN) {
        console.log("FUJIAN");

        return accessoryTableTitle;
      } else if (
        this.projectType === partProjTypes.GSLINGJIAN ||
        this.projectType === partProjTypes.GSCOMMONSOURCING
      ) {
        //GS零件
        return gsTableTitle;
      } else if (
        this.projectType === partProjTypes.DBLINGJIAN ||
        this.projectType === partProjTypes.DBYICHIXINGCAIGOU
      ) {
        console.log("DBLINGJIAN");

        //DB零件,DB一次性采购
        return dbTableTitle;
      }
      console.log("nomalTableTitle");

      return nomalTableTitle;
    },
    pageWidth() {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return 1441;
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return 1351;
      } else if (
        this.projectType === partProjTypes.GSLINGJIAN ||
        this.projectType === partProjTypes.GSCOMMONSOURCING
      ) {
        //GS零件
        return 1892;
      } else if (
        this.projectType === partProjTypes.DBLINGJIAN ||
        this.projectType === partProjTypes.DBYICHIXINGCAIGOU
      ) {
        //DB零件,DB一次性采购
        return 1768;
      }
      return 1544;
    },
    pageHeight() {
      return (this.pageWidth / 841.89) * 595.28; // 横版A4一页对应的高度
    },
    cardTitle() {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return "配件采购";
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return "附件采购";
      }
      return "生产采购";
    },
    cardTitleEn() {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return "CSC Nomination Recommendation - Spare Part Purchasing";
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return "CSC Nomination Recommendation – Accessory Purchasing";
      }
      return "CSC Nomination Recommendation - Production Purchasing";
    },
    getRemarkAll() {
      let result = [];
      for (let i = 0; i < this.remarkItem.length; i++) {
        const item = this.remarkItem[i];
        result.push(item.value);
      }
      return result.join("\n").split("\n");
    },
    isApproval() {
      return this.$route.query.isApproval === "true";
    },
    userName() {
      return this.$i18n.locale === "zh"
        ? this.$store.state.permission.userInfo.nameZh
        : this.$store.state.permission.userInfo.nameEn;
    },
    // hasTitle(){
    //   return this.$slots.tabTitle && 116 || 0
    // }
  },
  watch: {
    // scrollLeft(val){
    //   this.$refs['header-table'].$refs.multipleTable.bodyWrapper.scrollLeft = val
    // },
    projectType(val){
      if(
        val === partProjTypes.GSLINGJIAN ||
        val === partProjTypes.GSCOMMONSOURCING
      ){
        console.log(val);
        this.basicData.project = 'GS Project'
      }
    }
  },
  created() {
    this.isAuth = this.$route.query.type === "auth";
    // this.getPrototypeList()
  },
  methods: {
    onScroll(data){
      this.scrollLeft = data.scrollLeft
    },
    remarkProcess,
    dateFilter,
    getIsSingle() {
      findFrontPageSeat({ nominateId: this.nominateId }).then((res) => {
        if (res.result) {
          this.isSingle = res.data.isSingle;
        } else {
          this.isSingle = false;
        }
      });
    },
    /**
     * @Description: 获取部门审批记录
     * @Author: Luoshuang
     * @param n*o
     * @return n*o
     */
    getDepartApproval() {
      getDepartApproval(this.nominateId).then((res) => {
        if (res?.result) {
          this.checkList = res.data.nomiApprovalProcessNodeVOList;
          this.processApplyDate = res.data.processApplyDate || "";
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res?.desZh : res?.desEn);
        }
      });
    },
    /**
     * @description: US 描述当大于5条的时候则需要显示这个card 不管任何零件采购项目。任何linie
     * @param {*}
     * @return {*}
     */
    getPrototypeList() {
      getPrototypeList(this.nominateId)
        .then((res) => {
          this.PrototypeList =
            res.data.list || res.data.getQuotationSampleVOList || [];
          // 获取上会备注
          if (res.data && res.code == 200) {
            this.remarkItem = meetingRemark.map((item) => {
              this.remarks[item.type] = res.data[item.remarkType] || "";
              return { ...item, value: res.data[item.remarkType] || "" };
            });
          }
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => {
          this.$nextTick(() => {
          });
        });
    },
    /**
     * @Description: 保存备注
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    handleSaveRemarks() {
      this.saveLoading = true;
      const params = {
        meetRemark: this.remarks[this.resetRemarkType],
        nominateAppId: this.nominateId,
        remarkType: this.resetRemarkType,
      };
      updateRemark(params)
        .then((res) => {
          if (res?.result) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
            // this.getRemark()
            // this.getPrototypeList()
            this.init();
            this.$store.dispatch("sourcing/updatePdfPage");
          } else {
            iMessage.error(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
          }
        })
        .finally(() => {
          this.saveLoading = false;
        });
    },
    /**
     * @Description: 备注变化时保存当前修改的备注类型
     * @Author: Luoshuang
     * @param {*} val
     * @param {*} type
     * @return {*}
     */
    handleInput(val, type) {
      this.remarkItem = this.remarkItem.map((item) => {
        return {
          ...item,
          value: item.type === type ? val : item.value,
        };
      });
      this.remarks[type] = val;
      this.resetRemarkType = type;
    },
    /**
     * @Description: 页面初始化
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    init() {
      // 带路由参数type=auth,表示从外部嵌入走预览模式，走reviewListRs，ab 有权限
      if (this.isAuth || this.isApproval) {
        this.reviewListRs();
      } else {
        this.getTopList();
      }
      this.getRemark();
      this.getDepartApproval();
      this.getPrototypeList();
      this.getIsSingle();
    },
    // 表格背景色
    cellClass({ row, column, rowIndex, columnIndex }) {
      if (
        [
          "supplierName",
          "cfTargetAPrice",
          "cfTargetBPrice",
          "aprice",
          "bprice",
          "investFee",
          "devFee",
          "turnover",
        ].includes(column.property)
      ) {
        return "bg-yellow";
      }
    },
    /**
     * @Description: 获取表格初始数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    getTopList() {
      this.tableLoading = true;
      this.searchRsPageExchangeRate();
      getList(this.nominateId)
        .then((res) => {
          if (res?.result) {
            let temdata = res.data || {};
            temdata.suppliersNow = temdata.supplierVoList;
            if (temdata.partNameDe) {
              temdata.partName = `${temdata.partName}/${temdata.partNameDe}`;
            }
            this.basicData = temdata;
            let data = Array.isArray(res.data?.lines) ? res.data.lines : [];
            data.forEach((val, index) => {
              let suppliersNowCn = [];
              let suppliersNowEn = [];

              const supplierVoList = Array.isArray(val.supplierVoList)
                ? val.supplierVoList
                : [];

              supplierVoList.forEach((val) => {
                suppliersNowCn.push(val.shortNameZh);
                suppliersNowEn.push(val.shortNameEn);
              });
              let supplierData = [];
              for (let i = 0; i < suppliersNowCn.length; i++) {
                let dataSuper = `${suppliersNowCn[i]}/${suppliersNowEn[i]}`;
                supplierData.push(dataSuper);
              }
              supplierData = supplierData.length
                ? supplierData.join("\n")
                : "-";
              val.suppliersNow = supplierData.replace(/\n/g, "<br/>");
              // if (val.supplierNameEn)
              //   val.supplierName = `${val.supplierName}/${val.supplierNameEn}`;
              if (val.partNameDe)
                // val.partName = `${val.partName}/${val.partNameDe}`
                val.partName = val.partNameDe;
            });
            this.tableData = data;
            this.projectType = this.basicData.partProjectType || "";
          } else {
            this.basicData = {};
            this.tableData = [];
            this.projectType = "";
            iMessage.error(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
          }
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    /**
     * @Description: 获取备注
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    getRemark() {
      getRemark(this.nominateId)
        .then((res) => {
          if (res?.result) {
            const data = Array.isArray(res.data) ? res.data : [];
            data.forEach((element) => {
              this.remarks[element.remarkType] = element.remark || "";
              this.remarkItem = meetingRemark.map((item) => {
                return { ...item, value: this.remarks[item.remarkType] };
              });
            });
          } else {
            this.remarks = {};
            iMessage.error(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
          }
        })
    },

    resetLtcData,

    // 获取汇率
    searchRsPageExchangeRate() {
      let id = this.$route.query.desinateId
        ? this.$route.query.desinateId
        : this.nominateId;
      searchRsPageExchangeRate(id).then((res) => {
        if (res.code == 200) {
          if (this.basicData.currency) {
            const sourceData = Array.isArray(res.data) ? res.data : [];

            this.exchangeRates = sourceData
              .filter((item) => !item.isCurrentVersion)
              .filter(
                (item) =>
                  Array.isArray(item.exchangeRateVos) &&
                  item.exchangeRateVos.length
              );

            this.exchangeRates = this.exchangeRates.map((item) => {
              const result = { version: item.exchangeRateVos[0].version };

              result.str = item.exchangeRateVos
                .map((item) => this.exchangeRateProcess(item))
                .join(",");

              if (this.exchangeRates.length > 1) {
                result.fsNumsStr = Array.isArray(item.fsNums)
                  ? item.fsNums.join("、")
                  : "";
              } else {
                result.fsNumsStr = "";
              }

              return result;
            });
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      });
    },

    // 汇率显示处理
    exchangeRateProcess(row) {
      return `1${row.originCurrencyCode}=${row.foreignCurrency2Rmb}${row.currencyCode}`;
    },
    // 权限获取数据
    reviewListRs() {
      this.tableLoading = true;
      this.searchRsPageExchangeRate();
      reviewListRs(this.$route.query.desinateId)
        .then((res) => {
          if (res.code == 200) {
            let temdata = res.data || {};
            temdata.suppliersNow = temdata.supplierVoList;
            if (temdata.partNameDe) {
              temdata.partName = `${temdata.partName}/${temdata.partNameDe}`;
            }
            this.basicData = temdata;
            let data = Array.isArray(res.data.lines) ? res.data.lines : [];
            data.forEach((val, index) => {
              let suppliersNowCn = [];
              let suppliersNowEn = [];
              const supplierVoList = Array.isArray(val.supplierVoList)
                ? val.supplierVoList
                : [];

              supplierVoList.forEach((val) => {
                suppliersNowCn.push(val.shortNameZh);
                suppliersNowEn.push(val.shortNameEn);
              });
              let supplierData = [];
              for (let i = 0; i < suppliersNowCn.length; i++) {
                let dataSuper = `${suppliersNowCn[i]}/${suppliersNowEn[i]}`;
                supplierData.push(dataSuper);
              }
              supplierData = supplierData.length
                ? supplierData.join("\n")
                : "-";
              val.suppliersNow = supplierData.replace(/\n/g, "<br/>");
              if (val.partNameDe)
                val.partName = val.partNameDe;
            });
            this.tableData = data;
            this.projectType = this.basicData.partProjectType || "";
          } else {
            this.basicData = {};
            this.tableData = [];
            this.projectType = "";
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    // 调整 Single Sourcing
    gotoSingle() {
      const { query } = this.$route;
      let routeUrl = this.$router.resolve({
        path: "/designate/designateCirculateSingleSourcing",
        query:{
          ...query,
          desinateId: this.nominateId
        },
      });
      window.open(routeUrl.href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.rs-content {
  display: flex;
  flex-flow: column;
  height: 100%;
}
.meeting {
  height: 100%;
  .page-flex {
    .page-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      ::v-deep .title {
        font-size: 18px !important;
        font-weight: 700;
      }

      .control {
        display: flex !important;
        align-items: center !important;

        .nomiId {
          font-size: 16px;
          font-weight: 600;
        }
      }

      .singleSourcing {
        margin-left: 20px;
        padding: 8px 12px;
        font-size: 15px;
        font-weight: 400;
        color: rgba(22, 96, 241, 1);
        border: 1px dashed #67C23A;
      }
    }
    .header-table-box{
      overflow: hidden;
    }
    .header-table {
      pointer-events: none;
      .el-table__body-wrapper{
        visibility: hidden;
      }
    }
  }
  .rsCard-content {
    flex: 1;
    overflow: auto;
    height: 100%;
    ::v-deep .el-table{
        border-left: 0;
        &::after{
          content: unset;
        }
      .el-table__body-wrapper{
        overflow-y: auto;
        border-left: 0;
        .el-table__body{
          position: relative;
          &::before{
            content: '';
            top: 0;
            left: 0;
            width: 0.0625rem;
            height: 100%;
            position: absolute;
            z-index: 9;
            background: #d9d9d9;
          }
        }
      }
    }
  }
  .rsCard {
    height: 100%;
    .page-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      ::v-deep .title {
        font-size: 18px !important;
        font-weight: 700;
      }
    }
    .control {
      display: flex !important;
      align-items: center !important;

      .nomiId {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
}

.exchangeRageCurrency + .exchangeRageCurrency {
  margin-left: 20px;
}
.singleSourcing {
  margin-left: 20px;
  padding: 8px 12px;
  font-size: 15px;
  font-weight: 400;
  color: rgba(22, 96, 241, 1);
  border: 1px dashed #67C23A;
}
.rsTable {
  font-size: 16px !important;
  &::before {
    height: 0;
  }
  ::v-deep .el-table__header {
    background-color: #364d6e;
  }
  ::v-deep thead th {
    padding-top: 8px;
    padding-bottom: 8px;
    & > .cell {
      padding-left: 1px;
      padding-right: 1px;
      line-height: unset;
      font-size: 14px;
      p {
        min-height: 16px;
      }
    }
  }

  ::v-deep tr {
    &:nth-child(even) {
      background-color: #f7f7ff;
    }
  }

  ::v-deep .el-table__row td {
    &.bg-yellow {
      background: #fef7e7;
    }
    .cell {
      padding-left: 1px;
      padding-right: 1px;
      line-height: unset;
    }
  }
}
.prototypeList {
  ::v-deep tr {
    &:nth-child(even) {
      background-color: #f7f7ff;
    }
  }
}
.mainTable {
  ::v-deep .el-table__row {
    td {
      border-top: 1px solid #ccc;
    }
  }
}
.rsTop {
  display: flex;
  // .rsTop-left-item-title {
  //   white-space: pre-line;
  // }
  &-left {
    width: 60%;
    display: flex;
    flex-wrap: wrap;
    &-item {
      font-size: 14px;
      display: flex;
      &-title {
        font-weight: bold;
      }
      &-value {
        flex: 1;
        overflow: hidden;
        .value {
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      &:nth-of-type(2n) {
        width: 50%;
        .rsTop-left-item-title {
          width: 220px;
        }
      }
      &:nth-of-type(2n-1) {
        width: 50%;
        .rsTop-left-item-title {
          width: 220px;
        }
      }
      // &:nth-of-type(3n) {
      //   width: 33%;
      //   .rsTop-left-item-title {
      //     width: 220px;
      //   }
      // }
      // &:nth-of-type(3n-1) {
      //   width: 27%;
      //   .rsTop-left-item-title {
      //     width: 140px;
      //   }
      // }
      // &:nth-of-type(3n-2) {
      //   width: 40%;
      //   .rsTop-left-item-title {
      //     width: 200px;
      //   }
      // }
    }
  }
  &-right {
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid rgba(197, 204, 214, 0.42);
    border-bottom: 0;
    border-radius: 5px 5px 0 0;
    &-item {
      width: 55%;
      display: flex;
      font-size: 14px;
      border-bottom: 1px solid rgba(197, 204, 214, 0.42);
      &:nth-of-type(odd) {
        width: 45%;
        border-right: 1px solid rgba(197, 204, 214, 0.42);
      }
      &-title {
        background-color: #364d6e;
        border-right: 1px solid rgba(197, 204, 214, 0.42);
        padding: 6px 6px;
        width: 60%;
        color: #fff;
        font-weight: bold;
        // line-height: 29px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      &-value {
        width: 40%;
        padding: 6px 6px;
        // line-height: 29px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      &:nth-of-type(even) {
        .rsTop-right-item-title {
          width: 50%;
        }
        .rsTop-right-item-value {
          width: 50%;
        }
      }
    }
  }
}
.out-compute {
  font-size: 16px;
}
.beizhu {
  display: flex;
  &-value {
    font-weight: 500;
    margin-left: 20px;
    p {
      word-break: break-word;
    }
  }
}
.meetingRemark {
  display: flex;

  &-item {
    flex: 1;
    & + & {
      margin-left: 24px;
    }
    &-title {
      font-size: 16px;
      color: rgba(44, 46, 51, 1);
      font-weight: 400;
    }
  }
}
.checkList {
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  &-item {
    flex-shrink: 0;
    width: 224px;
    height: 125px;
    max-width: 224px;
    border-radius: 15px;
    background-color: rgba(22, 96, 241, 0.03);
    margin: 5px 20px 5px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 30px 22px;
    font-size: 16px;
    color: rgba(65, 67, 74, 1);
    &-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      &-depart {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
.checkDate {
  .application-date{
    font-size: 16px;
  }
}

.isPreview {
  .card {
    box-shadow: none;
  }
}

.rsPdfWrapper,
.demo {
  // 放在顶部, 便于计算高度
  width: 100%;
  height: 0;
  overflow: hidden;
  position: relative;
  top: 0;
}
.page-logo {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  border-top: 1px solid #666;
}
</style>
