<!--
 * @Author: yuszhou
 * @Date: 2020-07-22 14:56:34
 * @LastEditTime: 2021-02-23 15:11:47
 * @LastEditors: Please set LastEditors
 * @Description: 项目默认layout
 * @FilePath: \test\src\layout\default.vue
-->
<template>
  <div class="content">
    <topLayout></topLayout>
    <menuLayout></menuLayout>
    <leftLayout></leftLayout>
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import topLayout from './components/topLayout'
import menuLayout from './components/menu'
import LeftLayout from './components/leftLayout.vue';
export default {
  components:{topLayout,menuLayout,LeftLayout}
};
</script>
<style lang="scss" scoped>
</style>
