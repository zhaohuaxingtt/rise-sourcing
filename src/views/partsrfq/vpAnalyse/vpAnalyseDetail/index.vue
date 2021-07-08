<!--
 * @Author: moxuan
 * @LastEditors: Please set LastEditors
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
        <iButton @click="saveOrUpdateScheme('all')">{{ $t('LK_BAOCUN') }}</iButton>
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
      <totalUnitPriceTable :dataInfo="dataInfo" ref="totalUnitPriceTable"/>
    </iCard>

    <!--图形-->
    <div class="chartBox">
      <iCard class="curveBox" :title="'Volume Pricing' + $t('TPZS.QUXIAN')">
        <curveChart
            chartHeight="260px"
            :newestScatterData="curveChartData.newestScatterData"
            :targetScatterData="curveChartData.targetScatterData"
            :lineData="curveChartData.lineData"
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
    <customPart v-if="customDialog.visible" :partList="originPartList" :visible="customDialog.visible" :Key="customDialog.key" @saveCustomPart="saveCustomPart"/>

    <previewDialog v-model="previewDialog"/>
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
} from '../../../../api/partsrfq/vpAnalysis/vpAnalyseDetail';
import resultMessageMixin from '@/utils/resultMessageMixin';

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
      },
      analyzeLoading: false,
      currentSupplierId: '1'
    };
  },
  methods: {
    handlePartItemClick(item, index) {
      this.partItemCurrent = index;
      this.currentBatchNumber = item.batchNumber;
      this.currentPartsId = item.id;
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
          this.currentPartsId = this.partList[0].id;
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
        let req = {
          partsId: this.currentPartsId,
          supplierId: this.currentSupplierId,
        };
        if (this.$route.query.type === 'edit') {
          req.id = this.$route.query.schemeId;
        }
        req.batchNumber = this.currentBatchNumber;
        if (this.$route.query.type === 'add') {
          req.batchNumber = this.$route.query.batchNumber;
        }
        const res = await getAnalysisProcessing(req);
        this.dataInfo = res.data;
        this.originPartList = res.data.partsList
        this.partList = res.data.partsList.filter(item => {
          return item.isShow;
        });
        this.currentPartsId = this.partList[0] ? this.partList[0].id : '';
        this.currentBatchNumber = this.partList[0] ? this.partList[0].batchNumber : '';
        const analysisCurveData = Array.isArray(this.dataInfo.analysisCurve) ? this.dataInfo.analysisCurve : [];
        this.handleCurveData(analysisCurveData);
        this.pageLoading = false;
      } catch {
        this.dataInfo = {};
        this.pageLoading = false;
      }
    },
    async saveOrUpdateScheme(params) {
      try {
        const req = {
          userId: this.$store.state.permission.userInfo.id,
          partsId: this.currentPartsId,
          supplierId: this.currentSupplierId,
          batchNumber: this.currentBatchNumber,
          partsList: [this.partList[this.partItemCurrent]]
        };
        if (this.$route.query.type === 'edit') {
          req.id = this.$route.query.schemeId;
        }
        if (params === 'all') {
          this.pageLoading = true;
          req.costDetailList = this.$refs.totalUnitPriceTable.tableListData.concat(this.$refs.totalUnitPriceTable.hideTableData);
          req.estimatedActualTotalPro = this.$refs.analyzeChart.dataInfo.estimatedActualTotalPro;
        } else if (params === 'analyze') {
          this.analyzeLoading = true;
          req.estimatedActualTotalPro = this.$refs.analyzeChart.dataInfo.estimatedActualTotalPro;
        }
        const res = await saveOrUpdateScheme(req);
        this.resultMessage(res);
        this.pageLoading = false;
        this.analyzeLoading = false;
      } catch {
        this.pageLoading = false;
        this.analyzeLoading = false;
      }
    },
    handlePreview() {
      this.previewDialog = true;
    },
    handleCurveData(data) {
      this.curveChartData.newestScatterData = [];
      this.curveChartData.targetScatterData = [];
      this.curveChartData.lineData = [];
      data.map(item => {
        if (item.priceFlag === 'LP') {
          this.curveChartData.newestScatterData.push([item.production, item.price]);
          this.curveChartData.lineData.push([item.production, item.price]);
        } else if (item.priceFlag === 'TP') {
          this.curveChartData.targetScatterData.push([item.production, item.price]);
          this.curveChartData.lineData.push([item.production, item.price]);
        } else {
          this.curveChartData.lineData.push([item.production, item.price]);
        }
      });
    },
    // 保存自定义零件
    saveCustomPart() {
      this.$set(this.customDialog, 'visible', false)
      this.getDataInfo()
    },
    //供应商值改变
    handleSupplierChange(val) {
      this.currentSupplierId = val
      this.getDataInfo()
    },
    handleBack() {
      this.$router.go(-1)
    }
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
