<!--
 * @Author: 舒杰
 * @Date: 2021-08-03 10:42:23
 * @LastEditTime: 2021-08-04 15:24:11
 * @LastEditors: 舒杰
 * @Description: 内部需求分析
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\index.vue
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
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">

</style>
