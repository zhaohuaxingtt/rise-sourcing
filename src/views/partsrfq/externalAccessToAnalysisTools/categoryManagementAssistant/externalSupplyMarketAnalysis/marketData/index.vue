<template>
  <iCard id="allContainer" class="margin-top30">
    <div class="margin-bottom20 clearFloat">
      <span class="font22 font-weight">{{ language('PLGLZS.SHICHANGSHUJU', '市场数据') }}</span>
      <div class="floatright">
        <iButton @click="handleSearch">{{ language('LK_QUEREN', '确认') }}</iButton>
        <iButton @click="handleSave" :loading="saveButtonLoading">{{ language('LK_BAOCUN', '保存') }}</iButton>
        <iButton @click="handleBack">{{ language('LK_FANHUI', '返回') }}</iButton>
      </div>
    </div>
    <!--    导航条-->
    <theTabs @handleClick="handleTabsClick"/>
    <!--    搜索栏-->
    <theSearch :list="searchProps" v-if="showStatus" ref="theSearch"/>
    <div v-loading="chartBoxLoading" style="padding-top: 20px">
      <!--    数据页签栏-->
      <theDataTab :list="dataTabArray" v-if="showStatus" @handleDelete="handleDataTabDelete"/>
      <!--    echarts图表-->
      <theChart :chartData="chartData" v-if="showStatus && showChart" ref="theChart"/>
    </div>
  </iCard>
</template>

<script>
import {iCard, iButton} from 'rise';
import theTabs from './components/theTabs';
import theSearch from './components/theSearch';
import theDataTab from './components/theDataTab';
import theChart from './components/theChart';
import {
  rawMaterialSearch,
  manpowerSearch,
  energySearch,
  RAWMATERIAL,
  LABOUR,
  ENERGY,
} from './components/data';
import {
  getRawMaterialGroupSelectList,
  getrawMaterialGroupData,
  getRecentRawMaterialScheme,
  saveRawMaterialScheme,
  getLabourGroupSelectList,
  getLabourGroupData,
  getEnergyGroupSelectList,
  getEnergyGroupData,
} from '../../../../../../api/categoryManagementAssistant/marketData';
import {cloneDeep} from 'lodash';
import {dataURLtoFile, downloadPDF} from '@/utils/pdf';
import {uploadFile} from '@/api/file/upload';
import resultMessageMixin from '@/utils/resultMessageMixin';

