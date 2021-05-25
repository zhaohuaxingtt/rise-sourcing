<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 13:50:02
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-25 14:30:28
 * @Description: 配件
 * @FilePath: \front-web\src\views\accessoryPart\index.vue
-->

<template>
  <iPage class="accessoryPart">
    <!----------------------------------------------------------------->
    <!--------------------------- 配件相关头部 ------------------------->
    <!----------------------------------------------------------------->
    <topComponents :pageMenu='navList' lev='2' right>
      <iNavMvp slot="left" :lev="1" :list="pageMenu" routerPage class="floatleft"  />
    </topComponents>
    <router-view></router-view>
  </iPage>
</template>

<script>
import { iPage, iNavMvp } from "rise"
import { navList, pageMenu } from "./data"
import { cloneDeep } from "lodash"
import topComponents from '../designate/designatedetail/components/topComponents'

export default {
  name: "accessoryPart",
  components: {
    iPage,
    iNavMvp,
    topComponents
  },
  data() {
    return {
      navList: cloneDeep(navList),
      pageMenu: cloneDeep(pageMenu)
    }
  }
}
</script>

<style lang="scss" scoped>
.accessoryPart {
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>