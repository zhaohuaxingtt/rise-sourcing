<!--
 * @Author: your name
 * @Date: 2021-08-05 18:35:40
 * @LastEditTime: 2021-08-07 16:08:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\datasetBar1.vue
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
  props: {},
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  methods: {
    initCharts() {
      this.myChart = echarts().init(this.$refs.chart);

      const option = {
        tooltip: {},
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
            data: ["MIX", "配置一", "配置二"],
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
            // barMinWidth: 30,
            // barMaxWidth: 60,
             barCategoryGap :"20%",
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
            ],
          },
        ],
      };
      this.myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped></style>
