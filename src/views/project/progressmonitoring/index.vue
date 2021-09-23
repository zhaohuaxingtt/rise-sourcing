<!--
 * @Author: Luoshuang
 * @Date: 2021-08-05 14:41:27
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-23 09:42:05
 * @Description: 项目进度监控
 * @FilePath: \front-web\src\views\project\progressmonitoring\index.vue
-->
<template>
  <iPage class="projectoverview">
    <projectTop :subNavList="subMenu" v-if="!withoutTop" />
    <carProNameTop v-else />
    <router-view></router-view>
  </iPage>
  
</template>

<script>
import { iPage } from 'rise'
import projectTop from '../components/projectHeader'
import carProNameTop from './components/carproNameTop'
import {MENU} from './data'

export default {
  components: { iPage, projectTop, carProNameTop },
  data() {
    return {
      subMenu: MENU,
    }
  },
  computed: {
    withoutTop() {
      return this.$route.meta.withoutTop
    }
  }
}
</script>
<style lang="scss" scoped>
</style>