<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 13:46:18
 * @LastEditors: zbin
 * @Descripttion: 专项分析工具
-->
<template>
  <div>
    <div :class="$route.path!=='/sourcing/partsrfq/assistant'?'flex-between-center-center':'flex-end'">
      <iNavMvp v-if="$route.path!=='/sourcing/partsrfq/assistant'" :query='$route.query' :lev='1' routerPage :list='navList' @change='changeRouter'></iNavMvp>
      <div>
        <iButton v-if="$route.path==='/sourcing/partsrfq/assistant'" @click="handleSearch">{{$t('search')}}</iButton>
        <iButton @click="handleReport">{{$t('TPZS.BGQD')}}</iButton>
        <icon class="icondatabaseweixuanzhong" name="icondatabaseweixuanzhong" symbol></icon>
      </div>
    </div>
    <enterSpecificAnalysisToolsDialog @getDataList='getDataList' v-model="viewModelDialog" />
    <el-row class="margin-top30" type="flex" justify="space-between">
      <el-col class="margin-right20" :span="12">
        <bob :totalBobOverview="totalBobOverview" :title="'BoB(Best of Best)'" />
      </el-col>
      <el-col :span="12">
        <bob :totalBobOverview="totalVolumePricingOverview" :title="'Volume Pricing'" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bob from "./components/bob";
import { iPage, iNavMvp, iButton, icon } from "rise";
import enterSpecificAnalysisToolsDialog from "./components/enterSpecificAnalysisToolsDialog";
import { navList } from "./data";
import { totalBobOverview, totalVolumePricingOverview } from "@/api/partsrfq/specialAnalysisTool/specialAnalysisTool.js";
export default {
  components: { bob, iPage, iNavMvp, iButton, icon, enterSpecificAnalysisToolsDialog },
  data() {
    return {
      navList,
      title: '',
      viewModelDialog: false,
      totalBobOverview: {},
      totalVolumePricingOverview: {}
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    async getDataList(val) {
      const pms = {
        isInsideEnter: this.$route.path === '/sourcing/partsrfq/assistant' ? true : false,
        keyword: val || ''
      }
      const res1 = await totalBobOverview(pms)
      const res2 = await totalVolumePricingOverview(pms)
      this.totalBobOverview = res1.data
      this.totalVolumePricingOverview = res2.data
    },
    handleSearch() {
      this.viewModelDialog = true
    },
    handleReport(){
      this.$router.push({path:'/sourcing/partsrfq/reportList'})
    }
  }
}
</script>

<style>
.icondatabaseweixuanzhong {
  font-size: 21px;
  margin-left: 1.875rem;
}
.flex-end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>