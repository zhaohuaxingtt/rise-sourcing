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
        :timeRange="timeRange"
    />

    <!--表格-->
    <iCard tabCard class="margin-bottom20">
      <theTable
          v-show="currentTab === CURRENTTIME"
          ref="theCurrentTable"
          :dataInfo="dataInfo"
          :currentTab="currentTab"
          :tableLoading="tableLoading"
          @handlePriceTableFinish="handlePriceTableFinish($event, currentTab)"
      />
      <theTable
          v-show="currentTab === AVERAGE"
          ref="theAverageTable"
          :averageData="averageData"
          :currentTab="currentTab"
          :tableLoading="tableLoading"
          @handlePriceTableFinish="handlePriceTableFinish($event, currentTab)"
      />
    </iCard>

    <!--图形-->
    <div class="chartBox">
      <!--      Price Index价格分析-->
      <iCard class="lineBox">
        <thePriceIndexChart
            v-if="showPiChart"
            ref="thePriceIndexChart"
            :currentTab="currentTab"
            :currentTabData="currentTabData"
        />
      </iCard>
      <!--      零件成本构成-->
      <iCard class="pieBox">
        <thePartsCostChart
            :dataInfo="dataInfo"
            :pieLoading="pieLoading"
        />
      </iCard>
    </div>

    <!--预览-->
    <previewDialog
        ref="previewDialog"
        v-model="previewDialog"
        :dataInfo="dataInfo"
        :averageData="averageData"
        :currentTab="currentTab"
        :currentTabData="currentTabData"
    />

    <!--    保存弹框-->
    <saveDialog
        ref="saveDialog"
        v-model="saveDialog"
        @handleSaveDialog="handleSaveDialog"
        :dataInfo="dataInfo"
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
import saveDialog from './components/saveDialog';
import resultMessageMixin from '@/utils/resultMessageMixin';
import {CURRENTTIME, AVERAGE} from './components/data';
import {
  getAnalysisSchemeDetails,
  getAveragePartCostPrice,
  deleteParts,
  saveAnalysisScheme,
} from '../../../../api/partsrfq/piAnalysis/piDetail';
import _ from 'lodash';
import {mapState} from 'vuex';

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
    saveDialog,
  },
  computed: {
    ...mapState({
      piIndexChartParams: (state) => state.rfq.piIndexChartParams,
    }),
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
        analysisSchemeId: this.$route.query.schemeId,
        partsId: '',
        batchNumber: this.$route.query.batchNumber,
        supplierId: '',
      },
      dataInfo: {},
      averageData: {},
      CURRENTTIME,
      AVERAGE,
      tableLoading: false,
      timeRange: null,
      pieLoading: false,
      showPiChart: true,
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
        const req = {
          id: item.id,
        };
        const res = await deleteParts(req);
        if (res.result) {
          this.partItemCurrent = 0;
          const partListItem = this.partList[0];
          this.currentTabData = {
            analysisSchemeId: partListItem.analysisSchemeId,
            partsId: partListItem.partsId,
            batchNumber: partListItem.batchNumber,
            supplierId: partListItem.supplierId,
          };
          await this.getDataInfo();
        }
        this.resultMessage(res);
      });
    },
    // 点击零件
    handlePartItemClick({item, index}) {
      this.partItemCurrent = index;
      this.currentTabData = {
        analysisSchemeId: item.analysisSchemeId,
        partsId: item.partsId,
        batchNumber: item.batchNumber,
        supplierId: item.supplierId,
      };
      this.currentTab = CURRENTTIME;
      this.getDataInfo();
    },
    // 点击标签
    handleTabsClick(val) {
      this.$store.dispatch('setPiIndexChartParams', {
        dimensionHandle: [],
        particleSize: '3',
        beginTime: '',
        endTime: '',
      });
      this.currentTab = val;
      this.showPiChart = false;
      this.$nextTick(async () => {
        this.showPiChart = true;
        if (this.currentTab === AVERAGE) {
          await this.getAverageData();
          await this.$refs.thePriceIndexChart.buildChart();
        } else {
          await this.getDataInfo();
        }
      });
    },
    // 时间改变
    async handleTimeChange(time) {
      const extraParams = {
        beginTime: time[0],
        endTime: time[1],
      };
      await this.getAverageData({extraParams});
      await this.$refs.thePriceIndexChart.buildChart();
    },
    // 获取信息
    async getDataInfo() {
      try {
        this.setLoading({propsArray: ['pageLoading', 'tableLoading', 'pieLoading'], boolean: true});
        const req = {
          ...this.currentTabData,
        };
        const res = await getAnalysisSchemeDetails(req);
        this.dataInfo = res.data;
        this.currentTabData.partsId = res.data.partsId;
        this.currentTabData.batchNumber = res.data.batchNumber;
        this.currentTabData.supplierId = res.data.supplierId;
        this.partList = res.data.partsList.filter(item => {
          return item.isShow;
        });
        this.setPiIndexTimeParams(res.data.currentPartCostTotalVO);
        await this.$refs.thePriceIndexChart.buildChart();
        this.setLoading({propsArray: ['pageLoading', 'tableLoading', 'pieLoading'], boolean: false});
      } catch {
        this.setLoading({propsArray: ['pageLoading', 'tableLoading', 'pieLoading'], boolean: false});
      }
    },
    // 获取平均数据
    async getAverageData({extraParams} = {}) {
      try {
        this.setLoading({propsArray: ['tableLoading', 'pieLoading'], boolean: true});
        this.averageData = {};
        const req = {
          ...this.currentTabData,
          ...extraParams,
        };
        const res = await getAveragePartCostPrice(req);
        this.averageData = res.data;
        if (res.data.beginTime && res.data.endTime) {
          this.timeRange = [res.data.beginTime, res.data.endTime];
          this.setPiIndexTimeParams(res.data);
        } else {
          this.timeRange = null;
        }
        this.setLoading({propsArray: ['tableLoading', 'pieLoading'], boolean: false});
      } catch {
        this.averageData = {};
        this.setLoading({propsArray: ['tableLoading', 'pieLoading'], boolean: false});
      }
    },
    // 处理保存弹窗
    async handleSaveDialog(reqParams) {
      try {
        this.pageLoading = true;
        const req = this.handleAllSaveReq(reqParams);
        if (reqParams.reportSave) {
          await this.handleSaveAsReport(async (downloadName, downloadUrl) => {
            req.downloadName = downloadName;
            req.downloadUrl = downloadUrl;
            await this.saveAnalysisScheme(req);
            this.saveDialog = false;
          });
        } else {
          await this.saveAnalysisScheme(req);
          this.saveDialog = false;
        }
        this.pageLoading = false;
      } catch {
        this.pageLoading = false;
      }
    },
    handleAllSaveReq(reqParams) {
      const req = {
        ...this.currentTabData,
      };
      const currentData = this.$refs.theCurrentTable.handleAllSaveData();
      const averageData = this.$refs.theAverageTable.handleAllSaveData();
      if (reqParams.analysisSave && reqParams.reportSave) {
        req.analysisSchemeName = reqParams.analysisName;
        req.reportName = reqParams.reportName;
      } else if (reqParams.analysisSave) {
        req.analysisSchemeName = reqParams.analysisName;
      } else if (reqParams.reportSave) {
        req.reportName = reqParams.reportName;
      }
      req.currentPartsCostList = currentData.tableList;
      req.currentPrice = currentData.nowPriceRatio;
      req.currentCompositePrice = currentData.totalPriceRatio;
      req.avgPartsCostList = averageData.tableList;
      req.avgPrice = averageData.nowPriceRatio;
      req.avgCompositePrice = averageData.totalPriceRatio;
      req.beginTime = averageData.beginTime;
      req.endTime = averageData.endTime;
      return req;
    },
    async handleSaveAsReport(callback) {
      this.previewDialog = true;
      setTimeout(async () => {
        const res = await this.$refs.previewDialog.getDownloadFile({
          callBack: () => {
            this.previewDialog = false;
          },
        });
        const downloadName = res.downloadName;
        const downloadUrl = res.downloadUrl;
        if (callback) {
          callback(downloadName, downloadUrl);
        }
      }, 1000);
    },
    setLoading({propsArray, boolean}) {
      propsArray.map(item => {
        this[item] = boolean;
      });
    },
    setPiIndexTimeParams(data) {
      const copyPiIndexChartParams = _.cloneDeep(this.piIndexChartParams);
      copyPiIndexChartParams.beginTime = data.beginTime;
      copyPiIndexChartParams.endTime = data.endTime;
      this.$store.dispatch('setPiIndexChartParams', copyPiIndexChartParams);
    },
    async handlePriceTableFinish(value, tab) {
      try {
        this.tableLoading = true;
        const req = {
          ...this.currentTabData,
        };
        if (tab === CURRENTTIME) {
          req.currentPartsCostList = value.tableList;
          req.currentPrice = value.nowPriceRatio;
          req.currentCompositePrice = value.totalPriceRatio;
        } else if (tab === AVERAGE) {
          req.avgPartsCostList = value.tableList;
          req.avgPrice = value.nowPriceRatio;
          req.avgCompositePrice = value.totalPriceRatio;
          req.beginTime = value.beginTime;
          req.endTime = value.endTime;
        }
        const res = await saveAnalysisScheme(req);
        this.tableLoading = false;
        this.resultMessage(res);
      } catch {
        this.tableLoading = false;
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
