<template>
  <iCard id="allContainer" class="margin-top30">
    <div class="margin-bottom20 clearFloat">
      <span class="font22 font-weight">{{ language('PLGLZS.SHICHANGSHUJU', '市场数据') }}</span>
      <div class="floatright" v-if="!isExporting">
        <iButton @click="handleSearch">{{ language('LK_QUEREN', '确认') }}</iButton>
        <iButton @click="handleSave" :loading="saveButtonLoading">{{ language('LK_BAOCUN', '保存') }}</iButton>
        <iButton @click="handleBack">{{ language('LK_FANHUI', '返回') }}</iButton>
      </div>
    </div>
    <!--    导航条-->
    <theTabs @handleClick="handleTabsClick"/>
    <!--    搜索栏-->
    <theSearch
        v-if="showStatus"
        ref="theSearch"
        :list="searchProps"
        @handleSelectSearch="handleSelectSearch"
    />
    <div v-loading="chartBoxLoading" style="padding-top: 20px">
      <!--    数据页签栏-->
      <theDataTab :list="dataTabArray" v-if="showStatus" @handleDelete="handleDataTabDelete"/>
      <!--    echarts图表-->
      <theChart :chartData="chartData" v-if="showStatus && showChart" ref="theChart"/>
    </div>
  </iCard>
</template>

<script>
import {iCard, iButton, iMessageBox} from 'rise';
import theTabs from './components/theTabs';
import theSearch from './components/theSearch';
import theDataTab from './components/theDataTab';
import theChart from './components/theChart';
import {
  rawMaterialSearch,
  manpowerSearch,
  RAWMATERIAL,
  LABOUR,
  ENERGY,
} from './components/data';
import {
  //原材料
  getRawMaterialGroupSelectList,
  getrawMaterialGroupData,
  getRecentRawMaterialScheme,
  saveRawMaterialScheme,
  //劳动力
  getLabourGroupSelectList,
  getLabourGroupData,
  getRecentLabourScheme,
  saveLabourScheme,
  //能源
  getEnergyGroupSelectList,
  getEnergyGroupData,
  getRecentEnergyScheme,
  saveEnergyScheme,
} from '../../../../../../api/categoryManagementAssistant/marketData';
import {cloneDeep} from 'lodash';
import {downloadPdfMixins} from '@/utils/pdf';
import resultMessageMixin from '@/utils/resultMessageMixin';

