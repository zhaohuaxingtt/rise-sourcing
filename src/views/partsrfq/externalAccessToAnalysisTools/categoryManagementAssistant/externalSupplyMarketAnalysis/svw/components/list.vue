<template>
  <div class="charts">
    <div class="width3-1">
      <h3>Top{{index}}</h3>
      <div class="flex">
        <div class="score">{{MarketOverviewObj.supplierName}} <span>{{MarketOverviewObj.svwCagrRate +'%'}}</span><img v-if="MarketOverviewObj.svwCagrRate>=0"
               :src="upImg"
               alt=""><img v-else
               :src="downImg"
               alt=""></div>
        <div>单位: 百万元</div>
      </div>
      <div style="height:360px"
           ref="chart"></div>
      <div style="width: 100%;display:flex;flex-flow: row nowrap;">
        <iSelect v-model="interestsStatus"
                 :disabled="isEdite"
                 @change="handleChange"
                 style="width: 132px;margin-left:-40px;"
                 v-if="!isEdite">
          <el-option v-for="(x,index) in iSelectOption"
                     :value="x.value"
                     :label="x.name"
                     :key="index"></el-option>
        </iSelect>
        <div v-else
             style="width: 92px">利润</div>
        <div v-if="!isEdite"
             style="flex: 1;display:flex;flex-flow: row nowrap;justify-content: space-between;padding-right:92px;">
          <iInput v-model="year1"
                  style="width: calc(100% / 3);"></iInput>
          <iInput v-model="year2"
                  style="width: calc(100% / 3);"></iInput>
          <iInput v-model="year3"
                  style="width: calc(100% / 3);"></iInput>
        </div>
        <div v-else
             style="flex: 1;display:flex;flex-flow: row nowrap;justify-content: space-between;padding-right:92px;">
          <div style="width: 50px;text-align:center;">{{profit1+'%'}}</div>
          <div style="width: 50px;text-align:center;">{{profit2+'%'}}</div>
          <div style="width: 50px;text-align:center;">{{profit3+'%'}}</div>
        </div>
      </div>
    </div>
    <div class="width3-1">
      <div style="height:420px"
           ref="turnover"></div>
    </div>
    <div class="width3-1">
      <div class="thead bg">
        <div class="first">公司名称</div>
        <div class="last">份额</div>
      </div>
      <div class="thead"
           v-for="(x,index) in MarketOverviewObj.mainCustomerDTOList"
           :key="index">
        <div class="border first">
          <div class="index">
            <img :src="bgimg"
                 alt="" />
            <div>{{index+1}}</div>
          </div>
          <div class="name">
            <span class="nameText"
                  v-if="isEdite">{{x.customerName}}</span>
            <iInput v-else
                    v-model="x.customerName"></iInput>
          </div>
        </div>
        <div class="border last">
          <span v-if="isEdite">{{x.totalSalesPro+'%'}}</span>
          <iInput v-else
                  @blur="changInput"
                  v-model="x.totalSalesPro"
                  :disabled="index == (MarketOverviewObj.mainCustomerDTOList.length - 1)"></iInput>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from '@/utils/echarts'
