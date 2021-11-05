<!--
 * @Author: your name
 * @Date: 2021-05-27 11:30:28
 * @LastEditTime: 2021-08-23 15:50:28
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\costanalysismanage\components\datamaintenance\index.vue
-->
<template>
  <div>
    <iNavMvp :lev="2" :list="navList" :lang="true" routerPage class="nav" />
    <router-view></router-view>
  </div>
</template>

<script>
import { iPage, iNavMvp } from "rise";
import { navList } from "./components/data";
import { cloneDeep } from "lodash";

export default {
  components: {
    iNavMvp,
  },
  data() {
    return {
      navList: cloneDeep(navList),
    };
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: absolute;
  top: 30px;
  right: 200px;
}
</style>
