<!--
* @author:shujie
* @Date: 2021-2-25 10:58:09
 * @LastEditors: Please set LastEditors
* @Description: RFQ待办事项
 -->
<template>
  <iTabsList type="card" @tab-click="handleTabClick" v-model="activityTabIndex"  class="margin-top20 cardss">
    <template v-for="item of tabList">
      <el-tab-pane :label="language(item.key,item.label)" :key="item.label" :name='item.index' v-if='showTab(item.index)' v-permisstion='item.permissionKey'>
        <component :ref='item.component' :key='hashCode' :is="item.component" v-if="activityTabIndex === item.index" @jump='jump'/>
      </el-tab-pane>
    </template>
  </iTabsList>
</template>

<script>
import {iTabsList} from "rise";
import partDetailList from "./components/partDetaiList";
import BDL from "./components/BDL";
import supplierScore from "./components/supplierScore";
import moldBudgetApplication from "./components/moldBudgetApplication";
import technicalSeminar from "./components/technicalSeminar";
import inquiryManagement from '@/views/biddingManage/bidding/project/inquiry';
export default {
  components: {
    iTabsList,
    partDetailList,
    BDL,
    supplierScore,
    moldBudgetApplication,
    technicalSeminar,
    inquiryManagement
  },
  props:{
    activityTabIndex:{
      type:String,
      default:'0'
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
          permissionKey: 'PARTSRFQ_EDITORDETAIL_PARTDETAILIST_INDEXPAGE',
          key: 'LK_LINGJIANQINGDAN'
        },
        {
          index: '1',
          label: 'BDL列表',
          component: 'BDL',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQPENDING_INDEXPAGE',
          key: 'LK_BDLLIEBIAO'
        },
        {
          index: '2',
          label: '供应商评分',
          component: 'supplierScore',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_PARTSCORING_INDEXPAGE',
          key: 'LK_GONGYINGSHANGPINGFEN'
        },
        {
          index: '3',
          label: '模具预算申请',
          component: 'moldBudgetApplication',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQPENDING_MOLDBUDGETAPPLICATION_INDEXPAGE',
          key: 'LK_MOJUYUSUANSHENQING'
        },
        {
          index: '4',
          label: '技术交底会',
          component: 'technicalSeminar',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_BASICINFORMATIONMEETING_INDEXPAGE',
          key: 'LK_JISHUJIAOLIUHUI'
        },
        {
          index: '5',
          label: '询价管理',
          component: 'inquiryManagement',
          permissionKey: 'PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_BASICINFORMATIONMEETING_INDEXPAGE',
          key: 'XUNJIAGUANLI'
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
