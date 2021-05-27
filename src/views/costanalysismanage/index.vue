<!--
 * @Author: your name
 * @Date: 2021-05-27 11:30:28
 * @LastEditTime: 2021-05-27 13:43:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\index.vue
-->
<!-- 成本分析管理 -->
<template>
  <iPage class="costanalysismanage">
    <iNavMvp :lev="1" :list="navList" routerPage class="nav" />
    <router-view></router-view>
  </iPage>
</template>

<script>
import { iPage, iNavMvp } from "rise"
import { navList } from "./components/data"
import { cloneDeep } from "lodash"

export default {
  components: {
    iPage,
    iNavMvp
  },
  data() {
    return {
      navList: cloneDeep(navList)
    }
  }
}
</script>

<style lang="scss" scoped>
.costanalysismanage {
  position: relative;

  .nav {
    position: absolute;
    top: 30px;
    left: 40px;
  }
}
</style>