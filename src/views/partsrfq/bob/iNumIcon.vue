<template>
  <div class="number-icon">
    <icon class="bg-icon" name="iconwenjianshuliangbeijing" symbol :style="`font-size:${size}`"></icon>
    <div class="num" :style="{fontSize:numSize}">{{num}}</div>
  </div>
</template>

<script>
import { icon } from 'rise'
export default {
  name:'iNumIcon',
  components:{
    icon
  },
  props:{
    num:{
      type:String,
      default:''
    },
    size:{
      type:String,
      default:'20px'
    },
    numSize:{
      type:String,
      default:'6px'
    },
  }
}
</script>

<style lang="scss">
.number-icon{
  .bg-icon{
    margin: auto;
    text-align: center;
    width:100%
  }
  .num{
    margin: auto;
    color:white;
    z-index: 2050;
    position: relative;
    text-align: center;
    bottom: 33px;
  }
}
</style>