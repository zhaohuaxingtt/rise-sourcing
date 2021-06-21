
<template>
  <div style="height:460px" ref="chart"></div>
</template>
<script >
import echarts from '@/utils/echarts'
import crown from '@/assets/images/bob.png'
import lv from '@/assets/images/lv.png'
import ball from '@/assets/images/ball.png'
export default {
    props:{
        chartData:{
            type:Array,
            default:()=>[
              
            ]
        },
        title:{
          type:String,
          default:''
        }
    },
    data(){
        return {
            chartArray:[],
            labelArray:[],
            lineArray:[],
            lineDataArray:[],
            legendArray:[],
            dataArray:[],
            sum:window._.sum,
            minBy:window._.minBy,
            toPairs:window._.toPairs,
            omit:window._.omit,
            words:window._.words,
            cloneDeep:window._.cloneDeep,
            take:window._.take,
            crown:crown,
            lv:lv,
            ball:ball
        }
    },
    methods: {
    initCharts() {
      const myChart = echarts().init(this.$refs.chart);
      // 绘制图表
      const option = {
          title:{
            text:this.title,
            subtext:'Unit: CNY/pcs',
            subtextStyle:{
              color:'#7E84A3',
              fontSize :12
            }
          },
          legend: {
            top:'10',
            left:'right',
            icon:'circle',
            fontSize: '10',
            data: this.legendArray
          },
          grid:{
            containLabel:true
          },
          xAxis: [
          {
              type: 'category',
              data: this.labelArray,
              nameTextStyle:{
                verticalAlign:'bottom'
              },
              axisTick: {
                show:false,
                alignWithLabel: true
              },
              triggerEvent:true
          }
          ],
          yAxis: [
              {
                  type: 'value',
                  name: '\n\n\n车型项目名称\nCBD报价时间',
                  axisLabel:{
                    color:'#7E84A3',

                  },
                  axisTick:{
                    show:false
                  },
                  axisLine:{
                    show:false,
                  },
                  splitNumber:4,
                  nameLocation:'start',
                  offset:40,
              }
          ],
          emphasis: {
              focus: 'series'
          },
          color:['#1F33CC','#404FC3','#0E2C90','#0040BE','#1763F7','#5993FF','#72AEFF','#94C8FC'],
          series: this.dataArray
        };
      myChart.setOption(option);
      const that=this
      myChart.on('click', function (params) {
        if(params.targetType==='axisLabel'&&params.value==='Best of Best'){
          that.$emit('select',params)
        }
      });
    },
  },
  mounted() {
    this.initCharts();
  },
  watch:{
    title:{
      handler(str){
        if(this.$refs.chart&&this.chartArray.length>0){
            this.initCharts();
        }
      },
      immediate:true
    },
      chartData:{
          handler(newVal){
            if(newVal){
              this.chartArray=newVal
              const tempArr = []
                newVal.forEach((row,i)=>{
                  if(i===0){
                    this.labelArray=row.list.map((v)=>{
                      const index=3
                      const all=3
                      const temp='途观2015\n2019.03'
                      const str=v.key+'\n第{Blue|'+index+'}/'+all+'轮\n\n'+temp
                      return {
                        value:str,
                        textStyle:{
                          rich:{
                            Blue:{
                              fontSize: 20,
                              fontWeight: 500,
                              color: '#1763F7',
                            },
                          }
                        }
                      }
                    })

                    this.labelArray.push('Best of Best')
                  }
                  this.legendArray.push(row.name); 
                  const dataList=row.list.map((v)=>{
                      if(!tempArr[v.key]){
                        tempArr[v.key]=[]
                      }
                      tempArr[v.key].push(v.value)
                      return [v.key,v.value]
                    })
                  const min=this.minBy(dataList.map(v=>v[1]))
                  if(i===0){
                    tempArr['Best of Best']=[]
                  }
                  
                  dataList.push(['Best of Best',min])
                  tempArr['Best of Best'].push(min)
                  const dataList0=this.cloneDeep(dataList)
                  const dataList1=this.cloneDeep(dataList).map((v)=>{
                    return this.sum(this.take(tempArr[v[0]],i+1))
                  })
                  this.dataArray.push({
                    name:row.name,
                    type: 'bar',
                    barGap:'-100%',
                    z:20-i,
                    emphasis: {
                      focus: 'series'
                    },
                    label:{
                      show: true,
                      position:'insideTop',
                      color:'white',
                      formatter: (params) =>{
                        const indexName=params.name.split('\n')[0]
                        return tempArr[indexName][(params.seriesIndex-1)/2]
                      },
                      rich:{
                        lv: {
                                height: 15,
                                align: 'right',
                                backgroundColor: {
                                    image: this.lv
                                }
                            },
                      }
                    },
                    labelLine: {
                        show: false
                    },
                    itemStyle: {
                      barBorderRadius:[5, 5, 0, 0]
                    },
                    barWidth:'30%',
                    data:dataList1,
                  })
                  this.dataArray.push({
                    name:row.name+'lv',
                    type: 'bar',
                    stack:'lv',
                    emphasis: {
                      focus: 'series'
                    },
                    label:{
                      show: true,
                      position:'right',
                      formatter:(params)=>{
                        if(min===params.value&&params.name!=='Best of Best'){
                          return '{lv|}'
                        } else{
                          return ''
                        }
                        
                      },
                      color:'white',
                      rich:{
                        lv: {
                                height: 10,
                                align: 'right',
                                backgroundColor: {
                                    image: this.lv
                                }
                            },
                      }
                    },
                    labelLine: {
                        show: false
                    },
                    itemStyle: {
                      barBorderRadius:[5, 5, 0, 0],
                      color:'#fff',
                    },
                    barWidth:30,
                    data:dataList0.map((v)=>v[1]),
                  })             
                })
                this.dataArray.push({
                    name:'sum',
                    type: 'bar',
                    stack:'lv',
                    label:{
                      show: true,
                      position: 'top',
                      color:'#3C4F74',
                      fontSize: 18,
                      align: 'center',
                      formatter: (params) =>{
                        console.log(params)
                        const indexName=params.name.split('\n')[0]
                        console.log(indexName)
                        const min=this.minBy(this.toPairs(this.omit(tempArr,'Best of Best')),(arr)=> {
                          return this.sum(arr[1])
                        })
                        // const sum=this.sum(tempArr[params.name])
                        if(params.name==='Best of Best'){
                          const sum=this.sum(tempArr[params.name])
                          return '{bold|'+sum+'}'
                        }
                        else if(min){
                          const sum=this.sum(tempArr[indexName])
                          const minValue=this.sum(min[1])
                          if(minValue===sum){
                            return '{Ball|} {BB|Best Ball}\n'+sum
                          }else{
                            return sum
                          }
                        } else {
                          const sum=this.sum(tempArr[indexName])
                          return sum
                        }
                      },
                      rich:{
                        BB:{
                          fontSize: 16,
                          fontWeight: 400,
                          color: '#7E84A3',
                        },
                        bold:{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: '#000',
                        },
                        Crown:{
                                height: 15,
                                align: 'center',
                                backgroundColor: {
                                    image: this.crown
                                }
                            },
                        Ball:{
                                height: 15,
                                align: 'center',
                                backgroundColor: {
                                    image: this.ball
                                }
                            },
                      }
                    },
                    labelLine: {
                        show: false
                    },
                    itemStyle: {
                      barBorderRadius:[5, 5, 0, 0]
                    },
                    barWidth:'30%',
                    data:this.dataArray.map((v)=>{
                      return 0}
                    ),
                })
                
                this.chartArray=newVal;
                if(this.$refs.chart&&this.chartArray.length>0){
                    this.initCharts();
                }
            }
                
            },
            immediate:true,
      }
  }
};
</script>
