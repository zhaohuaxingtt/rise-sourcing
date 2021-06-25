<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 11:05:40
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div>
    <specialAnalysisTool v-if="pageType === 'card'" @entrance="entrance" ref="specialAnalysisTool" />
    <pcaOverview v-else-if="pageType === 'PCA'" />
    <tiaOverview v-else-if="pageType === 'TIA'" />
    <bobOverview v-else-if="pageType === 'BoB(Best of Best)'" />
    <vpAnalyseList v-else-if="pageType==='Volume Pricing'" />
  </div>
</template>

<script>
import { tabRouterList } from '../data';
import pcaOverview from '../../pcaAnalyse/pcaOverview';
import tiaOverview from '../../tiaAnalyse/tiaOverview';
import vpAnalyseList from "@/views/partsrfq/vpAnalyse/vpAnalyseList/index.vue";
import bobOverview from '../../bob/bob';
import specialAnalysisTool from '@/views/partsrfq/editordetail/components/rfqDetailTpzs/components/specialAnalysisTool/index.vue';



export default {
  components: {
    pcaOverview,
    tiaOverview,
    bobOverview,
    vpAnalyseList,
    specialAnalysisTool
  },
  data() {
    return {
      tabRouterList,
      pageType: 'card',
    };
  },

  created() {
  },
  methods: {
    entrance(val) {
      console.log(val);
      this.pageType = val
    }
  },
};
</script>

<style >
.icondatabaseweixuanzhong {
  font-size: 21px;
  margin-left: 1.875rem;
}
.flex-end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
