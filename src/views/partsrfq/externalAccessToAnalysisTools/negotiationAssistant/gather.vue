<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 11:05:40
 * @LastEditors: YoHo
 * @Descripttion: your project
-->
<template>
  <div class="gather">
    <div class="margin-bottom15 flex-between-center-center"
         v-if="$route.path === '/sourcing/partsrfq/externalNegotiationAssistant'">
      <div class="flex-between-center-center">
        <iNavMvp :list="tabRouterList"
                 class="margin-bottom20"
                 routerPage
                 :lev="1"
                 :query="$route.query"
                 @change="changeRouter" />
      </div>
      <div class="floatright">
        <iButton v-if="pageType !== 'card'"
                 @click="entrance('card')">{{ $t('LK_FANHUI') }}</iButton>
        <iButton v-if="pageType === 'card'"
                 @click="handleSearch" v-permission="WORKBENCH_RFQ_TPZS_SEARCH">{{ $t('search') }}</iButton>
        <iButton @click="handleReport" v-permission="WORKBENCH_RFQ_TPZS_BAOGAOQINGDAN">{{ $t('TPZS.BGQD') }}</iButton>
        <!-- <icon class="icondatabaseweixuanzhong" name="icondatabaseweixuanzhong" symbol></icon> -->
      </div>
    </div>
    <div v-if="$route.path === '/sourceinquirypoint/sourcing/partsrfq/assistant'"
         class="right-btn">
      <iButton v-if="pageType !== 'card'"
               @click="entrance('card')">{{ $t('LK_FANHUI') }}</iButton>
      <iButton @click="handleReport">{{ $t('TPZS.BGQD') }}</iButton>
    </div>
    <!-- 图表 -->
    <specialAnalysisTool v-if="pageType === 'card'"
                         @entrance="entrance"
                         ref="specialAnalysisTool" />
    <!-- 点击图表详情 -->
    <pcaOverview v-else-if="pageType === 'PCA'"
                 pageType="PCA" />
    <pcaOverview v-else-if="pageType === 'TIA'"
                 pageType="TIA" />
    <bobOverview v-else-if="pageType === 'BoB'"
                :source="source" pageType="BoB" />
    <mekOverview v-else-if="pageType === 'MEK'"></mekOverview>
    <piOverView v-else-if="pageType === 'PI'"
                pageType="PI" />
    <vpAnalyseList v-else-if="pageType === 'VP'" />
    <bid-link v-else-if="pageType === 'BL'" />
  </div>
</template>

<script>
import { tabRouterList } from '../data';
import pcaOverview from '../../pcaAnalyse/pcaOverview';
import vpAnalyseList from '@/views/partsrfq/vpAnalyse/vpAnalyseList/index.vue';
import bobOverview from '../../bob/bob';
import mekOverview from '@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/mek/mek.vue';
import specialAnalysisTool from '@/views/partsrfq/editordetail/components/rfqDetailTpzs/components/specialAnalysisTool/index.vue';
import piOverView from '@/views/partsrfq/piAnalyse/piList';
import bidLink from '@/views/partsrfq/bidLink/index.vue';
import { getList } from "@/api/partsrfq/mek/index.js";
import { icon, iButton, iNavMvp } from 'rise';

export default {
  components: {
    pcaOverview,
    bobOverview,
    vpAnalyseList,
    mekOverview,
    piOverView,
    bidLink,
    specialAnalysisTool,
    icon,
    iNavMvp,
    iButton,
  },
  props: {
    source: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      tabRouterList,
      pageType: 'card',
    };
  },
  mounted () {
    if (this.$route.path === '/sourceinquirypoint/sourcing/partsrfq/assistant') {
      this.$store.dispatch('setRfqId', this.$route.query.id);
      this.$store.dispatch('setEntryStatus', 1);
      window.sessionStorage.setItem('entryStatus', 1);
      window.sessionStorage.setItem('rfqId', this.$route.query.id);
    } else {
      this.$store.dispatch('setRfqId', '');
      this.$store.dispatch('setEntryStatus', 0);
      window.sessionStorage.setItem('entryStatus', 0);
      window.sessionStorage.setItem('rfqId', '');
    }
  },
  created () {
    if (this.$route.query.pageType) {
      this.pageType = this.$route.query.pageType;
    }
  },
  methods: {
    async entrance (val) {
      if (val === 'MEK' && this.$route.path === '/sourceinquirypoint/sourcing/partsrfq/assistant') {
        const pms = {
          materialGroup: this.$store.state.rfq.materialGroup || '',
          createName: "",
          spareParts: this.$store.state.rfq.spareParts || "",
          rfqNo: this.$store.state.rfq.rfqId || "",
          pageNo: 1,
          pageSize: 10
        }
        const res = await getList(pms)
        if (res.data.length !== 0) {
          this.$router.push({ path: '/sourcing/mek/mekDetails', query: { schemeId: res.data[0].id, round: this.$route.query.round } })
        } else {
          this.pageType = val;
        }
      } else {
        this.pageType = val;
      }

    },
    handleSearch () {
      this.$refs.specialAnalysisTool.handleSearch();
    },
    handleReport () {
      this.$router.push({ path: '/sourcing/partsrfq/reportList' });
    },
  },
};
</script>

<style lang="scss" scoped>
.gather{
  height: 100%;
}
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
