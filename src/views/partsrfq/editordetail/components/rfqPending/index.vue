<!--
* @author:shujie
* @Date: 2021-2-25 10:58:09
 * @LastEditors: Please set LastEditors
* @Description: RFQ待办事项
 -->
<template>
  <iTabsList type="border-card" @tab-click="handleTabClick">
    <el-tab-pane :label="item.label" v-for="item of tabList" :key="item.label">
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
        {label: '零件清单', component: 'partDetailList'},
        {label: 'BDL列表', component: 'BDL'},
        {label: '供应商评分', component: 'supplierScore'},
        {label: '模具预算申请', component: 'moldBudgetApplication'},
        {label: '技术交流会', component: 'technicalSeminar'},
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
