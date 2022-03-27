<template>
  <div class="rsPdf">
    <!-- <iCard class="rsCard" v-if="isPF">
      <template #header>
        <div class="title">
          <p>CSC推荐表/CSC Recommendation Sheet会外流转</p>
        </div>
      </template>
      <iFormGroup row="4" class="csc">
        <div class="col">
          <iFormItem
            v-for="(item, index) in titleData"
            :key="'titleData' + index"
            :label="item.label + ':'"
          >
            <iText v-if="item.props === 'currency'">{{
              basicData.currencyMap && basicData.currencyMap[basicData.currency]
                ? basicData.currencyMap[basicData.currency].name
                : basicData.currency
            }}</iText>
            <iText v-else-if="item.props === 'exchangeRate'">
              <span
                class="exchangeRageCurrency"
                v-for="item in exchangeRageCurrency"
                :key="item"
                >1{{
                  basicData.currencyMap && basicData.currencyMap[item]
                    ? basicData.currencyMap[item].name
                    : item
                }}={{ basicData.currencyRateMap[item]
                }}{{
                  basicData.currencyMap.RMB
                    ? basicData.currencyMap.RMB.name
                    : "RMB"
                }}</span
              >
            </iText>
            <iText v-else-if="item.props === 'partProjectType'">{{
              basicData[item.props] === partProjTypes.PEIJIAN ? "配件" : "附件"
            }}</iText>
            <iText v-else>{{ basicData[item.props] }}</iText>
          </iFormItem>
        </div>
      </iFormGroup>
    </iCard> -->
    <iCard class="rsCard">
      <template #header>
        <div class="title">
          <p>{{ `流转定点推荐 - ${cardTitle}` }}</p>
        </div>
      </template>
      <div class="infos">
        <div class="infoWrapper" v-for="(info, $index) in infos" :key="$index">
          <div class="info">
            <span class="label">{{ info.name }}：</span>
            <span v-if="info.props !== 'exchange'">{{ basicData[info.props] }}</span>
            <div v-else>{{ exchangeRate }}</div>
          </div>
        </div>
      </div>
      <tableList
        :selection="false"
        :tableTitle="tableTitle"
        :tableData="tableData"
        class="rsTable"
      >
        <template #oldAPrice="scope">
          <span>{{ scope.row.oldAPrice | toThousands(true) }}</span>
        </template>
        <template #cfTargetAPrice="scope">
          <span>{{ scope.row.cfTargetAPrice | toThousands(true) }}</span>
        </template>
        <template #cfTargetBPrice="scope">
          <span>{{ scope.row.cfTargetBPrice | toThousands(true) }}</span>
        </template>
        <template #rw="scope">
          <span>{{ scope.row.rw | toThousands(true) }}</span>
        </template>
        <template #packPrice="scope">
          <span>{{ scope.row.packPrice | toThousands(true) }}</span>
        </template>
        <template #transportPrice="scope">
          <span>{{ scope.row.transportPrice | toThousands(true) }}</span>
        </template>
        <template #operatePrice="scope">
          <span>{{ scope.row.operatePrice | toThousands(true) }}</span>
        </template>
        <template #turnover="scope">
          <span>{{ scope.row.turnover | toThousands(true) }}</span>
        </template>


        <!-- 年降 -->
        <template #ltc="scope">
          <span>{{resetLtcData(scope.row.ltcs,'ltc')}}</span>
        </template>

        <!-- 年降开始时间 -->
        <template #beginYearReduce="scope">
          <span>{{resetLtcData(scope.row.ltcs,'beginYearReduce')}}</span>
        </template>

        <template #svwCode="scope">
          <span>{{ scope.row.svwCode || scope.row.svwTempCode }}</span>
        </template>

        <template #aprice="scope">
          <div v-if="scope.row.status === 'SKDLC'">
            <p>{{ scope.row.skdAPrice | toThousands(true) }}</p>
            <p>{{ scope.row.aprice | toThousands(true) }}</p>
          </div>
          <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.skdAPrice | toThousands(true) }}</span>
          <span v-else>{{ scope.row.aprice | toThousands(true) }}</span>
        </template>

        <template #bprice="scope">
          <div v-if="scope.row.status === 'SKDLC'">
            <p>{{ scope.row.skdBPrice | toThousands(true) }}</p>
            <p>{{ scope.row.bprice | toThousands(true) }}</p>
          </div>
          <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.skdBPrice | toThousands(true) }}</span>
          <span v-else>{{ scope.row.bprice | toThousands(true) }}</span>
        </template>

        <template #investFee="scope">
          <div v-if="scope.row.status === 'SKDLC'">
            <p>{{ scope.row.skdInvestFee | toThousands(true) }}</p>
            <p>{{ scope.row.investFee | toThousands(true) }}</p>
          </div>
          <span v-else-if="scope.row.status === 'SKD'">
            <p>{{ scope.row.skdInvestFee | toThousands(true) }}</p>
          </span>
          <span v-else>
            <p>{{ scope.row.investFee | toThousands(true) }}</p>
          </span>
        </template>

        <template #remarks="scope">
          <span>{{ scope.row.remarks }}</span>
        </template>
      </tableList>
    </iCard>
    <iCard class="rsCard" :title="language('BEIZHU', '备注')">
      <div class="meetingRemark-item" v-for="(item, index) in remarkItem" :key="index">
        <div class="margin-top10" type="textarea" :rows="3" resize="none">{{ item.value }}</div>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard, iFormGroup, iFormItem, iText } from "rise"
