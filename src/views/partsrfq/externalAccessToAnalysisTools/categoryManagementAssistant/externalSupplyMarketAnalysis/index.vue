<!--
 * @Author: 舒杰
 * @Date: 2021-08-03 10:42:23
 * @LastEditTime: 2021-08-03 14:26:27
 * @LastEditors: 舒杰
 * @Description: 外部供应市场分析
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\externalSupplyMarketAnalysis\index.vue
-->
<template>
  <iPage>
    <headerNav/>
    <!-- 行业报告 -->
    <!-- <industryReport></industryReport> -->
    <!--    市场数据-->
   <!-- <marketData class="margin-top30"/> -->
  </iPage>
</template>

<script>
import {iPage} from 'rise'
import headerNav from '../components/headerNav'
import industryReport from './industryReport'
import marketData from './marketData';
export default {
  components: {
    iPage,
    headerNav,
    industryReport,
    marketData
  }
};
</script>

<style scoped>

</style>
