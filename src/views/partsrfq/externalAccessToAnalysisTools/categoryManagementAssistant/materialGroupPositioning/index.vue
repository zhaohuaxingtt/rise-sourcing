<!--
 * @Author: 舒杰
 * @Date: 2021-08-03 10:42:23
 * @LastEditTime: 2021-08-04 10:28:21
 * @LastEditors: 舒杰
 * @Description: 材料组定位
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\materialGroupPositioning\index.vue
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

<style scoped>

</style>
