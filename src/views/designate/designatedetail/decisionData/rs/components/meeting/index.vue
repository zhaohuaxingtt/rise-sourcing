<!--
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:17:25
 * @LastEditors: YoHo
 * @LastEditTime: 2022-03-29 22:12:49
 * @Description: 上会/备案RS单
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\rs\components\meeting\index.vue
-->

<template>
  <div class="meeting" :class="isPreview && 'isPreview'" v-loading="loading">
    <div class="rsPdfWrapper">
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
        :firstCount="firstCount"
        :count="count"
        :remarkItem="remarkItem"
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
        :otherTableHeight="otherTableHeight"
        :prototypeListPageHeight="prototypeListPageHeight"
        :prototypeTableList="prototypeTableList"
        :prototypeTitleList="prototypeTitleList" />
    </div>
    <iCard class="rsCard">
      <template #header>
        <div v-if="!isRoutePreview && !isApproval" class="btnWrapper">
          <iButton @click="handleExportPdf">{{ language("DAOCHURSDAN", "导出RS单") }}</iButton>
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
      <div class="out-compute">
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
      <iCard v-if="!showSignatureForm && !isAuth" class="checkDate Application" :class="!isPreview && 'margin-top20'" :title="'Application Date：'+processApplyDate">
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
              <span>{{item.approveDate}}</span>
            </div>
          </div>
        </div>
      </iCard>
      <iCard title="Prototype Cost List" class="margin-top20" v-if='!showSignatureForm && PrototypeList.length > 5'>
        <el-table :data='PrototypeList' class="prototypeList" row-class-name="table-row">
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
import { nomalDetailTitle,nomalDetailTitleGS,nomalDetailTitlePF, nomalDetailTitleBlue, nomalTableTitle, meetingRemark, checkList, gsDetailTitleBlue, gsTableTitle,sparePartTableTitle,accessoryTableTitle,prototypeTitleList,dbTableTitle, resetLtcData } from './data'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { getList, getRemark, updateRemark,getPrototypeList, getDepartApproval, searchRsPageExchangeRate, reviewListRs } from '@/api/designate/decisiondata/rs'
import {partProjTypes} from '@/config'
import { findFrontPageSeat, decisionDownloadPdfLogo } from '@/api/designate'
import { toThousands } from "@/utils"
import { transverseDownloadPDF } from "@/utils/pdf"
import rsPdf from "./rsPdf"
import {
    uploadUdFile
} from '@/api/file/upload'

