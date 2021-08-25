<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-07-30 17:31:22
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iCard id="allContainer" class="content">
    <div class="title flex-between-center-center margin-bottom30">
      <div>
        <div class="text">{{language('CAIGOUJINGEZONGLAN','采购金额总览')}}</div>
        <el-row class="margin-top35" style="width:430px" :gutter="15">
          <el-col :span="12">
            <iDatePicker :placeholder="language('QINGXUANZHEMNIANFENG','请选择年份')" value-format="yyyy" type="year" v-model="form.year" :picker-options="pickerOptions" />
          </el-col>
          <el-col :span="12">
            <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.page">
              <el-option :value="item.code" :label="item.name" v-for="item of formGoup.pageList" :key="item.code"></el-option>
            </iSelect>
          </el-col>
        </el-row>
      </div>
      <div>
        <iButton @click="handleSave" :loading="saveButtonLoading">{{$t('LK_BAOCUN')}}</iButton>
        <iButton @click="handleBack">{{$t('LK_FANHUI')}}</iButton>
        <div class="margin-top30">
          <iButton @click="handleConfirm">{{$t('LK_QUEREN')}}</iButton>
          <iButton @click="handleSearchReset">{{$t('LK_CHONGZHI')}}</iButton>
        </div>
      </div>
    </div>
    <div style="height:60rem" id='powerBi'>
    </div>
  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, iSelect, iPage, iButton, iDatePicker, iMessage } from "rise";
import * as pbi from 'powerbi-client';
import { downloadPdfMixins } from '@/utils/pdf';
import resultMessageMixin from '@/utils/resultMessageMixin';
import { getPurchaseAmountPbi } from "@/api/partsrfq/purchaseAmountOverall/index.js";
import { dictByCode } from "./components/data.js";
import { getCategoryAnalysis, categoryAnalysis } from "@/api/categoryManagementAssistant/internalDemandAnalysis";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, iSelect, iPage, iButton, iDatePicker },
  mixins: [resultMessageMixin, downloadPdfMixins],
  data() {
    // 这里存放数据
    return {
      powerbi: '',
      saveButtonLoading: false,
      url: {
        accessToken: "", //验证token
        embedUrl: "", //报告信息内嵌地址
        tokenExpiry: "", //token过期时间
      },
      powerbi: pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory),
      report: null,
      name: '',
      filter_year: {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "DimYear",
          column: "YearNo"
        },
        operator: "In",
        values: [2022],//this.year
        filterType: pbi.models.FilterType.BasicFilter,
        requireSingleSelection: true
      },
      filter_category: {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "2_tovlo_overview",
          column: "category_id"
        },
        operator: "In",
        values: [this.$store.state.rfq.categoryCode],//this.year
        filterType: pbi.models.FilterType.BasicFilter,
        requireSingleSelection: true
      },
      form: {
        year: '',
        page: '',
        categoryCode: this.$store.state.rfq.categoryCode
      },
      formGoup: {
        yearList: [],
        pageList: []
      },
      pickerOptions: {
        disabledDate(time) {
          let currentYear = new Date().getFullYear()
          return time.getFullYear() !== currentYear && time.getFullYear() !== currentYear - 1 && time.getFullYear() !== currentYear - 2;
        }
      },
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handleConfirm() {
      if (this.form.year) {
        this.filter_year.values = [parseInt(this.form.year)]
        if (!!this.form.page) {
          this.report.setPage(this.form.page);
        }
        let filterAll = [this.filter_year]
        if (!!this.form.categoryCode) {
          filterAll.push(this.filter_category)
        }
        this.report.setFilters(filterAll);
      } else {
        iMessage.warn(this.language('NIANFENGBIXUAN', '年份必选'))
      }
    },
    async dictByCode() {
      const res = await dictByCode('CATEGORY_MANAGEMENT_LIST')
      this.formGoup.pageList = res
      const pms = {
        categoryCode: this.form.categoryCode,
        schemeType: 'CATEGORY_MANAGEMENT_PURCHASE_AMOUNT'
      }
      const res1 = await getCategoryAnalysis(pms)
      if (res1.data.categoryCode) {
        this.form.categoryCode = res1.data.categoryCode
      }
    },
    async handleSave() {
      this.saveButtonLoading = true;
      const resFile = await this.getDownloadFileAndExportPdf({
        domId: 'allContainer',
        pdfName: 'purchaseAmountOverall',
      });
      let params = {
        categoryCode: this.form.categoryCode,
        fileType: "PDF",
        schemeType: "CATEGORY_MANAGEMENT_PURCHASE_AMOUNT",
        reportFileName: resFile.downloadName,
        reportName: resFile.downloadName,
        schemeName: "",
        reportUrl: resFile.downloadUrl
      }
      const res = await categoryAnalysis(params)
      this.resultMessage(res);
      this.saveButtonLoading = false;
    },
    async powerBiUrl() {
      const res = await getPurchaseAmountPbi()
      if (res.data) {
        this.url = res.data
        this.init()
        this.renderBi()
      }
    },
    init() {
      this.config = {
        type: 'report',
        tokenType: pbi.models.TokenType.Embed,
        accessToken: this.url.accessToken,
        embedUrl: this.url.embedUrl,
        pageName: "",
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
    // 初始化页面
    renderBi() {
      console.log(this.config)
      this.report = this.powerbi.embed(this.reportContainer, this.config);
      this.filter_year.values = parseInt(this.form.year)
      let report = this.report
      var filter_year = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "DimYear",
          column: "YearNo"
        },
        operator: "In",
        values: [parseInt(this.form.year)],//this.year
        filterType: pbi.models.FilterType.BasicFilter,
        requireSingleSelection: true
      }
      var filter_category = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "2_tovlo_overview",
          column: "category_id"
        },
        operator: "In",
        values: [String(this.form.categoryCode)],//this.year
        filterType: pbi.models.FilterType.BasicFilter,
        requireSingleSelection: true
      }
      // Report.off removes a given event handler if it exists.
      report.off("loaded");
      // Report.on will add an event handler which prints to Log window.
      // this.config.pageName = this.form.page
      let filterAll = [filter_year]
      if (!!this.form.categoryCode) {
        filterAll.push(filter_category)
      }
      report.on("loaded", function() {
        // 年份
        //设置过滤条件	
        report.setFilters(filterAll);

        //report.updateFilters(models.FiltersOperations.Add, [filter_suppliers]);
        console.log("Report filter was added.");
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

    },
    // 返回
    handleBack() {
      this.$router.go(-1)
    },
    // 重置
    handleSearchReset() {
      this.form = {
        year: '',
        page: ''
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.dictByCode()
    this.powerBiUrl()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.content {
  .title {
    .text {
      font-size: 22px;
      font-weight: Bold;
    }
  }
}
</style>
