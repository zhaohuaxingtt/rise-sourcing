<!--
 * @Author: 舒杰
 * @Date: 2021-08-12 09:58:51
 * @LastEditTime: 2021-09-07 16:51:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\components\headerNav.vue
-->
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
        <template v-if="showCommonButton">
          <iButton @click="openCatecory">{{ language('PLGLZS.CAILIAOZU', '材料组') }}</iButton>
          <iButton @click="openReportInventoryDialog">{{ language('PLGLZS.BAOGAOQINGDAN', '报告清单') }}</iButton>
        </template>
        <slot name="extralButton"></slot>
      </div>
      <logButton class="logButton"/>
      <!--      报告清单-->
      <reportInventory v-model="reportInventoryDialog"/>
      <categoryGroup v-model="openCatecoryDialog"></categoryGroup>
    </div>
  </div>
</template>

<script>
import {iNavMvp, iButton} from 'rise';
import {tabRouterList, categoryManagementAssistantList} from '../../data';
import reportInventory from '../reportInventory';
import logButton from '@/components/logButton';
import categoryGroup from './categoryGroup';

export default {
  components: {
    iNavMvp,
    iButton,
    reportInventory,
    categoryGroup,
    logButton,
  },
  props: {
    showCommonButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tabRouterList,
      categoryManagementAssistantList,
      reportInventoryDialog: false,
      openCatecoryDialog: false,
    };
  },
  mounted () {
    if (!this.$store.state.rfq.categoryCode) {
      this.openCatecory()
    }
  },
  methods: {
    openReportInventoryDialog() {
      if (this.$store.state.rfq.categoryCode) {
        this.reportInventoryDialog = true;
      } else {
        this.openCatecoryDialog = true;
      }
    },
    openCatecory() {
      this.openCatecoryDialog = true;
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

