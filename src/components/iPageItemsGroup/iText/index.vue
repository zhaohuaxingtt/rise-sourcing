<!--
 * @Author: yuszhou
 * @Date: 2021-03-02 14:23:15
 * @LastEditTime: 2021-04-03 11:05:19
 * @LastEditors: Please set LastEditors
 * @Description: 作为当前组件的配套组合，适应不需要编辑的元素。
 * @FilePath: \rise\src\components\iPageItemsGroup\iText\index.vue
-->
<template>
  <div class="itext">
     <el-tooltip v-if='tooltip' effect='light' :content='$slots.default'>
       <span><slot></slot></span>
     </el-tooltip>
    <span class="child" v-else>
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default{
  data(){
    return {tooltip:false}
  },
  mounted(){
    this.$nextTick(()=>{
        let parentWidth =  this.$el.clientWidth
        let childWidth =  this.$el.querySelector('.child').offsetWidth
        if(childWidth > parentWidth) this.tooltip = true
    })
  }
}
</script>
<style lang='scss' scoped>
  .itext{
    width: 100%;
    font-size: 16px;
    background-color: #F8F8FA;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border-radius: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>