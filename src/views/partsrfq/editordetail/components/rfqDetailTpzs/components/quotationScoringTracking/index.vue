<!--
 * @Author: yuszhou
 * @Date: 2021-05-25 15:32:38
 * @LastEditTime: 2021-05-31 16:28:12
 * @LastEditors: Please set LastEditors
 * @Description: 报价评分跟踪
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringTracking\index.vue
-->
<template>
  <div class="timeline">
      <div class="topline">
        <span class="margin-right20">整体任务进度: <icon style="font-size:20px;position:relative;top:2px;" symbol name="iconhuangdeng"></icon></span>
        <span>整车进度风险: <el-tooltip placement="right" effect="light">
          <icon symbol style="font-size:20px;position:relative;top:2px;" name="iconbaojiafenxi-zhengchejindu-hong"></icon>
            <template slot='content'>
              <dalyWeeks></dalyWeeks>
            </template>
          </el-tooltip>
        </span>
      </div>
      <timeline :timeList='timeList'></timeline>
      <tabelData :tableTile='tableTile' :tableData='tableDatas'></tabelData>
  </div>
</template>
<script>
import timeline from './components/timeline'
import {icon,iMessage} from 'rise'
import {timeList,tableTile,tableDatas} from './components/data'
import dalyWeeks from './components/dalyWeeks'
import tabelData from './components/tableList'
import {getTimeLine} from '@/api/partsrfq/editordetail'
export default{
  components:{timeline,icon,dalyWeeks,tabelData},
  data(){
    return {
      timeList:timeList,
      tableTile:tableTile,
      tableDatas:tableDatas
    }
  },
  created(){
    this.getTimeLine(1,this.$route.query.id)
  },
  methods:{
    /**
     * @description: 获取时间轴接口 
     * @param {*}
     * @return {*}
     */
    getTimeLine(qutaitonId,rfqId){
      getTimeLine(qutaitonId,rfqId).then(res=>{
        if(res.data){
          console.log(res.data)
        }
      }).catch(err=>{
        iMessage.error(err.desZh)
      })
    },
    translateTimeLine(){
      
    },
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