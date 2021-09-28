<!--
 * @Author: your name
 * @Date: 2021-08-05 15:28:23
 * @LastEditTime: 2021-09-27 21:35:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\datasetBar.vue
-->
<template>
  <div class="chart"
       ref="chart"
       :style="{height:(clientHeight?'440px':'460px')}"></div>
</template>

<script>
import echarts from "@/utils/echarts";
import { fmoney } from '@/utils/index.js'
export default {
  data () {
    return {
      myChart: null,
      barDataItem: [],
      barxAxis: [],
      option: {},
      fmoney
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
    maxData: {
      type: String
    },
    clientHeight: {
      type: Boolean
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
              // value: item.value,
              label: {
                show: true,
                position: 'top',
                color: "#000",
                formatter: (val) => {
                  return this.fmoney(val.value, 2)
                }
              },
              itemStyle: {
                color: colorList[index]
              }
            }
            let str = ""
            if (item.title == 'MIX') {
              str = item.title + "\n\n"
            } else {
              str = item.title + "\n\n" + item.ebr || ''
            }
            this.barDataItem.push(itemData)
            this.barxAxis.push(str)
          })
          this.$nextTick(() => {
            this.initCharts();
          });
        }
      },
      immediate: true,
      deep: true
    },
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.initCharts();
    // });
  },
  methods: {
    initCharts () {
      if (this.barData.detail.length === 1) {
        this.$refs.chart.style.width = this.barData.detail.length * 260 + 'px';
      } else {
        this.$refs.chart.style.width = this.barData.detail.length * 100 + 'px';
      }
      // console.log(this.$refs.chart.style.width, 'number')
      // this.$refs.chart.style.minWidth = '100%';
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
          left: 30,
          right: 0,
          bottom: '13%',
          top: "20%"
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false
          },
          max: this.maxData,
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
      this.myChart.off("click");
      this.myChart.on('click', (params) => {
        console.log(params)
        let data = {}
        this.barData.detail.forEach(item => {
          if (item.value === params.value) {
            data.engine = item.engine
            data.transmission = item.transmission
            data.position = item.position
            data.vwCode = this.barData.motorCode
            data.motorId = this.barData.motorId
            data.priceType = this.barData.priceType
            data.priceDate = this.barData.priceDate
          }
        })
        this.$emit('detailDialog', true, data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  height: 460px;
  width: 100%;
}
</style>
