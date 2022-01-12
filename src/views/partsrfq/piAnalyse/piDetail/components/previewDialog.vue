<!--
 * @Author: your name
 * @Date: 2021-10-12 21:45:35
 * @LastEditTime: 2022-01-05 14:32:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\piAnalyse\piDetail\components\previewDialog.vue
-->
<template>
  <iDialog :visible.sync="value"
           width="95%"
           @close="clearDiolog">
    <piPreview :dataInfo="dataInfo"
               :averageData="averageData"
               :currentTab="currentTab"
               :currentTabData="currentTabData"
               ref="piPreview"></piPreview>
  </iDialog>
</template>

<script>
import { iDialog } from 'rise';
import piPreview from './piPreview'

export default {
  props: {
    value: { type: Boolean },
    dataInfo: {
      type: Object
    },
    averageData: { type: Array },
    currentTab: {
      type: String,
      default: '',
    },
    currentTabData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    iDialog,
    piPreview
  },
  data () {
    return {
    };
  },
  mounted () {
  },
  methods: {
    clearDiolog () {
      this.$emit('input', false);
    }
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
