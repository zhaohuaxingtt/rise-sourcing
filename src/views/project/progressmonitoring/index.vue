<!--
 * @Author: Luoshuang
 * @Date: 2021-08-05 14:41:27
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-12-30 14:48:44
 * @Description: 项目进度监控
 * @FilePath: \front-sourcing\src\views\project\progressmonitoring\index.vue
-->
<template>
  <iPage class="projectoverview">
    <projectTop :subNavList="subMenu" v-if="!withoutTop" :navList="navList" />
    <carProNameTop v-else @handleCollapse="handleCollapse" />
    <router-view></router-view>
  </iPage>
  
</template>

<script>
import { iPage } from 'rise'
import projectTop from '../components/projectHeader'
import carProNameTop from './components/carproNameTop'
import {MENU} from './data'
import {MENUFS} from '../schedulingassistant/data'
import { TAB, COMFIRMTAB } from '../components/data'

export default {
  components: { iPage, projectTop, carProNameTop },
  data() {
    return {
      // subMenu: MENU,
      collapseValue: true
    }
  },
  provide(){
    return {vm:this}
  },
  computed: {
    withoutTop() {
      return this.$route.meta.withoutTop
    },
    subMenu() {
      return MENU
    },
    navList() {
      // if (this.$route.path.includes('delayconfirm')) {
      //   // eslint-disable-next-line no-undef
      //   return _.cloneDeep(COMFIRMTAB)
      // }
      // eslint-disable-next-line no-undef
      return _.cloneDeep(TAB)
    }
  },
  methods: {
    handleCollapse(collapseValue) {
      this.collapseValue = collapseValue
    }
  }
}
</script>
<style lang="scss" scoped>
</style>