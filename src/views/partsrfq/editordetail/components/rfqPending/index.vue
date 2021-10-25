<!--
* @author:shujie
* @Date: 2021-2-25 10:58:09
 * @LastEditors: Please set LastEditors
* @Description: RFQ待办事项
 -->
<template>
  <iTabsList type="card" @tab-click="handleTabClick"  class="margin-top20">
    <el-tab-pane lazy :label="language(item.key,item.label)" v-for="item of tabList" :key="item.label" v-permisstion='item.permissionKey'>
      <component :is="item.component" v-if="activityTabIndex === item.index"/>
    </el-tab-pane>
  </iTabsList>
</template>

<script>
import {iTabsList} from "rise";
import partDetailList from "./components/partDetaiList";
import BDL from "./components/BDL";
import supplierScore from "./components/supplierScore";
import moldBudgetApplication from "./components/moldBudgetApplication";
import technicalSeminar from "./components/technicalSeminar";
// import inquiryManagement from 'front-bidding/src/views/manage/bidding/project/inquiry';
export default {
  components: {
    iTabsList,
    partDetailList,
    BDL,
    supplierScore,
    moldBudgetApplication,
    technicalSeminar,
    // inquiryManagement
  },
  data() {
    return {
      activityTabIndex: '0',
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
      ]
    };
  },
  methods: {
    handleTabClick(target) {
      this.activityTabIndex = target.index
    },
    updateTabs(parmras){
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
