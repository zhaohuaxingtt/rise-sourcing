<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 11:05:40
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <div>
    <div class="margin-bottom15 flex-between-center-center" v-if="$route.path==='/sourcing/partsrfq/externalNegotiationAssistant'">
      <div class="flex-between-center-center" >
        <iNavMvp :list="tabRouterList" class="margin-bottom20" routerPage :lev="1" :query='$route.query' @change='changeRouter' />
      </div>
      <div class="floatright">
        <iButton v-if="pageType!=='card'" @click="entrance('card')">{{ $t('LK_FANHUI') }}</iButton>
        <iButton v-if="pageType==='card'" @click="handleSearch">{{ $t('search') }}</iButton>
        <iButton @click="handleReport">{{ $t('TPZS.BGQD') }}</iButton>
        <!-- <icon class="icondatabaseweixuanzhong" name="icondatabaseweixuanzhong" symbol></icon> -->
      </div>
    </div>
    <div v-if="$route.path==='/sourceinquirypoint/sourcing/partsrfq/assistant'" class="right-btn">
      <iButton v-if="pageType!=='card'" @click="entrance('card')">{{ $t('LK_FANHUI') }}</iButton>
      <iButton @click="handleReport">{{ $t('TPZS.BGQD') }}</iButton>
    </div>
    <specialAnalysisTool v-if="pageType === 'card'" @entrance="entrance" ref="specialAnalysisTool" />
    <pcaOverview v-else-if="pageType === 'PCA'" pageType="PCA" />
    <pcaOverview v-else-if="pageType === 'TIA'" pageType="TIA" />
    <bobOverview v-else-if="pageType === 'BoB'" pageType="BoB" />
    <mekOverview v-else-if="pageType==='MEK'"></mekOverview>
    <piOverView v-else-if="pageType === 'PI'" pageType="PI" />
    <vpAnalyseList v-else-if="pageType==='VP'" />
  </div>
</template>

<script>
import { tabRouterList } from '../data';
import pcaOverview from '../../pcaAnalyse/pcaOverview';
import vpAnalyseList from '@/views/partsrfq/vpAnalyse/vpAnalyseList/index.vue';
import bobOverview from '../../bob/bob';
import mekOverview from "@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/mek/mek.vue"
import specialAnalysisTool
  from '@/views/partsrfq/editordetail/components/rfqDetailTpzs/components/specialAnalysisTool/index.vue';
import piOverView from '@/views/partsrfq/piAnalyse/piList'
import { icon, iButton, iNavMvp } from 'rise';

export default {
  components: {
    pcaOverview,
    bobOverview,
    vpAnalyseList,
    mekOverview,
    piOverView,
    specialAnalysisTool, icon, iNavMvp, iButton
  },
  data() {
    return {
      tabRouterList,
      pageType: 'card',
    };
  },
  mounted() {
    if (this.$route.path === '/sourceinquirypoint/sourcing/partsrfq/assistant') {
      this.$store.dispatch('setRfqId', this.$route.query.id)
      this.$store.dispatch('setEntryStatus', 1)
      window.sessionStorage.setItem('entryStatus', 1)
      window.sessionStorage.setItem('rfqId', this.$route.query.id)
    } else {
      this.$store.dispatch('setRfqId', '')
      this.$store.dispatch('setEntryStatus', 0)
      window.sessionStorage.setItem('entryStatus', 0)
      window.sessionStorage.setItem('rfqId', '')
    }
  },
  created() {
    if (this.$route.query.pageType) {
      this.pageType = this.$route.query.pageType
    }
  },
  methods: {
    entrance(val) {
      console.log(val)
      this.pageType = val;
    },
    handleSearch() {
      this.$refs.specialAnalysisTool.handleSearch();
    },
    handleReport() {
      this.$router.push({ path: '/sourcing/partsrfq/reportList' });
    },
  },
};
</script>

<style>
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
.right-btn {
  position: absolute;
  top: -3.5rem;
  right: 0;
}
.btn {
  position: absolute;
  top: 5.5rem;
  right: 3rem;
}
</style>
