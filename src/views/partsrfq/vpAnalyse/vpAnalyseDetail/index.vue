<!--
 * @Author: moxuan
 * @LastEditors: zbin
 * @Description: VP分析详情
-->
<template>
  <iPage v-loading="pageLoading">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">Volume Pricing{{ $t('TPZS.FENXI') }}</span>
      <div class="floatright">
        <!--返回-->
        <iButton @click="handleBack">{{ $t('LK_FANHUI') }}</iButton>
        <!--预览-->
        <iButton @click="handlePreview">{{ $t('TPZS.YULAN') }}</iButton>
        <!--保存-->
        <iButton @click="() => saveDialog = true">{{ $t('LK_BAOCUN') }}</iButton>
      </div>
    </div>
    <div class="partBox margin-bottom20">
      <div class="partItemContainer">
        <div class="partItem"
             v-for="(item,index) of partList"
             :key="item"
             :class="{'partItemActive': partItemCurrent === index}"
             @click="handlePartItemClick(item ,index)"
        >
          <div class="quxiaoIconBox" @click="handlePartItemClose($event,item)">
            <icon symbol
                  name="iconrs-quxiao"
                  class="quxiaoIcon"
                  v-if="partItemCurrent === index && partList.length > 1 "
            />
          </div>
          {{ item.partsId }}
        </div>
      </div>
      <!--      自定义图标-->
      <div class="customBox" @click="handleOpenCustomDialog">
        <icon symbol name="iconzidingyi" class="customIcon"/>
      </div>
    </div>
    <!--信息-->
    <iCard tabCard class="margin-bottom20">
      <baseInfo :dataInfo="dataInfo" @handleSupplierChange="handleSupplierChange"/>
    </iCard>
    <!--总单价表格-->
    <iCard tabCard class="margin-bottom20">
      <totalUnitPriceTable
          :dataInfo="dataInfo"
          ref="totalUnitPriceTable"
          @handlePriceTableFinish="saveOrUpdateScheme('table')"
          :tableLoading="tableLoading"
      />
    </iCard>

    <!--图形-->
    <div class="chartBox">
      <iCard class="curveBox" :title="'Volume Pricing' + $t('TPZS.QUXIAN')">
        <curveChart
            chartHeight="260px"
            :newestScatterData="curveChartData.newestScatterData"
            :targetScatterData="curveChartData.targetScatterData"
            :cpLineData="curveChartData.cpLineData"
            :lineData="curveChartData.lineData"
            :dataInfo="dataInfo"
        />
      </iCard>

      <iCard class="analyzeBox" v-loading="analyzeLoading">
        <div class="margin-bottom20 clearFloat">
          <span class="font18 font-weight">Volume Pricing{{ $t('TPZS.FENXI') }}</span>
          <div class="floatright">
            <!--保存-->
            <iButton @click="saveOrUpdateScheme('analyze')">{{ $t('LK_BAOCUN') }}</iButton>
          </div>
        </div>
        <analyzeChart ref="analyzeChart" :dataInfo="dataInfo"/>
      </iCard>
    </div>

    <!-- 自定义零件列表 -->
    <customPart v-if="customDialog.visible" :partList="originPartList" :visible="customDialog.visible"
                :Key="customDialog.key" @saveCustomPart="saveCustomPart"
                @handleCloseCustomPart="handleCloseCustomPart"/>

    <previewDialog
        ref="previewDialog"
        v-model="previewDialog"
        :dataInfo="dataInfo"
        :newestScatterData="curveChartData.newestScatterData"
        :targetScatterData="curveChartData.targetScatterData"
        :cpLineData="curveChartData.cpLineData"
        :lineData="curveChartData.lineData"
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
import {iPage, iButton, icon, iCard, iMessageBox} from 'rise';
import baseInfo from './components/baseInfo';
import totalUnitPriceTable from './components/totalUnitPriceTable';
import curveChart from './components/curveChart';
import analyzeChart from './components/analyzeChart';
import customPart from './components/customPart';
import previewDialog from './components/previewDialog';
import {
  getAnalysisProcessing,
  saveOrUpdateScheme,
  deletePartsCustomerList,
  checkName,
} from '../../../../api/partsrfq/vpAnalysis/vpAnalyseDetail';
import resultMessageMixin from '@/utils/resultMessageMixin';
import saveDialog from './components/saveDialog';
import {deleteThousands} from '@/utils';

