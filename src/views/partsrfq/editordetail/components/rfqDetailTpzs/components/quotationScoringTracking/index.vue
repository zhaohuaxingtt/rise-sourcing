<!--
 * @Author: yuszhou
 * @Date: 2021-05-25 15:32:38
 * @LastEditTime: 2021-05-25 22:04:52
 * @LastEditors: Please set LastEditors
 * @Description: 报价评分跟踪
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringTracking\index.vue
-->
<template>
  <div class="timeline">
      <div class="topline">
        <span class="margin-right20">整体任务进度: <icon style="font-size:20px;position:relative;top:2px;" symbol name="iconhuangdeng"></icon></span>
        <span>整车进度风险: <icon symbol style="font-size:20px;position:relative;top:2px;" name="iconbaojiafenxi-zhengchejindu-hong"></icon></span>
      </div>
      <timeline :timeList='timeList'></timeline>
  </div>
</template>
<script>
import timeline from './components/timeline'
import {icon} from 'rise'
import {timeList} from './components/data'
export default{
  components:{timeline,icon},
  data(){
    return {
      timeList:timeList
    }
  }
}
</script>
<style lang='scss' scoped>
  .timeline{
    .topline{
      span{
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>