<!--
 * @Author: 舒杰
 * @Date: 2021-08-03 10:42:23
 * @LastEditTime: 2021-08-04 14:10:03
 * @LastEditors: zbin
 * @Description: 内部需求分析
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\index.vue
-->
<template>
  <iPage>
    <headerNav/>
    <router-view></router-view>
    <purchaseAmountOverall v-if="false" />
    <supplyChainOverall v-if="true" />
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import purchaseAmountOverall from "./purchaseAmountOverall/index.vue";
import headerNav from '../components/headerNav'
import supplyChainOverall from "./supplyChainOverall/index.vue";
export default {
  components: {
    iPage,
    headerNav,
    purchaseAmountOverall,
    supplyChainOverall
  }
};
</script>

<style scoped>
</style>
