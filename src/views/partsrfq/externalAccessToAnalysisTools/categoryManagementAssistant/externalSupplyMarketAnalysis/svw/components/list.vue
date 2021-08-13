<template>
  <div class="charts">
    <div class="width3-1">
      <h3>Top{{index}}</h3>
      <div class="flex">
        <div class="score">{{MarketOverviewObj.supplierName}} <span>{{MarketOverviewObj.otherCagrRate}}</span><img :src="upImg"
               alt=""></div>
        <div>单位: 百万元</div>
      </div>
      <div style="height:360px"
           ref="chart"></div>
      <div class="interests">
        <iSelect v-model="interestsStatus"
                 :disabled="isEdite"
                 @change="handleChange">
          <el-option v-for="(x,index) in iSelectOption"
                     :value="x.value"
                     :label="x.name"
                     :key="index"></el-option>
        </iSelect>
        <iInput v-model="year1"
                class="ml-49"
                :disabled="isEdite" />
        <iInput v-model="year2"
                class="ml-49"
                :disabled="isEdite" />
        <iInput v-model="year3"
                class="ml-49"
                :disabled="isEdite" />
      </div>
    </div>
    <div class="width3-1">
      <div style="height:360px"
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
            <span v-if="isEdite">{{x.customerName}}</span>
            <iInput v-else
                    v-model="x.customerName" />
          </div>
        </div>
        <div class="border last">
          <span v-if="isEdite">{{x.totalSalesPro}}</span>
          <iInput v-else
                  v-model="x.totalSalesPro" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from '@/utils/echarts'
import { iInput, iSelect } from 'rise'
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
      interestsStatus: '',
      iSelectOption: [{
        value: 'profit',
        name: "利润(%）"
      }, {
        value: 'svwAmount',
        name: "svw(元)"
      }, {
        value: 'otherAmount',
        name: "其它(元)"
      }],
      bgimg: require('../img/list.png'),
      upImg: require('../img/up.png'),
      option: {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['svw', '其他']
        },
        grid: {
          left: '25%',
          right: -10
        },
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
        yAxis: {
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
        series: [
          {
            name: 'svw',
            itemStyle: {
              color: "#0059FF"
            },
            stack: "check",
            type: 'bar',
            data: [{
              value: 20,
              itemStyle: {
                borderRadius: [25, 25, 0, 0],
              },
              label: {
                normal: {
                  show: true,
                  formatter: ''
                }
              }

            }, {
              value: 50,
              itemStyle: {
                borderRadius: [25, 25, 0, 0]
              },
              label: {
                normal: {
                  show: true,
                  formatter: ''
                }
              }
            }, {
              value: 60,
              itemStyle: {
                borderRadius: [25, 25, 0, 0]
              },
              label: {
                normal: {
                  show: true,
                  formatter: ''
                }
              }
            }]
          },
          {
            name: '其它',
            itemStyle: {
              color: "#B4CBF7"
            },
            stack: "check",
            type: 'bar',
            data: [{
              value: 20,
              itemStyle: {
                borderRadius: [25, 25, 0, 0]
              },
              label: {
                normal: {
                  show: true,
                  formatter: ''
                }
              }
            }, {
              value: 50,
              itemStyle: {
                borderRadius: [25, 25, 0, 0]
              },
              label: {
                normal: {
                  show: true,
                  formatter: ''
                }
              }
            }, {
              value: 47,
              itemStyle: {
                borderRadius: [25, 25, 0, 0]
              },
              label: {
                normal: {
                  show: true,
                  formatter: ''
                }
              }
            }]
          }
        ]
      },
      turnover: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom',
        },
        series: [
          {
            // name: '访问来源',
            type: 'pie',
            radius: '50%',
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

  },
  mounted () {
    let date = new Date()
    this.option.xAxis[0].data[0] = date.getFullYear() - 3
    this.option.xAxis[0].data[1] = date.getFullYear() - 2
    this.option.xAxis[0].data[2] = date.getFullYear() - 1
    this.initCharts()
    this.initturnover()
  },
  watch: {
    edite (val) {
      this.isEdite = val
      if (val) {
        if (this.interestsStatus === "otherAmount") {
          this.MarketOverviewObj.supplierFinanceDTOList[0].otherAmount = this.year1
          this.MarketOverviewObj.supplierFinanceDTOList[1].otherAmount = this.year2
          this.MarketOverviewObj.supplierFinanceDTOList[2].otherAmount = this.year3
        } else if (this.interestsStatus === "svwAmount") {
          this.MarketOverviewObj.supplierFinanceDTOList[0].svwAmount = this.year1
          this.MarketOverviewObj.supplierFinanceDTOList[1].svwAmount = this.year2
          this.MarketOverviewObj.supplierFinanceDTOList[2].svwAmount = this.year3
        } else if (this.interestsStatus === "profit") {
          this.MarketOverviewObj.supplierFinanceDTOList[0].profit = this.year1
          this.MarketOverviewObj.supplierFinanceDTOList[1].profit = this.year2
          this.MarketOverviewObj.supplierFinanceDTOList[2].profit = this.year3
        }
      }
      // if (val) {
      //   this.isEdite = val
      // }else{

      // }
    },
    MarketOverviewObj: {
      handler (curVal, oldVal) {
        let date = new Date().getFullYear();
        // 柱状图
        if (this.MarketOverviewObj.supplierFinanceDTOList.length < 1) return
        this.MarketOverviewObj.supplierFinanceDTOList.forEach(x => {
          if (x.year == date - 3) {
            this.option.series[0].data[0].label.normal.formatter = x.svwRate + '%'
            this.option.series[0].data[0].value = x.svwAmount
            this.option.series[1].data[0].value = x.otherRate
            this.option.series[1].data[0].label.normal.formatter = x.otherRate + '%'
          }
          if (x.year == date - 2) {
            this.option.series[0].data[1].label.normal.formatter = x.svwRate + '%'
            this.option.series[0].data[1].value = x.svwAmount
            this.option.series[1].data[1].value = x.otherRate
            this.option.series[1].data[1].label.normal.formatter = x.otherRate + '%'
          }
          if (x.year == date - 1) {
            this.option.series[0].data[2].label.normal.formatter = x.svwRate + '%'
            this.option.series[0].data[2].value = x.svwAmount
            this.option.series[1].data[2].value = x.otherRate
            this.option.series[1].data[2].label.normal.formatter = x.otherRate + '%'

          }
        });
        // 饼图
        if (this.MarketOverviewObj.supplierAllStuffDTO.supplierStuffCountDTOList.length > 0) {

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
            }
          }
          let data = []
          this.MarketOverviewObj.supplierAllStuffDTO.supplierStuffCountDTOList.forEach(x => {
            seriesObj.value = x.postAmount
            seriesObj.name = x.categoryNameZh
            seriesObj.label.normal.formatter = x.rate + '%'
            data.push(seriesObj)
          })
          this.turnover.series[0].data = data
        }
      },
      immediate: true,
      deep: true
    },
    handleChange (val) {
      // if (val === 'otherAmount') {
      //   this.MarketOverviewObj.supplierFinanceDTOList[0].otherAmount = this.year1
      //   this.MarketOverviewObj.supplierFinanceDTOList[1].otherAmount = this.year2
      //   this.MarketOverviewObj.supplierFinanceDTOList[2].otherAmount = this.year3
      // }else if
    }
  },
  methods: {
    initCharts () {
      const myChart = echarts().init(this.$refs.chart);
      // 绘制图表
      const option = this.option
      myChart.setOption(option);
    },
    initturnover () {
      const myChart = echarts().init(this.$refs.turnover);
      // 绘制图表
      const option = this.turnover
      myChart.setOption(option);
    }

  }

}
</script>

