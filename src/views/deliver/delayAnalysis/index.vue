<template>
  <iPage>
    <projectTop />
    <search :searchList="searchList" :selectOptions="selectOptions" :icon="false"></search>
    <chartsItem/>
    <offenChartsItem/>
    <yuanyinChartsItem/>
    <tableList title="零件清单列表" class="margin-top20"/>
  </iPage>
</template>

<script>
import { iPage, iCard, iSearch, iButton, iDatePicker, iSelect, iMessage } from "rise";
import projectTop from '../components/projectHeader'
import search from "../components/search";
import chartsItem from "./components/chartsItem";
import offenChartsItem from "./components/offenChartsItem";
import yuanyinChartsItem from "./components/yuanyinChartsItem";
import tableList from "../components/tableList";
import { delayAnalysisSearchList as searchList } from "../components/data";
  export default {
    components:{
      iPage, iCard, iSearch, iButton, iDatePicker, iSelect, iMessage, projectTop,search,chartsItem,offenChartsItem,yuanyinChartsItem,tableList
    },
    data() {
      return {
        searchList,
        selectOptions: {}
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>