import { iInput, iSelect, iMessage } from 'rise'
import { validateProjectConfig } from '../../../../../../partsprocure/home/components/data'
export default {
  components: {
    iInput,
    iSelect
  },
  props: {
    MarketOverviewObj: {
      type: Object
    },
    edite: {
      type: Boolean
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
      isEdite: true,
      interestsStatus: 'profit',
      interestsName: "利润",
      profit1: "",
      profit2: "",
      profit3: "",
      MarketOverviewObj1: {},
      iSelectOption: [{
        value: 'profit',
        name: "利润(%）"
      }, {
        value: 'svwAmount',
        name: "SVW(百万元)"
      }, {
        value: 'otherAmount',
        name: "其他(百万元)"
      }],
      bgimg: require('../img/list.png'),
      upImg: require('../img/up.png'),
      downImg: require('../img/down.png'),
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter (params) {
            let result = ''
            let domHtml = ''
            let arr = params.filter((value, index) => {
              return value.seriesName !== 'sum'
            })
            arr = arr.reverse()
            arr.forEach(value => {
              domHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + value.color + '"></span>'
              result += domHtml + value.seriesName + ":" + value.value + '<br/>'
            })
            return result
          },
          textStyle: {
            fontSize: 12,
            color: "#e1e1e2"
          }
        },

        legend: {
          data: ['SVW', '其他'],
          right: 0,
          icon: "circle"
        },
        color: ['#0059FF', '#B4CBF7'],
        // grid: {
        //   left: '25%',
        //   right: -10
        // },
        xAxis: [
          {
            type: 'category',
            data: ['2018', '2019', '2020'],
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false
            },
          }
        ],
        yAxis: [{
          position: 'left',
          splitLine: {
            show: true,
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,//不显示坐标轴线
          }
        },
        {
          type: 'value',
          min: 0,
          max: 100,
          position: 'right',
          axisLine: {
            show: false
          },
          axisLabel: {
            formatter: '{value}%'
          },
          splitLine: {
            show: false
          }
        }],
        series: [
          {
            name: '其他',
            yAxisIndex: 0,
            itemStyle: {
              color: "#B4CBF7"
            },
            stack: "check",
            type: 'bar',
            z: 20,
            label: {
              position: 'inside'
            },
            data: [{
              value: 20,

              label: {
                normal: {
                  show: true,
                  formatter: ''
                }
              }
            }, {
              value: 50,

              label: {
                normal: {
                  show: true,
                  formatter: ''
                }
              }
            }, {
              value: 47,

              label: {
                normal: {
                  show: true,
                  formatter: ''
                }
              }
            }]
          },
          {
            name: 'SVW',
            yAxisIndex: 0,
            itemStyle: {
              color: "#0059FF"
            },
            stack: "check",
            type: 'bar',
            z: 20,
            label: {
              position: 'insideTop'
            },
            data: [{
              value: 20,
              label: {
                normal: {
                  show: true,
                  formatter: ''
                }
              }

            }, {
              value: 50,

              label: {
                normal: {
                  show: true,
                  formatter: ''
                }
              }
            }, {
              value: 60,

              label: {
                normal: {
                  show: true,
                  formatter: ''
                }
              }
            }]
          },
          {
            name: '利润(%)',
            yAxisIndex: 1,
            itemStyle: {
              color: "#0C47A1"
            },
            z: 30,
            type: 'line',
            data: [
              {
                value: 2,
                label: {
                  normal: {
                    show: true,
                    formatter: ''
                  }
                }
              },
              {
                value: 3,
                label: {
                  normal: {
                    show: true,
                    formatter: ''
                  }
                }
              },
              {
                value: 7,
                label: {
                  normal: {
                    show: true,
                    formatter: ''
                  }
                }
              }
            ]
          }
        ]
      },
      turnover: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          padding: [10, 40],
          bottom: '0',
        },
        color: ['#0C47A1', '#1976D1', '#2297F3', '#64B5F6', '#00579B', '#0188D1', '#03A9F4', '#50C2F7'],
        grid: {
          bottom: "20%"
        },
        series: [
          {
            // name: '访问来源',
            type: 'pie',
            radius: '50%',
            selectedMode: "single",
            data: [
              {
                value: 1048,
                name: '材料组A',
                itemStyle: {
                  color: "#0058FF"
                },
                label: {
                  normal: {
                    show: true,
                    formatter: '{d}%'
                  }
                }
              },
              {
                value: 735,
                name: '材料组B',
                itemStyle: {
                  color: "#6EA0FF"
                },
                label: {
                  normal: {
                    show: true,
                    formatter: '{d}%'
                  }
                }
              },
              {
                value: 580,
                name: '材料组C',
                itemStyle: {
                  color: "#97D1FF"
                },
                label: {
                  normal: {
                    show: true,
                    formatter: '{d}%'
                  }
                }
              },
              {
                value: 484,
                name: '材料组D',
                itemStyle: {
                  color: "#0094FF"
                },
                label: {
                  normal: {
                    show: true,
                    formatter: '{d}%'
                  }
                }
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      year1: "",
      year2: "",
      year3: ""
    }
  },
  created () {
    this.categoryCode = this.$store.state.rfq.categoryCode
    // this.initCharts()
    // this.initturnover()
  },
  computed: {
    color () {
      return function (item) {
        if (item === 'SVW') {
          return 'background: #C6DEFF'
        } else if (item === '其他') {
          return 'background: #9BBEFF'
        }
      }
    }
  },
  mounted () {
    let date = new Date()
    this.option.xAxis[0].data[0] = date.getFullYear() - 3
    this.option.xAxis[0].data[1] = date.getFullYear() - 2
    this.option.xAxis[0].data[2] = date.getFullYear() - 1
  },
  watch: {
    year1: {
      handler (val) {
        if (this.interestsStatus === "otherAmount") {
          this.MarketOverviewObj1.supplierFinanceDTOList[0].otherAmount = val * 1000000
        } else if (this.interestsStatus === "svwAmount") {
          this.MarketOverviewObj1.supplierFinanceDTOList[0].svwAmount = val * 1000000
        } else if (this.interestsStatus === "profit") {
          this.MarketOverviewObj1.supplierFinanceDTOList[0].profit = val
        }
        if (!this.isEdite) {
          this.$emit('returnObj', this.MarketOverviewObj1, this.index - 1);
        }
      },

    },
    year2: {
      handler (val) {
        if (this.interestsStatus === "otherAmount") {
          this.MarketOverviewObj1.supplierFinanceDTOList[1].otherAmount = val * 1000000
        } else if (this.interestsStatus === "svwAmount") {
          this.MarketOverviewObj1.supplierFinanceDTOList[1].svwAmount = val * 1000000
        } else if (this.interestsStatus === "profit") {
          this.MarketOverviewObj1.supplierFinanceDTOList[1].profit = val
        }
        if (!this.isEdite) {
          this.$emit('returnObj', this.MarketOverviewObj1, this.index - 1);
        }

      },
    },
    year3: {
      handler (val) {
        if (this.interestsStatus === "otherAmount") {
          this.MarketOverviewObj1.supplierFinanceDTOList[2].otherAmount = val * 1000000
        } else if (this.interestsStatus === "svwAmount") {
          this.MarketOverviewObj1.supplierFinanceDTOList[2].svwAmount = val * 1000000
        } else if (this.interestsStatus === "profit") {
          this.MarketOverviewObj1.supplierFinanceDTOList[2].profit = val
        }
        if (!this.isEdite) {
          this.$emit('returnObj', this.MarketOverviewObj1, this.index - 1);
        }

      },

    },
    edite (val) {
      this.isEdite = val
      if (!val) {
        this.MarketOverviewObj.mainCustomerDTOList = this.MarketOverviewObj.mainCustomerDTOList.filter(item => item.customerName !== '其他')
        if (!this.MarketOverviewObj.mainCustomerDTOList) {
          this.MarketOverviewObj.mainCustomerDTOList = []
          for (let i = 0; i < 5; i++) {
            let obj = {
              customerName: "",
              totalSalesPro: ""
            }
            this.MarketOverviewObj.mainCustomerDTOList.push(obj)
          }
        } else {
          if (this.MarketOverviewObj.mainCustomerDTOList.length === 0) {
            for (let i = 0; i < 5; i++) {
              let obj = {
                customerName: "",
                totalSalesPro: ""
              }
              this.MarketOverviewObj.mainCustomerDTOList.push(obj)
            }
          } else {
            let arrLength = this.MarketOverviewObj.mainCustomerDTOList.length
            for (let i = 0; i < 5 - arrLength; i++) {
              let obj = {
                customerName: "",
                totalSalesPro: ""
              }
              this.MarketOverviewObj.mainCustomerDTOList.push(obj)
            }
          }
        }
        let total = new Number()
        if (this.MarketOverviewObj.mainCustomerDTOList && this.MarketOverviewObj.mainCustomerDTOList.length > 0) {
          this.MarketOverviewObj.mainCustomerDTOList.forEach((item, index) => {
            if (index < this.MarketOverviewObj.mainCustomerDTOList.length - 1) {
              total += Number(item.totalSalesPro)
            }
          })
          console.log(total)
          if (total > 100) {
            iMessage.error('份额总和不能超过100%')
            return
          } else {
            if (total > 0) {
              this.MarketOverviewObj.mainCustomerDTOList[this.MarketOverviewObj.mainCustomerDTOList.length - 1].customerName = "其他"
              this.MarketOverviewObj.mainCustomerDTOList[this.MarketOverviewObj.mainCustomerDTOList.length - 1].totalSalesPro = 100 - total
            }
          }
        }
      } else {
        this.$nextTick(() => {
          this.initCharts()
          this.initturnover()
        });
        this.MarketOverviewObj.mainCustomerDTOList = this.MarketOverviewObj.mainCustomerDTOList.filter(item => item.customerName || item.totalSalesPro)
      }
    },
    MarketOverviewObj: {
      handler (val) {
        console.log(val, "val")
        this.MarketOverviewObj1 = _.cloneDeep(val)
        let date = new Date().getFullYear();
        this.option.series.push({
          name: "sum",
          type: "bar",
          stack: "check",
          z: 1,
          label: {
            show: true,
            position: "top",
            color: "#000000",
            fontSize: 12,
            align: "center",
            fontFamily: "Arial",
            formatter: (params) => {
              let data = this.MarketOverviewObj.supplierFinanceDTOList
              let index = params.dataIndex
              let sum = ((Number(data[index].otherAmount) + Number(data[index].svwAmount)) / 1000000).toFixed(2)
              return sum
            },
          },
          labelLine: {
            show: false,
          },
          barWidth: 50,
          data: this.MarketOverviewObj.supplierFinanceDTOList.map(i => 0),
        })
        // 柱状图
        if (this.MarketOverviewObj.supplierFinanceDTOList.length > 0) {
          this.MarketOverviewObj.supplierFinanceDTOList.forEach(x => {
            if (x.year == date - 3) {
              this.option.series[0].data[0].label.normal.formatter = !x.otherRate ? '0' : x.otherRate + '%'
              this.option.series[0].data[0].value = (x.otherAmount / 1000000).toFixed(2)
              this.option.series[1].data[0].value = (x.svwAmount / 1000000).toFixed(2)
              this.option.series[1].data[0].label.normal.formatter = !x.svwRate ? '0' : x.svwRate + '%'
              this.option.series[2].data[0].value = x.profit
              this.profit1 = x.profit
            }
            if (x.year == date - 2) {
              this.option.series[0].data[1].label.normal.formatter = !x.otherRate ? '0' : x.otherRate + '%'
              this.option.series[0].data[1].value = (x.otherAmount / 1000000).toFixed(2)
              this.option.series[1].data[1].value = (x.svwAmount / 1000000).toFixed(2)
              this.option.series[1].data[1].label.normal.formatter = !x.svwRate ? '0' : x.svwRate + '%'
              this.option.series[2].data[1].value = x.profit
              this.profit2 = x.profit
            }
            if (x.year == date - 1) {
              this.option.series[0].data[2].label.normal.formatter = !x.otherRate ? '0' : x.otherRate + '%'
              this.option.series[0].data[2].value = (x.otherAmount / 1000000).toFixed(2)
              this.option.series[1].data[2].value = (x.svwAmount / 1000000).toFixed(2)
              this.option.series[1].data[2].label.normal.formatter = !x.svwRate ? '0' : x.svwRate + '%'
              this.option.series[2].data[2].value = x.profit
              this.profit3 = x.profit
            }
          });
          // // 饼图
          // if (val.supplierAllStuffDTO.supplierStuffCountDTOList.length > 0) {
          //   let data = []
          //   let legend = []
          //   let check = true
          //   let otherObj = {}
          //   val.supplierAllStuffDTO.supplierStuffCountDTOList.forEach((x, index) => {
          //     let seriesObj = {
          //       value: 1048,
          //       name: '材料组A',
          //       itemStyle: {
          //         color: ""
          //       },
          //       label: {
          //         normal: {
          //           show: true,
          //           formatter: '{d}%'
          //         }
          //       }
          //     }
          //     let colorList = ['#0C47A1', '#1976D1', '#2297F3', '#64B5F6', '#00579B', '#0188D1', '#03A9F4', '#50C2F7']
          //     // console.log(this.categoryCode)
          //     // if (x.sapStuffCode == this.categoryCode) {
          //     //   seriesObj.selected = true
          //     //   check = false
          //     // } else {
          //     //   seriesObj.selected = false
          //     // }
          //     // if (x.sapStuffCode === "other") {
          //     //   otherObj = seriesObj
          //     // }
          //     seriesObj.value = x.postAmount
          //     seriesObj.name = x.categoryNameZh
          //     seriesObj.itemStyle.color = colorList[index]
          //     seriesObj.label.normal.formatter = x.rate + '%'
          //     data.push(seriesObj)
          //     legend.push(x.categoryNameZh)
          //   })
          //   if (check) {
          //     otherObj.selected = true
          //   }
          //   this.turnover.series[0].data = data
          //   this.turnover.legend.data = legend
          // }

          this.$nextTick(() => {
            this.initCharts()
            // this.initturnover()
          });
        } else {
          this.option.series[0].data = []
          this.option.series[1].data = []
        }
      },
      immediate: true,
      deep: true
    },
    '$store.state.rfq.categoryCode': {
      handler (val) {
        this.categoryCode = val
        if (this.MarketOverviewObj.supplierAllStuffDTO.supplierStuffCountDTOList.length > 0) {
          let data = []
          let legend = []
          let check = true
          let otherObj = {}
          this.MarketOverviewObj.supplierAllStuffDTO.supplierStuffCountDTOList.forEach((x, index) => {
            let seriesObj = {
              value: 1048,
              name: '材料组A',
              itemStyle: {
                color: "#0058FF"
              },
              label: {
                normal: {
                  show: true,
                  formatter: '{d}%'
                }
              },
            }
            let colorList = ['#0C47A1', '#1976D1', '#2297F3', '#64B5F6', '#00579B', '#0188D1', '#03A9F4', '#50C2F7']
            if (x.sapStuffCode == val) {
              seriesObj.selected = true
              check = false
            } else {
              seriesObj.selected = false
            }
            if (x.sapStuffCode === "other") {
              otherObj = seriesObj
            }
            seriesObj.value = x.postAmount
            seriesObj.name = x.categoryNameZh
            seriesObj.itemStyle.color = colorList[index]
            seriesObj.label.normal.formatter = x.rate + '%'
            data.push(seriesObj)
            legend.push(x.categoryNameZh)
          })
          if (check) {
            otherObj.selected = true
          }

          this.turnover.series[0].data = data
          this.turnover.legend.data = legend
        }
        this.$nextTick(() => {
          this.initturnover()
        });
      },
      immediate: true
    },
    interestsStatus (val) {
      if (val === "otherAmount") {
        this.year1 = (this.MarketOverviewObj1.supplierFinanceDTOList[0].otherAmount / 1000000).toFixed(2)
        this.year2 = (this.MarketOverviewObj1.supplierFinanceDTOList[1].otherAmount / 1000000).toFixed(2)
        this.year3 = (this.MarketOverviewObj1.supplierFinanceDTOList[2].otherAmount / 1000000).toFixed(2)
      } else if (val === "svwAmount") {
        this.year1 = (this.MarketOverviewObj1.supplierFinanceDTOList[0].svwAmount / 1000000).toFixed(2)
        this.year2 = (this.MarketOverviewObj1.supplierFinanceDTOList[1].svwAmount / 1000000).toFixed(2)
        this.year3 = (this.MarketOverviewObj1.supplierFinanceDTOList[2].svwAmount / 1000000).toFixed(2)
      } else if (val === "profit") {
        this.year1 = (this.MarketOverviewObj1.supplierFinanceDTOList[0].profit / 1000000).toFixed(2)
        this.year2 = (this.MarketOverviewObj1.supplierFinanceDTOList[1].profit / 1000000).toFixed(2)
        this.year3 = (this.MarketOverviewObj1.supplierFinanceDTOList[2].profit / 1000000).toFixed(2)
      }
    }
  },
  methods: {
    initCharts () {
      const myChart = echarts().init(this.$refs.chart);
      // 绘制图表
      const option = this.option
      myChart.setOption(option);

    },
    handleChange (val) {
      this.iSelectOption.forEach(item => {
        if (item.value === val) {
          this.interestsName = item.name
        }
      })
      // this.year1 = ""
      // this.year2 = ""
      // this.year3 = ""
    },
    changInput () {
      let total = new Number()
      if (this.MarketOverviewObj.mainCustomerDTOList && this.MarketOverviewObj.mainCustomerDTOList.length > 0) {
        this.MarketOverviewObj.mainCustomerDTOList.forEach((item, index) => {
          if (index < this.MarketOverviewObj.mainCustomerDTOList.length - 1) {
            total += Number(item.totalSalesPro)
          }
        })
        console.log(total)
        if (total > 100) {
          iMessage.error('份额总和不能超过100%')
          return
        } else {
          if (total > 0) {
            this.MarketOverviewObj.mainCustomerDTOList[this.MarketOverviewObj.mainCustomerDTOList.length - 1].customerName = "其他"
            this.MarketOverviewObj.mainCustomerDTOList[this.MarketOverviewObj.mainCustomerDTOList.length - 1].totalSalesPro = 100 - total
          }
        }
      }
    },
    initturnover () {
      const myChart = echarts().init(this.$refs.turnover);
      // 绘制图表
      const option = this.turnover
      myChart.setOption(option);
      // myChart.dispatchAction({
      //   type: 'showTip',
      //   seriesIndex: 0,
      //   dataIndex: 0
      // });
    }
  }

}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
}
.nameText {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.charts {
  width: 100%;
  display: flex;
  border: 1px solid #acb8cf;
  border-radius: 10px;
  padding: 20px 30px;
  margin-bottom: 20px;
  .width3-1 {
    // width: calc(33.33% - 94px);
    display: flex;
    flex: 1;
    margin-left: 20px;
    flex-direction: column;
    .bg {
      div {
        background-color: rgba(22, 96, 241, 0.1);
        font-size: 16px;
        color: #000;
        border-radius: 5px 5px 0px 0px;
      }
      div:first-child {
        padding-left: 58px;
      }
    }
    .thead {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      div {
        height: 40px;
        line-height: 40px;
      }
      .last {
        width: 27%;
        text-align: center;
      }
      .border {
        border: 1px solid #f1f1f5;
        border-radius: 5px;
      }
      .first {
        display: flex;
        justify-content: flex-start;
        width: calc(73% - 10px);
      }
      .name {
        width: calc(100% - 50px);
        padding-left: 10px;
      }
      .index {
        width: 50px;
        text-align: center;
        border-right: 1px solid #f1f1f5;
        position: relative;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
        div {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
        }
      }
    }
  }
}
h3 {
  margin-bottom: 15px;
}
.score {
  span {
    color: #67C23A;
    font-size: 14px;
    margin-left: 15px;
    display: inline-block;
  }
  img {
    display: inline-block;
    margin-left: 10px;
  }
}
.interests {
  display: flex;
  // justify-content: center;
  .ml-49 {
    flex: 1;
    // margin-left: 40px;
    // padding: 0 20px;
    margin-left: 20px;
    width: calc(33.33% - 49px);
  }
  .interestsName {
    margin-left: 10px;
    flex: 1;
    padding: 10px 5px;
    border-radius: 5px;
    background-color: #fff;
    text-align: center;
  }
}
.legend {
  font-family: "Arial";
  font-size: 16px;
  color: #0d2451;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    li {
      padding-right: 20px;
    }
  }
}

.circle {
  display: inline-block;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  vertical-align: baseline;
  margin-right: 10px;
}
</style>