import tableList from "@/views/designate/designatedetail/components/tableList"
import { partProjTypes, fileType } from "@/config"
import { getList, getRemark, reviewListRs, searchRsPageExchangeRate } from "@/api/designate/decisiondata/rs"
import { checkList, fileTableTitle, infos } from "./data"
import { nomalTableTitle, accessoryTableTitle, sparePartTableTitle } from "./pdfData"

export default {
  components: { iCard, iFormGroup, iFormItem, iText, tableList },
  props:{
    nominateId:{
      type:String,
    }
  },
  data() {
    return {
      partProjTypes,
      titleData: [
        { label: "零件关系", value: "配件", props: "partProjectType" },
        { label: "询价采购员", value: "胡伟", props: "buyer" },
        { label: "货币单位", value: "RMB", props: "currency" },
        { label: "申请单号", value: "", props: "nominateAppId" },
        { label: "申请日期", value: "2020-01-01", props: "nominateAppTime" },
        { label: "LINIE采购员", value: "胡伟", props: "linieName" },
        { label: "Exchange rate", value: "", props: "cfExchangeRate" },
      ],
      basicData: {},
      tableData: [],
      projectType: partProjTypes.PEIJIAN,
      remarkItem: [],
      infos,
      exchangeRate: ""
    };
  },
  computed: {
    isPF() {
      // 是否配附件
      return (
        this.projectType === this.partProjTypes.PEIJIAN ||
        this.projectType === this.partProjTypes.FUJIAN
      );
    },
    cardTitle() {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return '配件采购 Nomination Recommendation - Spare Part Purchasing'
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return '附件采购 Nomination Recommendation – Accessory Purchasing'
      }
      return '生产采购 Nomination Recommendation - Production Purchasing'
    },
    tableTitle() {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return sparePartTableTitle
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return accessoryTableTitle
      }
      return nomalTableTitle
    },
    isApproval() {
      return this.$route.query.isApproval === "true"
    }
  },
  created() {
    if (this.isApproval) {
      this.reviewListRs()
    } else {
      this.getTopList()
    }
    this.getRemark()
    this.searchRsPageExchangeRate()
  },
  methods: {
    // 单独处理下年降或年降计划
    resetLtcData(row, type) {
      if (!row) return ""
      // 年降开始时间
      if (type == "beginYearReduce") {
        // 取第一个非0的年份
        const list = row.filter((item) => item.ltcRate != "0.00");
        return list.length ? list[0].ltcDate : "-";
      } else {
        // 年降
        // 从非0开始至非0截至的数据 不包含0
        let strList = [];
        let strFlag = false;
        for (let i = 0; i < row.length; i++) {
          if (row[i].ltcRate != "0.00") {
            strFlag = true;
            strList.push(row[i].ltcRate);
          } else if (strFlag && row[i].ltcRate == "0.00") {
            break;
          }
        }
        return strList.length ? strList.join("/") : "-";
      }
    },
    /**
     * @Description: 获取表格初始数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTopList() {
      getList(this.nominateId).then(res => {
        if (res.code == 200) {
          this.basicData = res.data
          this.tableData = res.data.lines
          this.projectType = res.data.partProjectType || ''
        } else {
          this.basicData = {}
          this.tableData = []
          this.projectType = ''
        }
      })
    },
    reviewListRs() {
      reviewListRs(this.nominateId)
      .then(res => {
        if (res.code == 200) {
          this.basicData = res.data
          this.tableData = res.data.lines
          this.projectType = res.data.partProjectType || ''
        } else {
          this.basicData = {}
          this.tableData = []
          this.projectType = ''
        }
      })
      .finally(() => this.tableLoading = false)
    },
    getRemark() {
      getRemark(this.nominateId).then(res => {
        if (res.code == 200) {
          this.remarkItem = res.data.map(item => {
            return {value: item, checked: false}
          })
        }
      })
    },
    // 获取汇率
    searchRsPageExchangeRate() {
      let id = this.$route.query.desinateId ? this.$route.query.desinateId : this.nominateId
      searchRsPageExchangeRate(id)
      .then(res => {
        if (res.code == 200) {
          let sourceData = Array.isArray(res.data) ? res.data : []

          sourceData = sourceData
            .filter(item => !item.isCurrentVersion)
            .filter(item => Array.isArray(item.exchangeRateVos) && item.exchangeRateVos.length)

          const current = sourceData[0] ? sourceData[0] : {}

          if (Array.isArray(current.exchangeRateVos)) {
            this.exchangeRate = current.exchangeRateVos.map(item => this.exchangeRateProcess(item)).join('')
          } else {
            this.exchangeRate = ""
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
    },

    // 汇率显示处理
    exchangeRateProcess(row) {
      return `1${ row.originCurrencyCode }=${ row.exchangeRate }${ row.currencyCode }`
    },
  },
};
</script>

<style lang="scss" scoped>
.rsPdf {
  width: 1920px; /*no*/

  .rsCard {
    & + .rsCard {
      margin-top: 20px; /*no*/
    }
  }

  .rsTable {
    font-size: 8px; /*no*/
    &::before {
      height: 0;
    }
    ::v-deep thead th {
      padding-top: 8px; /*no*/
      padding-bottom: 8px; /*no*/
      & > .cell {
        padding-left: 3px; /*no*/
        padding-right: 3px; /*no*/
        line-height: 14px; /*no*/
        span {
          // zoom: 0.85;
        }

        // span span {
        //   // font-size: 8px;
        // }
        p {
          min-height: 16px; /*no*/
        }
      }
    }
  }

  .meetingRemark-item {
    margin-top: 20px; /*no*/
    min-height: 100px; /*no*/
    border: 1px solid rgb(201, 216, 219); /*no*/
    box-shadow: 0 0 1px rgb(0 38 98 / 15%); /*no*/
    border-radius: 5px; /*no*/
    padding: 5px 10px; /*no*/
  }

  .infos {
    display: flex;
    margin-bottom: 20px;

    .infoWrapper {
      flex: 1;
    
      .info {
        font-size: 13px;
        display: flex;
        align-items: center;
        .label {
          font-weight: 800;
        }
      }
    }
  }
}
</style>