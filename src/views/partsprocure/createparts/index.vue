<!--
 * @Author: your name
 * @Date: 2021-05-24 16:03:20
 * @LastEditTime: 2021-06-25 11:52:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\createParts\index.vue
-->
<template>
  <iPage class="createParts">
    <iNavMvp :lev="1" :list="navList" :lang="true" routerPage class="nav" />
    <router-view></router-view>
  </iPage>
</template>

<script>
import { iPage, iNavMvp } from "rise"
import { navList } from "./components/data"
import { cloneDeep } from "lodash"


export default {
  name: "createParts",
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
.createParts {
  position: relative;

  .nav {
    position: absolute;
    top: 30px;
    left: 40px;
  }
}
</style>