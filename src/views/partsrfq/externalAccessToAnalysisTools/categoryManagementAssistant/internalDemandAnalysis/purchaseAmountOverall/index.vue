<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-07-30 17:31:22
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iCard class="content">
    <div class="title flex-between-center-center margin-bottom30">
      <div>
        <div class="text">采购金额总览</div>
        <el-row class="margin-top35" style="width:430px" :gutter="15">
          <el-col :span="12">
            <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.year">
              <el-option :value="item.code" :label="item.name" v-for="item of formGoup.yearList" :key="item.code"></el-option>
            </iSelect>
          </el-col>
          <el-col :span="12">
            <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.supplier">
              <el-option :value="item.code" :label="item.name" v-for="item of formGoup.supplierList" :key="item.code"></el-option>
            </iSelect>
          </el-col>
        </el-row>
      </div>
      <div>
        <iButton>{{$t('LK_BAOCUN')}}</iButton>
        <iButton>{{$t('LK_BAOCUN')}}</iButton>
        <div class="margin-top30">
          <iButton>{{$t('LK_BAOCUN')}}</iButton>
          <iButton>{{$t('LK_BAOCUN')}}</iButton>
        </div>
      </div>
    </div>
    <div style="height: 540px;width:100%" ref="chart"></div>
  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import echarts from '@/utils/echarts'
import { iCard, iSelect, iPage, iButton } from "rise";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, iSelect, iPage, iButton },
  data() {
    // 这里存放数据
    return {
      form: {
        year: '',
        supplier: ''
      },
      formGoup: {
        yearList: [],
        supplierList: []
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    initCharts() {
      const myChart = echarts().init(this.$refs.chart);
      var option = {
        title: {
          subtext: "Unit: Million",
          text: '',
          textStyle: {
            fontSize: 18,
            fontFamily: 'Arial',
            lineHeight: 16,
            fontWeight: 'bold'
          },
          subtextStyle: {
            color: "#7E84A3",
            fontSize: 14,
            fontFamily: "Arial",
            left: -10
          },
          left: 0,
          top: 20
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          show: false
        },
        legend: {
          left: 0,
          itemWidth: 15,
          itemHeight: 15,
          icon: 'circle',
          data: ['可用', '不可用'],
        },
        xAxis: {
          left: 0,
          type: "category",
          nameTextStyle: {
            verticalAlign: "bottom",
          },
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              type: "dashed",
              width: 1,
              color: '#ccc'
            },
          },
          axisLabel: {
            fontFamily: "Arial",
            interval: 0,
            fontSize: 12,
            fontWeight: 900,
            lineHeight: 18,
            color: '#3C4F74'
          },
          triggerEvent: true,
          data: ["网络设备", "服务器", "应用", "其他", "虚拟机", "存储"],
          offset: 6
        },
        yAxis: {
          type: "value",
          offset: 15,
          name: "\n\n\n\n\n车型项目\n\n报价时间",
          axisLabel: {
            fontSize: 12,
            color: "#3C4F74",
            fontWeight: 400,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitNumber: 5,
          nameLocation: "start",
        },
        grid: {
          left: '1.6%',
          right: '0%',
          bottom: '1.6%',
          containLabel: true
        },
        series: [
          {
            name: '可用',
            type: 'bar',
            stack: '使用情况',
            data: [5, 20, 36, 10, 10, 20,],
            barGap: "-100%",
            z: 2,
            emphasis: {
              focus: "series",
            },
            label: {
              show: true,
              position: "inside",
              fontSize: 12,
              color: "white",
              fontFamily: "Arial",
              distance: 15,
              offset: [-2, 0],
            },
            itemStyle: {
              normal: {
                color: "#0059FF",
                barBorderRadius: [5, 5, 0, 0],
              },
            },
            barWidth: 40,
          }, {
            name: '不可用',
            type: 'bar',
            stack: '使用情况',
            data: [40, 22, 18, 35, 42, 40],
            itemStyle: {
              normal: {
                color: "#6EA0FF",
                barBorderRadius: [5, 5, 0, 0],
              },
            },
            barWidth: 40,
            barGap: "-100%",
            z: 1,
            emphasis: {
              focus: "series",
            },
            label: {
              show: true,
              position: "inside",
              fontSize: 12,
              color: "white",
              fontFamily: "Arial",
              distance: 15,
              offset: [-2, 0],
            },
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log(this.$refs.chart);
    if (this.$refs.chart) {
      this.initCharts()
    }
  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.content {
  .title {
    .text {
      font-size: 22px;
      font-weight: Bold;
    }
  }
}
</style>
