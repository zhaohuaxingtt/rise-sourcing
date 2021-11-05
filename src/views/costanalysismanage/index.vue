<!--
 * @Author: your name
 * @Date: 2021-05-27 11:30:28
 * @LastEditTime: 2021-08-23 14:27:18
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\costanalysismanage\index.vue
-->
<!-- 成本分析管理 -->
<template>
  <iPage class="costanalysismanage">
    <iNavMvp :lev="1" :list="navList" :lang="true" routerPage class="nav" />
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