<template>
  <div class="rsPdf">
    <iCard class="rsCard">
      <template #header>
        <div class="title">
          <p>CSC定点推荐 - {{ cardTitle }}</p>
          <p>{{ cardTitleEn }}</p>
        </div>
        <div>
          <div class="control">
            <div class="nomiId" :class="isSingle ? 'margin-right20' : ''">定点申请单号：{{ $route.query.desinateId ? $route.query.desinateId : nominateId }}</div>
            <div class="singleSourcing" v-if="isSingle">Single Sourcing</div>
          </div>
        </div>
      </template>
      <div class="rsTop pdf-item">
        <div class="rsTop-left">
          <div
            class="rsTop-left-item"
            v-for="(item, index) in leftTitle"
            :key="index"
          >
            <div class="rsTop-left-item-title">
              <p>{{ item.name }}</p>
              <p>{{ item.enName }}</p>
            </div>
            <div class="rsTop-left-item-value">{{ basicData[item.props] }}</div>
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
                {{ item.name }}<br />{{ item.enName }}
              </div>
              <div
                class="rsTop-right-item-value"
                v-if="item.props == 'suppliersNow'"
              >
                <div
                  v-for="(item, index) in basicData[item.props]"
                  :key="index"
                >
                  <div>
                    <span style="white-space: nowrap">{{ item.shortNameZh }}/</span>
                    <span style="white-space: nowrap">{{ item.shortNameEn }}</span>
                    <br />
                  </div>
                </div>
              </div>
              <div class="rsTop-right-item-value" v-else>
                <span
                  v-if="item.props == 'mtz' || item.props == 'isApportion'"
                  style="word-wrap: break-word"
                  >{{ basicData[item.props] | booleanFilter }}</span
                >
                <span v-else-if="item.props == 'plannedInvest' || item.props == 'setPrice'" style="word-wrap: break-word;">{{ basicData[item.props] | toThousands(true) }}</span>
                <span
                  v-else
                  v-html="basicData[item.props]"
                  style="word-wrap: break-word"
                >
                </span>
              </div>
            </template>
          </div>
        </div>
      </div>
      <template v-if="count == firstCount">
        <div class="pdf-item">
          <tableList :selection="false" :tableTitle="tableTitle" :tableData="tableData" class="rsTable margin-top20" >
            <template #fsnrGsnrNum="scope" border>
              <div>
                <p>{{ scope.row.fsnrGsnrNum }}</p>
                <p>{{ scope.row.purchasingFactoryShortName ? `(${ scope.row.purchasingFactoryShortName })` : '' }}</p>
              </div>
            </template>

            <template #ltc="scope">
              <span>{{ resetLtcData(scope.row.ltcs, "ltc") }}</span>
            </template>
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
            <template #supplierSapCode="scope">
              <span>{{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}</span>
            </template>
            <template #presentPrice="scope">
              <span>{{ scope.row.presentPrice | toThousands }}</span>
            </template>
            <template #cfTargetAPrice="scope">
              <span>{{ scope.row.cfTargetAPrice | toThousands }}</span>
            </template>
            <template #cfTargetBPrice="scope">
              <span>{{ scope.row.cfTargetBPrice | toThousands }}</span>
            </template>
            <template #aprice="scope">
              <div v-if="scope.row.status === 'SKDLC'">
                <p>{{ scope.row.skdAPrice | toThousands }}</p>
                <p>{{ scope.row.aprice | toThousands }}</p>
              </div>
              <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.skdAPrice | toThousands }}</span>
              <span v-else>{{ scope.row.aprice | toThousands }}</span>
            </template>
            <template #bprice="scope">
              <div v-if="scope.row.status === 'SKDLC'">
                <p>{{ scope.row.skdBPrice | toThousands }}</p>
                <p>{{ scope.row.bprice | toThousands }}</p>
              </div>
              <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.skdBPrice | toThousands }}</span>
              <span v-else>{{ scope.row.bprice | toThousands }}</span>
            </template>
            <template #investFee="scope">
              <span>{{ scope.row.investFee | toThousands }}</span>
            </template>
            <template #devFee="scope">
              <span>{{ scope.row.devFee | toThousands }}</span>
            </template>
            <template #addFee="scope">
              <span>{{ scope.row.addFee | toThousands }}</span>
            </template>
            <template #savingFee="scope">
              <span>{{ scope.row.savingFee | toThousands }}</span>
            </template>
            <template #share="scope">
              <span>{{ +scope.row.share || 0 }}</span>
            </template>
          </tableList>
          <div class="beizhu">
            备注 Remarks:
            <div class="beizhu-value">
              <p v-for="(item,index) in remarkItem" :key="index">{{item.value}}</p>
            </div>
          </div>
          <div v-if="projectType === partProjTypes.DBLINGJIAN || projectType === partProjTypes.DBYICHIXINGCAIGOU" style="text-align:right;">
            汇率：Exchange rate: 
            <span class="exchangeRageCurrency" v-for="item in exchangeRageCurrency" :key="item">
              1{{basicData.currencyMap && basicData.currencyMap[item] ? basicData.currencyMap[item].code : item}}={{basicData.currencyRateMap[item]}}{{basicData.currencyMap.RMB ? basicData.currencyMap.RMB.code : 'RMB'}}
            </span>
          </div>
          <div v-else>
            <div class="margin-top10">
              <p v-for="(exchangeRate, index) in exchangeRates" :key="index">Exchange rate{{ exchangeRate.fsNumsStr ? ` ${ index + 1 }` : '' }}: {{ exchangeRate.str }}{{ exchangeRate.fsNumsStr ? `（${ exchangeRate.fsNumsStr }）` : '' }}</p>
            </div>
          </div>
          <iCard v-if="!showSignatureForm && !isAuth" class="checkDate rsCard" :class="!isPreview && 'margin-top20'" :title="'Application Date：'+processApplyDate">
            <div class="checkList">
              <div class="checkList-item" v-for="(item, index) in checkList" :key="index">
                <icon v-if="item.approveStatus === true" name="iconrs-wancheng" class="complete"></icon>
                <icon v-else-if="item.approveStatus === false" name="iconrs-quxiao" class="cancel"></icon>
                <div v-else class="" >-</div>
                <div class="checkList-item-info">
                  <span>Dept.:</span>
                  <span class="checkList-item-info-depart">{{item.approveDeptNumName}}</span>
                </div>
                <div class="checkList-item-info">
                  <span>Date:</span>
                  <span>{{item.approveDate}}</span>
                </div>
              </div>
            </div>
          </iCard>
        </div>
      </template>
      <template v-else>
        <div class="pdf-item">
          <tableList :selection="false" :tableTitle="tableTitle" :tableData="tableData.slice(0,firstCount)" class="rsTable margin-top20" border>
            <template #fsnrGsnrNum="scope">
              <div>
                <p>{{ scope.row.fsnrGsnrNum }}</p>
                <p>{{ scope.row.purchasingFactoryShortName ? `(${ scope.row.purchasingFactoryShortName })` : '' }}</p>
              </div>
            </template>
            
            <template #ltc="scope">
              <span>{{ resetLtcData(scope.row.ltcs, "ltc") }}</span>
            </template>
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
            <template #supplierSapCode="scope">
              <span>{{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}</span>
            </template>
            <template #presentPrice="scope">
              <span>{{ scope.row.presentPrice | toThousands }}</span>
            </template>
            <template #cfTargetAPrice="scope">
              <span>{{ scope.row.cfTargetAPrice | toThousands }}</span>
            </template>
            <template #cfTargetBPrice="scope">
              <span>{{ scope.row.cfTargetBPrice | toThousands }}</span>
            </template>
            <template #aprice="scope">
              <div v-if="scope.row.status === 'SKDLC'">
                <p>{{ scope.row.skdAPrice | toThousands }}</p>
                <p>{{ scope.row.aprice | toThousands }}</p>
              </div>
              <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.skdAPrice | toThousands }}</span>
              <span v-else>{{ scope.row.aprice | toThousands }}</span>
            </template>
            <template #bprice="scope">
              <div v-if="scope.row.status === 'SKDLC'">
                <p>{{ scope.row.skdBPrice | toThousands }}</p>
                <p>{{ scope.row.bprice | toThousands }}</p>
              </div>
              <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.skdBPrice | toThousands }}</span>
              <span v-else>{{ scope.row.bprice | toThousands }}</span>
            </template>
            <template #investFee="scope">
              <span>{{ scope.row.investFee | toThousands }}</span>
            </template>
            <template #devFee="scope">
              <span>{{ scope.row.devFee | toThousands }}</span>
            </template>
            <template #addFee="scope">
              <span>{{ scope.row.addFee | toThousands }}</span>
            </template>
            <template #savingFee="scope">
              <span>{{ scope.row.savingFee | toThousands }}</span>
            </template>
            <template #share="scope">
              <span>{{ +scope.row.share || 0 }}</span>
            </template>
          </tableList>
          <div class="beizhu">
            备注 Remarks:
            <div class="beizhu-value">
              <p v-for="(item,index) in remarkItem" :key="index">{{item.value}}</p>
            </div>
          </div>
          <div v-if="projectType === partProjTypes.DBLINGJIAN || projectType === partProjTypes.DBYICHIXINGCAIGOU" style="text-align:right;">
            汇率：Exchange rate: 
            <span class="exchangeRageCurrency" v-for="item in exchangeRageCurrency" :key="item">
              1{{basicData.currencyMap && basicData.currencyMap[item] ? basicData.currencyMap[item].code : item}}={{basicData.currencyRateMap[item]}}{{basicData.currencyMap.RMB ? basicData.currencyMap.RMB.code : 'RMB'}}
            </span>
          </div>
          <div v-else>
            <div class="margin-top10">
              <p v-for="(exchangeRate, index) in exchangeRates" :key="index">Exchange rate{{ exchangeRate.fsNumsStr ? ` ${ index + 1 }` : '' }}: {{ exchangeRate.str }}{{ exchangeRate.fsNumsStr ? `（${ exchangeRate.fsNumsStr }）` : '' }}</p>
            </div>
          </div>
          <iCard v-if="!showSignatureForm && !isAuth" class="checkDate rsCard" :class="!isPreview && 'margin-top20'" :title="'Application Date：'+processApplyDate">
            <div class="checkList">
              <div class="checkList-item" v-for="(item, index) in checkList" :key="index">
                <icon v-if="item.approveStatus === true" name="iconrs-wancheng" class="complete"></icon>
                <icon v-else-if="item.approveStatus === false" name="iconrs-quxiao" class="cancel"></icon>
                <div v-else class="" >-</div>
                <div class="checkList-item-info">
                  <span>Dept.:</span>
                  <span class="checkList-item-info-depart">{{item.approveDeptNumName}}</span>
                </div>
                <div class="checkList-item-info">
                  <span>Date:</span>
                  <span>{{item.approveDate}}</span>
                </div>
              </div>
            </div>
          </iCard>
        </div>
        <template v-for="index in parseInt((tableData.length+count-firstCount)/count)">
          <div :key="index" class="pdf-item">
            <tableList  :selection="false" :tableTitle="tableTitle" :tableData="tableData.slice(count*(index-1)+firstCount,count*index+firstCount )" class="rsTable margin-top20" border>
              <template #fsnrGsnrNum="scope">
                <div>
                  <p>{{ scope.row.fsnrGsnrNum }}</p>
                  <p>{{ scope.row.purchasingFactoryShortName ? `(${ scope.row.purchasingFactoryShortName })` : '' }}</p>
                </div>
              </template>
              
              <template #ltc="scope">
                <span>{{ resetLtcData(scope.row.ltcs, "ltc") }}</span>
              </template>
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
              <template #supplierSapCode="scope">
                <span>{{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}</span>
              </template>
              <template #presentPrice="scope">
                <span>{{ scope.row.presentPrice | toThousands }}</span>
              </template>
              <template #cfTargetAPrice="scope">
                <span>{{ scope.row.cfTargetAPrice | toThousands }}</span>
              </template>
              <template #cfTargetBPrice="scope">
                <span>{{ scope.row.cfTargetBPrice | toThousands }}</span>
              </template>
              <template #aprice="scope">
                <div v-if="scope.row.status === 'SKDLC'">
                  <p>{{ scope.row.skdAPrice | toThousands }}</p>
                  <p>{{ scope.row.aprice | toThousands }}</p>
                </div>
                <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.skdAPrice | toThousands }}</span>
                <span v-else>{{ scope.row.aprice | toThousands }}</span>
              </template>
              <template #bprice="scope">
                <div v-if="scope.row.status === 'SKDLC'">
                  <p>{{ scope.row.skdBPrice | toThousands }}</p>
                  <p>{{ scope.row.bprice | toThousands }}</p>
                </div>
                <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.skdBPrice | toThousands }}</span>
                <span v-else>{{ scope.row.bprice | toThousands }}</span>
              </template>
              <template #investFee="scope">
                <span>{{ scope.row.investFee | toThousands }}</span>
              </template>
              <template #devFee="scope">
                <span>{{ scope.row.devFee | toThousands }}</span>
              </template>
              <template #addFee="scope">
                <span>{{ scope.row.addFee | toThousands }}</span>
              </template>
              <template #savingFee="scope">
                <span>{{ scope.row.savingFee | toThousands }}</span>
              </template>
              <template #share="scope">
                <span>{{ +scope.row.share || 0 }}</span>
              </template>
            </tableList>
            <div class="beizhu">
              备注 Remarks:
              <div class="beizhu-value">
                <p v-for="(item,index) in remarkItem" :key="index">{{item.value}}</p>
              </div>
            </div>
            <div v-if="projectType === partProjTypes.DBLINGJIAN || projectType === partProjTypes.DBYICHIXINGCAIGOU" style="text-align:right;">
              汇率：Exchange rate: 
              <span class="exchangeRageCurrency" v-for="item in exchangeRageCurrency" :key="item">
                1{{basicData.currencyMap && basicData.currencyMap[item] ? basicData.currencyMap[item].code : item}}={{basicData.currencyRateMap[item]}}{{basicData.currencyMap.RMB ? basicData.currencyMap.RMB.code : 'RMB'}}
              </span>
            </div>
            <div v-else>
              <div class="margin-top10">
                <p v-for="(exchangeRate, index) in exchangeRates" :key="index">Exchange rate{{ exchangeRate.fsNumsStr ? ` ${ index + 1 }` : '' }}: {{ exchangeRate.str }}{{ exchangeRate.fsNumsStr ? `（${ exchangeRate.fsNumsStr }）` : '' }}</p>
              </div>
            </div>
            <iCard v-if="!showSignatureForm && !isAuth" class="checkDate rsCard" :class="!isPreview && 'margin-top20'" :title="'Application Date：'+processApplyDate">
              <div class="checkList">
                <div class="checkList-item" v-for="(item, index) in checkList" :key="index">
                  <icon v-if="item.approveStatus === true" name="iconrs-wancheng" class="complete"></icon>
                  <icon v-else-if="item.approveStatus === false" name="iconrs-quxiao" class="cancel"></icon>
                  <div v-else class="" >-</div>
                  <div class="checkList-item-info">
                    <span>Dept.:</span>
                    <span class="checkList-item-info-depart">{{item.approveDeptNumName}}</span>
                  </div>
                  <div class="checkList-item-info">
                    <span>Date:</span>
                    <span>{{item.approveDate}}</span>
                  </div>
                </div>
              </div>
            </iCard>
          </div>
        </template>
      </template>
      <iCard title="Prototype Cost List" class="margin-top20 rsCard" v-if='!showSignatureForm && prototypeList.length > 5'>
        <el-table :data='prototypeList'>
          <template v-for="(items,index) in prototypeTitleList">
            <el-table-column :key="index" :prop="items.props" align="center" :label="language(items.i18nKey,items.i18nName)"></el-table-column>
          </template>
        </el-table>
      </iCard>
      <!-- <tableList :selection="false" :tableTitle="tableTitle" :tableData="tableData" class="rsTable" >
        <template #ltc="scope">
          <span>{{ resetLtcData(scope.row.ltcs, "ltc") }}</span>
        </template>
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
        <template #supplierSapCode="scope">
          <span>{{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}</span>
        </template>
        <template #presentPrice="scope">
          <span>{{ scope.row.presentPrice | toThousands }}</span>
        </template>
        <template #cfTargetAPrice="scope">
          <span>{{ scope.row.cfTargetAPrice | toThousands }}</span>
        </template>
        <template #cfTargetBPrice="scope">
          <span>{{ scope.row.cfTargetBPrice | toThousands }}</span>
        </template>
        <template #aprice="scope">
          <div v-if="scope.row.status === 'SKDLC'">
            <p>{{ scope.row.skdAPrice | toThousands }}</p>
            <p>{{ scope.row.aprice | toThousands }}</p>
          </div>
          <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.skdAPrice | toThousands }}</span>
          <span v-else>{{ scope.row.aprice | toThousands }}</span>
        </template>
        <template #bprice="scope">
          <div v-if="scope.row.status === 'SKDLC'">
            <p>{{ scope.row.skdBPrice | toThousands }}</p>
            <p>{{ scope.row.bprice | toThousands }}</p>
          </div>
          <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.skdBPrice | toThousands }}</span>
          <span v-else>{{ scope.row.bprice | toThousands }}</span>
        </template>
        <template #investFee="scope">
          <span>{{ scope.row.investFee | toThousands }}</span>
        </template>
        <template #devFee="scope">
          <span>{{ scope.row.devFee | toThousands }}</span>
        </template>
        <template #addFee="scope">
          <span>{{ scope.row.addFee | toThousands }}</span>
        </template>
        <template #savingFee="scope">
          <span>{{ scope.row.savingFee | toThousands }}</span>
        </template>
      </tableList> -->
    </iCard>
  </div>
