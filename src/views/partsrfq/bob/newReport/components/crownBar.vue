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
    <div style="height: 440px;width:100%"
         ref="chart">
    </div>
    <template v-if="chartData.length > 0">
      <div style="width: 100%;display:flex;flex-flow:row nowrap;">
        <span style="width: 8%;"></span>
        <span class="crown-bar-x-label"
              :style="{'width': 'calc(92% / ' + (chartData.length + 1) + ')'}"
              v-for="(row, idx) in chartData"
              :key="idx">{{getCrownBarName(row)}}</span>
        <span class="crown-bar-x-label"
              :style="{'width': 'calc(92% / ' + (chartData.length + 1) + ')','cursor': 'pointer'}"
              v-popover:bobTypePopper>
          {{bobType}}<i class="el-select__caret el-input__icon el-icon- el-icon-caret-bottom" />
        </span>
      </div>
      <el-popover ref="bobTypePopper"
                  placement="bottom"
                  width="150"
                  trigger="click">
        <el-radio-group v-model="bobType">
          <el-radio label="Best of Best">Best of Best</el-radio>
          <el-radio label="Best of Average">Best of Average</el-radio>
          <el-radio label="Best of Second">Best of Second</el-radio>
        </el-radio-group>
      </el-popover>
      <div style="width: 100%;display:flex;flex-flow:row nowrap;">
        <span style="width: 8%;"></span>
        <span class="crown-bar-x-label"
              :style="{'width': 'calc(92% / ' + (chartData.length + 1) + ')'}"
              v-for="(row, idx) in chartData"
              :key="idx">
          {{language('LK_NUMBERPREFIX','第')}}<a style="color: #1763F7; font-weight: 500;font-size: 16px;font-family: Arial;">{{row.turn}}</a>/{{row.totalTurn}}{{language('LK_TURN','轮')}}
        </span>
        <span class="crown-bar-x-label"
              :style="{'width': 'calc(92% / ' + (chartData.length + 1) + ')'}"></span>
      </div>
      <div style="width: 100%;display:flex;flex-flow:row nowrap;margin-top: 10px;">
        <span style="width: 8%;color: #3C4F74;">{{language('LK_CARPROJECT','车型项目')}}</span>
        <span class="crown-bar-x-label"
              :style="{'width': 'calc(92% / ' + (chartData.length + 1) + ')'}"
              v-for="(row, idx) in chartData"
              :key="idx">{{row.vehicleType}}</span>
        <span class="crown-bar-x-label"
              :style="{'width': 'calc(92% / ' + (chartData.length + 1) + ')'}"></span>
      </div>
      <div style="width: 100%;display:flex;flex-flow:row nowrap;">
        <span style="width: 8%;color: #3C4F74;">{{language('LK_CARPROJECTRFQ','报价时间')}}</span>
        <span class="crown-bar-x-label"
              :style="{'width': 'calc(92% / ' + (chartData.length + 1) + ')'}"
              v-for="(row, idx) in chartData"
              :key="idx">{{getCrownBarReqTime(row)}}</span>
        <span class="crown-bar-x-label"
              :style="{'width': 'calc(92% / ' + (chartData.length + 1) + ')'}"></span>
      </div>
    </template>
  </div>
