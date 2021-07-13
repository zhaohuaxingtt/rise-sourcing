<template>
  <div class="curve" ref="curve" :style="{'height': chartHeight}"/>
</template>

<script>
import echarts from '@/utils/echarts'

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
        ]
      },
    },
    targetScatterData: {
      type: Array,
      default: () => {
        return [
          [250, 1912],
        ]
      },
    },
    lineData: {
      type: Array,
      default: () => {
        return [
          [10, 2500],
          [280, 1500],
          [380, 10],
        ]
      },
    },
  },
  mounted() {
    this.initEcharts()
  },
  data () {
    return {}
  },
  methods: {
    initEcharts () {
      const chart = echarts().init(this.$refs.curve)
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
          },
          axisLabel: {
            formatter: function (value) {
              return value + 'k'
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
          // 单价\n' + '（元/件）
          name: this.$t('TPZS.DANJIA') + '\n' + this.$t('TPZS.YUANJIAN'),
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
          }],
        grid: {
          top: 40,
          right: 80,
        },
      }
      chart.setOption(option)
    },
  },
  watch: {
    newestScatterData () {
      this.initEcharts()
    },
  },
}
</script>

<style scoped lang="scss">
.curve {
  width: 100%;
}
</style>
