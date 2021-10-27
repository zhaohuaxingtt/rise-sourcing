<!--
 * @Author: your name
 * @Date: 2021-10-27 14:54:13
 * @LastEditTime: 2021-10-27 15:04:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\piAnalyse\piDetail\components\piPreview.vue
-->
<template>
  <div id="content">
    <div class="title">{{ language('PI.PIINDEXBAOGAO', 'Price Index报告') }}-{{ dataInfo.partsId }}</div>
    <theBaseInfo class="margin-top20"
                 :dataInfo="dataInfo" />
    <el-divider class="margin-top20 margin-bottom20" />
    <!--表格-->
    <theTable v-show="currentTab === CURRENTTIME"
              :isPreview="true"
              :dataInfo="dataInfo"
              :currentTab="currentTab" />
    <theTable v-show="currentTab === AVERAGE"
              :isPreview="true"
              :averageData="averageData"
              :currentTab="currentTab" />
    <el-divider class="margin-top20 margin-bottom20" />
    <div class="chartBox">
      <!--      Price Index价格分析-->
      <thePriceIndexChart class="lineBox"
                          :isPreview="true"
                          :previewDialog="value" />
      <!--      零件成本构成-->
      <thePartsCostChart class="pieBox"
                         :dataInfo="dataInfo"
                         :averageData="averageData"
                         :currentTab="currentTab" />
    </div>
  </div>
</template>

<script>
import theBaseInfo from './theBaseInfo';
import theTable from './theTable';
import thePriceIndexChart from './thePriceIndexChart';
import thePartsCostChart from './thePartsCostChart';
import { CURRENTTIME, AVERAGE } from './data';
import { downloadPdfMixins } from '@/utils/pdf';

export default {
  mixins: [downloadPdfMixins],
  props: {
    dataInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    averageData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    value: { type: Boolean },
    currentTab: {
      type: String,
      default: '',
    },
    currentTabData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    theBaseInfo,
    theTable,
    thePriceIndexChart,
    thePartsCostChart,
  },
  data () {
    return {
      CURRENTTIME,
      AVERAGE,
    };
  },
  mounted () {
    console.log(this.dataInfo, "dataInfo")
  },
  methods: {
    clearDiolog () {
      this.$emit('input', false);
    },
    getDownloadFile ({ callBack }) {
      return this.getDownloadFileAndExportPdf({
        domId: 'content',
        watermark: this.$store.state.permission.userInfo.deptDTO.nameEn + '-' + this.$store.state.permission.userInfo.userNum + '-' + this.$store.state.permission.userInfo.nameZh + "^" + window.moment().format('YYYY-MM-DD HH:mm:ss'),
        pdfName: 'Overview',
        callBack,
      });
    },
  },
};
</script>

<style scoped lang="scss">
#content {
  padding: 20px;

  .title {
    font-size: 22px;
    font-weight: bold;
    color: #000000;
  }

  .chartBox {
    display: flex;
    justify-content: space-between;
    height: 573px;

    .lineBox {
      width: 69%;
      height: 100%;
    }

    .pieBox {
      width: 30%;
      height: 100%;
    }
  }
}
</style>