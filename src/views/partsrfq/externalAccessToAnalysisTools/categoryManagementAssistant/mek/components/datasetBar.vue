<!--
 * @Author: your name
 * @Date: 2021-08-05 15:28:23
 * @LastEditTime: 2021-08-06 19:49:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\datasetBar.vue
-->
<template>
  <div style="height: 480px;width:100%"
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
      const option = {
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            axisLabel: {
              show: true,
            },
            axisLine: {
              show: false
            },
            data: ["Mix", "配置1", "配置2", "Mix1", "配置3", "配置4"],
          }
        ],
        grid: {
          left: 0,
          right: 0,
          bottom: '8%',
          top: "40%"
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
        color: [
          "#A1D0FF",
          "#92B8FF",
          "#5993FF",
          "#0059FF"
        ],
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
            barMaxWidth: 30,
            data: [{
              value: 400,
              label: {
                show: true
              },
              itemStyle: {
                color: "#A1D0FF"
              }
            },
            {
              value: 450,
              label: {
                show: true
              },
              itemStyle: {
                color: "#92B8FF"
              }
            },
            {
              value: 500,
              label: {
                show: true
              },
              itemStyle: {
                color: "#5993FF"
              }
            },
            {
              value: 400,
              label: {
                show: true
              },
              itemStyle: {
                color: "#A1D0FF"
              }
            },
            {
              value: 450,
              label: {
                show: true
              },
              itemStyle: {
                color: "#92B8FF"
              }
            },
            {
              value: 500,
              label: {
                show: true
              },
              itemStyle: {
                color: "#5993FF"
              }
            }],
          }
        ],
      };
      this.myChart.setOption(option);
      window.onresize = function () {
        this.myChart.resize();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
