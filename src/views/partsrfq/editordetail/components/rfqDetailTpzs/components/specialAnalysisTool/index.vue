<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 13:46:18
 * @LastEditors: zbin
 * @Descripttion: 专项分析工具
-->
<template>
  <div>
    <enterSpecificAnalysisToolsDialog @getDataList='getDataList' v-model="viewModelDialog" />
    <el-row :gutter="16" class="margin-top30">
      <el-col v-for="(item,index) in cardData" :key="index" :span="12">
        <card @click.native="$emit('entrance',item.title)" :cardData="item" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import card from "./components/card";
import { iPage, iButton } from "rise";
import enterSpecificAnalysisToolsDialog from "./components/enterSpecificAnalysisToolsDialog";
import { totalOverview } from "@/api/partsrfq/specialAnalysisTool/specialAnalysisTool.js";
import VPIndex from '@/assets/images/VPIndex.png'
import BoBIndex from '@/assets/images/BoBIndex.png'
import TIAIndex from '@/assets/images/TIAIndex.png'
import PCAIndex from '@/assets/images/PCAIndex.png'

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
    async getDataList(val) {
      window.sessionStorage.setItem('rfqId', val)
      const pms = {
        isInsideEnter: false,
        rfq: val || '',
      }
      const res = await totalOverview(pms)
      if (res.result) {
        this.viewModelDialog = false
        this.cardData = res.data
        this.cardData.push({ title: 'PCA', analysisTotal: '', reportTotal: '', analysisLastUpdateDate: '', reportLastUpdateDate: '' }, { title: 'TIA', analysisTotal: '', reportTotal: '', analysisLastUpdateDate: '', reportLastUpdateDate: '' })
        this.cardData.map((item) => {
          if (!item.analysisTotal) {
            item.analysisTotal = ''
          }
          if (!item.reportTotal) {
            item.reportTotal = ''
          }
          if (!item.analysisLastUpdateDate) {
            item.analysisLastUpdateDate = ''
          }
          if (!item.reportLastUpdateDate) {
            item.reportLastUpdateDate = ''
          }
          switch (item.title) {
            case 'BoB(Best of Best)':
              item.imgUrl = BoBIndex
              break;
            case 'Volume Pricing':
              item.imgUrl = VPIndex
              break;
            case 'TIA':
              item.imgUrl = TIAIndex
              break;
            case 'PCA':
              item.imgUrl = PCAIndex
              break;
            default:
              break;
          }
        })
      }
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