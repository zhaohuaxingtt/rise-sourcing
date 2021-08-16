<template>
  <iPage v-loading="pageLoading">
    <!--    顶部操作按钮-->
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language('PI.PIFENXI', 'Price Index分析') }}</span>
      <div class="floatright">
        <iButton @click="handleBack">{{ language('PI.PIFENXIKU', 'Price Index分析库') }}</iButton>
        <iButton @click="handlePreview">{{ language('PI.YULAN', '预览') }}</iButton>
        <iButton @click="() => this.saveDialog = true">{{ language('PI.BAOCUN', '保存') }}</iButton>
      </div>
    </div>
    <!--     零件列表-->
    <thePartsList
        :partList="partList"
        :partItemCurrent="partItemCurrent"
        @handleOpenCustomDialog="handleOpenCustomDialog"
        @handlePartItemClose="handlePartItemClose"
        @handlePartItemClick="handlePartItemClick"
    />
    <!-- 自定义零件弹窗 -->
    <customPart :key="customParams.key" v-model="customParams.visible"/>
    <!--信息-->
    <iCard class="margin-bottom20">
      <theBaseInfo :dataInfo="dataInfo"/>
    </iCard>

    <!--类型标签-->
    <theTabs
        class="margin-bottom20"
        @handleItemClick="handleTabsClick"
        @handleTimeChange="handleTimeChange"
        :currentTab="currentTab"
    />

    <!--表格-->
    <iCard tabCard class="margin-bottom20">
      <theTable :dataInfo="dataInfo" :currentTab="currentTab"/>
    </iCard>

    <!--图形-->
    <div class="chartBox">
      <!--      Price Index价格分析-->
      <iCard class="lineBox">
        <thePriceIndexChart/>
      </iCard>
      <!--      零件成本构成-->
      <iCard class="pieBox">
        <thePartsCostChart :dataInfo="dataInfo"/>
      </iCard>
    </div>

    <!--预览-->
    <previewDialog
        v-model="previewDialog"
        :dataInfo="dataInfo"
        :currentTab="currentTab"
    />
  </iPage>
</template>

<script>
import {iPage, iButton, iMessageBox, iCard} from 'rise';
import thePartsList from './components/thePartsList';
import theBaseInfo from './components/theBaseInfo';
import theTabs from './components/theTabs';
import theTable from './components/theTable';
import customPart from './components/customPart';
import thePartsCostChart from './components/thePartsCostChart';
import thePriceIndexChart from './components/thePriceIndexChart';
import previewDialog from './components/previewDialog';
import resultMessageMixin from '@/utils/resultMessageMixin';
import {CURRENTTIME, AVERAGE} from './components/data';
import {
  getAnalysisSchemeDetails,
} from '../../../../api/partsrfq/piAnalysis/piDetail';

export default {
  mixins: [resultMessageMixin],
  components: {
    iPage,
    iButton,
    iCard,
    thePartsList,
    customPart,
    thePartsCostChart,
    thePriceIndexChart,
    theBaseInfo,
    previewDialog,
    theTabs,
    theTable,
  },
  data() {
    return {
      pageLoading: false,
      saveDialog: false,
      partList: [],
      partItemCurrent: 0,
      previewDialog: false,
      customParams: {
        key: 0,
        visible: false,
      },
      currentTab: CURRENTTIME,
      currentTabData: {
        analysisSchemeId: 109,
        partsId: '',
        batchNumber: '',
      },
      dataInfo: {},
    };
  },
  created() {
    this.getDataInfo();
  },
  methods: {
    handleBack() {
      if (this.$store.state.rfq.entryStatus === 1) {
        this.$router.push({
          path: '/sourcing/partsrfq/assistant',
          query: {
            id: this.$store.state.rfq.rfqId,
            round: this.$route.query.round,
            pageType: 'PI',
            activityTabIndex: 'two',
          },
        });
      } else {
        this.$router.push({
          path: '/sourcing/partsrfq/externalNegotiationAssistant',
          query: {
            pageType: 'PI',
          },
        });
      }
    },
    handlePreview() {
      this.previewDialog = true;
    },
    // 打开自定义零件
    handleOpenCustomDialog() {
      this.customParams = {
        ...this.customParams,
        key: Math.random(),
        visible: true,
      };
    },
    // 关闭零件
    handlePartItemClose({event, item}) {
      event.stopPropagation();
      iMessageBox(
          this.$t('LK_SHIFOUQUERENSHANCHU'),
          this.$t('LK_WENXINTISHI'),
          {confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO')},
      ).then(async () => {
        /*const req = {
          id: item.id,
        };
        const res = await deletePartsCustomerList(req);
        if (res.result) {
          this.partItemCurrent = 0;
          this.currentBatchNumber = this.partList[0].batchNumber;
          this.currentPartsId = this.partList[0].partsId;
          this.getDataInfo();
        }
        this.resultMessage(res);*/
      });
    },
    // 点击零件
    handlePartItemClick({item, index}) {
      this.partItemCurrent = index;
    },
    // 点击标签
    handleTabsClick(val) {
      this.currentTab = val;
    },
    // 时间改变
    handleTimeChange(time) {
      console.log(111);
      console.log(time);
    },
    // 获取信息
    async getDataInfo() {
      try {
        this.pageLoading = true;
        const req = {
          analysisSchemeId: this.currentTabData.analysisSchemeId,
        };
        const res = await getAnalysisSchemeDetails(req);
        this.dataInfo = res.data;
        this.partList = res.data.partsList.filter(item => {
          return item.isShow;
        });
        this.pageLoading = false;
      } catch {
        this.pageLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.chartBox {
  display: flex;
  justify-content: space-between;
  height: 573px;

  .lineBox {
    width: 69%;
    height: 100%;
  }

  .pieBox {
    width: 30%;
    height: 100%;
  }
}
</style>
