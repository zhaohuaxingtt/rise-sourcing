<!--
 * @Author: 舒杰
 * @Date: 2021-08-05 16:27:21
 * @LastEditTime: 2021-09-06 14:22:35
 * @LastEditors: 舒杰
 * @Description: 产量总览
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\output\index.vue
-->
<template>
   <iCard :title='language("CHANLIANGZONGLAN","产量总览")' class="margin-top20" id="output">
      <template slot="header-control">
			<iButton @click="save">{{ language("BAOCUN", "保存") }}</iButton>
			<iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
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
import {iCard,iButton,iSelect,iDatePicker,iMessage} from "rise";
import {getCmOutputPbi} from "@/api/categoryManagementAssistant/internalDemandAnalysis/output";
import * as pbi from 'powerbi-client';
import { selectDictByKeys } from "@/api/dictionary";
import {downloadPdfMixins} from '@/utils/pdf';
import {categoryAnalysis} from "@/api/categoryManagementAssistant/internalDemandAnalysis";
export default {
   mixins: [downloadPdfMixins],
   components:{iCard,iButton,iSelect,iDatePicker},
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
   watch:{
      '$i18n.locale':{
         handler(newValue){
         this.renderBi()
      }},
      '$store.state.rfq.categoryCode'(newVal){
         this.categoryCode=this.$store.state.rfq.categoryCode
         this.renderBi()
      }
   },
   methods: {
      // 保存
      async save(){
         const resFile = await this.getDownloadFileAndExportPdf({
            domId: 'output',
            pdfName: this.language("CHANLIANGZONGLAN","产量总览") + '-' + this.$store.state.rfq.categoryName + '-' + new Date().toLocaleDateString()+'-',
         });
         let params={
            categoryCode:this.categoryCode,
            fileType:"PDF",
            schemeType:"CATEGORY_MANAGEMENT_OUTPUT_OVERVIEW",
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
               this.getDict()
            }
         })
      },
      // 初始化配置
      init(){
         this.config.embedUrl=this.url.embedUrl
         this.config.accessToken=this.url.accessToken
         this.config.pageName=this.dictData.CATEGORY_MANAGEMENT_LIST[0].code
         this.selectFilterYear= String(new Date().getFullYear()) 
         this.reportContainer = document.getElementById('powerBi');
         this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
      },
      renderBi() {
         this.filter.values=[this.categoryCode]
         this.filterYear.values=[parseInt(this.selectFilterYear)]
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