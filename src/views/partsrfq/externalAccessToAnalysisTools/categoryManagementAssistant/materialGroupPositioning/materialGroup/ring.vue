<!--
 * @Author: 舒杰
 * @Date: 2021-08-06 16:59:08
 * @LastEditTime: 2021-08-13 16:03:22
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\materialGroupPositioning\materialGroup\ring.vue
-->
<template>
   <div ref="chart" style="height:300px" ></div>
</template>
<script>
import echarts from '@/utils/echarts'
export default {
   data () {
      return {
      }
   },
   mounted () {
   //   this.init() 
   },
   props: {
      ringData:[]
   },
   watch: {
      ringData(newVal){
         this.init()
      }
   },
   methods: {
      // 初始化
      init(){
         let seriesData=this.ringData.map(item=>{
            return {value:item.num,name:item.classAiTypeName}
         })
         const myChart = echarts().init(this.$refs.chart);
         let option = {
            tooltip: {
               trigger: 'item'
            },
            color:["#1976D1","#1F88E5","#2297F3","#41A5F5"],
            legend: {
               orient: 'horizontal',
               left: 'center',
               icon: 'circle',
            },
            series: [
               {
                  name: '访问来源',
                  type: 'pie',
                  radius: ["40%","70%"],
                  avoidLabelOverlap: false,
                  itemStyle: {
                     borderColor: '#fff',
                     borderWidth: 2
                  },
                  label: {
                     show: false,
                     position: 'center'
                  },
                  labelLine: {
                     show: false
                  },
                  data: seriesData,
                  emphasis: {
                     label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                     }
                  }
               }
            ]
         };
         myChart.setOption(option);
      }
   }
}
</script>
<style lang="scss" scoped>
</style>