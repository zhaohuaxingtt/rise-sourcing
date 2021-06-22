<!--
 * @Author: your name
 * @Date: 2021-06-18 16:57:46
 * @LastEditTime: 2021-06-21 10:13:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\chart.vue
-->
<template>
  <iCard>
    <div class="curve" ref="curve" :style="{ height: chartHeight }"></div>
    <div class="flex textBox">
      <span
        v-for="(i, index) in dataList"
        :key="index"
        class="textList flex-center-center"
      >
        第<span>{{ i }}</span
        >/3轮
      </span>
    </div>
    <div class="flex contentBox">
      <label for="">车型项目名称</label>
      <span
        v-for="(i, index) in dataList"
        :key="index"
        class="textList flex-center-center"
      >
        第<span>{{ i }}</span
        >/3轮
      </span>
    </div>
  </iCard>
</template>

<script>
import { iCard } from "rise";
import echarts from "@/utils/echarts";
export default {
  components: {
    iCard,
  },
  mounted() {
    this.initEcharts();
  },
  props: {
    chartHeight: {
      type: String,
      default: "350px",
    },
  },
  data() {
    return {
      dataList: [1, 2, 3, 3, 3, 2, 3],
    };
  },
  methods: {
    initEcharts() {
      const chart = echarts().init(this.$refs.curve);
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          right: 60,
          icon: "circle",
          data: [
            "利润",
            "其他费用",
            "管理费",
            "报废成本",
            "制造费",
            "原材料/散件",
          ],
        },
        color: [
          "#0040BE",
          "#1763F7",
          "#5993FF",
          "#72AEFF",
          "#9BBEFF",
          "#C6DEFF",
        ],
        grid: {
          top: "30%",
          left:"0",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
        },
        xAxis: {
          type: "category",
          axisLabel:{
            formatter: function(val){
              console.log(val)
            },
              rich: {
        a: {
            color: 'red',
            lineHeight: 10
        },
        b: {
            backgroundColor: {
                image: 'xxx/xxx.jpg'
            },
            height: 40
        },
        x: {
            fontSize: 18,
            fontFamily: 'Microsoft YaHei',
            borderColor: '#449933',
            borderRadius: 4
        },
    }

          },
          // data: [
          //   "上海AA汽车",
          //   "长春BB汽车",
          //   "武汉CC汽车",
          //   "苏州DD汽车",
          //   "苏州EE汽车",
          //   "苏州EE汽车",
          //   "Best of Best",
          // ],
          data:[
            {
              name:"上海AA汽车",
              lun:3
            },
          ]
        },
        series: [
          {
            name: "利润",
            type: "bar",
            stack: "total",
            barWidth: 50,
            label: {
              show: true,
            },
            itemStyle:{

            },
            emphasis: {
              focus: "series",
            },
            data: [20, 20, 20, 15, 20, 20, 15],
          },
          {
            name: "其他费用",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [10, 10, 10, 10, 5, 10, 5],
          },
          {
            name: "管理费",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [15, 15, 5, 15, 15, 15, 5],
          },
          {
            name: "报废成本",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [15, 10, 15, 15, 15, 15, 10],
          },
          {
            name: "制造费",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [20, 25, 25, 25, 25, 20, 20],
          },
          {
            name: "原材料/散件",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            itemStyle: {
               barBorderRadius: [5,5,0,0], 
            },
            emphasis: {
              focus: "series",
            },
             barGap:'40%',
            data: [25, 35, 10, 25, 31, 31, 10],
          },
        ],
      };
      chart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.curve {
  width: 100%;
  height: 579px;
}
.textBox {
  margin: 0 50px 0 70px;
}
.contentBox {
  margin: 0 50px 0 0;
}
.textList {
  flex: 1;
}
</style>
