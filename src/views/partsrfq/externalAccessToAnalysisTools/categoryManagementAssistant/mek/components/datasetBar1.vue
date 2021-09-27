<!--
 * @Author: your name
 * @Date: 2021-08-05 18:35:40
 * @LastEditTime: 2021-09-27 21:28:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\components\datasetBar1.vue
-->
<template>
  <div ref="chart"
       class="chart"
       :style="{height:(clientHeight?'440px':'460px')}"></div>
</template>

<script>
import echarts from "@/utils/echarts";
import { fmoney } from '@/utils/index.js'
export default {
  data () {
    return {
      myChart: null,
      barData: [],
      barxAxis: [],
      option: {},
      fmoney
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
    },
    maxData: {
      type: String
    },
    clientHeight: {
      type: Boolean
    }
  },
  watch: {
    'firstBarData.detail': {
      handler (val) {
        if (val) {
          this.barData = []
          this.barxAxis = []
          val.forEach((item, index) => {
            let str = ''
            const colorList = ['#A1D0FF', '#92B8FF', '#5993FF']
            const itemData = {
              value: item.value,
              label: {
                show: true,
                position: 'top',
                color: "#000",
                formatter: (val) => {
                  console.log(val)
                  return this.fmoney(val.value, 2)
                }
              },
              itemStyle: {
                color: colorList[index]
              }
            }
            if (item.title == 'MIX') {
              str = item.title + "\n\n"
            } else {
              str = item.title + "\n\n" + item.ebr || ''
            }
            this.barData.push(itemData)
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
      if (this.firstBarData.detail.length === 1) {
        this.$refs.chart.style.width = '260px'
      } else {
        this.$refs.chart.style.width = this.firstBarData.detail.length * 100 + 'px';
      }

      this.myChart = echarts().init(this.$refs.chart);
      this.option = {
        title: {
          show: true,
          subtext: "产量",
          left: 0,
          top: -10,
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
          left: 30,
          right: 0,
          bottom: "13%",
          top: "20%",
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
          max: this.maxData,
          offset: 10,
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
      this.myChart.off("click");
      this.myChart.on('click', (params) => {
        console.log(params,this.firstBarData)
        let data = {}
        this.firstBarData.detail.forEach(item => {
          if (item.value === params.value) {
            data.engine = item.engine
            data.transmission = item.transmission
            data.position = item.position
            data.vwCode = this.firstBarData.motorCode
            data.motorId = this.firstBarData.motorId
            data.priceType = this.firstBarData.priceType
            data.priceDate=this.firstBarData.priceDate
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
