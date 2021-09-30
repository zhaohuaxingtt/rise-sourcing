<!--
 * @Author: 舒杰
 * @Date: 2021-08-05 16:27:57
 * @LastEditTime: 2021-09-30 13:22:32
 * @LastEditors: zbin
 * @Description: 批量供应商概览
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\batchSupplier\index.vue
-->
<template>
   <iCard class="margin-top20" id="batchSupplier">
      <template slot="header">
         <div class="flex-between-center title">
            <div class="flex-align-center">
               <span class="margin-right10">{{language("PLGYSGL","批量供应商概览")}}</span>
               <el-popover trigger="hover"  placement="bottom-start" width="800">
                  <div>提供过往三年至未来两年的材料组内批量供应商的供货金额，LTC&JPV数据概览：</div>
                  <div class="tip">
                     <p >价格数据：来源于零件台账价格</p>
                     <p >产量数据：历史零件产量数据来源于FIS车型生产记录以及PBOM，未来零件产量数据来源于最新的BKM KTB产量计划</p>
                     <p >供应商供货比例：供应商供货比例数据来源于历史货源配额计划，历史定点记录，以及BKM中的未来零件供货比例</p>
                     <p >单个零件LTC=(（第N年台账1月1号之前最新版本中记录的N-1年12月31日最低零件价格）-（第N年台账1月1号之前最新版本中记录的N年最低零件价格）)/ （第N年台账1月1号之前最新版本中记录的N-1年12月31日最低零件价格）</p>
                     <p >单个零件JPV=（（第N年台账1月1号之前最新版本中记录的N年最低零件价格）-（第N年实时记录的N年最低零件价格））/（第N年台账1月1号之前最新版本中记录的N年最低零件价格）。</p>
                  </div>
                  <icon slot="reference" name="iconxinxitishi" symbol class="cursor"></icon>
               </el-popover>
               <el-popover trigger="hover" class="tip" placement="bottom-start" width="800">
                  <div>{{mark}}</div>
                  <span class="mark cursor" slot="reference">{{mark}}</span>
               </el-popover>
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
import {iCard,iButton,iMessage,icon} from "rise";
import {getCmSupplierPbi} from "@/api/categoryManagementAssistant/internalDemandAnalysis/batchSupplier";
import * as pbi from 'powerbi-client';
import {getCategoryAnalysis,categoryAnalysis} from "@/api/categoryManagementAssistant/internalDemandAnalysis";
import marks from "./marks";
import {downloadPdfMixins} from '@/utils/pdf';
export default {
   mixins: [downloadPdfMixins],
   components:{iCard,iButton,marks,icon},
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
         this.mark=''
         this.renderBi()
      }
   },
   methods: {
      // 获取近期操作数据
      getCategoryAnalysis(){
         let params={
            categoryCode:this.categoryCode,
            schemeType:"BATCH_SUPPLIER_OVERVIEW"
         }
         getCategoryAnalysis(params).then(res=>{
            if(res.data){
               let operateLog=JSON.parse(res.data.operateLog)
               if(operateLog){
                  this.mark=operateLog.mark
               }
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
            watermark: this.$store.state.permission.userInfo.deptDTO.nameZh + '-' + this.$store.state.permission.userInfo.userNum + '-' + this.$store.state.permission.userInfo.nameZh + "^" + window.moment().format('YYYY-MM-DD HH:mm:ss'),
            pdfName:'品类管理助手_批量供应商概览_' + this.$store.state.rfq.categoryName + '_' + window.moment().format('YYYY-MM-DD') +'_',
        });
         let params={
            categoryCode:this.categoryCode,
            fileType:"PDF",
            schemeType:"BATCH_SUPPLIER_OVERVIEW",
            reportFileName: resFile.downloadName,
            reportName: resFile.downloadName,
            schemeName:"",
            reportUrl: resFile.downloadUrl,
            operateLog:JSON.stringify({
               mark:this.mark,
               }),
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
      display:inline-block;
      font-size: 14px !important;
      opacity: 0.42;
      margin-left: 32px;
      font-weight: normal;
      width: 600px;
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
.tip{
   >p{
      padding-left:15px;
   }
}
</style>