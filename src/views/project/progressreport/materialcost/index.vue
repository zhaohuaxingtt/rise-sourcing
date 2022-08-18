<!--
 * @Author: 
 * @Date: 2021-10-11 15:05:24
 * @LastEditors: 
 * @LastEditTime: 2022-08-03 14:05:25
 * @Description: 项目管理-项目进度报告-材料成本报告
 * @FilePath: \front-web\src\views\project\progressreport\materialcost\index.vue
-->

<template>
  <iPage class="partprogress">
    <iTabsList type="card" @tab-click="tabChange" :before-leave="tabLeaveBefore" v-model="currentTab">
        <el-tab-pane lazy :label="$t('CAILIAOCHENGBENBAOGAO')" :name="'overview'" >
          <materialCostReport ref="overviewChart"  />
        </el-tab-pane>
        <el-tab-pane lazy :label="$t('材料成本维护')" :name="'detail'" >
          <materilaCostMaintenance ref="detailChart" />
        </el-tab-pane>
    </iTabsList>
  </iPage>
</template>

<script>
import { iPage, iTabsList, iButton } from 'rise'
import materialCostReport from "./components/materialCostReport";
import materilaCostMaintenance from "./components/materilaCostMaintenance";

export default {
    components: { 
        iPage, 
        iTabsList, 
        iButton,
        materialCostReport,
        materilaCostMaintenance,
    },
    data(){
        return {
            currentTab: 'overview'
        }
    },
    created(){

    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
.partprogress{
    padding: 0;
    padding-top: 10px;
    height: unset;
    overflow: visible;
}
</style>