<!--
 * @Author: yuszhou
 * @Date: 2021-02-24 09:30:41
 * @LastEditTime: 2021-02-24 09:33:34
 * @LastEditors: Please set LastEditors
 * @Description: 界面根组件
 * @FilePath: \rise\src\components\iPage\index.vue
-->
<template>
<div class="routerpage">
  <slot></slot>  
</div>
</template>
<script>
export default{
}
</script>
<style lang='scss' scoped>
  .routerpage{
    height: 100%;
    width: 100%;
    padding: 40px;
  }
</style>
