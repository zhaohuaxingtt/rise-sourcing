<template>
  <div class="curve" ref="curve" :style="{'height': chartHeight}"/>
</template>

<script>
import echarts from '@/utils/echarts';
import {toFixedNumber} from '@/utils';

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
    cpLineData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    dataInfo: {
      type: Object,
      default: () => {
        return {};
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
    setBg(data) {
      return {
        color: '#fff',
        padding: [4,8,4,8],
        align: 'center',
        backgroundColor: data > 0 ? '#C00000' : '#70AD47',
        borderRadius: 5,
      };
    },
    initEcharts() {
      const chart = echarts().init(this.$refs.curve);
      const newestScatterDataX = this.newestScatterData[0] ? this.newestScatterData[0][0] : 0;
      const targetScatterDataX = this.targetScatterData[0] ? this.targetScatterData[0][0] : 0;
      const newestScatterDataY = this.newestScatterData[0] ? this.newestScatterData[0][1] : 0;
      const targetScatterDataY = this.targetScatterData[0] ? this.targetScatterData[0][1] : 0;
      const reductionPotential = this.dataInfo.reductionPotential;
      const proGrowthRate = this.dataInfo.proGrowthRate;
      const xMax = this.cpLineData[0];
      const option = {
        // ['最新定点单价', '目标单价']
        legend: {
          data: [this.$t('TPZS.ZUIXINDINGDIANDANJIA'), this.$t('TPZS.MUBIAODANJIA')],
          right: 10,
          itemWidth: 10,
        },
        xAxis: {
          // 产量（辆）
          max: xMax,
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
            show: false,
          },
        },
        visualMap: {
          type: 'piecewise',
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: [
            {
              gt: newestScatterDataX,
              lt: targetScatterDataX,
              color: '#0059FF',
            },
          ],
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: this.lineData,
            symbol: 'none',
            lineStyle: {
              color: '#0059FF',
            },
            areaStyle: {},
          },
          {
            //最新定点单价
            name: this.$t('TPZS.ZUIXINDINGDIANDANJIA'),
            type: 'scatter',
            data: this.newestScatterData,
            color: '#0059FF',
            label: {
              rich: {
                bg: this.setBg(proGrowthRate),
              },
              distance: 12,
              show: true,
              position: 'top',
              formatter: () => {
                if (proGrowthRate > 0) {
                  return `{bg|+${toFixedNumber(proGrowthRate, 2)}%}`;
                } else {
                  return `bg|${toFixedNumber(proGrowthRate, 2)}%`;
                }
              },
            },
          },
          {
            //目标单价
            name: this.$t('TPZS.MUBIAODANJIA'),
            type: 'scatter',
            data: this.targetScatterData,
            color: '#70AD47',
            label: {
              rich: {
                bg: this.setBg(reductionPotential),
              },
              distance: 12,
              show: true,
              position: 'top',
              formatter: () => {
                if (reductionPotential > 0) {
                  return `{bg|+${toFixedNumber(reductionPotential, 2)}%}`;
                } else {
                  return `{bg|${toFixedNumber(reductionPotential, 2)}%}`;
                }
              },
            },
          },
          this.createXline(this.newestScatterData[0], newestScatterDataX),
          this.createXline(this.targetScatterData[0], targetScatterDataX),
          this.createYline(this.newestScatterData[0], newestScatterDataY),
          this.createYline(this.targetScatterData[0], targetScatterDataY),
          this.createYline(this.cpLineData, this.cpLineData[1]),
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
