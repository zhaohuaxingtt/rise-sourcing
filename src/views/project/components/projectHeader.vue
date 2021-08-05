<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:08:30
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-02 15:30:15
 * @Description: 
 * @FilePath: \front-web\src\views\project\components\projectHeader.vue
-->

<template>
  <div :class="`projectTop ${isProgressConfirm ? 'withAfter' : ''}`">
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
  },
  computed: {
    isProgressConfirm() {
      return this.$route.path.includes('progressconfirmsummary') || this.$route.path.includes('proconfirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.projectTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  &.withAfter::after {
    content: '';
    width: 100%;
    height: 1px;
    display: block;
    background: rgba(197, 206, 229, 0.5);
    position: absolute;
    left: 0px;
    bottom: -0.5rem;
  }
}
</style>