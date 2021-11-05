<!--
 * @Author: yuszhou
 * @Date: 2021-05-25 15:32:38
 * @LastEditTime: 2021-09-24 14:43:21
 * @LastEditors: Please set LastEditors
 * @Description: 报价评分跟踪
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringTracking\index.vue
-->
<template>
  <div class="timeline">
      <div class="topline" v-permission="RFQ_DETAIL_TIPS_BAOJIAFENXI_RENWUJINDU">
        <span class="margin-right20">整体任务进度: 
          <!-- <el-tooltip placement="right" effect="light">
          <icon symbol style="font-size:20px;position:relative;top:2px;" :color='"#eff9fd"' :name="iconList_all_times['a'+allJdu].icon"></icon>
            <template slot='content'>
              <dalyWeeks :daliyTime='allJdu' ></dalyWeeks>
            </template>
          </el-tooltip> -->
           <icon symbol style="font-size:20px;position:relative;top:2px;" :color='"#eff9fd"' :name="iconList_all_times['a'+allJdu].icon"></icon>
          </span>
        <span>整车进度风险: <el-tooltip placement="right" effect="light">
          <icon symbol style="font-size:20px;position:relative;top:2px;" :name="iconList_car['a'+daliyTime].icon"></icon>
            <template slot='content'>
              <dalyWeeks :daliyTime='daliyTime'></dalyWeeks>
            </template>
          </el-tooltip>
        </span>
      </div>
      <timeline v-if='timeListdata.length>0' v-permission="RFQ_DETAIL_TIPS_BAOJIAFENXI_RENWUJINDU" :timeList='timeListdata'></timeline>
      <div v-else class="noData">当前暂无进度数据</div>
      <tabelData :tableTile='tableTile' :tableData='tableDatas'></tabelData>
  </div>
</template>
<script>
import timeline from './components/timeline'
import {icon,iMessage} from 'rise'
import {tableTile,tableDatas,iconList_car,iconList_all_times,buildTitleTabel,buildTableData} from './components/data'
import dalyWeeks from './components/dalyWeeks'
import tabelData from './components/tableList'
import {getTimeLine,negoScoreReport} from '@/api/partsrfq/editordetail'
export default{
  components:{timeline,icon,dalyWeeks,tabelData},
  data(){
    return {
      timeListdata:[],
      tableTile:tableTile,
      tableDatas:tableDatas,
      daliyTime:1,
      iconList_car:iconList_car,
      iconList_all_times:iconList_all_times,
      allJdu:1
    }
  },
  created(){
    this.getTimeLine(1,this.$route.query.id);
    this.negoScoreReport();
  },
  methods:{
    /**
     * @description: 获取有效状态周。 
     * @param {*}
     * @return {*}
     */
    getTypeWeek(maps){
      // eslint-disable-next-line no-undef
      const currentWenk = Number(new moment().format('W')) + 1
      // eslint-disable-next-line no-undef
      const currentYear = new moment().format('yyyy')
      if(currentYear < maps.planYear) return false
      return maps.planPeriod <= currentWenk
    },
    /**
     * @description: 判断当前年是不是跨年。 
     * @param {*} year
     * @return {*}
     */
    getYear(yearQuerys){
      let number = 0
      let y = yearQuerys.donePeriod || yearQuerys.planPeriod
      // eslint-disable-next-line no-undef
      const year = new moment().format('YYYY')
      if(year < yearQuerys.doneYear){
        number = 52 + y
      }else {
        number = y < 24? (24-y) + y : y + (52 - y) 
      }
      return number
    },
    negoScoreReport(){
      negoScoreReport(this.$route.query.id).then(res=>{
        if(res.code == 200){
          this.tableTile = buildTitleTabel(res.data)
          this.tableDatas = buildTableData(res.data)
        }
      }).catch(err=>{
        iMessage.warn(err.desZh)
      })
    },
    /**
     * @description: 获取时间轴接口 
     * @param {*}
     * @return {*}
     */
    getTimeLine(qutaitonId,rfqId){
      getTimeLine(qutaitonId,rfqId).then(res=>{
        if(res.data){
          this.daliyTime = res.data.wholeProgressRisk || 0 //整车进度风险
          this.allJdu = res.data.wholeTaskProgress || 0 //整体任务进度
          this.timeListdata = this.translateTimeLine(res.data.rfqTimeAxisNodeList)
        }
      }).catch(err=>{
        iMessage.error(err.desZh)
      })
    },
    /**
     * @description: //progressTypeDesc => 当前周完成的内容名称
     *               //taskStatus => 当前周完成状态
     *               //doneYear => 当前完成的年份
     *               //doneDay => 处于当前周的第几天完成
     *               //oneWeekList => 当前周是否存在多个完成节点
     * @param {*} list
     * @return {*}
     */
    translateTimeLine(list){
      try {
        // eslint-disable-next-line no-debugger
        if(!list.length) throw new Error('current data has error, pleace check your data')
        const copeList = []
        list.forEach(element => {
          if(!element.rfqTimeAxisProgressVOList){
            element.rfqTimeAxisProgressVOList = []
          }
          copeList.push(element)
        });
        return copeList
      } catch (error) {
         return []
      }
    },
  }
}
</script>
<style lang='scss' scoped>
  .noData{
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid ghostwhite;
    padding: 20px;
    text-align: center;
  }
  .timeline{
    .topline{
      span{
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>