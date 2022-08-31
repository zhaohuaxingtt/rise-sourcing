<template>
  <iPage>
    <projectTop />
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
import { iPage, iCard, iSearch, iButton, iDatePicker, iSelect, iMessage, iTabsList } from "rise";
import projectTop from '../components/projectHeader'
import search from "../components/search";
import chartsItem from "./components/chartsItem";
import offenChartsItem from "./components/offenChartsItem";
import yuanyinChartsItem from "./components/yuanyinChartsItem";
import tableList from "../components/tableList";
import { delayAnalysisSearchList as searchList } from "../components/data";
  export default {
    components:{
      iPage, iCard, iSearch, iButton, iDatePicker, iSelect, iMessage, iTabsList, projectTop, search, chartsItem, offenChartsItem,yuanyinChartsItem,tableList
    },
    data() {
      return {
        searchList,
        selectOptions: {},
        defaultTab:'1'
      }
    },
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
</style>