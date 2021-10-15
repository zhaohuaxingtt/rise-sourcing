<template>
  <div class="buNonitorCharts">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        {{ title }}
      </span>
    </div>
    <div class="legendLine">
      <ul class="legend" :class="{scroll: supplierList.length > 3}">
        <li v-for="(item, index) in supplierList" :key="index">
          <i :style="`background: ${colorPanel[item.index || 0]}`"></i>
          {{item.data}}
        </li>
        <!-- <li>SH Huashi</li>
        <li class="corlor1">NBHX</li> -->
      </ul>
      <div class="control">
        <!-- 方案选择 -->
        <iSelect
          popper-class="mapControl"
          v-model="mapControl"
          v-permission.auto="SOURCING_NOMINATION_SUGGESTION_BUMONITOR_FANGANXUANZE|图表方案选择"
          @change="load"
          :multiple="true"
          :placeholder="language('nominationSuggestion_FanAnXuanZhe','方案选择')">
          <!-- <el-option
            value=""
            :label="language('nominationSuggestion.FanAnXuanZhe') | capitalizeFilter"
          ></el-option> -->
          <el-option
            :value="items.key"
            :label="items.value"
            v-for="(items, index) in mapOptionsArray"
            :key="index"
          ></el-option>
        </iSelect>
      </div>
    </div>
    <div id="charts0"></div>
  </div>
</template>
<script>
import { iSelect } from "rise";
import echarts from "@/utils/echarts";
import {rich} from './lib/chart'
import {
  colorPanel
} from './data'
import filters from "@/utils/filters"
import _ from 'lodash'
import { items } from '../../../partsprocure/editordetail/components/drawingSheet/data';

