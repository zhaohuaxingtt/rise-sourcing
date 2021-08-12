<template>
  <div class="the-price-chart">
    <div class="header-box">
      <div class="title">
        {{ language('PI.PIJIAGEFENXI', 'Price Index价格分析') }}
        <iconTips
            iconName="iconxinxitishi"
            :tipContent="language('PI.PIINDEXTISHI', '图中波动均为加权平均波动')"
            :iconStyle="{'fontSize': '12px'}"
            tipWidth="200"
            class="margin-left10"
        />
      </div>
      <div class="select-box">
        <template v-if="isPreview">
          <span class="text">{{ language('PI.SHIJIANKELIDU', '时间颗粒度') }}：xx</span>
        </template>
        <template v-else>
          <div class="select-item">
            <div class="label">{{ language('PI.JIAGEWEIDU', '价格维度') }}</div>
            <el-cascader
                v-model="form.priceLatitude"
                :options="priceLatitudeOptions"
                :props="{ multiple: true }"
                @change="handlePriceLatitudeChange"
                collapse-tags
                clearable></el-cascader>
          </div>
          <div class="select-item margin-left30">
            <div class="label">{{ language('PI.SHIJIANKELIDU', '时间颗粒度') }}</div>
            <iSelect v-model="form.timeGranularity" @change="handleTimeGranularityChange">
              <el-option
                  v-for="item of timeGranularityOptions"
                  :key="item.name"
                  :label="item.name"
                  :value="item.value"
              ></el-option>
            </iSelect>
          </div>
        </template>
      </div>
    </div>
    <div class="chartBox">
      <div class="theChart" ref="theChart" :style="{'height': chartHeight}"/>
      <div class="legendBox">
        <div class="legendItem">
          <div class="shape rect"></div>
          <div class="text">汇率合成波动比例</div>
        </div>
        <div class="legendItem">
          <div class="shape">
            <div class="doubleBox"></div>
            <div class="doubleBox"></div>
          </div>
          <div class="text">汇率合成波动均线</div>
        </div>
        <div class="legendItem">
          <div class="shape">
            <div class="dotBox"></div>
            <div class="dotBox"></div>
            <div class="dotBox"></div>
            <div class="dotBox"></div>
            <div class="dotBox"></div>
          </div>
          <div class="text">汇率1波动比例</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {iSelect} from 'rise';
import iconTips from '../../../../../components/ws3/iconTips';
import echarts from '@/utils/echarts';

