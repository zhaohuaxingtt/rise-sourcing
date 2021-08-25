<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 13:46:18
 * @LastEditors: zbin
 * @Descripttion: 专项分析工具
-->
<template>
  <div>
    <enterSpecificAnalysisToolsDialog :keyword="keyword" @getDataList='getDataList' v-model="viewModelDialog" />
    <el-row :gutter="16">
      <el-col v-for="(item,index) in cardData" :key="index" :span="12">
        <card @click.native="entrance(item)" :cardData="item" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import card from "./components/card";
import { iPage, iButton } from "rise";
import enterSpecificAnalysisToolsDialog from "./components/enterSpecificAnalysisToolsDialog";
import { totalOverview } from "@/api/partsrfq/specialAnalysisTool/specialAnalysisTool.js";
import BoB from '@/assets/images/BoB.svg'
import VP from '@/assets/images/VP.svg'
import PI from '@/assets/images/PI.svg'
import MEK from '@/assets/images/MEK.svg'
import PCA from '@/assets/images/PCA.svg'
import TIA from '@/assets/images/TIA.svg'
import soon from '@/assets/images/soon.png'

export default {
  components: { card, iPage, enterSpecificAnalysisToolsDialog, iButton },
  data() {
    return {
      title: '',
      viewModelDialog: false,
      cardData: [],
      keyword: ''
    }
  },
  created() {
    this.getDataList('', '', '', '', '')
  },
  methods: {
    entrance(param) {
      if (param.isDefault) {
        switch (param.title) {
          case 'BoB(Best of Best)':
            this.$router.push({ path: '/sourcing/partsrfq/bobNew', query: { chemeId: param.reportId, round: this.$route.query.round } })
            break;
          case 'Volume Pricing':
            this.$router.push({ path: '/sourcing/partsrfq/vpAnalyseDetail', query: { type: 'edit', chemeId: param.reportId, round: this.$route.query.round } })
            break;
          case 'MEK':
            this.$router.push({ path: '/sourcing/mek/mekDetails', query: { chemeId: param.reportId, round: this.$route.query.round } })
            break;
          default:
            break;
        }
      } else {
        switch (param.title) {
          case 'BoB(Best of Best)':
            this.$emit('entrance', 'BoB')
            break;
          case 'Volume Pricing':
            this.$emit('entrance', 'VP')
            break;
          case 'Pricing Index':
            this.$emit('entrance', 'PI')
            break;
          case 'MEK':
            this.$emit('entrance', 'MEK')
            break;
          case 'PCA':
            this.$emit('entrance', 'PCA')
            break;
          case 'TIA':
            this.$emit('entrance', 'TIA')
            break;
          case 'Bid-Link':
            this.$emit('entrance', 'BL')
            break;
          default:
            break;
        }
      }
    },
    async getDataList({ rfqId = '', categoryName = '', categoryCode = '', partNum = '', rfqName = '' }) {
      if (this.$store.state.rfq.entryStatus === 0) {
        window.sessionStorage.setItem('rfqId', rfqId)
        window.sessionStorage.setItem('materialGroup', categoryName)
        window.sessionStorage.setItem('spareParts', partNum)
        await this.$store.dispatch('setRfqId', rfqId)
        await this.$store.dispatch('setMaterialGroup', categoryName)
        await this.$store.dispatch('setSpareParts', partNum)
      }
      if (categoryCode && categoryName) {
        this.keyword = categoryCode + '-' + categoryName
      } else if (rfqId && rfqName) {
        this.keyword = rfqId + '-' + rfqName
      } else if (partNum) {
        this.keyword = partNum
      }
      const pms = {
        isInsideEnter: this.$route.path === '/sourcing/partsrfq/assistant' ? true : false,
        rfq: this.$store.state.rfq.rfqId,
        materialGroup: categoryName,
        spareParts: this.$store.state.rfq.spareParts,
      }
      const res = await totalOverview(pms)
      if (res.result) {
        this.viewModelDialog = false
        this.cardData = res.data
        this.cardData.push(
          { title: 'Pricing Index', analysisTotal: '', reportTotal: '', analysisLastUpdateDate: '', reportLastUpdateDate: '' },
          { title: 'Bid-Link', analysisTotal: '', reportTotal: '', analysisLastUpdateDate: '', reportLastUpdateDate: '' }
        )
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
              item.imgUrl = BoB
              break;
            case 'Volume Pricing':
              item.imgUrl = VP
              break;
            // 
            case 'Pricing Index':
              item.imgUrl = PI
              break;
            case 'MEK':
              item.imgUrl = MEK
              break;
            case 'TIA':
              item.imgUrl = TIA
              break;
            case 'PCA':
              item.imgUrl = PCA
              break;
            case 'Bid-Link':
              item.imgUrl = soon
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