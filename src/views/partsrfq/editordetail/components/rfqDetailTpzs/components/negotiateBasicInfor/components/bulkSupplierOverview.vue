<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:28:01
 * @LastEditors: zbin
 * @Descripttion: 概览
-->
<template>
  <iCard class="supplier-item" :title="$t('TPZS.PLGYSGL')" :defalutCollVal='false' collapse>
    <div class="header-title">{{remark}}</div>
    <div class="title-btn">
      <iButton @click="handleHerf">{{$t('TPZS.GYS360')}}</iButton>
      <iButton @click="handleRemark">{{$t('costanalysismanage.BeiZhu')}}</iButton>
    </div>
    <remarkDialog @getRemark="getRemark" :remark='remark' v-model="remarkDialog" />
    <div id='powerBi'>
      <!-- <iframe :src='url.embedUrl' scrolling="auto" frameborder="0" width="100%" height="500px"></iframe> -->
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, } from "rise";
import * as pbi from 'powerbi-client';
import remarkDialog from "./remarkDialog.vue";
import { getRfqToRemark, pageRfqPartPurPro, powerBiUrl } from "@/api/partsrfq/negotiateBasicInfor/negotiateBasicInfor.js";

export default {
  components: { iCard, iButton, remarkDialog },
  data() {
    return {
      remark: '',
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
    this.powerBiUrl()
  },
  methods: {
    // go供应商360
    handleHerf() {
      window.location.href = 'http://rise-front-portal.apps.vmocp-dev.csvw.com/supplier/supplierList'
    },
    // 获取备注
    async getRemark() {
      const res = await getRfqToRemark(this.$route.query.id)
      if (res.result) {
        this.remark = res.data && res.data.remark
      }
    },
    // 激活弹窗
    handleRemark() {
      this.remarkDialog = true
    },
    // 获取财报iframeurl
    async powerBiUrl() {
      const pms = {
        rfqId: this.$route.query.id
      }
      const res1 = await pageRfqPartPurPro(pms)
      const res = await powerBiUrl()
      let partNumList = []
      if (res.data && res1.data) {
        this.url = res.data
        res1.data.forEach(item => {
          partNumList.push(item.partNum)
        })
        this.renderBi(partNumList)
      }

    },
    // 初始化页面
    renderBi(partNumList) {
      var config = {
        type: 'report',
        tokenType: pbi.models.TokenType.Embed,
        accessToken: this.url.accessToken,
        embedUrl: this.url.embedUrl,
        settings: {
          commands: [
            {
              spotlight: {
                displayOption: pbi.models.CommandDisplayOption.Hidden
              },
              drill: {
                displayOption: pbi.models.CommandDisplayOption.Disabled
              },
              exportData: {
                displayOption: pbi.models.CommandDisplayOption.Hidden
              },
              seeData: {
                displayOption: pbi.models.CommandDisplayOption.Hidden
              },
              includeExclude: {
                displayOption: pbi.models.CommandDisplayOption.Hidden
              },
            }
          ],
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
      report.on("loaded", function() {
        // 零件集合：
        var partNumListFilter = {
          $schema: "http://powerbi.com/product/schema#basic",
          target: {
            table: "Table_Par&Stu",
            column: "part_num"
          },
          operator: "In",
          values: partNumList,
          filterType: pbi.models.FilterType.BasicFilter,
          requireSingleSelection: true
        };
        try {
          //设置过滤条件	
          report.setFilters([partNumListFilter]);
          //report.updateFilters(models.FiltersOperations.Add, [filter_suppliers]);
          console.log("Report filter was added.");
        }
        catch (errors) {
          console.log(errors);
        }
        console.log("Loaded");
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
      document.getElementsByTagName('iframe')[0].style.border = 'none'
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
  .header-title {
    position: absolute;
    top: 2.1rem;
    font-size: 14px;
    left: 11.3rem;
    color: #a5a5a5;
  }
  position: relative;
  #powerBi {
    width: 100%;
    height: calc(100vh - 190px);
  }
}
</style>