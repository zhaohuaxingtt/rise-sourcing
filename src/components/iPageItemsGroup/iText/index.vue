<!--
 * @Author: yuszhou
 * @Date: 2021-03-02 14:23:15
 * @LastEditTime: 2021-03-02 14:28:59
 * @LastEditors: Please set LastEditors
 * @Description: 作为当前组件的配套组合，适应不需要编辑的元素。
 * @FilePath: \rise\src\components\iPageItemsGroup\iText\index.vue
-->
<template>
  <div class="itext">
    <slot></slot>
  </div>
</template>
<script>
export default{
}
</script>
<style lang='scss' scoped>
  .itext{
    font-size: 16px;
    background-color: #F8F8FA;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border-radius: 5px;
  }
</style>