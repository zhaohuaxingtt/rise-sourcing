<!--
 * @Author: yuszhou
 * @Date: 2021-05-25 16:11:34
 * @LastEditTime: 2021-05-25 22:40:33
 * @LastEditors: Please set LastEditors
 * @Description: timeline
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringTracking\components\timeline.vue
-->
<template>
  <div class="timeLine">
    <div v-for='(items,index) in timeList' :key='index' class="lineitems">
      <p class="itemsa">
        <span v-if='items.week % 2 != 0'>
          cw{{items.week}}
        </span>
        <span v-else style="display:inline-block;height:20px;"></span>
      </p>
      <p class="itemsb"></p>
      <p class="itemsc" :style='{top:"40px"}' v-if='items.name'>
        <span><icon symbol :name='"iconbaojiapingfengenzong-jiedian-hong"' class="margin-right5"></icon>{{items.name}}</span>
        <span>2021Cw{{items.week}}</span>
      </p>
    </div>
  </div>
</template>
<script>
import {icon} from 'rise'
export default{
  components:{icon},
  props:{
    timeList:{
      type:Array,
      default:()=>[]
    }
  }
}
</script>
<style lang='scss' scoped>
  .timeLine{
    min-height:180px;
    overflow: auto;
    margin-top: 30px;
    white-space: nowrap;
    .lineitems{
      display: inline-block;
      margin-right: 2px;
      cursor: pointer;
      position: relative;
      &:hover{
        opacity: 0.9;
      }
      .itemsa{
        font-size: 14px;
        color: #5F6F8F;
        margin-bottom:5px;
      }
      .itemsb{
        border-radius: 3px;
        width: 67px;
        height: 15px;
        background: #457BF4;
      }
      .itemsc{
        top: 50px;
        position: absolute;
        span{
          display: block;
          &:nth-child(1){
            font-weight: bold;
          }
          &:nth-child(2){
            margin-left: 15px;
          }
        }
      }
    }
  }
</style>