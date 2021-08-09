<!--
 * @Author: your name
 * @Date: 2021-08-05 18:35:40
 * @LastEditTime: 2021-08-09 09:43:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\datasetBar1.vue
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
  props: {},
  mounted () {
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  methods: {
    initCharts () {
      this.myChart = echarts().init(this.$refs.chart);

      const option = {
        title: {
          show: true,
          subtext: "产量",
          left: 0,
          top: -10,
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["Mix", "配置1", "配置2"],
            axisLine: {
              show: false
            }
          },
        ],
        grid: {
          left: 40,
          right: "-5%",
          bottom: "8%",
          top: "20%",
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false
          }
        },
        color: [
          "#A1D0FF",
          "#92B8FF",
          "#5993FF",
          "#0059FF"
        ],
        series: [
          {
            name: "Forest",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            // barCategoryGap: '50%',
            barMinWidth: 30,
            // // barMaxWidth: 30,
            itemStyle: {
              barBorderRadius: [5, 5, 0, 0],
            },
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
            }],
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
