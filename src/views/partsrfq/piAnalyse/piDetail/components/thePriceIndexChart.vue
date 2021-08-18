<template>
  <div class="the-price-chart" v-loading="chartLoading">
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
                v-model="form.dimension"
                :options="priceLatitudeOptions"
                :props="{
                  multiple: true,
                  value: 'id',
                  label: 'name',
                  children: 'children'
                }"
                @change="handlePriceLatitudeChange"
                collapse-tags
                clearable
            />
          </div>
          <div class="select-item margin-left30">
            <div class="label">{{ language('PI.SHIJIANKELIDU', '时间颗粒度') }}</div>
            <iSelect v-model="form.particleSize" @change="handleTimeGranularityChange">
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
        <div class="legendItem" v-for="(item,index) of resChartData" :key="index">
          <template v-if="item.waveType === 'compositeWaveRatio'">
            <div class="shape" :style="{'background': item.color}"></div>
          </template>
          <template v-else-if="item.waveType === 'compositeWaveAvg'">
            <div class="shape">
              <div class="doubleBox" :style="{'background': item.color}"></div>
              <div class="doubleBox" :style="{'background': item.color}"></div>
            </div>
          </template>
          <template v-else-if="item.waveType === 'waveRatio'">
            <div class="shape">
              <div class="dotBox" :style="{'background': item.color}"></div>
              <div class="dotBox" :style="{'background': item.color}"></div>
              <div class="dotBox" :style="{'background': item.color}"></div>
              <div class="dotBox" :style="{'background': item.color}"></div>
              <div class="dotBox" :style="{'background': item.color}"></div>
            </div>
          </template>
          <div class="text">{{ item.waveTypeName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {iSelect} from 'rise';
import iconTips from '../../../../../components/ws3/iconTips';
import echarts from '@/utils/echarts';
import {getPiIndexWaveSelectList} from '../../../../../api/partsrfq/piAnalysis/piDetail';
import {CURRENTTIME} from './data';
import {getPiIndexPartCostWave} from '../../../../../api/partsrfq/piAnalysis/piDetail';

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
    isPreview: {
      type: Boolean,
      default: false,
    },
    currentTabData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    currentTab: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      priceLatitudeOptions: [],
      timeGranularityOptions: [
        {name: '年', value: '1'},
        {name: '季度', value: '2'},
        {name: '月', value: '3'},
      ],
      form: {
        dimension: [],
        particleSize: '',
      },
      seriesArray: [],
      xLabelData: [],
      resChartData: [],
      chartLoading: false,
    };
  },
  mounted() {
    this.getPiIndexWaveSelectList();
    this.buildChart();
  },
  methods: {
    handleTimeGranularityChange() {
      this.buildChart();
    },
    handlePriceLatitudeChange(val) {
      this.buildChart();
    },
    initEcharts() {
      const chart = echarts().init(this.$refs.theChart);
      const option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          formatter: (obj) => {
            const titleDiv = `<div class="tooltipText">${obj[0].axisValueLabel}</div>`;
            const contentDiv = [];
            obj.map(item => {
              const itemDiv = `<div>
              <span class="tooltipText">${item.seriesName}：</span>
              <span class="tooltipText">幅度</span>
              <span class="tooltipText">${item.value}，</span>
              <span class="tooltipText">值</span>
              <span class="tooltipText">${item.name}</span>
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
          data: this.xLabelData,
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
        series: this.seriesArray,
      };
      chart.setOption(option, true);
    },
    async buildChart() {
      await this.getChartData();
      await this.initEcharts();
    },
    setNormalLineLastDataMark(data) {
      const lastIndex = data.length - 1;
      const resData = data.map(item => {
        return {
          value: item.value,
          name: item.name,
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
          value: item.value,
          name: item.name,
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
    async getPiIndexWaveSelectList() {
      try {
        this.priceLatitudeOptions = [];
        const req = {
          ...this.currentTabData,
          type: this.currentTab === CURRENTTIME ? '1' : '2',
        };
        const res = await getPiIndexWaveSelectList(req);
        this.priceLatitudeOptions = res.data;
      } catch {
        this.priceLatitudeOptions = [];
      }
    },
    async getChartData() {
      const req = {
        analysisSchemeId: this.currentTabData.analysisSchemeId,
        particleSize: this.form.particleSize,
        type: this.currentTab === CURRENTTIME ? '1' : '2',
        dimension: [],
      };
      if (this.form.dimension.length) {
        req.dimension = this.form.dimension.map(item => {
          return {
            id1: item[0],
            id2: item[1],
          };
        });
      }
      try {
        this.seriesArray = [];
        this.xLabelData = [];
        this.resChartData = [];
        this.chartLoading = true;
        const res = await getPiIndexPartCostWave(req);
        this.resChartData = res.data;
        if (res.data.length) {
          this.seriesArray = res.data.map(item => {
            const data = item.dataValuesList.map(itemData => {
              return {
                value: itemData.rate,
                name: itemData.value,
              };
            });
            return this.setLineData({
              lineType: this.getLineType(item.waveType),
              lineColor: item.color,
              name: item.waveTypeName,
              data,
            });
          });
          this.xLabelData = res.data[0].dataValuesList.map(item => {
            return item.time;
          });
        }
        this.chartLoading = false;
      } catch {
        this.chartLoading = false;
      }
    },
    getLineType(type) {
      switch (type) {
        case 'compositeWaveAvg':
          return 'dashed';
        case 'compositeWaveRatio':
          return 'solid';
        case 'waveRatio':
          return 'dotted';
      }
    },
  },
  watch: {
    currentTab() {
      this.getPiIndexWaveSelectList();
      this.buildChart();
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
          }

          .dotBox {
            width: 3px;
            height: 3px;
            margin-right: 1.25px;
          }
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
