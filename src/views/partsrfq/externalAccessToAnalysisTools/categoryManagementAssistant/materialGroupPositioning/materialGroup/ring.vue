<!--
 * @Author: 舒杰
 * @Date: 2021-08-06 16:59:08
 * @LastEditTime: 2021-08-06 18:01:20
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\materialGroupPositioning\materialGroup\ring.vue
-->
<template>
   <div ref="chart" style="height:402px" ></div>
</template>
<script>
import echarts from '@/utils/echarts'
export default {
   data () {
      return {
         myChart:null
      }
   },
   mounted () {
     this.init() 
   },
   methods: {
      // 初始化
      init(){
         const myChart = echarts().init(this.$refs.chart);
         let option = {
            tooltip: {
               trigger: 'item'
            },
            color:[],
            legend: {
               orient: 'horizontal',
               left: 'center',
               icon: 'circle',
            },
            series: [
               {
                  name: '访问来源',
                  type: 'pie',
                  radius: '50%',
                  data: [
                     {value: 1048, name: '竞争先'},
                     {value: 735, name: '直接访问'},
                     {value: 580, name: '邮件营销'},
                     {value: 484, name: '联盟广告'},
                  ],
                  emphasis: {
                     itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
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