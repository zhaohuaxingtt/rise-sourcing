<!--
 * @Author: youyuan
 * @Date: 2021-07-30 16:37:12
 * @LastEditTime: 2021-08-04 14:29:49
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
      let count = 0;
      let currentNum = 0;
      const renderArr = []
      const myChart = echarts().init(this.$refs.pieChart);
      const option = {
        color: this.colors,
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
                    res = '{pieIcon|}   ' + value.data.name
                  } else {
                    res = value.data.name + '   {pieIcon|}'
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
              lineStyle: {
                color: '#C0C9D9'
              }
            },
            data: [
              {value: 25, name: '原材料/散件 25%'},
              {value: 30, name: '制造成本 30%'},
              {value: 15, name: '报废成本 15%'},
              {value: 5, name: '管理费 5%'},
              {value: 10, name: '其他费用 10%'},
              {value: 15, name: '利润 15%'},
            ]
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
          if(this.$refs.chart && newVal.data.length>0){
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