<style lang="scss" scoped>
    .flex{
        display: flex;
        justify-content: space-between;
    }
    .charts{
        width: 100%;
        display: flex;
        border:1px solid #ACB8CF;
        border-radius: 10px;
        padding: 20px 30px;
        margin-bottom: 20px;
        .width3-1{
            // width: calc(33.33% - 94px);
            display: flex;
            flex: 1;
            margin-left: 20px;
            flex-direction: column;
            .bg{
                div{
                    background-color: rgba(22,96,241,0.1);
                    font-size: 16px;
                    color: #000;
                    border-radius: 5px 5px 0px 0px;
                }
                div:first-child{
                    padding-left: 58px;
                }
            }
            .thead{
                 display: flex;
                 justify-content: space-between;
                 margin-bottom: 12px;
                div{
                    height: 40px;
                   line-height: 40px;
                }
                .last{
                    width: 27%;
                    text-align: center;
                }
                .border{
                    border: 1px solid #F1F1F5;
                    border-radius: 5px;
                }
                .first{
                    display: flex;
                    justify-content: flex-start;
                    width: calc(73% - 10px);
                }
                .name{
                    width: calc(100% - 50px);
                    padding-left: 10px;
                }
                .index{
                    width: 50px;
                    text-align: center;
                    border-right: 1px solid #F1F1F5;
                    position: relative;
                    img{
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%,-50%);
                        z-index: 2;
                    }
                    div{
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%,-50%);
                        z-index: 3;
                    }
                }
            }
        }
    }
    h3{
        margin-bottom: 15px;
    }
    .score{
        span{
            color: #1660F1;
            font-size: 14px;
            margin-left: 15px;
            display: inline-block;
        }
        img{
                display: inline-block;
                margin-left: 10px;
            }
    }
    .interests{
        display: flex;
        justify-content: center;
        .ml-49{
            margin-left: 40px;
            width: calc(33%.33 - 49px);
        }
    }
</style>