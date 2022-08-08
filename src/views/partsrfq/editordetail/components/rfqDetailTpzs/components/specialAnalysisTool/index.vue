<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 13:46:18
 * @LastEditors: Please set LastEditors
 * @Descripttion: 专项分析工具
-->
<template>
  <div class="specialAnalysisTool"
       v-loading.fullscreen="loading">

    <enterSpecificAnalysisToolsDialog :keyword="keyword"
                                      @getDataList="getDataList"
                                      v-model="viewModelDialog" />
    <!-- 渲染图表 -->
    <el-row :gutter="16">
      <template v-for="(item, index) in cardData">
        <el-col v-if="whiteBtnList[item.permission]"
                :key="index"
                :span="12">
          <card @click.native="entrance(item)"
                :cardData="item" />
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
import card from './components/card';
import { iPage, iButton } from 'rise';
import enterSpecificAnalysisToolsDialog from './components/enterSpecificAnalysisToolsDialog';
import { totalOverview } from '@/api/partsrfq/specialAnalysisTool/specialAnalysisTool.js';
import BoB from '@/assets/images/BoB.svg';
import VP from '@/assets/images/VP.svg';
import PI from '@/assets/images/PI.svg';
import MEK from '@/assets/images/MEK.svg';
import PCA from '@/assets/images/PCA.svg';
import TIA from '@/assets/images/TIA.svg';
import BL from '@/assets/images/BL.jpg';
import soon from '@/assets/images/soon.png';

export default {
  components: { card, iPage, enterSpecificAnalysisToolsDialog, iButton },
  data () {
    return {
      title: '',
      viewModelDialog: false,
      cardData: [],
      keyword: '',
      loading: false,
    };
  },
  created () {
    this.getDataList('', '', '', '', '');
  },
  computed: {
    whiteBtnList () {
      return this.$store.state.permission.whiteBtnList
    }
  },
  methods: {
    entrance (param) {
      console.log(param, "data")
      // 默认项
      if (param.isDefault) {
        switch (param.title) {
          case 'BoB(Best of Best)':
            this.$router.push({ path: '/sourcing/partsrfq/bobNew', query: { chemeId: param.reportId, round: this.$route.query.round } });
            break;
          case 'Volume Pricing':
            console.log('111')
            this.$router.push({ path: '/sourcing/partsrfq/vpAnalyseDetail', query: { type: 'edit', schemeId: param.reportId, round: this.$route.query.round } });
            break;
          case 'Pricing Index':
            this.$router.push({ path: '/sourcing/partsrfq/piAnalyseDetail', query: { schemeId: param.reportId, round: this.$route.query.round } });
            break;
          case 'MEK':
            this.$router.push({ path: '/sourcing/mek/mekDetails', query: { schemeId: param.reportId, round: this.$route.query.round } });
            break;
          default:
            break;
        }
      } else {
        // 没有默认项
        switch (param.title) {
          case 'BoB(Best of Best)':
            this.$emit('entrance', 'BoB');
            break;
          case 'Volume Pricing':
            this.$emit('entrance', 'VP');
            break;
          case 'Pricing Index':
            this.$emit('entrance', 'PI');
            break;
          case 'MEK':
            this.$emit('entrance', 'MEK');
            break;
          case 'PCA':
            this.$emit('entrance', 'PCA');
            break;
          case 'TIA':
            this.$emit('entrance', 'TIA');
            break;
          case 'Bid-Link':
            this.$emit('entrance', 'BL');
            break;
          default:
            break;
        }
      }
    },
    // 获取数据
    async getDataList ({ rfqId = '', categoryName = '', categoryCode = '', partNum = '', rfqName = '' }) {
      // 把数据存在store
      if (this.$store.state.rfq.entryStatus === 0) {
        window.sessionStorage.setItem('rfqId', rfqId);
        window.sessionStorage.setItem('materialGroup', categoryName);
        window.sessionStorage.setItem('spareParts', partNum);
        await this.$store.dispatch('setRfqId', rfqId);
        await this.$store.dispatch('setMaterialGroup', categoryName);
        await this.$store.dispatch('setSpareParts', partNum);
      }
      if (categoryCode && categoryName) {
        this.keyword = categoryCode + '-' + categoryName;
      } else if (rfqId && rfqName) {
        this.keyword = rfqId + '-' + rfqName;
      } else if (partNum) {
        this.keyword = partNum;
      }

      // console.log(this.$store.state);
      const pms = {
        isInsideEnter: this.$store.state.rfq.entryStatus ? true : false,
        // rfq: this.$store.state.rfq.rfqId,
        rfq: this.$store.state.rfq.rfqId?this.$store.state.rfq.rfqId:0,
        materialGroup: categoryName,
        spareParts: this.$store.state.rfq.spareParts,
      };
      this.loading = true
      totalOverview(pms)
        .then((res) => {
          if (res.result) {
            this.viewModelDialog = false;
            this.cardData = res.data;
            // 数据处理
            this.cardData.map((item) => {
              if (!item.analysisTotal) {
                item.analysisTotal = '';
              }
              if (!item.reportTotal) {
                item.reportTotal = '';
              }
              if (!item.analysisLastUpdateDate) {
                item.analysisLastUpdateDate = '';
              }
              if (!item.reportLastUpdateDate) {
                item.reportLastUpdateDate = '';
              }
              switch (item.title) {
                case 'BoB(Best of Best)':
                  item.permission = "WORKBENCH_RFQ_TPZS_CARD_BOB";
                  item.imgUrl = BoB;
                  break;
                case 'Volume Pricing':
                  item.permission = "WORKBENCH_RFQ_TPZS_CARD_VP";
                  item.imgUrl = VP;
                  break;
                case 'Pricing Index':
                  item.permission = "WORKBENCH_RFQ_TPZS_CARD_PI";
                  item.imgUrl = PI;
                  break;
                case 'MEK':
                  item.permission = "WORKBENCH_RFQ_TPZS_CARD_MEK";
                  item.imgUrl = MEK;
                  break;
                case 'TIA':
                  item.permission = "WORKBENCH_RFQ_TPZS_CARD_TIA";
                  item.imgUrl = TIA;
                  break;
                case 'PCA':
                  item.permission = "WORKBENCH_RFQ_TPZS_CARD_PCA";
                  item.imgUrl = PCA;
                  break;
                case 'Bid-Link':
                  item.permission = "WORKBENCH_RFQ_TPZS_CARD_BL";
                  item.imgUrl = BL;
                  break;
                default:
                  break;
              }
            });
            this.loading = false
          }
        })
        .catch((error) => {
          this.loading = false
        });
    },
    handleSearch () {
      this.viewModelDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.specialAnalysisTool {
  height: calc(100% - 67px);
}
::v-deep .el-col-12 {
  margin-bottom: 20px;
}
</style>
