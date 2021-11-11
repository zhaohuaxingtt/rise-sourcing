<!--
 * @Author: your name
 * @Date: 2021-11-10 20:17:20
 * @LastEditTime: 2021-11-10 20:40:29
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
export default{
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
  methods:{
    getPowerBiUrl(){
      
    },
    init(){
      this.config.embedUrl = this.url.embedUrl;
      this.config.accessToken = this.url.accessToken;
      this.reportContainer = document.getElementById("powerBi")
      this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory,pbi.factories.wpmpFactory,pbi.factories.routerFactory);
      this.renderBi();
    },
    renderBi(){
      var report = this.powerbi.embed(this.reportContainer, this.config);
      report.off("loaded");
    }
  }
}
</script>
<style lang='scss' scoped>
</style>