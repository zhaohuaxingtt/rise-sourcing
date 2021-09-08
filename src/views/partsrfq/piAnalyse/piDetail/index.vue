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
    <customPart v-if="customParams.visible" :key="customParams.key" :batchNumber="currentTabData.batchNumber"
                v-model="customParams.visible"
                @handleCloseCustom="handleCloseCustom" @handleSaveCustom="handleSaveCustom"/>
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
          :tableStatus="tableStatus"
          @handleTableStatus="handleTableStatus"
      />
      <theTable
          v-show="currentTab === AVERAGE"
          ref="theAverageTable"
          :averageData="averageData"
          :currentTab="currentTab"
          :tableLoading="tableLoading"
          :tableStatus="averageTableStatus"
          @handlePriceTableFinish="handlePriceTableFinish($event, currentTab)"
          @handleTableStatus="handleAverageTableStatus"
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
            :priceLatitudeOptions="priceLatitudeOptions"
        />
      </iCard>
      <!--      零件成本构成-->
      <iCard class="pieBox">
        <thePartsCostChart
            ref="thePartsCostChart"
            :currentTab="currentTab"
            :dataInfo="dataInfo"
            :averageData="averageData"
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
  checkName,
  getPiIndexWaveSelectList,
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
        fsId: '',
        rfqId: '',
      },
      dataInfo: {},
      averageData: {},
      CURRENTTIME,
      AVERAGE,
      tableLoading: false,
      timeRange: null,
      pieLoading: false,
      showPiChart: true,
      priceLatitudeOptions: [],
      tableStatus: '',
      averageTableStatus: '',
    };
  },
  created() {
    this.getDataInfo();
  },
  methods: {
    // 返回
    handleBack() {
      if (this.$store.state.rfq.entryStatus === 1) {
        this.$router.push({
          path: '/sourceinquirypoint/sourcing/partsrfq/assistant',
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
    // 预览
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
    // 关闭自定义零件
    handleCloseCustom() {
      this.customParams = {
        ...this.customParams,
        visible: false,
      };
    },
    // 保存自定义零件
    handleSaveCustom() {
      this.customParams = {
        ...this.customParams,
        visible: false,
      };
      this.getDataInfo();
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
            ...this.currentTabData,
            partsId: partListItem.partsId,
            batchNumber: partListItem.batchNumber,
            supplierId: partListItem.supplierId,
            fsId: partListItem.fsId,
            rfqId: partListItem.rfqId,
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
        ...this.currentTabData,
        partsId: item.partsId,
        batchNumber: item.batchNumber,
        supplierId: item.supplierId,
        fsId: item.fsId,
        rfqId: item.rfqId,
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
        } else {
          await this.getDataInfo({propsArrayLoading: ['tableLoading', 'pieLoading']});
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
    },
    // 获取信息
    async getDataInfo({propsArrayLoading = ['pageLoading', 'tableLoading', 'pieLoading']} = {}) {
      try {
        this.setLoading({propsArray: propsArrayLoading, boolean: true});
        const req = {
          ...this.currentTabData,
        };
        const res = await getAnalysisSchemeDetails(req);
        this.dataInfo = res.data;
        if (res.result) {
          this.currentTabData.partsId = res.data.partsId;
          this.currentTabData.batchNumber = res.data.batchNumber;
          this.currentTabData.supplierId = res.data.supplierId;
          this.currentTabData.analysisSchemeId = res.data.analysisSchemeId;
          this.currentTabData.fsId = res.data.fsId;
          this.currentTabData.rfqId = res.data.rfqId;
          this.partList = res.data.partsList.filter(item => {
            return item.isShow;
          });
          this.setPiIndexTimeParams(res.data.currentPartCostTotalVO);
          await Promise.all([this.getPiIndexWaveSelectList(), this.$refs.thePriceIndexChart.buildChart()]);
          this.$refs.thePartsCostChart.buildChart();
        } else {
          this.resultMessage(res);
        }
      } catch {
        this.$refs.theCurrentTable.tableListData = this.$refs.theCurrentTable.tableListData.map(item => {
          item.newRow = false;
          return item;
        });
      } finally {
        this.setLoading({propsArray: propsArrayLoading, boolean: false});
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
        await Promise.all([
          this.getPiIndexWaveSelectList(),
          this.$refs.thePriceIndexChart.buildChart(),
        ]);
        this.$refs.thePartsCostChart.buildChart();
      } catch {
        this.averageData = {};
      } finally {
        this.setLoading({propsArray: ['tableLoading', 'pieLoading'], boolean: false});
      }
    },
    // 处理保存弹窗
    async handleSaveDialog(reqParams) {
      const resCheckName = await this.checkName(reqParams);
      if (resCheckName) {
        this.saveDialog = false;
        iMessageBox(
            this.language('TPZS.CBGYCZSFFG', '此样式/报告已存在，是否覆盖？'),
            this.$t('LK_WENXINTISHI'),
            {confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO')},
        ).then(async () => {
          await this.handleSaveProcess(reqParams, true);
        }).catch(async () => {
          this.saveDialog = true;
        });
      } else {
        await this.handleSaveProcess(reqParams);
      }
    },
    // 处理保存请求
    async handleSaveProcess(reqParams, isCover = false) {
      try {
        this.pageLoading = true;
        const req = this.handleAllSaveReq(reqParams);
        req.isCover = isCover;
        if (reqParams.reportSave) {
          await this.handleSaveAsReport(async (downloadName, downloadUrl) => {
            req.downloadName = downloadName;
            req.downloadUrl = downloadUrl;
            const res = await saveAnalysisScheme(req);
            if (res.result) {
              await this.setTableEditStatus('');
              this.handleAddModelUrlChange();
            } else {
              this.handleTableSaveError();
            }
            this.saveDialog = false;
          });
        } else {
          const res = await saveAnalysisScheme(req);
          if (res.result) {
            await this.setTableEditStatus('');
            this.handleAddModelUrlChange();
          } else {
            this.handleTableSaveError();
          }
          this.saveDialog = false;
        }
      } finally {
        this.pageLoading = false;
      }
    },
    // 处理整页保存参数
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
      req.operateFlag = 'S2';
      req.inMode = this.$store.state.rfq.entryStatus;
      return req;
    },
    // 处理保存报告并导出 获取导出后的参数
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
    // 处理loading
    setLoading({propsArray, boolean}) {
      propsArray.map(item => {
        this[item] = boolean;
      });
    },
    // 设置piIndex图 时间参数
    setPiIndexTimeParams(data) {
      const copyPiIndexChartParams = _.cloneDeep(this.piIndexChartParams);
      copyPiIndexChartParams.beginTime = data.beginTime;
      copyPiIndexChartParams.endTime = data.endTime;
      this.$store.dispatch('setPiIndexChartParams', copyPiIndexChartParams);
    },
    //处理单独表格保存
    async handlePriceTableFinish(value, tab) {
      try {
        this.tableLoading = true;
        const req = {
          operateFlag: 'S1',
          inMode: this.$store.state.rfq.entryStatus,
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
        this.resultMessage(res, async () => {
          this.setTableEditStatus('');
          this.handleAddModelUrlChange();
          if (tab === CURRENTTIME) {
            await this.getDataInfo({propsArrayLoading: ['tableLoading', 'pieLoading']});
          } else if (tab === AVERAGE) {
            await this.getAverageData();
          }
        }, () => {
          this.setTableEditStatus('edit');
        });
      } catch {
        this.setTableEditStatus('edit');
      } finally {
        this.tableLoading = false;
      }
    },
    // 检查名字是否重复
    async checkName(reqParams) {
      let isRepeat = false;
      const req = {};
      if (reqParams.analysisSave && reqParams.reportSave) {
        req.analysisSchemeName = reqParams.analysisName;
        req.reportName = reqParams.reportName;
      } else if (reqParams.analysisSave) {
        req.analysisSchemeName = reqParams.analysisName;
      } else if (reqParams.reportSave) {
        req.reportName = reqParams.reportName;
      }
      const res = await checkName(req);
      if (res.data) {
        isRepeat = true;
      }
      return isRepeat;
    },
    // 设置表格编辑状态
    setTableEditStatus(boolean) {
      this.handleTableStatus(boolean);
      this.handleAverageTableStatus(boolean);
    },
    handleTableSaveError() {
      if (this.currentTab === CURRENTTIME && this.$refs.theCurrentTable.tableStatus === 'edit') {
        this.setTableEditStatus('edit');
      } else if (this.currentTab === AVERAGE && this.$refs.theAverageTable.tableStatus === 'edit') {
        this.setTableEditStatus('edit');
      }
    },
    // 曲线纬度下拉
    async getPiIndexWaveSelectList() {
      try {
        this.priceLatitudeOptions = [];
        const req = {
          ...this.currentTabData,
          type: this.currentTab === CURRENTTIME ? '1' : '2',
        };
        const res = await getPiIndexWaveSelectList(req);
        this.priceLatitudeOptions = res.data;
      } catch {
        this.priceLatitudeOptions = [];
      }
    },
    handleTableStatus(val) {
      this.tableStatus = val;
    },
    handleAverageTableStatus(val) {
      this.averageTableStatus = val;
    },
    handleAddModelUrlChange() {
      if (this.$route.query.batchNumber) {
        this.$router.push({
          path: '/sourcing/partsrfq/piAnalyseDetail',
          query: {
            schemeId: this.currentTabData.analysisSchemeId,
          },
        });
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
