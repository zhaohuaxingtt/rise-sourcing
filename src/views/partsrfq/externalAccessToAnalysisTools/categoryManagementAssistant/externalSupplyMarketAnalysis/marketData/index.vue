<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font22 font-weight">{{ language('PLGLZS.SHICHANGSHUJU', '市场数据') }}</span>
      <div class="floatright">
        <iButton @click="handleSearch">{{ language('LK_QUEREN', '确认') }}</iButton>
        <iButton>{{ language('LK_BAOCUN', '保存') }}</iButton>
        <iButton>{{ language('LK_FANHUI', '返回') }}</iButton>
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
  getLabourGroupSelectList,
  getLabourGroupData,
  getEnergyGroupSelectList,
  getEnergyGroupData,
} from '../../../../../../api/categoryManagementAssistant/marketData';
import {cloneDeep} from 'lodash';

export default {
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
      current: 1,
      searchProps: rawMaterialSearch,
      dataTabArray: [],
      showStatus: true,
      showChart: true,
      chartData: {},
      chartBoxLoading: false,
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
        case 1:
          this.searchProps = rawMaterialSearch;
          await this.getSearchProps({type: RAWMATERIAL});
          await this.getChartGroupData({type: RAWMATERIAL});
          break;
        case 2:
          this.searchProps = manpowerSearch;
          await this.getSearchProps({type: LABOUR});
          await this.getChartGroupData({type: LABOUR});
          break;
        case 3:
          await this.getSearchProps({type: ENERGY});
          await this.getChartGroupData({type: ENERGY});
          this.searchProps = energySearch;
          break;
      }
      this.chartBoxLoading = false;
    },
    // 搜索
    handleSearch() {
      switch (this.current) {
        case 1:
          this.getChartGroupData({type: RAWMATERIAL});
          break;
        case 2:
          this.getChartGroupData({type: LABOUR});
          break;
        case 3:
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
    },
    // 获取图表数据
    async getChartGroupData({type}) {
      try {
        let res = '';
        this.chartBoxLoading = true;
        const form = this.getSearchForm();
        switch (type) {
          case RAWMATERIAL:
            res = await getrawMaterialGroupData(form);
            break;
          case LABOUR:
            res = await getLabourGroupData(form);
            break;
          case ENERGY:
            res = await getEnergyGroupData(form);
            break;
        }
        this.getDataTabArray(res.data);
        this.chartData = res.data;
        this.chartBoxLoading = false;
      } catch {
        this.chartBoxLoading = false;
      }
    },
  },
};
</script>

<style scoped>

</style>
