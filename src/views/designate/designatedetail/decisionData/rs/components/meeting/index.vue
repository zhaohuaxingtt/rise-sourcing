<!--
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:17:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-13 11:28:03
 * @Description: 上会/备案RS单
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\rs\components\meeting\index.vue
-->

<template>
  <div class="meeting" ref="meeting" :class="isPreview && 'isPreview'">
    <div class="demo" :style="{'width': pageWidth + 'px'}">
      <div ref="tabTitle" style="padding:1px">
        <slot name="tabTitle"></slot>
      </div>
      <div ref="pdf-table">
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
          <div class="rsTop page-top">
            <div class="rsTop-left">
              <div class="rsTop-left-item" v-for="(item, index) in leftTitle" :key="index">
                <div class="rsTop-left-item-title">
                  <p>{{ item.name }}</p><p>{{ item.enName }}</p>
                </div>
                <div class="rsTop-left-item-value">{{ basicData[item.props] }}</div>
              </div>
            </div>
            <div class="rsTop-right">
              <div v-for="(item, index) in rightTitle" :key="index"  class="rsTop-right-item">
                <template v-if="Array.isArray(item)">
                  <div class="rsTop-right-item-title">
                    <div v-for="(subItem, subIndex) in item" :key="subIndex"> {{subItem.name}} {{subItem.enName}} <br v-if="subIndex < item.length - 1" /></div>
                  </div>
                  <div class="rsTop-right-item-value">
                    <div v-for="(subItem, subIndex) in item" :key="subIndex">
                      {{subItem.props === 'currency' ? (basicData.currencyMap && basicData.currencyMap[basicData.currency] ? basicData.currencyMap[basicData.currency].code : basicData.currency) : basicData[subItem.props]}}<br v-if="subIndex < item.length - 1" /></div>
                  </div>
                </template>
                <template v-else>
                  <div  class="rsTop-right-item-title">{{item.name}}<br>{{item.enName}}</div>
                    <div class="rsTop-right-item-value" v-if="item.props == 'suppliersNow'" >
                      <div v-for="(item,index) in basicData[item.props]" :key="index">
                          <el-tooltip :content="`${item.shortNameZh}/${item.shortNameEn}`" placement="top" effect="light">
                            <div  style="overflow: hidden;text-overflow: ellipsis;width:100%"><span style="white-space: nowrap">{{item.shortNameZh}}/</span>
                            <span style="white-space: nowrap">{{item.shortNameEn}}</span><br/></div>
                          </el-tooltip>
                      </div>
                    </div>
                    <div class="rsTop-right-item-value" v-else >
                      <span v-if="item.props == 'mtz' || item.props == 'isApportion'" style="word-wrap: break-word;">{{ basicData[item.props] | booleanFilter }}</span>
                      <span v-else-if="item.props == 'plannedInvest' || item.props == 'setPrice'" style="word-wrap: break-word;">{{ basicData[item.props] | toThousands(true) }}</span>
                      <span v-else v-html="basicData[item.props]" style="word-wrap: break-word;"></span>
                    </div>
                </template>
              </div>
            </div>
          </div>
          <tableList v-update :selection="false" :tableLoading="tableLoading" :tableTitle="tableTitle" :tableData="tableData" class="rsTable mainTable" tableRowClassName="table-row" border>
            <template #fsnrGsnrNum="scope">
              <div>
                <p>{{ scope.row.fsnrGsnrNum }}</p>
                <p>{{ scope.row.purchasingFactoryShortName ? `(${ scope.row.purchasingFactoryShortName })` : '' }}</p>
              </div>
            </template>
            
            <!-- 年降 -->
            <template #ltc="scope">
              <span>{{resetLtcData(scope.row.ltcs,'ltc')}}</span>
            </template>

            <!-- 年降开始时间 -->
            <template #beginYearReduce="scope">
              <span>{{resetLtcData(scope.row.ltcs,'beginYearReduce')}}</span>
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
              <div v-if="scope.row.status === 'SKDLC'">
                <p>{{ scope.row.cfTargetSkdAPrice | toThousands }}</p>
                <p>{{ scope.row.cfTargetAPrice | toThousands }}</p>
              </div>
              <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.cfTargetSkdAPrice | toThousands }}</span>
              <span v-else>{{ scope.row.cfTargetAPrice | toThousands }}</span>
            </template>

            <template #cfTargetBPrice="scope">
              <div v-if="scope.row.status === 'SKDLC'">
                <p>{{ scope.row.cfTargetSkdBPrice | toThousands }}</p>
                <p>{{ scope.row.cfTargetBPrice | toThousands }}</p>
              </div>
              <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.cfTargetSkdBPrice | toThousands }}</span>
              <span v-else>{{ scope.row.cfTargetBPrice | toThousands }}</span>
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
              <div v-if="scope.row.status === 'SKDLC'">
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  :disabled="!scope.row.investFeeIsShared">
                  <div>
                    <div>{{ language("FENTANJINE", "分摊金额") }}：{{ scope.row.moldApportionPrice || "0.00" }}</div>
                    <div>{{ language("WEIFENTANJINE", "未分摊金额") }}：{{ scope.row.unShareInvestPrice || "0.00" }}</div>
                  </div>
                  <div slot="reference">
                    <p>{{ scope.row.skdInvestFee | toThousands(true) }}</p>
                    <p><span v-if="scope.row.investFeeIsShared" style="color: red">*</span> <span>{{ scope.row.investFee | toThousands(true) }}</span></p>
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
                  :disabled="!scope.row.investFeeIsShared">
                  <div>
                    <div>{{ language("FENTANJINE", "分摊金额") }}：{{ scope.row.moldApportionPrice || "0.00" }}</div>
                    <div>{{ language("WEIFENTANJINE", "未分摊金额") }}：{{ scope.row.unShareInvestPrice || "0.00" }}</div>
                  </div>
                  <div slot="reference">
                    <span v-if="scope.row.investFeeIsShared" style="color: red">*</span> <span>{{ scope.row.investFee | toThousands(true) }}</span>
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
                  :disabled="!scope.row.devFeeIsShared">
                  <div>
                    <div>{{ language("FENTANJINE", "分摊金额") }}：{{ scope.row.developApportionPrice || "0.00" }}</div>
                    <div>{{ language("WEIFENTANJINE", "未分摊金额") }}：{{ scope.row.unShareDevPrice || "0.00" }}</div>
                  </div>
                  <div slot="reference">
                    <p>{{ scope.row.skdDevFee | toThousands(true) }}</p>
                    <p><span v-if="scope.row.investFeeIsShared" style="color: red">*</span> <span>{{ scope.row.devFee | toThousands(true) }}</span></p>
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
                  :disabled="!scope.row.devFeeIsShared">
                  <div>
                    <div>{{ language("FENTANJINE", "分摊金额") }}：{{ scope.row.developApportionPrice || "0.00" }}</div>
                    <div>{{ language("WEIFENTANJINE", "未分摊金额") }}：{{ scope.row.unShareDevPrice || "0.00" }}</div>
                  </div>
                  <div slot="reference">
                    <span v-if="scope.row.devFeeIsShared" style="color: red">*</span> <span>{{ scope.row.devFee | toThousands(true) }}</span>
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
          <!-- v-if="isPreview" -->
          <div class="require-start">
            <div style="margin-left:20px">
              <span style="color: red">*</span><span>代表投资费已分摊</span>
            </div>
          </div>
          <div class="out-compute">
            <div class="beizhu">
              备注 Remarks:
              <div class="beizhu-value">
                <p class="remarkItem" v-for="(item,index) in getRemarkAll" :key="index">{{item}}</p>
              </div>
            </div>
            <div ref="other">
              <div v-if="projectType === partProjTypes.DBLINGJIAN || projectType === partProjTypes.DBYICHIXINGCAIGOU" style="text-align:right;">
                汇率：Exchange rate: 
              汇率：Exchange rate: 
                汇率：Exchange rate: 
                <span class="exchangeRageCurrency" v-for="item in exchangeRageCurrency" :key="item">
                  1{{basicData.currencyMap && basicData.currencyMap[item] ? basicData.currencyMap[item].code : item}}={{basicData.currencyRateMap[item]}}{{basicData.currencyMap.RMB ? basicData.currencyMap.RMB.code : 'RMB'}}
                </span>
              </div>
              <div class="margin-top10" v-else>
                <p v-for="(exchangeRate, index) in exchangeRates" :key="index">Exchange rate{{ exchangeRate.fsNumsStr ? ` ${ index + 1 }` : '' }}: {{ exchangeRate.str }}{{ exchangeRate.fsNumsStr ? `（${ exchangeRate.fsNumsStr }）` : '' }}</p>
              </div>
            </div>
          </div>
        </iCard>
      </div>
      <iCard v-if="!showSignatureForm && !isAuth" class="checkDate Application" :class="!isPreview && 'margin-top20'" :title="`Application Date：${ dateFilter(processApplyDate, 'YYYY-MM-DD') }`">
        <div class="checkList">
          <div class="checkList-item" v-for="(item, index) in checkList" :key="index">
            <icon v-if="item.approveStatus === true" symbol name="iconrs-wancheng"></icon>
            <icon v-else-if="item.approveStatus === false" symbol name="iconrs-quxiao"></icon>
            <div v-else class="" >-</div>
            <div class="checkList-item-info">
              <span>Dept.:</span>
              <span class="checkList-item-info-depart">{{item.approveDeptNumName}}</span>
            </div>
            <div class="checkList-item-info">
              <span>Date:</span>
              <span>{{ dateFilter(item.approveDate, 'YYYY-MM-DD') }}</span>
            </div>
          </div>
        </div>
      </iCard>
      <div ref="pdf-list">
        <iCard title="Prototype Cost List" class="margin-top20">
            <el-table :data='PrototypeList' class="prototypeList" row-class-name="list-row">
              <template v-for="(items,index) in prototypeTitleList">
                <el-table-column :key="index" :prop="items.props" align="center" :label="language(items.i18nKey,items.i18nName)"></el-table-column>
              </template>
            </el-table>
        </iCard>
      </div>
      <div class="page-logo" ref="logo">
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
    <div class="rsPdfWrapper" :style="{'width':pageWidth + 'px'}">
      <rsPdf
        ref="rsPdf"
        :cardTitle="cardTitle"
        :cardTitleEn="cardTitleEn"
        :isSingle="isSingle"
        :leftTitle="leftTitle"
        :rightTitle="rightTitle"
        :basicData="basicData"
        :tableTitle="tableTitle"
        :tableData="tableData"
        :remarkItem="remarkItem"
        :remarkList="remarkList"
        :projectType="projectType"
        :exchangeRageCurrency="exchangeRageCurrency"
        :exchangeRates="exchangeRates"
        :showSignatureForm="showSignatureForm"
        :isAuth="isAuth"
        :checkList="checkList"
        :processApplyDate="processApplyDate"
        :prototypeList="PrototypeList"
        :tableList="tableList"
        :tableHeight="tableHeight"
        :otherPageHeight="otherPageHeight"
        :hasOtherPage="hasOtherPage"
        :residualRemark="residualRemark"
        :hasLastPage="hasLastPage"
        :prototypeListPageHeight="prototypeListPageHeight"
        :prototypeTableList="prototypeTableList"
        :prototypeTitleList="prototypeTitleList" >
        <template #tabTitle>
          <slot name="tabTitle"></slot>
        </template>
        </rsPdf>
    </div>
    <iCard class="rsCard">
      <template #header>
        <div v-if="!isRoutePreview && !isApproval" class="btnWrapper">
          <iButton @click="handleExportPdf" :loading="loading">{{ language("DAOCHURSDAN", "导出RS单") }}</iButton>
        </div>
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
      <div class="rsTop page-top">
        <div class="rsTop-left">
          <div class="rsTop-left-item" v-for="(item, index) in leftTitle" :key="index">
            <div class="rsTop-left-item-title">
              <p>{{ item.name }}</p><p>{{ item.enName }}</p>
            </div>
            <div class="rsTop-left-item-value">{{ basicData[item.props] }}</div>
          </div>
        </div>
        <div class="rsTop-right">
          <div v-for="(item, index) in rightTitle" :key="index"  class="rsTop-right-item">
            <template v-if="Array.isArray(item)">
              <div class="rsTop-right-item-title">
                 <div v-for="(subItem, subIndex) in item" :key="subIndex"> {{subItem.name}} {{subItem.enName}} <br v-if="subIndex < item.length - 1" /></div>
              </div>
              <div class="rsTop-right-item-value">
                <div v-for="(subItem, subIndex) in item" :key="subIndex">
                  {{subItem.props === 'currency' ? (basicData.currencyMap && basicData.currencyMap[basicData.currency] ? basicData.currencyMap[basicData.currency].code : basicData.currency) : basicData[subItem.props]}}<br v-if="subIndex < item.length - 1" /></div>
              </div>
            </template>
            <template v-else>
              <div  class="rsTop-right-item-title">{{item.name}}<br>{{item.enName}}</div>
                <div class="rsTop-right-item-value" v-if="item.props == 'suppliersNow'" >
                  <div v-for="(item,index) in basicData[item.props]" :key="index">
                      <el-tooltip :content="`${item.shortNameZh}/${item.shortNameEn}`" placement="top" effect="light">
                        <div  style="overflow: hidden;text-overflow: ellipsis;width:100%"><span style="white-space: nowrap">{{item.shortNameZh}}/</span>
                        <span style="white-space: nowrap">{{item.shortNameEn}}</span><br/></div>
                      </el-tooltip>
                  </div>
                </div>
                <div class="rsTop-right-item-value" v-else >
                  <span v-if="item.props == 'mtz' || item.props == 'isApportion'" style="word-wrap: break-word;">{{ basicData[item.props] | booleanFilter }}</span>
                  <span v-else-if="item.props == 'plannedInvest' || item.props == 'setPrice'" style="word-wrap: break-word;">{{ basicData[item.props] | toThousands(true) }}</span>
                  <span v-else v-html="basicData[item.props]" style="word-wrap: break-word;"></span>
                </div>
            </template>
          </div>
        </div>
      </div>
      <tableList v-update :selection="false" :tableLoading="tableLoading" :tableTitle="tableTitle" :tableData="tableData" class="rsTable" border>
        <template #fsnrGsnrNum="scope">
          <div>
            <p>{{ scope.row.fsnrGsnrNum }}</p>
            <p>{{ scope.row.purchasingFactoryShortName ? `(${ scope.row.purchasingFactoryShortName })` : '' }}</p>
          </div>
        </template>

				<!-- 年降开始时间 -->
				<template #beginYearReduce="scope">
					<span>{{ resetLtcData(scope.row.ltcs, 'beginYearReduce') }}</span>
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
          <div v-if="scope.row.status === 'SKDLC'">
            <p>{{ scope.row.cfTargetSkdAPrice | toThousands }}</p>
            <p>{{ scope.row.cfTargetAPrice | toThousands }}</p>
          </div>
          <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.cfTargetSkdAPrice | toThousands }}</span>
          <span v-else>{{ scope.row.cfTargetAPrice | toThousands }}</span>
        </template>

        <template #cfTargetBPrice="scope">
          <div v-if="scope.row.status === 'SKDLC'">
            <p>{{ scope.row.cfTargetSkdBPrice | toThousands }}</p>
            <p>{{ scope.row.cfTargetBPrice | toThousands }}</p>
          </div>
          <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.cfTargetSkdBPrice | toThousands }}</span>
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
									{{ language('FENTANJINE', '分摊金额') }}：{{
										scope.row.moldApportionPrice || '0.00'
									}}
								</div>
								<div>
									{{ language('WEIFENTANJINE', '未分摊金额') }}：{{
										scope.row.unShareInvestPrice || '0.00'
									}}
								</div>
							</div>
							<div slot="reference">
								<p>{{ scope.row.skdInvestFee | toThousands(true) }}</p>
								<p>
									<span v-if="scope.row.investFeeIsShared" style="color: red"
										>*</span
									>
									<span>{{ scope.row.investFee | toThousands(true) }}</span>
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
									{{ language('FENTANJINE', '分摊金额') }}：{{
										scope.row.moldApportionPrice || '0.00'
									}}
								</div>
								<div>
									{{ language('WEIFENTANJINE', '未分摊金额') }}：{{
										scope.row.unShareInvestPrice || '0.00'
									}}
								</div>
							</div>
							<div slot="reference">
								<span v-if="scope.row.investFeeIsShared" style="color: red"
									>*</span
								>
								<span>{{ scope.row.investFee | toThousands(true) }}</span>
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
									{{ language('FENTANJINE', '分摊金额') }}：{{
										scope.row.developApportionPrice || '0.00'
									}}
								</div>
								<div>
									{{ language('WEIFENTANJINE', '未分摊金额') }}：{{
										scope.row.unShareDevPrice || '0.00'
									}}
								</div>
							</div>
							<div slot="reference">
								<p>{{ scope.row.skdDevFee | toThousands(true) }}</p>
								<p>
									<span v-if="scope.row.investFeeIsShared" style="color: red"
										>*</span
									>
									<span>{{ scope.row.devFee | toThousands(true) }}</span>
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
									{{ language('FENTANJINE', '分摊金额') }}：{{
										scope.row.developApportionPrice || '0.00'
									}}
								</div>
								<div>
									{{ language('WEIFENTANJINE', '未分摊金额') }}：{{
										scope.row.unShareDevPrice || '0.00'
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
      <!-- v-if="isPreview" -->
      <div class="out-compute">
        <div style="margin-left:20px">
          <span style="color: red">*</span><span>代表投资费已分摊</span>
        </div>
        <div class="beizhu">
          备注 Remarks:
          <div class="beizhu-value">
            <p v-for="(item,index) in remarkItem" :key="index" v-html="remarkProcess(item&&item.value)"></p>
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
      </div>
    </iCard>
    <iCard v-if="!isPreview && !showSignatureForm && !isAuth" :title="language('SHANGHUIBEIZHU','上会备注')" class="margin-top20">
      <iButton slot="header-control" @click="handleSaveRemarks" :loading="saveLoading" v-permission.auto="SOURCING_NOMINATION_ATTATCH_RS_SAVE|保存">{{language('BAOCUN','保存')}}</iButton>
      <div>
        <div class="meetingRemark" v-if="isApproval">
          <div class="meetingRemark-item" v-for="(item, index) in remarkItem" :key="index">
            <span class="meetingRemark-item-title">{{language(item.key,item.label)}}</span>
            <iInput class="margin-top10" type="textarea" maxlength="3500" :rows="10" resize="none" v-model="remarks[item.type]" disabled></iInput>
          </div>
        </div>
        <div class="meetingRemark" v-else>
          <div class="meetingRemark-item" v-for="(item, index) in remarkItem" :key="index" v-permission.dynamic.auto="item.permissionKey">
            <span class="meetingRemark-item-title">{{language(item.key,item.label)}}</span>
            <iInput class="margin-top10" type="textarea" maxlength="3500" :rows="10" resize="none" v-model="remarks[item.type]" @input="val => handleInput(val, item.type)"></iInput>
          </div>
        </div>
      </div>
    </iCard>
    <iCard v-if="!showSignatureForm && !isAuth" class="checkDate Application" :class="!isPreview && 'margin-top20'" :title="`Application Date：${ dateFilter(processApplyDate, 'YYYY-MM-DD') }`">
      <div class="checkList">
        <div class="checkList-item" v-for="(item, index) in checkList" :key="index">
          <icon v-if="item.approveStatus === true" symbol name="iconrs-wancheng"></icon>
          <icon v-else-if="item.approveStatus === false" symbol name="iconrs-quxiao"></icon>
          <div v-else class="" >-</div>
          <div class="checkList-item-info">
            <span>Dept.:</span>
            <span class="checkList-item-info-depart">{{item.approveDeptNumName}}</span>
          </div>
          <div class="checkList-item-info">
            <span>Date:</span>
            <span>{{ dateFilter(item.approveDate, 'YYYY-MM-DD') }}</span>
          </div>
        </div>
      </div>
    </iCard>
    <iCard title="Prototype Cost List" class="margin-top20" v-if='!showSignatureForm && PrototypeList.length > 5'>
      <el-table :data='PrototypeList' class="prototypeList">
        <template v-for="(items,index) in prototypeTitleList">
          <el-table-column :key="index" :prop="items.props" align="center" :label="language(items.i18nKey,items.i18nName)"></el-table-column>
        </template>
      </el-table>
    </iCard>
    <canvas id="myCanvas"></canvas>
  </div>
</template>

<script>
import { iCard, iButton, iInput, icon, iMessage } from 'rise'
import { nomalDetailTitle,nomalDetailTitleGS,nomalDetailTitlePF, nomalDetailTitleBlue, nomalTableTitle, meetingRemark, checkList, gsDetailTitleBlue, gsTableTitle,sparePartTableTitle,accessoryTableTitle,prototypeTitleList,dbTableTitle, resetLtcData, remarkProcess } from './data'
import tableList from '@/views/designate/designatedetail/components/tableList'
import {
	getList,
	getRemark,
	updateRemark,
	getPrototypeList,
	getDepartApproval,
	searchRsPageExchangeRate,
	reviewListRs,
} from '@/api/designate/decisiondata/rs'
import { partProjTypes } from '@/config'
import { findFrontPageSeat, decisionDownloadPdfLogo } from '@/api/designate'
import { toThousands } from '@/utils'
import { transverseDownloadPDF } from '@/utils/pdf'
import rsPdf from './rsPdf'
import { uploadUdFile } from '@/api/file/upload'
import { dateFilter } from '../circulation/data'

export default {
	props: {
		isPreview: { type: Boolean, default: false },
		nominateId: { type: String },
		// projectType: {type:String},
		showSignatureForm: { type: Boolean, default: false },
	},
	components: { iCard, tableList, iButton, iInput, icon, rsPdf },
	data() {
		return {
			loading: false,
			// 零件项目类型
			partProjTypes,
			remarks: {},
			// leftTitle: nomalDetailTitle,
			// rightTitle: nomalDetailTitleBlue,
			// tableTitle: nomalTableTitle,
			tableData: [],
			basicData: {},
			remarkItem: [],
			checkList: checkList,
			resetRemarkType: '',
			saveLoading: false,
			PrototypeList: [],
			prototypeTitleList: prototypeTitleList,
			processApplyDate: '',
			projectType: '',
			isSingle: false,
			suppliers: '',
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
      otherPageHeight:0,
      hasOtherPage: false,
      hasLastPage:false,
			tableList: [],
			prototypeTableList: [],
      remarkList:[],
      residualRemark:[]
		}
	},
	filters: {
		toThousands,
		booleanFilter(val) {
			const obj = {
				true: 'Y',
				false: 'N',
			}

			return obj[val] || val
		},
		// kFilter(val) {
		//   if (val) return math.divide(math.bignumber(val), 1000).toString()
		//   return val
		// }
	},
	computed: {
		exchangeRageCurrency() {
			if (this.basicData.currencyRateMap) {
				const exchangeRageCurrency = []
				for (var key in this.basicData.currencyRateMap) {
					if (key) {
						exchangeRageCurrency.push(key)
					}
				}
				return exchangeRageCurrency
			}
			return []
		},
		leftTitle() {
			// GS
			if (
				[partProjTypes.GSLINGJIAN, partProjTypes.GSCOMMONSOURCING].includes(
					this.projectType
				)
			) {
				return nomalDetailTitleGS
			}
			// 配附件
			if (
				[partProjTypes.PEIJIAN, partProjTypes.FUJIAN].includes(this.projectType)
			) {
				return nomalDetailTitlePF
			}
			// 其他
			return nomalDetailTitle
		},
		rightTitle() {
			// GS
			if (
				[partProjTypes.GSLINGJIAN, partProjTypes.GSCOMMONSOURCING].includes(
					this.projectType
				)
			) {
				return nomalDetailTitleBlue
			}
			// 其他
			return gsDetailTitleBlue
		},
		tableTitle() {
			if (this.projectType === partProjTypes.PEIJIAN) {
				return sparePartTableTitle
			} else if (this.projectType === partProjTypes.FUJIAN) {
				return accessoryTableTitle
			} else if (
				this.projectType === partProjTypes.GSLINGJIAN ||
				this.projectType === partProjTypes.GSCOMMONSOURCING
			) {
				//GS零件
				return gsTableTitle
			} else if (
				this.projectType === partProjTypes.DBLINGJIAN ||
				this.projectType === partProjTypes.DBYICHIXINGCAIGOU
			) {
				//DB零件,DB一次性采购
				return dbTableTitle
			}
			return nomalTableTitle
		},
		pageWidth() {
			if (this.projectType === partProjTypes.PEIJIAN) {
				return 1441
			} else if (this.projectType === partProjTypes.FUJIAN) {
				return 1351
			} else if (
				this.projectType === partProjTypes.GSLINGJIAN ||
				this.projectType === partProjTypes.GSCOMMONSOURCING
			) {
				//GS零件
				return 1892
			} else if (
				this.projectType === partProjTypes.DBLINGJIAN ||
				this.projectType === partProjTypes.DBYICHIXINGCAIGOU
			) {
				//DB零件,DB一次性采购
				return 1768
			}
			return 1544
		},
    pageHeight() {
      return (this.pageWidth / 841.89) * 595.28; // 横版A4一页对应的高度
    },
		cardTitle() {
			if (this.projectType === partProjTypes.PEIJIAN) {
				return '配件采购'
			} else if (this.projectType === partProjTypes.FUJIAN) {
				return '附件采购'
			}
			return '生产采购'
		},
		cardTitleEn() {
			if (this.projectType === partProjTypes.PEIJIAN) {
				return 'CSC Nomination Recommendation - Spare Part Purchasing'
			} else if (this.projectType === partProjTypes.FUJIAN) {
				return 'CSC Nomination Recommendation – Accessory Purchasing'
			}
			return 'CSC Nomination Recommendation - Production Purchasing'
		},
		getRemarkAll() {
			return this.remarkItem.map((item) => item.value).join('\n').split('\n')
		},
		isRoutePreview() {
			return this.$route.query.isPreview == 1
		},
		isApproval() {
			return this.$route.query.isApproval === 'true'
		},
    userName(){
      return this.$i18n.locale === 'zh' ? this.$store.state.permission.userInfo.nameZh : this.$store.state.permission.userInfo.nameEn
    },
    // hasTitle(){
    //   return this.$slots.tabTitle && 116 || 0
    // }
	},
  watch:{
    pageWidth:{
      immediate:true,
      handler(){
        this.getHeight()
        this.getPrototypeListHeight()
      }
    }
  },
	created() {
		this.isAuth = this.$route.query.type === 'auth'
		// this.getPrototypeList()
	},
	mounted() {},
	methods: {
    remarkProcess,
    dateFilter,
    getHeight(){
        this.hasTitle = this.$refs.tabTitle?.offsetHeight || 0
        let headerHeight = this.$refs['pdf-table']?.getElementsByClassName('cardHeader')[0].offsetHeight // Title 区域高度
        let pageLogo = this.$refs.logo?.offsetHeight || 0     // logo 区域高度
        let tableHeader = this.$refs['pdf-table']?.getElementsByClassName('el-table__header-wrapper')[0]?.offsetHeight || 0
        let pageTop = document.getElementsByClassName('demo')[0]?.getElementsByClassName('page-top')[0]?.offsetHeight || 0  // 顶部内容高度
        let el = document.getElementsByClassName('demo')[0]?.getElementsByClassName('Application')[0]?.offsetHeight || 0  // 审批备注签字栏
        let outEl = document.getElementsByClassName('demo')[0]?.getElementsByClassName('out-compute')[0]?.offsetHeight || 0  // 备注
        let requireStart = document.getElementsByClassName('demo')[0]?.getElementsByClassName('require-start')[0]?.offsetHeight || 0  // *号提示信息
        let beizhuOther = this.$refs.other?.offsetHeight || 0 // 备注区域的其它内容
        // 第一页
        /* 
        备注
        */
        this.tableHeight = this.pageHeight - headerHeight - pageTop - pageLogo - this.hasTitle
        // 独立备注页
        this.otherPageHeight = this.pageHeight - headerHeight - pageTop - pageLogo - this.hasTitle
        if(!this.tableData.length) return
        let rowList = this.$refs['pdf-table'].getElementsByClassName('el-table__body-wrapper')[0].getElementsByClassName('table-row')
        let arr = []
        let heightSum = 0
        let tableList = []
        rowList.forEach((item,i)=>{
          heightSum+=item.offsetHeight
          // if(heightSum<this.tableHeight - tableHeader - outEl - el){
          if(heightSum<this.tableHeight - tableHeader - requireStart){
            arr.push(this.tableData[i])
          }else{
            tableList.push(JSON.parse(JSON.stringify(arr)))
            heightSum=item.offsetHeight
            arr = [this.tableData[i]]
          }
        })
        let residualHeight = this.tableHeight - tableHeader - requireStart - heightSum  // 最后一页表格剩余高度
        tableList.push(JSON.parse(JSON.stringify(arr)))
        this.tableList = tableList
        // 备注独立页面内容计算
        // this.hasOtherPage = (this.tableHeight - tableHeader - el - requireStart - heightSum) < outEl
        this.hasOtherPage = residualHeight - el < outEl  // 最后一页不能放下所有备注和签字栏
        if(this.hasOtherPage){
          let itemHeight = 0
          let list = []
          let itemList =[]
          let residualRemark = []
          let remarkList = document.getElementsByClassName('demo')[0].getElementsByClassName('remarkItem')  //备注信息
          remarkList.forEach((item,i)=>{
            if(item.offsetHeight<residualHeight - 24){  // 放在表格页剩余空间内
              residualHeight -= item.offsetHeight
              residualRemark.push(this.getRemarkAll[i])
            }else{  // 另起一页
              itemHeight+=item.offsetHeight
              if(itemHeight<=this.otherPageHeight -24 - beizhuOther){ // 上下padding各12
                list.push(this.getRemarkAll[i])
              }else{
                if(list.length)
                itemList.push(JSON.parse(JSON.stringify(list)))
                itemHeight=item.offsetHeight
                list = [this.getRemarkAll[i]]
              }
            }
          })
          if(itemHeight){
            if(this.otherPageHeight - itemHeight -24 - beizhuOther < el){
              this.hasLastPage = true
            }else{
              this.hasLastPage = false
            }
          }else{
            if(residualHeight < el){
              this.hasLastPage = true
            }else{
              this.hasLastPage = false
            }
          }
          // if(this.otherPageHeight<outEl - 24){ // 需要分页
          //   let remarkList = document.getElementsByClassName('demo')[0].getElementsByClassName('remarkItem')  //备注信息
          //   remarkList.forEach((item,i)=>{
          //     itemHeight+=item.offsetHeight
          //     if(itemHeight<=this.otherPageHeight - 24 - beizhuOther){ // 上下padding各12
          //       list.push(this.remarkItem[i])
          //     }else{
          //       itemList.push(JSON.parse(JSON.stringify(list)))
          //       itemHeight=item.offsetHeight
          //       list = [this.remarkItem[i]]
          //     }
          //   })
          if(list.length)
          itemList.push(JSON.parse(JSON.stringify(list)))
          // }else{
            // itemList.push(JSON.parse(JSON.stringify(this.remarkItem)))
          // }
          this.remarkList = itemList
          this.residualRemark = [residualRemark]
        }else{
          this.residualRemark = this.getRemarkAll
        }
    },
    getPrototypeListHeight(){
      let time = 0
      let timeOut = 6000
      if(!this.$refs.tabTitle) return
      this.hasTitle = this.$refs.tabTitle.offsetHeight
      let headerHeight = this.$refs['pdf-list'].getElementsByClassName('cardHeader')[0].offsetHeight // Title 区域高度
      let pageLogo = this.$refs.logo.offsetHeight     // logo 区域高度
      let tableHeader = this.$refs['pdf-list'].getElementsByClassName('el-table__header-wrapper')[0].offsetHeight
      let Interval = setInterval(()=>{
        time+=400
        if(time==timeOut) clearInterval(Interval)
        if(!this.$refs['pdf-list']) return
        let rowList = this.$refs['pdf-list'].getElementsByClassName('el-table__body-wrapper')[0].getElementsByClassName('list-row')
        this.prototypeListPageHeight = this.pageHeight - headerHeight - pageLogo - 0.5 - this.hasTitle
        let arr = []
        let heightSum = 0
        let PrototypeList = []
        rowList.forEach((item,i)=>{
          heightSum+=item.offsetHeight
          if(heightSum<=this.prototypeListPageHeight - tableHeader){
            arr.push(this.PrototypeList[i])
          }else{
            PrototypeList.push(JSON.parse(JSON.stringify(arr)))
            heightSum=item.offsetHeight
            arr = [this.PrototypeList[i]]
          }
        })
        PrototypeList.push(JSON.parse(JSON.stringify(arr)))
        this.prototypeTableList = PrototypeList
        if(this.prototypeTableList) clearInterval(Interval)
      },400)
    },
    getIsSingle() {
      findFrontPageSeat({nominateId:this.nominateId}).then(res => {
        if (res.result) {
          this.isSingle = res.data.isSingle
        } else {
          this.isSingle = false
        }
      })
    },
    /**
     * @Description: 获取部门审批记录
     * @Author: Luoshuang
     * @param n*o
     * @return n*o
     */    
    getDepartApproval() {
      getDepartApproval(this.nominateId).then(res => {
        if (res?.result) {
          this.checkList = res.data.nomiApprovalProcessNodeVOList
          this.processApplyDate = res.data.processApplyDate || ''
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    /**
     * @description: US 描述当大于5条的时候则需要显示这个card 不管任何零件采购项目。任何linie
     * @param {*}
     * @return {*}
     */
    getPrototypeList(){
      getPrototypeList(this.nominateId).then(res=>{
          this.PrototypeList = res.data.list || res.data.getQuotationSampleVOList || []
          // 获取上会备注
          if(res.data && res.code==200){
            this.remarkItem = meetingRemark.map(item => {
                this.remarks[item.type] = res.data[item.remarkType] || ''
                return {...item, value: res.data[item.remarkType] || ''}
            })
          }
      }).catch(err=>{
        console.warn(err)
      }).finally(()=>{
        this.$nextTick(()=>{
          this.getPrototypeListHeight()
        })
      })
    },
    /**
     * @Description: 保存备注
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSaveRemarks() {
      this.saveLoading = true
      const params = {
        meetRemark: this.remarks[this.resetRemarkType],
        nominateAppId: this.nominateId,
        remarkType: this.resetRemarkType
      }
      updateRemark(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          // this.getRemark()
          // this.getPrototypeList()
          this.init()
          this.$store.dispatch('sourcing/updatePdfPage')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.saveLoading = false
      })
    },
    /**
     * @Description: 备注变化时保存当前修改的备注类型
     * @Author: Luoshuang
     * @param {*} val
     * @param {*} type
     * @return {*}
     */    
    handleInput(val, type) {
      this.remarkItem = this.remarkItem.map(item => {
        return {
          ...item,
          value: item.type === type ? val : item.value
        }
      })
      this.remarks[type] = val
      this.resetRemarkType = type
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
        this.reviewListRs()
      } else {
        this.getTopList()
      }
      this.getRemark()
      this.getDepartApproval()
      this.getPrototypeList()
      this.getIsSingle()
    },
    /**
     * @Description: 获取表格初始数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTopList() {
      this.tableLoading = true

      this.searchRsPageExchangeRate()
      getList(this.nominateId).then(res => {
        if (res?.result) {
          let temdata = res.data || {}
          temdata.suppliersNow = temdata.supplierVoList
          if(temdata.partNameDe){
            temdata.partName = `${temdata.partName}/${temdata.partNameDe}`
          }
          this.basicData = temdata
          let data = Array.isArray(res.data.lines) ? res.data.lines : []
          data.forEach((val,index) => {
            let suppliersNowCn =[]
            let suppliersNowEn =[]

            const supplierVoList = Array.isArray(val.supplierVoList) ? val.supplierVoList : []

            supplierVoList.forEach(val =>{
              suppliersNowCn.push(val.shortNameZh)
              suppliersNowEn.push(val.shortNameEn)
            })
            let supplierData=[]
            for(let i = 0 ;i <suppliersNowCn.length;i++) {
              let dataSuper = `${suppliersNowCn[i]}/${suppliersNowEn[i]}`
              supplierData.push(dataSuper)
            }
            supplierData = supplierData.length ? supplierData.join('\n') : '-'
            val.suppliersNow = supplierData.replace(/\n/g,"<br/>");
            if(val.supplierNameEn)
            val.supplierName = `${val.supplierName}/${val.supplierNameEn}`
              if(val.partNameDe)
            // val.partName = `${val.partName}/${val.partNameDe}`
            val.partName = val.partNameDe
          })
          this.tableData = data
          this.projectType = this.basicData.partProjectType || ''

        } else {
          this.basicData = {}
          this.tableData = []
          this.projectType = ''
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
      .finally(() => {
        this.tableLoading = false
        this.$nextTick(()=>{
          this.getHeight()
        })
      })
    },
    /**
     * @Description: 获取备注
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getRemark() {
      getRemark(this.nominateId).then(res => {
        if (res?.result) {
          const data = Array.isArray(res.data) ? res.data : []
          data.forEach(element => {
            this.remarks[element.remarkType] = element.remark || ''
            this.remarkItem = meetingRemark.map(item => {
              return {...item, value: this.remarks[item.remarkType]}
            })
          })
        } else {
          this.remarks = {}
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
		/**
		 * @Description: 获取备注
		 * @Author: Luoshuang
		 * @param {*}
		 * @return {*}
		 */
		getRemark() {
			getRemark(this.nominateId).then((res) => {
				if (res?.result) {
					const data = Array.isArray(res.data) ? res.data : []
					data.forEach((element) => {
						this.remarks[element.remarkType] = element.remark || ''
						this.remarkItem = meetingRemark.map((item) => {
							return { ...item, value: this.remarks[item.remarkType] }
						})
					})
				} else {
					this.remarks = {}
					iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
				}
			})
		},

		resetLtcData,

		// 获取汇率
		searchRsPageExchangeRate() {
		let id = this.$route.query.desinateId ? this.$route.query.desinateId : this.nominateId
		searchRsPageExchangeRate(id)
		.then(res => {
			if (res.code == 200) {
			if (this.basicData.currency) {
				const sourceData = Array.isArray(res.data) ? res.data : []

				this.exchangeRates = sourceData
				.filter(item => !item.isCurrentVersion)
				.filter(item => Array.isArray(item.exchangeRateVos) && item.exchangeRateVos.length)

				this.exchangeRates = this.exchangeRates.map(item => {
				const result = { version: item.exchangeRateVos[0].version }
				
				result.str = item.exchangeRateVos.map(item => this.exchangeRateProcess(item)).join(",")

				if (this.exchangeRates.length > 1) {
					result.fsNumsStr = Array.isArray(item.fsNums) ? item.fsNums.join("、") : ''
				} else {
					result.fsNumsStr = ""
				}

				return result
				})
			} else {
				
			}
			} else {
			iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
			}
		})
		},

		// 汇率显示处理
		exchangeRateProcess(row) {
		return `1${ row.originCurrencyCode }=${ row.foreignCurrency2Rmb }${ row.currencyCode }`
		},
		// 权限获取数据
		reviewListRs() {
			this.tableLoading = true
		
      reviewListRs(this.$route.query.desinateId)
      .then(res => {
        if (res.code == 200) {
          let temdata = res.data || {}
          temdata.suppliersNow =temdata.supplierVoList
          if(temdata.partNameDe){
            temdata.partName = `${temdata.partName}/${temdata.partNameDe}`
          }
          this.basicData = temdata
          let data = Array.isArray(res.data.lines) ? res.data.lines : []
          data.forEach((val,index) => {
            let suppliersNowCn =[]
            let suppliersNowEn =[]
            const supplierVoList = Array.isArray(val.supplierVoList) ? val.supplierVoList : []

            supplierVoList.forEach(val =>{
              suppliersNowCn.push(val.shortNameZh)
              suppliersNowEn.push(val.shortNameEn)
            })
            let supplierData=[]
            for(let i = 0 ;i <suppliersNowCn.length;i++) {
              let dataSuper = `${suppliersNowCn[i]}/${suppliersNowEn[i]}`
              supplierData.push(dataSuper)
            }
            supplierData = supplierData.length ? supplierData.join('\n') : '-'
            val.suppliersNow = supplierData.replace(/\n/g,"<br/>");
            if(val.supplierNameEn)
            val.supplierName = `${val.supplierName}/${val.supplierNameEn}`
              if(val.partNameDe)
            // val.partName = `${val.partName}/${val.partNameDe}`
            val.partName = val.partNameDe
            // // 预览模式,ab价取rsPriceVo
            // if (val.rsPriceVo && val.rsPriceVo.aprice) {
            //   val.aprice = val.rsPriceVo && val.rsPriceVo.aprice
            // }
            // if (val.rsPriceVo && val.rsPriceVo.bprice) {
            //   val.bprice = val.rsPriceVo && val.rsPriceVo.bprice
            // }
          })
          this.tableData = data
          this.projectType = this.basicData.partProjectType || ""

          this.searchRsPageExchangeRate()
        } else {
          this.basicData = {}
          this.tableData = []
          this.projectType = ""
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .finally(() => this.tableLoading = false)
	},
		

    // 导出pdf
    async handleExportPdf() {
      this.fileList = []
      this.loading = true
      this.getHeight()
      this.$nextTick(()=>{
        setTimeout(async () => {
          let elList = document.getElementsByClassName('pageCard')
          if(!elList.length){
            iMessage.warn('请稍等')
            this.loading = false
            return
          }
          for (let i = 0; i < elList.length; i++) {
            const el = elList[i];
            el.getElementsByClassName('pageNum')[0].innerHTML = `page ${i+1} of ${elList.length}`;
            await this.getPdfImage({
              dom: el,
              index: i
            })
          }
          this.uploadUdFile();
        }, 100)
      })
    },

    // 截取页面,存入pdf
    // 截取页面,转图片, 上传服务器
    async getPdfImage({
      //html横向导出pdf
      dom,
      index,
    }) {
      await html2canvas(dom, {
        dpi: 96, //分辨率
        scale: 1, //设置缩放
        useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
        bgcolor: '#ffffff', //应该这样写
        logging: false, //打印日志用的 可以不加默认为false
      }).then(async (canvas) => {
        // var contentWidth = canvas.width; //
        // var contentHeight = canvas.height; //
        //一页pdf显示html页面生成的canvas高度;
        // var pageHeight = (contentWidth / 841.89) * 595.28; //
        //未生成pdf的html页面高度
        // var leftHeight = contentHeight; //
        // var ctx = canvas.getContext("2d");

        // var copyCanvas = document.getElementById("myCanvas"); // 创建截图画布
        // copyCanvas.width = contentWidth;
        // copyCanvas.height = pageHeight;
        // var ctxs = copyCanvas.getContext("2d");
        await this.getPdfFile(canvas)

        // ctxs.fillStyle = '#FFF'
        // // 保存每一页的画布, 然后清空canvas
        // if (leftHeight <= pageHeight) {
        //   ctxs.fillRect(0,0,contentWidth,pageHeight)
        //   //   console.log(pageData);
        //   var imgData = ctx.getImageData(0, 0, contentWidth, leftHeight); // 截取主画布
        //   ctxs.putImageData(imgData, 0, 0); // 插入到截图画布中
        //   // 截图画布转为file
        //   await this.getPdfFile(copyCanvas,index)
        // } else {
        //   // 分页
        //   var num = 1;
        //   while (leftHeight > 0) {
        //     ctxs.clearRect(0, 0, contentWidth, pageHeight); //清空截图画布
        //     ctxs.fillRect(0,0,contentWidth,pageHeight)
        //     if(leftHeight <= pageHeight){
        //       var imgData = ctx.getImageData(0, (num - 1) * pageHeight, contentWidth, leftHeight); // 截取主画布
        //     }else{
        //       var imgData = ctx.getImageData(
        //         0,
        //         (num - 1) * pageHeight,
        //         contentWidth,
        //         pageHeight
        //       ); // 截取主画布当前页
        //     }
        //     ctxs.putImageData(imgData, 0, 0); // 插入截图画布
        //     // 截图画布转为file
        //     await this.getPdfFile(copyCanvas,index)
        //     leftHeight -= pageHeight;
        //     // //避免添加空白页
        //     if (leftHeight > 0) {
        //       num++;
        //     }
        // }
        // }
      })
    },

    async getPdfFile(copyCanvas, num) {
      return new Promise((r, j) => {
        copyCanvas.toBlob((blob) => {
          //以时间戳作为文件名 实时区分不同文件
          let filename = `${new Date().getTime()}.png`
          let pdfFile = new File([blob], filename, { type: 'image/png' })
          this.fileList.push({ file: pdfFile, index: num })
          r(num)
        })
      })
    },
    // 下载 pdf 文件
    async DownloadPdf() {
      let arr = this.fileList.filter((item) => !item.imageUrl)
      if (arr.length) return
      const list = this.fileList.map((item) => item.imageUrl)
      await decisionDownloadPdfLogo({
        filePaths: list,
        needLogo: false,
        needSplit: false,
        width: this.pageWidth,
        height: this.pageHeight,
      }) // 1.2 预留 页脚位置
      this.loading = false
    },

    // 上传图片
    async uploadUdFile() {
      this.fileList.map((item) => {
        uploadUdFile({
          multifile: item.file,
        }).then((res) => {
          if (res.code == 200) {
            item['imageUrl'] = res.data[0].path
            // console.log(res.data[0].objectUrl)
            this.DownloadPdf()
          } else {
            this.$message.error(
              this.$i18n.locale === 'zh' ? res.desZh : res.desEn
            )
          }
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#myCanvas {
  display: none;
}
.meeting {
  
  .demo,.rsCard {
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
  .rsCard {
    ::v-deep .cardHeader {
      flex-wrap: wrap;

      .btnWrapper {
        width: 100%;
        text-align: right;
        margin-bottom: 20px;
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
  padding: 8px 12px;
  font-size: 15px;
  font-weight: 400;
  color: rgba(22, 96, 241, 1);
  border: 1px dashed #1660f1;
}
.rsTable {
	font-size: 8px;
	&::before {
		height: 0;
	}
	::v-deep thead th {
		padding-top: 8px;
		padding-bottom: 8px;
		& > .cell {
			padding-left: 3px;
			padding-right: 3px;
			line-height: 16px;
      font-size: 12px;
			p {
				min-height: 16px;
			}

			p + p {
				margin-top: 8px;
			}
		}
	}

  ::v-deep tr {
    &:nth-child(even) {
      background-color: #f7f7ff;
    }
  }

	::v-deep .el-table__row td {
		.cell {
			padding-left: 3px;
			padding-right: 3px;

			span {
				// zoom: 0.88;
			}
		}
	}
}
.prototypeList{
  ::v-deep tr {
    &:nth-child(even) {
        background-color: #f7f7ff;
    }
  }
}
.mainTable{
  ::v-deep .el-table__row {
      td {
      border-top: 1px solid #ccc;
    }
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
        width: 60%;
        font-weight: bold;
        // line-height: 29px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      &-value {
        width: 40%;
        padding: 6px 24px;
        // line-height: 29px;
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
.beizhu {
	background-color: rgba(22, 96, 241, 0.03);
	// height: 40px;
	padding: 12px 14px;  /*no*/
	font-weight: bold;
	display: flex;
	&-value {
		font-weight: 400;
		margin-left: 20px;
    p{
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
	&-item {
		flex-shrink: 0;
		width: 224px;
		height: 125px;
		max-width: 224px;
		border-radius: 15px;
		background-color: rgba(205, 212, 226, 0.12);
		margin-right: 19px;
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
	::v-deep .card .cardHeader .title {
		// font-size: 16px;
		font-weight: 400;
		color: rgba(75, 75, 76, 1);
	}
}

.Application.card {
  ::v-deep .cardHeader {
    padding-top: 12px;
    padding-bottom: 12px;
    .title .title_content {
      font-size: 14px !important;
    }
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
  
  .page-logo {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    border-top: 1px solid #666;
  }
}
</style>
