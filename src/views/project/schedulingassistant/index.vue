<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:12:19
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-23 17:14:10
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
        // eslint-disable-next-line no-undef
        return _.cloneDeep(MENUFS)
      }
      // eslint-disable-next-line no-undef
      return _.cloneDeep(MENU)
    },
    navList() {
      if (this.$route.path.includes('proconfirm')) {
        return TAB.filter(item => item.value === 2)
      }
      // eslint-disable-next-line no-undef
      return _.cloneDeep(TAB)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>