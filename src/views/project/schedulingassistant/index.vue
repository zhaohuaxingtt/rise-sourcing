<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:12:19
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-05 15:09:24
 * @Description: 项目管理-排程助手
 * @FilePath: \front-web\src\views\project\schedulingassistant\index.vue
-->

<template>
  <iPage class="scheulingassistant">
    <projectTop :subNavList="subNavList" :navList="navList" />
    <router-view></router-view>
  </iPage>
</template>

<script>
import { iPage } from "rise"
import { MENU, MENUFS } from './data'
import { cloneDeep } from "lodash"
import projectTop from '../components/projectHeader'
import { TAB } from '../components/data'

export default {
  components: { iPage, projectTop },
  data() {
    return {
    }
  },
  computed: {
    subNavList() {
      if (this.$route.path.includes('proconfirm')) {
        return cloneDeep(MENUFS)
      }
      return cloneDeep(MENU)
    },
    navList() {
      if (this.$route.path.includes('proconfirm')) {
        return TAB.filter(item => item.value === 2)
      }
      return cloneDeep(TAB)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>