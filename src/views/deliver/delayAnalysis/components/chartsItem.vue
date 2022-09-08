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
    created(){
      console.log(this.picLeftData);
    },
    mounted(){
      this.initCharts()
    },
    methods:{
      initCharts(){
        let charts = this.$echarts.init(this.$refs.charts)
        let option = {
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
                max:function(val){
                return parseInt(val.max*1.2)
                }
            },
            yAxis: {
              type: 'category',
              data:['重度延迟','中度延迟','轻度延迟'],
              axisTick:{
                show:false
              }
            },
            series: [
              {
                name: '重度延迟',
                type: 'bar',
                data: [1,10,15],
                label:{
                  show:true
                }
              },
            ]
          };
        charts.setOption(option);
      }
    }
  }
</script>

<style lang="scss" scoped>
.charts{
  width: 400px;
  height: 200px;
}
</style>