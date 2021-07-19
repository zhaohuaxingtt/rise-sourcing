<template>
  <div class="curve" ref="curve" :style="{'height': chartHeight}"/>
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
  mounted() {
    this.initEcharts();
  },
  data() {
    return {};
  },
  methods: {
    initEcharts() {
      const chart = echarts().init(this.$refs.curve);
      const newestScatterDataX = this.newestScatterData[0] ? this.newestScatterData[0][0] : 0;
      const targetScatterDataX = this.targetScatterData[0] ? this.targetScatterData[0][0] : 0;
      const newestScatterDataY = this.newestScatterData[0] ? this.newestScatterData[0][1] : 0;
      const targetScatterDataY = this.targetScatterData[0] ? this.targetScatterData[0][1] : 0;
      const option = {
        // ['最新定点单价', '目标单价']
        legend: {
          data: [this.$t('TPZS.ZUIXINDINGDIANDANJIA'), this.$t('TPZS.MUBIAODANJIA')],
          right: 10,
          itemWidth: 10,
        },
        xAxis: {
          // 产量（辆）
          type: 'value',
          name: this.$t('TPZS.CHANLIANGLIANG'),
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
            show: false,
          },
          axisLabel: {
            formatter: function(value) {
              return value + 'k';
            },
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#7E84A3',
            },
          },
        },
        yAxis: {
          type: 'value',
          // 单价\n' + '（元/件）
          name: this.$t('TPZS.DANJIA') + '\n' + this.$t('TPZS.YUANJIAN'),
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#7E84A3',
            },
          },
          axisLabel: {
            show: false
          }
        },
        color: '#0059FF',
        series: [
          {
            //最新定点单价
            name: this.$t('TPZS.ZUIXINDINGDIANDANJIA'),
            type: 'scatter',
            data: this.newestScatterData,
            color: '#0059FF',
          },
          {
            //目标单价
            name: this.$t('TPZS.MUBIAODANJIA'),
            type: 'scatter',
            data: this.targetScatterData,
            color: '#70AD47',
          },
          {
            type: 'line',
            smooth: true,
            data: this.lineData,
            symbol: 'none',
          },
          this.createXline(this.newestScatterData[0], newestScatterDataX),
          this.createXline(this.targetScatterData[0], targetScatterDataX),
          this.createYline(this.newestScatterData[0], newestScatterDataY),
          this.createYline(this.targetScatterData[0], targetScatterDataY)
        ],
        grid: {
          top: 40,
          right: 80,
          left: 60,
        },
      };
      chart.setOption(option);
    },
    createXline(dataArray, zeroData) {
      return {
        type: 'line',
        data: [
          {
            value: dataArray,
          },
          {
            value: [zeroData, 0],
            label: {
              show: true,
              position: 'bottom',
              color: '#7E84A3',
              formatter() {
                return zeroData + 'K';
              },
            },
          },
        ],
        lineStyle: {
          type: 'dashed',
          color: '#b6b6b6',
        },
      };
    },
    createYline(dataArray, zeroData) {
      return {
        type: 'line',
        data: [
          {
            value: dataArray,
          },
          {
            value: [0, zeroData],
            label: {
              show: true,
              position: 'left',
              color: '#7E84A3',
              formatter() {
                return zeroData;
              },
            },
          },
        ],
        lineStyle: {
          type: 'dashed',
          color: '#b6b6b6',
        },
      };
    },
  },
  watch: {
    newestScatterData() {
      this.initEcharts();
    },
  },
};
</script>

<style scoped lang="scss">
.curve {
  width: 100%;
}
</style>
