<!--
 * @Author: 舒杰
 * @Date: 2021-08-05 16:27:57
 * @LastEditTime: 2021-08-12 15:48:26
 * @LastEditors: 舒杰
 * @Description: 批量供应商概览
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\batchSupplier\index.vue
-->
<template>
   <iCard class="margin-top20">
      <template slot="header">
         <div class="flex-between-center title">
            <div class="flex">
               <span>{{language("PLGYSGL","批量供应商概览")}}</span>
               <el-tooltip content="Top center" placement="top" effect="light">
                  <span class="mark">beizhu 大撒大撒但顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶水水水水水水水水水水水水水水</span>
               </el-tooltip>
            </div>
            <div class="flex">
               <iButton @click="save">{{ language("BEIZHU", "备注") }}</iButton>
               <iButton @click="save">{{ language("BAOCUN", "保存") }}</iButton>
               <iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
            </div>
         </div>
		</template>
      <!-- powerBi -->
      <div id="powerBi"></div>
   </iCard>
</template>
<script>
import {iCard,iButton} from "rise";
import {getCmSupplierPbi} from "@/api/categoryManagementAssistant/internalDemandAnalysis/batchSupplier";
import * as pbi from 'powerbi-client';
export default {
   components:{iCard,iButton},
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
               table: "Fact_01_Supplier_SPI",
               column: "supplier_id"
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
         categoryCode:""
      }
   },
   created () {
      this.categoryCode=this.$store.state.rfq.categoryCode
   },
   mounted () {
		this.getPowerBiUrl()
   },
   watch:{
      '$i18n.locale':{
         handler(newValue){
         this.config.pageName=newValue=='zh'?'ReportSectione9fe87a027d2550c28a9':'ReportSection616eb7861df2ef50a3cd'
         this.renderBi()
      }}
   },
   methods: {
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
         this.filter.values=[this.categoryCode]
         this.reportContainer = document.getElementById('powerBi');
         this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
      },
      renderBi() {
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
      },
      // 保存
      save(){

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
      width: 590px;
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