<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 09:14:14
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-01 14:06:33
 * @Description: 财务目标价顶部导航
 * @FilePath: \front-web\src\views\financialTargetPrice\components\headerNav.vue
-->

<template>
  <div class="headerNav">
    <iNavMvp :list="list" @change="change" :lang="true" :lev="1" routerPage></iNavMvp>
    <iNavMvp @change="change" class="pull-right" :lang="true" right routerPage lev="2" :list="navList" />
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
import { TAB, MENU } from './data'
export default {
  components: {iNavMvp},
  data() {
    return {
      list: TAB,
      navList: MENU
    }
  },
  methods: {
    change() {}
  }
}
</script>

<style lang="scss" scoped>
.headerNav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  .nav div {
    margin-left: 0;
  }
}
</style>