export default {
  mixins: [ filters ],
  components: {
    iSelect
  },
  props: {
    title: {
      type: String,
      default: 'Nomination Scenario Overview'
    },
    data: {
      type: Object,
      default: () => ({})
    },
    // 供应商数组
    supplier: {
      type:Array,
      default: () => ({})
    }
  },
  data() {
    return {
      mapControl: [],
      mapOptionsArray: [],
      mapOptions: [
        {
          key: 0,
          value: this.language('ZHENGTIZUIJIA','整体最佳')
        },
        {
          key: 1,
          value: this.language('FENZUZUIJIA','分组最佳')
        },
        {
          key: 2,
          value: this.language('DANYILINGJIANZUIJIA','单一零件最佳')
        },
        {
          key: 3,
          value: this.language('SHOUDONGFENPEI','手动分配')
        }
      ],
      dataList: [],
      // 色板
      colorPanel,
      // 需要展示的供应商
      supplierList: []
      
    }
  },
  mounted() {
  },
  methods: {
    thousandsFilter(num) {
      return filters.filters.thousandsFilter(num)
    },
    init() {
      // 初始化，默认isShowWeightStick判断是否展示权重柱子
      const isShowWeightStick = this.data.isShowWeightStick || false
      // 初始化，默认isShowGroupStick判断是否展示分组最佳柱子
      const isShowGroupStick = this.data.isShowGroupStick || false
      const supplierInvo = this.data.supplier || []
      const supplierList = []
      this.supplier.forEach((sup, index) => {
        if (supplierInvo.includes(index)) {
          supplierList.push({
            data: sup,
            index: this.supplier.findIndex(o => o === sup)
          })
        }
      })
      this.supplierList = supplierList
      this.mapControl = [0,2]
      if (isShowWeightStick) {
        this.mapControl.push(3)
      }
      if (isShowGroupStick) {
        this.mapControl.push(1)
      }
      // 排序
      this.mapControl = this.mapControl.sort()
      // 根据实际情况生成新的下拉的数组
      const mapOptionsArray = []
      this.mapControl.forEach(key => {
        mapOptionsArray.push(this.mapOptions[key])
      })
      this.mapOptionsArray = mapOptionsArray

      this.load()
    },
    load() {
      const vm = echarts().init(document.getElementById("charts0"));
      const self = this
      const bgColor = '#94c8fc'
      const mapControl = this.mapControl
      this.$nextTick(() => {
        // 业务指标
        const quota = [
          'Best TTO \n for Whole Package',
          'Best TTO \n by Group',
          'Best TTO \n by Part',
          'Recommend \n Scenario']
        // xAxisData
        const xAxisData = !mapControl.length ? quota : mapControl.map(i => {
          return quota[i]
        })
        // console.log('-load-', xAxisData, mapControl)
        // seriesData
        
        
        let series = this.genSeries()
        series.map(o => {
          if (mapControl.length) {
            const tarData = []
            const tmpData = _.cloneDeep(o.data)
            tmpData.forEach((item, index) => {
              if (mapControl.includes(index)) {
                tarData.push(item)
              }
            })
            o.data = tarData
          }
          return o
        })
        console.log('series', series)

        const genSupTPL = (dataArray, dataCounTotal=0) => {
          const supplierList = self.data.supplierList || []
          let dataTemplate = ''
          dataArray.forEach(item => {
            dataTemplate+=`
              <p class="margin-top10">
                <span class="margin-right5" style="background-color:${colorPanel[item.index]};display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;"></span>
                <span class="ttoTitle">${supplierList[item.index]}</span>
              </p>
              <p class="ttolist padding-left25"><span>TTO:${self.thousandsFilter(item.data)}</span><span>${Number(item.data/dataCounTotal*100).toFixed(2)}%</span></p>
            `
          })
          return dataTemplate
        }

        let option = {
          grid: {
            left: '10',
            right: '0',
            bottom: '0',
            top: '10%',
            containLabel: true
          },
          tooltip: {
            show: true,
            padding: 0,
            enterable: true,
            transitionDuration: 1,
            textStyle: {
                color: '#000',
                decoration: 'none',
            },
            formatter: function(params) {
              const supplierList = self.data.supplierList || []
              const wholePackage = self.data && Number(self.data.wholePackage) || 0
              // Best TTO \n by Group 
              const bestGroup = self.data.bestGroup || []
              const bestGroupSupplierMinIndex = self.data.bestGroupSupplierIndex
              const bestGroupSupplierTotal = self.data && Number(self.data.bestGroupSupplierTotal)|| 0
              // Best TTO \n by Part
              const minPartSupplierTToArray = self.data.minPartSupplierTToArray || []
              const minPartSupplierTToTotal = self.data.minPartSupplierTToTotal
              // Recommend \n Scenario
              const weightSupplier = self.data.weightSupplier || []
              const weightSupplierTotal = self.data.weightSupplierTotal || 0
              let tpl = ''

              // toolTip Best TTO \n for Whole Package
              params.name === quota[0] && (tpl = `
              <div class="toolTipBox-content">
                <p>Best TTO <br> for Whole Package: <span class="value">${self.thousandsFilter(params.data)}</span></p>
              </div>`)

              // toolTip Best TTO \n by Group
              params.name === quota[1] && (tpl = `
              <div class="toolTipBox-content">
                <p>Compared to Best TTO <br> for Whole Package: 
                  <span class="value">${Number((wholePackage - bestGroupSupplierTotal)/wholePackage*100).toFixed(2)}%</span>
                </p>
                ${genSupTPL(bestGroup, bestGroupSupplierTotal)}
              </div>`)

              // toolTip Best TTO \n by Part
              params.name === quota[2] && (tpl = `
              <div class="toolTipBox-content">
                <p>Compared to Best TTO <br> for Whole Package: 
                  <span class="value">${Number((wholePackage - minPartSupplierTToTotal)/wholePackage*100).toFixed(2)}%</span>
                </p>
                ${genSupTPL(minPartSupplierTToArray, minPartSupplierTToTotal)}
              </div>`)

              // Recommend \n Scenario
              params.name === quota[3] && (tpl = `
              <div class="toolTipBox-content">
                <p>Compared to Best TTO <br> for Whole Package: 
                  <span class="value">${Number((wholePackage-weightSupplierTotal)/wholePackage*100).toFixed(2)}%</span>
                </p>
                ${genSupTPL(weightSupplier, weightSupplierTotal)}
              </div>`)
              // <p class="margin-top15" style="display: ${(params.data/weightSupplierTotal*100) < 10 ? 'block' : 'none'}">${self.language('GONGYINGSHANGTTO','供应商TTO')}: ${params.data}</p>
              // <p style="display: ${(params.data/weightSupplierTotal*100) < 10 ? 'block' : 'none'}">
              //   share: ${Number(params.data/weightSupplierTotal*100).toFixed(2)}%
              // </p>
              return `
              <div class="toolTipBox" style="${!params.data ? 'display: none' : ''}">
                ${tpl}
              </div>
              `
            }
          },
          xAxis: {
            type: 'category',
            offset: 0,
            // x轴数据
            data: xAxisData,
            axisTick: {
              show: false
            },
            axisLine:{
              lineStyle:{
                color: '#CDD4E2'
              }
            },
            axisLabel:{
              textStyle:{
                color: '#485465'
              },
              formatter: function (val) {
                // console.log(val)
                return `{n|${val}}` // 使用 rich 中的 n 来设置样式
              },
              rich,
              interval: 0 // 显示所有的 x 轴上的文字不隐藏
            },
            axisPointer: {  // 柱子背景
              show: true,
              type: 'shadow',
              shadowStyle: {
                color: '#cdd4E2',
                opacity: 0.13
              }
            },
          },
          yAxis: {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true
            },
            splitLine: {
              show: true, 
              lineStyle: {
                color: ['#ececf1']
              }
            },
            axisLine: {
              show: false
            },
        
          },
          series
        };
        // console.log(JSON.stringify(option))
        console.log('option', option)
        vm.clear()
        vm.setOption(option);
      })
    },
    genSeries() {
      const self = this
      const bgColor = '#94c8fc'
      const textStyle = {
        color: '#fff',
        textShadowBlur: 2,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        fontSize: '10'
      }
      const series = []
      const wholePackageIndex = self.data.wholePackageIndex
      const wholePackage = self.data.wholePackage
      // Best TTO for Whole Package
      series.push({
        _type: 'wholePackage',
        data: [wholePackage, '', '', ''],
        type: 'bar',
        barWidth: 30,
        stack: 'total',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#485465'
          },
          formatter: self.thousandsFilter(Number(wholePackage).toFixed(2))
        },
        itemStyle: {
          normal: {
            barBorderRadius: [5, 5, 0, 0],
            color: colorPanel[wholePackageIndex]
          },
        }
      })
      // Best TTO by Group
      // const bestGroupSupplier = self.data.bestGroupSupplier
      // 分组中TTO最小的那个分组
      // const bestGroupSupplierMin = bestGroupSupplier && bestGroupSupplier[0]
      // const bestGroupSupplierMinIndex = self.data.bestGroupSupplierIndex
      const bestGroup = self.data.bestGroup || []
      const bestGroupSupplierTotal = self.data.bestGroupSupplierTotal || 0
      
      // console.log('----',bestGroupSupplier)
      bestGroup.forEach((item, index) => {
        series.push({
          _type: 'bestGroupSupplier',
          data: ['', item.data, '', ''],
          type: 'bar',
          barWidth: 30,
          barMinHeight: 30,
          stack: 'total',
          label: {
            show: true,
            position: 'inside',
            textStyle: {
              color: '#485465'
            },
            formatter: function(params) {
              const fz = Number(params.data)
              const fm = Number(bestGroupSupplierTotal)
              const percent = parseFloat(fz/fm*100).toFixed(2)
              return `{p|${percent}%}`
            },
            rich,
            interval: 0
          },
          itemStyle: {
            normal: {
              barBorderRadius: index === (bestGroup.length - 1) ? [5, 5, 0, 0] : [0, 0, 0, 0],
              color: colorPanel[item.index]
            },
          }
        })
      })
      
      // 分组最佳柱子label
      bestGroupSupplierTotal&& (series.push({
        data: ['', 1, '', ''],
        type: 'bar',
        barWidth: 30,
        stack: 'total',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#485465'
          },
          formatter: function() {
            return self.thousandsFilter(Number(bestGroupSupplierTotal).toFixed(2))
          }
        },
      }))

      // 单个零件最小
      const minPartSupplierTToArray = self.data.minPartSupplierTToArray || []
      const minPartSupplierTToTotal = self.data.minPartSupplierTToTotal
  
      minPartSupplierTToArray.forEach((item, index) => {
        series.push({
          _type: 'minPartSupplier',
          data: ['', '', item.data, ''],
          type: 'bar',
          barWidth: 30,
          barMinHeight: 30,
          stack: 'total',
          label: {
            show: true,
            position: 'inside',
            textStyle,
            formatter: function(params) {
              const fz = Number(params.data)
              const fm = Number(minPartSupplierTToTotal)
              const percent =parseFloat(fz/fm*100).toFixed(2)
              return `{p|${percent}%}`
            },
            rich,
            interval: 0
          },
          itemStyle: {
            normal: {
              barBorderRadius: index === (minPartSupplierTToArray.length - 1) ? [5, 5, 0, 0] : [0, 0, 0, 0],
              color: colorPanel[item.index]
            },
          }
        })
      })
      // 零件最佳柱子label,
      minPartSupplierTToTotal&& (series.push({
        _type: 'minPartSupplierTToTotallabel',
        data: ['', '', 0, ''],
        type: 'bar',
        barWidth: 30,
        stack: 'total',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#485465'
          },
          formatter: function() {
            return self.thousandsFilter(Number(minPartSupplierTToTotal).toFixed(2))
          }
        }
      }))

      // 权重柱状图
      const weightSupplier = self.data.weightSupplier || []
      const weightSupplierTotal = self.data.weightSupplierTotal || 0
      let weightPercent = 0
      weightSupplier.forEach((item, index) => {
        series.push({
          _type: 'weightSupplier',
          data: ['', '', '', item.data],
          type: 'bar',
          barWidth: 30,
          // barMinHeight: 30,
          stack: 'total',
          label: {
            show: true,
            position: 'inside',
            textStyle,
            formatter: function(params) {
              const fz = Number(params.data)
              const fm = Number(weightSupplierTotal)
              const percent =(index === weightSupplier.length - 1) ? (100 - weightPercent).toFixed(2) : (fz/fm*100).toFixed(2)
              weightPercent += Number(percent)
              return percent < 10 ?  '' : `{p|${percent}%}`
            },
            rich,
            interval: 0
          },
          itemStyle: {
            normal: {
              barBorderRadius: index === (weightSupplier.length - 1) ? [5, 5, 0, 0] : [0, 0, 0, 0],
              color: colorPanel[index]
            },
          }
        })
      })
      // 最后一根柱子的label
      weightSupplierTotal && (series.push({
        _type: 'weightSupplierTotallabel',
        data: ['', '', '', '0'],
        type: 'bar',
        barWidth: 30,
        stack: 'total',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#485465'
          },
          formatter: function() {
            return self.thousandsFilter(Number(weightSupplierTotal).toFixed(2))
          }
        }
      }))
      
      return series
    }
  },
  watch: {
    data: {
      handler(newVal) {
        this.dataList = (newVal && newVal.data) || []
        this.$nextTick(() => {
          this.init()
        })
      },
      immediate: true,
      deep: true
    },
    mapControl() {
      console.log(this.mapControl)
      this.load()
    }
  }
}
</script>

