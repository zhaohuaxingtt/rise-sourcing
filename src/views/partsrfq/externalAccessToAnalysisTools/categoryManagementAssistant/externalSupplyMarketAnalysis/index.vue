<!--
 * @Author: your name
 * @Date: 2021-07-30 15:47:49
 * @LastEditTime: 2021-08-03 19:52:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\externalSupplyMarketAnalysis\index.vue
-->
<template>
  <iPage>
    <headerNav/>
    <mainContent/>
  </iPage>
</template>

<script>
import {iPage} from 'rise'
import headerNav from '../components/headerNav'
import mainContent from './components/main'
export default {
  components: {
    iPage,
    headerNav,
    mainContent
  }
};
</script>

<style scoped>

</style>
