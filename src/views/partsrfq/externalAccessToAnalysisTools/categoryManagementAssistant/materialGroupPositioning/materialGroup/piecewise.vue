<!--
 * @Author: 舒杰
 * @Date: 2021-08-09 16:45:32
 * @LastEditTime: 2021-09-28 16:30:56
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\materialGroupPositioning\materialGroup\piecewise.vue
-->
<template>
   <div ref="chart" class="piecewise" ></div>
</template>
<script>
import echarts from '@/utils/echarts';
// import {findMaterialGroupQuadrant} from "@/api/categoryManagementAssistant/marketData/materialGroup";

export default {
   data () {
      return {
        mateData:[],//当前账号下的材料组数据
        categoryCode:"",
        isInit:true,//是否第一次初始化
      }
   },
   props: {
      materialGroupPosition:{
         type:Object,
         default:()=>{}
      }
   },
   watch: {
      materialGroupPosition(newVal){
         this.init()
      }
   },
   methods: {
      // findMaterialGroupQuadrant(){
      //    let data={
      //       materialGroupCode:this.categoryCode,
      //       userId:this.$store.state.permission.userInfo.id
      //    }
      //    findMaterialGroupQuadrant(data).then(res=>{
      //       if (res.data) {
      //          this.mateData=res.data
      //       }
      //    })
      // },
      // 初始化
      init(){
         const myChart = echarts().init(this.$refs.chart);
         let data=window._.clone(this.materialGroupPosition)

         // 散点数据
         let marksData=[]
         if(data.otherPointList){
            marksData=data.otherPointList.map(item=>{
               return {
                  value:[parseFloat(item.riskScore),parseFloat(item.moneyScore)],
                  materialGroupName:item.materialGroupName,
                  materialGroupCode:item.materialGroupCode,
                  symbolSize:item.size,
                  to:item.money,
               }
            })
         }
         

            // let currentCategory1={
            //    value:[55,55],
            //    materialGroupName:'11111',
            //    materialGroupCode:'1111',
            //    symbolSize:50,
            // }
            // let currentCategory2={
            //    value:[55,55],
            //    materialGroupName:'22222',
            //    materialGroupCode:'222222',
            //    symbolSize:100,
            // }
            // marksData=[currentCategory1,currentCategory2,]

            
         // 当前点
         if(data.currentPoint){
            let currentCategory={
               value:[parseInt(data.currentPoint.riskScore),parseInt(data.currentPoint.moneyScore)],
               materialGroupName:data.currentPoint.materialGroupName,
               materialGroupCode:data.currentPoint.materialGroupCode,
               to:data.currentPoint.money,
               symbolSize:data.currentPoint.size,
            }
            marksData.push(currentCategory)
         }
         let centerMarkX=parseFloat(data.centerPoint.riskScore)
         let centerMarkY=parseFloat(data.centerPoint.moneyScore)
         if(marksData.length==0){
            let centerMark={
               value:[500,500],
               symbolSize:0
            }
            marksData=[centerMark]
         }
         // 中心线
         let centerLine = [
            {
               name: 'y', xAxis: centerMarkX
            },
            {
               name: 'x', yAxis: centerMarkY
            }
         ]
         // 中心点
         let centerMark = [
            {
               value: '', coord: [centerMarkX,centerMarkY]
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
               },
               formatter:params => {
                  // console.log(params)
                  const {
                     data,
                     value
                  } = params;

                  return [
                     `材料组名称:${data.materialGroupName}`,
                     `材料组编号: ${data.materialGroupCode}`,
                     `材料组分数:(${value[0]},${value[1]})`,
                     `TO:${data.to}`
                        ].join("</br>")
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
               splitNumber : 1,
               name:"供应复杂度",
               nameLocation:'center',
               nameTextStyle:{
                  color:"#333333",
                  fontSize:16
               },
               axisLine: {
                     lineStyle: {
                        color: '#ACB8CF',
                     }
               },
               // axisLabel: {
               //       color: '#666'
               // },
               splitLine: {
                     lineStyle: {
                        color: '#eee'
                     }
               }
            },
            yAxis: {
               scale: true,
               splitNumber : 1,
               name:"业务影响度",
               nameLocation:'center',
               nameTextStyle:{
                  color:"#333333",
                  fontSize:16
               },
               axisLine: {
                  lineStyle: {
                     color: '#ACB8CF',
                  }
               },
               // axisLabel: {
               //       color: '#666'
               // },
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
                  color: function (e) {
                     if(data.currentPoint && e.data.materialGroupCode==data.currentPoint.materialGroupCode){
                        return 'rgba(58, 208, 160, 1)'
                     }else{
                        return 'rgba(65, 165, 245, 0.5)'
                     }
                  }
               },

               // 各象限区域
               markArea: {
                     silent: true,
                     data: [
                        // 第一象限
                        [{
                           name: '战略型',
                           xAxis: centerMarkX, // x 轴开始位置
                           yAxis: centerMarkY, // y 轴结束位置(直接取最大值)
                           itemStyle: {
                                 color: '#FFFFFF'
                           },
                           label: {
                                 position: 'inside',
                                 color: '#A5BCE8',
                                 fontSize: 22,
                                 // backgroundColor:{
                                 //    image:require("@/assets/images/partRfq/internalDemandAnalysis01.png"),
                                 //    width:402
                                 // }
                           }
                        }, {
                           yAxis: 1000 // y轴开始位置
                        }],
                        // 第二象限
                        [{
                           name: '竞争型',
                           yAxis: 1000, // y 轴结束位置(直接取最大值)
                           itemStyle: {
                                 color: '#FFFFFF'
                           },
                           label: {
                                 position: 'inside',
                                 color: '#A5BCE8',
                                 fontSize: 22
                           }
                        }, {
                           xAxis: centerMarkX, // x 轴结束位置
                           yAxis: centerMarkY // y轴开始位置
                        }],
                        // 第三象限
                        [{
                           name: '普通型',
                           yAxis: centerMarkY, // y 轴结束位置
                           itemStyle: {
                                 color: '#FFFFFF'
                           },
                           label: {
                                 position: 'inside',
                                 color: '#A5BCE8',
                                 fontSize: 22
                           }
                        }, {
                           xAxis: centerMarkX, // x 轴结束位置
                           yAxis: 0 // y轴开始位置
                        }],
                        // 第四象限
                        [{
                           name: '限制型',
                           xAxis: centerMarkX, // x 轴开始位置
                           yAxis: centerMarkY, // y 轴结束位置
                           itemStyle: {
                                 color: '#FFFFFF'
                           },
                           label: {
                                 position: 'inside',
                                 color: '#A5BCE8',
                                 fontSize: 22
                           }
                        }, {
                           yAxis: 0 // y轴开始位置
                        }]
                     ]
               },
               // 中心点交集象限轴
               markLine: {
                     silent: true, // 是否不响应鼠标事件
                     precision: 2, // 精度
                     lineStyle: {
                        type: 'dashed',
                        color: '#ACB8CF'
                     },
                     label: {
                        color: '#00aca6',
                        position: 'end',
                     },
                     data: centerLine
               },
               // 中心点
               // markPoint: {
               //       show:false,
               //       symbol: 'circle',
               //       symbolSize: 0,
               //       itemStyle: {
               //          color: 'rgba(234, 85, 6, .8)'
               //       },
               //       label: {
               //          position: 'top'
               //       },
               //       data: centerMark
               // }
            }]
         }
         myChart.setOption(option);
         if(this.isInit){
            myChart.on('click',  (params)=> {
               this.isInit=false
               this.$emit('handleChartClick', params.data.materialGroupCode)
            });
         }
      }
   }
}
</script>
<style lang="scss" scoped>
.piecewise{
   height: 600px;
}
</style>
