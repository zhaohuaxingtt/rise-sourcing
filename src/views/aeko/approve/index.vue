<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-09-23 14:36:41
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-23 15:29:17
 * @Description: AEKO 审批列表页
-->
<template>
  <iPage class="projectoverview">
    <projectTop />
    <router-view></router-view>
  </iPage>
  
</template>

<script>
import { iPage } from 'rise'
import projectTop from './components/projectHeader'

export default {
  components: { iPage,projectTop },
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
</style>