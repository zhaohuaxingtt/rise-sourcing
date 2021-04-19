<!--
 * @Author: yuszhou
 * @Date: 2021-03-02 14:23:15
 * @LastEditTime: 2021-04-15 17:45:31
 * @LastEditors: Please set LastEditors
 * @Description: 作为当前组件的配套组合，适应不需要编辑的元素。
 * @FilePath: \rise\src\components\iPageItemsGroup\iText\index.vue
-->
<template>
  <div class="itext">
    <span class="child">
      <el-tooltip v-if='tooltip || forceTooltip' effect='light' :content='tooltipContent ? tooltipContent : $slots.default'><span><slot></slot></span></el-tooltip>
      <slot v-else></slot>
    </span>
  </div>
</template>
<script>
export default{
  props: {
    forceTooltip: {
      type: Boolean
    },
    tooltipContent: {
      type: String
    }
  },
  data(){
    return {tooltip:false}
  },
  mounted(){
    this.$nextTick(()=>{
      //保证获取到的值是已经填入后的元素宽度   由于默认初始化的时候已经将数据展示出来，setTimeout只是做一个文字替换.
      setTimeout(() => {
        let parentWidth =  this.$el.clientWidth
        let childWidth =  this.$el.querySelector('.child').offsetWidth
        if(childWidth > parentWidth) {this.tooltip = true} else {this.tooltip = false} 
      }, 100);
    })
  }
}
</script>
<style lang='scss' scoped>
  .itext{
    width: 100%;
    font-size: 14px;
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