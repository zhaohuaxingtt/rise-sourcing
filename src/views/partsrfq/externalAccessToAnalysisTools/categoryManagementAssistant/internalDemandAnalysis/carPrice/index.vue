<!--
 * @Author: 舒杰
 * @Date: 2021-08-05 16:27:21
 * @LastEditTime: 2021-09-26 16:40:38
 * @LastEditors: Please set LastEditors
 * @Description: 车型价格对比
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\carPrice\index.vue
-->
<template>
  <iCard class="margin-top20"
         id="carPrice">
    <template slot="header">
      <div class="flex-between-center title">
        <div class="flex-align-center">
          <span class="margin-right10">{{language("CHEXINGJIAGEDUIBI","车型价格对比")}}</span>
          <el-popover trigger="hover"
                      placement="bottom-start"
                      width="800">
            <p>气泡大小=所选月份当前配置下车型配置产量之和（如2021.01-2021.05是把五个月产量加总）</p>
            <p>高度(即单车金额)= N-1月的零件用量*零件价格（如2021.01-2021.05是显示5月当月金额）——其中，单车用量是某一零件在某一车型上的用量，车型配置产量是每一个配置下的产量，零件价格是取该月最后一天的价格。</p>
            <p>基于所选车型（必选项）和配置/发动机/变速箱，在所选的月份(...~N-1)中看到所选条件下车型配置的数量以及单车价格。</p>
            <icon slot="reference"
                  name="iconxinxitishi"
                  symbol
                  class="cursor"></icon>
          </el-popover>
          <el-popover trigger="hover"
                      class="tip"
                      placement="bottom-start"
                      width="800">
            <div>{{mark}}</div>
            <span class="mark cursor"
                  slot="reference">{{mark}}</span>
          </el-popover>
        </div>
        <div class="flex">
          <iButton @click="openMark">{{ language("BEIZHU", "备注") }}</iButton>
          <iButton @click="save">{{ language("BAOCUN", "保存") }}</iButton>
          <iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
        </div>
      </div>
    </template>
    <div class="flex-between-center">
      <div class="flex search">
        <div>
          <span>{{ language("DUIBIAOCHEXING", "对标车型") }}</span>
          <!-- <iSelect class="select"
                   v-model="filterCarValue"
                   multiple
                   collapse-tags
                   multiple-limit="5"
                   @change="handleChangeCarVal">
            <el-option :value="item.modelNameZh"
                       :label="item.description"
                       v-for="(item,index) in carType"
                       :key="index"></el-option>
          </iSelect> -->
          <iSelectCustom class="select"
                         v-model="filterCarValue"
                         :data="carType"
                         :multiple="true"
                         multiple-limit="5"
                         label="description"
                         value="modelNameZh"
                         @change="handleChangeCarVal" />
        </div>
        <div>
          <span>{{ language("XIANSHILEIXING", "显示类型") }}</span>
          <iSelect v-model="config.pageName">
            <el-option :value="item.code"
                       :label="item.name"
                       v-for="(item,index) in dictData.CATEGORY_MANAGEMENT_CAR_TYPE"
                       :key="index"></el-option>
          </iSelect>
        </div>
        <div>
          <span>{{ language("NIANFENFANWEI", "年月范围") }}</span>
          <iDatePicker v-model="selectDate"
                       value-format="yyyy-MM"
                       type="monthrange"
                       :start-placeholder="language('KAISHIRIQI','开始日期')"
                       :end-placeholder="language('JIESHURIQI','结束日期')"
                       :picker-options="pickerOptions" />
        </div>
      </div>
      <div class="flex-align-center">
        <iButton @click="renderBi">{{ language("QUEREN", "确认") }}</iButton>
        <iButton @click="reset">{{ language("CHONGZHI", "重置") }}</iButton>
      </div>
    </div>
    <!-- powerBi -->
    <div id="powerBi"></div>
    <!-- 备注 -->
    <marks @sure="saveMark"
           v-model="markShow"
           ref="marks"></marks>
  </iCard>
