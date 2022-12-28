<!--
* @author:shujie
* @Date: 2021-2-25 10:58:09
 * @LastEditors: YoHo
* @Description: RFQ待办事项
 -->
<template>
  <iTabsList type="card" @tab-click="handleTabClick" v-model="activityTabIndex"  class="margin-top20 cardss">
    <template v-for="item of tabs">
      <el-tab-pane :label="language(item.key,item.label)" :key="item.label" :name='item.index' v-if='showTab(item.index)' v-permission.dynamic.auto='item.permissionKey'>
        <component class="componentClass" :ref='item.component' :key='hashCode' :rfqInfoData="rfqInfoData" :is="item.component" v-if="activityTabIndex === item.index" @jump='jump' :todoObj="todoObj" :baseInfo="baseInfo"/>
      </el-tab-pane>
    </template>
  </iTabsList>
</template>

<script>
import {iTabsList} from "rise";
import partDetailList from "./components/partDetaiList";
import toDoList from "./components/toDoList";
import BDL from "./components/BDL";
import Inquiry from "./components/Inquiry";
import moldBudgetApplication from "./components/moldBudgetApplication";
import technicalSeminar from "./components/technicalSeminar";
import inquiryManagement from '@/views/biddingManage/bidding/project/inquiry';

import quotationAnalysis from '@/views/partsrfq/editordetail/components/rfqDetailTpzs/quotationAnalysis';
import analysisTools from '@/views/partsrfq/editordetail/components/rfqDetailTpzs/analysisTools';
import basicNegotiation from '@/views/partsrfq/editordetail/components/rfqDetailTpzs/basicNegotiation';
// import { partProjTypes } from "@/config"

export default {
  components: {
    iTabsList,
    partDetailList,
    BDL,
    Inquiry,
    moldBudgetApplication,
    technicalSeminar,
    inquiryManagement,
    toDoList,

    quotationAnalysis,
    analysisTools,
    basicNegotiation
  },
  props:{
    canRegiste:{
      type: Boolean,
      default: false
    },
    activityTabIndex:{
      type:String,
      default:'0'
    },
    todoObj:{
      type: Object,
      default:()=>{return {}}
    },
    isPosition:{
      type:Boolean,
      default:false
    },
    rfqInfoData: { type: Object },
  },
  inject:['getbaseInfoData','registerFn'],
  data() {
    return {
      hashCode:'12099923883',
      tabList: [
        {
          index: '0',
          label: '零件清单',
          component: 'partDetailList',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_PARTDETAILIST_INDEXPAGE',
          key: 'LK_LINGJIANQINGDAN'
        },
        {
          index: '1',
          label: 'BDL',
          component: 'BDL',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQPENDING_INDEXPAGE',
          key: 'LK_BDLLIEBIAO'
        },
        {
          index: '2',
          label: '轮次管理',  // 询价管理更名为轮次管理
          component: 'inquiryManagement',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQPENDING_INQUIRYMANAGEMENT_INDEXPAGE',
          key: 'LK_LUNCIGUANLI'
        },
        {
          index: '3',
          label: '询价信息',
          component: 'Inquiry',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQPENDING_INQUIRY',
          key: 'LK_XUNJIAXINXI'
        },
        {
          index: '4',
          label: '待办任务',
          component: 'toDoList',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQPENDING_TODOLIST',
          key: 'LK_DAIBANRENWU'
        },
        {
          index: '5',
          label: '报价分析',
          component: 'quotationAnalysis',
          permissionKey: 'RFQ_DETAIL_TIPS_ZHUANYEFENXIGONGJU',
          key: 'BAOJIAFENXI'
        },
        {
          index: '6',
          label: '专项分析工具',
          component: 'analysisTools',
          permissionKey: 'RFQ_DETAIL_TIPS_ZHUANYEFENXIGONGJU',
          key: 'TPZS.ZXFXGJ'
        },
        {
          index: '7',
          label: '谈判基本信息',
          component: 'basicNegotiation',
          permissionKey: 'RFQ_DETAIL_TIPS_TANPANJIBENXINXI',
          key: 'TPZS.TPJBXX'
        }
      ],
    };
  },
  computed:{
    showTab: function(){
      return index => {
        if(index != 2) {
          return true
        }else{
          if(this.getbaseInfoData().currentRounds > 0){
            return true
          }else {
            return false
          }
        }
      }
    },
    baseInfo() {
      return this.getbaseInfoData()
    },
    whiteBtnList() {
      return this.$store.state.permission.whiteBtnList || {}
    },
    tabs() {
      let newTable = []
       newTable = this.tabList.filter(e=> this.whiteBtnList[e.permissionKey])
      if(this.isPosition == false) {
        newTable = this.tabList.filter(e=>{
          return (e.index != '2' && e.index != '4')
          }
        )
      }

      console.log(newTable)
      return newTable
      // if (Array.isArray(this.baseInfo.partProjectType) && (this.baseInfo.partProjectType[0] === partProjTypes.PEIJIAN)) return this.tabList.filter(item => item.index != 3)
      // return this.tabList
    }
  },
  // 推迟事件注册时间(首次获取数据之后再注册)，
  watch:{
    rfqInfoData(val) {
      this.rfqInfoData = val;
      console.log(val);
    },
    canRegiste(val){
      if(val){
        this.registerFn(this.updateTabs)
      }
    },
    activityTabIndex(val) {
      const item = this.tabs.find(e=>e.index === val)
      if(!item) {
        if(this.tabs && this.tabs.length) {
        this.activityTabIndex = this.tabs[0].index
        }
      }
    }
  },
  // create(){
  //   setTimeout(() => {
  //     this.registerFn(this.updateTabs)
  //   }, 1000);
  // },
  methods: {
    jump(r){
      window.open(process.env.VUE_APP_ONLINEBIDDING + (r.roundType == "02"?`bidding/open/${r.id}`:`bidding/competition/base/${r.id}`),'_blank')
    },
    handleTabClick(target) {
      this.activityTabIndex = target.name
    },
    updateTabs(){
      this.hashCode = Math.random() * 10000000000
    },
  }
};
</script>

<style lang="scss" scoped>
   .cardss{
    ::v-deep.el-switch{
      .is-active{
        background-color: transparent!important;
      }
    }
    
  ::v-deep .cardHeader {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 20px 0;
    .tishi {
      display: inline-flex;
      align-items: center;
    }
    .tishi-icon {
      font-size: 18px;
      margin: 0 15px;
    }

    .status{
      font-size: 14px !important;
    }
    .danger {
      color: #f5222d;
    }
    .warning {
      color: #fa8c16;
    }
    .success {
      color: #389e0d;
    }
    .button-box {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
    }
    .card-icon {
      font-size: 18px;
      margin: 0 20px;
    }
    .rotate {
      transform: rotate(180deg);
    }
  }

  .componentClass {
    margin-bottom: 70px;
  }
  }
</style>
