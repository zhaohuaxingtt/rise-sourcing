<template>
  <div class="brief">
    <iCard
      collapse
      :defalutCollVal="false"
      CSC
      class="brief-card"
      :title="`CSC定点推荐 - ${cardTitle} ${cardTitleEn}`"
    >
      <template #header-control>
        <div class="control">
          <div class="nomiId">
            定点申请单号：{{
              $route.query.desinateId ? $route.query.desinateId : nominateId
            }}
            <div
              class="singleSourcing cursor margin-left20"
              v-if="isSingle"
              @click="gotoSingle"
            >
              Single Sourcing
            </div>
          </div>
        </div>
      </template>
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
              {{ basicData[item.props] }}
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

      <div class="remark">
        备注 Remarks:
        <div class="remark-value">
          <p
            v-for="(item, index) in remarkItem"
            :key="index"
            v-html="remarkProcess(item && item.value)"
          ></p>
        </div>
      </div>
    </iCard>
    <div style="padding-top: 100px">
      <tableList
        class="table"
        v-update
        :selection="false"
        indexKey
        :tableLoading="tableLoading"
        :tableTitle="briefTableTitle"
        :tableData="tableData"
        border
      >
        <!-- FS No. -->
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

        <!-- 零件信息 -->
        <template #partNo="scope">
          <span>{{ scope.row.partNo }}</span>
          <icon symbol v-if="scope.row.mtz" name="iconMTZ" />
          <br />
          <span>{{ scope.row.partName }}</span>
        </template>
        <!-- 供应商 -->
        <template #supplierName="scope">
          <span>{{ scope.row.supplierName }}</span>
          <br />
          <span>{{ scope.row.svwCode || scope.row.svwTempCode }}</span>
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
        <!-- 财务目标A/B价 -->
        <template #cfTargetAPrice="scope">
          <el-popover
            placement="top-start"
            trigger="hover"
            :disabled="!scope.row.selAPrice"
          >
            <div>
              <div>
                {{ language("零件目标价A价", "零件目标价A价") }}：{{
                  (scope.row.partTargetPrice || "0.00") | toThousands(true)
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
                <span v-if="+scope.row.selAPrice" style="color: red">*</span>
                <template v-if="scope.row.cfApplyType === 'SKDLC'">
                  <p>{{ scope.row.cfTargetSkdAPrice | toThousands(true) }}</p>
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
          <br />
          <div v-if="scope.row.cfApplyType === 'SKDLC'">
            <p>{{ scope.row.cfTargetSkdBPrice | toThousands }}</p>
            <p>{{ scope.row.cfTargetBPrice | toThousands }}</p>
          </div>
          <span v-else-if="scope.row.cfApplyType === 'SKD'">{{
            scope.row.cfTargetSkdBPrice | toThousands
          }}</span>
          <span v-else>{{ scope.row.cfTargetBPrice | toThousands }}</span>
        </template>
        <!-- A/B价 -->
        <template #aprice="scope">
          <div v-if="scope.row.status === 'SKDLC'">
            <p>{{ scope.row.skdAPrice | toThousands }}</p>
            <p>{{ scope.row.aprice | toThousands }}</p>
          </div>
          <span v-else-if="scope.row.status === 'SKD'">{{
            scope.row.skdAPrice | toThousands
          }}</span>
          <span v-else>{{ scope.row.aprice | toThousands }}</span>
          <br />

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
                    scope.row.moldApportionPrice || "0.00" | thousandsFilter(0)
                  }}
                </div>
                <div>
                  {{ language("WEIFENTANJINE", "未分摊金额") }}：{{
                    scope.row.unShareInvestPrice || "0.00" | thousandsFilter(0)
                  }}
                </div>
              </div>
              <div slot="reference">
                <p>{{ scope.row.skdInvestFee | thousandsFilter(0) }}</p>
                <p>
                  <span v-if="scope.row.investFeeIsShared" style="color: red"
                    >*</span
                  >
                  <span>{{ scope.row.investFee | thousandsFilter(0) }}</span>
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
                    scope.row.moldApportionPrice || "0.00" | thousandsFilter(0)
                  }}
                </div>
                <div>
                  {{ language("WEIFENTANJINE", "未分摊金额") }}：{{
                    scope.row.unShareInvestPrice || "0.00" | thousandsFilter(0)
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
                    scope.row.developApportionPrice || "0" | thousandsFilter(0)
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
                  <span v-if="scope.row.investFeeIsShared" style="color: red"
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
                    scope.row.developApportionPrice || "0" | thousandsFilter(0)
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
          <span>{{ scope.row.turnover | toThousands }}</span>
        </template>

        <template #share="scope">
          <span>{{ +scope.row.share || 0 }}</span>
        </template>
      </tableList>
      <iPagination
        class="margin-bottom20"
        @size-change="handleSizeChange($event, getListData)"
        @current-change="handleCurrentChange($event, getListData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
        v-update
      />
    </div>
  </div>
</template>

<script>
import { iCard, iPagination } from "rise";
import { partProjTypes } from "@/config";
import { toThousands } from "@/utils";
import { pageMixins } from "@/utils/pageMixins";
import { findFrontPageSeat } from "@/api/designate";
import tableList from "@/views/designate/designatedetail/components/tableList";
import {
  remarkProcess,
  resetLtcData,
  leftTitle,
  rightTitle,
  briefTableTitle,
} from "./data";
import { getRemark, reviewListRs } from "@/api/designate/decisiondata/rs";
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iPagination,
    tableList,
  },
  props: {
    nominateId: { type: String },
  },
  data() {
    return {
      partProjTypes,
      leftTitle,
      rightTitle,
      briefTableTitle,
      projectType: "",
      isSingle: false,
      tableLoading: false,
      basicData: {},
      tableData: [],
      remarkItem: [],
    };
  },
  computed: {
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
  },
  created() {
    this.getIsSingle();
    this.reviewListRs();
    this.getRemark();
  },
  methods: {
    remarkProcess,
    resetLtcData,
    getIsSingle() {
      findFrontPageSeat({ nominateId: this.nominateId }).then((res) => {
        if (res.result) {
          this.isSingle = res.data.isSingle;
        } else {
          this.isSingle = false;
        }
      });
    },

    // 权限获取数据
    reviewListRs() {
      this.tableLoading = true;
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
              if (val.supplierNameEn)
                val.supplierName = `${val.supplierName}/${val.supplierNameEn}`;
              if (val.partNameDe) val.partName = val.partNameDe;
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
    getRemark() {
      getRemark(this.nominateId).then((res) => {
        if (res?.result) {
          const data = Array.isArray(res.data) ? res.data : [];
          this.remarkItem = data.map((item) => {
            return { ...item, value: item.remark };
          });
        } else {
          this.remarkItem = [];
          iMessage.error(this.$i18n.locale === "zh" ? res?.desZh : res?.desEn);
        }
      });
    },
    // 调整 Single Sourcing
    gotoSingle() {
      const { query } = this.$route;
      let routeUrl = this.$router.resolve({
        path: "/designate/designateCirculateSingleSourcing",
        query,
      });
      window.open(routeUrl.href, "_blank");
    },
  },
  filters: {
    toThousands,
  },
};
</script>

<style lang="scss" scoped>
.brief {
  .brief-card {
    position: absolute;
    width: 100%;
    z-index: 99;
    background: #fff;
    box-shadow: 0 0 1.25rem rgb(27 29 33 / 8%);
    .control {
      display: flex !important;
      align-items: center !important;

      .nomiId {
        font-size: 16px;
        font-weight: 600;
      }
      .singleSourcing {
        display: inline-block;
        padding: 8px 12px;
        font-size: 15px;
        font-weight: 600;
        color: rgba(22, 96, 241, 1);
        border: 1px dashed #67C23A;
      }
    }

    .rsTop {
      display: flex;
      .rsTop-left-item-title {
        white-space: pre-line;
      }
      &-left {
        width: 65%;
        display: flex;
        flex-wrap: wrap;
        &-item {
          width: 33%;
          font-size: 12px;
          display: flex;
          &-title {
            font-weight: bold;
            width: 50%;
          }
          &-value {
            font-weight: 400;
            width: 50%;
          }
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
          border-bottom: 1px solid rgba(197, 204, 214, 0.42);
          &:nth-of-type(odd) {
            width: 45%;
            border-right: 1px solid rgba(197, 204, 214, 0.42);
          }
          &-title {
            background-color: #364d6e;
            border-right: 1px solid rgba(197, 204, 214, 0.42);
            padding: 6px 12px;
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
            padding: 6px 12px;
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

    .remark {
      background-color: rgba(22, 96, 241, 0.03);
      // height: 40px;
      padding: 12px 14px; /*no*/
      font-weight: bold;
      display: flex;
      &-value {
        font-weight: 400;
        margin-left: 20px;
        p {
          word-break: break-word;
        }
      }
    }
  }
  .table {
    ::v-deep .el-table__header {
      background-color: #364d6e;
    }
  }
}
</style>