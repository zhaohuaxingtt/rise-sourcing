
<template>
  <div style="height: 460px;width:100%"
       ref="chart"></div>
</template>
<script >
import echarts from "@/utils/echarts";
import crown from "@/assets/images/bob.png";
import lv1 from "@/assets/images/lv.png";
import ball from "@/assets/images/ball.png";
export default {
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    supplierList: {
      type: Array,
      default: () => []
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
  },
  data () {
    return {
      chartArray: [],
      labelArray: [],
      legendKeys: {
        "原材料/散件": "rawMaterialSummary",
        制造费: "manufacturingCostSummary",
        报废成本: "discardCostsSummary",
        管理费: "administrationCostsSummary",
        其他费用: "otherCostsSummary",
        利润: "profit",
      },
      legendArray: [
        "原材料/散件",
        "制造费",
        "报废成本",
        "管理费",
        "其他费用",
        "利润",
      ],
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
      crown: crown,
      lv: lv1,
      ball: ball,
    };
  },
  methods: {
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
      // console.log(send)
      return send;
    },
    initCharts () {
      const myChart = echarts().init(this.$refs.chart);
      // 绘制图表
      const option = {
        title: {
          text: this.title,
          subtext: "Unit: CNY/pcs",
          textStyle: {
            fontSize: 18,
            fontFamily: 'Arial',
            lineHeight: 21,
          },
          subtextStyle: {
            color: "#7E84A3",
            fontSize: 12,
            fontFamily: "Arial",
          },
        },
        legend: {
          top: "10",
          right: "0",
          icon: "circle",
          fontSize: "10",
          fontFamily: "Arial",
          selectedMode: false, //取消图例上的点击事件
          data: this.legendArray,
        },
        grid: {
          right: '0%',
          bottom:"5%",
          containLabel: true,
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
            axisLabel: {
              fontFamily: "Arial",
              interval: 0,
            },
            triggerEvent: true,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "\n\n\n\n车型项目名称\n\n\nCBD报价时间",
            axisLabel: {
              color: "#7E84A3",
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitNumber: 4,
            nameLocation: "start",
            offset: 40,
          },
        ],
        emphasis: {
          focus: "series",
        },
        color: [
          "#1F33CC",
          "#404FC3",
          "#0E2C90",
          "#0040BE",
          "#1763F7",
          "#5993FF",
          "#72AEFF",
          "#94C8FC",
        ],
        series: this.dataArray,
      };
      myChart.setOption(option);
      const that = this;
      myChart.on("click", function (params) {
        console.log(params)
        if (params.targetType === "axisLabel" && params.value === that.type) {
          that.$emit("select", params);
        }
      });

    },
    initData (newVal) {
      if (newVal.length !== 0) {
        // console.log(newVal)
        this.chartArray = newVal;
        this.labelArray = [];
        this.dataArray = [];
        const tempArr = [];
        const dataList1 = [];
        const typeList = [];
        newVal.forEach((row, i) => {
          // console.log(row)
          const temp =
            row.vehicleType +
            "\n\n\n" +
            window.moment(row.cbdQuotationTime).format("yyyy.MM");
          const turn = row.turn === -1 ? "最新轮" : row.turn;
          //todo
          let name = row.supplierId;
          this.supplierList.forEach(value => {
            if (name == value.supplierId) {
              name = value.shortNameZh
            }
          })
          if (this.by === "num") {
            name = row.spareParts;
            this.partList.forEach(value => {
              if (name == value.spareParts) {
                name = value.shortNameZh
              }
            })
          }
          const str =
            name +
            "\n\n 第{Blue|" +
            row.turn +
            "}/" +
            row.totalTurn +
            "轮\n\n" +
            temp;
          this.labelArray.push({
            value: str,
            textStyle: {
              rich: {
                Blue: {
                  fontSize: 20,
                  fontWeight: 500,
                  color: "#1763F7",
                  fontFamily: "Arial",
                },
              },
            },
          });
          // console.log(this.labelArray)
          this.legendArray.map((v, i) => {
            if (!tempArr[v]) {
              tempArr[v] = [];
              dataList1[v] = [];
            }
            tempArr[v].push(row[this.legendKeys[v]]);
            const sum = this.sumBy(this.take(this.legendArray, i + 1), (k) => {
              return row[this.legendKeys[k]];
            });
            // console.log(sum)
            dataList1[v].push(sum);
          });
        });
        const minList = [];
        this.legendArray.forEach((row, i) => {
          const dataList0 = this.cloneDeep(tempArr[row]);
          console.log(dataList0)

          const min = this.min(tempArr[row]);
          let data = min;
          if (this.type === "Best of Average") {
            data = Number(
              (this.sum(tempArr[row]) / tempArr[row].length).toFixed(2)
            );
          } else if (this.type === "Best of Second") {
            data = this.bos(tempArr[row]);
          }
          minList.push(data);
          if (i === 0) {
            tempArr[this.type] = [];
          }
          // console.log(dataList0)
          // console.log(dataList1)
          this.dataArray.push({
            name: row,
            type: "bar",
            // stack:"lv",
            barGap: "-100%",
            z: 20 - i,
            emphasis: {
              focus: "series",
            },
            label: {
              show: true,
              position: "insideTop",
              fontSize: 14,
              color: "white",
              fontFamily: "Arial",
              formatter: (params) => {
                // console.log(params)
                if (params.name === this.type) {
                  return data;
                } else {
                  return tempArr[row][params.dataIndex];
                }
              },
              rich: {
                lv: {
                  height: 15,
                  align: "right",
                  backgroundColor: {
                    image: this.lv1,
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
            name: row + "lv",
            type: "bar",
            stack: "lv",
            emphasis: {
              focus: "series",
            },
            label: {
              show: true,
              position: "right",
              fontFamily: "Arial",
              formatter: (params) => {
                if (
                  data === params.value &&
                  params.name !== this.type &&
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
                    image: this.lv1,
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

        this.labelArray.push(this.type);
        this.dataArray.push({
          name: "sum",
          type: "bar",
          stack: "lv",
          label: {
            show: true,
            position: "top",
            color: "#7E84A3",
            fontSize: 14,
            align: "center",
            fontFamily: "Arial",
            formatter: (params) => {
              // console.log(params)
              const min = this.min(dataList1["利润"]);
              // const sum=this.sum(tempArr[params.name])
              const index = params.dataIndex;
              if (params.name === this.type) {
                const sum = this.sum(minList);
                // console.log(sum)
                return sum.toFixed(2);
                // return '{bold|'+sum+'}'
              } else if (min) {
                const sum = dataList1["利润"][index];
                if (min === sum) {
                  return "{Ball|}   {BB|Best Ball}\n\n" + sum;
                } else {
                  return sum.toFixed(2);
                }
              } else {
                const sum = dataList1["利润"][index];
                return sum.toFixed(2);
              }
            },
            rich: {
              BB: {
                fontSize: 16,
                fontWeight: 400,
                color: "#7E84A3",
              },
              bold: {
                fontSize: 18,
                fontWeight: 400,
                color: "#000",
              },
              Crown: {
                height: 15,
                align: "center",
                backgroundColor: {
                  image: this.crown,
                },
              },
              Ball: {
                height: 15,
                align: "center",
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
        console.log(this.dataArray)
        if (this.$refs.chart && this.chartArray.length > 0) {
          this.initCharts();
        }
      }
    },
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
  },
};
</script>
