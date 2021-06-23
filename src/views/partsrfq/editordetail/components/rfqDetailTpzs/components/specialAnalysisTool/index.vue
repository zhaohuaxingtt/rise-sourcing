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
    <el-row v-if="current===0" class="margin-top30" type="flex" justify="space-between">
      <el-col class="margin-right20" :span="12">
        <card @click.native="handlePage(1)" :totalBobOverview="totalBobOverview" :title="'BoB(Best of Best)'" />
      </el-col>
      <el-col :span="12">
        <card @click.native="handlePage(2)" :totalBobOverview="totalVolumePricingOverview" :title="'Volume Pricing'" />
      </el-col>
    </el-row>
    <vpAnalyseList v-else-if="current===2" class="margin-top20" />
  </div>
</template>

<script>
import card from "./components/card";
import { iPage, iNavMvp, iButton, icon } from "rise";
import enterSpecificAnalysisToolsDialog from "./components/enterSpecificAnalysisToolsDialog";
import { navList } from "./data";
import { totalBobOverview, totalVolumePricingOverview } from "@/api/partsrfq/specialAnalysisTool/specialAnalysisTool.js";
import vpAnalyseList from "@/views/partsrfq/vpAnalyse/vpAnalyseList/index.vue";
export default {
  components: { card, iPage, iNavMvp, iButton, icon, enterSpecificAnalysisToolsDialog, vpAnalyseList },
  data() {
    return {
      navList,
      title: '',
      viewModelDialog: false,
      totalBobOverview: {},
      totalVolumePricingOverview: {},
      current: 0
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    handlePage(val) {
      console.log(this.$route.path);
      if (this.$route.path === '/sourcing/partsrfq/specialAnalysisTool') {
        // 展示项
        this.current = val
      } else if (this.$route.path === '/sourcing/partsrfq/assistant') {
        // 路由跳转
      }
    },
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
    handleReport() {
      this.$router.push({ path: '/sourcing/partsrfq/reportList' })
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