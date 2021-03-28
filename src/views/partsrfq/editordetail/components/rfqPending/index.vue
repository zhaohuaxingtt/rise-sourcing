<!--
* @author:shujie
* @Date: 2021-2-25 10:58:09
 * @LastEditors: Please set LastEditors
* @Description: RFQ待办事项
 -->
<template>
  <iTabsList type="border-card" @tab-click="handleTabClick">
    <el-tab-pane :label="item.label" v-for="item of tabList" :key="item.label" v-permisstion='item.permissionKey'>
      <component :is="item.component" v-if="activityTabLabel === item.label"/>
    </el-tab-pane>
  </iTabsList>
</template>

<script>
import {iTabsList} from "@/components";
import partDetailList from "./components/partDetaiList";
import BDL from "./components/BDL";
import supplierScore from "./components/supplierScore";
import moldBudgetApplication from "./components/moldBudgetApplication";
import technicalSeminar from "./components/technicalSeminar";

export default {
  components: {
    iTabsList,
    partDetailList,
    BDL,
    supplierScore,
    moldBudgetApplication,
    technicalSeminar
  },
  data() {
    return {
      activityTabLabel: '零件清单',
      tabList: [
        {label: '零件清单', component: 'partDetailList',permissionKey:'PARTSRFQ_EDITORDETAIL_PARTDETAILIST_INDEXPAGE'},
        {label: 'BDL列表', component: 'BDL',permissionKey:'PARTSRFQ_EDITORDETAIL_RFQPENDING_INDEXPAGE'},
        {label: '供应商评分', component: 'supplierScore',permissionKey:'PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_PARTSCORING_INDEXPAGE'},
        {label: '模具预算申请', component: 'moldBudgetApplication',permissionKey:'PARTSRFQ_EDITORDETAIL_RFQPENDING_MOLDBUDGETAPPLICATION_INDEXPAGE'},
        {label: '技术交流会', component: 'technicalSeminar',permissionKey:'PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_BASICINFORMATIONMEETING_INDEXPAGE'},
      ]
    };
  },
  methods: {
    handleTabClick(target) {
      this.activityTabLabel = target.label
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
