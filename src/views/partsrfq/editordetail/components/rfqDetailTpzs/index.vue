<!--
 * @Author: yuszhou
 * @Date: 2021-05-25 13:01:23
 * @LastEditors: zbin
 * @Description: 报价助手界面
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\index.vue
-->
<template>
  <iTabsList v-model="activityTabIndex" @tab-click="handleTabClick" type="card" slot="components" class='margin-top20'>
    <el-tab-pane lazy name="one" label="报价分析">
      <template>
         <!--------------------报价评分跟踪----------------------------------------->
         <iCard title="报价与评分跟踪" @handleCollapse='handleCollapse($event,"1")' collapse>
           <quotationScoringTracking v-if='cardShow.find(items=>items.key == "1").show'></quotationScoringTracking>
         </iCard>
         <!--------------------报价分析汇总-零件----------------------------------------->
         <iCard title="报价分析汇总-零件" @handleCollapse='handleCollapse($event,"2")' collapse class="margin-top20" :defalutCollVal='cardShow.find(items=>items.key == "2").show'>
           <quotationScoringHZ v-if='cardShow.find(items=>items.key == "2").show'></quotationScoringHZ>
         </iCard>
          <!--------------------报价分析汇总-模具----------------------------------------->
         <quotationScoringMj v-if='cardShow.find(items=>items.key == "3").show' class="margin-top20" titleKey='LK_BJFXHZMJ' @handleCollapse='handleCollapse($event,"3")'></quotationScoringMj>
         <iCard  title="报价分析汇总-模具" v-else class="margin-top20" @handleCollapse='handleCollapse($event,"3")' collapse :defalutCollVal='false'></iCard>
          <!--------------------报价分析汇总-报价趋势----------------------------------------->
         <quotationScoringEcartsCard v-if='cardShow.find(items=>items.key == "4").show'></quotationScoringEcartsCard>
         <iCard title="报价趋势" v-else class="margin-top20" @handleCollapse='handleCollapse($event,"4")' collapse :defalutCollVal='false'></iCard>
          <!--------------------报价分析汇总-业务分配模拟----------------------------------------->
         <buMonitor @handleCollapse='handleCollapse($event,"5")' :collapse='true' v-if='cardShow.find(items=>items.key == "5").show' class="margin-top20"></buMonitor>
         <iCard title="业务分配模拟" v-else class="margin-top20" @handleCollapse='handleCollapse($event,"5")' collapse :defalutCollVal='false'></iCard>
      </template>
    </el-tab-pane>
    <el-tab-pane lazy label="专项分析工具">
      <gather />
    </el-tab-pane>
    <el-tab-pane lazy label="谈判基本信息">
      <negotiateBasicInfor></negotiateBasicInfor>
    </el-tab-pane>
  </iTabsList>
</template>
<script>
import {iTabsList,iCard} from 'rise'
import quotationScoringTracking from './components/quotationScoringTracking'
import quotationScoringMj from './components/quotationScoringMj'
import quotationScoringHZ from './components/quotationScoringHz'
import quotationScoringEcartsCard from './components/quotationScoringEcartsCard'
import buMonitor from './components/qutaionScoringBusses'
import {icardData} from './components/data'
import gather from "@/views/partsrfq/externalAccessToAnalysisTools/negotiationAssistant/index.vue";
import negotiateBasicInfor from "./components/negotiateBasicInfor";


export default{
  components:{iTabsList,iCard,quotationScoringTracking,quotationScoringMj,quotationScoringHZ,quotationScoringEcartsCard,buMonitor, gather, negotiateBasicInfor},
  data(){
    return {
      cardShow:icardData
    }
  },
  methods:{
    /**
     * @description: 报价折叠
     * @param {*} e
     * @param {*} key
     * @return {*}
     */



    handleCollapse(e,key){
      this.cardShow.forEach(i=>{
        if(i.key == key){
          i.show = e
        }
      })
    },
    //点击返回
    clickReturn() {

    },
    //点击报告清单
    clickReport() {

    }
  }
}
</script>
<style lang='scss' scoped>
.el-tabs--card {
  position: relative;
}
</style>