</template>

<script>
import { iCard, icon } from "rise"
import tableList from "@/views/designate/designatedetail/components/tableList"
import { partProjTypes } from "@/config"
import { resetLtcData } from "./data"
import { toThousands } from "@/utils"

export default {
  components: { iCard, icon, tableList },
  props: {
    cardTitle: { type: String, default: "" },
    cardTitleEn: { type: String, default: "" },
    isSingle: { type: Boolean, default: false },
    leftTitle: { type: Array, default: () => [] },
    rightTitle: { type: Array, default: () => [] },
    basicData: { type: Object, default: () => {} },
    tableTitle: { type: Array, default: () => [] },
    tableData: { type: Array, default: () => [] },
    firstCount: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    remarkItem: { type: Array, default: () => [] },
    projectType: { type: String, default: "" },
    exchangeRageCurrency: { type: Array, default: () => [] },
    exchangeRates: { type: Array, default: () => [] },
    showSignatureForm: { type: Boolean, default: false },
    isAuth: { type: Boolean, default: false },
    checkList: { type: Array, default: () => [] },
    processApplyDate: { type: String, default: "" },
    prototypeList: { type: Array, default: () => [] },
    prototypeTitleList: { type: Array, default: () => [] },
  },
  filters: {
    toThousands,
    booleanFilter(val) {
      const obj = {
        true: "Y",
        false: "N"
      }

      return obj[val] || val
    },
  },
  data() {
    return {
      partProjTypes
    }
  },
  methods: {
    resetLtcData
  }
}
</script>

