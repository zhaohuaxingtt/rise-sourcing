<template>
  <div>
    <div class="title">{{ language('PI.LINGJIANCHENGBENGOUCHENG', '零件成本构成') }}</div>
    <div class="theChart" ref="theChart" :style="{'height': chartHeight}"/>
  </div>
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
    };
  },
  methods: {
    initEcharts() {
      const chart = echarts().init(this.$refs.theChart);
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
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
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              formatter: '{b}\n({d}%)',
            },
            itemStyle: {
              borderWidth: 1,
              borderColor: '#fff',
            },
            labelLine: {
              show: false,
              length: 2,
              length2: 3,
            },
            data: this.seriesArray,
          },
        ],
      };
      chart.setOption(option, true);
    },
    assembleData() {
      const data = [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'},
        {value: 135, name: '视频广告'},
        {value: 1548, name: '搜索引擎'},
      ];
      this.seriesArray = data;
      this.legendData = data.map(item => {
        return item.name;
      });
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
.title {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
}

.theChart {
  width: 100%;
}
</style>
