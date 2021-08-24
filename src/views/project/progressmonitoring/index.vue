<!--
 * @Author: Luoshuang
 * @Date: 2021-08-05 14:41:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-24 15:51:34
 * @Description: 项目进度监控
 * @FilePath: \front-web\src\views\project\progressmonitoring\index.vue
-->
<template>
  <iPage class="projectoverview">
    <projectTop :subNavList="subMenu" />
    <router-view></router-view>
  </iPage>
  
</template>

<script>
import { iPage } from 'rise'
import projectTop from '../components/projectHeader'
import {MENU} from './data'

export default {
  components: { iPage, projectTop },
  data() {
    return {
      subMenu: MENU,
    }
  },
}
</script>
<style lang="scss" scoped>
</style>