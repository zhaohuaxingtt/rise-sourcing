<!--
 * @Author: your name
 * @Date: 2021-04-22 12:17:27
 * @LastEditTime: 2021-05-24 15:58:26
 * @LastEditors: Luoshuang
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\designate\designatedetail\components\topComponents\index.vue
-->
<template>
  <div class="topcomponents">
    <slot name='left'></slot>
    <slot name='items'>
      <iNavMvp :query='query' lang :class="[{'padding':right}]" routerPage :lev='lev' :list='pageMenu' :right='right'></iNavMvp>
    </slot>  
    <span class="right-cc">
      <span class="riz"><icon symbol class="rizhi" name="iconrizhiwuzi"></icon>日志</span>
      <icon class="package" symbol name="icondatabaseweixuanzhong" color='#CAD9F8'></icon>
    </span>
  </div>
</template>
<script>
import { iNavMvp,icon } from 'rise'
export default{
  components:{iNavMvp,icon},
  props:{
    right:Boolean,
    lev:{type:Number,default:1},
    pageMenu:{type:Array,default:()=>[]},
    query:{type:Object,default:()=>{}}
  }
}
</script>
<style lang='scss' scoped>
   .padding{
     padding-right: 150px;
   }
  .topcomponents{
    position: relative;
    margin-bottom: 20px;
    .right-cc{
      position: absolute;
      right: 0px;
      //left: 400px;
      top: 1px;
      display: flex;
      align-items: center;
      .riz{
        font-size: 16px;
        color: $color-blue;
        font-weight: bold;
        margin-right: 30px;
        cursor: pointer;
        .rizhi{
          font-size: 20px;
          margin-right: 5px;
        }
      }
      .package{
        cursor: pointer;
        font-size: 28px;
      }
    }
  }
</style>