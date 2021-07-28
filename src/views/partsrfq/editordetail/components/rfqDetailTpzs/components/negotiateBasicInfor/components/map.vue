<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:28:01
 * @LastEditors: zbin
 * @Descripttion: 总览
-->
<template>
  <div>
    <div class="scroll flex">
      <div class="flex margin-right50" v-for="(item,index) in tableData" :key="index">
        <div :style="'background:'+color[index]" class="circle margin-right4"></div>
        <div>{{item.supplierName}}</div>
      </div>
    </div>
    <div class="chartmap" ref="chart"></div>
  </div>
</template>

<script>
import world from "./china.json";
import echarts from '@/utils/echarts'
import { iCard, icon, iLabel } from "rise";
import svwImg from "@/assets/images/svw.png";
export default {
  components: { iCard, icon, iLabel },
  props: {
    mapListData: {
      type: Array, default: () => {
        return {}
      }
    }
  },
  watch: {
    '$i18n.locale'(newValue) {
      this.handleMap();
    },
    mapListData: {
      handler(data) {
        var sum = 0
        this.svwData = data.addressPoint
        this.tableData = data.listVO
        this.tableData.forEach(item => {
          sum = sum + item.toAmount
        })
        this.tableData.map(item => {
          item.symbolSize = item.toAmount / sum * 100 / 5
          return item.value = [item.lon, item.lat]
        })
        this.svwData.map(item => {
          return item.value = [item.lon, item.lat]
        })
        if (this.$refs.chart && this.tableData.length && this.svwData) {
          this.handleMap()
        }
      },
      deep: true,
    }
  },
  data() {
    return {
      svwData: [],
      color: ['#B9DDFA', '#8BC7F7', '#46B3F3', '#009FEF', '#008CEE', '#0078ED', '#0050EB', '#0641C8', '#0B31A5', '#46647C', '#235A7A', '#005078'],
      tableData: []
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
          tooltip: {
            trigger: 'item',
            backgroundColor: '#fff',
            borderColor: '#EEF1F7',
            borderWidth: 1,

            formatter: (params) => {
              console.log(params);
              return `<div class='tooltip'>
                          <div class='flex'>
                            <div class="img"></div><div class='title'>${params.data.supplierName}</div>
                          </div>
                          <div class='label'>${this.$t('LK_CHEXING') + ':'}</div>
                          <div class='value'>${params.data.factoryName}</div>
                          <div class='label'>${this.$t('TPZS.SQDZDZ')}</div>
                          <div class='value'>${params.data.factoryAddress}</div>
                          <div class='label'>${this.$t('TPZS.ZXSE')}</div>
                          <div class='value'>${params.data.toAmount}</div>
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
            // center: [104.114129, 37.550339],//当前视角的中心点
            zoom: 1, //当前视角的缩放比例
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
                borderColor: '#fff',//区域边框颜色
                areaColor: '#eef4fd'
              },
              emphasis: {
                show: false,
                areaColor: '#E6E9F4'
              },
            },
          },
          series: [

            {
              name: '',
              type: 'scatter',
              coordinateSystem: 'geo',       // 表示使用的坐标系为地理坐标系
              zlevel: 3,
              label: {
                normal: {                  // 默认的文本标签显示样式
                  color: '#eef4fd',
                  show: true,
                  position: 'top',      // 标签显示的位置
                  formatter: '{b}'      // 标签内容格式器
                },

              },
              itemStyle: {
                normal: {
                  color: (e) => {
                    return this.color[e.dataIndex]
                  },
                  borderColor: '#aac3f5',
                  borderWidth: (e) => {
                    console.log(e);
                  },
                },
                emphasis: {
                  borderColor: '#a5ddd6',
                  borderWidth: 5,
                  color: "#05BB8B",//移入后的颜色
                }
              },
              data: this.tableData
            },
            // svw
            {
              name: '',
              type: 'scatter',
              coordinateSystem: 'geo',       // 表示使用的坐标系为地理坐标系
              zlevel: 3,
              showAllSymbol: true,
              symbolKeepAspect: true,
              symbolSize: 15,
              label: {
                show: true,
                position: ['0%', '10%'],      // 标签显示的位置
                formatter: () => {
                  return '{x|}'
                },      // 标签内容格式器
                rich: {
                  x: {
                    backgroundColor: {
                      image: svwImg
                    },
                    height: 25,
                  }
                }
              },
              itemStyle: {
                show: true,
                color: '#eef4fd',
              },
              data: this.svwData
              // data: [{value:[30.67,104.07 ]}]
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
  /* width: 40rem; */
}
.circle {
  width: 14px;
  height: 14px;
  border-radius: 10px;
  border: 1px solid;
  border: none;
}
.scroll {
  overflow-x: auto;
  overflow-y: hidden;
  width: 60%;
  height: 40px;
  color: #0d2451;
  font-size: 16px;
  white-space: nowrap;
}
.flex {
  align-items: center;
}
</style>