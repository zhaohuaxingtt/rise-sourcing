<!--
 * @Author: Luoshuang
 * @Date: 2021-07-29 10:35:52
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-26 13:50:25
 * @Description: 请选择车型项目
 * @FilePath: \front-web\src\views\project\components\empty\carEmpty.vue
-->

<template>
  <div style="display:flex;align-items:center;justify-content:center;padding:30px 0;" :style="`flex-direction:${isColumn?'column':'row'}`">
    <img src="../../../../assets/images/default2.png" />
    <span style="font-size:23px;color:rgba(107, 121, 149, 0.56);" :style="`margin-left:${isColumn?'0':'50px'};margin-top:${isColumn?'20px':'0'}`">{{language('QINGXUANZECHEXINGXIANGMU', '请选择车型项目')}}</span>
  </div>
</template>

<script>
export default {
  props: {
    isColumn: {type:Boolean,default:false}
  }
}
</script>

<style lang="scss" scoped>

</style>