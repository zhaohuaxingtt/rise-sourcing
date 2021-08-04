<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-07-30 17:08:26
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iPage>
    <headerNav />
    <!-- 内部需求分析 -->
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
