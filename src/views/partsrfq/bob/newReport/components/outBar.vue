<style scoped>
.crown-bar-x-label {
  font-size: 12px;
  font-weight: 400;
  color: #7e84a3;
  font-family: Arial;
  line-height: 23px;
  text-align: center;
  white-space: nowrap;
}
</style>
<template>
  <div style="width: 100%;">
    <div style="height:440px;width: 100%;"
         ref="chart"
         v-show="chartData.length > 0"></div>
    <template v-if="chartData.length > 0">
      <div style="display:flex;flex-flow:row nowrap;">
        <span style="width: 14%;"></span>
        <span class="crown-bar-x-label"
              style="width: 86%">{{getCrownBarName(chartData[0])}}</span>
      </div>
      <div style="display:flex;flex-flow:row nowrap;">
        <span style="width: 14%;"></span>
        <span class="crown-bar-x-label"
              style="width: 86%">
          {{language('LK_NUMBERPREFIX','第')}}<a style="color: #1763F7; font-weight: 500;font-size: 16px;font-family: Arial;">{{chartData[0].turn}}</a>/{{chartData[0].totalTurn}}{{language('LK_TURN','轮')}}
        </span>
      </div>
      <div style="display:flex;flex-flow:row nowrap;margin-top: 10px;">
        <span style="width: 14%;"></span>
        <span class="crown-bar-x-label"
              style="width: 86%">{{chartData[0].vehicleType}}</span>
      </div>
      <div style="display:flex;flex-flow:row nowrap;">
        <span style="width: 14%;"></span>
        <span class="crown-bar-x-label"
              style="width: 86%">{{getCrownBarReqTime(chartData[0])}}</span>
      </div>
    </template>
    <template v-else>
      <div style="padding: 32% 0% 3% 14%;display: flex;flex-flow:column nowrap;height: 100%;">
        <img src="@/assets/images/newZhu.png"
             alt=""
             style="width:220px;height: calc(440px - 28%);cursor: pointer;"
             @click="findPart">
        <div style="width:220px;text-align: center;color:#7E84A3;margin-top:3%;cursor: pointer;"
             @click="findPart">{{ language("DAITIANJIA","待添加") }}</div>
      </div>
    </template>
  </div>
