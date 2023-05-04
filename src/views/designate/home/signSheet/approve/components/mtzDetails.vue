<!--
 * @Author: youyuan
 * @Date: 2021-10-28 16:45:22
 * @LastEditTime: 2023-04-28 17:12:06
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: mtz
 * @FilePath: \front-web\src\views\designate\home\signSheet\approve\components\mtzDetails.vue
-->
<template>
  <div style="padding-bottom: 30px; position: relative">
    <div style="position: relative">
      <div>
        <div class="headBox">
          <p class="headTitle">{{ title }}</p>
          <div class="tabs_box_right">
            <div class="big_text">
              <span class="samll_val"
                >{{ formData.mtzAppId }}-{{ formData.appName }}</span
              >
            </div>
            <div class="small_text">
              <span>Application date：</span>
              <span class="samll_val">{{ formData.createDate }}</span>
            </div>
            <div class="small_text">
              <span>Commodity：</span>
              <span class="samll_val">{{ formData.linieDeptName }}</span>
            </div>
            <div>
              <span>Buyer：</span>
              <span class="samll_val">{{ formData.linieNameEn }}</span>
            </div>
          </div>
        </div>
        <div class="mtz-content">
          <div>
            <el-divider class="hr_divider" />
            <div class="centerBox">
              <p>
                补差金额=零件结算数量
                <iTooltip :txtInfo="tipList[0]" :num="'1'"></iTooltip>
                *[原材料市场价<iTooltip
                  :txtInfo="tipList[1]"
                  :num="'2'"
                ></iTooltip>
                -原材料基价<iTooltip :txtInfo="tipList[2]" :num="'3'">
                </iTooltip>
                *(1+阈值<iTooltip :txtInfo="tipList[3]" :num="'4'"></iTooltip
                >*阈值系数<iTooltip :txtInfo="tipList[4]" :num="'5'"></iTooltip>
                )]*原材料用量
                <iTooltip :txtInfo="tipList[5]" :num="'6'"></iTooltip>
                *补差%<iTooltip :txtInfo="tipList[6]" :num="'7'"></iTooltip>
              </p>
              <p class="enStyle">
                <span
                  >MTZ Payment= Settle Accounts Quantity*[Effective Price-Base
                  Price(1+Threshold*Coefficient)]*Raw Material Weight*
                  Compensation%</span
                ><span>When: effective price > base price *(1+threshold)</span>
              </p>
            </div>

            <p class="tableTitle font20_b">
              {{ language("GUIZEQINGDAN", "规则清单") }}-Regulation
            </p>
          </div>
          <div class="margin-top20 formStyle">
            <tableList
              :tagNum="'1'"
              :tableData="ruleTableListData"
              :tableTitle="
                ruleTableListData.some((val) => {
                  if (val.materialCode.slice(1, 6) == '01006') {
                    return true;
                  }
                })
                  ? ruleTableTitle1_all
                  : ruleTableTitle1_1
              "
              :tableLoading="loadingRule"
              :header-row-class-name="'ruleTableHeader'"
              :index="true"
              :rowClassName="'table-row'"
              :selection="false"
              border
            >
              <template slot-scope="scope" slot="compensationPeriod">
                <span>{{
                  scope.row.compensationPeriod == "A"
                    ? "年度"
                    : scope.row.compensationPeriod == "H"
                    ? "半年度"
                    : scope.row.compensationPeriod == "Q"
                    ? "季度"
                    : scope.row.compensationPeriod == "M"
                    ? "月度"
                    : ""
                }}</span>
              </template>
              <template slot-scope="scope" slot="thresholdCompensationLogic">
                <span>{{
                  scope.row.thresholdCompensationLogic == "A"
                    ? "全额补差"
                    : scope.row.thresholdCompensationLogic == "B"
                    ? "超额补差"
                    : ""
                }}</span>
              </template>
              <template slot-scope="scope" slot="sapCode">
                <span>{{ scope.row.sapCode }}</span
                ><br />
                <iText>{{ scope.row.supplierName }}</iText>
              </template>
              <template slot-scope="scope" slot="materialCode">
                <span class="link" @click="openPageMarket(scope.row)">{{
                  scope.row.materialCode
                }}</span
                ><br />
                <span class="link" @click="openPageMarket(scope.row)">{{
                  scope.row.materialName
                }}</span>
              </template>
              <template slot-scope="scope" slot="formalFlag">
                <span>{{ scope.row.formalFlag == "Y" ? "否" : "是" }}</span>
              </template>
              <template slot-scope="scope" slot="method">
                <span>{{
                  scope.row.method == "1"
                    ? "一次性补差"
                    : scope.row.method == "2"
                    ? "变价单补差"
                    : ""
                }}</span>
              </template>
              <template slot-scope="scope" slot="partBalanceCountType">
                <span>{{
                  scope.row.partBalanceCountType == "SYSTEM"
                    ? "系统预读"
                    : scope.row.partBalanceCountType == "HANDWORK"
                    ? "手工上传"
                    : ""
                }}</span>
              </template>
              <template slot-scope="scope" slot="avgPeriod">
                <span>{{
                  scope.row.avgPeriod || scope.row.avgPeriod == "0"
                    ? avgPeriodList.find(
                        (val) => val.code == scope.row.avgPeriod
                      ).name
                    : ""
                }}</span>
              </template>
              <template slot-scope="scope" slot="offsetMonth">
                <span>{{
                  scope.row.offsetMonth || scope.row.offsetMonth == "0"
                    ? offsetList.find(
                        (val) => val.code == scope.row.offsetMonth
                      ).name
                    : ""
                }}</span>
              </template>
              <template slot-scope="scope" slot="compensationRatio">
                <span>{{
                  scope.row.compensationRatio
                    ? scope.row.compensationRatio * 100 + "%"
                    : ""
                }}</span>
              </template>
            </tableList>
          </div>
          <p class="margin-top20 tableTitle font20_b">
            {{ language("LJQD", "零件清单") }}-Part List
          </p>
          <div class="margin-top20 formStyle">
            <tableList
              :tagNum="'1'"
              class="over_flow_y_ture"
              :tableData="partTableListData"
              :tableTitle="
                partTableListData.some((val) => {
                  if (val.materialCode.slice(1, 6) == '01006') {
                    return true;
                  }
                })
                  ? partTableTitle1_all
                  : [...partTableTitle1_1]
              "
              :tableLoading="loadingPart"
              :index="true"
              :rowClassName="'part-table-row'"
              :header-row-class-name="'partTableHeader'"
              :selection="false"
              border
            >
              <template slot-scope="scope" slot="compensationPeriod">
                <span>{{
                  scope.row.compensationPeriod == "A"
                    ? "年度"
                    : scope.row.compensationPeriod == "H"
                    ? "半年度"
                    : scope.row.compensationPeriod == "Q"
                    ? "季度"
                    : scope.row.compensationPeriod == "M"
                    ? "月度"
                    : ""
                }}</span>
              </template>
              <template slot-scope="scope" slot="sapCode">
                <span>{{ scope.row.sapCode }}</span
                ><br />
                <iText>{{ scope.row.supplierName }}</iText>
              </template>
              <template slot-scope="scope" slot="materialCode">
                <span class="link" @click="openPageMarket(scope.row)">{{
                  scope.row.materialCode
                }}</span
                ><br />
                <span class="link" @click="openPageMarket(scope.row)">{{
                  scope.row.materialName
                }}</span>
              </template>
              <template slot-scope="scope" slot="materialDoseSource">
                <span>{{
                  scope.row.materialDoseSource
                    ? materialDoseSourceList.find(
                        (val) => val.code == scope.row.materialDoseSource
                      ).name
                    : ""
                }}</span>
              </template>
              <template slot-scope="scope" slot="method">
                <span>{{
                  scope.row.method == "1"
                    ? "一次性补差"
                    : scope.row.method == "2"
                    ? "变价单补差"
                    : ""
                }}</span>
              </template>
              <template slot-scope="scope" slot="avgPeriod">
                <span>{{
                  scope.row.avgPeriod || scope.row.avgPeriod == "0"
                    ? avgPeriodList.find(
                        (val) => val.code == scope.row.avgPeriod
                      ).name
                    : ""
                }}</span>
              </template>
              <template slot-scope="scope" slot="offsetMonth">
                <span>{{
                  scope.row.offsetMonth || scope.row.offsetMonth == "0"
                    ? offsetList.find(
                        (val) => val.code == scope.row.offsetMonth
                      ).name
                    : ""
                }}</span>
              </template>
              <template slot-scope="scope" slot="compensationRatio">
                <span>{{
                  scope.row.compensationRatio
                    ? scope.row.compensationRatio * 100 + "%"
                    : ""
                }}</span>
              </template>
            </tableList>
          </div>
          <div slot="header" class="headBox">
            <p class="headTitle">{{ language("BEIZHU", "备注") }}-Remarks</p>
          </div>
          <pre v-html="formData.linieMeetingMemo"></pre>
          <div class="margin-top20">
            <p class="applyDate">
              {{ language("SHENQINGRIQI", "申请日期") }}:{{
                moment(new Date()).format("YYYY-MM-DD")
              }}
            </p>
            <div class="applyDateBox">
              <div
                class="applyDateContent"
                v-for="(item, index) in applyDateData"
                :key="index"
              >
                <img
                  class="margin-left5 applyDateIcon"
                  :src="
                    item.taskStatus === '同意'
                      ? require('@/assets/images/icon/yes.png')
                      : require('@/assets/images/icon/no.png')
                  "
                  :fit="fit"
                />
                <div class="applyDateContentItem">
                  <span>部门：</span>
                  <span class="applyDateDeptTitle">{{
                    item.deptFullCode
                  }}</span>
                </div>
                <div class="applyDateContentItem">
                  <span>审批人：</span>
                  <span>{{ item.nameZh }}</span>
                </div>
                <div class="applyDateContentItem">
                  <span>日期：</span>
                  <span>{{ item.endTime }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  iText,
  iCard,
  icon,
  iInput,
  iButton,
  iMessage,
  iPagination,
} from "rise";
import tableList from "./mtzComponents/tableList.vue";
import iTooltip from "./mtzComponents/iTooltip";
import {
  tipList,
  ruleTableTitle1_1,
  ruleTableTitle1_all,
  partTableTitle1_1,
  partTableTitle1_all,
  avgPeriodList,
  offsetList,
  materialDoseSourceList,
} from "./mtzComponents/data";
// import {
//   getAppFormInfo,
//   pageAppRule,
//   pagePartMasterData,
//   approvalList
// } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
// import { pageApprove } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/approve'
import { pageMixins } from "@/utils/pageMixins";
export default {
  mixins: [pageMixins],
  components: {
    iText,
    iTooltip,
    iCard,
    icon,
    iInput,
    iButton,
    iPagination,
    tableList,
  },
  props: {
    flowType: { type: String },
    appStatus: { type: String },
    meetingStatus: { type: String },
  },
  data() {
    return {
      avgPeriodList,
      offsetList,
      materialDoseSourceList,
      tipList,
      formData: {},
      partTableTitle1_all,
      ruleTableTitle1_all,
      ruleTableTitle1_1,
      partTableTitle1_1,
      ruleTableListData: [],
      partTableListData: [],
      loadingRule: false,
      loadingPart: false,
      applyDateData: [],
      moment: window.moment,
    };
  },
  created() {
    // this.initapplyDateData()
    // this.getAppFormInfo()
    // this.getPageAppRule()
    // this.getPagePartMasterData()
    // this.getApprove()
  },
  computed: {
    title() {
      let res = "";
      switch (this.formData.flowType) {
        case "MEETING":
          // 上会
          res = "CSC 定点推荐 - MTZ  CSC Nomination Recommendation - MTZ";
          break;
        case "SIGN":
          // 流转
          res = "流转定点推荐 - MTZ Nomination Recommendation - MTZ";
          break;
        case "FILING":
          // 备案
          res = "备案定点推荐 - MTZ Nomination Recommendation - MTZ";
          break;
        default:
          res = "CSC 定点推荐 - MTZ  CSC Nomination Recommendation - MTZ";
          break;
      }
      return res;
    },
  },
  filters: {
    // 日期格式化
    dateFilter(val, format = "YYYY-MM-DD HH:mm:ss", sourceFormat) {
      return typeof val === "string" || typeof val === "number"
        ? window.moment(val, sourceFormat).format(format)
        : val;
    },
  },
  methods: {
    // 获取审批节点
    getApprove() {
      let params = {
        isDeptLead: true,
        mtzAppId: this.$route.query.mtzAppId,
        pageNo: 1,
        pageSize: 999,
      };
      pageApprove(params).then((res) => {
        if (res?.code === "200") {
          this.applyDateDataAll = res.data || [];
        } else {
          iMessage.error(res.desZh);
        }
      });
    },
    initapplyDateData() {
      approvalList({
        mtzAppId: this.$route.query.mtzAppId,
      }).then((res) => {
        if (res?.code === "200") {
          let data = res.data;
          this.applyDateData = data;
        } else {
          iMessage.error(res.desZh);
        }
      });
    },
    // 获取申请单信息
    getAppFormInfo() {
      getAppFormInfo({
        mtzAppId: this.$route.query.mtzAppId,
      }).then((res) => {
        if (res && res.code == 200) {
          this.formData = res.data;
        } else iMessage.error(res.desZh);
      });
    },
    // 获取规则清单表格数据
    getPageAppRule() {
      var list = {};

      list = {
        mtzAppId: this.$route.query.mtzAppId,
        pageNo: 1,
        pageSize: 99999,
      };
      pageAppRule(list).then((res) => {
        if (res && res.code == 200) {
          this.ruleTableListData = res.data;
        } else iMessage.error(res.desZh);
      });
    },

    // 获取零件清单表格数据
    getPagePartMasterData() {
      var list = {};

      list = {
        mtzAppId: this.$route.query.mtzAppId,
        pageNo: 1,
        pageSize: 99999,
      };
      pagePartMasterData(list).then((res) => {
        if (res && res.code == 200) {
          this.partTableListData = res.data;
        } else iMessage.error(res.desZh);
      });
    },
    openPageMarket(row) {
      let routeUrl = this.$router.resolve({
        path: "/mtz/dataBase/marketPriceEnquiry",
        query: {
          materialCode: row.materialCode,
        },
      });
      window.open(routeUrl.href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.font20_b {
  font-size: 20px;
  font-weight: bold;
}
.centerBox {
  margin: 20px 0;

  p {
    font-size: 18px;
  }
  .enStyle {
    display: flex;
    justify-content: space-between;
  }
}

.tableTitle {
  font-weight: bold;
  font-family: Arial;
  color: #000000;
  opacity: 1;
  font-size: 20px;
}
.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  display: flex;

  .headTitle {
    font-size: 18px;
    font-weight: bold;
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }

  .buttonBox {
    position: absolute;
    right: 13px;
  }
}
.applyDate {
  font-size: 18px;
}
.applyDateBox {
  margin: 20px 0;
  padding-bottom: 20px;
  white-space: nowrap;
}

.applyDateIcon {
  width: 33px;
  height: 33px;
  margin-top: 10px;
}

.applyDateContentItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 20px;
  font-size: 16px;

  .applyDateDeptTitle {
    font-weight: bold;
  }
}

.applyDateContent {
  display: inline-block;
  background-color: #cdd4e2;
  height: 178px;
  width: 16%;
  margin: 10px 0.3% 0;
  border-radius: 15px;
  text-align: center;
}

.formStyle {
  position: relative;
}

::v-deep .el-form {
  .el-table {
    .cell {
      padding: 0 !important;

      span {
        margin-right: 0px !important;
      }
    }
  }

  .el-table {
    border-radius: 0;
    font-size: 18px;
    tr {
      background-color: #364d6e;
    }
    tr:nth-child(even) {
      background-color: #364d6e;
    }
    th.gutter:last-of-type {
      background: #fff;
      border: 0;
    }
    .el-table__header {
      th {
        border-color: #d9d9d9;
        .cell {
          color: #fff;
          line-height: 20px;
        }
      }
    }
    .el-table__body-wrapper,
    .el-table__fixed-body-wrapper {
      tr:nth-child(even) {
        background-color: #ffffff;
      }

      tr:last-of-type {
        td {
          border-bottom: 1px solid #d9d9d9;
        }
      }

      td {
        border-color: #d9d9d9;
        border-top: 1px solid #d9d9d9;
        .cell {
          line-height: 20px;
        }
      }
    }
    .el-table__footer-wrapper {
      tr:nth-child(even) {
        background-color: #ffffff;
      }
    }
    tr {
      border-top: 1px solid #d9d9d9;
      .link {
        color: #364d6e;
        text-decoration: underline;
      }
    }
  }
}

.over_flow_y_ture {
  ::v-deep .el-table__body-wrapper {
    max-height: 300px;
    overflow-y: auto;
  }
}

.hr_divider {
  margin: 0 1.5rem 0 0;
}

.tabs_box_right {
  height: 40px;

  .samll_title {
    width: 80px;
  }

  div {
    display: flex;
    align-items: flex-start;
    margin-right: 20px;
  }

  span {
    display: inline-block;
    font-size: 15px !important;
  }

  .small_text {
    float: left;
  }
}

::v-deep .el-form-item__content {
  line-height: 0px !important;
}

.page-item {
  width: 100%;
  position: relative;
}

.page-logo {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  border-top: 1px solid #666;
}

.padding-bottom30 {
  padding-bottom: 30px;
}

.remarkCard {
  ::v-deep .card {
    box-shadow: none;
  }
}
.mtz-content {
  height: 80vh;
  overflow: auto;
}
</style>
