<template>
  <div class="bar" ref="chart" :style="{height:`calc(100vh - ${height}px`}"></div>
</template>

<script>
import { numberProcessor, toThousands, deleteThousands } from "@/utils";
export default {
  props: {
    barName: String,
    height: Number,
    vsi: [Number, String],
    max: Number,
    color: String
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
              fontSize: this.fontSize(18),
              color :'#000',
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
        textStyle:{
          fontFamily: "'Arial', 'Helvetica', 'sans-serif'"
        },
        series: [
          {
            name: "VSI",
            type: "bar",
            barMaxWidth: "80",
            barMinWidth: "40",
            label: {
              show: true,
              position: "top",
              distance: 15,
              fontWeight: "bold",
              fontSize: this.fontSize(18),
              formatter: () => {
                return (
                  (+deleteThousands(this.vsi || 0)).toFixed(2) || ""
                );
              },
            },
            itemStyle: {
              color: this.color || "#a0dcff",
            },
            stack: "Supplier",
            data: [(+deleteThousands(this.vsi || 0)).toFixed(2) || ""],
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
  height: 400px;
  min-height: 200px;
}
</style>