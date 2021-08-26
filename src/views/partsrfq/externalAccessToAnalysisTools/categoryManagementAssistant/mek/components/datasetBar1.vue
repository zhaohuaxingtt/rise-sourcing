<!--
 * @Author: your name
 * @Date: 2021-08-05 18:35:40
 * @LastEditTime: 2021-08-26 15:31:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\datasetBar1.vue
-->
<template>
  <div>
    <div style="height: 440px;width:100%"
         ref="chart"></div>
    <div>

    </div>
  </div>
</template>

<script>
import echarts from "@/utils/echarts";
export default {
  data () {
    return {
      myChart: null,
      barData: [],
      barxAxis: [],
      option: {}
    };
  },
  props: {
    typeSelection: {
      type: Boolean,
      default: false,
    },
    firstBarData: {
      type: Array,
      default: () => {
        return []
      },
    },
    maxWidth: {
      type: Number
    }
  },
  watch: {
    // typeSelection (val) {
    //   if (val) {
    //     this.$nextTick(() => {
    //       this.initCharts();
    //     });
    //   }
    // },
    firstBarData: {
      handler (val) {
        if (val) {
          this.barDataItem = []
          this.barxAxis = []
          val.forEach((item, index) => {
            const colorList = ['#A1D0FF', '#92B8FF', '#5993FF']
            const itemData = {
              value: item.value,
              label: {
                show: true,
                position: 'top',
                color: "#000"
              },
              itemStyle: {
                color: colorList[index]
              }
            }
            const str = item.title + "\n\n" + item.ebr
            this.barData.push(itemData)
            this.barxAxis.push(str)
          })
          this.$nextTick(() => {
            this.initCharts();
          });
        }
      },
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.initCharts();
    // });
  },
  methods: {
    initCharts () {
      this.$refs.chart.style.width = this.maxWidth * 120 + 'px';
      this.$refs.chart.style.minWidth = '100%';
      this.myChart = echarts().init(this.$refs.chart);
      this.option = {
        title: {
          show: true,
          subtext: "产量",
          left: 0,
          top: 5,
        },
        xAxis: [
          {
            show: !this.typeSelection || false,
            type: "category",
            axisTick: { show: false },
            // data: [{
            //   value: str
            // }, "配置1", "配置2"],
            axisLabel: {
              color: "#3C4F74",
              fontSize: 12,
              fontFamily: "Arial"
            },
            data: this.barxAxis,
            axisLine: {
              show: false
            },
            offset: 6,
            triggerEvent: true
          },
        ],
        grid: {
          left: 20,
          right: 0,
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
          offset: 0,
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
            data: this.barData
            // data: [{
            //   value: 400,
            //   label: {
            //     show: true,
            //     position: 'top',
            //     color: "#000"
            //   },
            //   itemStyle: {
            //     color: "#A1D0FF"
            //   }
            // },
            // {
            //   value: 450,
            //   label: {
            //     show: true,
            //     position: 'top',
            //     color: "#000"
            //   },
            //   itemStyle: {
            //     color: "#92B8FF"
            //   }
            // },
            // {
            //   value: 500,
            //   label: {
            //     show: true,
            //     position: 'top',
            //     color: "#000"
            //   },
            //   itemStyle: {
            //     color: "#5993FF"
            //   }
            // }],
          },
        ],
      };
      this.myChart.clear();
      this.myChart.resize();
      this.myChart.setOption(this.option);
      this.myChart.on('click', (params) => {
        this.$emit('detailDialog', true, params);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
