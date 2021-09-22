<!--
 * @Author: youyuan
 * @Date: 2021-07-30 16:37:12
 * @LastEditTime: 2021-09-15 10:22:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\components\costAnalysisHandleInput\components\char.vue
-->
<template>
  <div :style="{width: width + 'px', height: height + 'px'}" ref="pieChart"></div>
</template>

<script>
import imgUrl from '@/assets/images/pie-icon.png'
import echarts from '@/utils/echarts'
export default {
  props:{
    chartData:{
        type:Array,
        default:()=>[]
    },
    colors: {
      type: Array,
      default: () => ['#0C47A1','#1765C0','#1976D1','#1F88E5','#2297F3','#41A5F5']
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
    }
  },
  computed: {
  },
  data () {
    return {

    }
  },
  created() {
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  methods: {
    initCharts() {
      console.log('left', this.left);
      let count = 0;
      let currentNum = 0;
      const renderArr = []
      const myChart = echarts().init(this.$refs.pieChart);
      const option = {
        color: this.colors,
        grid: {
          left: this.left,
          top: this.top
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'outside',
              formatter: value => {
                if(renderArr.indexOf(value.data.name) == -1) {
                  let res = ''
                  currentNum = count + value.percent / 2
                  count += value.percent
                  if(currentNum <= 50){
                    res = '{pieIcon|}   ' + value.data.name + ('  ' + value.percent + '%')
                  } else {
                    res = value.data.name + ('  ' + value.percent + '%') + '   {pieIcon|}'
                  }
                  renderArr.push(value.data.name)
                  return res
                }
              },
              rich: {
                pieIcon: {
                  backgroundColor: {
                    image: imgUrl
                  },
                  height: 20
                }
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
      myChart.setOption(option);
    }
  },
  watch:{
    chartData:{
      handler(newVal){
        if(newVal){
          if(this.$refs.pieChart && newVal.length>0){
            this.initCharts();
          }
        }
      },
      immediate:true,
    }
  }
}
</script>

<style lang='scss' scoped>

 
</style>
