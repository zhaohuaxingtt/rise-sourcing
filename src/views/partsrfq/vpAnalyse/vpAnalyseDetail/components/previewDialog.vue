<!--
 * @Author: your name
 * @Date: 2021-10-12 21:45:35
 * @LastEditTime: 2021-10-27 14:27:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\vpAnalyse\vpAnalyseDetail\components\previewDialog.vue
-->
<template>
  <iDialog :visible.sync="value"
           width="95%"
           @close="clearDiolog">
    <vpPreview></vpPreview>
  </iDialog>
</template>

<script>
import vpPreview from './vpPreview'
import { iButton, iDialog } from 'rise';
import baseInfo from './baseInfo';
import totalUnitPriceTable from './totalUnitPriceTable';
import curveChart from './curveChart';
import analyzeChart from './analyzeChart';
import { downloadPdfMixins } from '@/utils/pdf';

export default {
  mixins: [downloadPdfMixins],
  // components: {
  //   vpPreview
  // },
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
    value: { type: Boolean },
  },
  components: {
    iDialog,
    vpPreview
  },
  data () {
    return {
      downloadButtonLoading: false,
    };
  },
  methods: {
    clearDiolog () {
      this.$emit('input', false);
    },
  },
};
</script>

<style scoped lang="scss">
.downloadButton {
  position: absolute;
  right: 50px;
  top: 50px;
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
    height: 100%;
  }

  .right {
    width: 57%;
    height: 100%;
  }
}
</style>
