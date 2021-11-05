<!--
 * @Author: Luoshuang
 * @Date: 2021-08-05 14:41:27
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-27 10:53:21
 * @Description: 项目进度监控
 * @FilePath: \front-web\src\views\project\progressmonitoring\index.vue
-->
<template>
  <iPage class="projectoverview">
    <projectTop :subNavList="subMenu" v-if="!withoutTop" :navList="navList" />
    <carProNameTop v-else />
    <router-view></router-view>
  </iPage>
  
</template>

<script>
import { iPage } from 'rise'
import projectTop from '../components/projectHeader'
import carProNameTop from './components/carproNameTop'
import {MENU} from './data'
import {MENUFS} from '../schedulingassistant/data'
import { TAB } from '../components/data'

export default {
  components: { iPage, projectTop, carProNameTop },
  data() {
    return {
      // subMenu: MENU,
    }
  },
  computed: {
    withoutTop() {
      return this.$route.meta.withoutTop
    },
    subMenu() {
      return this.$route.path.includes('delayconfirm') ? MENUFS : MENU
    },
    navList() {
      if (this.$route.path.includes('delayconfirm')) {
        return TAB.filter(item => item.value === 2 || item.value === 3)
      }
      // eslint-disable-next-line no-undef
      return _.cloneDeep(TAB)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>