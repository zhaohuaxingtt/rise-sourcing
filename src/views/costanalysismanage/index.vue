<!--
 * @Author: your name
 * @Date: 2021-05-27 11:30:28
 * @LastEditTime: 2021-11-25 15:36:05
 * @LastEditors: Luoshuang
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
// import { navList } from "./components/data"
import { cloneDeep } from "lodash"
import { TAB } from '@/views/financialTargetPrice/components/data'

export default {
  components: {
    iPage,
    iNavMvp
  },
  data() {
    return {
      navList: cloneDeep(TAB)
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