<template>
  <div class="bar" ref="chart"></div>
</template>

<script>
export default {
  props: {
    barName: String,
    data:Object
  },
  data() {
    return {
      key: "",
      charts: null,
    };
  },
  mounted() {
    window.addEventListener("resize", this.resize);
    this.drawBar();
    this.resize();
  },
  updated() {
    this.resize();
  },
  methods: {
    drawBar() {
      this.charts = this.$echarts.init(this.$refs.chart);
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
            barMaxWidth: "140",
            barMinWidth: "40",
            barMinHeight: "10",
            stack: "Supplier",
            data: [this.data.aPrice],
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
            barMaxWidth: "140",
            barMinWidth: "40",
            barMinHeight: "10",
            stack: "Supplier",
            data: [this.data.bPrice],
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
              distance: 15,
              fontWeight: "bold",
              formatter: () => {
                return (Number(this.data.aPrice) + Number(this.data.bPrice)).toFixed(2)||'';
              },
            },
            stack: "Supplier",
            data: [0],
          },
        ],
      };
      this.charts.setOption(options);
      this.$nextTick(this.resize());
    },
    resize() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.charts.resize();
        }, 32);
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