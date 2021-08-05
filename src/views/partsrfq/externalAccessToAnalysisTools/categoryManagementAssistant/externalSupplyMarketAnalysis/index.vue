<!--
 * @Author: 舒杰
 * @Date: 2021-08-03 10:42:23
 * @LastEditTime: 2021-08-04 15:12:47
 * @LastEditors: Please set LastEditors
 * @Description: 外部供应市场分析
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\externalSupplyMarketAnalysis\index.vue
-->
<template>
  <iPage>
    <headerNav/>
    <router-view></router-view>
  </iPage>
</template>

<script>
import {iPage} from 'rise'
import headerNav from '../components/headerNav'
export default {
  components: {
    iPage,
    headerNav,
  }
};
</script>

<style scoped>

</style>
