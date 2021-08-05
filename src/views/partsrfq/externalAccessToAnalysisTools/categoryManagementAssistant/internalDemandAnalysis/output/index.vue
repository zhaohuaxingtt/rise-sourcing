<!--
 * @Author: 舒杰
 * @Date: 2021-08-05 16:27:21
 * @LastEditTime: 2021-08-05 19:35:43
 * @LastEditors: 舒杰
 * @Description: 产量总览
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\output\index.vue
-->
<template>
   <iCard :title='language("CHANLIANGZONGLAN","产量总览")' class="margin-top20">
      <template slot="header-control">
			<iButton @click="save">{{ language("BAOCUN", "保存") }}</iButton>
			<iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
		</template>
      <div class="flex-between-center">
         <div class="flex">
            <iSelect class="select">
               <el-option>
                  dadsa
               </el-option>
            </iSelect>
            <iSelect class="select">
               <el-option>
                  dadsa
               </el-option>
            </iSelect>
         </div>
         <div>
            <iButton @click="back">{{ language("QUEREN", "确认") }}</iButton>
            <iButton @click="back">{{ language("CHONGZHI", "重置") }}</iButton>
         </div>
      </div>
      <!-- powerBi -->
      <div id="powerBi"></div>
   </iCard>
</template>
<script>
import {iCard,iButton,iSelect} from "rise";
import {getCmOutputPbi} from "@/api/categoryManagementAssistant/internalDemandAnalysis/output";
import * as pbi from 'powerbi-client';
export default {
   components:{iCard,iButton,iSelect},
   data () {
      return {
         filter : {
            $schema: "http://powerbi.com/product/schema#basic",
            target: {
               table: "app_supplier_fin_analysis_sum_nt_daily",
               column: "subject_name"
            },
            operator: "In",
            values: [],//[this.name],// values
            filterType: null,
            requireSingleSelection: true
         },
         report:null,
         name:"",
         url: {
            accessToken: "", //验证token
            embedUrl: "", //报告信息内嵌地址
            tokenExpiry: ""//token过期时间
         },
         values:[],
         reportContainer:null
      }
   },
   created () {
      if (this.$route.query.name) {
         this.name = this.$route.query.name;
      }
   },
   mounted () {
      this.filter={...this.filter,filterType:pbi.models.FilterType.BasicFilter},
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
            getCmOutputPbi().then(res => {
            if (res.data) {
               this.url = res.data
               this.init()
               this.renderBi()
            }
         })
      },
      // 初始化配置
      init(){
         // this.permissions = pbi.models.Permissions.All
         this.config = {
            type: 'report',
            tokenType: pbi.models.TokenType.Embed,
            accessToken: this.url.accessToken,
            embedUrl: this.url.embedUrl,
            pageName:"ReportSectione9fe87a027d2550c28a9",// 中文ReportSectione9fe87a027d2550c28a9 英文 ReportSection616eb7861df2ef50a3cd
            // id: 'f6bfd646-b718-44dc-a378-b73e6b528204',
            // visualName: '47eb6c0240defd498d4b',
            // permissions: permissions,
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
         };
         this.reportContainer = document.getElementById('powerBi');
         this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
      },
      renderBi() {
         var report = this.powerbi.embed(this.reportContainer, this.config);
         // Report.off removes a given event handler if it exists.
         report.off("loaded");
         // Report.on will add an event handler which prints to Log window.
         const name = this.name
         const newfilter = window._.cloneDeep(this.filter);
         newfilter.values=[name]
         this.values=[name]
         console.log(newfilter);
         report.on("loaded", ()=> {
            console.log("Loaded");
            // if(name==""){
               // newfilter.values=[]
            // report.updateFilters(pbi.models.FiltersOperations.Add, [newfilter]);
            // }
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
   .select{
      width:200px;
      margin-right:30px;
   }
   #powerBi {
		width: 100%;
		height: calc(100vh - 350px);
      margin-top: 20px;
	}
</style>