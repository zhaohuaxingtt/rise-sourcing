
<template>
  <div style="height:540px;width:100%"
       ref="chart"></div>
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
    maxData: {
      type: String,
      default: "",
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
    }
  },
  methods: {
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
      // console.log(send)
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
      const myChart = echarts().init(this.$refs.chart);
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
                  image: this.del
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
          bottom: "22%",
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
              domHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + item.color + '"></span>'
              result += domHtml + item.seriesName + ":" + this.doNumber(item.value) + '<br/>'
            })
            return result
          },
          textStyle: {
            fontSize: 12,
            color: "#e1e1e2"
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
        emphasis: {
          focus: 'series'
        },
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
      myChart.setOption(option);
      const that = this
      myChart.on('click', function (params) {

        if (params.componentType === 'title') {
          that.$emit('del')
        }
        if (params.componentType === 'xAxis') {
          that.$emit('change')
        }
      });
    },
    initData (newVal) {
      if (newVal) {
        // console.log(newVal)
        this.chartArray = newVal
        this.labelArray = []
        this.labelArray1 = []
        this.dataArray = []
        const tempArr = []
        const dataList1 = []
        newVal.forEach((row, i) => {
          const temp =
            row.vehicleType +
            "\n" +
            window.moment(row.cbdQuotationTime).format("yyyy.MM");
          // console.log(row)
          let name = row.supplierName
          if (this.by === 'num') {
            name = row.spareParts
          }
          // let img = '\t{bobChange|}'
          // if (!this.preview) {
          //   img = ''
          // }
          const str = name + '\n\n第{Blue|' + row.turn + '}/' + row.totalTurn + '轮\n\n\n' + "{font|" + temp + "}";
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
          // console.log(this.labelArray)
          this.legendArray.map((v, i) => {
            if (!tempArr[v]) {
              tempArr[v] = []
              dataList1[v] = []
            }
            tempArr[v].push(row[this.legendKeys[v]])
            const sum = this.sumBy(this.take(this.legendArray, i), (k) => {
              return Number(row[this.legendKeys[k]])
            })

            dataList1[v].push(sum)

          })
        })
        // console.log(tempArr)
        const minList = []

        this.legendArray.forEach((row, i) => {

          // const dataList0 = this.cloneDeep(tempArr[row])

          const min = this.min(tempArr[row])
          let data = min
          minList.push(data)

          // console.log(dataList1)
          this.dataArray.push({
            name: row,
            type: 'bar',
            barGap: '-100%',
            z: 20 - i,
            emphasis: {
              focus: 'series'
            },
            label: {
              show: true,
              position: 'insideTop',
              color: 'white',
              formatter: (params) => {

                return (tempArr[row][0])
              },
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              barBorderRadius: [5, 5, 0, 0]
            },
            barWidth: 50,
            data: [...tempArr[row]],
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
              // console.log(params)
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
          this.initCharts();
        }
      }
    }
  },
  mounted () {
    this.initCharts();
  },
  watch: {
    title: {
      handler (str) {

        if (this.$refs.chart && this.chartArray.length > 0) {
          this.initCharts();
        }
      },
      immediate: true
    },
    by: {
      handler (str) {
        this.initData(this.chartData)
      }
    },
    type: {
      handler (str) {
        this.initData(this.chartData)
      }
    },
    chartData: {
      handler (newVal) {
        if (newVal && newVal.length > 0) {
          this.initData(newVal)
        }


      },
      deep: true,
      immediate: true
    }
  }
};
</script>