export default {
  mixins: [resultMessageMixin],
  components: {
    iCard,
    iButton,
    theTabs,
    theSearch,
    theDataTab,
    theChart,
  },
  data() {
    return {
      current: RAWMATERIAL,
      searchProps: rawMaterialSearch,
      dataTabArray: [],
      showStatus: true,
      showChart: true,
      chartData: {},
      chartBoxLoading: false,
      saveButtonLoading: false,
      categoryCode: '123',
    };
  },
  async created() {
    await this.getSearchProps({type: RAWMATERIAL});
    await this.getChartGroupData({type: RAWMATERIAL});
  },
  methods: {
    handleTabsClick(val) {
      this.current = val;
      this.showStatus = false;
      this.$nextTick(() => {
        this.showStatus = true;
        this.handleTabsChange(val);
      });
    },
    async handleTabsChange(val) {
      this.chartBoxLoading = true;
      switch (val) {
        case RAWMATERIAL:
          this.searchProps = rawMaterialSearch;
          await this.getSearchProps({type: RAWMATERIAL});
          await this.getChartGroupData({type: RAWMATERIAL});
          break;
        case LABOUR:
          this.searchProps = manpowerSearch;
          await this.getSearchProps({type: LABOUR});
          await this.getChartGroupData({type: LABOUR});
          break;
        case ENERGY:
          this.searchProps = energySearch;
          await this.getSearchProps({type: ENERGY});
          await this.getChartGroupData({type: ENERGY});
          break;
      }
      this.chartBoxLoading = false;
    },
    // 搜索
    handleSearch() {
      switch (this.current) {
        case RAWMATERIAL:
          this.getChartGroupData({type: RAWMATERIAL});
          break;
        case LABOUR:
          this.getChartGroupData({type: LABOUR});
          break;
        case ENERGY:
          this.getChartGroupData({type: ENERGY});
          break;
      }
    },
    // 设置搜索框
    setSearchProps(data) {
      this.searchProps = this.searchProps.map(item => {
        switch (item.props) {
          case 'classTypeList':
            item.options = data.classTypeList;
            break;
          case 'specsList':
            item.options = data.specsList;
            break;
          case 'professionList':
            item.options = data.professionList;
            break;
          case 'productNameList':
            item.options = data.productNameList;
            break;
          case 'marketNameList':
            item.options = data.marketNameList;
            break;
          case 'priceTypeList':
            item.options = data.priceTypeList;
            break;
          case 'unitList':
            item.options = data.unitList;
            break;
          case 'areaList':
            item.options = data.areaList;
            break;
          case 'dataSourceList':
            item.options = data.dataSourceList;
            if (data.dataSourceList.length !== 0) {
              this.$refs.theSearch.form.dataSourceList = data.dataSourceList[0];
            }
            break;
        }
        return item;
      });
    },
    // 获取搜索框参数
    getSearchForm() {
      const form = cloneDeep(this.$refs.theSearch.form);
      if (form.rangeDate && Array.isArray(form.rangeDate)) {
        form['startDate'] = form.rangeDate[0];
        form['endDate'] = form.rangeDate[1];
        delete form.rangeDate;
      }
      form.dataSourceList = [form.dataSourceList];
      return form;
    },
    // 获取数据页签
    getDataTabArray(data) {
      if (data.resultList) {
        this.dataTabArray = data.resultList.map(item => {
          return item.dataType;
        });
      }
    },
    // 删除数据页签
    handleDataTabDelete(val) {
      this.chartData.resultList = this.chartData.resultList.filter(item => {
        return item['dataType'] !== val;
      });
      this.dataTabArray = this.dataTabArray.filter(item => {
        return item !== val;
      });
      this.showChart = false;
      this.$nextTick(() => {
        this.showChart = true;
      });
    },
    // 通过接口获取搜索下拉
    async getSearchProps({type}) {
      let res = '';
      switch (type) {
        case RAWMATERIAL:
          res = await getRawMaterialGroupSelectList();
          break;
        case LABOUR:
          res = await getLabourGroupSelectList();
          break;
        case ENERGY:
          res = await getEnergyGroupSelectList();
          break;
      }
      const data = res.data;
      this.setSearchProps(data);
      const resRecent = await this.getRecentSearchData();
      this.setRecentSearchData(resRecent);
    },
    // 获取图表数据
    async getChartGroupData({type}) {
      try {
        let res = '';
        let resultList = '';
        this.chartData = {};
        this.dataTabArray = [];
        this.chartBoxLoading = true;
        const form = this.getSearchForm();
        switch (type) {
          case RAWMATERIAL:
            res = await getrawMaterialGroupData(form);
            this.setDataTypeDefault({resultList: res.data.resultList, formProps: 'classTypeList'});
            break;
          case LABOUR:
            res = await getLabourGroupData(form);
            this.setDataTypeDefault({resultList: res.data.resultList, formProps: 'professionList'});
            break;
          case ENERGY:
            res = await getEnergyGroupData(form);
            this.setDataTypeDefault({resultList: res.data.resultList, formProps: 'productNameList'});
            break;
        }
        this.getDataTabArray(res.data);
        this.chartData = res.data;
        this.chartBoxLoading = false;
      } catch {
        this.chartData = {};
        this.dataTabArray = [];
        this.chartBoxLoading = false;
      }
    },
    setDataTypeDefault({resultList, formProps}) {
      if (Array.isArray(resultList) && resultList.length > 0) {
        this.$refs.theSearch.form[formProps] = resultList.map(item => {
          return item.dataType;
        });
      }
    },
    getDownloadFile() {
      return new Promise((resolve => {
        downloadPDF({
          idEle: 'allContainer',
          pdfName: 'market data',
          callback: async (pdf, pdfName) => {
            const time = new Date().getTime();
            const filename = pdfName + time + '.pdf';
            const pdfFile = pdf.output('datauristring');
            const blob = dataURLtoFile(pdfFile, filename);
            const formData = new FormData();
            formData.append('multipartFile', blob);
            formData.append('applicationName', 'rise');
            const res = await uploadFile(formData);
            const data = res.data[0];
            const req = {
              downloadName: data.fileName,
              downloadUrl: data.filePath,
            };
            resolve(req);
          },
        });
      }));
    },
    // 处理保存
    async handleSave() {
      this.saveButtonLoading = true;
      const resFile = await this.getDownloadFile();
      const req = {
        categoryCode: this.categoryCode,
        reportFileName: resFile.downloadName,
        reportName: resFile.downloadName,
        reportUrl: resFile.downloadUrl,
        rawMaterialGroupDataDTO: this.getSearchForm(),
      };
      let res = '';
      switch (this.current) {
        case RAWMATERIAL:
          res = await saveRawMaterialScheme(req);
          break;
      }
      this.resultMessage(res);
      this.saveButtonLoading = false;
    },
    // 获取最近搜索参数
    async getRecentSearchData() {
      let res = '';
      const req = {
        categoryCode: this.categoryCode,
      };
      switch (this.current) {
        case RAWMATERIAL:
          res = await getRecentRawMaterialScheme(req);
          return res.data.rawMaterialQueryDTO;
      }
    },
    // 设置最近搜索参数
    setRecentSearchData(data) {
      const copyData = cloneDeep(data);
      if (copyData.startDate && copyData.endDate) {
        copyData.rangeDate = [copyData.startDate, copyData.endDate];
        delete copyData.startDate;
        delete copyData.endDate;
      }
      if (Array.isArray(copyData.dataSourceList) && copyData.dataSourceList.length > 0) {
        copyData.dataSourceList = copyData.dataSourceList[0];
      }
      this.$refs.theSearch.form = copyData;
    },
    handleBack() {
      this.$router.push({
        path: '/sourcing/categoryManagementAssistant/externalSupplyMarketAnalysis/overView',
      });
    },
  },
};
</script>

<style scoped>

</style>
