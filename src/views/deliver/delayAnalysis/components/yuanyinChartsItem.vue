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
  mounted() {
    this.initCharts();
  },
  created(){
    console.log(this.picRightData);
  },
  methods: {
    initCharts() {
      let charts = this.$echarts.init(this.$refs.charts);
      let option = {
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
            name: "重度延迟",
            type: "pie",
            radius: ['25%', '50%'],
            itemStyle: {
              borderRadius: 2,
              borderColor: '#fff',
              borderWidth: 1
            },
            data: [
              { value: 1048, name: "1 WPAB系统/IMDS提交" },
              { value: 335, name: "Direct" },
              { value: 310, name: "Email" },
              { value: 251, name: "Google" },
              { value: 234, name: "Union Ads" },
              { value: 147, name: "Bing" },
              { value: 135, name: "Video Ads" },
              { value: 102, name: "Others" },
            ],
            label: {
              show: true,
            },
            labelLine: {
              length: 20,
            },
          },
        ],
      };
      charts.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.charts {
  width: 600px;
  height: 200px;
}
</style>