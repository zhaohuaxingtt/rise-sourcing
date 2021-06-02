<!--
 * @Author: yuszhou
 * @Date: 2021-05-25 16:11:34
 * @LastEditTime: 2021-06-02 14:21:13
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
        <span v-else style="display:inline-block;height:13px;"></span>
      </p>
      <p :class="{itemsb:true,active:items.active,width:'70px'}"></p>
      <template v-if='items.oneWeekList.length<=1'>
        <p class="itemsc" :style='{top:"40px",left:(items.doneDay-1) * 10 + "px"}' v-if='items.progressTypeDesc'>
          <span><icon symbol :name='iconList_all_times["a"+items.taskStatus].icon' class="margin-right5"></icon>{{items.progressTypeDesc}}</span>
          <span>{{items.doneYear}}Cw{{items.week}}</span>
        </p>
      </template>
      <template v-else>
        <template v-for="(itemss,indexs) in items.oneWeekList">
          <p class="itemsc" :style='{top:`${40*(indexs+1)}px`,left:(itemss.doneDay-1) * 10 + "px"}' v-if='itemss.progressTypeDesc' :key="indexs">
            <span><icon symbol :name='iconList_all_times["a"+itemss.taskStatus].icon' class="margin-right5"></icon>{{itemss.progressTypeDesc}}</span>
            <span>{{itemss.doneYear}}Cw{{itemss.donePeriod}}</span>
          </p>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import {icon} from 'rise'
import {iconList_all_times} from './data'
export default{
  components:{icon},
  props:{
    timeList:{
      type:Array,
      default:()=>[]
    }
  },
  data(){
    return {
      iconList_all_times:iconList_all_times
    }
  }
}
</script>
<style lang='scss' scoped>
  .timeLine{
    min-height:150px;
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
        height: 13px;
        background: #CDD4E2;
      }
      .active{
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