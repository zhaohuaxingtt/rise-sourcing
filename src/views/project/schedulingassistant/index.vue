<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:12:19
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-12 17:40:39
 * @Description: 项目管理-排程助手
 * @FilePath: \front-sourcing\src\views\project\schedulingassistant\index.vue
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
import { TAB, COMFIRMTAB } from '../components/data'

export default {
  components: { iPage, projectTop },
  data() {
    return {
    }
  },
  computed: {
    subNavList() {
      if (this.$route.path.includes('proconfirm') || this.$route.path.includes('delayconfirm')) {
        // eslint-disable-next-line no-undef
        return _.cloneDeep(MENUFS)
      }
      // eslint-disable-next-line no-undef
      return _.cloneDeep(MENU)
    },
    navList() {
      if (this.$route.path.includes('proconfirm') || this.$route.path.includes('delayconfirm')) {
        // eslint-disable-next-line no-undef
        return _.cloneDeep(COMFIRMTAB)
      }
      // eslint-disable-next-line no-undef
      return _.cloneDeep(TAB)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>