</template>
<script >
import echarts from '@/utils/echarts'
import bobChange from '@/assets/images/bob-change.png'
import del from '@/assets/images/bob-del.png'
export default {
  props: {
    chartData: {
      type: Array,
      default: () => [
      ]
    },
    preview: {
      type: Boolean,
      default: true
    },
    // 预览模式
    isPreview: {
      type: Boolean,
      default: false,
    },
    maxData: {
      type: String,
      default: "",
    },
    supplierList: {
      type: Array,
      default:()=>[]
    }
  },
  data () {
    return {
      chartArray: [],
      labelArray: [],
      labelArray1: [],
      legendKeys: {
        '原材料/散件': 'rawMaterialSummary',
        '制造费': 'manufacturingCostSummary',
        '报废成本': 'discardCostsSummary',
        '管理费': 'administrationCostsSummary',
        '其他费用': 'otherCostsSummary',
        '利润': 'profit'
      },
      legendArray: ['原材料/散件', '制造费', '报废成本', '管理费', '其他费用', '利润'],
      anchorList: [{zh:'原材料/散件成本',i18n:'YUANCAILIAOSANJIANCHENGBEN'}, {zh:'制造成本',i18n:'ZHIZAOCHENGBEN'}, {zh:'报废成本',i18n:'BAOFEICHENGBEN'}, {zh:'管理费用',i18n:'GUANLIFEI'}, {zh:'其他费用',i18n:'LK_QITAFEIYONG'}, {zh:'利润',i18n:'LIRUN'}],
      dataArray: [],
      sum: window._.sum,
      min: window._.min,
      max: window._.max,
      sumBy: window._.sumBy,
      minBy: window._.minBy,
      toPairs: window._.toPairs,
      omit: window._.omit,
      words: window._.words,
      cloneDeep: window._.cloneDeep,
      take: window._.take,
      bobChange: bobChange,
      del: del,
      tempArr: []
    }
  },
  methods: {
    getCrownBarName (row) {
      let supplier = this.supplierList.find((item)=>item.supplierId==row.supplierId)
      let name = this.$i18n.locale==='zh'?supplier.shortNameZh:supplier.shortNameEn
      if (this.chartType === "num") {
        name = row.spareParts;
        this.partList.forEach(value => {
          if (name == value.spareParts) {
            name = this.$i18n.locale==='zh'?value.shortNameZh:value.shortNameEn
          }
        })
      }
      return name
    },
    getCrownBarReqTime (row) {
      return window.moment(row.cbdQuotationTime).format("yyyy.MM");
    },
    findPart () {
      this.$emit('find-part')
    },
    bos (arr) {
      const min = this.min(arr)
      let send = this.max(arr)
      arr.forEach((i) => {
        if (i > min) {
          if (i < send) {
            send = i
          }
        }
      })
      return send
    },
    doNumber (x) {
      var f = Math.round(x * 100) / 100;
      var s = f.toString();
      var rs = s.indexOf('.');
      if (rs < 0) {
        rs = s.length;
        s += '.';
      }
      while (s.length <= rs + 2) {
        s += '0';
      }
      return s;
    },
    initCharts () {
      this.myChart = echarts().init(this.$refs.chart);
      // 绘制图表
      const option = {
        title: {
          show: this.preview,
          text: '{del|}',
          left: '85%',
          top: 60,
          triggerEvent: true,
          textStyle: {
            rich: {
              del: {
                height: 20,
                right: 0,
                align: 'right',
                backgroundColor: {
                  image: this.isPreview ? '' : this.del
                }
              },
            }
          }
        },
        legend: {
          show: false
        },
        grid: {
          left: "14%",
          top: '25%',
          right: '0%',
          bottom: "3%",
        },
        xAxis: [
          {
            type: 'category',
            data: this.labelArray,
            nameTextStyle: {
              verticalAlign: 'bottom'
            },
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                type: "dashed",
                width: 1,
                color: '#ccc'
              },
            },
            axisLabel: {
              left: "20%",
              interval: 0,
              color: '#3C4F74'
            },
            triggerEvent: true,
            offset: 6
          },
          {
            type: "category",
            data: [...this.labelArray1],
            nameTextStyle: {
              verticalAlign: "bottom",
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false,
              alignWithLabel: true,
            },
            axisLabel: {
              align: 'center',
              fontFamily: "Arial",
              interval: 0,
              fontSize: 12,
              fontWeight: 400,
              lineHeight: 18,
              color: '#3C4F74'
            },
            triggerEvent: true,
            offset: 30
          },
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: (params) => {
            let result = ''
            let domHtml = ''
            params.forEach(item => {
              if (item.seriesName == "sum") {
                return false;
              }

              domHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + item.color + '"></span>'
              result += domHtml + item.seriesName + ":" + this.doNumber(this.tempArr[item.seriesName]) + '<br/>'
            })
            return result
          },
          textStyle: {
            fontSize: 12,
            color: "#7E84A3"
          }
        },
        yAxis: [
          {
            type: 'value',
            name: '',
            axisLabel: {
              show: false,
              color: '#7E84A3',
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
            },
            max: this.maxData
          }
        ],
        // emphasis: {
        //   focus: 'series'
        // },
        color: [
          "#C6DEFF",
          "#9BBEFF",
          "#72AEFF",
          "#5993FF",
          "#1763F7",
          "#0040BE",
        ],
        series: this.dataArray
      };
      this.myChart.setOption(option, true);
      this.$nextTick(() => {
        this.myChart.resize()
      })

    },
    async initData (newVal) {
      if (newVal) {
        this.chartArray = newVal
        this.labelArray = []
        this.labelArray1 = []
        this.dataArray = []
        const tempArr = []
        const dataList1 = []
        newVal.forEach((row, i) => {
          console.log(row)
          console.log(this.legendKeys)
          const str = "";
          const subtext = row.spareParts + '\n' + row.fs
          this.labelArray.push({
            value: str,
            textStyle: {
              rich: {
                Blue: {
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#1763F7',
                },
                bobChange: {
                  height: 25,
                  backgroundColor: {
                    image: this.bobChange
                  }
                },
                font: {
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#7E84A3",
                  fontFamily: "Arial",
                  lineHeight: 23
                }
              },

            }
          })
          this.labelArray1.push({
            value: subtext,
          });
          this.legendArray.map((v, i) => {
            if (!tempArr[v]) {
              tempArr[v] = [];
              dataList1[v] = [];
            }
            tempArr[v].push(row[this.legendKeys[v]]);
            this.tempArr = tempArr
            const sum = this.sumBy(this.take(this.legendArray, i + 1), (k) => {
              return Number(row[this.legendKeys[k]]);
            });
            dataList1[v].push(sum);
          });
          console.log(tempArr)
        })
        const minList = []
        this.legendArray.forEach((row, i) => {
          const min = this.min(tempArr[row])
          let data = min
          minList.push(data)
          let langItem = this.anchorList.find((item)=>item.zh==row)
          this.dataArray.push({
            name: this.language(langItem.i18n,langItem.zh),
            type: 'bar',
            barGap: '-100%',
            z: 20 - i,
            // emphasis: {
            //   focus: 'series'
            // },
            label: {
              show: true,
              position: 'insideTop',
              color: 'white',
              formatter: (params) => {
                return this.doNumber(tempArr[row][0])
              },
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              barBorderRadius: [5, 5, 0, 0]
            },
            barWidth: 50,
            data: [...dataList1[row]],
          })
        })
        this.dataArray.push({
          name: 'sum',
          type: 'bar',
          barGap: '-100%',
          z: 1,
          label: {
            show: true,
            position: 'top',
            color: '#7E84A3',
            fontSize: 12,
            fontFamily: "Arial",
            align: 'center',
            formatter: (params) => {
              const sum = dataList1['利润'][0]
              return this.doNumber(sum)
            },
          },
          labelLine: {
            show: false
          },
          itemStyle: {
            barBorderRadius: [5, 5, 0, 0],
            color: '#fff'
          },
          barWidth: 50,
          data: [dataList1['利润'][0]]
        })
        if (this.$refs.chart && this.chartArray.length > 0) {
          echarts().init(this.$refs.chart).dispose();
          await this.initCharts();
          const that = this
          this.myChart.on('click', function (params) {
            if (params.componentType === 'title') {
              that.$emit('del')
            }
            if (params.componentType === 'xAxis') {
              console.log('点击了', that.isPreview);
              if (!that.isPreview) {
                that.$emit('change')
              }
            }
          });
        }
      }
    }
  },
  watch: {
    chartData: {
      handler (newVal) {
        if (newVal && newVal.length > 0) {

          this.initData(newVal)
        }
      },
      deep: true,
    }
  }
};
</script>
