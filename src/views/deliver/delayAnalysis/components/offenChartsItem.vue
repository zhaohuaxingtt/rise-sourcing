<template>
  <iCard :title="$t('Offen类型汇总')">
    <div ref="charts3" class="charts" v-show="chartsType"></div>
    <p class="nodata-yanwu" v-show="!chartsType">{{$t("LK_ZANWUSHUJU")}}</p>
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
        chartsType:true,
      }
    },
    mounted() {
      this.initCharts();
    },
    methods:{
      initCharts(){
        this.charts = this.$echarts.init(this.$refs.charts3)
      },
      setEcharts(data){
        if(data.length < 1){
          this.chartsType = false;
          return false;
        }

        this.chartsType = true;

        var list = [];
        var name = [];
        if(data){
          data.forEach(e => {
            list.push(e.num)
            name.push(e.name)
          });
        }

        let maxNum = Math.max.apply(null,list)
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
            top: '10',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data:name,
            name:'count',
            axisLabel:{
                formatter:function(value){
                    let rowMax = 4;
                    let overValue = "";
                    for(let i=0;i<value.length;i++){
                        if((i%rowMax == 0) && (i!=0)){
                            overValue+="\n";
                            overValue+=value[i];
                        }else{
                            overValue+=value[i];
                        }
                    }
                    return overValue;
                },
            }
          },
          yAxis: {
            type: 'value',
            max:max,
            axisTick:{
              show:false
            }
          },
          series: [
            {
              name: 'Offen类型数量',
              type: 'bar',
              data: list,
              barWidth:35,
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
  width: 600px;
  height: 200px;
}

.nodata-yanwu{
  width:800px;
  height:200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:13px;
}
</style>