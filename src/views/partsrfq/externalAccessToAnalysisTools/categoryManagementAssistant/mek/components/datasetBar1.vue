<!--
 * @Author: your name
 * @Date: 2021-08-05 18:35:40
 * @LastEditTime: 2021-08-10 19:11:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\datasetBar1.vue
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
  props: {},
  mounted () {
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  methods: {
    initCharts () {
      this.myChart = echarts().init(this.$refs.chart);
      this.$refs.chart.style.width = 6 * 60 + 'px';
      const str = "MIX" + "\n\n 5%"
      const option = {
        title: {
          show: true,
          subtext: "产量",
          left: 0,
          top: 5,
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: [{
              value: str
            }, "配置1", "配置2"],
            axisLine: {
              show: false
            },
            offset: 6
          },
        ],
        grid: {
          left: 40,
          right: "-5%",
          bottom: "15%",
          top: "30%",
        },
        yAxis: {
          type: "value",
          name: "\n\nEBR",
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false,
            fontSize: 12,
            color: "#3C4F74",
            fontWeight: 400,
          },
          axisTick: {
            show: false,
          },
          offset: 5,
          splitNumber: 4,
          nameLocation: "start",
        },
        series: [
          {
            name: "Forest",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            // barCategoryGap: '50%',
            // barMinWidth: 30,
            // // barMaxWidth: 30,
            barWidth: 30,
            itemStyle: {
              barBorderRadius: [5, 5, 0, 0],
            },
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
            }],
          },
        ],
      };
      this.myChart.clear();
      this.myChart.resize();
      this.myChart.setOption(option);
      this.myChart.on('click', 'xAxis.category', function (params) {
        alert("点击了x轴标签：" + params.value);
      });
      this.myChart.on("click", (params) => {
        console.log(params)
      })

    },
  },
};
</script>

<style lang="scss" scoped></style>
