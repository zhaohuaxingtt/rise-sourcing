<template>
<div class="pageCard-main rsPdfCard">
  <slot></slot>
  <iCard ref="awardingScenario" class="awardingScenario">
    <div class="content">
      <div class="left">
        <div class="title">Awarding Scenario</div>
      </div>
      <div class="right">
        <div class="title">Nomination Scenario Overview</div>
        <div>
          <div class="legend">
            <div class="item" v-for="(item, index) in supplierList" :key="index">
              <i :style="`background: ${ colorPanel[item.index || 0] }`"></i>
              {{ item.data }}
            </div>
          </div>
          <div id="charts"></div>
        </div>
      </div>
    </div>
  </iCard>
</div>
</template>

<script>
import { iCard } from "rise"
import echarts from "@/utils/echarts"
import { colorPanel } from "@/views/designate/suggestion/components/data"
import { rich } from "@/views/designate/suggestion/components/lib/chart"
import filters from "@/utils/filters"

export default {
  components: { iCard },
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
  created() {
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  methods: {
    thousandsFilter(num) {
      return filters.filters.thousandsFilter(num, 0)
    },
    initCharts() {
      const vm = echarts().init(this.$refs.awardingScenario.$el.querySelector("#charts"))
      const self = this
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
          const dataList = window._.cloneDeep(dataArray && dataArray.filter(o => o) || []).reverse()
          dataList.forEach(item => {
            dataTemplate+=`
              <p class="margin-top10">
                <span class="margin-right5" style="background-color:${colorPanel[item.index]};display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;"></span>
                <span class="ttoTitle">${supplierList[item.index]}</span>
              </p>
              <p class="ttolist padding-left25"><span>TTO:${self.thousandsFilter(item.data)}</span><span>${Number(item.data/dataCounTotal*100).toFixed(0)}%</span></p>
            `
          })
          return dataTemplate
        }

        let option = {
          grid: {
            left: '10',
            right: '0',
            bottom: '20',
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
                  <span class="value">${Number((bestGroupSupplierTotal - wholePackage)/wholePackage*100).toFixed(2)}%</span>
                </p>
                ${genSupTPL(bestGroup, bestGroupSupplierTotal)}
              </div>`)

              // toolTip Best TTO \n by Part
              params.name === quota[2] && (tpl = `
              <div class="toolTipBox-content">
                <p>Compared to Best TTO <br> for Whole Package: 
                  <span class="value">${Number((minPartSupplierTToTotal - wholePackage)/wholePackage*100).toFixed(2)}%</span>
                </p>
                ${genSupTPL(minPartSupplierTToArray, minPartSupplierTToTotal)}
              </div>`)

              // Recommend \n Scenario
              params.name === quota[3] && (tpl = `
              <div class="toolTipBox-content">
                <p>Compared to Best TTO <br> for Whole Package: 
                  <span class="value">${Number((weightSupplierTotal - wholePackage)/wholePackage*100).toFixed(2)}%</span>
                </p>
                ${genSupTPL(weightSupplier, weightSupplierTotal)}
              </div>`)
              // <p class="margin-top15" style="display: ${(params.data/weightSupplierTotal*100) < 10 ? 'block' : 'none'}">${self.language('GONGYINGSHANGTTO','供应商TTO')}: ${params.data}</p>
              // <p style="display: ${(params.data/weightSupplierTotal*100) < 10 ? 'block' : 'none'}">
              //   share: ${Number(params.data/weightSupplierTotal*100).toFixed(0)}%
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
            offset: 10,
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
                color: '#485465',
                'lineHeight': 16
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
          formatter: self.thousandsFilter(Number(wholePackage).toFixed(0))
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
              const percent = parseFloat(fz/fm*100).toFixed(0)
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
            return self.thousandsFilter(Number(bestGroupSupplierTotal).toFixed(0))
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
              const percent =parseFloat(fz/fm*100).toFixed(0)
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
            return self.thousandsFilter(Number(minPartSupplierTToTotal).toFixed(0))
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
              const percent =(index === weightSupplier.length - 1) ? (100 - weightPercent).toFixed(0) : (fz/fm*100).toFixed(0)
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
            return self.thousandsFilter(Number(weightSupplierTotal).toFixed(0))
          }
        }
      }))
      
      return series
    }
  }
};
</script>

<style lang="scss" scoped>
.awardingScenario {
  .content {
    display: flex;
    justify-content: flex-end;

    .title {
      font-size: 18px;
      color: #131523;
      font-weight: bold;
      margin-bottom: 20px; /*no*/
    }

    .left {
      flex: 1;
    }

    .right {
      width: 615px; /*no*/

      .legend {
        display: flex;
        flex-wrap: wrap;

        .item {
          width: 33.3%;
          font-size: 16px; /*no*/
          display: inline-block;
          padding-right: 15px; /*no*/
        
          i {
            display: inline-block;
            width: 10px; /*no*/
            height: 10px; /*no*/
            background: $color-blue;
            border-radius: 50%;
            margin-right: 5px; /*no*/
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
  }
}
</style>