</template>
<script >
import echarts from "@/utils/echarts";
import crown from "@/assets/images/bob.png";
import lv1 from "@/assets/images/lv1.png";
import ball from "@/assets/images/ball.png";
export default {
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    partList: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "Best of Best",
    },
    by: {
      type: String,
      default: "supplier",
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
        "原材料/散件成本": "rawMaterialSummary",
        '制造成本': "manufacturingCostSummary",
        '报废成本': "discardCostsSummary",
        '管理费用': "administrationCostsSummary",
        '其他费用': "otherCostsSummary",
        '利润': "profit",
      },
      legendArray: [
        "原材料/散件成本",
        "制造成本",
        "报废成本",
        "管理费用",
        "其他费用",
        "利润",
      ],
      anchorList: [{zh:'原材料/散件成本',i18n:'YUANCAILIAOSANJIANCHENGBEN'}, {zh:'制造成本',i18n:'ZHIZAOCHENGBEN'}, {zh:'报废成本',i18n:'BAOFEICHENGBEN'}, {zh:'管理费用',i18n:'GUANLIFEI'}, {zh:'其他费用',i18n:'LK_QITAFEIYONG'}, {zh:'利润',i18n:'LIRUN'}],
      bobType: "",
      dataArray: [],
      subtext: "",
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
      crown: crown,
      lv: lv1,
      ball: ball,
    };
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
    bos (arr) {
      const min = this.min(arr);
      let send = this.max(arr);
      arr.forEach((i) => {
        if (i > min) {
          if (i < send) {
            send = i;
          }
        }
      });

      return send;
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
      let that = this
      // 绘制图表
      const option = {
        title: {
          // text: this.title,
          subtext: "Unit: CNY/PC",
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
          left: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter (params) {
            let result = ''
            let domHtml = ''
            let arr = params.filter((value, index) => {
              return value.seriesName.indexOf('lv') > -1
            })
            let arr1 = params.filter((value, index) => {
              return !(value.seriesName.indexOf('lv') > -1)
            })
            arr = arr.reverse()
            arr1 = arr1.reverse()
            arr.forEach(value => {
              arr1.forEach(i => {
                if (value.seriesName.replace("lv", "") === i.seriesName) {
                  domHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + i.color + '"></span>'
                  result += domHtml + i.seriesName + ":" + that.doNumber(value.value) + '<br/>'
                }
              })
            })
            return result
          },
          textStyle: {
            fontSize: 12,
            color: "#7E84A3"
          }
        },
        // legend: {
        //   top: "10",
        //   right: "0",
        //   icon: "circle",
        //   fontSize: "10",
        //   fontFamily: "Arial",
        //   selectedMode: false, //取消图例上的点击事件
        //   data: this.legendArray,
        // },
        grid: {
          left: "8%",
          top: '25%',
          right: '0%',
          bottom: "3%",
          // containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.labelArray,
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
              fontWeight: 400,
              lineHeight: 18,
              color: '#3C4F74'
            },
            triggerEvent: true,
            offset: 6,
            z: 50
          },
          {
            type: "category",
            data: [...this.labelArray1, { value: "" }],
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
              // show: false,
              align: 'center',
              fontFamily: "Arial",
              interval: 0,
              fontSize: 12,
              fontWeight: 400,
              lineHeight: 18,
              color: '#3C4F74'
            },
            triggerEvent: true,
            offset: 30,
            z: 50
          },
        ],
        yAxis: [
          {
            type: "value",
            offset: 15,
            axisLabel: {
              fontSize: 12,
              color: "#3C4F74",
              fontWeight: 400
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            // splitNumber: 4,
            nameLocation: "start",
            max: this.maxData
          },
        ],
        // emphasis: {
        //   focus: "series",
        // },
        color: [
          "#C6DEFF",
          "#9BBEFF",
          "#72AEFF",
          "#5993FF",
          "#1763F7",
          "#0040BE",
        ],
        series: this.dataArray,
      };
      myChart.setOption(option);
      myChart.resize();
      myChart.on("click", function (params) {
        if (params.targetType === "axisLabel" && params.value === that.type) {
          that.$emit("select", params);
        }
      });

    },
    initData (newVal) {
      if (newVal.length !== 0) {
        this.chartArray = newVal;
        this.labelArray = [];
        this.labelArray1 = [];
        this.dataArray = [];
        const tempArr = [];
        const dataList1 = [];
        const typeList = [];
        newVal.forEach((row, i) => {
          const temp =
            row.vehicleType +
            "\n" +
            window.moment(row.cbdQuotationTime).format("yyyy.MM");
          const turn = row.turn === -1 ? "最新轮" : row.turn;
          const subtext = row.spareParts + '\n' + row.fs
          //todo
          let name = row.supplierName

          if (this.by === "num") {
            name = row.spareParts;
            this.partList.forEach(value => {
              if (name == value.spareParts) {
                name = value.shortNameZh
              }
            })
          }
          const str = name
          this.labelArray.push({
            value: str,
            textStyle: {
              rich: {
                Blue: {
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#1763F7",
                  fontFamily: "Arial",
                },
                font: {
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#7E84A3",
                  fontFamily: "Arial",
                  lineHeight: 23
                }
              },

            },
          });
          this.labelArray1.push({
            value: subtext,
          });

          // console.log(this.labelArray)
          this.legendArray.map((v, i) => {
            if (!tempArr[v]) {
              tempArr[v] = [];
              dataList1[v] = [];
            }
            tempArr[v].push(row[this.legendKeys[v]]);
            const sum = this.sumBy(this.take(this.legendArray, i + 1), (k) => {

              return Number(row[this.legendKeys[k]]);
            });
            // console.log(sum)
            dataList1[v].push(sum);

          });
        });

        const minList = [];
        this.legendArray.forEach((row, i) => {
          const dataList0 = this.cloneDeep(tempArr[row]);
          if (tempArr[row] && tempArr[row].length > 0) {
            var temp = []
            tempArr[row].forEach((num) => {
              temp.push(Number(num))
            })
            tempArr[row] = temp;
          }
          const min = Number(this.min(tempArr[row]))
          let sumList = tempArr[row].map(Number)
          let data = min;
          if (this.bobType === "Best of Average") {
            // data = this.doNumber((this.sum(tempArr[row]) / tempArr[row].length))
            data = tempArr[row].length <= 0 ? 0 : (this.sum(sumList) / tempArr[row].length)

          } else if (this.bobType === "Best of Second") {
            data = this.bos(sumList);
          }
          minList.push(data);
          if (i === 0) {
            tempArr[this.bobType] = [];
          }
          let langItem = this.anchorList.find((item)=>item.zh==row)
          this.dataArray.push({
            name: this.language(langItem.i18n,langItem.zh),
            type: "bar",
            // stack:"lv",
            barGap: "-100%",
            z: 20 - i,
            // emphasis: {
            //   focus: "series",
            // },
            label: {
              show: true,
              position: "insideTop",
              fontSize: 12,
              color: "white",
              fontFamily: "Arial",
              distance: 15,
              offset: [-2, 0],
              formatter: (params) => {
                if (params.name === this.bobType) {
                  return this.doNumber(data);
                } else {
                  return this.doNumber(tempArr[row][params.dataIndex]);
                }
              },
              rich: {
                lv: {
                  height: 15,
                  align: "right",
                  backgroundColor: {
                    image: this.lv,
                  },
                },
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              barBorderRadius: [5, 5, 0, 0],
            },
            barWidth: 50,
            data: [...dataList1[row], this.sum(minList)],
          });
          this.dataArray.push({
            name: this.language(langItem.i18n,langItem.zh) + "lv",
            type: "bar",
            stack: "lv",
            // emphasis: {
            //   focus: "series",
            // },
            label: {
              show: true,
              position: "right",
              fontFamily: "Arial",
              formatter: (params) => {
                if (
                  data == params.value &&
                  params.name !== this.bobType &&
                  this.type !== "Best of Average"
                ) {
                  return "\t\t{lv|}";
                } else {
                  return "";
                }
              },
              color: "white",
              rich: {
                lv: {
                  height: 10,
                  align: "right",
                  backgroundColor: {
                    image: this.lv,
                  },
                },
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              barBorderRadius: [5, 5, 0, 0],
              color: "#fff",
            },
            barWidth: 50,
            data: [...dataList0, minList[minList.length - 1]],
          });
        });
        // console.log(this.dataArray)

        this.labelArray.push(this.bobType);

        this.dataArray.push({
          name: "sum",
          type: "bar",
          stack: "lv",
          label: {
            show: true,
            position: "top",
            color: "#7E84A3",
            fontSize: 12,
            align: "center",
            fontFamily: "Arial",
            formatter: (params) => {
              // console.log(params)
              const min = this.min(dataList1["利润"]);
              // const sum=this.sum(tempArr[params.name])
              const index = params.dataIndex;
              if (params.name === this.bobType) {
                const sum = this.sum(minList);
                return this.doNumber(sum)
                // return '{bold|'+sum+'}'
              } else if (min) {
                const sum = dataList1["利润"][index];
                if (min === sum) {
                  return "{Ball|}   {BB|Best Ball}\n\n" + this.doNumber(sum)
                } else {
                  return this.doNumber(sum)
                }
              } else {
                const sum = dataList1["利润"][index];
                return this.doNumber(sum)
              }
            },
            rich: {
              BB: {
                fontSize: 12,
                height: 14,
                fontWeight: 400,

                padding: [0, 10, 4, 0],
                verticalAlign: "top",
                color: "#7E84A3",
              },
              bold: {
                fontSize: 12,
                fontWeight: 400,
                color: "#000",
              },
              Crown: {
                height: 15,
                align: "top",
                backgroundColor: {
                  image: this.crown,
                },
              },
              Ball: {
                height: 14,
                align: "top",
                backgroundColor: {
                  image: this.ball,
                },
              },
            },
          },
          labelLine: {
            show: false,
          },
          itemStyle: {
            barBorderRadius: [5, 5, 0, 0],
          },
          barWidth: 50,
          data: this.labelArray.map((i) => 0),
        });

        if (this.$refs.chart && this.chartArray.length > 0) {
          this.initCharts();
        }
      }
    },
  },
  mounted () {
    this.bobType = this.type;
    // this.initCharts();
  },
  watch: {
    title: {
      handler (str) {
        if (this.$refs.chart && this.chartArray.length > 0) {
          this.initCharts();
        }
      },
      immediate: true,
    },
    by: {
      handler (str) {
        this.initData(this.chartData);
      },
      immediate: true,
    },
    type: {
      handler (str) {
        if (str) this.bobType = str;
        this.initData(this.chartData);
      },
      immediate: true,
    },
    chartData: {
      handler (newVal) {
        this.initData(newVal);
      },
      immediate: true,
    },
    bobType (val) {
      this.$emit("type-changed", val)
    }
  },
};
</script>
