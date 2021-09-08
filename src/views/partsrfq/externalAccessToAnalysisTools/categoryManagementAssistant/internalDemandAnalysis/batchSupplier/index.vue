<!--
 * @Author: 舒杰
 * @Date: 2021-08-05 16:27:57
 * @LastEditTime: 2021-09-08 10:11:21
 * @LastEditors: 舒杰
 * @Description: 批量供应商概览
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\batchSupplier\index.vue
-->
<template>
   <iCard class="margin-top20" id="batchSupplier">
      <template slot="header">
         <div class="flex-between-center title">
            <div class="flex-align-center">
               <span>{{language("PLGYSGL","批量供应商概览")}}</span>
               <el-tooltip :content="mark" placement="top" effect="light" :disabled="!mark">
                  <span class="mark">{{mark}}</span>
               </el-tooltip>
            </div>
            <div class="flex">
               <iButton @click="onJump360">{{ language("GONGYINGSHANG360", "供应商360") }}</iButton>
               <iButton @click="openMark">{{ language("BEIZHU", "备注") }}</iButton>
               <iButton @click="save">{{ language("BAOCUN", "保存") }}</iButton>
               <iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
            </div>
         </div>
		</template>
      <!-- powerBi -->
      <div id="powerBi"></div>
      <!-- 备注 -->
      <marks @sure="saveMark" v-model="markShow" ref="marks"></marks>
   </iCard>
</template>
<script>
import {iCard,iButton,iMessage} from "rise";
import {getCmSupplierPbi} from "@/api/categoryManagementAssistant/internalDemandAnalysis/batchSupplier";
import * as pbi from 'powerbi-client';
import {getCategoryAnalysis,categoryAnalysis} from "@/api/categoryManagementAssistant/internalDemandAnalysis";
import marks from "./marks";
import {downloadPdfMixins} from '@/utils/pdf';
export default {
   mixins: [downloadPdfMixins],
   components:{iCard,iButton,marks},
   data () {
      return {
         config :{
            type: 'report',
            tokenType: pbi.models.TokenType.Embed,
            accessToken: '',
            embedUrl: '',
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
               table: "Table_Par&Stu",
               column: "Stuff_ID"
            },
            operator: "In",
            values: [],//
            filterType: null,
            requireSingleSelection: true
         },
         report:null,
         url: {
            accessToken: "", //验证token
            embedUrl: "", //报告信息内嵌地址
            tokenExpiry: ""//token过期时间
         },
         reportContainer:null,
         categoryCode:"",
         mark:"",
         markShow:false
      }
   },
   created () {
      this.categoryCode=this.$store.state.rfq.categoryCode
      this.getCategoryAnalysis()
   },
   mounted () {
		this.getPowerBiUrl()
   },
   watch:{
      '$i18n.locale':{
         handler(newValue){
         this.config.pageName=newValue=='zh'?'ReportSectione9fe87a027d2550c28a9':'ReportSection616eb7861df2ef50a3cd'
         this.renderBi()
      }},
      '$store.state.rfq.categoryCode'(newVal){
         this.categoryCode=this.$store.state.rfq.categoryCode
         this.renderBi()
      }
   },
   methods: {
      // 获取近期操作数据
      getCategoryAnalysis(){
         let params={
            categoryCode:this.categoryCode,
            schemeType:"CATEGORY_MANAGEMENT_PURCHASE_AMOUNT"
         }
         getCategoryAnalysis(params).then(res=>{
            if(res.data){
               this.mark=res.data.operateLog
            }
         })
      },
      // 保存备注
      saveMark(mark){
         this.mark=mark
         this.markShow=false
      },
      // 保存
      async save(){
         const resFile = await this.getDownloadFileAndExportPdf({
            domId: 'batchSupplier',
            pdfName: this.language('PLGYSGL', '批量供应商概览') + '-' + this.$store.state.rfq.categoryName + '-' + new Date().toLocaleDateString()+'-',
         });
         let params={
            categoryCode:this.categoryCode,
            fileType:"PDF",
            operateLog:this.mark,
            schemeType:"BATCH_SUPPLIER_OVERVIEW",
            reportFileName: resFile.downloadName,
            reportName: resFile.downloadName,
            schemeName:"",
            reportUrl: resFile.downloadUrl
         }
         categoryAnalysis(params).then(res=>{
            if(res.code=='200'){
               iMessage.success(this.language('BAOCUNCHENGGONG','保存成功'))
            }
         })
      },
      // 打开保存弹窗
      openMark(){
         this.markShow=true
         this.$refs.marks.getMarkdefalut(this.mark)
      },
      // 供应商360
      onJump360(){
         window.open('http://10.122.17.38/portal/#/supplier/supplierList')
      },
      // 获取财报iframeurl
      getPowerBiUrl() {
            getCmSupplierPbi().then(res => {
            if (res.data) {
               this.url = res.data
               this.init()
               this.renderBi()
            }
         })
      },
      // 初始化配置
      init(){
         this.config.embedUrl=this.url.embedUrl
         this.config.accessToken=this.url.accessToken
         this.reportContainer = document.getElementById('powerBi');
         this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
      },
      renderBi() {
         this.filter.values=[this.categoryCode]
         var report = this.powerbi.embed(this.reportContainer, this.config);
         // Report.off removes a given event handler if it exists.
         report.off("loaded");
         // Report.on will add an event handler which prints to Log window.
         const newfilter = window._.cloneDeep(this.filter);
         report.on("loaded", ()=> {
            report.setFilters([newfilter])
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
               console.log(
                  'In order to interact with the new report, create a new token and load the new report'
                  );
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
   .mark{
      font-size: 14px !important;
      opacity: 0.42;
      margin-left: 32px;
      font-weight: normal;
      max-width: 590px;
      @include text_;
   }
}
.select{
   width:120px;
   margin-right:30px;
}
#powerBi {
	width: 100%;
	height: calc(100vh - 300px);
}
</style>