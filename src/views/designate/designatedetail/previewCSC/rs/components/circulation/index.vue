<!--
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:18:01
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-03-09 14:38:08
 * @Description: 流转RS单
 * @FilePath: \front-sourcing\src\views\designate\designatedetail\decisionData\rs\components\circulation\index.vue
-->

<template>
  <div class="circulation" ref="circulation" :class="isPreview && 'isPreview'">
    <div
      class="demo"
      ref="demo"
      v-if="showpdf"
      :style="{ width: pageWidth + 'px' }"
    >
      <div ref="tabTitle" style="padding: 1px">
        <slot name="tabTitle"></slot>
      </div>
      <iCard class="pgCard" :class="!isPreview && 'margin-top20'">
        <template #header>
          <div class="title">
            <p>{{ `流转定点推荐 - ${cardTitle}` }}</p>
          </div>
        </template>
        <div class="infos position-infos">
          <div
            class="infoWrapper"
            v-for="(info, $index) in infos"
            :key="$index"
          >
            <div class="info">
              <span class="label">{{ info.name }}：</span>
              <span
                v-if="info.props === 'exchange'"
                v-html="exchangeRate"
              ></span>
              <!-- <span v-if="info.props === 'nominateAppTime'">{{ basicData[info.props] | dateFilter('YYYY-MM-DD') }}</span> -->
              <div v-else>{{ basicData[info.props] }}</div>
            </div>
          </div>
        </div>
        <tableList
          max-height="700"
          :tableLoading="tableLoading"
          :selection="false"
          :tableTitle="tableTitleSub"
          :tableData="tableData"
          class="rsTable mainTable"
          :tableRowClassName="tableRowClassName"
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
          <template #oldAPrice="scope">
            <span>{{ scope.row.oldAPrice | toThousands(true) }}</span>
          </template>

          <template #cfTargetAPrice="scope">
            <div v-if="scope.row.cfApplyType === 'SKDLC'">
              <p>{{ scope.row.cfTargetSkdAPrice | toThousands(true) }}</p>
              <p>{{ scope.row.cfTargetAPrice | toThousands(true) }}</p>
            </div>
            <span v-else-if="scope.row.cfApplyType === 'SKD'">{{
              scope.row.cfTargetSkdAPrice | toThousands(true)
            }}</span>
            <span v-else>{{
              scope.row.cfTargetAPrice | toThousands(true)
            }}</span>
          </template>

          <template #cfTargetBPrice="scope">
            <div v-if="scope.row.cfApplyType === 'SKDLC'">
              <p>{{ scope.row.cfTargetSkdBPrice | toThousands(true) }}</p>
              <p>{{ scope.row.cfTargetBPrice | toThousands(true) }}</p>
            </div>
            <span v-else-if="scope.row.cfApplyType === 'SKD'">{{
              scope.row.cfTargetSkdBPrice | toThousands(true)
            }}</span>
            <span v-else>{{
              scope.row.cfTargetBPrice | toThousands(true)
            }}</span>
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
            <span>{{ resetLtcData(scope.row.ltcs, "ltc") }}</span>
          </template>

          <!-- 年降开始时间 -->
          <template #beginYearReduce="scope">
            <span>{{ resetLtcData(scope.row.ltcs, "beginYearReduce") }}</span>
          </template>

          <template #svwCode="scope">
            <span>{{ scope.row.svwCode || scope.row.svwTempCode }}</span>
          </template>

          <template #aprice="scope">
            <div v-if="scope.row.status === 'SKDLC'">
              <p>{{ scope.row.skdAPrice | toThousands(true) }}</p>
              <p>{{ scope.row.aprice | toThousands(true) }}</p>
            </div>
            <span v-else-if="scope.row.status === 'SKD'">{{
              scope.row.skdAPrice | toThousands(true)
            }}</span>
            <span v-else>{{ scope.row.aprice | toThousands(true) }}</span>
          </template>

          <template #bprice="scope">
            <div v-if="scope.row.status === 'SKDLC'">
              <p>{{ scope.row.skdBPrice | toThousands(true) }}</p>
              <p>{{ scope.row.bprice | toThousands(true) }}</p>
            </div>
            <span v-else-if="scope.row.status === 'SKD'">{{
              scope.row.skdBPrice | toThousands(true)
            }}</span>
            <span v-else>{{ scope.row.bprice | toThousands(true) }}</span>
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
                    分摊金额：{{ scope.row.moldApportionPrice || "0.00" }}
                  </div>
                  <div>
                    未分摊金额：{{ scope.row.unShareInvestPrice || "0.00" }}
                  </div>
                </div>
                <div slot="reference">
                  <p>{{ (scope.row.skdInvestFee || 0) | toThousands(true) }}</p>
                  <p>
                    <span v-if="scope.row.investFeeIsShared" style="color: red"
                      >*</span
                    >
                    <span>{{ (scope.row.investFee || 0) | toThousands(true) }}</span>
                  </p>
                </div>
              </el-popover>
            </div>
            <span v-else-if="scope.row.status === 'SKD'">
              <p>{{ (scope.row.skdInvestFee || 0) | toThousands(true) }}</p>
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
                    分摊金额：{{ scope.row.moldApportionPrice || "0.00" }}
                  </div>
                  <div>
                    未分摊金额：{{ scope.row.unShareInvestPrice || "0.00" }}
                  </div>
                </div>
                <div slot="reference">
                  <span v-if="scope.row.investFeeIsShared" style="color: red"
                    >*</span
                  >
                  <span>{{ (scope.row.investFee || 0) | toThousands(true) }}</span>
                </div>
              </el-popover>
            </span>
          </template>

          <template #remarks="scope">
            <div>
              <iInput
                maxlength="260"
                v-if="editStatus"
                v-model="scope.row.remarks"
              ></iInput>
              <span v-else>{{ scope.row.remarks }}</span>
            </div>
          </template>

          <template #share="scope">
            <span>{{ +scope.row.share || 0 }}</span>
          </template>
        </tableList>
        <div class="require-start">
          <div style="margin-left: 20px">
            <span style="color: red">*</span><span>代表投资费已分摊</span>
          </div>
        </div>
        <div class="position-compute out-compute">
          <div class="beizhu">
            备注 Remarks:
            <div class="beizhu-value">
              <p
                class="remarkItem"
                v-for="(item, index) in getRemarkAll"
                :key="index"
              >
                {{ item }}<br />
              </p>
            </div>
          </div>
        </div>
      </iCard>
      <iCard
        class="checkDate Application"
        :class="!isPreview && 'margin-top20'"
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
      </iCard>
      <iCard
        :title="language('JINGLINGJIANAOCARD', '上传仅零件号变更单')"
        class="margin-top20"
        v-if="$route.query.partProjType == partProjTypes.JINLINGJIANHAOGENGGAI"
      >
        <div class="text-align-right margin-bottom20">
          <Upload
            hideTip
            @on-success="upLoadsucess"
            class="margin-right10"
          ></Upload>
          <iButton @click="downloadFile">下载</iButton>
          <iButton @click="deleteFile">删除</iButton>
        </div>
        <tableList
          :tableTitle="fileTableTitle"
          @handleSelectionChange="(r) => (fileTableSelect = r)"
          :tableData="fileTableData"
          :activeItems="'fileName'"
          @openPage="handleOpenPage"
        >
        </tableList>
        <iPagination
          v-update
          class="margin-top30"
          @size-change="handleSizeChange($event, getFileList)"
          @current-change="handleCurrentChange($event, getFileList)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
        />
      </iCard>
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
    <div class="rsPdfWrapper" :style="{ width: pageWidth + 'px' }" :key="key">
      <rsPdf
        ref="rsPdf"
        :nominateId="nominateId"
        v-if="showpdf"
        :cardTitle="cardTitle"
        :infos="infos"
        :basicData="basicData"
        :tableTitle="tableTitleSub"
        :tableData="tableData"
        :tableList="tableList"
        :remarkItem="remarkItem"
        :remarkList="remarkList"
        :checkList="checkList"
        :tableHeight="tableHeight"
        :otherPageHeight="otherPageHeight"
        :residualRemark="residualRemark"
        :hasLastPage="hasLastPage"
        :exchangeRate="exchangeRate"
        :processApplyDate="processApplyDate"
      >
        <template #tabTitle>
          <slot name="tabTitle"></slot>
        </template>
      </rsPdf>
      <div class="contentPdf" ref="contentPdf" id="contentPdf"></div>
    </div>
    <!-- <iCard v-if="projectType === partProjTypes.PEIJIAN || projectType === partProjTypes.FUJIAN">
      <template #header>
        <div class="title">
          <p>CSC推荐表/CSC Recommendation Sheet会外流转</p>
        </div>
        <div v-if="!isRoutePreview && !isApproval" class="btnWrapper">
          <iButton v-if="!isRoutePreview && !isApproval && !editStatus" @click="editStatus = true">{{ language("BIANJI", "编辑") }}</iButton>
          <iButton v-if="editStatus" :loading="saveLoading" @click="handleSave">{{ language("BAOCUN", "保存") }}</iButton>
          <iButton v-if="editStatus" :loading="saveLoading" @click="editStatus = false">{{ language("TUICHUBIANJI", "退出编辑") }}</iButton>
          <iButton @click="handleExportPdf">{{ language("DAOCHURSDAN", "导出RS单") }}</iButton>
        </div>
      </template>
      <iFormGroup row="4"
                  class="csc">
        <div class="col">
          <iFormItem v-for="(item,index) in titleData"
                     :key="'titleData'+index"
                     :label="item.label+':'">
            <iText v-if="item.props === 'currency'">
              {{ basicData.currencyMap && basicData.currencyMap[basicData.currency] ? basicData.currencyMap[basicData.currency].name : basicData.currency }}
            </iText>
            <iText v-else-if="item.props === 'exchangeRate'">
              <span class="exchangeRageCurrency"
                    v-for="item in exchangeRageCurrency"
                    :key="item">
                1{{basicData.currencyMap && basicData.currencyMap[item] ? basicData.currencyMap[item].name : item}}={{basicData.currencyRateMap[item]}}{{basicData.currencyMap.RMB ? basicData.currencyMap.RMB.name : 'RMB'}}
              </span>
            </iText>
            <iText v-else-if="item.props === 'partProjectType'">
              {{basicData[item.props] === partProjTypes.PEIJIAN ? '配件' : '附件'}}
            </iText>
            <iText v-else>{{basicData[item.props]}}</iText>
          </iFormItem>
        </div>
      </iFormGroup>
    </iCard> -->
    <div id="hide">
      <iCard class="pgCard" :class="!isPreview && 'margin-top20'">
        <template #header>
          <div class="title">
            <p>{{ `流转定点推荐 - ${cardTitle}` }}</p>
          </div>
          <div class="btnWrapper">
            <iButton
              v-permission.auto="
                SOURCING_NOMINATION_RFQDETAIL_RS_EDIT | RS单编辑
              "
              v-if="!isRoutePreview && !isApproval && !editStatus && !isPreview"
              @click="editStatus = true"
              >{{ language("BIANJI", "编辑") }}</iButton
            >
            <iButton
              v-if="editStatus"
              :loading="saveLoading"
              @click="handleSave"
              >{{ language("BAOCUN", "保存") }}</iButton
            >
            <iButton
              v-if="editStatus"
              :loading="saveLoading"
              @click="editStatus = false"
              >{{ language("TUICHUBIANJI", "退出编辑") }}</iButton
            >
            <iButton
              :loading="loading"
              :disabled="disabled"
              v-if="!isRoutePreview && !isApproval"
              v-permission.auto="
                SOURCING_NOMINATION_RFQDETAIL_RS_EXPORT | RS单导出
              "
              @click="handleExportPdf"
            >
              {{ language("DAOCHURSDAN", "导出RS单") }}
            </iButton>
          </div>
        </template>
        <div class="infos">
          <div
            class="infoWrapper"
            v-for="(info, $index) in infos"
            :key="$index"
          >
            <div class="info">
              <span class="label">{{ info.name }}：</span>
              <span
                v-if="info.props === 'exchange'"
                v-html="exchangeRate"
              ></span>
              <!-- <span v-if="info.props === 'nominateAppTime'">{{ basicData[info.props] | dateFilter('YYYY-MM-DD') }}</span> -->
              <div v-else>{{ basicData[info.props] }}</div>
            </div>
          </div>
        </div>
        <tableList
          max-height="700"
          :tableLoading="tableLoading"
          :selection="false"
          :tableTitle="tableTitle"
          :tableData="tableData"
          class="rsTable f-border-table"
          :tableRowClassName="tableRowClassName"
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
          <template #oldAPrice="scope">
            <span>{{ scope.row.oldAPrice | toThousands(true) }}</span>
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
                    >*</span>
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
            <!-- <span>{{ scope.row.cfTargetAPrice | toThousands(true) }}</span> -->
          </template>
          <template #cfTargetBPrice="scope">
            <div v-if="scope.row.cfApplyType === 'SKDLC'">
              <p>{{ scope.row.cfTargetSkdBPrice | toThousands(true) }}</p>
              <p>{{ scope.row.cfTargetBPrice | toThousands(true) }}</p>
            </div>
            <span v-else-if="scope.row.cfApplyType === 'SKD'">{{
              scope.row.cfTargetSkdBPrice | toThousands(true)
            }}</span>
            <span v-else>{{
              scope.row.cfTargetBPrice | toThousands(true)
            }}</span>
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
            <span>{{ resetLtcData(scope.row.ltcs, "ltc") }}</span>
          </template>

          <!-- 年降开始时间 -->
          <template #beginYearReduce="scope">
            <span>{{ resetLtcData(scope.row.ltcs, "beginYearReduce") }}</span>
          </template>

          <template #svwCode="scope">
            <span>{{ scope.row.svwCode || scope.row.svwTempCode }}</span>
          </template>

          <template #aprice="scope">
            <div v-if="scope.row.status === 'SKDLC'">
              <p>{{ scope.row.skdAPrice | toThousands(true) }}</p>
              <p>{{ scope.row.aprice | toThousands(true) }}</p>
            </div>
            <span v-else-if="scope.row.status === 'SKD'">{{
              scope.row.skdAPrice | toThousands(true)
            }}</span>
            <span v-else>{{ scope.row.aprice | toThousands(true) }}</span>
          </template>

          <template #bprice="scope">
            <div v-if="scope.row.status === 'SKDLC'">
              <p>{{ scope.row.skdBPrice | toThousands(true) }}</p>
              <p>{{ scope.row.bprice | toThousands(true) }}</p>
            </div>
            <span v-else-if="scope.row.status === 'SKD'">{{
              scope.row.skdBPrice | toThousands(true)
            }}</span>
            <span v-else>{{ scope.row.bprice | toThousands(true) }}</span>
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
                    分摊金额：{{ scope.row.moldApportionPrice || "0.00" }}
                  </div>
                  <div>
                    未分摊金额：{{ scope.row.unShareInvestPrice || "0.00" }}
                  </div>
                </div>
                <div slot="reference">
                  <p>{{ (scope.row.skdInvestFee || 0) | toThousands(true) }}</p>
                  <p>
                    <span v-if="scope.row.investFeeIsShared" style="color: red"
                      >*</span
                    >
                    <span>{{ (scope.row.investFee || 0) | toThousands(true) }}</span>
                  </p>
                </div>
              </el-popover>
            </div>
            <span v-else-if="scope.row.status === 'SKD'">
              <p>{{ (scope.row.skdInvestFee || 0) | toThousands(true) }}</p>
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
                    分摊金额：{{ scope.row.moldApportionPrice || "0.00" }}
                  </div>
                  <div>
                    未分摊金额：{{ scope.row.unShareInvestPrice || "0.00" }}
                  </div>
                </div>
                <div slot="reference">
                  <span v-if="scope.row.investFeeIsShared" style="color: red"
                    >*</span
                  >
                  <span>{{ (scope.row.investFee || 0) | toThousands(true) }}</span>
                </div>
              </el-popover>
            </span>
          </template>

          <template #remarks="scope">
            <div>
              <iInput
                maxlength="260"
                v-if="editStatus"
                v-model="scope.row.remarks"
              ></iInput>
              <span v-else>{{ scope.row.remarks }}</span>
            </div>
          </template>

          <template #share="scope">
            <span>{{ +scope.row.share || 0 }}</span>
          </template>
        </tableList>
        <div class="position-compute">
          <div style="margin-left: 20px">
            <span style="color: red">*</span><span>代表投资费已分摊</span>
          </div>
          <div class="beizhu">
            备注 Remarks:
            <div class="beizhu-value">
              <p
                v-for="(item, index) in remarkItem"
                :key="index"
                v-html="remarkProcess(item.value)"
              ></p>
            </div>
          </div>
        </div>
      </iCard>
      <div v-if="!isRoutePreview && !isApproval">
        <iCard
          :title="language('BEIZHU', '备注')"
          :class="!isPreview && 'margin-top20'"
        >
          <template slot="header-control" v-if="!isPreview">
            <iButton
              v-if="!isRoutePreview && !isApproval && !isEdit"
              @click="handleEdit"
              v-permission.auto="
                SOURCING_NOMINATION_RFQDETAIL_RS_REMARK_EDIT | RS单备注编辑
              "
              >{{ language("BIANJI", "编辑") }}</iButton
            >
            <template v-else>
              <iButton @click="handleDeleteRemark">{{
                language("SHANCHU", "删除")
              }}</iButton>
              <iButton @click="handleAddRemark">{{
                language("TIANJIA", "添加")
              }}</iButton>
              <iButton @click="handleSaveRemarks" :loading="saveLoading">{{
                language("BAOCUN", "保存")
              }}</iButton>
              <iButton @click="cancelEdit">{{
                language("QUXIAO", "取消")
              }}</iButton>
            </template>
          </template>
          <div class="meetingRemark">
            <div
              class="meetingRemark-item"
              v-for="(item, index) in remarkItem"
              :key="index"
            >
              <el-checkbox
                v-if="!isPreview"
                v-model="item.checked"
              ></el-checkbox>
              <iInput
                v-model="item.value"
                class="margin-top10"
                :class="!isPreview && 'margin-left20'"
                type="textarea"
                :rows="3"
                resize="none"
              ></iInput>
            </div>
          </div>
        </iCard>
      </div>
      <iCard
        class="checkDate Application"
        :class="!isPreview && 'margin-top20'"
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
      </iCard>
      <iCard
        :title="language('JINGLINGJIANAOCARD', '上传仅零件号变更单')"
        class="margin-top20"
        v-if="$route.query.partProjType == partProjTypes.JINLINGJIANHAOGENGGAI"
      >
        <div class="text-align-right margin-bottom20">
          <Upload
            hideTip
            @on-success="upLoadsucess"
            v-permission.auto="
              SOURCING_NOMINATION_RFQDETAIL_RS_FILE_UPLOAD | RS单上传附件
            "
            class="margin-right10"
          ></Upload>
          <iButton
            @click="downloadFile"
            v-permission.auto="
              SOURCING_NOMINATION_RFQDETAIL_RS_FILE_DOWN | RS单附件下载
            "
            >下载</iButton
          >
          <iButton
            @click="deleteFile"
            v-permission.auto="
              SOURCING_NOMINATION_RFQDETAIL_RS_FILE_DELETE | RS单附件删除
            "
            >删除</iButton
          >
        </div>
        <tableList
          :tableTitle="fileTableTitle"
          @handleSelectionChange="(r) => (fileTableSelect = r)"
          :tableData="fileTableData"
          :activeItems="'fileName'"
          @openPage="handleOpenPage"
        >
        </tableList>
        <iPagination
          v-update
          class="margin-top30"
          @size-change="handleSizeChange($event, getFileList)"
          @current-change="handleCurrentChange($event, getFileList)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
        />
      </iCard>
    </div>
    <canvas id="myCanvas"></canvas>
  </div>