<style lang="scss" scoped>
.rsPdf {
  width: fit-content;
  overflow-y: auto;
  
  .rsCard {
    box-shadow: none;

    ::v-deep .title {
      font-size: 18px !important; /*no*/
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

  .singleSourcing {
    padding: 8px 12px; /*no*/
    font-size: 16px; /*no*/
    font-weight: 400; /*no*/
    color: rgba(22, 96, 241, 1);
    border: 1px dashed #1660f1; /*no*/
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
        width: 50%;
        font-size: 14px; /*no*/
        display: flex;
        height: 17px; /*no*/
        margin-bottom: 24px; /*no*/
        &:last-of-type {
          margin-bottom: 26px; /*no*/
        }
        &-title {
          font-weight: bold;
          width: 40%; 
        }
        &:nth-of-type(odd) {
          .rsTop-left-item-title {
            width: 33%;
          }
        }
        &-value {
          font-weight: 400;
          width: 60%;
        }
      }
    }
    &-right {
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      border: 1px solid rgba(197, 204, 214, 0.42);
      border-radius: 5px 5px 0 0; /*no*/
      &-item {
        width: 45%;
        display: flex;
        border-bottom: 1px solid rgba(197, 204, 214, 0.42);
        &:nth-of-type(odd) {
          width: 55%;
          border-right: 1px solid rgba(197, 204, 214, 0.42);
        }
        &-title {
          background-color: rgba(22, 96, 241, 0.06);
          border-right: 1px solid rgba(197, 204, 214, 0.42);
          padding: 6px 24px; /*no*/
          width: 60%;
          font-weight: bold;
          // line-height: 29px; /*no*/
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        &-value {
          width: 40%;
          padding: 6px 24px; /*no*/
          // line-height: 29px; /*no*/
          background-color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        &:nth-of-type(even) {
          .rsTop-right-item-title {
            width: 65%;
          }
          .rsTop-right-item-value {
            width: 35%;
          }
        }
      }
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
        font-size: 12px; /*no*/
        span {
          // zoom: 0.85;
        }

        // span span {
        //   // font-size: 8px;
        // }
        p {
          min-height: 16px; /*no*/
        }

        p + p {
          margin-top: 8px; /*no*/
        }
      }
    }

    ::v-deep .el-table__row td {
      .cell {
        padding-left: 3px; /*no*/
        padding-right: 3px; /*no*/

        span {
          // zoom: 0.88;
        }
      }
    }
  }

  .beizhu {
    background-color: rgba(22, 96, 241, 0.03);
    // height: 40px;
    padding: 12px 14px; /*no*/
    font-weight: bold;
    display: flex;
    &-value {
      font-weight: 400;
      margin-left: 20px; /*no*/
    }
  }

  .checkDate {
    ::v-deep .cardHeader .title {
      font-weight: 400;
      color: rgba(75, 75, 76, 1);
    }
  }

  .checkList {
    display: flex;
    overflow: auto;
    &-item {
      flex-shrink: 0;
      width: 224px; /*no*/
      height: 178px; /*no*/
      border-radius: 15px; /*no*/
      background-color: rgba(205, 212, 226, 0.12);
      margin-right: 19px; /*no*/
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 30px 22px; /*no*/
      font-size: 16px; /*no*/
      color: rgba(65, 67, 74, 1);
      &-info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        &-depart {
          font-size: 18px; /*no*/
          font-weight: bold;
        }
      }
    }
  }

  .complete {
    color: rgb(104, 193, 131);
  }

  .cancel {
    color: rgb(95, 104, 121);
  }
  .pdf-item{
    ::v-deep .card{
      .cardHeader{
        padding-left: 0
      }
      .cardBody{
        padding-left: 0
      }
    }
  }
}
</style>