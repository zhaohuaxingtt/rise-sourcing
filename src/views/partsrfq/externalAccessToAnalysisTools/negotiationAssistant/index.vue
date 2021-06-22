<template>
  <iPage>
    <iNavMvp :list="newTabRouterList" class="margin-bottom20" routerPage :lev="1"/>
    <pcaOverview v-if="pageType === 'pca'"/>
  </iPage>
</template>

<script>
import {iPage, iNavMvp} from 'rise';
import {tabRouterList} from '../data';
import pcaOverview from '../../pcaAnalyse/pcaOverview';

export default {
  components: {
    iPage,
    iNavMvp,
    pcaOverview,
  },
  data() {
    return {
      tabRouterList,
      newTabRouterList: [],
    };
  },
  computed: {
    pageType() {
      return this.$route.query.type;
    },
  },
  created() {
    this.handleTabRouter();
  },
  methods: {
    handleTabRouter() {
      this.newTabRouterList = this.tabRouterList.map(item => {
        if (item.name === '谈判助手') {
          item.url = item.url + `?type=${this.pageType}`;
          item.activePath = item.url + `?type=${this.pageType}`;
        }
        return item;
      });
    },
  },
};
</script>

<style scoped>

</style>
