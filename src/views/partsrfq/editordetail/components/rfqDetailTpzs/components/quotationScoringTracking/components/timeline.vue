<!--
 * @Author: yuszhou
 * @Date: 2021-05-25 16:11:34
 * @LastEditTime: 2022-02-21 14:25:57
 * @LastEditors: YoHo
 * @Description: timeline
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringTracking\components\timeline.vue
-->
<template>
  <div class="timeLine" :style="{paddingTop:paddingTop,paddingBottom:paddingBottom}">
    <div v-for='(items,index) in timeList' :key='index' class="lineitems" :style="{width:5*fontSize+'px'}">
      <p class="itemsa">
        <span v-if='items.planPeriod % 2 != 0'>
          <p>{{items.planYear}}CW{{items.planPeriod}}</p>
        </span>
        <span v-else style="display:inline-block;height:13px;"></span>
      </p>
      <p :class="{itemsb:true,active:items.active}" :style="{width:5*fontSize+'px'}"></p>
      <template v-if='items.rfqTimeAxisProgressVOList.length == 0'>
      </template>
      <template v-else>
        <template v-for="(itemss,indexs) in items.rfqTimeAxisProgressVOList">
          <p class="itemsc" :style='{top:`${(index%2==0?"":"-")+4.5 * fontSize *(indexs+1)}px`,left:((itemss.doneDay || 1)-1) * 8.8 + "px"}' v-if='itemss.progressTypeDesc' :key="indexs">
            <span><icon v-if='iconList_all_times["a"+itemss.taskStatus]' symbol :name='iconList_all_times["a"+itemss.taskStatus].icon' class="margin-right5"></icon>{{itemss.progressTypeDesc}}</span>
            <span v-if='itemss.planYear && itemss.progressTypeDesc !== "第一轮询价"'>计划:{{itemss.planYear}}CW{{itemss.planPeriod}}</span>
            <span v-if='itemss.doneYear' :class="'color'+itemss.taskStatus">完成:{{itemss.doneYear}}CW{{itemss.donePeriod}}</span>
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
      iconList_all_times:iconList_all_times,
      paddingTop:'0px',
      paddingBottom:'0px'
    }
  },
  computed:{
    fontSize(){
      return parseInt(document.getElementsByTagName('html')[0].style.fontSize)
    }
  },
  mounted(){
    this.renderTopBottom()
  },
  methods:{
    /**
     * @description: 根据每周最大值。拿到上下的最大间距
     * @param {*}
     * @return {*}
     */
    renderTopBottom(){
     try {
        this.paddingBottom = JSON.parse(JSON.stringify(this.timeList)).filter((i,d)=>d%2==0).sort((a,b)=>b.rfqTimeAxisProgressVOList.length - a.rfqTimeAxisProgressVOList.length)[0].rfqTimeAxisProgressVOList.length * 5 * (+this.fontSize + 3) + 'px'
        this.paddingTop = JSON.parse(JSON.stringify(this.timeList)).filter((i,d)=>!(d%2==0)).sort((a,b)=>b.rfqTimeAxisProgressVOList.length - a.rfqTimeAxisProgressVOList.length)[0].rfqTimeAxisProgressVOList.length * 4.5 * this.fontSize + 'px'
     } catch (error) {
       this.paddingBottom = '80px';
       this.paddingTop = '0px';
     }
    }
  }
}
</script>
<style lang='scss' scoped>
  .color0{
    color: black;
  }
  .color1{
    color: black;
  }
  .color2{
    color: green;
  }
  .color3{
    color: red;
  }
  .color4{
    color: orange;
  }
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
        span{
          p{
            text-align: center;
          }
        }
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
            margin-left: 17px;
          }
          &:nth-child(3){
            margin-left: 17px;
          }
        }
      }
    }
  }
</style>