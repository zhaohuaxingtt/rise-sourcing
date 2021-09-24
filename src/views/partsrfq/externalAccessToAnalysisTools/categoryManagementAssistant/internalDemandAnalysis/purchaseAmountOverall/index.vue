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
        <div class="text flex">{{language('CAIGOUJINGEZONGLAN','采购金额总览')}}
          <el-popover class="margin-left10 tip" trigger="hover" placement="bottom-start">
            <div>{{language('TGGWSNZWLLNDCLZCGJEZL','提供过往三年至未来两年的材料组采购金额总览：')}}</div>
            <div style="text-indent: 15px">{{language('JGSJLYYLJTZJG','价格数据：来源于零件台账价格')}}</div>
            <div style="text-indent: 15px">{{language('CLSHLSLJCLSJLYYFISCXSCJLYJPBOM','产量数据：历史零件产量数据来源于FIS车型生产记录以及PBOM，未来零件产量数据来源于最新的BKM KTB产量计划')}}</div>
            <icon slot="reference" name="iconxinxitishi" symbol></icon>
          </el-popover>
        </div>
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
    <!-- <iframe  src=""></iframe> -->
    <div id='powerBi'>
    </div>
  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, iSelect, iPage, iButton, iDatePicker, iMessage, icon } from "rise";
import * as pbi from 'powerbi-client';
import { downloadPdfMixins } from '@/utils/pdf';
import resultMessageMixin from '@/utils/resultMessageMixin';
import { getPurchaseAmountPbi } from "@/api/partsrfq/purchaseAmountOverall/index.js";
import { dictByCode } from "./components/data.js";
import { getCategoryAnalysis, categoryAnalysis } from "@/api/categoryManagementAssistant/internalDemandAnalysis";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, iSelect, iPage, iButton, iDatePicker, icon },
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
        year: String(new Date().getFullYear()),
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
      if (this.form.page === '') {
        this.form.page = this.formGoup.pageList[0].code
      }
      this.init()
      this.renderBi()
    },
    async getCategoryAnalysis() {
      const pms = {
        categoryCode: this.form.categoryCode,
        schemeType: 'CATEGORY_MANAGEMENT_PURCHASE_AMOUNT'
      }
      const res1 = await getCategoryAnalysis(pms)
      if (res1.data.categoryCode && res1.data.operateLog) {
        this.form = JSON.parse(res1.data.operateLog)
      }
      this.dictByCode()
    },
    async handleSave() {
      let page = ''
      this.formGoup.pageList.forEach(item => {
        if (item.code === this.form.page) {
          page = item.name
        }
      })
      this.saveButtonLoading = true;
      const resFile = await this.getDownloadFileAndExportPdf({
        domId: 'allContainer',
        pdfName: this.language('PINLEIGUANLIZHUSHOU', '品类管理助手') + '-' + this.language('CAIGOUJINGEZONGLAN', '采购金额总览') + '-' + page + '-' + this.$store.state.rfq.categoryName + '-' + window.moment().format('YYYY-MM-DD') + '|',
      });
      let params = {
        categoryCode: this.form.categoryCode,
        operateLog: JSON.stringify(this.form),
        fileType: "PDF",
        schemeType: "CATEGORY_MANAGEMENT_PURCHASE_AMOUNT",
        reportFileName: resFile.downloadName,
        reportName: resFile.downloadName,
        schemeName: "",
        reportUrl: resFile.downloadUrl
      }
      switch (this.form.page) {
        case 'ReportSection':
          params.schemeType = 'CATEGORY_MANAGEMENT_PURCHASE_AMOUNT_SUPPLIER'
          break;
        case 'ReportSection0e9a44775000348abbed':
          params.schemeType = 'CATEGORY_MANAGEMENT_PURCHASE_AMOUNT_CARTYPE'
          break;
        case 'ReportSection99057dcf18326c502965':
          params.schemeType = 'CATEGORY_MANAGEMENT_PURCHASE_AMOUNT_PLATFORM'
          break;
        case 'ReportSection54602a61cb108b45223a':
          params.schemeType = 'CATEGORY_MANAGEMENT_PURCHASE_AMOUNT_FACTORY'
          break;
        default:
          break;
      }
      const res = await categoryAnalysis(params)
      this.resultMessage(res);
      this.saveButtonLoading = false;
    },
    async powerBiUrl() {
      const res = await getPurchaseAmountPbi()
      if (res.data) {
        this.url = res.data
        this.getCategoryAnalysis()
      }
    },
    init() {
      this.config = {
        type: 'report',
        tokenType: pbi.models.TokenType.Embed,
        accessToken: this.url.accessToken,
        embedUrl: this.url.embedUrl,
        pageName: this.form.page,
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
      this.reportContainer = document.getElementById('powerBi');
      this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    },
    // 初始化页面
    renderBi() {
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
      });

      // Report.off removes a given event handler if it exists.
      report.off("rendered");

      // Report.on will add an event handler which prints to Log window.
      report.on("rendered", function() {
      });
      report.off("filtersApplied")

      report.on("filtersApplied", function() {
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
      this.report = report
      document.getElementsByTagName('iframe')[0].style.border = 'none'
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
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.powerBiUrl()
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
  #powerBi {
    width: 100%;
    height: calc(100vh - 350px);
  }
}
</style>
