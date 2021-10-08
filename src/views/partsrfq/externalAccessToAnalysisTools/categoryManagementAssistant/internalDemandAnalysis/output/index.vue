<!--
 * @Author: 舒杰
 * @Date: 2021-08-05 16:27:21
 * @LastEditTime: 2021-09-30 13:23:59
 * @LastEditors: zbin
 * @Description: 产量总览
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\output\index.vue
-->
<template>
   <iCard class="margin-top20" id="output">
      <template slot="header">
         <div class="flex-between-center title">
            <div class="flex-align-center">
               <span class="margin-right10">{{language("CHANLIANGZONGLAN","产量总览")}}</span>
               <el-popover trigger="hover" placement="bottom-start"  width="800">
                  <div>提供过往三年至未来两年的材料组零件产量总览：</div>
                  <div class="tip">
                     <p>产量数据：历史零件产量数据来源于FIS车型生产记录以及PBOM，未来零件产量数据来源于最新的BKM KTB产量计划</p>
                     <p>供应商供货比例：供应商供货比例数据来源于历史货源配额计划，历史定点记录，以及BKM中的未来零件供货比例</p>
                  </div>
                  <icon slot="reference" name="iconxinxitishi" symbol class="cursor"></icon>
               </el-popover>
            </div>
            <div class="flex">
               <iButton @click="save">{{ language("BAOCUN", "保存") }}</iButton>
			      <iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
            </div>
         </div>
		</template>
      <div class="flex-between-center">
         <div class="flex">
            <iDatePicker class="select" :placeholder="language('QINGXUANZHEMNIANFENG','请选择年份')" value-format="yyyy" type="year" v-model="selectFilterYear" :picker-options="pickerOptions" />
            <iSelect class="select" v-model="config.pageName">
               <el-option :value="item.code" :label="item.name" v-for="(item,index) in dictData.CATEGORY_MANAGEMENT_LIST" :key="index"></el-option>
            </iSelect>
         </div>
         <div>
            <iButton @click="confirmFilter">{{ language("QUEREN", "确认") }}</iButton>
            <iButton @click="reset">{{ language("CHONGZHI", "重置") }}</iButton>
         </div>
      </div>
      <!-- powerBi -->
      <div id="powerBi"></div>
   </iCard>