export default {
  mixins: [resultMessageMixin],
  components: {
    iPage,
    iButton,
    baseInfo,
    totalUnitPriceTable,
    icon,
    iCard,
    curveChart,
    analyzeChart,
    customPart,
    previewDialog,
    saveDialog,
  },
  created() {
    this.getDataInfo();
  },
  data() {
    return {
      partList: [],
      originPartList: [],
      partItemCurrent: 0,
      currentBatchNumber: '',
      currentPartsId: '',
      customDialog: {
        key: 0,
        visible: false,
      },
      dataInfo: {},
      previewDialog: false,
      pageLoading: false,
      curveChartData: {
        newestScatterData: [],
        targetScatterData: [],
        lineData: [],
        cpLineData: [],
      },
      analyzeLoading: false,
      currentSupplierId: '',
      saveDialog: false,
      currentSchemeId: this.$route.query.schemeId,
      tableLoading: false,
    };
  },
  methods: {
    handlePartItemClick(item, index) {
      this.partItemCurrent = index;
      this.currentBatchNumber = item.batchNumber;
      this.currentPartsId = item.partsId;
      this.currentSupplierId = item.supplierId;
      this.currentSchemeId = item.analysisSchemeId;
      this.getDataInfo();
    },
    handlePartItemClose(e, item) {
      e.stopPropagation();
      iMessageBox(
          this.$t('LK_SHIFOUQUERENSHANCHU'),
          this.$t('LK_WENXINTISHI'),
          {confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO')},
      ).then(async () => {
        const req = {
          id: item.id,
        };
        const res = await deletePartsCustomerList(req);
        if (res.result) {
          this.partItemCurrent = 0;
          this.currentBatchNumber = this.partList[0].batchNumber;
          this.currentPartsId = this.partList[0].partsId;
          this.getDataInfo();
        }
        this.resultMessage(res);
      });
    },
    //点击跳转自定义零件弹窗
    handleOpenCustomDialog() {
      this.customDialog.key = new Date().getTime();
      this.customDialog.visible = true;
    },
    async getDataInfo() {
      try {
        this.pageLoading = true;
        this.analyzeLoading = true;
        this.tableLoading = true;
        let req = {
          partsId: this.currentPartsId,
          supplierId: this.currentSupplierId,
          inMode: this.$store.state.rfq.entryStatus,
        };
        if (this.$route.query.type === 'edit') {
          req.id = this.currentSchemeId;
        }
        req.batchNumber = this.currentBatchNumber;
        if (this.$route.query.type === 'add') {
          req.batchNumber = this.$route.query.batchNumber;
        }
        const res = await getAnalysisProcessing(req);
        this.dataInfo = res.data;
        this.originPartList = res.data.partsList;
        this.partList = res.data.partsList.filter(item => {
          return item.isShow;
        });
        this.currentPartsId = this.partList[0] ? this.partList[0].partsId : '';
        this.currentBatchNumber = this.partList[0] ? this.partList[0].batchNumber : '';
        this.currentSupplierId = res.data.supplierId;
        const analysisCurveData = Array.isArray(this.dataInfo.analysisCurve) ? this.dataInfo.analysisCurve : [];
        this.handleCurveData(analysisCurveData);
        this.pageLoading = false;
        this.analyzeLoading = false;
        this.tableLoading = false;
      } catch {
        this.dataInfo = {};
        this.pageLoading = false;
        this.analyzeLoading = false;
        this.tableLoading = false;
      }
    },
    async saveOrUpdateScheme(params, extraParams = {}) {
      //this.saveDialog = true;
      try {
        const req = {
          ...this.dataInfo,
          userId: this.$store.state.permission.userInfo.id,
          partsId: this.currentPartsId,
          supplierId: this.currentSupplierId,
          batchNumber: this.currentBatchNumber,
          partsList: [this.partList[this.partItemCurrent]],
          inMode: this.$store.state.rfq.entryStatus,
          ...extraParams,
        };
        if (this.$route.query.type === 'edit') {
          req.id = this.currentSchemeId;
        }
        if (req.supplierId) {
          this.dataInfo.supplierList.map(item => {
            if (item.supplierId === req.supplierId) {
              req.supplierName = item.supplierName;
            }
          });
        }
        if (params === 'all') {
          this.pageLoading = true;
          req.operationFlag = 'S3';
        } else if (params === 'analyze') {
          this.analyzeLoading = true;
          req.operationFlag = 'S1';
        } else if (params === 'table') {
          this.tableLoading = true;
          req.operationFlag = 'S2';
        }
        req.costDetailList = this.$refs.totalUnitPriceTable.tableListData.concat(
            this.$refs.totalUnitPriceTable.hideTableData);
        req.estimatedActualTotalPro = deleteThousands(this.$refs.analyzeChart.dropPotential.estimatedActualTotalPro);
        const res = await saveOrUpdateScheme(req);
        this.resultMessage(res, () => {
          this.currentSchemeId = res.data;
        });
        if (res.result) {
          if (this.$route.query.type === 'add') {
            this.$router.push({
              path: '/sourcing/partsrfq/vpAnalyseDetail',
              query: {
                type: 'edit',
                schemeId: res.data,
                round: this.$route.query.round,
              },
            });
          } else {
            await this.getDataInfo();
          }
        } else {
          await this.getDataInfo();
        }
        this.pageLoading = false;
        this.analyzeLoading = false;
        this.tableLoading = false;
      } catch {
        this.pageLoading = false;
        this.analyzeLoading = false;
        this.tableLoading = false;
      }
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
          this.saveDialog = true
        });
      } else {
        await this.handleSaveProcess(reqParams);
      }
    },
    async handleSaveProcess(reqParams, isCover = false) {
      const req = {
        isCover,
      };
      if (reqParams.analysisSave && reqParams.reportSave) {
        req.analysisSchemeName = reqParams.analysisName;
        req.reportName = reqParams.reportName;
      } else if (reqParams.analysisSave) {
        req.analysisSchemeName = reqParams.analysisName;
      } else if (reqParams.reportSave) {
        req.reportName = reqParams.reportName;
      }
      if (reqParams.reportSave) {
        await this.handleSaveAsReport(async (downloadName, downloadUrl) => {
          req.downloadName = downloadName;
          req.downloadUrl = downloadUrl;
          await this.saveOrUpdateScheme('all', req);
          this.saveDialog = false;
        });
      } else {
        await this.saveOrUpdateScheme('all', req);
        this.saveDialog = false;
      }
    },
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
    handlePreview() {
      this.previewDialog = true;
    },
    handleCurveData(data) {
      this.curveChartData.newestScatterData = [];
      this.curveChartData.targetScatterData = [];
      this.curveChartData.lineData = [];
      this.curveChartData.cpLineData = [];
      data.map(item => {
        if (item.priceFlag === 'LP') {
          this.curveChartData.newestScatterData.push([item.production, item.price]);
          this.curveChartData.lineData.push([item.production, item.price]);
        } else if (item.priceFlag === 'TP') {
          this.curveChartData.targetScatterData.push([item.production, item.price]);
          this.curveChartData.lineData.push([item.production, item.price]);
        } else if (item.priceFlag === 'CP') {
          this.curveChartData.cpLineData = [item.production, item.price];
        } else {
          this.curveChartData.lineData.push([item.production, item.price]);
        }
      });
    },
    // 保存自定义零件
    saveCustomPart() {
      this.$set(this.customDialog, 'visible', false);
      this.getDataInfo();
    },
    // 关闭自定义零件弹窗
    handleCloseCustomPart() {
      this.$set(this.customDialog, 'visible', false);
    },
    //供应商值改变
    handleSupplierChange(val) {
      this.currentSupplierId = val;
      this.getDataInfo();
    },
    handleBack() {
      const type = this.$route.query.type;
      if (type === 'edit') {
        if (this.$store.state.rfq.entryStatus === 1) {
          this.$router.push({
            path: '/sourceinquirypoint/sourcing/partsrfq/assistant',
            query: {
              id: this.$store.state.rfq.rfqId,
              round: this.$route.query.round,
              pageType: 'VP',
              activityTabIndex: 'two',
            },
          });
        } else {
          this.$router.push({
            path: '/sourcing/partsrfq/externalNegotiationAssistant',
            query: {
              pageType: 'VP',
            },
          });
        }
      } else if (type === 'add') {
        this.$router.push({
          path: '/sourcing/partsrfq/vpAnalyCreat',
        });
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.partBox {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .partItemContainer {
    display: flex;

    .partItem {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 30px;
      height: 35px;
      padding: 9px 15px;
      background: #FFFFFF;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      color: #000000;
      cursor: pointer;

      .quxiaoIconBox {
        position: absolute;
        right: -10px;
        top: -10px;
      }

      .quxiaoIcon {
        font-size: 20px;
      }
    }

    .partItemActive {
      color: #1763F7;
    }
  }

  .customBox {
    .customIcon {
      cursor: pointer;
      font-size: 20px;
    }
  }
}

.chartBox {
  display: flex;
  justify-content: space-between;
  height: 390px;

  .curveBox {
    width: 42%;
    height: 100%
  }

  .analyzeBox {
    width: 57%;
    height: 100%
  }
}
</style>
