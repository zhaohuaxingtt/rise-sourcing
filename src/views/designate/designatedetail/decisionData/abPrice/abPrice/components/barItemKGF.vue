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
    colorB: String,
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
    },
    data:{
      handler(){
        this.drawBar();
      },
      deep:true
    }
  },
  mounted() {
    window.addEventListener("resize", this.resize);
    this.drawBar();
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
            name: "APrice",
            type: "bar",
            label: {
              show: true,
              position: "inside",
              fontSize: this.fontSize(18),
              backgroundColor: "#97a0bb"
            },
            // barWidth:'60',
            barMaxWidth: "80",
            barMinWidth: "40",
            stack: "Supplier",
            data: [this.data.aPrice||'0.00'],
            itemStyle: {
              color: "#97a0bb",
            },
          },
          {
            name: "BPrice",
            type: "bar",
            label: {
              show: true,
              position: "insideLeft",
              fontSize: this.fontSize(18),
              backgroundColor: "#f9ce03"
            },
            barMaxWidth: "80",
            barMinWidth: "40",
            barMinHeight: "10",
            stack: "Supplier",
            data: [this.data.bPrice||'0.00'],
            itemStyle: {
              color: "#f9ce03",
            },
          },
          {
            name: "CPrice",
            type: "bar",
            label: {
              show: true,
              position: "insideRight",
              fontSize: this.fontSize(18),
              backgroundColor: "#069444"
            },
            barMaxWidth: "80",
            barMinWidth: "40",
            stack: "Supplier",
            data: [this.data.cPrice||'0.00'],
            itemStyle: {
              color: "#069444",
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
              fontSize: this.fontSize(18),
              formatter: () => {
                return (
                  ((+this.data.aPrice || 0)+(+this.data.bPrice || 0)+(+this.data.cPrice || 0)).toFixed(2)
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
          this.charts&&this.charts.resize();
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