<template>
  <iPage>
    <projectTop />
    <search :searchList="searchList" :selectOptions="selectOptions" :icon="false"></search>
    <iCard>
      delayAnalysis
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iSearch, iButton, iDatePicker, iSelect, iMessage } from "rise";
import projectTop from '../components/projectHeader'
import search from "../components/search";
import { delayAnalysisSearchList as searchList } from "../components/data";
  export default {
    components:{
      iPage, iCard, iSearch, iButton, iDatePicker, iSelect, iMessage, projectTop,search
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