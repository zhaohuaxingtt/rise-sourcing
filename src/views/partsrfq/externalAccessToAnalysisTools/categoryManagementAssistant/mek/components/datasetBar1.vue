<!--
 * @Author: your name
 * @Date: 2021-08-05 18:35:40
 * @LastEditTime: 2021-08-05 19:34:44
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
  props: {
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
        title:{
            show:true,
            subtext:"产量",
            left:0,
            top:-10
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["2012"],
          },
        ],
        grid: {
          left:40,
          right:'-5%',
          bottom:'8%',
          top:"20%"
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: true,
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
            barMaxWidth : 60,
            data: [500],
          },
          {
            name: "Steppe",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            barMinWidth: 30,
            barMaxWidth : 60,
            data: [550],
          },
          {
            name: "Desert",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            barMinWidth: 30,
            barMaxWidth : 60,
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
