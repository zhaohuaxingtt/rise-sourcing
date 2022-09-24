<template>
  <iCard title="Offen类型汇总">
    <div ref="charts" class="charts"></div>
  </iCard>
</template>

<script>
import { iCard } from "rise";
  export default {
    components:{
      iCard
    },
    data(){
      return{
        charts:null,
        option:null,
      }
    },
    mounted(){
      this.initCharts()
    },
    methods:{
      initCharts(){
        this.charts = this.$echarts.init(this.$refs.charts)
      },
      setEcharts(){
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
            type: 'category',
            data:['No Test Requirement','No BF','No kickoff'],
            name:'count',
              max:function(val){
              return parseInt(val.max*1.2)
              }
          },
          yAxis: {
            type: 'value',
            axisTick:{
              show:false
            }
          },
          series: [
            {
              name: '重度延迟',
              type: 'bar',
              data: [5,3,2],
              label:{
                show:true
              }
            },
          ]
        };
        this.charts.setOption(this.option);
      },
    }
  }
</script>

<style lang="scss" scoped>
.charts{
  width: 400px;
  height: 200px;
}
</style>