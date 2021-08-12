<!--
 * @Author: 舒杰
 * @Date: 2021-08-09 16:45:32
 * @LastEditTime: 2021-08-10 19:37:37
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\materialGroupPositioning\materialGroup\piecewise.vue
-->
<template>
   <div ref="chart" style="height:600px" ></div>
</template>
<script>
import echarts from '@/utils/echarts';
import {findMaterialGroupQuadrant} from "@/api/categoryManagementAssistant/marketData/materialGroup";

export default {
   data () {
      return {
        mateData:[],//当前账号下的材料组数据
        categoryCode:""
      }
   },
   created () {
      this.categoryCode=this.$store.state.rfq.categoryCode
     this.findMaterialGroupQuadrant() 
   },
   mounted () {
      this.init() 
   },
   methods: {
      findMaterialGroupQuadrant(){
         let data={
            materialGroupCode:this.categoryCode,
            userId:this.$store.state.permission.userInfo.id
         }
         findMaterialGroupQuadrant(data).then(res=>{
            if (res.data) {
               this.mateData=res.data
            }
         })
      },
      // 初始化
      init(){
         const myChart = echarts().init(this.$refs.chart);
         
         // 散点数据
      let marksData = [
         {
            name: '点1',
            value: [10, 20],
         },
         {
            name: '点2',
            value: [15, 22],
         },
         {
            name: '点3',
            value: [34, 51],
         },
         {
            name: '点4',
            value: [25, 64],
         },
         {
            name: '点5',
            value: [42, 20],
         },
         {
            name: '点6',
            value: [32, 15],
         },
         {
            name: '点7',
            value: [68, 34],
         },
         {
            name: '点8',
            value: [25, 65],
         },
         {
            name: '点9',
            value: [45, 56],
         },
         {
            name: '点10',
            value: [35, 47],
         }
      ]
      // 中心线
      let centerLine = [
         {
            name: 'y', xAxis: 40
         },
         {
            name: 'x', yAxis: 40
         }
      ]
      // 中心点
      let centerMark = [
         {
            value: '中心点', coord: [40, 40]
         }    
      ]

      let option = {
         tooltip: {
            axisPointer: {
                  show: true,
                  type: 'cross',
                  lineStyle: {
                     type: 'dashed',
                     width: 1
                  },
                  label: {
                     backgroundColor: '#555'
                  }
            }
         },
         grid: {
            left: 50,
            right: 50,
            bottom: '4%',
            top: '6%',
            containLabel: true
         },
         xAxis: {
            scale: true,
            axisLine: {
                  lineStyle: {
                     color: '#ddd'
                  }
            },
            axisLabel: {
                  color: '#666'
            },
            splitLine: {
                  lineStyle: {
                     color: '#eee'
                  }
            }
         },
         yAxis: {
            scale: true,
            axisLine: {
                  lineStyle: {
                     color: '#ddd'
                  }
            },
            axisLabel: {
                  color: '#666'
            },
            splitLine: {
                  lineStyle: {
                     color: '#eee'
                  }
            }
         },
         series: [{
            type: 'scatter',
            data: marksData,
            label: {
                  show: true,
                  position: 'bottom',
                  formatter: '{b}'
            },
            itemStyle: {
                  shadowBlur: 2,
                  shadowColor: 'rgba(120, 36, 50, 0.5)',
                  shadowOffsetY: 1,
                  color: function (e) {
                     let randomColor = 'rgba(' + Math.floor(Math.random() * 240) + ',' + Math.floor(Math.random() * 240) + ',' + Math.floor(Math.random() * 240) + ',' + '.8' + ')'
                     return randomColor.substring()
                  }
            },
            // 各象限区域
            markArea: {
                  silent: true,
                  data: [
                     // 第一象限
                     [{
                        name: '战略型',
                        xAxis: 40, // x 轴开始位置
                        yAxis: 70, // y 轴结束位置(直接取最大值)
                        itemStyle: {
                              color: 'rgba(56, 180, 139, .1)'
                        },
                        label: {
                              position: 'inside',
                              color: 'rgba(0, 0, 0, .1)',
                              fontSize: 22,
                              // backgroundColor:{
                              //    image:require("@/assets/images/partRfq/internalDemandAnalysis01.png"),
                              //    width:402
                              // }
                        }
                     }, {
                        yAxis: 40 // y轴开始位置
                     }],
                     // 第二象限
                     [{
                        name: '竞争型',
                        yAxis: 70, // y 轴结束位置(直接取最大值)
                        itemStyle: {
                              color: 'rgba(68, 97, 123, .1)'
                        },
                        label: {
                              position: 'inside',
                              color: 'rgba(0, 0, 0, .1)',
                              fontSize: 22
                        }
                     }, {
                        xAxis: 40, // x 轴结束位置
                        yAxis: 40 // y轴开始位置
                     }],
                     // 第三象限
                     [{
                        name: '普通型',
                        yAxis: 40, // y 轴结束位置
                        itemStyle: {
                              color: 'rgba(191, 120, 58, .1)'
                        },
                        label: {
                              position: 'inside',
                              color: 'rgba(0, 0, 0, .1)',
                              fontSize: 22
                        }
                     }, {
                        xAxis: 40, // x 轴结束位置
                        yAxis: 10 // y轴开始位置
                     }],
                     // 第四象限
                     [{
                        name: '限制型',
                        xAxis: 40, // x 轴开始位置
                        yAxis: 40, // y 轴结束位置
                        itemStyle: {
                              color: 'rgba(116, 83, 153, .1)'
                        },
                        label: {
                              position: 'inside',
                              color: 'rgba(0, 0, 0, .1)',
                              fontSize: 22
                        }
                     }, {
                        yAxis: 10 // y轴开始位置
                     }]
                  ]
            },
            // 中心点交集象限轴
            markLine: {
                  silent: true, // 是否不响应鼠标事件
                  precision: 2, // 精度
                  lineStyle: {
                     type: 'solid',
                     color: '#00aca6'
                  },
                  label: {
                     color: '#00aca6',
                     position: 'end',
                     formatter: '{b}'
                  },
                  data: centerLine
            },
            // 中心点
            markPoint: {
                  symbol: 'roundRect',
                  symbolSize: 15,
                  itemStyle: {
                     color: 'rgba(234, 85, 6, .8)'
                  },
                  label: {
                     position: 'top'
                  },
                  data: centerMark
            }
         }]
      }
         myChart.setOption(option);
      }
   }
}
</script>
<style lang="scss" scoped>
</style>