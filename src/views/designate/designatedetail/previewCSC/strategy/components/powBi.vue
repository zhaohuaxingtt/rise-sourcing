<!--
 * @Author: your name
 * @Date: 2021-11-10 20:17:20
 * @LastEditTime: 2021-11-18 01:55:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-sourcing\src\views\designate\designatedetail\decisionData\strategy\components\powBi.vue
-->
<template>
  <div id='powerBi'>
  </div>
</template>
<script>
import * as pbi from "powerbi-client";
import {analysisPowerBi} from '@/api/designate/decisiondata/costanalysis.js'
export default{
  props:{
    categoryCode:String
  },
  data(){
    return {
      config: {
          type: "report",
          tokenType: pbi.models.TokenType.Embed,
          accessToken: "",
          embedUrl: "",
          pageName: "",
          settings: {
          panes: {
              filters: {
                  visible: false,
              },
              pageNavigation: {
                  visible: false,
              },
              },
          },
      },
      url: {
            accessToken: "", //验证token
            embedUrl: "", //报告信息内嵌地址
            tokenExpiry: "", //token过期时间
      },

    }
  },
  mounted(){
    this.getPowerBiUrl()
  },
  methods:{
    getPowerBiUrl(){
      analysisPowerBi(this.$route.query.desinateId).then(r=>{
        this.url = r.data
        this.$emit('updateCatgreyCode',r.data.partInfoVo)
        this.init(this.categoryCode || r.data.partInfoVo.map(r=>r.categoryCode)[0] || [])
      })
    },
    init(code){
      this.config.embedUrl = this.url.embedUrl;
      this.config.accessToken = this.url.accessToken;
      this.reportContainer = document.getElementById("powerBi")
      this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory,pbi.factories.wpmpFactory,pbi.factories.routerFactory);
      this.renderBi(code);
    },
    renderBi(code){
      console.log('初始化的code为：',code)
      var report = this.powerbi.embed(this.reportContainer, this.config);
      report.off("loaded");
      report.on("loaded", ()=> {
      //设置参数
      var	filter_parameter = {
              $schema: "http://powerbi.com/product/schema#basic",
              target: {
                table: "Table_Par&Stu",
                column: "Stuff_ID"
              },
              operator: "In",
              values: [code+''],
              filterType: pbi.models.FilterType.BasicFilter,
              requireSingleSelection: false
        };
        //设置筛选器
        report.setFilters([filter_parameter]);
      });
      document.getElementsByTagName('iframe')[0].style.border = 'none'
    }
  }
}
</script>
<style lang='scss' scoped>
  #powerBi{
    height: 750px;
    width: 100%;
    iframe{
      border: none!important;
    }
  }
</style>