<template>
  <div class="theChart" ref="theChart" :style="{'height': chartHeight}" v-loading="chartLoading" v-if="showChart"/>
</template>

<script>
import echarts from '@/utils/echarts';

export default {
  props: {
    chartHeight: {
      type: String,
      default: '500px',
    },
    chartLoading: {
      type: Boolean,
      default: false,
    },
    chartData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  mounted() {
    this.buildChart();
  },
  data() {
    return {
      seriesArray: [],
      legendData: [],
      xAxisArray: [],
      showChart: true,
    };
  },
  methods: {
    initEcharts() {
      const chart = echarts().init(this.$refs.theChart);
      const option = {
        legend: {
          data: this.legendData,
          icon: 'circle',
          left: 30,
          top: 20,
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: this.xAxisArray,
          splitLine: {
            show: true,
          },
        },
        yAxis: {
          type: 'value',
        },
        color: [
          '#0C47A1',
          '#1765C0',
          '#1976D1',
          '#1F88E5',
          '#2297F3',
          '#41A5F5',
          '#a1d0fb',
          '#b7cbf3',
        ],
        series: this.seriesArray,
        grid: {
          top: 60,
          right: 40,
          left: 40,
          bottom: 20,
        },
      };
      chart.setOption(option, true);
    },
    assembleData() {
      this.xAxisArray = [];
      this.legendData = [];
      this.seriesArray = [];
      this.xAxisArray = this.chartData.yearsList;
      const resultList = this.chartData.resultList;
      if (Array.isArray(resultList) && resultList.length > 0) {
        this.legendData = resultList.map(item => {
          return item.classType;
        });
        this.seriesArray = resultList.map(item => {
          const itemData = item.rmList.map(item => {
            return item.account;
          });
          return {
            data: itemData,
            name: item.classType,
            type: 'line',
            smooth: true,
          };
        });
      }
      console.log(this.seriesArray);
    },
    buildChart() {
      this.assembleData();
      this.initEcharts();
    },
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.buildChart();
      },
    },
  },
};
</script>

<style scoped lang="scss">
.theChart {
  width: 100%;
}
</style>
