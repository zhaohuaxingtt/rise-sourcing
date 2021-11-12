<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-09-23 14:36:41
 * @LastEditors: YoHo
 * @LastEditTime: 2021-11-12 13:57:16
 * @Description: AEKO 审批列表页
-->
<template>
  <iPage class="projectoverview">
    <projectTop />
    <div class="report-content">
      <router-view></router-view>
    </div>
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
.report-content{
  height: calc(100% - 60px);
}
</style>