</template>

<script>
import {
  iCard,
  iButton,
  iInput,
  iFormGroup,
  iFormItem,
  iText,
  iMessage,
  iPagination,
  icon,
} from "rise";
import {
  nomalTableTitle,
  checkList,
  accessoryTableTitle,
  sparePartTableTitle,
  fileTableTitle,
  gsTableTitle,
  infos,
  dateFilter,
} from "./data";
import { resetLtcData, remarkProcess } from "../meeting/data";
import tableList from "@/views/designate/designatedetail/components/tableList";
import {
  getList,
  getRemark,
  updateRemark,
  updateRsMemo,
  reviewListRs,
  searchRsPageExchangeRate,
  getDepartApproval,
} from "@/api/designate/decisiondata/rs";
import { uploadFiles } from "@/api/costanalysismanage/costanalysis";
import { partProjTypes, fileType } from "@/config";
import Upload from "@/components/Upload";
import { getFile, downloadUdFile, deleteFiles } from "@/api/file";
import { pageMixins } from "@/utils/pageMixins";
import rsPdf from "./rsPdf";
import { toThousands } from "@/utils";
import { decisionDownloadPdfLogo } from "@/api/designate";

import { nomalTableTitleSub, gsTableTitleSub } from "./pdfData";
import { uploadUdFile } from "@/api/file/upload";
import filters from "@/utils/filters";

