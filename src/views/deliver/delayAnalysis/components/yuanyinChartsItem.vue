<template>
  <iCard title="延迟原因汇总">
    <div ref="charts" class="charts"></div>
  </iCard>
</template>

<script>
import { iCard } from "rise";
export default {
  components: {
    iCard,
  },
  props:{
    picRightData:{
      type:Array,
      default:[],
    }
  },
  data(){
    return{
      charts:null,
      option:null,
    }
  },
  mounted() {
    this.initCharts();
  },
  created(){
    // console.log(this.picRightData);
  },
  methods: {
    initCharts() {
      this.charts = this.$echarts.init(this.$refs.charts);
    },
    setEcharts(data){
      let dataList = [];
      if(data){
        data.forEach((e,index) => {
          if(!dataList[index]){
            dataList[index] = {};
            dataList[index].name = e.name;
            dataList[index].value = e.num;
          }
        });
      }
      this.option = {
        tooltip: {
          trigger: "item",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "10",
          right: "10",
          bottom: "10",
          top: "10%",
          containLabel: true,
        },
        series: [
          {
            name: "延迟原因数量",
            type: "pie",
            radius: ['40%', '75%'],
            itemStyle: {
              borderRadius: 2,
              borderColor: '#fff',
              borderWidth: 1
            },
            data: dataList,
            label: {
              show: true,
            },
            labelLine: {
              length: 20,
            },
          },
        ],
      };
      this.charts.setOption(this.option);
    }
  },
};
</script>

<style lang="scss" scoped>
.charts {
  width: 600px;
  height: 200px;
}
</style>