</template>
<script>
import {iCard,iButton,iSelect,iDatePicker,iMessage,icon} from "rise";
import {getCmOutputPbi} from "@/api/categoryManagementAssistant/internalDemandAnalysis/output";
import * as pbi from 'powerbi-client';
import { selectDictByKeys } from "@/api/dictionary";
import {downloadPdfMixins} from '@/utils/pdf';
import {categoryAnalysis} from "@/api/categoryManagementAssistant/internalDemandAnalysis";
import {getCategoryAnalysis} from "@/api/categoryManagementAssistant/internalDemandAnalysis";
import {setWaterMark,removeWatermark} from 'rise/utils/watermark'
export default {
   mixins: [downloadPdfMixins],
   components:{iCard,iButton,iSelect,iDatePicker,icon},
   data () {
      return {
         categoryCode:"",
          //初始化配置
         config:{
            type: 'report',
            tokenType: pbi.models.TokenType.Embed,
            accessToken:"",
            embedUrl: "",
            pageName:"",
            settings: {
               panes: {
                  filters: {
                     visible: false
                  },
                  pageNavigation: {
                     visible: false
                  }
               }
            }
         },
         filter : {
            $schema: "http://powerbi.com/product/schema#basic",
            target: {
               table: "2_tovlo_overview",
               column: "category_id"
            },
            operator: "In",
            values: [],//材料组code
            filterType: pbi.models.FilterType.BasicFilter,
            requireSingleSelection: true
         },
         filterYear : {
            $schema: "http://powerbi.com/product/schema#basic",
            target: {
               table: "DimYear",
               column: "YearNo"
            },
            operator: "In",
            values: [],//年份
            filterType: pbi.models.FilterType.BasicFilter,
            requireSingleSelection: true
         },
         report:null,
         url: {
            accessToken: "", //验证token
            embedUrl: "", //报告信息内嵌地址
            tokenExpiry: ""//token过期时间
         },
         reportContainer:null,
         dictData:{
            CATEGORY_MANAGEMENT_LIST:[]
         },
         selectFilterYear:"",//当前选择的年
         pickerOptions: {
            disabledDate(time) {
               let currentYear = new Date().getFullYear()
               return time.getFullYear() !== currentYear && time.getFullYear() !== currentYear - 1 && time.getFullYear() !== currentYear - 2;
            }
         },
      }
   },
   created () {
      this.categoryCode=this.$store.state.rfq.categoryCode
   },
   mounted () {
		this.getPowerBiUrl()
   },
   computed: {
      // eslint-disable-next-line no-undef
     ...Vuex.mapState({
         userInfo: (state) => state.permission.userInfo,
      }), 
   },
   destroyed(){
      // removeWatermark()
   },
   watch:{
      '$i18n.locale':{
         handler(newValue){
         this.renderBi()
      }},
      '$store.state.rfq.categoryCode'(newVal){
         this.categoryCode=this.$store.state.rfq.categoryCode
         this.selectFilterYear=''
         this.config.pageName=''
         this.renderBi()
      }
   },
   methods: {
      // 保存
      async save(){
         // setWaterMark(this.userInfo.nameZh+this.userInfo.id+'仅供CS内部使用',1000,700)
         let typeName=""
         this.dictData.CATEGORY_MANAGEMENT_LIST.filter(item=>{
            if(item.code==this.config.pageName){
               typeName=item.name+'_'
            }
         })
         const resFile = await this.getDownloadFileAndExportPdf({
            domId: 'output',
            watermark: this.$store.state.permission.userInfo.deptDTO.nameEn + '-' + this.$store.state.permission.userInfo.userNum + '-' + this.$store.state.permission.userInfo.nameZh + "^" + window.moment().format('YYYY-MM-DD HH:mm:ss'),
            pdfName: '品类管理助手_产量总览_'+ typeName + this.$store.state.rfq.categoryName + '_' + window.moment().format('YYYY-MM-DD') +'_',
         });
         console.log(resFile)
         // removeWatermark()
         let schemeType=""
         switch (this.config.pageName) {
            case "ReportSection54602a61cb108b45223a":
               schemeType="CATEGORY_MANAGEMENT_OUTPUT_OVERVIEW_FACTORY"
               break;
            case "ReportSection99057dcf18326c502965":
               schemeType="CATEGORY_MANAGEMENT_OUTPUT_OVERVIEW_PLATFORM"
               break;
            case "ReportSection0e9a44775000348abbed":
               schemeType="CATEGORY_MANAGEMENT_OUTPUT_OVERVIEW_CARTYPE"
               break;
            case "ReportSection":
               schemeType="CATEGORY_MANAGEMENT_OUTPUT_OVERVIEW_SUPPLIER"
               break;
         }
         let params={
            categoryCode:this.categoryCode,
            fileType:"PDF",
            schemeType:schemeType,
            reportFileName: resFile.downloadName,
            reportName: resFile.downloadName,
            schemeName:"",
            reportUrl: resFile.downloadUrl,
            operateLog:JSON.stringify({
               selectFilterYear:this.selectFilterYear,
               pageName:this.config.pageName}) 
         }
         categoryAnalysis(params).then(res=>{
            if(res.code=='200'){
               iMessage.success(this.language('BAOCUNCHENGGONG','保存成功'))
            }
         })
      },
      // 切换类型
      confirmFilter(){
         this.renderBi()
      },
      // 重置
      reset(){
         this.config.pageName=this.dictData.CATEGORY_MANAGEMENT_LIST[0].code
         this.selectFilterYear= String(new Date().getFullYear()) 
         this.renderBi()
      },
      // 数据字典
      getDict() {
         selectDictByKeys([{ keys: "CATEGORY_MANAGEMENT_LIST" }]).then(res=>{
            this.dictData=res.data
            this.init()
            this.renderBi()
         })
      },
      // 获取财报iframeurl
      getPowerBiUrl() {
            getCmOutputPbi().then(res => {
            if (res.data) {
               this.url = res.data
               this.getCategoryAnalysis()
            }
         })
      },
      // 获取历史筛选条件
      getCategoryAnalysis(){
         let parasm={
            categoryCode:this.categoryCode,
            schemeType:"CATEGORY_MANAGEMENT_OUTPUT_OVERVIEW"
         }
         getCategoryAnalysis(parasm).then(res=>{
            let operateLog=JSON.parse(res.data.operateLog)
            if(operateLog){
               this.selectFilterYear=operateLog.selectFilterYear
               this.config.pageName=operateLog.pageName
            }
            this.getDict()
         })
      },
      // 初始化配置
      init(){
         this.config.embedUrl=this.url.embedUrl
         this.config.accessToken=this.url.accessToken
         // this.config.pageName=this.dictData.CATEGORY_MANAGEMENT_LIST[0].code
         // this.selectFilterYear= String(new Date().getFullYear()) 
         this.reportContainer = document.getElementById('powerBi');
         this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
      },
      renderBi() {
         this.filter.values=[this.categoryCode]
         this.filterYear.values=this.selectFilterYear?[parseInt(this.selectFilterYear)]:[this.selectFilterYear]
         var report = this.powerbi.embed(this.reportContainer, this.config);
         report.off("loaded");
         report.on("loaded", ()=> {
            report.setFilters([this.filter,this.filterYear])
         });
         // Report.off removes a given event handler if it exists.
         report.off("rendered");
         // Report.on will add an event handler which prints to Log window.
         report.on("rendered", function() {
            console.log("Rendered");
         });
         // report.off("filtersApplied")
         report.on("filtersApplied", function() {
            console.log("filtersApplied");
         });
         report.on("error", function(event) {
            report.off("error");
         });
         report.off("saved");
         report.on("saved", function(event) {
            if (event.detail.saveAs) {
               console.log('In order to interact with the new report, create a new token and load the new report');
            }
         });
         this.report=report
         document.getElementsByTagName('iframe')[0].style.border = 'none'
      },
      // 返回
      back(){
         this.$router.go(-1)
      }
   }
}
</script>
<style lang="scss" scoped>
.title{
   width: 100%;
}
   .select{
      width:200px;
      margin-right:30px;
   }
   #powerBi {
		width: 100%;
		height: calc(100vh - 350px);
      margin-top: 20px;
	}
   .tip{
      >p{
         padding-left:15px;
      }
   }
</style>