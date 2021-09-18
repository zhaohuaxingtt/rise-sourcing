<!--
 * @Author: yuszhou
 * @Date: 2021-05-25 16:11:34
 * @LastEditTime: 2021-09-18 14:07:13
 * @LastEditors: Please set LastEditors
 * @Description: timeline
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringTracking\components\timeline.vue
-->
<template>
  <div class="timeLine" :style="{paddingTop:paddingTop,paddingBottom:paddingBottom}">
    <div v-for='(items,index) in timeList' :key='index' class="lineitems">
      <p class="itemsa">
        <span v-if='items.planPeriod % 2 != 0'>
          CW{{items.planPeriod}}
        </span>
        <span v-else style="display:inline-block;height:13px;"></span>
      </p>
      <p :class="{itemsb:true,active:items.active,width:'70px'}"></p>
      <template>
        <p class="itemsc" :style='{top:`${(index%2==0?"":"-")}40px`,left:(items.doneDay-1) * 9 + "px"}' v-if='items.progressTypeDesc'>
          <span><icon symbol :name='iconList_all_times["a"+items.taskStatus].icon' class="margin-right5"></icon>{{items.progressTypeDesc}}</span>
          <span v-if='items.planYear'>计划：{{items.planYear}}CW{{items.planPeriod}}</span>
          <span v-if='items.doneYear'>完成：{{items.doneYear}}CW{{items.donePeriod}}</span>
          <span v-else>完成：-</span>
        </p>
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
  watch:{
    'timeList':function(){this.topPaddingBottomPadding()}
  },
  data(){
    return {
      iconList_all_times:iconList_all_times,
      paddingTop:'40px',
      paddingBottom:'40px'
    }
  },
  methods:{
    /**
     * @description: 根据每周最大值。拿到上下的最大间距
     * @param {*}
     * @return {*}
     */
    topPaddingBottomPadding(){
     try {
        this.paddingBottom = JSON.parse(JSON.stringify(this.timeList)).filter((i,d)=>d%2==0).sort((a,b)=>b.oneWeekList.length - a.oneWeekList.length)[0].oneWeekList.length * 45 + 'px'
        this.paddingTop = JSON.parse(JSON.stringify(this.timeList)).filter((i,d)=>!(d%2==0)).sort((a,b)=>b.oneWeekList.length - a.oneWeekList.length)[0].oneWeekList.length * 45 + 'px'
     } catch (error) {
       this.paddingBottom = '40px';
       this.paddingTop = '0px';
     }
    }
  }
}
</script>
<style lang='scss' scoped>
  .timeLine{
    overflow-x: auto;
    margin-top: 30px;
    white-space: nowrap;
    overflow-y: hidden;
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