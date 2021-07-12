
<template>
  <div style="height:460px" ref="chart"></div>
</template>
<script >
import echarts from '@/utils/echarts'
import bobChange from '@/assets/images/bob-change.png'
import del from '@/assets/images/bob-del.png'
export default {
    props:{
        chartData:{
            type:Array,
            default:()=>[
              
            ]
        },
        preview:{
          type:Boolean,
          default:true
        }
    },
    data(){
        return {
            chartArray:[],
            labelArray:[],
            legendKeys:{
              '原材料/散件':'rawMaterialSummary',
              '制造费':'manufacturingCostSummary',
              '报废成本':'discardCostsSummary',
              '管理费':'administrationCostsSummary',
              '其他费用':'otherCostsSummary',
              '利润':'profit'},
            legendArray:['原材料/散件','制造费','报废成本','管理费','其他费用','利润'],
            dataArray:[],
            sum:window._.sum,
            min:window._.min,
            max:window._.max,
            sumBy:window._.sumBy,
            minBy:window._.minBy,
            toPairs:window._.toPairs,
            omit:window._.omit,
            words:window._.words,
            cloneDeep:window._.cloneDeep,
            take:window._.take,
            bobChange:bobChange,
            del:del,
        }
    },
    methods: {
    bos(arr){
      const min=this.min(arr)
      let send=this.max(arr)
      arr.forEach((i)=>{
        if(i>min){
          if(i<send){
            send=i
          }
        }
      })
      // console.log(send)
      return send
    },
    initCharts() {
      const myChart = echarts().init(this.$refs.chart);
      // 绘制图表
      const option = {
          title:{
            show:this.preview,
            text:'{del|}',
            left:'right',
            top:20,
            triggerEvent:true,
            textStyle:{
              rich:{
                del: {
                  height: 20,
                  align: 'right',
                  backgroundColor: {
                      image: this.del
                  }
              },
              }
            }
          },
          legend: {
            show:false
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
              axisLabel:{
                interval:0
              },
              triggerEvent:true
          }
          ],
          yAxis: [
              {
                  type: 'value',
                  name: '',
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
        console.log(params)
        if(params.componentType==='title'){
          that.$emit('del')
        }
        if(params.componentType==='xAxis'){
          that.$emit('change')
        }
      });
    },
    initData(newVal){
      if(newVal){
              // console.log(newVal)
              this.chartArray=newVal
              this.labelArray=[]
              this.dataArray=[]
              const tempArr = []
              const dataList1 = []
              newVal.forEach((row,i)=>{
                // console.log(row)
                let name=row.supplierId
                if(this.by==='num'){
                  name=row.spareParts
                }
                let img='\t{bobChange|}'
                if(!this.preview){
                  img=''
                }
                const str=name+img+'\n第{Blue|'+row.turn+'}/'+row.totalTurn+'轮\n\n\n\n'
                this.labelArray.push({
                  value:str,
                  textStyle:{
                    rich:{
                      Blue:{
                        fontSize: 20,
                        fontWeight: 500,
                        color: '#1763F7',
                      },
                      bobChange:{
                        height: 25,
                        backgroundColor: {
                          image: this.bobChange
                        }
                      }
                    },
                    
                  }
                })
                // console.log(this.labelArray)
                this.legendArray.map((v,i)=>{
                  if(!tempArr[v]){
                    tempArr[v]=[]
                    dataList1[v]=[]
                  }
                  tempArr[v].push(row[this.legendKeys[v]])
                  const sum=this.sumBy(this.take(this.legendArray,i+1),(k)=>{
                    return row[this.legendKeys[k]]
                  })
                  // console.log(sum)
                  dataList1[v].push(sum)
                  // console.log(dataList1)
                })
              })
              // console.log(tempArr)
              const minList=[]
              this.legendArray.forEach((row,i)=>{
                const dataList0=this.cloneDeep(tempArr[row])

                const min=this.min(tempArr[row])
                let data=min
                minList.push(data)
                // console.log(dataList0)
                // console.log(dataList1)
                this.dataArray.push({
                    name:row,
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
                        console.log(tempArr[row])
                        return (tempArr[row][0])
                      },
                    },
                    labelLine: {
                        show: false
                    },
                    itemStyle: {
                      barBorderRadius:[5, 5, 0, 0]
                    },
                    barWidth:'20%',
                    data:[...dataList1[row],this.sum(minList)],
                  })
                
              })
              this.dataArray.push({
                    name:'sum',
                    type: 'bar',
                    barGap:'-100%',
                    z:1,
                    label:{
                      show: true,
                      position: 'top',
                      color:'#3C4F74',
                      fontSize: 18,
                      align: 'center',
                      formatter: (params) =>{
                        // console.log(params)
                        
                          const sum=dataList1['利润'][0]
                          return sum
                      },
                    },
                    labelLine: {
                        show: false
                    },
                    itemStyle: {
                      barBorderRadius:[5, 5, 0, 0],
                      color:'#fff'
                    },
                    barWidth:'20%',
                    data:[dataList1['利润'][0]]
                })
                console.log(this.dataArray)
          
                if(this.$refs.chart&&this.chartArray.length>0){
                    this.initCharts();
                }
            }
    }
  },
  mounted() {
    this.initCharts();
  },
  watch:{
    title:{
      handler(str){
        console.log()
        if(this.$refs.chart&&this.chartArray.length>0){
            this.initCharts();
        }
      },
      immediate:true
    },
    by:{
      handler(str){
        this.initData(this.chartData)
      }
    },
    type:{
      handler(str){
        this.initData(this.chartData)
      }
    },
      chartData:{
          handler(newVal){
              if(newVal&&newVal.length>0){
                this.initData(newVal)
              }
              
                
            },
            deep:true,
            immediate:true
      }
  }
};
</script>
