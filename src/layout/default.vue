<!--
 * @Author: yuszhou
 * @Date: 2020-07-22 14:56:34
 * @LastEditTime: 2021-03-08 14:26:25
 * @LastEditors: Please set LastEditors
 * @Description: 项目默认layout
 * @FilePath: \test\src\layout\default.vue
-->
<template>
  <div class="content">
    <topLayout></topLayout>
    <leftLayout>
      <template v-slot="scope">
        <menuLayout :menuData="scope.menuData"></menuLayout>
      </template>
    </leftLayout>
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import topLayout from './components/topLayout/'
import menuLayout from './components/menu'
import LeftLayout from './components/leftLayout'
export default {
  components:{topLayout,menuLayout,LeftLayout}
};
</script>
<style lang="scss" scoped>
.content{
  height: 100%;
  width: 100%;
  .app-content{
    padding-left: 100px;
    padding-top: 60px;
    height: 100%;
    width: 100%;
  }
}
</style>
