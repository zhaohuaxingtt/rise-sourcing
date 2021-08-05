<!--
 * @Author: your name
 * @Date: 2021-08-05 18:35:40
 * @LastEditTime: 2021-08-05 19:01:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\datasetBar1.vue
-->
<template>
  <div style="height: 540px;width:100%" ref="chart"></div>
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
            subtextf:"产量",
            left:40,
            top:40
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
          right:0,
          bottom:'5%',
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
            barMinWidth: '10%',
            barMaxWidth : 60,
            data: [320],
          },
          {
            name: "Steppe",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            barMinWidth: '10%',
            barMaxWidth : 60,
            data: [220],
          },
          {
            name: "Desert",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            barMinWidth: '10%',
            barMaxWidth : 60,
            data: [150],
          },
          {
            name: "Wetland",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            barMinWidth:'10%',
            barMaxWidth : 60,
            data: [98],
          },
        ],
      };
      this.myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped></style>