</template>
<script>
import { iCard, iButton, iSelect, iDatePicker, iMessage, icon, iSelectCustom } from "rise";
import { getCmCarTypePricePbi, carTypeByCategoryCode } from "@/api/categoryManagementAssistant/internalDemandAnalysis/carPrice";
import * as pbi from 'powerbi-client';
import marks from "../batchSupplier/marks";
import { getCategoryAnalysis, categoryAnalysis } from "@/api/categoryManagementAssistant/internalDemandAnalysis";
import { downloadPdfMixins } from '@/utils/pdf';
import { selectDictByKeys } from "@/api/dictionary";
export default {
  mixins: [downloadPdfMixins],
  components: { iCard, iButton, iSelect, iDatePicker, marks, icon, iSelectCustom },
  data () {
    return {
      config: {
        type: 'report',
        tokenType: pbi.models.TokenType.Embed,
        accessToken: '',
        embedUrl: '',
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
      },
      filter: {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "DM_fact",
          column: "category_id"
        },
        operator: "In",
        values: [],//
        filterType: pbi.models.FilterType.BasicFilter,
        requireSingleSelection: true
      },
      // 对标车型
      filter_car: {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "DM_fact",
          column: "model_name_zh"
        },
        operator: "In",
        values: [],//
        filterType: pbi.models.FilterType.BasicFilter,
        requireSingleSelection: true
      },
      // 时间
      filter_time_start: {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "11_DM_BeginDate",
          column: "YearMonth"
        },
        operator: "In",
        values: [],//
        filterType: pbi.models.FilterType.BasicFilter,
        requireSingleSelection: true
      },
      filter_time_end: {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
          table: "12_DM_EndDate",
          column: "YearMonth"
        },
        operator: "In",
        values: [],//
        filterType: pbi.models.FilterType.BasicFilter,
        requireSingleSelection: true
      },
      report: null,
      url: {
        accessToken: "", //验证token
        embedUrl: "", //报告信息内嵌地址
        tokenExpiry: ""//token过期时间
      },
      reportContainer: null,
      categoryCode: "",
      mark: "",
      markShow: false,
      carType: [],//车型项目
      dictData: {
        CATEGORY_MANAGEMENT_CAR_TYPE: []
      },
      selectDate: [],//选择的时间
      filterCarValue: [],//对标车型
      pickerOptions: {
        disabledDate (time) {
          //  let currentYear = new Date().getTime()
          let currentYear = new Date().setMonth(new Date().getMonth() - 1)
          return time.getTime() > currentYear;
        }
      },
    }
  },
  created () {
    this.categoryCode = this.$store.state.rfq.categoryCode
  },
  async mounted () {
    await this.getPowerBiUrl()
    await this.carTypeByCategoryCode()
    await this.getCategoryAnalysis()
    this.getDict()
    this.init()
    this.renderBi()
  },
  watch: {
    '$i18n.locale': {
      handler (newValue) {
        this.renderBi()
      }
    },
    async '$store.state.rfq.categoryCode' () {
      this.categoryCode = this.$store.state.rfq.categoryCode
      this.mark = ''
      this.selectDate = []
      this.filterCarValue = []
      this.config.pageName = ""
      await this.getCategoryAnalysis()
      this.renderBi()
    }
  },
  methods: {
    // 选中对标车型 
    handleChangeCarVal () {
      this.filterCarValue = window._.slice(this.filterCarValue, 0, 5)
    },
    // 获取近期操作数据
    async getCategoryAnalysis () {
      let params = {
        categoryCode: this.categoryCode,
        schemeType: "CATEGORY_MANAGEMENT_CAR_TYPE"
      }
      await getCategoryAnalysis(params).then(res => {
        if (res.data) {
          let operateLog = JSON.parse(res.data.operateLog)
          if (operateLog) {
            this.filterCarValue = operateLog.filterCarValue
            this.config.pageName = operateLog.pageName
            this.selectDate = operateLog.selectDate
            this.mark = operateLog.mark
          } else {
            let newArr = window._.clone(this.carType).splice(0, 5)
            this.filterCarValue = newArr.map((item, i) => item.modelNameZh)
          }
        }
      })

    },
    // 保存备注
    saveMark (mark) {
      this.mark = mark
      this.markShow = false
    },
    // 保存
    async save () {
      const resFile = await this.getDownloadFileAndExportPdf({
        domId: 'carPrice',
        pdfName: '品类管理助手_车型价格对比_' + this.$store.state.rfq.categoryName + '_' + window.moment().format('YYYY-MM-DD') + '_',
      });
      let params = {
        categoryCode: this.categoryCode,
        fileType: "PDF",
        schemeType: "CATEGORY_MANAGEMENT_CAR_TYPE",
        reportFileName: resFile.downloadName,
        reportName: resFile.downloadName,
        schemeName: "",
        reportUrl: resFile.downloadUrl,
        operateLog: JSON.stringify({
          mark: this.mark,
          selectDate: this.selectDate,
          filterCarValue: this.filterCarValue,
          pageName: this.config.pageName
        }),
      }
      categoryAnalysis(params).then(res => {
        if (res.code == '200') {
          iMessage.success(this.language('BAOCUNCHENGGONG', '保存成功'))
        }
      })
    },
    // 打开备注弹窗
    openMark () {
      this.markShow = true
      this.$refs.marks.getMarkdefalut(this.mark)
    },
    // 获取财报iframeurl
    async getPowerBiUrl () {
      await getCmCarTypePricePbi().then(res => {
        if (res.data) {
          this.url = res.data
        }
      })
    },
    // 数据字典
    getDict () {
      selectDictByKeys([{ keys: "CATEGORY_MANAGEMENT_CAR_TYPE" }]).then(res => {
        this.dictData = res.data
      })
    },
    // 获取车型数据
    async carTypeByCategoryCode () {
      let params = {
        categoryCode: this.categoryCode
      }
      await carTypeByCategoryCode(params).then(res => {
        this.carType = res.data
      })
    },
    // 重置
    reset () {
      this.selectDate = []
      this.filterCarValue = []
      this.config.pageName = ""
      this.renderBi()
    },
    // 初始化配置
    init () {
      this.config.embedUrl = this.url.embedUrl
      this.config.accessToken = this.url.accessToken
      // this.config.pageName=this.dictData.CATEGORY_MANAGEMENT_CAR_TYPE[0].code
      this.reportContainer = document.getElementById('powerBi');
      this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    },
    renderBi () {
      let filterArr = []
      this.filter.values = [this.categoryCode]
      filterArr.push(this.filter)
      // 如果有车型
      if (this.filterCarValue.length > 0) {
        console.log(this.filterCarValue)
        this.filter_car.values = this.filterCarValue
        filterArr.push(this.filter_car)
      }
      if (this.selectDate.length) {
        this.filter_time_start.values = [this.selectDate[0]]
        this.filter_time_end.values = [this.selectDate[1]]
        filterArr.push(this.filter_time_start)
        filterArr.push(this.filter_time_end)
      } else {
        this.filter_time_start.values = []
        this.filter_time_end.values = []
      }
      var report = this.powerbi.embed(this.reportContainer, this.config);
      // Report.off removes a given event handler if it exists.
      report.off("loaded");
      // Report.on will add an event handler which prints to Log window.
      report.on("loaded", () => {
        report.setFilters(filterArr)
      });
      // Report.off removes a given event handler if it exists.
      report.off("rendered");
      // Report.on will add an event handler which prints to Log window.
      report.on("rendered", function () {
        console.log("Rendered");
      });
      // report.off("filtersApplied")
      report.on("filtersApplied", function () {
        console.log("filtersApplied");
      });
      report.on("error", function (event) {
        report.off("error");
      });
      report.off("saved");
      report.on("saved", function (event) {
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
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  width: 100%;
  .mark {
    display: inline-block;
    font-size: 14px !important;
    opacity: 0.42;
    margin-left: 32px;
    font-weight: normal;
    width: 600px;
    @include text_;
  }
}
.search {
  > div {
    width: 250px;
    margin-right: 30px;
    > span {
      display: block;
      font-size: 16px;
      color: $color-black;
      margin-bottom: 5px;
    }
  }
}
#powerBi {
  width: 100%;
  margin-top: 20px;
  height: calc(100vh - 380px);
}
.select {
  width: 250px;
  .el-select__tags {
    max-width: 200px;
  }
}
</style>