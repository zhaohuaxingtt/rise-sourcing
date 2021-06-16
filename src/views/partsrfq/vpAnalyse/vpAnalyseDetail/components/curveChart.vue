<template>
  <div class="curve" ref="curve" :style="{'height': chartHeight}">

  </div>
</template>

<script>
import echarts from '@/utils/echarts';

export default {
  props: {
    chartHeight: {
      type: String,
      default: '330px',
    },
    newestScatterData: {
      type: Array,
      default: () => {
        return [
          [200, 2000],
        ];
      },
    },
    targetScatterData: {
      type: Array,
      default: () => {
        return [
          [250, 1912],
        ];
      },
    },
    lineData: {
      type: Array,
      default: () => {
        return [
          [10, 2500],
          [280, 1500],
          [380, 10],
        ];
      },
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      const chart = echarts().init(this.$refs.curve);
      const option = {
        legend: {
          data: ['最新定点单价', '目标单价'],
          right: 10,
          itemWidth: 10,
        },
        xAxis: {
          type: 'value',
          name: '产量（辆）',
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
          axisLabel: {
            formatter: function(value) {
              return value + 'k';
            },
          },
          axisLine: {
            lineStyle: {
              color: '#7E84A3',
            },
          },
        },
        yAxis: {
          type: 'value',
          name: '单价\n' + '（元/件）',
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#7E84A3',
            },
          },
        },
        color: '#0059FF',
        series: [
          {
            name: '最新定点单价',
            type: 'scatter',
            data: this.newestScatterData,
            color: '#0059FF',
          },
          {
            name: '目标单价',
            type: 'scatter',
            data: this.targetScatterData,
            color: '#70AD47',
          },
          {
            type: 'line',
            smooth: true,
            data: this.lineData,
            symbol: 'none',
          }],
        grid: {
          top: 40,
          right: 80,
        },
      };
      chart.setOption(option);
    },
  },
};
</script>

<style scoped lang="scss">
.curve {
  width: 100%;
}
</style>
