<!--
 * @Author: 舒杰
 * @Date: 2021-08-03 10:42:23
 * @LastEditTime: 2021-08-04 14:37:06
 * @LastEditors: Please set LastEditors
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
    <mainContent/>
  </iPage>
</template>

<script>
import {iPage} from 'rise'
import headerNav from '../components/headerNav'
import industryReport from './industryReport'
import marketData from './marketData';
import mainContent from './components/main'
export default {
  components: {
    iPage,
    headerNav,
    industryReport,
    marketData,
    mainContent
  }
};
</script>

<style scoped>

</style>
