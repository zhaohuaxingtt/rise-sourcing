<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:12:19
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-27 14:18:50
 * @Description: 项目管理-排程助手
 * @FilePath: \front-web\src\views\project\schedulingassistant\index.vue
-->

<template>
  <iPage class="scheulingassistant">
    <projectTop :subNavList="subNavList" />
    <router-view></router-view>
  </iPage>
</template>

<script>
import { iPage } from "rise"
import { MENU } from './data'
import { cloneDeep } from "lodash"
import projectTop from '../components/projectHeader'

export default {
  components: { iPage, projectTop },
  data() {
    return {
      subNavList: cloneDeep(MENU)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>