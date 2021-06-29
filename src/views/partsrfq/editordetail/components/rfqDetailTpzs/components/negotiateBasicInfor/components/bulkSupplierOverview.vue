<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:28:01
 * @LastEditors: zbin
 * @Descripttion: 概览
-->
<template>
  <iCard class="supplier-item" :title="$t('TPZS.PLGYSGL')" collapse>
    <div class="title">{{}}</div>
    <div class="title-btn">
      <iButton>{{$t('TPZS.GYS360')}}</iButton>
      <iButton @click="handleRemark">{{$t('costanalysismanage.BeiZhu')}}</iButton>
    </div>
    <remarkDialog v-model="remarkDialog" />
    <div id='powerBi'>
      <!-- <iframe :src='url.embedUrl' scrolling="auto" frameborder="0" width="100%" height="500px"></iframe> -->
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, } from "rise";
import { powerBiUrl } from "@/api/partsrfq/negotiateBasicInfor/negotiateBasicInfor.js";
import * as pbi from 'powerbi-client';
import remarkDialog from "./remarkDialog.vue";
// import pie from "./pie";
export default {
  components: { iCard, iButton, remarkDialog },
  data() {
    return {
      remarkDialog: false,
      url: {
        accessToken: "", //验证token
        embedUrl: "", //报告信息内嵌地址
        tokenExpiry: "", //token过期时间
      },
      report: null,
      name: '',
      filter: {
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
    }
  },
  created() {
    this.filter = { ...this.filter, filterType: pbi.models.FilterType.BasicFilter },
      this.powerBiUrl()
  },
  methods: {
    // 激活弹窗
    handleRemark() {
      this.remarkDialog = true
    },
    // 获取财报iframeurl
    powerBiUrl() {
      powerBiUrl().then(res => {
        if (res.data) {
          this.url = res.data
          this.renderBi()
        }
      })
    },
    // 初始化页面
    renderBi() {
      var permissions = pbi.models.Permissions.All

      var config = {
        type: 'report',
        tokenType: pbi.models.TokenType.Embed,
        accessToken: this.url.accessToken,
        embedUrl: this.url.embedUrl,
        // id: 'f6bfd646-b718-44dc-a378-b73e6b528204',
        /*pageName: 'ReportSectioneb8c865100f8508cc533',
        visualName: '47eb6c0240defd498d4b',
        permissions: permissions,*/
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
      let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
      var reportContainer = document.getElementById('powerBi');
      var report = powerbi.embed(reportContainer, config);

      // Report.off removes a given event handler if it exists.
      report.off("loaded");

      // Report.on will add an event handler which prints to Log window.
      const name = this.name
      const newfilter = window._.cloneDeep(this.filter);
      newfilter.values = [name]
      this.values = [name]
      report.on("loaded", function() {
        console.log("Loaded");
        if (name !== '') {
          report.setFilters([newfilter])
          // report.updateFilters(pbi.models.FiltersOperations.Add, [newfilter]);
        }
      });

      // Report.off removes a given event handler if it exists.
      report.off("rendered");

      // Report.on will add an event handler which prints to Log window.
      report.on("rendered", function() {
        console.log("Rendered");
      });
      report.off("filtersApplied")

      report.on("filtersApplied", function() {
        console.log("filtersApplied");
      });

      report.on("error", function(event) {
        console.log(event.detail);
        report.off("error");
      });

      report.off("saved");
      report.on("saved", function(event) {
        console.log(event.detail);
        if (event.detail.saveAs) {
          console.log(
            'In order to interact with the new report, create a new token and load the new report'
          );
        }
      });

      this.report = report

    },
  }
}
</script>

<style lang="scss" scoped>
.supplier-item {
  .title-btn {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    right: 70px;
    top: 30px;
    position: absolute;
  }
  .title {
    position: absolute;
    top: 2.3rem;
    left: 11rem;
  }
  position: relative;
  #powerBi {
    width: 100%;
    height: calc(100vh - 190px);
  }
}
</style>