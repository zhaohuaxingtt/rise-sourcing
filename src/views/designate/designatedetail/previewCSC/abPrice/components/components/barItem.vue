<template>
  <div class="bar" ref="chart"></div>
</template>

<script>
export default {
  props: {
    barName: String,
  },
  data() {
    return {
      key: "",
      carts: null,
    };
  },
  created(){
    this.APrice = parseFloat(32 * Math.random()).toFixed(2)
    this.BPrice = parseFloat(32 * Math.random()).toFixed(2)
    this.Total = (Number(this.APrice)+Number(this.BPrice)).toFixed(2)
  },
  mounted() {
    window.addEventListener("resize", this.resize);
    this.drawLine();
  },
  methods: {
    // 英式曲线图
    drawLine() {
      this.carts = this.$echarts.init(this.$refs.chart);
      let options = {
        title: {
          show: false,
        },
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          show: false,
        },
        grid: {
          left: "0",
          right: "0",
          bottom: "30",
          containLabel: false,
        },
        xAxis: [
          {
            type: "category",
            data: [this.barName],
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "APrice",
            type: "bar",
            label: {
              show: true,
              position: "inside",
            },
            // barWidth:'60',
            barMaxWidth:'140',
            barMinWidth:'40',
            barMinHeight:"10",
            stack: "Supplier",
            data: [this.APrice],
            itemStyle: {
              color: "#516894",
            },
          },
          {
            name: "BPrice",
            type: "bar",
            label: {
              show: true,
              position: "inside",
            },
            barMaxWidth:'140',
            barMinWidth:'40',
            barMinHeight:"10",
            stack: "Supplier",
            data: [this.BPrice],
            itemStyle: {
              color: "#d8ddd7",
            },
          },
          {
            name: "Total",
            type: "bar",
            label: {
              show: true,
              position: "top",
              distance:15,
              fontWeight:'bold',
              formatter:()=>{
                return this.Total
              }
            },
            stack: "Supplier",
            data: [0],
          },
        ],
      };
      this.carts.setOption(options);
      this.$nextTick(this.resize());
    },
    resize() {
      this.$nextTick(() => {
        setTimeout(()=>{
          this.carts.resize();
        },0)
      });
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
};
</script>

<style lang="scss" scoped>
.bar {
  width: 100%;
  height: 300px;
}
</style>