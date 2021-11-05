<template>
  <div class="bar" ref="bar" :style="{'height': chartHeight}"/>
</template>

<script>
import echarts from '@/utils/echarts';

export default {
  props: {
    chartHeight: {
      type: String,
      default: '330px',
    },
    barData: {
      type: Array,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      seriesArray: [],
    };
  },
  mounted() {
    this.getBarData();
    this.initEcharts();
  },
  methods: {
    getBarData() {
      const data = [
        {name: 'Chromed Cover (subcont)', data: [320, 332]},
        {name: 'Raw Material Costs', data: [120, 132]},
        {name: 'Injection', data: [220, 132]},
        {name: 'Painting', data: [220, 132]},
        {name: 'Assembly', data: [220, 132]},
        {name: 'SG&A', data: [220, 132]},
        {name: 'Profit', data: [220, 132]},
        {name: 'Scrap', data: [220, 132]},
      ];
      const colorArray = ['#94C8FC', '#72AEFF', '#5993FF', '#1763F7', '#0040BE', '#0E2C90', '#404FC3', '#404FC3'];
      this.seriesArray = data.map((item, index) => {
        return {
          name: item.name,
          type: 'bar',
          stack: 'stack',
          data: item.data,
          barWidth: 60,
          itemStyle: {
            color: colorArray[index],
          },
          label: {
            show: true,
            formatter: '{c}' + '€',
          },
        };
      });
      const markPointStyle = {
        itemStyle: {
          color: '#fff',
        },
        label: {
          color: '#000',
        },
      };
      this.seriesArray[0].markPoint = {
        data: [
          {
            coord: [0, 1780],
            value: '1900€',
            ...markPointStyle,
          },
          {
            coord: [1, 1580],
            value: '1780€',
            ...markPointStyle,
          },
        ],
      };
    },
    initEcharts() {
      const barWidth = 60;
      const chart = echarts().init(this.$refs.bar);
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: [
            'Chromed Cover (subcont)',
            'Raw Material Costs',
            'Injection',
            'Painting',
            'Assembly',
            'SG&A',
            'Profit',
            'Scrap',
          ],
          top: '80%',
          itemGap: 20,
          orient: 'vertical',
        },
        grid: {
          height: '70%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['CDB', 'KLS'],
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false,
            },
            axisLabel: {
              formatter: function(value) {
                return value + '€';
              },
            },
          },
        ],
        series: this.seriesArray,
      };
      chart.setOption(option);
    },
  },
};
</script>

<style scoped lang="scss">
.bar {
  width: 100%;
}
</style>
