<template>
  <div v-loading="pieLoading">
    <div class="title">{{ language('PI.LINGJIANCHENGBENGOUCHENG', '零件成本构成') }}</div>
    <div class="theChart" ref="theChart" :style="{'height': chartHeight}"/>
  </div>
</template>

<script>
import echarts from '@/utils/echarts';
import {CURRENTTIME, AVERAGE} from './data';

export default {
  props: {
    chartHeight: {
      type: String,
      default: '500px',
    },
    dataInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    pieLoading: {
      type: Boolean,
      default: false,
    },
    currentTab: {
      type: String,
      default: '',
    },
    averageData: {
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
    };
  },
  methods: {
    initEcharts() {
      const chart = echarts().init(this.$refs.theChart);
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
        },
        legend: {
          left: 10,
          top: 40,
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
          data: this.legendData,
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['30%', '45%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: true,
            label: {
              show: true,
              formatter: '{b}:{d}%',
              color: 'black',
              fontSize: 10,
             /* rich: {
                value: {
                  color: 'black',
                  fontSize: 10,
                },
              }*/
            },
            itemStyle: {
              borderWidth: 1,
              borderColor: '#fff',
            },
            labelLine: {
              show: false,
              length: 1,
              length2: 1,
            },
            data: this.seriesArray,
          },
        ],
      };
      chart.setOption(option, true);
    },
    assembleData() {
      let resData = '';
      if (this.currentTab === CURRENTTIME) {
        resData = this.dataInfo && this.dataInfo.pieScaleList;
      } else {
        resData = this.averageData && this.averageData.pieScaleList;
      }
      if (Array.isArray(resData)) {
        const data = resData.map(item => {
          return {
            name: item.costName,
            value: item.costProportion,
            itemStyle: {
              color: item.color,
            },
          };
        });
        this.seriesArray = data;
        this.legendData = data.map(item => {
          return item.name;
        });
      } else {
        this.seriesArray = [];
        this.legendData = [];
      }
    },
    buildChart() {
      this.assembleData();
      this.initEcharts();
    },
  },
  watch: {
    dataInfo: {
      deep: true,
      handler() {
        this.buildChart();
      },
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
}

.theChart {
  width: 100%;
}
</style>
