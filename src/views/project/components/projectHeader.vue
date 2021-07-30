<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:08:30
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-29 19:02:09
 * @Description: 
 * @FilePath: \front-web\src\views\project\components\projectHeader.vue
-->

<template>
  <div class="projectTop">
    <iNavMvp v-if="navList" :lev="1" :list="navList" :lang="true" routerPage class="nav" />
    <iNavMvp v-if="subNavList" :lev="2" :list="subNavList" :lang="true" routerPage class="nav-sub" />
  </div>
</template>

<script>
import { iNavMvp } from "rise"
import { TAB } from "./data"
import { cloneDeep } from "lodash"

export default {
  components: {
    iNavMvp
  },
  props: {
    navList: {type:Array, default: cloneDeep(TAB)},
    subNavList: {type:Array}
  }
}
</script>

<style lang="scss" scoped>
.projectTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>