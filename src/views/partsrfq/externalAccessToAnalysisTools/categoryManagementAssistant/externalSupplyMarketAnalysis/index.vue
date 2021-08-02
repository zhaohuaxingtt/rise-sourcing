<!--
 * @Author: 舒杰
 * @Date: 2021-08-02 09:57:17
 * @LastEditTime: 2021-08-02 10:17:50
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\externalSupplyMarketAnalysis\index.vue
-->
<template>
  <iPage>
    <headerNav/>
    外部供应市场分析
    <industryReport></industryReport>
  </iPage>
</template>

<script>
import {iPage} from 'rise'
import headerNav from '../components/headerNav'
import industryReport from './industryReport'
export default {
  components: {
    iPage,
    headerNav,
    industryReport
  }
};
</script>

<style scoped>

</style>
