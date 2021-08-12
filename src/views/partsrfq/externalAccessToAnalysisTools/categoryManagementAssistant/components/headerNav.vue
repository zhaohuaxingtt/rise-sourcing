<template>
  <div>
    <div class="navBox">
      <iNavMvp :list="tabRouterList" class="margin-bottom20" routerPage :lev="1"/>
      <div class="rightNav">
        <iNavMvp
            :list="categoryManagementAssistantList"
            :lev='2'
            right
            routerPage
            class="margin-right20"
        />
        <iButton>{{ language('PLGLZS.CAILIAOZU', '材料组') }}</iButton>
        <iButton @click="openReportInventoryDialog">{{ language('PLGLZS.BAOGAOQINGDAN', '报告清单') }}</iButton>
        <slot name="extralButton"></slot>
      </div>
      <logButton class="logButton"/>

      <!--      报告清单-->
      <reportInventory
          v-model="reportInventoryDialog"
      />
    </div>
  </div>
</template>

<script>
import {iNavMvp, iButton} from 'rise';
import {tabRouterList, categoryManagementAssistantList} from '../../data';
import reportInventory from '../reportInventory';
import logButton from '@/components/logButton';

export default {
  components: {
    iNavMvp,
    iButton,
    reportInventory,
    logButton,
  },
  data() {
    return {
      tabRouterList,
      categoryManagementAssistantList,
      reportInventoryDialog: false,
    };
  },
  methods: {
    openReportInventoryDialog() {
      this.reportInventoryDialog = true;
    },
  },
};
</script>

<style scoped lang="scss">
.navBox {
  position: relative;

  .rightNav {
    display: flex;
    position: absolute;
    top: 0;
    right: 110px;
  }

  .logButton {
    position: absolute;
    top: 5px;
    right: 0;
  }
}
</style>

