<template>
  <div class="rsPdf">
    <template v-for="(tableData, index) in tableList">
      <div :key="index" class="pageCard-main">
        <slot name="tabTitle"></slot>
        <iCard :key="index" class="rsCard pageCard">
          <template #header>
            <div class="title">
              <p>CSC定点推荐 - {{ cardTitle }}</p>
              <p>{{ cardTitleEn }}</p>
            </div>
            <div>
              <div class="control">
                <div class="nomiId" :class="isSingle ? 'margin-right20' : ''">
                  定点申请单号：{{
                    $route.query.desinateId
                      ? $route.query.desinateId
                      : nominateId
                  }}
                </div>
                <div class="singleSourcing" v-if="isSingle">
                  Single Sourcing
                </div>
              </div>
            </div>
          </template>
          <div>
            <div class="rsTop">
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
                        v-if="
                          item.props == 'mtz' || item.props == 'isApportion'
                        "
                        style="word-wrap: break-word"
                        >{{ basicData[item.props] | booleanFilter }}</span
                      >
                      <span
                        v-else-if="
                          item.props == 'plannedInvest' ||
                          item.props == 'setPrice'
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
            <div :style="{ height: tableHeight + 'px' }">
              <tableList
                :selection="false"
                :tableTitle="tableTitle"
                :tableData="tableData"
                class="rsTable"
                tableRowClassName="table-row"
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

                <!-- 年降 -->
                <template #ltc="scope">
                  <span>{{ resetLtcData(scope.row.ltcs, "ltc") }}</span>
                </template>

                <!-- 年降开始时间 -->
                <template #beginYearReduce="scope">
                  <span>{{
                    resetLtcData(scope.row.ltcs, "beginYearReduce")
                  }}</span>
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
                <!-- <template #demand="scope">
                  <span>{{ scope.row.demand | kFilter }}</span>
                </template>
                <template #output="scope">
                  <span>{{ scope.row.output | kFilter }}</span>
                </template> -->
                <template #presentPrice="scope">
                  <span>{{ scope.row.presentPrice | toThousands }}</span>
                </template>

                <template #cfTargetAPrice="scope">
                  <div v-if="scope.row.cfApplyType === 'SKDLC'">
                    <p>{{ scope.row.cfTargetSkdAPrice | toThousands }}</p>
                    <p>{{ scope.row.cfTargetAPrice | toThousands }}</p>
                  </div>
                  <span v-else-if="scope.row.cfApplyType === 'SKD'">{{
                    scope.row.cfTargetSkdAPrice | toThousands
                  }}</span>
                  <span v-else>{{
                    scope.row.cfTargetAPrice | toThousands
                  }}</span>
                </template>

                <template #cfTargetBPrice="scope">
                  <div v-if="scope.row.cfApplyType === 'SKDLC'">
                    <p>{{ scope.row.cfTargetSkdBPrice | toThousands }}</p>
                    <p>{{ scope.row.cfTargetBPrice | toThousands }}</p>
                  </div>
                  <span v-else-if="scope.row.cfApplyType === 'SKD'">{{
                    scope.row.cfTargetSkdBPrice | toThousands
                  }}</span>
                  <span v-else>{{
                    scope.row.cfTargetBPrice | toThousands
                  }}</span>
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
                            scope.row.moldApportionPrice || "0.00"
                          }}
                        </div>
                        <div>
                          {{ language("WEIFENTANJINE", "未分摊金额") }}：{{
                            scope.row.unShareInvestPrice || "0.00"
                          }}
                        </div>
                      </div>
                      <div slot="reference">
                        <p>{{ scope.row.skdInvestFee | toThousands(true) }}</p>
                        <p>
                          <span
                            v-if="scope.row.investFeeIsShared"
                            style="color: red"
                            >*</span
                          >
                          <span>{{
                            scope.row.investFee | toThousands(true)
                          }}</span>
                        </p>
                      </div>
                    </el-popover>
                  </div>
                  <span v-else-if="scope.row.status === 'SKD'">
                    <p>{{ scope.row.skdInvestFee | toThousands(true) }}</p>
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
                            scope.row.moldApportionPrice || "0.00"
                          }}
                        </div>
                        <div>
                          {{ language("WEIFENTANJINE", "未分摊金额") }}：{{
                            scope.row.unShareInvestPrice || "0.00"
                          }}
                        </div>
                      </div>
                      <div slot="reference">
                        <span
                          v-if="scope.row.investFeeIsShared"
                          style="color: red"
                          >*</span
                        >
                        <span>{{
                          scope.row.investFee | toThousands(true)
                        }}</span>
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
                            scope.row.developApportionPrice || "0.00"
                          }}
                        </div>
                        <div>
                          {{ language("WEIFENTANJINE", "未分摊金额") }}：{{
                            scope.row.unShareDevPrice || "0.00"
                          }}
                        </div>
                      </div>
                      <div slot="reference">
                        <p>{{ scope.row.skdDevFee | toThousands(true) }}</p>
                        <p>
                          <span
                            v-if="scope.row.investFeeIsShared"
                            style="color: red"
                            >*</span
                          >
                          <span>{{
                            scope.row.devFee | toThousands(true)
                          }}</span>
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
                            scope.row.developApportionPrice || "0.00"
                          }}
                        </div>
                        <div>
                          {{ language("WEIFENTANJINE", "未分摊金额") }}：{{
                            scope.row.unShareDevPrice || "0.00"
                          }}
                        </div>
                      </div>
                      <div slot="reference">
                        <span v-if="scope.row.devFeeIsShared" style="color: red"
                          >*</span
                        >
                        <span>{{ scope.row.devFee | toThousands(true) }}</span>
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
              <div style="margin-left: 20px">
                <span style="color: red">*</span><span>代表投资费已分摊</span>
              </div>
              <!-- 最后一页表格，且剩余空间有备注 -->
              <div
                v-if="index == tableList.length - 1 && residualRemark.length"
              >
                <div>
                  <div class="beizhu">
                    备注 Remarks:
                    <div class="beizhu-value">
                      <p v-for="(item, index) in residualRemark" :key="index">
                        {{ item }}<br />
                      </p>
                    </div>
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
                  <div class="padding-top10">
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
                <!-- hasLastPage为false，remarkList:备注也不分页，签字栏不用另起一页 -->
                <template v-if="!hasLastPage && !remarkList.length">
                  <iCard
                    v-if="!showSignatureForm && !isAuth"
                    class="checkDate rsCard Application"
                    :title="`Application Date：${dateFilter(
                      processApplyDate,
                      'YYYY-MM-DD'
                    )}`"
                  >
                    <div class="checkList">
                      <div
                        class="checkList-item"
                        v-for="(item, index) in checkList"
                        :key="index"
                      >
                        <icon
                          v-if="item.approveStatus === true"
                          name="iconrs-wancheng"
                          class="complete"
                        ></icon>
                        <icon
                          v-else-if="item.approveStatus === false"
                          name="iconrs-quxiao"
                          class="cancel"
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
                          <span>{{
                            item.approveDate | dateFilter("YYYY-MM-DD")
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </iCard>
                </template>
              </div>
            </div>
            <div class="page-logo">
              <img
                src="../../../../../../../assets/images/logo.png"
                alt=""
                :height="46 * 0.6 + 'px'"
                :width="126 * 0.6 + 'px'"
              />
              <div>
                <p class="pageNum"></p>
              </div>
              <div>
                <p>{{ userName }}</p>
                <p>{{ new Date().getTime() | dateFilter("YYYY-MM-DD") }}</p>
              </div>
            </div>
          </div>
        </iCard>
      </div>
    </template>
    <!-- 如果备注有分页 -->
    <div v-if="remarkList.length">
      <template v-for="(remark, i) in remarkList">
        <div class="pageCard-main" :key="i">
          <slot name="tabTitle"></slot>
          <iCard class="rsCard pageCard">
            <template #header>
              <div class="title">
                <p>CSC定点推荐 - {{ cardTitle }}</p>
                <p>{{ cardTitleEn }}</p>
              </div>
              <div>
                <div class="control">
                  <div class="nomiId" :class="isSingle ? 'margin-right20' : ''">
                    定点申请单号：{{
                      $route.query.desinateId
                        ? $route.query.desinateId
                        : nominateId
                    }}
                  </div>
                  <div class="singleSourcing" v-if="isSingle">
                    Single Sourcing
                  </div>
                </div>
              </div>
            </template>
            <div class="rsTop">
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
                        v-if="
                          item.props == 'mtz' || item.props == 'isApportion'
                        "
                        style="word-wrap: break-word"
                        >{{ basicData[item.props] | booleanFilter }}</span
                      >
                      <span
                        v-else-if="
                          item.props == 'plannedInvest' ||
                          item.props == 'setPrice'
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
            <div :style="{ height: otherPageHeight + 'px' }">
              <div class="beizhu" v-if="remark.length">
                备注 Remarks:
                <div class="beizhu-value">
                  <p v-for="(item, index) in remark" :key="index">
                    {{ item }}<br />
                  </p>
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
              <!-- hasLastPage为false，签字栏不用另起一页 -->
              <template v-if="!hasLastPage && i == remarkList.length - 1">
                <iCard
                  v-if="!showSignatureForm && !isAuth"
                  class="checkDate rsCard Application"
                  :title="`Application Date：${dateFilter(
                    processApplyDate,
                    'YYYY-MM-DD'
                  )}`"
                >
                  <div class="checkList">
                    <div
                      class="checkList-item"
                      v-for="(item, index) in checkList"
                      :key="index"
                    >
                      <icon
                        v-if="item.approveStatus === true"
                        name="iconrs-wancheng"
                        class="complete"
                      ></icon>
                      <icon
                        v-else-if="item.approveStatus === false"
                        name="iconrs-quxiao"
                        class="cancel"
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
                        <span>{{
                          item.approveDate | dateFilter("YYYY-MM-DD")
                        }}</span>
                      </div>
                    </div>
                  </div>
                </iCard>
              </template>
            </div>
            <div class="page-logo">
              <img
                src="../../../../../../../assets/images/logo.png"
                alt=""
                :height="46 * 0.6 + 'px'"
                :width="126 * 0.6 + 'px'"
              />
              <div>
                <p class="pageNum"></p>
              </div>
              <div>
                <p>{{ userName }}</p>
                <p>{{ new Date().getTime() | dateFilter("YYYY-MM-DD") }}</p>
              </div>
            </div>
          </iCard>
        </div>
      </template>
    </div>
    <!-- hasLastPage为true，签字栏另起一页 -->
    <div v-if="hasLastPage">
      <div class="pageCard-main">
        <slot name="tabTitle"></slot>
        <iCard class="rsCard pageCard">
          <template #header>
            <div class="title">
              <p>CSC定点推荐 - {{ cardTitle }}</p>
              <p>{{ cardTitleEn }}</p>
            </div>
            <div>
              <div class="control">
                <div class="nomiId" :class="isSingle ? 'margin-right20' : ''">
                  定点申请单号：{{
                    $route.query.desinateId
                      ? $route.query.desinateId
                      : nominateId
                  }}
                </div>
                <div class="singleSourcing" v-if="isSingle">
                  Single Sourcing
                </div>
              </div>
            </div>
          </template>
          <div class="rsTop">
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
                        item.props == 'plannedInvest' ||
                        item.props == 'setPrice'
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
          <div :style="{ height: otherPageHeight + 'px' }">
            <iCard
              v-if="!showSignatureForm && !isAuth"
              class="checkDate rsCard Application"
              :title="`Application Date：${dateFilter(
                processApplyDate,
                'YYYY-MM-DD'
              )}`"
            >
              <div class="checkList">
                <div
                  class="checkList-item"
                  v-for="(item, index) in checkList"
                  :key="index"
                >
                  <icon
                    v-if="item.approveStatus === true"
                    name="iconrs-wancheng"
                    class="complete"
                  ></icon>
                  <icon
                    v-else-if="item.approveStatus === false"
                    name="iconrs-quxiao"
                    class="cancel"
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
                    <span>{{
                      item.approveDate | dateFilter("YYYY-MM-DD")
                    }}</span>
                  </div>
                </div>
              </div>
            </iCard>
          </div>
          <div class="page-logo">
            <img
              src="../../../../../../../assets/images/logo.png"
              alt=""
              :height="46 * 0.6 + 'px'"
              :width="126 * 0.6 + 'px'"
            />
            <div>
              <p class="pageNum"></p>
            </div>
            <div>
              <p>{{ userName }}</p>
              <p>{{ new Date().getTime() | dateFilter("YYYY-MM-DD") }}</p>
            </div>
          </div>
        </iCard>
      </div>
    </div>
    <template v-for="(tableData, key) in prototypeTableList">
      <div :key="key" class="pageCard-main" v-if="tableData.length">
        <slot name="tabTitle"></slot>
        <iCard
          title="Prototype Cost List"
          class="rsCard pageCard"
          v-if="!showSignatureForm && prototypeList.length > 5"
        >
          <div :style="{ height: prototypeListPageHeight + 'px' }">
            <el-table :data="tableData" class="prototypeTable">
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
          <div class="page-logo">
            <img
              src="../../../../../../../assets/images/logo.png"
              alt=""
              :height="46 * 0.6 + 'px'"
              :width="126 * 0.6 + 'px'"
            />
            <div>
              <p class="pageNum"></p>
            </div>
            <div>
              <p>{{ userName }}</p>
              <p>{{ new Date().getTime() | dateFilter("YYYY-MM-DD") }}</p>
            </div>
          </div>
        </iCard>
      </div>
    </template>
  </div>
</template>

<script>
import { iCard, icon } from "rise";
import tableList from "@/views/designate/designatedetail/components/tableList";
import { partProjTypes } from "@/config";
import { resetLtcData, remarkProcess } from "./data";
import { toThousands } from "@/utils";
import filters from "@/utils/filters";
import { dateFilter } from "../circulation/data";

export default {
  mixins: [filters],
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
    remarkItem: { type: Array, default: () => [] },
    remarkList: { type: Array, default: () => [] },
    residualRemark: { type: Array, default: () => [] },
    projectType: { type: String, default: "" },
    exchangeRageCurrency: { type: Array, default: () => [] },
    exchangeRates: { type: Array, default: () => [] },
    showSignatureForm: { type: Boolean, default: false },
    isAuth: { type: Boolean, default: false },
    checkList: { type: Array, default: () => [] },
    processApplyDate: { type: String, default: "" },
    prototypeList: { type: Array, default: () => [] },
    prototypeTitleList: { type: Array, default: () => [] },
    tableHeight: { type: Number, default: 0 },
    otherPageHeight: { type: Number, default: 0 },
    prototypeListPageHeight: { type: Number, default: 0 },
    tableList: { type: Array, default: () => [[]] },
    prototypeTableList: { type: Array, default: () => [] },
    hasLastPage: { type: Boolean, default: false },
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
  },
  data() {
    return {
      partProjTypes,
    };
  },
  computed: {
    userName() {
      return this.$i18n.locale === "zh"
        ? this.$store.state.permission.userInfo.nameZh
        : this.$store.state.permission.userInfo.nameEn;
    },
  },
  methods: {
    remarkProcess,
    dateFilter,
    resetLtcData,
  },
};
</script>

<style lang="scss" scoped>
.pageCard-main {
  min-width: 100%;
  width: 100%;
  overflow-y: auto;

  .rsCard {
    box-shadow: none;

    ::v-deep .title {
      font-size: 18px !important;
    }

    ::v-deep .cardHeader {
      padding: 30px 0px;
    }
    ::v-deep .cardBody {
      padding: 0px;
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
    padding: 8px 12px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(22, 96, 241, 1);
    border: 1px dashed #67C23A;
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
        font-size: 12px;
        display: flex;
        margin-bottom: 12px;
        &:last-of-type {
          margin-bottom: 26px;
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
      border-radius: 5px 5px 0 0;
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
          padding: 6px 24px;
          width: 40%;
          font-weight: bold;
          // line-height: 29px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        &-value {
          width: 60%;
          padding: 6px 24px;
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
  .prototypeTable {
    ::v-deep tr {
      &:nth-child(even) {
        background-color: #f7f7ff;
      }
    }
  }
  .rsTable {
    &.el-table--group,
    &.el-table--border {
      border-color: #ccc;
    }
    font-size: 8px;
    &::before,
    &::after {
      background-color: #ccc;
    }
    ::v-deep .el-table__fixed::before,
    .el-table__fixed-right::before {
      background-color: #ccc;
    }
    ::v-deep thead th {
      padding-top: 8px;
      padding-bottom: 8px;
      & > .cell {
        padding-left: 3px;
        padding-right: 3px;
        line-height: unset;
        font-size: 12px;
        p {
          margin: 0;
          min-height: 16px;
        }
        // p + p {
        //   margin-top: 8px;
        // }
      }
    }

    ::v-deep tr {
      td {
        border-top: 1px solid #ccc;
        & > .cell {
          margin: 0;
          padding-left: 3px;
          padding-right: 3px;
					line-height: unset;
        }
      }
      &:nth-child(even) {
        background-color: #f7f7ff;
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
      margin-left: 20px;
      p {
        word-break: break-word;
      }
    }
  }

  .checkDate {
    ::v-deep .card .cardHeader .title {
      font-weight: 400;
      color: rgba(75, 75, 76, 1);
    }
  }

  .Application {
    ::v-deep .cardHeader {
      padding-top: 12px;
      padding-bottom: 12px;
      .title .title_content {
        font-size: 13px !important;
      }
    }
  }

  .checkList {
    display: flex;
    overflow: auto;
    &-item {
      max-width: 224px;
      flex: 1;
      flex-shrink: 0;
      width: 224px;
      height: 125px;
      border-radius: 15px;
      background-color: rgba(205, 212, 226, 0.12);
      margin-right: 19px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 10px 15px;
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
    &-item:last-child {
      margin-right: 0;
    }
  }

  .complete {
    color: rgb(104, 193, 131);
  }

  .cancel {
    color: rgb(95, 104, 121);
  }
  .pdf-content {
    & + .pdf-content {
      margin-top: 20px;
    }
  }
  .pdf-content,
  .pageCard {
    ::v-deep .cardHeader {
      padding-left: 0;
    }
    ::v-deep .cardBody {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .page-logo {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    border-top: 1px solid #666;
  }
}
</style>
