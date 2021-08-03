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
    <!--    数据页签栏-->
    <theDataTab :list="dataTabArray" v-if="showStatus" @handleDelete="handleDataTabDelete"/>
    <!--    echarts图表-->
    <theChart :chartData="chartData" :chartLoading="chartLoading" v-if="showStatus && showChart" ref="theChart"/>
  </iCard>
</template>

<script>
import {iCard, iButton} from 'rise';
import theTabs from './components/theTabs';
import theSearch from './components/theSearch';
import theDataTab from './components/theDataTab';
import theChart from './components/theChart';
import {rawMaterialSearch, manpowerSearch, energySearch} from './components/data';
import {
  getRawMaterialGroupSelectList,
  getrawMaterialGroupData,
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
      chartLoading: false,
      chartData: {},
    };
  },
  async created() {
    await this.getRawMaterialSearchProps();
    await this.getRawMaterialGroupData();
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
      switch (val) {
        case 1:
          this.searchProps = rawMaterialSearch;
          await this.getRawMaterialSearchProps();
          await this.getRawMaterialGroupData();
          break;
        case 2:
          this.searchProps = manpowerSearch;
          break;
        case 3:
          this.searchProps = energySearch;
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
    // 搜索
    handleSearch() {
      switch (this.current) {
        case 1:
          this.getRawMaterialGroupData();
          break;
        case 2:
          break;
        case 3:
          break;
      }
    },
    // 获取数据页签
    getDataTabArray(data) {
      if (data.resultList) {
        this.dataTabArray = data.resultList.map(item => {
          return item.classType;
        });
      }
    },
    // 删除数据页签
    handleDataTabDelete(val) {
      this.chartData.resultList = this.chartData.resultList.filter(item => {
        return item['classType'] !== val;
      });
      this.dataTabArray = this.dataTabArray.filter(item => {
        return item !== val;
      });
      this.showChart = false;
      this.$nextTick(() => {
        this.showChart = true;
      });
    },
    // 原材料
    async getRawMaterialSearchProps() {
      const res = await getRawMaterialGroupSelectList();
      const data = res.data;
      this.setSearchProps(data);
    },
    async getRawMaterialGroupData() {
      try {
        this.chartLoading = true;
        const form = this.getSearchForm();
        const res = await getrawMaterialGroupData(form);
        this.getDataTabArray(res.data);
        this.chartData = res.data;
        this.chartLoading = false;
      } catch {
        this.chartLoading = false;
      }
    },
  },
};
</script>

<style scoped>

</style>
