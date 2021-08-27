<!--
 * @Author: your name
 * @Date: 2021-08-05 15:28:23
 * @LastEditTime: 2021-08-27 14:26:48
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
      barDataItem: [],
      barxAxis: [],
      option: {}
    };
  },
  props: {
    maxWidth: {
      type: Number
    },
    typeSelection: {
      type: Boolean,
      default: false,
    },
    barData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  watch: {
    // typeSelection (val) {
    //   if (val) {
    //     this.$nextTick(() => {
    //       this.initCharts();
    //     });
    //   }
    // },
    barData: {
      handler (val) {
        console.log(val)
        if (val) {
          this.barDataItem = []
          this.barxAxis = []
          val.detail.forEach((item, index) => {
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
            this.barDataItem.push(itemData)
            this.barxAxis.push(str)
          })
          this.$nextTick(() => {
            this.initCharts();
          });
        }
      },
      immediate: true
    },
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.initCharts();
    // });
  },
  methods: {
    initCharts () {
      if (this.maxWidth === 1) {
        this.$refs.chart.style.width = this.maxWidth * 240 + 'px';
      } else {
        this.$refs.chart.style.width = this.maxWidth * 120 + 'px';
      }
      // console.log(this.$refs.chart.style.width, 'number')
      this.$refs.chart.style.minWidth = '100%';
      this.myChart = echarts().init(this.$refs.chart);
      this.option = {
        xAxis: [
          {
            show: !this.typeSelection || false,
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
            data: this.barxAxis,
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

              },
              barBorderRadius: [5, 5, 0, 0],

            },
            // barCategoryGap: '50%',
            // barMinWidth: 30,
            // barMinWidth: 30,
            barWidth: 30,
            data: this.barDataItem
          }
        ],
      };
      this.myChart.clear()
      this.myChart.resize();
      this.myChart.setOption(this.option);
      this.myChart.on('click', (params) => {
        let data = {}
        this.barData.detail.forEach(item => {
          if (item.value === params.value) {
            data.engine = item.engine
            data.transmission = item.transmission
            data.position = item.position
            data.vwCode = this.barData.motorCode
            data.motorId = this.barData.motorId
            data.priceType = this.barData.priceType
          }
        })
        this.$emit('detailDialog', true, data);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
