<!--
 * @Author: your name
 * @Date: 2021-08-05 15:28:23
 * @LastEditTime: 2021-08-07 16:14:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\datasetBar.vue
-->
<template>
  <div style="height: 480px;width:100%" ref="chart"></div>
</template>

<script>
import echarts from "@/utils/echarts";
export default {
  data() {
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
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  methods: {
    initCharts() {
      this.myChart = echarts().init(this.$refs.chart);
      console.log(this.$refs.chart);
      this.$refs.chart.style.width = "400px";

      const option = {
        tooltip: {},
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["MIX", "配置1", "配置二", "配置三", "配置四", "配置五"],
          },
        ],
        grid: {
          left: 0,
          right: 0,
          bottom: "8%",
          top: "20%",
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
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
            name: "Forest",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            barMinWidth: 30,
            barMaxWidth: 60,
            data: [
              {
                value: 400,
                itemStyle: {
                  color: "#A1D0FF",
                },
              },
              {
                value: 500,
                itemStyle: {
                  color: "#92B8FF",
                },
              },
              {
                value: 600,
                itemStyle: {
                  color: "#A1D0FF",
                  itemStyle: {
                    color: "#92B8FF",
                  },
                },
              },
              {
                value: 600,
                itemStyle: {
                  color: "#A1D0FF",
                  itemStyle: {
                    color: "#92B8FF",
                  },
                },
              },
              {
                value: 600,
                itemStyle: {
                  color: "#A1D0FF",
                  itemStyle: {
                    color: "#92B8FF",
                  },
                },
              },
              {
                value: 600,
                itemStyle: {
                  color: "#A1D0FF",
                  itemStyle: {
                    color: "#92B8FF",
                  },
                },
              },
            ],
          },
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