<style lang="scss" scoped>
.buNonitorCharts {
  width: 100%;
  height: 560px;
  .legendLine {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    .legend {
      max-width: 245px;
      &.scroll {
        max-height: 50PX;
        overflow: hidden;
        overflow-y: scroll;
      }
      li {
        font-size: 16px;
        display: inline-block;
        padding-right: 15px;
        i {
          // content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          background: $color-blue;
          border-radius: 50%;
          margin-right: 5px;
        }
        &.corlor0:before {
          background: $color-blue;
        }
        &.corlor1:before {
          background: #94c8fc;
        }
      }
    }
  }
  #charts0 {
    width: 100%;
    height: 400PX;
  }
  ::v-deep.toolTipBox {
    background: #fff;
    border-radius: 5px;
    padding: 20px;
    border: 1px solid #efefef !important;
    min-width: 300px;
    &.hide {
      display: none !important;
    }
    p {
      font-size: 12px;
      font-weight: 100;
    }
    .ttoTitle {
      font-size: 13px;
      font-weight: bold;
      color: #000;
    }
    .ttolist {
      display: flex;
      justify-content: space-between;
      span {
        display: inline-block;
        color:#9290a6;
        font-size: 12px;
      }
    }
    .value {
      font-size: 12px;
      color: #000;
      font-weight: 600;
      display: inline-block;
      padding-left: 10px;
    }
  }
}
.control {
  ::v-deep.el-select {
    .el-select__tags {
      height: 26px !important;
      overflow: hidden;
    }
  }
}
</style>
<style lang="scss">
.mapControl.el-select-dropdown {
}
</style>