export default {
  mixins: [resultMessageMixin, downloadPdfMixins],
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
      categoryCode: this.$store.state.rfq.categoryCode,
      copySearchProps: {},
      isExporting: false,
      categoryName: this.$store.state.rfq.categoryName,
    };
  },
  async created() {
    this.setCascaderProps();
    await this.getSearchProps({type: RAWMATERIAL});
    await this.getChartGroupData({type: RAWMATERIAL});
  },
  methods: {
    handleTabsClick(val) {
      this.current = val;
      this.setCascaderProps();
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
          this.searchProps = rawMaterialSearch;
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
          case 'classTypeSpecsArea':
            item.options = data.classTypeList.map(item => {
              return {
                label: item,
                value: item,
              };
            });
            break;
          case 'professionList':
            item.options = data.professionList.map(item => {
              return {
                name: item,
              };
            });
            break;
          case 'areaList':
            item.options = data.areaList.map(item => {
              return {
                name: item,
              };
            });
            break;
          case 'dataSource':
            item.options = data.dataSourceList;
            break;
        }
        return item;
      });
    },
    // 获取搜索框参数
    getSearchForm() {
      const form = cloneDeep(this.$refs.theSearch.form);
      if (form.classTypeSpecsArea && Array.isArray(form.classTypeSpecsArea)) {
        form.classTypeSpecsAreaList = form.classTypeSpecsArea.map(item => {
          return {
            classType: item?.[0],
            specs: item?.[1],
            area: item?.[2],
          };
        });
      }
      if (form.areaList && Array.isArray(form.areaList)) {
        form.areaList = form.areaList.map(item => {
          return item.name;
        });
      }
      if (form.professionList && Array.isArray(form.professionList)) {
        form.professionList = form.professionList.map(item => {
          return item.name;
        });
      }
      if (form.rangeDate && Array.isArray(form.rangeDate)) {
        form['startDate'] = form.rangeDate[0];
        form['endDate'] = form.rangeDate[1];
        delete form.rangeDate;
      }
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
      let req = {};
      switch (type) {
        case RAWMATERIAL:
          res = await getRawMaterialGroupSelectList(req);
          break;
        case LABOUR:
          res = await getLabourGroupSelectList();
          break;
        case ENERGY:
          res = await getEnergyGroupSelectList(req);
          break;
      }
      const data = res.data;
      this.copySearchProps = cloneDeep(data);
      this.setSearchProps(data);
      const resRecent = await this.getRecentSearchData();
      this.setRecentSearchData(resRecent);
    },
    // 获取图表数据
    async getChartGroupData({type}) {
      try {
        let res = '';
        this.chartData = {};
        this.dataTabArray = [];
        this.chartBoxLoading = true;
        const form = this.getSearchForm();
        switch (type) {
          case RAWMATERIAL:
            res = await getrawMaterialGroupData(form);
            if (res.result) {
              this.setDataTypeDefault({resultList: res.data.resultList, formProps: 'classTypeSpecsArea'});
            }
            break;
          case LABOUR:
            res = await getLabourGroupData(form);
            if (res.result) {
              this.setDataTypeDefault({resultList: res.data.resultList, formProps: 'professionList'});
            }
            break;
          case ENERGY:
            res = await getEnergyGroupData(form);
            if (res.result) {
              this.setDataTypeDefault({resultList: res.data.resultList, formProps: 'classTypeSpecsArea'});
            }
            break;
        }
        if (!res.result) {
          const message = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
          iMessageBox(
              message,
              this.language('PLGLZS.TISHI', '提示'),
              {confirmButtonText: this.$t('LK_QUEDING'), showCancelButton: false},
          );
        }
        this.$nextTick(() => {
          this.getDataTabArray(res.data);
          this.chartData = res.data;
          this.chartBoxLoading = false;
        });
      } catch {
        this.chartData = {};
        this.dataTabArray = [];
      } finally {
        this.chartBoxLoading = false;
      }
    },
    setDataTypeDefault({resultList, formProps}) {
      if (this.current === LABOUR) {
        if (Array.isArray(resultList) && resultList.length > 0) {
          this.$refs.theSearch.form[formProps] = resultList.map(item => {
            return {name: item.dataType};
          });
        }
      } else {
        if (Array.isArray(resultList) && resultList.length > 0) {
          this.$refs.theSearch.form[formProps] = resultList.map(item => {
            const dataType = item.dataType.split('-');
            return [dataType[0], dataType[1], dataType[2]];
          });
        }
      }
    },
    // 处理保存
    async handleSave() {
      this.saveButtonLoading = true;
      this.isExporting = true;
      this.$nextTick(async () => {
        const pdfName = `品类管理助手-市场数据-${this.getCurrentName()}-${this.categoryName}-${window.moment().format('YYYY-MM-DD')}|`;
        const resFile = await this.getDownloadFileAndExportPdf({
          domId: 'allContainer',
          pdfName,
          exportPdf: true,
          callBack: () => {
            this.isExporting = false;
          },
        });
        const req = {
          categoryCode: this.categoryCode,
          reportFileName: resFile.downloadName,
          reportName: resFile.downloadName,
          reportUrl: resFile.downloadUrl,
        };
        let res = '';
        switch (this.current) {
          case RAWMATERIAL:
            req.rawMaterialGroupDataDTO = this.getSearchForm();
            res = await saveRawMaterialScheme(req);
            break;
          case LABOUR:
            req.labourGroupDataDTO = this.getSearchForm();
            res = await saveLabourScheme(req);
            break;
          case ENERGY:
            req.energyGroupDataDTO = this.getSearchForm();
            res = await saveEnergyScheme(req);
            break;
        }
        this.resultMessage(res);
        this.saveButtonLoading = false;
      });
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
        case LABOUR:
          res = await getRecentLabourScheme(req);
          return res.data.labourQueryDTO;
        case ENERGY:
          res = await getRecentEnergyScheme(req);
          return res.data.energyQueryDTO;
      }
    },
    // 设置最近搜索参数
    setRecentSearchData(data) {
      const copyData = cloneDeep(data);
      if (data) {
        if (copyData.classTypeSpecsAreaList && Array.isArray(copyData.classTypeSpecsAreaList)) {
          copyData.classTypeSpecsArea = copyData.classTypeSpecsAreaList.map(item => {
            return [item.classType, item.specs, item.area];
          });
        }
        if (copyData.areaList && Array.isArray(copyData.areaList)) {
          copyData.areaList = copyData.areaList.map(item => {
            return {name: item};
          });
        }
        if (copyData.professionList && Array.isArray(copyData.professionList)) {
          copyData.professionList = copyData.professionList.map(item => {
            return {name: item};
          });
        }
        if (copyData.startDate && copyData.endDate) {
          copyData.rangeDate = [copyData.startDate, copyData.endDate];
          delete copyData.startDate;
          delete copyData.endDate;
        }
        this.$refs.theSearch.form = copyData;
      }
    },
    handleBack() {
      this.$router.push({
        path: '/sourcing/categoryManagementAssistant/externalSupplyMarketAnalysis/overView',
      });
    },
    handleSelectSearch({value, props}) {
      let list = [];
      const copyTwiceSearchProps = window._.cloneDeep(this.copySearchProps);
      list = copyTwiceSearchProps[props].filter(item => {
        return item.toLowerCase().indexOf(value.toLowerCase()) > -1;
      });
      copyTwiceSearchProps[props] = list;
      this.setSearchProps(copyTwiceSearchProps);
    },
    // 设置级联props
    setCascaderProps() {
      const _this = this;
      switch (this.current) {
        case RAWMATERIAL:
          this.searchProps = this.searchProps.map(item => {
            if (item.props === 'classTypeSpecsArea') {
              item.cascaderProps = {
                multiple: true,
                lazy: true,
                lazyLoad(node, resolve) {
                  _this.classTypeSpecsAreaLoad(node, resolve, getRawMaterialGroupSelectList);
                },
              };
            }
            return item;
          });
          break;
        case ENERGY:
          this.searchProps = this.searchProps.map(item => {
            if (item.props === 'classTypeSpecsArea') {
              item.cascaderProps = {
                multiple: true,
                lazy: true,
                lazyLoad(node, resolve) {
                  _this.classTypeSpecsAreaLoad(node, resolve, getEnergyGroupSelectList);
                },
              };
            }
            return item;
          });
          break;
      }
    },
    async classTypeSpecsAreaLoad(node, resolve, func) {
      const {level} = node;
      if (level === 1) {
        const req = {
          classTypeList: [node.value],
        };
        const res = await func(req);
        const nodes = res.data.specsList.map(val => ({
          value: val,
          label: val,
          leaf: level >= 2,
        }));
        resolve(nodes);
      } else if (level === 2) {
        const req = {
          classTypeList: [node.parent.value],
          specsList: [node.value],
        };
        const res = await func(req);
        const nodes = res.data.areaList.map(val => ({
          value: val,
          label: val,
          leaf: level >= 2,
        }));
        resolve(nodes);
      } else {
        resolve([]);
      }
    },
    getCurrentName() {
      switch (this.current) {
        case RAWMATERIAL:
          return '原材料';
        case LABOUR:
          return '劳动力';
        case ENERGY:
          return '能源';
        default:
          return '';
      }
    },
  },
  watch: {
    '$store.state.rfq.categoryName'() {
      this.categoryName = this.$store.state.rfq.categoryName;
    },
  },
};
</script>

<style scoped>

</style>

