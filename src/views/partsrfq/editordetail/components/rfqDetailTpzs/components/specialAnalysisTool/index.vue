<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 13:46:18
 * @LastEditors: zbin
 * @Descripttion: 专项分析工具
-->
<template>
  <div>
    <div v-if="$route.path==='/sourcing/partsrfq/assistant'" class="margin-bottom20 clearFloat">
      <div class="floatright">
        <iButton @click="handleSearch">{{$t('search')}}</iButton>
      </div>
    </div>
    <enterSpecificAnalysisToolsDialog @getDataList='getDataList' v-model="viewModelDialog" />
    <el-row class="margin-top30">
      <el-col v-for="(item,index) in cardData" :key="index" :span="12">
        <card :class="index%2===0&&'margin-right20'" @click.native="$emit('entrance',item.title)" :cardData="item" :title="item.title" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import card from "./components/card";
import { iPage, iButton } from "rise";
import enterSpecificAnalysisToolsDialog from "./components/enterSpecificAnalysisToolsDialog";
import { totalOverview } from "@/api/partsrfq/specialAnalysisTool/specialAnalysisTool.js";
export default {
  components: { card, iPage, enterSpecificAnalysisToolsDialog, iButton },
  data() {
    return {
      title: '',
      viewModelDialog: false,
      cardData: [],
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    handleCut(val) {

    },
    async getDataList(val) {
      const pms = {
        isInsideEnter: this.$route.path === '/sourcing/partsrfq/assistant' ? true : false,
        keyword: val || ''
      }
      const res = await totalOverview(pms)
      this.cardData = res.data
      this.cardData.push({ title: 'PCA' }, { title: 'TIA' })
    },
    handleSearch() {
      this.viewModelDialog = true
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-col-12 {
  margin-bottom: 20px;
}
</style>