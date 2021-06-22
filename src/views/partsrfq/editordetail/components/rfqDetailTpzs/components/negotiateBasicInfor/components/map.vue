<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:28:01
 * @LastEditors: zbin
 * @Descripttion: 总览
-->
<template>
  <div class="chartmap" ref="chart"></div>
</template>

<script>
import world from "./china.json";
import echarts from '@/utils/echarts'
export default {
  components: {},
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
    console.log(world);
    this.handleMap()
  },
  methods: {
    handleMap() {
      this.$nextTick(() => {
        const myChart = echarts().init(this.$refs.chart);
        echarts().registerMap('world', world);
        console.log(world);
        myChart.setOption({
          legend: {
            top: 0,
            left: 130,

            icon: "circle",
          },

          tooltip: {
            trigger: 'item',
          },
          toolbox: {
            show: false,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {}
            }
          },
          geo: {
            map: 'world',       // 与引用进来的地图js名字一致
            // roam: false,        // 禁止缩放平移
            // center: [106.557165, 29.570997],//当前视角的中心点
            // zoom: 2, //当前视角的缩放比例
            roam: false, //是否开启平游或缩放
            scaleLimit: { //滚轮缩放的极限控制
              min: 1,
              max: 100
            },
            label: {
              normal: {         // 默认的文本标签显示样式
                show: false,
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {        // 每个区域的样式 
              opacity: 0.6,
              normal: {
                borderColor: '#eef4fd',//区域边框颜色
                areaColor: '#fff'
              },
              emphasis: {
                show: false,
                areaColor: '#E6E9F4'
              },
            },
          },
          series: [
            {
              type: 'map',
              mapType: 'world', // 自定义扩展图表类型
              label: {
                show: false
              },
              itemStyle: {
                areaColor: '#e0ebfc', // 上层地图地区颜色china
                borderColor: '#fff', // 上层地图边框颜色
              },
              // data: convertData(data),
            },

            {
              type: 'scatter',
              coordinateSystem: 'geo',       // 表示使用的坐标系为地理坐标系
              zlevel: 3,
              rippleEffect: {
                period: 10.5, //波纹秒数
                brushType: 'fill', //stroke(涟漪)和fill(扩散)，两种效果
                scale: 40 //波纹范围
              },
              symbolSize: 15,
              label: {
                normal: {                  // 默认的文本标签显示样式
                  color: '#000',
                  show: true,
                  position: 'top',      // 标签显示的位置
                  formatter: '{b}'       // 标签内容格式器
                },

              },
              itemStyle: {
                normal: {
                  color: '#1763F7',
                  borderColor: '#aac3f5',
                  borderWidth: 3,
                },
                emphasis: {
                  borderColor: '#a5ddd6',
                  borderWidth: 5,
                  color: "#fff",//移入后的颜色
                }
              },
              data: [{ name: "芬兰", value: [24.909912, 60.169095], symbolSize: 8 },
              { name: "德国", value: [13.402393, 52.518569], symbolSize: 8 },
              { name: "英国", value: [-0.126608, 51.208425], symbolSize: 8 },
              { name: "韩国", value: [126.979208, 37.53875], symbolSize: 8 },
              { name: "日本", value: [139.710164, 35.706962], symbolSize: 8 },]
            },
            // {
            //   type: 'scatter',

            //   coordinateSystem: 'geo',       // 表示使用的坐标系为地理坐标系
            //   zlevel: 3,
            //   rippleEffect: {
            //     brushType: 'fill'        // 波纹绘制效果
            //   },
            //   label: {
            //     normal: {                  // 默认的文本标签显示样式
            //       show: true,
            //       color: '#000',
            //       position: 'top',      // 标签显示的位置
            //       formatter: '{b}'       // 标签内容格式器
            //     },

            //   },
            //   itemStyle: {
            //     normal: {
            //       color: '#05BB8B',
            //       borderColor: '#a5ddd6',
            //       borderWidth: 3,
            //     }
            //   },
            //   data: data

            // }
          ]
        });
      })
    },
  }
}
</script>

<style>
.chartmap {
  width: 100rem;
  height: 60rem;
}
.right {
  width: 339px;
  /* right: 0px;
  position: relative; */
}
</style>