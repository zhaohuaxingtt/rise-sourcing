<!--
 * @Author: youyuan
 * @Date: 2021-07-30 16:37:12
 * @LastEditTime: 2021-09-30 15:44:34
 * @LastEditors: zbin
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\components\costAnalysisHandleInput\components\char.vue
-->
<template>
  <div :style="{width: '100%', height: height + 'px'}" ref="pieChart"></div>
</template>

<script>
import echarts from '@/utils/echarts'
export default {
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Array,
      default: () => ['#0C47A1', '#1765C0', '#1976D1', '#1F88E5', '#2297F3', '#41A5F5']
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 360
    },
    top: {
      type: String,
      default: '0'
    },
    left: {
      type: String,
      default: '0'
    },
    pieWidth: {
      type: Array,
      default: []
    }
  },
  computed: {
  },
  data() {
    return {
      myChart: {}
    }
  },
  created() {
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  mounted() {
    let _this = this;
    window.onresize = function() {
      _this.myChart.resize()
    }
  },
  methods: {
    initCharts() {
      let count = 0;
      let currentNum = 0;
      const renderArr = []
      this.myChart = echarts().init(this.$refs.pieChart);
      const option = {
        color: this.colors,
        grid: {
          left: this.left,
          top: this.top
        },
        series: [
          {
            type: 'pie',
            radius: this.pieWidth,
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'outside',
              formatter: value => {
                if (renderArr.indexOf(value.data.name) == -1) {
                  let res = ''
                  currentNum = count + value.percent / 2
                  count += value.percent
                  this.p = this.p + 1
                  if (currentNum <= 50) {
                    res = `{pieIcon${this.colors.indexOf(value.color)}|} ` + `{text|${value.data.name + ('  ' + value.percent + '%')}}`
                  } else {
                    res = value.data.name + ('  ' + value.percent + '%') + `   {pieIcon${this.colors.indexOf(value.color)}|}`
                  }
                  renderArr.push(value.data.name)
                  return res
                }
              },
              rich: {
                text: {
                  width: 130,
                  align: 'right',
                  fontSize: '12px',
                },
                pieIcon0: {
                  borderColor: this.colors[0],
                  borderWidth: 5,
                  borderType: 'solid',
                  height: 15,
                  width: 15,
                  borderRadius: 10,
                },
                pieIcon1: {
                  borderColor: this.colors[1],
                  borderWidth: 5,
                  borderType: 'solid',
                  height: 15,
                  width: 15,
                  borderRadius: 10,
                },
                pieIcon2: {
                  borderColor: this.colors[2],
                  borderWidth: 5,
                  borderType: 'solid',
                  height: 15,
                  width: 15,
                  borderRadius: 10,
                },
                pieIcon3: {
                  borderColor: this.colors[3],
                  borderWidth: 5,
                  borderType: 'solid',
                  height: 15,
                  width: 15,
                  borderRadius: 10,
                },
                pieIcon4: {
                  borderColor: this.colors[4],
                  borderWidth: 5,
                  borderType: 'solid',
                  height: 15,
                  width: 15,
                  borderRadius: 10,
                },
                pieIcon5: {
                  borderColor: this.colors[5],
                  borderWidth: 5,
                  borderType: 'solid',
                  height: 15,
                  width: 15,
                  borderRadius: 10,
                },
                pieIcon6: {
                  borderColor: this.colors[6],
                  borderWidth: 5,
                  borderType: 'solid',
                  height: 15,
                  width: 15,
                  borderRadius: 10,
                },

              }
            },
            labelLine: {
              show: true,
              length: 20,
              length2: 20,
              lineStyle: {
                color: '#C0C9D9'
              }
            },
            data: this.chartData
          }
        ]
      }
      this.myChart.setOption(option);
    }
  },
  watch: {
    chartData: {
      handler(newVal) {
        if (newVal) {
          if (this.$refs.pieChart && newVal.length > 0) {
            this.initCharts();
          }
        }
      },
      immediate: true,
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
