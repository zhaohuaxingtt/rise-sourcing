<template>
  <div class="theChart" ref="theChart" :style="{'height': chartHeight}" v-if="showChart"/>
</template>

<script>
import echarts from '@/utils/echarts';

export default {
  props: {
    chartHeight: {
      type: String,
      default: '500px',
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
          axisLabel: {
            formatter: (val) => {
              return 'CNY ' + val
            }
          }
        },
        color: [
          '#1660F1',
          '#5C6BC0',
          '#3949AB',
          '#ACB8CF',
          '#00579B',
          '#0188D1',
          '#03A9F4',
          '#50C2F7',
          '#0094FF',
          '#97D1FF',
        ],
        series: this.seriesArray,
        grid: {
          top: 60,
          right: 40,
          left: 40,
          bottom: 20,
          containLabel: true
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
          return item.dataType;
        });
        this.seriesArray = resultList.map(item => {
          const itemData = item.dataList.map(item => {
            return item.account;
          });
          return {
            data: itemData,
            name: item.dataType,
            type: 'line',
            smooth: true,
          };
        });
      }
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