export default {
  props: {
    isPreview: {type:Boolean, default:false},
    nominateId: {type:String},
    // projectType: {type:String},
    showSignatureForm: {type:Boolean, default:false}
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
      PrototypeList:[],
      prototypeTitleList:prototypeTitleList,
      processApplyDate: '',
      projectType: '',
      isSingle: false,
      suppliers: '',
      exchangeRates: [],
      isAuth: false,
      pdfData: {},
      firstCount: 0,
      count: 0,
      fileList:[],
      tableLoading: false,
      otherTableHeight:0,
      prototypeListPageHeight:0,
      tableHeight:0,
      tableList:[],
      prototypeTableList:[],
    }
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
      if ([partProjTypes.GSLINGJIAN,partProjTypes.GSCOMMONSOURCING].includes(this.projectType)) {
        return nomalDetailTitleGS
      }
      // 配附件
      if ([partProjTypes.PEIJIAN,partProjTypes.FUJIAN].includes(this.projectType)) {
        return nomalDetailTitlePF
      }
      // 其他
      return nomalDetailTitle
    },
    rightTitle() {
      // GS
      if ([partProjTypes.GSLINGJIAN,partProjTypes.GSCOMMONSOURCING].includes(this.projectType)) {
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
      } else if (this.projectType === partProjTypes.GSLINGJIAN || this.projectType === partProjTypes.GSCOMMONSOURCING) { //GS零件
        return gsTableTitle
      } else if (this.projectType === partProjTypes.DBLINGJIAN || this.projectType === partProjTypes.DBYICHIXINGCAIGOU) { //DB零件,DB一次性采购
        return dbTableTitle
      }
      return nomalTableTitle
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
      return this.remarkItem.map(item => item.value).join('\n')
    },
    isRoutePreview() {
      return this.$route.query.isPreview == 1
    },
    isApproval() {
      return this.$route.query.isApproval === "true"
    }
  },
  created(){
    this.isAuth = this.$route.query.type === "auth"
    // this.getPrototypeList()
  },
  mounted(){
  },
  methods: {
    getHeight(){
      setTimeout(()=>{
      let dom = this.$refs.rsPdf.$el
      this.width = dom.offsetWidth
      this.pageHeight = (this.width / 841.89) * 595.28; // 横版A4一页对应的高度
      let tableHeader = 57  // 表头高度
      let padding = 0 // 内边距高度
      let headerHeight = 106 // 顶部标题高度, 第一页独有的
      let pageLogo = 86     // logo 区域高度
      let pageTop = document.getElementsByClassName('page-top')[0].offsetHeight  //248 // 顶部内容高度, 第一页独有的 page-top
      // let topHeight = document.getElementsByClassName('position-compute')[0].offsetHeight + headerHeight  // 顶部内容加标题高度, 第一页独有的内容
      let el = document.getElementsByClassName('Application')[0].offsetHeight  // 审批备注
      let outEl = document.getElementsByClassName('out-compute')[0].offsetHeight  // 备注
      for (let i = 0; i < el.length; i++) {
        height += el[i].offsetHeight;
      }
      // 第一页
      this.tableHeight = this.pageHeight - headerHeight - pageTop - pageLogo - 1
      // 第二页
      this.otherTableHeight = this.pageHeight - pageLogo - 21

      let rowList = document.getElementsByClassName('mainTable')[0].getElementsByClassName('el-table__body-wrapper')[0].getElementsByClassName('table-row')
      let arr = []
      let heightSum = 0
      let tableList = []
      rowList.forEach((item,i)=>{
        heightSum+=item.offsetHeight
        if(tableList.length==0){
          if(heightSum<this.tableHeight - tableHeader - outEl - el){
            arr.push(this.tableData[i])
          }else{
            tableList.push(JSON.parse(JSON.stringify(arr)))
            heightSum=item.offsetHeight
            arr = [this.tableData[i]]
          }
        }else{
          if(heightSum<this.otherTableHeight - tableHeader - outEl - el){
            arr.push(this.tableData[i])
          }else{
            tableList.push(JSON.parse(JSON.stringify(arr)))
            heightSum=item.offsetHeight
            arr = [this.tableData[i]]
          }
        }
      })
        
      tableList.push(JSON.parse(JSON.stringify(arr)))
      this.tableList = tableList
         },1000)
    },
    getPrototypeListHeight(){
      setTimeout(() => {
        let dom = this.$refs.rsPdf.$el
        this.width = dom.offsetWidth
        this.pageHeight = (this.width / 841.89) * 595.28; // 横版A4一页对应的高度
        console.log(this.pageHeight);
        let tableHeader = 41  // 表头高度
        let headerHeight = 84  // 表头高度
        let pageLogo = 86     // logo 区域高度
        let rowList = document.getElementsByClassName('prototypeList')[0].getElementsByClassName('el-table__body-wrapper')[0].getElementsByClassName('table-row')

        this.prototypeListPageHeight = this.pageHeight - headerHeight - pageLogo - 21
        let arr = []
      let heightSum = 0
      let PrototypeList = []
      rowList.forEach((item,i)=>{
        heightSum+=item.offsetHeight
        if(PrototypeList.length==0){
          if(heightSum<this.prototypeListPageHeight - tableHeader){
            arr.push(this.PrototypeList[i])
          }else{
            PrototypeList.push(JSON.parse(JSON.stringify(arr)))
            heightSum=item.offsetHeight
            arr = [this.PrototypeList[i]]
          }
        }else{
          if(heightSum<this.prototypeListPageHeight - tableHeader){
            arr.push(this.PrototypeList[i])
          }else{
            PrototypeList.push(JSON.parse(JSON.stringify(arr)))
            heightSum=item.offsetHeight
            arr = [this.PrototypeList[i]]
          }
        }
      })
        
      PrototypeList.push(JSON.parse(JSON.stringify(arr)))
      this.prototypeTableList = PrototypeList
        console.log(PrototypeList);
        console.log(heightSum);
      }, 1000);
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
          setTimeout(()=>{
            this.getPrototypeListHeight()
          },1000)
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
          this.getRemark()
          this.getPrototypeList()
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

      getList(this.nominateId).then(res => {
        if (res?.result) {
          let temdata = res.data || {}
          temdata.suppliersNow =temdata.supplierVoList
          if(temdata.partNameDe){
            temdata.partName = `${temdata.partName}/${temdata.partNameDe}`
          }
          this.basicData = temdata
          let data = res.data?.lines ?? []
          data.forEach((val,index) => {
            let suppliersNowCn =[]
            let suppliersNowEn =[]
            val.supplierVoList.forEach(val =>{
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
          this.projectType = res.data.partProjectType || ''

          this.searchRsPageExchangeRate()
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
          setTimeout(()=>{
            this.getHeight()
          },1000)
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
      return `1${ row.originCurrencyCode }=${ row.exchangeRate }${ row.currencyCode }`
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
          let data = res.data?.lines
          data.forEach((val,index) => {
            let suppliersNowCn =[]
            let suppliersNowEn =[]
            val.supplierVoList.forEach(val =>{
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
          this.projectType = res.data.partProjectType || ""

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

    // 是否跨页面, 需要分割
    isSplit(nodes, index, pageHeight) {
      // 计算当前这块d是否跨越了a4大小，以此分割
      if (
        nodes[index].offsetTop + nodes[index].offsetHeight < pageHeight &&
        nodes[index + 1] &&
        nodes[index + 1].offsetTop + nodes[index + 1].offsetHeight > pageHeight
      ) {
        return true;
      }
      return false;
    },
    // 创建空白元素,撑开跨页面空间
    createEl() {
      let vm = this;
      const A4_WIDTH = 841.89;
      const A4_HEIGHT = 595.28;
      this. initTop = 0
      vm.$nextTick(() => {
        // dom的id。
        let target = this.$refs.rsPdf.$el;
        let pageHeight = (target.clientWidth / A4_WIDTH) * A4_HEIGHT; // a4每页对应页面的高度
        // 获取分割dom，此处为class类名为item的dom
        let lableListID = document.getElementsByClassName("pdf-item");
        // 进行分割操作，当dom内容已超出a4的高度，则将该dom前插入一个空dom，把他挤下去，分割
        for (let i = 0; i < lableListID.length; i++) {
          let multiple = Math.ceil(
            (lableListID[i].offsetTop + lableListID[i].offsetHeight) /
              pageHeight
          );  // 页码
          if (this.isSplit(lableListID, i, multiple * pageHeight)) {  // 下一个item节点是否跨域了a4页面
            let divParent = lableListID[i].parentNode; // 获取该div的父节点
            let newNode = document.createElement("div");
            newNode.className = "emptyDiv";
            newNode.style.background = "transparent";
            // 当前页高度减去div下边框距顶部高度，等于到底部的距离
            let _H = multiple * pageHeight - (lableListID[i].offsetTop + lableListID[i].offsetHeight);
            newNode.style.height = _H + "px";
            newNode.style.width = "100%";
            let next = lableListID[i].nextSibling; // 获取div的下一个兄弟节点
            // 判断兄弟节点是否存在
            if (next) {
              // 存在则将新节点插入到div的下一个兄弟节点之前，即div之后
              divParent.insertBefore(newNode, next);
            } else {
              // 不存在则直接添加到最后,appendChild默认添加到divParent的最后
              divParent.appendChild(newNode);
            }
          }
        }
      this.getPdfImage({
        dom: this.$refs.rsPdf.$el,
        pdfName: `定点申请_${ this.$route.query.desinateId }_RS单`,
        exportPdf: true,
        waterMark: true
      })
      });
    },
    // 导出pdf
    handleExportPdf() {
      this.loading = true
      this.getPdfImage({
        dom: this.$refs.rsPdf.$el,
        pdfName: `定点申请_${ this.$route.query.desinateId }_RS单`,
        exportPdf: true,
        waterMark: true
      })
      // this.createEl()
    },
    // 截取页面,存入pdf
    // 截取页面,转图片, 上传服务器
    getPdfImage({
      //html横向导出pdf
      idEle: ele,
      dom,
      pdfName: pdfName,
      callback: callback,
      exportPdf: exportPdf,
    }) {
      let el = "";
      if (ele) el = document.getElementById(ele);
      //通过getElementById获取要导出的内容
      else el = dom;
      let eleW = el.offsetWidth; // 获得该容器的宽
      let eleH = el.offsetHeight; // 获得该容器的高
      var canvasFragment = document.createElement("canvas");
      canvasFragment.width = eleW; // 将画布宽&&高放大两倍
      canvasFragment.height = eleH;
      this.height = canvasFragment.height;
      var context = canvasFragment.getContext("2d");
      context.scale(2, 2);
      html2canvas(el, {
        dpi: 96, //分辨率
        scale: 1, //设置缩放
        useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
        bgcolor: "#ffffff", //应该这样写
        logging: false, //打印日志用的 可以不加默认为false
      }).then((canvas) => {
        var contentWidth = canvas.width; //
        var contentHeight = canvas.height; //
        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = (contentWidth / 841.89) * 595.28; //
        //未生成pdf的html页面高度
        var leftHeight = contentHeight; //
        var ctx = canvas.getContext("2d");

        var copyCanvas = document.getElementById("myCanvas"); // 创建截图画布
        copyCanvas.width = contentWidth;
        copyCanvas.height = pageHeight;
        var ctxs = copyCanvas.getContext("2d");
        // 保存每一页的画布, 然后清空canvas
        if (leftHeight < pageHeight) {
          //   console.log(pageData);
          var imgData = ctx.getImageData(0, 0, contentWidth, pageHeight); // 截取主画布
          ctxs.putImageData(imgData, 0, 0); // 插入到截图画布中
          // 截图画布转为file
          copyCanvas.toBlob((blob) => {
            //以时间戳作为文件名 实时区分不同文件
            let filename = `${new Date().getTime()}.png`;
            //转换canvas图片数据格式为formData
            let pdfFile = new File([blob], filename, { type: "image/png" });
            this.fileList.push({ file: pdfFile });
          });
        } else {
          // 分页
          var num = 1;
          while (leftHeight > 0) {
            ctxs.clearRect(0, 0, contentWidth, pageHeight); //清空截图画布
            var imgData = ctx.getImageData(
              0,
              (num - 1) * pageHeight,
              contentWidth,
              pageHeight
            ); // 截取主画布当前页
            ctxs.putImageData(imgData, 0, 0); // 插入截图画布
            // 截图画布转为file
            copyCanvas.toBlob((blob) => {
              //以时间戳作为文件名 实时区分不同文件
              let filename = `${new Date().getTime()}.png`;
              let pdfFile = new File([blob], filename, { type: "image/png" });
              this.fileList.push({ file: pdfFile });
            });
            leftHeight -= pageHeight;
            // //避免添加空白页
            if (leftHeight > 0) {
              num++;
            }
          }
        }
        // if (callback) {
        //   callback(pdf, pdfName)
        // }
        this.$nextTick(() => {
          setTimeout(() => {
            this.uploadUdFile();
          }, 1000);
        });
      });
    },

    // 下载 pdf 文件
    async DownloadPdf(){
      let arr = this.fileList.filter(item=>!item.imageUrl)
      if(arr.length) return
      const list = this.fileList.map((item)=>item.imageUrl);
      await decisionDownloadPdfLogo({filePaths:list, needLogo:true, needSplit:true, width: this.width, height: this.pageHeight})  // 1.2 预留 页脚位置
      this.loading = false
    },

    // 上传图片
    async uploadUdFile(){
      this.fileList.map((item)=>{
        uploadUdFile({
        multifile: item.file
        }).then(res=>{
          if(res.code == 200){
            item['imageUrl'] = res.data[0].path
            console.log(res.data[0].objectUrl);
            this.DownloadPdf();
          }else{
            this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        });
      })
    },
  }
}
</script>

<style lang="scss" scoped>
#myCanvas{
  display: none;
}
.meeting {
  height: 100vh;
  overflow-y: auto;
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
  border: 1px dashed #1660F1;
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
      line-height: 14px;
      span {
        // zoom: 0.85;
      }

      // span span {
      //   // font-size: 8px;
      // }
      p {
        min-height: 16px;
      }

      p + p {
        margin-top: 8px;
      }
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
.rsTop {
  display: flex;
    .rsTop-left-item-title{
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
      height: 17px;
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
      border-bottom: 1px solid rgba(197, 204, 214, 0.42);;
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
  padding: 12px 14px;
  font-weight: bold;
  display: flex;
  &-value {
    font-weight: 400;
    margin-left: 20px;
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
    height: 178px;
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
.isPreview {
  .card {
    box-shadow: none;
  }
}

.rsPdfWrapper { // 放在顶部, 便于计算高度
  // width: 100%;
  // height: 0;
  // overflow: hidden;
  position: relative;
  top: 0;
}
</style>
