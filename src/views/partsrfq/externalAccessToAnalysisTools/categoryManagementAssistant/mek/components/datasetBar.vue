<!--
 * @Author: your name
 * @Date: 2021-08-05 15:28:23
 * @LastEditTime: 2021-08-05 19:34:41
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
      const option = {
        tooltip: {},
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["2012"],
          },
        ],
        grid: {
          left: 0,
          right: 0,
          bottom:'8%',
          top:"20%"
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
            data: [500],
          },
          {
            name: "Steppe",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            barMinWidth: 30,
            barMaxWidth: 60,
            data: [550],
          },
          {
            name: "Desert",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            barMinWidth: 30,
            barMaxWidth: 60,
            data: [600],
          },
         
        ],
      };
      this.myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped></style>