export default {
  components: {
    iconTips,
    iSelect,
  },
  props: {
    chartHeight: {
      type: String,
      default: '350px',
    },
    chartData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      priceLatitudeOptions: [
        {
          value: 1,
          label: '东南',
          children: [
            {
              value: 2,
              label: '上海',
            }, {
              value: 7,
              label: '江苏',
            }, {
              value: 12,
              label: '浙江',
            }],
        },
      ],
      timeGranularityOptions: [
        {name: '年', value: '年'},
        {name: '季度', value: '季度'},
        {name: '月', value: '月'},
      ],
      form: {
        priceLatitude: [],
        timeGranularity: '',
      },
      seriesArray: [],
      legendData: [],
    };
  },
  mounted() {
    this.buildChart();
  },
  methods: {
    handleTimeGranularityChange(val) {
      console.log(val);
    },
    handlePriceLatitudeChange(val) {
      console.log(val);
    },
    initEcharts() {
      const chart = echarts().init(this.$refs.theChart);
      const option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          formatter: (obj) => {
            const titleDiv = `<div class="tooltipText">${obj[0].name}</div>`;
            const contentDiv = [];
            obj.map(item => {
              const itemDiv = `<div>
              <span class="tooltipText">${item.seriesName}：</span>
              <span class="tooltipText">幅度</span>
              <span class="tooltipText">${item.value}，</span>
              <span class="tooltipText">值</span>
              <span class="tooltipText">${item.value}</span>
              </div>`;
              contentDiv.push(itemDiv);
            });
            return `
                <div class="tooltipContainer">
                 ${titleDiv}
                 ${contentDiv.join('')}
                </div>
            `;
          },
        },
        grid: {
          top: 30,
          left: '3%',
          right: 60,
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false,
          },
          name: this.language('PI.PIJIAGEDANWEI', '单位：%'),
          axisTick: {
            show: false,
          },
        },
        series: [
          this.setLineData({
            lineType: 'solid',
            lineColor: '#C62928',
            name: '汇率合成波动比例',
            data: [120, 132, 101, 134, 90, 230, 210],
          }),
          this.setLineData({
            lineType: 'dashed',
            lineColor: '#C62928',
            name: '汇率合成波动均线',
            data: [150, 150, 150, 150, 150, 150, 150],
          }),
          this.setLineData({
            lineType: 'dotted',
            lineColor: '#C62928',
            name: '汇率1波动比例',
            data: [150, 232, 201, 154, 190, 330, 410],
          }),
        ],
      };
      chart.setOption(option, true);
    },
    assembleData() {

    },
    buildChart() {
      this.assembleData();
      this.initEcharts();
    },
    setNormalLineLastDataMark(data) {
      const lastIndex = data.length - 1;
      const resData = data.map(item => {
        return {
          value: item,
        };
      });
      resData[lastIndex]['label'] = {
        show: true,
        color: '#000000',
        fontWeight: 'bold',
        position: 'right',
        formatter: (obj) => {
          return `${obj.value}%`;
        },
      };
      return resData;
    },
    setAverageLineLastDataMark(data, backgroundColor) {
      const lastIndex = data.length - 1;
      const resData = data.map(item => {
        return {
          value: item,
        };
      });
      resData[lastIndex]['label'] = {
        rich: {
          bg: {
            padding: [4, 12],
            backgroundColor,
            color: '#fff',
            fontWeight: 'bold',
          },
        },
        show: true,
        color: '#000000',
        position: 'right',
        formatter: (obj) => {
          return `{bg|${obj.value}%}`;
        },
      };
      return resData;
    },
    setLineData({lineType, lineColor, name, data}) {
      const obj = {
        name: name,
        type: 'line',
        symbolSize: 1,
        lineStyle: {
          type: lineType,
          color: lineColor,
        },
      };
      if (lineType === 'dashed') {
        obj.data = this.setAverageLineLastDataMark(data, lineColor);
      } else {
        obj.data = this.setNormalLineLastDataMark(data);
      }
      return obj;
    },
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.buildChart();
      },
    },
  },
};
</script>

<style lang="scss">
.the-price-chart {
  .header-box {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: bold;
    color: #000000;

    .title {
      display: flex;
      align-items: center;
    }

    .select-box {
      display: flex;
      align-items: center;

      .text {
        font-size: 16px;
        margin-right: 40px;
        color: #000000;
      }

      .select-item {
        display: flex;
        align-items: center;

        .label {
          white-space: nowrap;
          font-size: 16px;
          color: #000000;
          margin-right: 20px;
        }
      }
    }
  }

  .chartBox {
    display: flex;

    .theChart {
      flex: 1;
      margin-right: 20px;
    }

    .legendBox {
      width: 200px;
      margin-top: 30px;

      .legendItem {
        display: flex;
        align-items: center;

        .shape {
          display: flex;
          align-items: center;
          width: 20px;
          height: 8px;
          margin-right: 10px;

          .doubleBox {
            width: 9px;
            height: 3px;
            margin-right: 2px;
            background: #C62928;
          }

          .dotBox {
            width: 3px;
            height: 3px;
            margin-right: 1.25px;
            background: #C62928;
          }
        }

        .rect {
          background: #C62928;
        }

        .text {
          white-space: nowrap;
          font-size: 12px;
          color: #41434A;
        }
      }

      .legendItem + .legendItem {
        margin-top: 10px;
      }
    }
  }

  .tooltipContainer {
    box-sizing: border-box;
    padding: 5px;
    background: #FFFFFF;
    box-shadow: 0 3px 10px rgba(27, 29, 33, 0.16);
    border-radius: 5px;

    .tooltipText {
      font-size: 14px;
      color: #000000;
    }
  }
}
</style>
