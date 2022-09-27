<template>
  <iCard title="延迟级别汇总">
    <div ref="charts1" class="charts" v-show="chartsType"></div>
    <p class="nodata-yanwu"  v-show="!chartsType">暂无数据</p>
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
    data(){
      return{
        chartslist:null,
        option:null,
        chartsType:true,
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
        this.chartslist = this.$echarts.init(this.$refs.charts1);
      },
      setEcharts(data){
        console.log(data);
        if(data.length < 1){
          this.chartsType = false;
          return false;
        }
        this.chartsType = true;
        
        var dataList = [];
        var nameList = [];
        if(data){
          dataList = data.map(item => {
            return item.num
          })
          nameList = data.map(item => {
            return item.name
          })
        }
        var maxNum = Math.max.apply(null,dataList)
        var max = Math.ceil(maxNum/10)*10

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
              name: '延迟级别数量',
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

        this.chartslist.setOption(this.option);
      }
    }
  }
</script>

<style lang="scss" scoped>
.charts{
  width:  65%;
  height: 200px;
}

.nodata-yanwu{
  width:100%;
  height:200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:13px;
}
</style>