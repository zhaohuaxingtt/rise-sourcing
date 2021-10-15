<!--
 * @Author: Luoshuang
 * @Date: 2021-08-05 14:42:27
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-10-11 15:34:23
 * @Description: 项目进度报告
 * @FilePath: \front-web\src\views\project\progressreport\index.vue
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
import { MENU } from './data'
export default {
  components: { iPage, projectTop },
  data() {
    return {
      subMenu: MENU,
    }
  }
  
}
</script>