<template>
  <div class="theChart" ref="theChart" :style="{'height': chartHeight}"/>
</template>

<script>
import echarts from '@/utils/echarts';

export default {
  props: {
    chartHeight: {
      type: String,
      default: '600px',
    },
  },
  mounted() {
    this.initEcharts();
  },
  data() {
    return {
      seriesArray: []
    };
  },
  methods: {
    initEcharts() {
      const chart = echarts().init(this.$refs.theChart);
      const option = {
        legend: {
          data: ['类别1', '类别2', '类别3'],
          icon: 'circle',
          left: 30,
          top: 20,
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            name: '类别1',
            type: 'line',
            smooth: true,
          },
          {
            data: [320, 932, 901, 934, 1290, 1330, 1320],
            name: '类别2',
            type: 'line',
            smooth: true,
          },
          {
            data: [420, 932, 901, 934, 1290, 1330, 1320],
            name: '类别3',
            type: 'line',
            smooth: true,
          },
        ],
        grid: {
          top: 60,
          right: 40,
          left: 40,
          bottom: 20,
        },
      };
      chart.setOption(option);
    },
    assembleData() {

    }
  },
};
</script>

<style scoped lang="scss">
.theChart {
  width: 100%;
}
</style>
