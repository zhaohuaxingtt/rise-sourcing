<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-09-23 14:36:41
 * @LastEditors: YoHo
 * @LastEditTime: 2021-12-17 16:16:16
 * @Description: AEKO 审批列表页
-->
<template>
  <iPage class="projectoverview">
    <projectTop :from="from" />
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
      from: {}
    }
  },
  beforeRouteEnter (to, from, next) { // AEKO操作返回之前页
    // 注意，在路由进入之前，组件实例还未渲染，所以无法获取this实例，只能通过vm来访问组件实例
    next(vm => {
      vm.from = from
    })
  }
}
</script>
<style lang="scss" scoped>
.report-content{
  height: calc(100% - 60px);
}
</style>