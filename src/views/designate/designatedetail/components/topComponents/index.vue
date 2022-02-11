<!--
 * @Author: your name
 * @Date: 2021-04-22 12:17:27
 * @LastEditTime: 2022-02-11 16:55:09
 * @LastEditors: YoHo
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
      <!-- <span class="riz"><icon symbol class="rizhi" name="iconrizhiwuzi"></icon>日志</span> -->
      <iLoger
        :config="{
          module_obj_ae: logModuleName, 
          bizId_obj_ae: logBizIdKey, 
          queryParams:['bizId_obj_ae']}"
        credentials
        isPage
        isUser
        optionDicKey="LOG_OPERATION_TYPES"
				:optionDicKey2="optionDicKey2"
        class="margin-left20 margin-right10 " />
      <icon class="package" symbol name="icondatabaseweixuanzhong" color='#CAD9F8' style="font-size: 14px"></icon>
    </span>
  </div>
</template>
<script>
import { iNavMvp,icon } from 'rise'
import iLoger from 'rise/web/components/iLoger'
export default{
  components:{iNavMvp,icon,iLoger},
  props:{
    right:Boolean,
    lev:{type:Number,default:1},
    pageMenu:{type:Array,default:()=>[]},
    query:{type:Object,default:()=>{}},
    logModuleName: {type: String},
    logBizIdKey: {type: String},
    // 业务模块参数
    optionDicKey2: {type: String}
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