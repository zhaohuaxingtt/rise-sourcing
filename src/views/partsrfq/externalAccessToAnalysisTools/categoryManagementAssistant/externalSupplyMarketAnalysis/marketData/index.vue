<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font22 font-weight">{{ language('PLGLZS.SHICHANGSHUJU', '市场数据') }}</span>
      <div class="floatright">
        <iButton>{{ language('LK_QUEREN', '确认') }}</iButton>
        <iButton>{{ language('LK_BAOCUN', '保存') }}</iButton>
        <iButton>{{ language('LK_FANHUI', '返回') }}</iButton>
      </div>
    </div>
    <!--    导航条-->
    <theTabs @handleClick="handleTabsClick"/>
    <!--    搜索栏-->
    <theSearch :list="searchProps" v-if="showStatus"/>
    <!--    数据页签栏-->
    <theDataTab :list="dataTabArray" v-if="showStatus"/>
  </iCard>
</template>

<script>
import {iCard, iButton} from 'rise';
import theTabs from './components/theTabs';
import theSearch from './components/theSearch';
import theDataTab from './components/theDataTab';
import {rawMaterialSearch, manpowerSearch, energySearch} from './components/data';

export default {
  components: {
    iCard,
    iButton,
    theTabs,
    theSearch,
    theDataTab,
  },
  data() {
    return {
      searchProps: rawMaterialSearch,
      dataTabArray: [{name: '类别1'}],
      showStatus: true,
    };
  },
  methods: {
    handleTabsClick(val) {
      this.showStatus = false;
      this.$nextTick(() => {
        this.showStatus = true;
        this.handleTabsChange(val);
      });
    },
    handleTabsChange(val) {
      switch (val) {
        case 1:
          this.searchProps = rawMaterialSearch;
          this.dataTabArray = [{name: '类别1'}];
          break;
        case 2:
          this.searchProps = manpowerSearch;
          this.dataTabArray = [{name: '人工1'}];
          break;
        case 3:
          this.searchProps = energySearch;
          this.dataTabArray = [{name: '产品1'}];
          break;
      }
    },
  },
};
</script>

<style scoped>

</style>
