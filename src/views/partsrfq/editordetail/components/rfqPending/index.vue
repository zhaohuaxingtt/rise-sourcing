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
        <component :ref='item.component' :key='hashCode' :is="item.component" v-if="activityTabIndex === item.index" @jump='jump' :todoObj="todoObj"/>
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
import { partProjTypes } from "@/config"

export default {
  components: {
    iTabsList,
    partDetailList,
    BDL,
    Inquiry,
    moldBudgetApplication,
    technicalSeminar,
    inquiryManagement,
    toDoList
  },
  props:{
    activityTabIndex:{
      type:String,
      default:'0'
    },
    todoObj:{
      type: Object,
      default:()=>{return {}}
    },
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
          permissionKey: 'PARTSRFQ_EDITORDETAIL_PARTDETAILIST_INDEXPAGE|零件清单',
          key: 'LK_LINGJIANQINGDAN'
        },
        {
          index: '1',
          label: 'BDL',
          component: 'BDL',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQPENDING_INDEXPAGE|BDL列表',
          key: 'LK_BDLLIEBIAO'
        },
        {
          index: '2',
          label: '轮次管理',  // 询价管理更名为轮次管理
          component: 'inquiryManagement',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQPENDING_INQUIRYMANAGEMENT_INDEXPAGE|轮次管理',
          key: 'LK_LUNCIGUANLI'
        },
        {
          index: '3',
          label: '询价信息',
          component: 'Inquiry',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_PARTSCORING_INDEXPAGE|供应商评分',
          key: 'LK_XUNJIAXINXI'
        },
        {
          index: '4',
          label: '待办任务',
          component: 'toDoList',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_PARTSCORING_INDEXPAGE|待办任务',
          key: 'LK_DAIBANRENWU'
        }
      ]
    };
  },
  computed:{
    showTab: function(){
      return index => {
        if(index <= 4) {
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
    tabs() {
      if (Array.isArray(this.baseInfo.partProjectType) && (this.baseInfo.partProjectType[0] === partProjTypes.PEIJIAN)) return this.tabList.filter(item => item.index != 3)
      return this.tabList
    }
  },
  created(){
    setTimeout(() => {
      this.registerFn(this.updateTabs)
    }, 1000);
  },
  methods: {
    jump(r){
      window.open(process.env.VUE_APP_ONLINEBIDDING + (r.roundType == "02"?`bidding/open/${r.id}`:`bidding/competition/base/${r.id}`),'_blank')
    },
    handleTabClick(target) {
      this.activityTabIndex = target.index
    },
    updateTabs(){
      this.hashCode = Math.random() * 10000000000
    }
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
  }
</style>