import { cloneDeep } from "lodash";

export default {
  components: {
    iCard,
    tableList,
    iButton,
    iInput,
    iFormGroup,
    iFormItem,
    iText,
    Upload,
    iPagination,
    rsPdf,
    icon,
  },
  props: {
    isPreview: { type: Boolean, default: false },
    nominateId: { type: String },
    // projectType: {type:String}
  },
  mixins: [pageMixins, filters],
  filters: {
    toThousands,
  },
  data() {
    return {
      key: "0",
      tableList: [[]],
      loading: false,
      // 零件项目类型
      partProjTypes,
      fileTableTitle,
      fileTableData: [],
      fileTableSelect: [],
      titleData: [
        { label: "零件关系", value: "配件", props: "partProjectType" },
        { label: "询价采购员", value: "胡伟", props: "buyer" },
        { label: "货币单位", value: "RMB", props: "currency" },
        { label: "申请单号", value: "", props: "nominateAppId" },
        { label: "申请日期", value: "2020-01-01", props: "nominateAppTime" },
        { label: "LINIE采购员", value: "胡伟", props: "linieName" },
        { label: "Exchange rate", value: "", props: "cfExchangeRate" },
      ],
      // tableTitle: cloneDeep(nomalTableTitle),
      tableData: [],
      remarkItem: [
        { value: "", checked: false },
        { value: "", checked: false },
        { value: "", checked: false },
      ],
      checkList: [],
      isEdit: false,
      saveLoading: false,
      projectType: "",
      basicData: {},
      editStatus: false,
      saveLoading: false,
      tableLoading: false,
      tableHeight: 0,
      otherPageHeight: 0,
      hasLastPage: false, // 签字栏是否另起一页
      fileList: [],
      remarkList: [],
      residualRemark: [],
      infos,
      exchangeRate: "",
      processApplyDate: "",
      showpdf: true,
    };
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
    cardTitle() {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return "配件采购 Nomination Recommendation - Spare Part Purchasing";
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return "附件采购 Nomination Recommendation – Accessory Purchasing";
      }
      return "生产采购 Nomination Recommendation - Production Purchasing";
    },
    tableTitle() {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return sparePartTableTitle;
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return accessoryTableTitle;
      } else if (
        this.projectType === partProjTypes.GSLINGJIAN ||
        this.projectType === partProjTypes.GSCOMMONSOURCING
      ) {
        return gsTableTitle;
      } else if (this.projectType === partProjTypes.JINLINGJIANHAOGENGGAI) {
        // 如果是1000005 （仅零件号变更）原零件号就用oldPartNum填充
        const tableTitle = cloneDeep(nomalTableTitle); //
        tableTitle.map((item) => {
          if (item.props == "partNum") item.props = "oldPartNum";
          return item;
        });
        return tableTitle;
      }
      // 默认不显示原零件号
      return nomalTableTitle.filter((item) => item.props != "partNum");
    },
    tableTitleSub() {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return sparePartTableTitle.map((item) => {
          item.fixed = false;
          return item;
        });
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return accessoryTableTitle.map((item) => {
          item.fixed = false;
          return item;
        });
      } else if (
        this.projectType === partProjTypes.GSLINGJIAN ||
        this.projectType === partProjTypes.GSCOMMONSOURCING
      ) {
        return gsTableTitleSub.map((item) => {
          item.fixed = false;
          return item;
        });
      } else if (this.projectType === partProjTypes.JINLINGJIANHAOGENGGAI) {
        // 如果是1000005 （仅零件号变更）原零件号就用oldPartNum填充
        const tableTitle = cloneDeep(nomalTableTitleSub); //
        tableTitle.map((item) => {
          if (item.props == "partNum") item.props = "oldPartNum";
          item.fixed = false;
          return item;
        });
        return tableTitle;
      }
      // 默认不显示原零件号
      return nomalTableTitleSub
        .filter((item) => item.props != "partNum")
        .map((item) => {
          if (item.props == "partNum") item.props = "oldPartNum";
          item.fixed = false;
          return item;
        });
    },
    pageWidth() {
      // 多加2px 避免出现滚动条
      if (this.projectType === partProjTypes.PEIJIAN) {
        return 2052;
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return 2022;
      } else if (
        this.projectType === partProjTypes.GSLINGJIAN ||
        this.projectType === partProjTypes.GSCOMMONSOURCING
      ) {
        return 1722;
      }
      return 1730;
    },
    pageHeight() {
      return (this.pageWidth / 841.89) * 595.28; // 横版A4一页对应的高度
    },
    isRoutePreview() {
      return this.$route.query.isPreview == 1;
    },
    isApproval() {
      return this.$route.query.isApproval === "true";
    },
    getRemarkAll() {
      let result = [];
      for (let i = 0; i < this.remarkItem.length; i++) {
        const item = this.remarkItem[i];
        result.push(item.value);
      }
      return result.join("\n").split("\n");
    },
    // hasTitle(){
    //   return this.$slots.tabTitle && 116 || 0
    // }
  },
  created() {
    this.key = +new Date();
  },
  methods: {
    remarkProcess,
    dateFilter,
    getHeight() {
        this.hasTitle = this.$refs.tabTitle?.offsetHeight;
        let headerHeight =
          this.$refs.demo.getElementsByClassName("cardHeader")[0].offsetHeight; // Title 区域高度
        let pageLogo = this.$refs.logo.offsetHeight; // logo 区域高度
        let tableHeader = this.$refs.demo.getElementsByClassName(
          "el-table__header-wrapper"
        )[0].offsetHeight;
        let computeHeight =
          this.$refs.demo.getElementsByClassName("position-infos")[0]
            .offsetHeight; // 页面所有固定元素的高度： infos
        let el =
          this.$refs.demo.getElementsByClassName("Application")[0].offsetHeight; // 审批备注
        let outEl =
          this.$refs.demo.getElementsByClassName("out-compute")[0].offsetHeight; // 备注
        let requireStart =
          this.$refs.demo.getElementsByClassName("require-start")[0]
            .offsetHeight; // *号提示信息
        // 第一页
        this.tableHeight =
          this.pageHeight -
          headerHeight -
          computeHeight -
          pageLogo -
          el -
          this.hasTitle; // 表格区域高度, 用div支撑空间
        // 独立备注页
        this.otherPageHeight =
          this.pageHeight -
          headerHeight -
          computeHeight -
          pageLogo -
          this.hasTitle;
        let rowList = this.$refs.demo
          .getElementsByClassName("mainTable")[0]
          .getElementsByClassName("el-table__body-wrapper")[0]
          .getElementsByClassName("table-row");
        let arr = [];
        let heightSum = 0;
        let tableList = [];
        rowList.forEach((item, i) => {
          heightSum += item.offsetHeight;
          // if(tableList.length==0){
          if (heightSum < this.tableHeight - tableHeader - requireStart) {
            arr.push(this.tableData[i]);
          } else {
            tableList.push(JSON.parse(JSON.stringify(arr)));
            heightSum = item.offsetHeight;
            arr = [this.tableData[i]];
          }
        });
        let residualHeight =
          this.tableHeight - tableHeader - requireStart - heightSum; // 最后一页表格剩余高度
        tableList.push(JSON.parse(JSON.stringify(arr)));
        this.tableList = tableList;
        let hasOtherPage = residualHeight - el - 24 < outEl; // 最后一页不能放下所有备注和签字栏
        if (hasOtherPage) {
          let itemHeight = 0;
          let list = [];
          let itemList = [];
          let residualRemark = [];
          let remarkList = this.$refs.demo.getElementsByClassName("remarkItem"); //备注信息
          // 备注信息分页计算
          remarkList.forEach((item, i) => {
            if (item.offsetHeight < residualHeight - 24) {
              // 放在表格页剩余空间内
              residualHeight -= item.offsetHeight;
              residualRemark.push(this.getRemarkAll[i]);
            } else {
              // 另起一页
              itemHeight += item.offsetHeight;
              if (itemHeight <= this.otherPageHeight - el - 24) {
                // 上下padding各12
                list.push(this.getRemarkAll[i]);
              } else {
                if (list.length)
                  itemList.push(JSON.parse(JSON.stringify(list)));
                itemHeight = item.offsetHeight;
                list = [this.getRemarkAll[i]];
              }
            }
          });
          if (list.length) itemList.push(JSON.parse(JSON.stringify(list)));
          this.remarkList = itemList;
          this.residualRemark = residualRemark;
          // 签字栏是否分页
          // if (itemHeight) {
          // 	if (this.otherPageHeight - itemHeight - 24 < el) {
          // 		this.hasLastPage = true
          // 	} else {
          // 		this.hasLastPage = false
          // 	}
          // } else {
          // 	if (residualHeight - 24 < el) {
          // 		this.hasLastPage = true
          // 	} else {
          // 		this.hasLastPage = false
          // 	}
          // }
        } else {
          this.remarkList = [];
          this.hasLastPage = false;
          this.residualRemark = this.getRemarkAll;
        }
        this.$nextTick(()=>{
          this.loading = false;
        })
    },
    downloadFile() {
      if (this.fileTableSelect.length == 0)
        return iMessage.warn(
          this.language(
            "NINGHAIWEIXUANZESHUJUWENJIAN",
            "您当前还未选择列表文件，请选择后重试！"
          )
        );
      downloadUdFile(this.fileTableSelect.map((r) => r.uploadId));
    },
    deleteFile() {
      if (this.fileTableSelect.length == 0)
        return iMessage.warn(
          this.language(
            "NINGHAIWEIXUANZESHUJUWENJIAN",
            "您当前还未选择列表文件，请选择后重试！"
          )
        );
      deleteFiles(this.fileTableSelect.map((r) => r.id));
      this.getFileList();
    },
    /**
     * @description: 绑定仅零件号变更的文件和当前定点申请单的关系
     * @param {*} res
     * @return {*}
     */
    upLoadsucess(res) {
      const sendMap = {
        hostId: res.data.hostId || this.$store.getters.nomiAppId || "",
        filePath: res.data.path,
        uploadId: res.data.id,
        fileSize: res.file.size,
        fileName: res.file.name,
        fileCode: "0",
        source: "0",
        fileType: fileType.JINGLINGHAOBIANG,
      };
      uploadFiles(sendMap)
        .then((res) => {
          if (res.result) {
            this.getFileList();
            iMessage.success("上传成功！");
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh);
        });
    },
    getFileList() {
      getFile({
        hostId: this.$store.getters.nomiAppId,
        fileType: fileType.JINGLINGHAOBIANG,
        pageNo: this.page.pageSize,
        pageSize: this.page.currPage,
      })
        .then((res) => {
          this.fileTableData = res.data;
          this.page.totalCount = res.total || 0;
        })
        .catch((err) => {
          iMessage.error(err.desZh);
        });
    },
    // 单独处理下年降或年降计划
    // resetLtcData (row, type) {
    //   if (!row) return ""
    //   // 年降开始时间
    //   if (type == 'beginYearReduce') {
    //     // 取第一个非0的年份
    //     const list = row.filter((item) => item.ltcRate != '0.00');
    //     return list.length ? list[0].ltcDate : '-'
    //   } else { // 年降
    //     // 从非0开始至非0截至的数据 不包含0
    //     let strList = [];
    //     let strFlag = false;
    //     for (let i = 0; i < row.length; i++) {
    //       if (row[i].ltcRate != '0.00') {
    //         strFlag = true;
    //         strList.push(row[i].ltcRate);
    //       } else if (strFlag && row[i].ltcRate == '0.00') {
    //         break
    //       }
    //     }
    //     return strList.length ? strList.join('/') : '-'
    //   }
    // },
    resetLtcData,
    handleEdit() {
      this.isEdit = true;
    },
    cancelEdit() {
      this.isEdit = false;
      this.getRemark();
    },
    handleAddRemark() {
      this.remarkItem.push({ value: "", checked: false });
    },
    handleDeleteRemark() {
      this.remarkItem = this.remarkItem.filter((item) => !item.checked);
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
        // meetRemark: this.remarks[this.resetRemarkType],
        nominateAppId: this.nominateId,
        // remarkType: this.resetRemarkType
        remarks: this.remarkItem.map((item) => item.value),
      };
      updateRemark(params)
        .then((res) => {
          if (res?.result) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
            this.getRemark();
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
     * @Description: 页面初始化
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    init() {
      this.loading = true;
      if (this.isApproval) {
        this.reviewListRs();
      } else {
        this.getTopList();
      }
      this.getRemark();
      this.getDepartApproval();
      this.$route.query.partProjType == partProjTypes.JINLINGJIANHAOGENGGAI &&
        this.getFileList();
    },
    /**
     * @Description: 获取表格初始数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    getTopList() {
      this.tableLoading = true;

      getList(this.nominateId)
        .then((res) => {
          if (res?.result) {
            this.basicData = res.data || {};
            this.tableData = Array.isArray(this.basicData.lines)
              ? this.basicData.lines
              : [];
            this.projectType = res.data?.partProjectType || "";
            if (
              this.projectType != partProjTypes.DBLINGJIAN &&
              this.projectType != partProjTypes.DBYICHIXINGCAIGOU
            ) {
              this.searchRsPageExchangeRate();
            } else {
              if (this.basicData.currencyRateMap) {
                this.exchangeRate =
                  Object.keys(this.basicData.currencyRateMap)
                    .map((key) => {
                      return `1${
                        this.basicData.currencyMap &&
                        this.basicData.currencyMap[key]
                          ? this.basicData.currencyMap[key].code
                          : key
                      }=${this.basicData.currencyRateMap[key]}${
                        this.basicData.currencyMap.RMB
                          ? this.basicData.currencyMap.RMB.code
                          : "RMB"
                      }`;
                    })
                    .join("<br/>") || "1RMB=1.00RMB";
              } else {
                this.exchangeRate = "1RMB=1.00RMB";
              }
            }
            // this.projectType = partProjTypes.PEIJIAN
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
          this.$nextTick(() => {
            this.getHeight();
          });
        });
    },
    reviewListRs() {
      this.tableLoading = true;

      reviewListRs(this.nominateId)
        .then((res) => {
          if (res.code == 200) {
            this.basicData = res.data || {};
            this.tableData = Array.isArray(this.basicData.lines)
              ? this.basicData.lines
              : [];
            this.projectType = this.basicData.partProjectType || "";

            if (
              this.projectType != partProjTypes.DBLINGJIAN &&
              this.projectType != partProjTypes.DBYICHIXINGCAIGOU
            ) {
              this.searchRsPageExchangeRate();
            } else {
              if (this.basicData.currencyRateMap) {
                this.exchangeRate =
                  Object.keys(this.basicData.currencyRateMap)
                    .map((key) => {
                      return `1${
                        this.basicData.currencyMap &&
                        this.basicData.currencyMap[key]
                          ? this.basicData.currencyMap[key].code
                          : key
                      }=${this.basicData.currencyRateMap[key]}${
                        this.basicData.currencyMap.RMB
                          ? this.basicData.currencyMap.RMB.code
                          : "RMB"
                      }`;
                    })
                    .join("<br/>") || "1RMB=1.00RMB";
              } else {
                this.exchangeRate = "1RMB=1.00RMB";
              }
            }
          } else {
            this.basicData = {};
            this.tableData = [];
            this.projectType = "";
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .finally(() => {
          this.tableLoading = false;
          this.$nextTick(() => {
            this.getHeight();
          });
        });
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
          // res.data.forEach(element => {
          //   this.remarks[element.remarkType] = element.remark
          //   this.remarkItem = this.remarkItem.map(item => {
          //     return {...item, value: this.remarks[item.type]}
          //   })
          // })
          this.remarkItem = res.data.map((item) => {
            return { value: item, checked: false };
          });
        } else {
          this.remarks = {};
          iMessage.error(this.$i18n.locale === "zh" ? res?.desZh : res?.desEn);
        }
      });
    },
    handleOpenPage(row) {
      downloadUdFile(row.uploadId);
    },

    // 导出pdf
    // async handleExportPdf() {
    //   this.fileList = []
    //   this.loading = true
    //   this.showpdf = false
    //   this.$nextTick(()=>{
    //     setTimeout(async () => {
    //       let elList = this.$refs.circulation.getElementsByClassName('pageCard')
    //       if(!elList.length){
    //         iMessage.warn('无数据')
    //         this.loading = false
    //         return
    //       }
    //       for (let i = 0; i < elList.length; i++) {
    //         const el = elList[i];
    //         console.log('page'+(i+1)+' => start   total-page:'+elList.length);
    //         await this.getPdfImage({
    //           dom: el,
    //         })
    //         console.log('page'+(i+1)+' => end   total-page:'+elList.length);
    //       }
    //       this.showpdf = false
    //     }, 10)
    //   })
    // },

    // 导出pdf
    async handleExportPdf() {
      this.fileList = [];
      this.loading = true;
      this.WH = [];
      const elList = this.$refs["rsPdf"].$el.getElementsByClassName("pageCard");
      for (let i = 0; i < elList.length; i++) {
        const item = elList[i];
        this.WH.push({
          width: item.offsetWidth,
          height: item.offsetHeight,
        });
      }
      this.pdfPage = elList.length;
      this.showpdf = false;
      this.$nextTick(() => {
        setTimeout(async () => {
          if (!elList.length) {
            iMessage.warn("请稍等");
            this.loading = false;
            return;
          }
          for (let i = 0; i < elList.length; i++) {
            const el = elList[i];
            await this.getPdfImage({
              dom: el,
              index: i,
            });
          }
        }, 10);
      });
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.isSuggestion) {
        return "suggestionRow table-row";
      }
      return "table-row";
    },

    // 保存行备注
    handleSave() {
      this.saveLoading = true;

      updateRsMemo(
        this.tableData.map((item) => ({
          id: item.nomiMemoId,
          nominateId: this.nominateId,
          partProjId: item.partProjId,
          remarks: item.remarks || "",
          rfqId: item.rfqId,
          supplierId: item.supplierId,
        }))
      )
        .then((res) => {
          const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;

          if (res.code == 200) {
            iMessage.success(message);
            this.init();
            this.$store.dispatch("sourcing/updatePdfPage");
          } else {
            iMessage.error(message);
          }
        })
        .finally(() => (this.saveLoading = false));
    },

    // 截取页面,存入pdf
    // 截取页面,转图片, 上传服务器
    async getPdfImage({
      //html横向导出pdf
      dom,
      index,
    }) {
      console.time(`index${index}`);
      let this_ = this;
      let el = this.$refs.contentPdf;
      dom.getElementsByClassName("pageNum")[0].innerHTML = `page ${
        index + 1
      } of ${this_.pdfPage}`;
      el.style.width = this_.WH[index].width + "px";
      el.style.height = this_.WH[index].height + "px";
      el.innerHTML = dom.outerHTML;
      await html2canvas(el, {
        dpi: 96, //分辨率
        scale: this.pdfPage > 12 ? 1 : 2, //设置缩放
        useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
        bgcolor: "#ffffff", //应该这样写
        logging: false, //打印日志用的 可以不加默认为false
        ignoreElements: (el) => {
          if (el.id == "hide") {
            return true;
          }
          return false;
        },
      }).then((canvas) => {
        console.timeEnd(`index${index}`);
        this.getPdfFile(canvas, index);
      });
    },
    // // 截取页面,存入pdf
    // // 截取页面,转图片, 上传服务器
    // async getPdfImage({
    //   //html横向导出pdf
    //   dom,
    // }) {
    //   await html2canvas(dom, {
    //     dpi: 96, //分辨率
    //     scale: 2, //设置缩放
    //     useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
    //     bgcolor: "#ffffff", //应该这样写
    //     logging: false, //打印日志用的 可以不加默认为false
    //   }).then(async (canvas) => {
    //     await this.getPdfFile(canvas)
    //     // var contentWidth = canvas.width; //
    //     // var contentHeight = canvas.height; //
    //     // //一页pdf显示html页面生成的canvas高度;
    //     // var pageHeight = (contentWidth / 841.89) * 595.28; //
    //     // //未生成pdf的html页面高度
    //     // var leftHeight = contentHeight; //
    //     // var ctx = canvas.getContext("2d");

    //     // var copyCanvas = document.getElementById("myCanvas"); // 创建截图画布
    //     // copyCanvas.width = contentWidth;
    //     // copyCanvas.height = pageHeight;
    //     // var ctxs = copyCanvas.getContext("2d");
    //     // // 保存每一页的画布, 然后清空canvas
    //     // if (leftHeight <= pageHeight) {
    //     //   var imgData = ctx.getImageData(0, 0, contentWidth, pageHeight); // 截取主画布
    //     //   ctxs.putImageData(imgData, 0, 0); // 插入到截图画布中
    //     //   // 截图画布转为file
    //     //   await this.getPdfFile(copyCanvas)
    //     // } else {
    //     //   // 分页
    //     //   var num = 1;
    //     //   while (leftHeight > 0) {
    //     //     ctxs.clearRect(0, 0, contentWidth, pageHeight); //清空截图画布
    //     //     var imgData = ctx.getImageData(
    //     //       0,
    //     //       (num - 1) * pageHeight,
    //     //       contentWidth,
    //     //       pageHeight
    //     //     ); // 截取主画布当前页
    //     //     ctxs.putImageData(imgData, 0, 0); // 插入截图画布
    //     //     // 截图画布转为file
    //     //     await this.getPdfFile(copyCanvas)
    //     //     leftHeight -= pageHeight;
    //     //     // //避免添加空白页
    //     //     if (leftHeight > 0) {
    //     //       num++;
    //     //     }
    //     //   }
    //     // }
    //   });
    // },
    getPdfFile(copyCanvas, num) {
      copyCanvas.toBlob((blob) => {
        //以时间戳作为文件名 实时区分不同文件
        let filename = `${new Date().getTime()}.png`;
        let pdfFile = new File([blob], filename, { type: "image/png" });
        uploadUdFile({
          multifile: pdfFile,
        }).then((res) => {
          if (res.code == 200) {
            // console.log(res.data[0].objectUrl)
            this.fileList.push({ imageUrl: res.data[0].path, index: num });
            if (this.fileList.length == this.pdfPage) {
              this.DownloadPdf();
            }
          } else {
            this.$message.error(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
          }
        });
      });
    },
    // 下载 pdf 文件
    async DownloadPdf() {
      let arr = this.fileList.filter((item) => item.imageUrl);
      if (arr.length != this.fileList.length) return;
      const list = this.fileList
        .sort((a, b) => a.index - b.index)
        .map((item) => item.imageUrl);
      await decisionDownloadPdfLogo({
        filePaths: list,
        needLogo: false,
        needSplit: false,
        width: this.pageWidth,
        height: this.pageHeight,
      }); // 1.2 预留 页脚位置
      this.loading = false;
      this.showpdf = true;
    },

    // 上传图片
    async uploadUdFile() {
      this.fileList.map((item) => {
        uploadUdFile({
          multifile: item.file,
        }).then((res) => {
          if (res.code == 200) {
            item["imageUrl"] = res.data[0].path;
            // console.log(res.data[0].objectUrl);
            this.DownloadPdf();
          } else {
            this.$message.error(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
          }
        });
      });
    },

    // 获取汇率
    searchRsPageExchangeRate() {
      let id = this.$route.query.desinateId
        ? this.$route.query.desinateId
        : this.nominateId;
      searchRsPageExchangeRate(id).then((res) => {
        if (res.code == 200) {
          let sourceData = Array.isArray(res.data) ? res.data : [];

          sourceData = sourceData
            .filter((item) => !item.isCurrentVersion)
            .filter(
              (item) =>
                Array.isArray(item.exchangeRateVos) &&
                item.exchangeRateVos.length
            );

          const current = sourceData[0] ? sourceData[0] : {};

          if (Array.isArray(current.exchangeRateVos)) {
            this.exchangeRate =
              current.exchangeRateVos
                .map((item) => this.exchangeRateProcess(item))
                .join("<br/>") || "1RMB=1.00RMB";
          } else {
            this.exchangeRate = "1RMB=1.00RMB";
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

    /**
     * @Description: 获取部门审批记录
     */
    getDepartApproval() {
      getDepartApproval(
        this.$route.query.desinateId
          ? this.$route.query.desinateId
          : this.nominateId
      ).then((res) => {
        if (res.code == 200) {
          this.checkList = Array.isArray(res.data.nomiApprovalProcessNodeVOList)
            ? res.data.nomiApprovalProcessNodeVOList
            : [];
          this.processApplyDate = res.data.processApplyDate || "";
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res?.desZh : res?.desEn);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#myCanvas {
  display: none;
}
.demo {
  ::v-deep .card {
    .cardHeader {
      padding: 30px 0px;
    }
    .cardBody {
      padding: 0px;
    }
  }
}
.exchangeRageCurrency + .exchangeRageCurrency {
  margin-left: 20px;
}
.meetingRemark {
  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
}
.csc {
  ::v-deep .el-form-item__label {
    width: 150px;
  }
}
.isPreview {
  .card {
    box-shadow: none;
  }
}
.pgCard {
  ::v-deep .cardHeader {
    padding: 30px 40px 10px;
  }
}

.rsPdfWrapper,
.demo {
  width: 100%;
  height: 0;
  overflow: hidden;
  position: relative;
  top: 0;
}

.circulation {
  overflow: hidden;
  .infos {
    display: flex;
    padding: 0 0 20px;

    .infoWrapper {
      flex: 1;

      .info {
        font-size: 13px;
        display: flex;
        .label {
          font-weight: 800;
        }
      }
    }
  }
  .rsTable {
    font-size: 8px;
    &::before {
      height: 0;
    }
    ::v-deep .el-table__header th {
      background-color: #364d6e;
      padding-top: 8px;
      padding-bottom: 8px;
      & > .cell {
        padding-left: 3px;
        padding-right: 3px;
        line-height: unset;
        font-size: 12px;
        p {
          min-height: 16px;
        }
      }
    }
    ::v-deep .el-table__row {
      border-left: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
      td {
        border-top: 1px solid #ccc;
        .cell {
          padding-right: 1px;
          padding-left: 1px;
          line-height: unset;
        }
        &:first-child {
          .cell {
            padding-left: 8px;
          }
        }
      }
    }
    ::v-deep tr {
      &:nth-child(even) {
        background-color: #f7f7ff;
      }
    }
  }

  .rsCard {
    box-shadow: none;
    & + .rsCard {
      margin-top: 20px;
    }
    ::v-deep .cardHeader {
      padding: 30px 0px;
    }
    ::v-deep .cardBody {
      padding: 0px;
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
    }
  }

  .checkDate {
    ::v-deep .card .cardHeader .title {
      // font-size: 16px;
      font-weight: 400;
      color: rgba(75, 75, 76, 1);
    }
  }

  .Application {
    ::v-deep .cardHeader {
      padding-top: 12px;
      padding-bottom: 12px;
      .title .title_content {
        font-size: 14px !important;
      }
    }
  }

  .checkList {
    display: flex;
    overflow: auto;
    &-item {
      flex: 1;
      flex-shrink: 0;
      width: 224px;
      max-width: 224px;
      height: 125px;
      border-radius: 15px;
      background-color: rgba(22, 96, 241, 0.03);
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
  }
}
.page-logo {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  border-top: 1px solid #666;
}
.contentPdf {
  ::v-deep p {
    margin: 0;
    padding: 0;
    font-style: normal;
  }
  ::v-deep .rsCard {
    box-shadow: none;
    & + .rsCard {
      margin-top: 20px;
    }

    .cardHeader {
      padding: 30px 0px;
    }
    .cardBody {
      padding: 0px;
    }
  }
  ::v-deep .pdf-content {
    & + .pdf-content {
      margin-top: 20px;
    }
  }

  ::v-deep .rsTable {
    font-size: 8px;
    .el-table__header th {
      padding-top: 8px;
      padding-bottom: 8px;
      & > .cell {
        padding-left: 3px;
        padding-right: 3px;
        line-height: unset;
        p {
          margin: 0;
          min-height: 16px;
          line-height: 14px;
        }
      }
    }
    .el-table__row {
      border-left: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
      td {
        border-top: 1px solid #ccc;
        line-height: 23px;
        .cell {
          padding-right: 1px;
          padding-left: 1px;
          line-height: unset;
          p {
            line-height: 23px;
            margin: 0;
          }
        }
        &:first-child {
          .cell {
            padding-left: 8px;
          }
        }
      }
    }
    tr {
      &:nth-child(even) {
        background-color: #f7f7ff;
      }
    }
  }

  ::v-deep .infos {
    display: flex;
    padding: 0 0 20px;

    .infoWrapper {
      flex: 1;

      .info {
        font-size: 13px;
        display: flex;
        .label {
          font-weight: 800;
        }
      }
    }
  }
  ::v-deep .pdf-item,
  .pageCard {
    .cardHeader {
      padding-left: 0;
    }
    .cardBody {
      padding-left: 0;
      padding-right: 0;
    }
  }

  ::v-deep .beizhu {
    background-color: rgba(22, 96, 241, 0.03);
    // height: 40px;
    padding: 12px 14px; /*no*/
    font-weight: bold;
    display: flex;
    &-value {
      font-weight: 400;
      margin-left: 20px;
    }
  }
  ::v-deep .page-logo {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    border-top: 1px solid #666;
  }

  ::v-deep .checkDate {
    .card .cardHeader .title {
      // font-size: 16px;
      font-weight: 400;
      color: rgba(75, 75, 76, 1);
    }
  }

  ::v-deep .Application {
    .cardHeader {
      padding-top: 12px;
      padding-bottom: 12px;
      .title .title_content {
        font-size: 13px !important;
      }
    }
  }

  ::v-deep .checkList {
    display: flex;
    overflow: auto;
    &-item {
      flex: 1;
      flex-shrink: 0;
      max-width: 224px;
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

  ::v-deep .complete {
    color: rgb(104, 193, 131);
  }

  ::v-deep .cancel {
    color: rgb(95, 104, 121);
  }
}
</style>
