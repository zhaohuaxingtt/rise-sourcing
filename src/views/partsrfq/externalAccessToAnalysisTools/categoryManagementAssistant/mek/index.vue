<!--
 * @Author: your name
 * @Date: 2021-08-05 06:33:32
 * @LastEditTime: 2021-08-05 07:36:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\index.vue
-->
<template>
  <iPage>
    <headerNav />
    <router-view></router-view>
  </iPage>
</template>

<script>
import { iPage } from "rise";
import headerNav from "../components/headerNav";
export default {
  components: {
    iPage,
    headerNav,
  },
};
</script>

<style scoped lang="scss"></style>
