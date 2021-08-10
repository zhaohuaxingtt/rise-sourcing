<!--
 * @Author: yuszhou
 * @Date: 2021-05-25 16:11:34
 * @LastEditTime: 2021-08-09 15:49:14
 * @LastEditors: Please set LastEditors
 * @Description: timeline
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringTracking\components\timeline.vue
-->
<template>
  <div class="timeLine" :style="{paddingTop:paddingTop,paddingBottom:paddingBottom}">
    <div v-for='(items,index) in timeList' :key='index' class="lineitems">
      <p class="itemsa">
        <span v-if="items.active && items.doneWeek">
          {{items.doneYear}}KW{{items.doneWeek}}
        </span>
        <!-- <span v-else style="display:inline-block;height:13px;"></span> -->
      </p>
      <p :class="{itemsb:true,active:items.active, delay:items.delay, long: items.long}"></p>
      <template>
        <p class="itemsc" :class="{delay:items.delay, active:items.active,}">
          <span class="tit"><icon symbol :name='iconList_all_times["a"+(items.active ? (items.delay ? 4 : 5) : 0)].icon' class="margin-right5"></icon>{{language(items.key,items.name)}}</span>
          <span>{{year}}KW{{items.week}}</span>
        </p>
      </template>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
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
  computed: {
    year() {
      return moment().format('YYYY')
    }
  },
  watch:{
    'timeList':function(){this.topPaddingBottomPadding()}
  },
  data(){
    return {
      iconList_all_times,
      paddingTop:'40px',
      paddingBottom:'60px'
    }
  },
  methods:{
    /**
     * @description: 根据每周最大值。拿到上下的最大间距
     * @param {*}
     * @return {*}
     */
    topPaddingBottomPadding(){
      this.paddingBottom = JSON.parse(JSON.stringify(this.timeList)).filter((i,d)=>d%2==0).sort((a,b)=>b.oneWeekList.length - a.oneWeekList.length)[0].oneWeekList.length * 45 + 'px'
      this.paddingTop = JSON.parse(JSON.stringify(this.timeList)).filter((i,d)=>!(d%2==0)).sort((a,b)=>b.oneWeekList.length - a.oneWeekList.length)[0].oneWeekList.length * 45 + 'px'
    }
  }
}
</script>
<style lang='scss' scoped>
  .timeLine{
    margin-top: 30px;
    white-space: nowrap;
    // overflow-x: auto;
    // overflow-y: hidden;
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
        color: #5F6879;
        // margin-bottom:5px;
        position: absolute;
        top: -30px;
      }
      .itemsb{
        border-radius: 3px;
        width: 136px;
        height: 13px;
        background: #CDD4E2;
        &.long {
          width: 225px;
        }
        &.active {
          background: #6192F0;
        }
        &.delay {
          background: #FAB738;
        }
      }
      
      .itemsc{
        top: 20px;
        position: absolute;
        &.active {
          span {
            &.tit {
              color: #0D2451;
            }
          }
        }
        span{
          display: block;
          color: rgb(205,212,226);
          &:nth-child(2){
            margin-left: 15px;
          }
        }
      }
    }
  }
</style>