<!--
 * @Author: Luoshuang
 * @Date: 2021-10-12 10:30:30
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-10-13 11:13:15
 * @Description: 
 * @FilePath: \front-web\src\views\project\progressreport\partprogress\components\overviewChart\index.vue
-->

<template>
  <iCard class="overviewChartWrapper margin-top20 iframe-powerbi">
    <div id='powerBi'></div>
  </iCard>
</template>

<script>
import { iCard } from 'rise'
import * as pbi from "powerbi-client";
import { getReportBobOverview } from "@/api/project/projectprogressreport";
export default {
  components: { 
    iCard, 
  },
  props: {
    
  },
  data() {
    return {
      formData: {
        cleintId: '66e3fa4b-152e-4bfb-8a9d-18b820459df1',
        tenantId: '8716a3b9-b827-484b-92ad-ed90aaf4d707',
        clientSecret: '6cpyeTY~dAmL-Uub2X8Om30Mm2EUk-d.TS',
        workspaceId:process.env.NODE_ENV === "production"?"c272ae69-a6b4-4407-bd0e-f67953de36ce":"876776a9-f959-442e-a011-b4bade0dd862",
        reportId: process.env.NODE_ENV === "production"?"":"4d0913cc-53e3-4109-ac03-77e2cbb81e28",
      },
      config: {
        type: "",
        tokenType: "",
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
      reportContainer:null,
      report:null,//pbi容器

      filterParameter:{},//pbi请求刷新参数
    }
  },
  computed: {
    
  },
  mounted() {
    this.getUrl();
  },
  methods: {
    getUrl(){
      getReportBobOverview({
        ...this.formData
      }).then(res=>{
        this.url = res.data
        this.init()
      })
    },
    init(){
      this.renderBi();
    },
    renderBi(){
      var that = this;
      let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
      var config = {
        type: 'report',
        tokenType: pbi.models.TokenType.Embed,
        accessToken: this.url.accessToken,
        embedUrl: this.url.embedUrl,
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
      var reportContainer = document.getElementById('powerBi');
      this.report = powerbi.embed(reportContainer, config);
      // console.log(this.cartypeId)
      // this.report.on("loaded", async function () {
      //   //设置参数
      //   that.filterParameter = {
      //         $schema: "http://powerbi.com/product/schema#basic",
      //         target: {
      //           table: "app_proc_pm_part_progress_overview_nt_daily",
      //           column: "CartypeProjectID",
      //         },
      //         operator: "In",
      //         values: [that.cartypeId],
      //         filterType: pbi.models.FilterType.BasicFilter,
      //         requireSingleSelection: true
      //   };
      //   //设置筛选器
      //   that.report.setFilters([that.filterParameter]);
      // });
    },
  }
}
</script>

<style lang="scss" scoped>
.overviewChartWrapper {
  .chartTitle {
    font-size: 18px;
    font-weight: bold;
  }
  ::v-deep .cardBody {
    // height: 360px;
    display: flex;
    & > div {
      width: 50%;
    }
  }
}
.iframe-powerbi{
    height: 100%;
    overflow: auto;
    #powerBi {
    width: 100%;
    height: 1000px;
    // margin-top: 20px;
    //   height: calc(100vh - 380px);
    ::v-deep > iframe{
        border:none;
        // height: 100px;
        
        }
    }
}
</style>