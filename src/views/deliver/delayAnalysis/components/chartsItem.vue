<template>
  <iCard title="延迟级别汇总">
    <div ref="charts" class="charts"></div>
  </iCard>
</template>

<script>
import { iCard } from "rise";
  export default {
    components:{
      iCard
    },
    props:{
      picLeftData:{
        type:Array,
        default:[],
      }
    },
    data:{
      return:{
        charts:null,
        option:null,
      }
    },
    created(){
      // console.log(this.picLeftData);
    },
    mounted(){
      this.initCharts();
    },
    methods:{
      initCharts(){
        this.charts = this.$echarts.init(this.$refs.charts)
      },
      setEcharts(data){
        let dataList = [];
        let nameList = [];
        if(data){
          dataList = data.map(item => {
            return item.num
          })
          nameList = data.map(item => {
            return item.name
          })
        }
        let maxNum = Math.max.apply(null,dataList)
        let max = Math.ceil(maxNum/10)*10

        this.option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '10',
            right: '10',
            bottom: '10',
            top: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            name:'count',
            max:max,
          },
          yAxis: {
            type: 'category',
            data:nameList,
            axisTick:{
              show:false
            }
          },
          series: [
            {
              name: '重度延迟',
              type: 'bar',
              data: dataList,
              barWidth:30,
              label:{
                show:true,
              },
              itemStyle: {
                normal: {
                  color:(val) => {
                    var colorList = ['#5993FF', '#1763F7', '#0040BE'];
                    return colorList[val.dataIndex]
                  },
                  barBorderRadius: [0, 5, 5, 0],
                },
              },
            },
          ]
        };
        this.charts.setOption(this.option);
      }
    }
  }
</script>

<style lang="scss" scoped>
.charts{
  width: 65%;
  height: 200px;
}
</style>