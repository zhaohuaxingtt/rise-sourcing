<template>
  <div class="bar" ref="chart" :style="{height:`calc(100vh - ${height}px`}"></div>
</template>

<script>
import { numberProcessor, toThousands, deleteThousands } from "@/utils";
export default {
  props: {
    barName: String,
    height: Number,
    data: Object,
    max: Number,
    opacityA: String,
    opacityB: String,
  },
  data() {
    return {
      key: "",
      charts: null,
    };
  },
  watch:{
    height(){
      this.resize()
    }
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
    getDiff() {
      let result =
        deleteThousands(this.data.bPrice || 0) -
        deleteThousands(this.data.aPrice || 0);
      return (+result).toFixed(2);
    },
    fontSize(res){
      const fontSize = parseFloat(document.getElementsByTagName('html')[0].style.fontSize) || 16;
      return res*(fontSize/16);
    },
    drawBar() {
      this.charts = this.$echarts.init(this.$refs.chart,null,{ renderer : 'svg' });
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
            axisLabel: {
              fontSize: this.fontSize(20),
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            max:this.max*1.1,
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
              fontSize: this.fontSize(20),
            },
            // barWidth:'60',
            barMaxWidth: "80",
            barMinWidth: "40",
            barMinHeight: "10",
            stack: "Supplier",
            data: [(+deleteThousands(this.data.aPrice || 0)).toFixed(2) || ""],
            itemStyle: {
              color: "#516894",
              opacity: this.opacityA || 1
            },
          },
          {
            name: "BPrice",
            type: "bar",
            label: {
              show: true,
              position: "inside",
              fontSize: this.fontSize(20),
            },
            barMaxWidth: "80",
            barMinWidth: "40",
            barMinHeight: "10",
            stack: "Supplier",
            data: [this.getDiff()],
            itemStyle: {
              color: "#d8ddd7",
              opacity: this.opacityB || 1
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
              fontSize: this.fontSize(20),
              formatter: () => {
                return (
                  (+deleteThousands(this.data.bPrice || 0)).toFixed(2) || ""
                );
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
  height: calc(100vh - 600px);
}
</style>