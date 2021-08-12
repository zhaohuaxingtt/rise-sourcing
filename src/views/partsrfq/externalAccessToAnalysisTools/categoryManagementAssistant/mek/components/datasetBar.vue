<!--
 * @Author: your name
 * @Date: 2021-08-05 15:28:23
 * @LastEditTime: 2021-08-11 16:25:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\datasetBar.vue
-->
<template>
  <div style="height: 440px;width:100%"
       ref="chart"></div>
</template>

<script>
import echarts from "@/utils/echarts";
export default {
  data () {
    return {
      myChart: null,
    };
  },
  props: {
    notY: {
      type: Boolean,
      default: false,
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  methods: {
    initCharts () {
      this.myChart = echarts().init(this.$refs.chart);
      console.log(this.$refs.chart);
      this.$refs.chart.style.width = 6 * 60 + 'px';
      this.$refs.chart.style.minWidth = '100%';

      const option = {
        xAxis: [
          {
            show: true,
            type: "category",
            axisTick: { show: false },
            axisLabel: {
              color: "#3C4F74",
              fontSize: 12,
              fontFamily: "Arial"
            },
            axisLine: {
              show: false
            },
            offset: 6,
            data: ["Mix", "配置1", "配置2", "Mix1", "配置3", "配置4"],
          }
        ],
        grid: {
          left: 0,
          right: 0,
          bottom: '15%',
          top: "30%"
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: (val) => {
              return "";
            },
          },
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            name: "Mix",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              formatter: (val) => {
                console.log(val)
              },
              barBorderRadius: [5, 5, 0, 0],

            },
            // barCategoryGap: '50%',
            // barMinWidth: 30,
            // barMinWidth: 30,
            barWidth: 30,
            data: [{
              value: 400,
              label: {
                show: true,
                position: 'top',
                color: "#000"
              },
              itemStyle: {
                color: "#A1D0FF"
              }
            },
            {
              value: 450,
              label: {
                show: true,
                position: 'top',
                color: "#000"
              },
              itemStyle: {
                color: "#92B8FF"
              }
            },
            {
              value: 500,
              label: {
                show: true,
                position: 'top',
                color: "#000"
              },
              itemStyle: {
                color: "#5993FF"
              }
            },
            {
              value: 400,
              label: {
                show: true,
                position: 'top',
                color: "#000"
              },
              itemStyle: {
                color: "#A1D0FF"
              }
            },
            {
              value: 450,
              label: {
                show: true,
                position: 'top',
                color: "#000"
              },
              itemStyle: {
                color: "#92B8FF"
              }
            },
            {
              value: 500,
              label: {
                show: true,
                position: 'top',
                color: "#000"
              },
              itemStyle: {
                color: "#5993FF"
              }
            }],
          }
        ],
      };
      this.myChart.clear();
      this.myChart.resize();
      this.myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped></style>
