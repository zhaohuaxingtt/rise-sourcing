<template>
  <iCard title="延迟原因汇总">
    <div ref="charts2" class="charts" v-show="chartsType"></div>
    <p class="nodata_yanwu" v-show="!chartsType">暂无数据</p>
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
      chartsType:true,
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
      this.charts = this.$echarts.init(this.$refs.charts2);
    },
    setEcharts(data){
      console.log(data);
      if(data.length < 1){
        this.chartsType = false;
        return false;
      }
      this.chartsType = true;

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

      console.log(dataList);
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
            radius: ['40%', '73%'],
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
.nodata_yanwu{
  width:100%;
  height:200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:13px;
  text-align:center;
  line-height: 200px;
}

</style>