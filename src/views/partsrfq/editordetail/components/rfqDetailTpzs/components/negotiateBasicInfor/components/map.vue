<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:28:01
 * @LastEditors: zbin
 * @Descripttion: 总览
-->
<template>
  <div>
    <div :class="tableData.length<13?'flex top':'flex scroll'">
      <div class="flex margin-right50" v-for="(item,index) in tableData" :key="index">
        <div :style="'background:'+color[index]" class="circle margin-right4"></div>
        <div>{{item.name}}</div>
      </div>
    </div>
    <div class="chartmap" ref="chart"></div>
  </div>
</template>

<script>
import world from "./china.json";
import echarts from '@/utils/echarts'
import { iCard, icon, iLabel } from "rise";
export default {
  components: { iCard, icon, iLabel },
  data() {
    return {
      color: ['#B9DDFA', '#8BC7F7', '#46B3F3', '#009FEF', '#008CEE', '#0078ED', '#0050EB', '#0641C8', '#0B31A5', '#46647C', '#235A7A', '#005078'],
      tableData: [
        { name: '重庆', value: [107.51, 29.63], symbolSize: 2 },
        { name: '甘肃', value: [103.82, 36.05], symbolSize: 2 },
        { name: '山东', value: [118.01, 36.37], symbolSize: 2 },
        { name: '陕西', value: [108.94, 34.46], symbolSize: 2 },
        { name: '河南', value: [113.46, 34.25], symbolSize: 2 },
        { name: '安徽', value: [117.28, 31.86], symbolSize: 2 },
        { name: '江苏', value: [120.26, 32.54], symbolSize: 2 },
        // { name: '上海', value: [121.46, 31.28], symbolSize: 2 },
        // { name: '四川', value: [103.36, 30.65], symbolSize: 2 },
        // { name: '四川', value: [103.36, 30.65], symbolSize: 2 },
        // { name: '四川', value: [103.36, 30.65], symbolSize: 2 },
        // { name: '四川', value: [103.36, 30.65], symbolSize: 2 },
        // { name: '四川', value: [103.36, 30.65], symbolSize: 2 },
        // { name: '四川', value: [103.36, 30.65], symbolSize: 2 },
        // { name: '四川', value: [103.36, 30.65], symbolSize: 2 },
        // { name: '陕西', value: [103.36, 30.65], symbolSize: 2 },

      ]
    }
  },
  created() {
  },
  mounted() {
    this.handleMap()
  },
  methods: {
    handleMap() {
      this.$nextTick(() => {
        const myChart = echarts().init(this.$refs.chart);
        echarts().registerMap('world', world);
        myChart.setOption({
          legend: {
            top: 0,
            left: 130,

            icon: "circle",
          },
          tooltip: {
            trigger: 'item',
            backgroundColor: '#fff',
            borderColor: '#EEF1F7',
            borderWidth: 1,

            formatter: (params) => {
              return `<div class='tooltip'>
                          <div class='flex'>
                            <div class="img"></div><div class='title'>${'供应商'}</div>
                          </div>
                          <div class='label'>${this.$t('LK_CHEXINGXIANGMU') + ':'}</div>
                          <div class='value'>${1}</div>
                          <div class='label'>${this.$t('TPZS.SQDZDZ')}</div>
                          <div class='value'>${1}</div>
                          <div class='label'>${this.$t('TPZS.ZXSE')}</div>
                          <div class='value'>${1}</div>
                      </div>`
            },
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
          color: ['#B9DDFA',
            '#8BC7F7',
            '#46B3F3',
            '#009FEF',
            '#008CEE',
            '#0078ED',
            '#0050EB',
            '#0641C8',
            '#0B31A5',
            '#46647C',
            '#235A7A',
            '#005078'],
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
              type: 'effectScatter',
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
                  color: (e) => {
                    return this.color[e.dataIndex]
                  },
                  borderColor: '#aac3f5',
                  borderWidth: 3,
                },
                emphasis: {
                  borderColor: '#a5ddd6',
                  borderWidth: 5,
                  color: "#000",//移入后的颜色
                }
              },
              data: this.tableData
            },
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

.title {
  margin-left: 5px;
  color: #7e84a3;
  font-size: 20px;
}
.img {
  width: 33px;
  height: 25px;
  background: url("~@/assets/images/zl.png") center center no-repeat;
  background-size: 33px auto;
}
.label {
  color: #7e84a3;
  font-size: 20px;
  text-align: left;
  margin-top: 8px;
  margin-bottom: 8px;
}
.value {
  color: #131523;
  font-size: 16px;
  text-align: left;
}
.tooltip {
  padding: 30px;
  width: 339px;
}
.circle {
  width: 14px;
  height: 14px;
  border-radius: 10px;
  border: 1px solid;
  border: none;
}
.top {
  width: 100%;
  height: 30px;
  color: #0d2451;
  font-size: 16px;
}
.scroll {
  overflow-x: scroll;
  overflow-y: hidden;
  width: 79%;
  height: 40px;
  color: #0d2451;
  font-size: 16px;
  white-space: nowrap;
}
.flex {
  align-items: center;
}
</style>