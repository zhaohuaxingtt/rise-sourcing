<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 11:05:40
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div>
    <div v-if="$route.path==='/sourcing/partsrfq/externalNegotiationAssistant'" class="btn">
      <iButton v-if="pageType!=='card'" @click="entrance('card')">{{$t('LK_FANHUI')}}</iButton>
      <iButton v-if="pageType==='card'" @click="handleSearch">{{$t('search')}}</iButton>
      <iButton v-if="pageType==='card'" @click="handleReport">{{$t('TPZS.BGQD')}}</iButton>
      <icon class="icondatabaseweixuanzhong" name="icondatabaseweixuanzhong" symbol></icon>
    </div>
    <div v-if="$route.path==='/sourcing/partsrfq/assistant'" class="margin-bottom20 clearFloat">
      <div class="floatright">
        <iButton v-if="pageType==='card'" @click="handleSearch">{{$t('search')}}</iButton>
        <iButton v-if="pageType!=='card'" @click="entrance('card')">{{$t('LK_FANHUI')}}</iButton>
      </div>
    </div>
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
import { icon, iButton } from "rise";



export default {
  components: {
    pcaOverview,
    tiaOverview,
    bobOverview,
    vpAnalyseList,
    specialAnalysisTool, icon,
    iButton,
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
      this.pageType = val
    },
    handleSearch() {
      this.$refs.specialAnalysisTool.handleSearch()
    },
    handleReport() {
      this.$router.push({ path: '/sourcing/partsrfq/reportList' })
    },
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
::v-deep .routerpage {
  position: relative;
}
.btn {
  position: absolute;
  top: 5.5rem;
  right: 3rem;
}
</style>
