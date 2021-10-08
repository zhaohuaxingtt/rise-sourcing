<template>
  <iDialog
      :visible.sync="value"
      width="95%"
      @close="clearDiolog"
  >
    <iButton class="downloadButton" @click="getDownloadFile({exportPdf: true})" :loading="downloadButtonLoading">{{
        $t('LK_XIAZAI')
      }}
    </iButton>
    <div id="content">
      <div class="margin-bottom20 margin-top20 clearFloat" slot="title">
        <span class="font18 font-weight">Volume Pricing {{ this.$t('TPZS.BAOGAO') }}</span>
      </div>
      <baseInfo :dataInfo="dataInfo" :disabledSupplier="true"/>
      <el-divider class="margin-top20 margin-bottom20"/>
      <totalUnitPriceTable :dataInfo="dataInfo" class="margin-bottom20" :showEditButton="false"/>
      <div class="chartContainer margin-top20">
        <div class="left">
          <div class="font18 font-weight margin-bottom20">Volume Pricing{{ this.$t('TPZS.QUXIAN') }}</div>
          <curveChart
              chartHeight="260px"
              :dataInfo="dataInfo"
              :newestScatterData="newestScatterData"
              :targetScatterData="targetScatterData"
              :lineData="lineData"
              :cpLineData="cpLineData"
          />
        </div>
        <div class="right">
          <div class="font18 font-weight margin-bottom20">Volume Pricing{{ this.$t('TPZS.FENXI') }}</div>
          <analyzeChart :dataInfo="dataInfo" :disabledEstimatedActualTotalPro="true"/>
        </div>
      </div>
    </div>
  </iDialog>
</template>

<script>
import {iButton, iDialog} from 'rise';
import baseInfo from './baseInfo';
import totalUnitPriceTable from './totalUnitPriceTable';
import curveChart from './curveChart';
import analyzeChart from './analyzeChart';
import {downloadPdfMixins} from '@/utils/pdf';

export default {
  mixins: [downloadPdfMixins],
  props: {
    dataInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    newestScatterData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    targetScatterData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    lineData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    cpLineData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    value: {type: Boolean},
  },
  components: {
    iButton,
    iDialog,
    baseInfo,
    totalUnitPriceTable,
    curveChart,
    analyzeChart,
  },
  data() {
    return {
      downloadButtonLoading: false,
    };
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    getDownloadFile({exportPdf = false, callBack} = {}) {
      return this.getDownloadFileAndExportPdf({
        domId: 'content',
        watermark: this.$store.state.permission.userInfo.deptDTO.nameEn + '-' + this.$store.state.permission.userInfo.userNum + '-' + this.$store.state.permission.userInfo.nameZh + "^" + window.moment().format('YYYY-MM-DD HH:mm:ss'),
        pdfName: 'Volume Pricing Overview',
        exportPdf,
        callBack,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.downloadButton {
  position: absolute;
  right: 50px;
  top: 50px
}

#content {
  padding: 20px;
}

.chartContainer {
  display: flex;
  justify-content: space-between;
  height: 390px;

  .left {
    width: 42%;
    height: 100%
  }

  .right {
    width: 57%;
    height: 100%
  }
}

</style>
