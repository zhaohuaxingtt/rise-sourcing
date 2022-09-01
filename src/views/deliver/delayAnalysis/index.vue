<template>
  <iPage>
    <projectTop />
    <iNavMvp lev="2" class="flex-end"
               :list="navList"
               @change="change"
               lang></iNavMvp>
    <search :searchList="searchList" :selectOptions="selectOptions" :icon="false"></search>
    <iTabsList v-model='defaultTab' type="card">
      <el-tab-pane label="延迟图" name="1"></el-tab-pane>
      <el-tab-pane label="offen图" name="2"></el-tab-pane>
    </iTabsList>
    <template v-if="defaultTab==1">
      <el-row :gutter="20">
        <el-col :span="12"><chartsItem/></el-col>
        <el-col :span="12"><yuanyinChartsItem/></el-col>
      </el-row>
    </template>
    <template v-else>
      <offenChartsItem/>
    </template>
    <tableList title="零件清单列表" class="margin-top20"/>
  </iPage>
</template>

<script>
import { iPage, iCard, iSearch, iButton, iDatePicker, iSelect, iMessage, iTabsList,iNavMvp } from "rise";
import projectTop from '../components/projectHeader'
import search from "../components/search";
import chartsItem from "./components/chartsItem";
import offenChartsItem from "./components/offenChartsItem";
import yuanyinChartsItem from "./components/yuanyinChartsItem";
import tableList from "../components/tableList";
import { delayAnalysisSearchList as searchList } from "../components/data";

import { navList } from "./data";
  export default {
    components:{
      iPage, iCard, iSearch, iButton, iDatePicker, iSelect, iMessage, iTabsList, projectTop, search, chartsItem, offenChartsItem,yuanyinChartsItem,tableList,iNavMvp
    },
    data() {
      return {
        searchList,
        selectOptions: {},
        defaultTab:'1',
        navList,
        threeTreeValue:"",
      }
    },
    methods:{
      change(val){
        this.threeTreeValue = val.value;
      },
    }
  }
</script>

<style lang="scss" scoped>
.chart-box{
  width: 100%;
  display: flex;
  flex-flow: row;
  ::v-deep .card{
    width: 100%;
  }
}
.flex-end{
  position: absolute;
  right:140px;
  top:30px;
}
.routerpage{
  position: relative;
}
</style>