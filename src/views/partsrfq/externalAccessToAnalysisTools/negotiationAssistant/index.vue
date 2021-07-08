<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 11:05:40
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iPage>
    <div class="margin-bottom20 flex-between-center-center" v-if="$route.path==='/sourcing/partsrfq/externalNegotiationAssistant'">
      <div class="flex-between-center-center">
        <iNavMvp :list="tabRouterList" routerPage :lev="1" :query='$route.query' @change='changeRouter' />
      </div>
      <div class="floatright">
        <iButton v-if="pageType!=='card'" @click="entrance('card')">{{ $t('LK_FANHUI') }}</iButton>
        <iButton v-if="pageType==='card'" @click="handleSearch">{{ $t('search') }}</iButton>
        <iButton @click="handleReport">{{ $t('TPZS.BGQD') }}</iButton>
        <icon class="icondatabaseweixuanzhong" name="icondatabaseweixuanzhong" symbol></icon>
      </div>
    </div>
    <div v-if="$route.path==='/sourcing/partsrfq/assistant'" class="margin-bottom20 clearFloat">
      <div class="floatright">
        <iButton @click="handleReport">{{ $t('TPZS.BGQD') }}</iButton>
        <iButton v-if="pageType!=='card'" @click="entrance('card')">{{ $t('LK_FANHUI') }}</iButton>
      </div>
    </div>
    <specialAnalysisTool v-if="pageType === 'card'" @entrance="entrance" ref="specialAnalysisTool" />
    <pcaOverview v-else-if="pageType === 'PCA'" pageType="PCA" />
    <pcaOverview v-else-if="pageType === 'TIA'" pageType="TIA" />
    <bobOverview v-else-if="pageType === 'BoB(Best of Best)'" />
    <vpAnalyseList v-else-if="pageType==='Volume Pricing'" />
  </iPage>
</template>

<script>
import { tabRouterList } from '../data';
import pcaOverview from '../../pcaAnalyse/pcaOverview';
import vpAnalyseList from '@/views/partsrfq/vpAnalyse/vpAnalyseList/index.vue';
import bobOverview from '../../bob/bob';
import specialAnalysisTool
  from '@/views/partsrfq/editordetail/components/rfqDetailTpzs/components/specialAnalysisTool/index.vue';
import { icon, iButton, iNavMvp, iPage } from 'rise';

export default {
  components: {
    pcaOverview,
    bobOverview,
    vpAnalyseList,
    specialAnalysisTool, icon, iNavMvp, iButton, iPage
  },
  data() {
    return {
      tabRouterList,
      pageType: 'card',
    };
  },
  mounted() {
    if (this.$route.path === '/sourcing/partsrfq/assistant') {
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

    if (!!this.$route.query.pageType) {
      this.pageType = this.$route.query.pageType
    }
  },
  methods: {
    entrance(val) {
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

.btn {
  position: absolute;
  top: 5.5rem;
  right: 3rem;
}
</style>
