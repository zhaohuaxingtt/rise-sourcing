<template>
  <div class="the-price-chart" v-loading="chartLoading">
    <div class="header-box">
      <div class="title">
        {{ language('PI.PIJIAGEFENXI', 'Price Index价格分析') }}
        <iconTips iconName="iconxinxitishi" :tipContent="language('PI.PIINDEXTISHI', '图中波动均为加权平均波动')" :iconStyle="{'fontSize': '12px'}" tipWidth="200" class="margin-left10" />
      </div>
      <div class="select-box">
        <template v-if="isPreview">
          <span class="text">{{
              language('PI.SHIJIANKELIDU', '时间颗粒度')
            }}：{{ timeGranularity[$store.state.rfq.piIndexChartParams.particleSize] }}</span>
        </template>
        <template v-else>
          <div class="select-item">
            <div class="label">{{ language('PI.JIAGEWEIDU', '价格维度') }}</div>
            <el-cascader v-model="form.dimension" :options="priceLatitudeOptions" :props="{
                  multiple: true,
                  value: 'id',
                  label: 'name',
                  children: 'children'
                }" @change="handlePriceLatitudeChange" collapse-tags clearable />
          </div>
          <div class="select-item margin-left30">
            <div class="label">{{ language('PI.SHIJIANKELIDU', '时间颗粒度') }}</div>
            <iSelect v-model="form.particleSize" @change="handleTimeGranularityChange" clearable>
              <el-option v-for="item of timeGranularityOptions" :key="item.name" :label="item.name" :value="item.value"></el-option>
            </iSelect>
          </div>
        </template>
      </div>
    </div>
    <div class="chartBox">
      <div class="theChart" ref="theChart" :style="{'height': chartHeight}" />
      <div class="legendBox">
        <div class="legendItem" v-for="(item,index) of resChartData" :key="index">
          <template v-if="['compositeWaveRatio','mixPrice','purchase'].includes(item.waveType)">
            <div class="shape" :style="{'background': item.color}"></div>
          </template>
          <template v-else-if="['compositeWaveAvg','mixPriceAvg'].includes(item.waveType)">
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
import { iSelect } from 'rise';
import iconTips from '../../../../../components/ws3/iconTips';
import echarts from '@/utils/echarts';
import { getPiIndexPartCostWave } from '../../../../../api/partsrfq/piAnalysis/piDetail';
import { CURRENTTIME } from './data';
import _ from 'lodash';
import { mapState } from 'vuex';

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
    previewDialog: {
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
    priceLatitudeOptions: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    ...mapState({
      piIndexChartParams: (state) => state.rfq.piIndexChartParams,
      piIndexChartData: (state) => state.rfq.piIndexChartData,
    }),
  },
  data() {
    return {
      timeGranularityOptions: [
        { name: '年', value: '1' },
        { name: '季度', value: '2' },
        { name: '月', value: '3' },
      ],
      timeGranularity: {
        '1': '年',
        '2': '季度',
        '3': '月',
      },
      form: {
        dimension: [],
        dimensionHandle: [],
        particleSize: this.$store.state.rfq.piIndexChartParams.particleSize,
      },
      seriesArray: [],
      xLabelData: [],
      resChartData: [],
      chartLoading: false,
    };
  },
  mounted() {
    this.isPreview && this.previewChartData();
  },
  methods: {
    handleTimeGranularityChange() {
      const copyValue = _.cloneDeep(this.piIndexChartParams);
      copyValue.particleSize = this.form.particleSize;
      this.$store.dispatch('setPiIndexChartParams', copyValue);
      this.buildChart();
    },
    handlePriceLatitudeChange() {
      const copyValue = _.cloneDeep(this.piIndexChartParams);
      if (this.form.dimension.length) {
        this.form.dimensionHandle = this.form.dimension.map(item => {
          return {
            id1: item[0],
            id2: item[1],
          };
        });
      } else {
        this.form.dimensionHandle = [];
      }
      copyValue.dimensionHandle = this.form.dimensionHandle;
      this.$store.dispatch('setPiIndexChartParams', copyValue);
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
              let itemDiv = ``
              if (item.data.waveType === 'waveRatio') {
                itemDiv = `<div>
                  <span class="tooltipText">${item.seriesName}：</span>
                  <span class="tooltipText">${this.language('PIDETAIL.FUDU', '幅度')}</span>
                  <span class="tooltipText">${item.value}%，</span>
                  <span class="tooltipText">${this.language('PIDETAIL.ZHI', '值')}</span>
                  <span class="tooltipText">${item.name + item.data.currency}</span>
                </div>`;
              } else {
                itemDiv = `<div>
                  <span class="tooltipText">${item.seriesName}：</span>
                  <span class="tooltipText">${this.language('PIDETAIL.FUDU', '幅度')}</span>
                  <span class="tooltipText">${item.value}%</span>
                </div>`;
              }
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
          left: 40,
          right: 70,
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
    setAverageLineLastDataMark(data) {
      const resData = data.map(item => {
        return {
          value: item.value,
          name: item.name,
          waveType: item.waveType,
          currency: item.currency
        };
      });
      return resData;
    },
    setLineData({ lineType, lineColor, name, data }) {
      const obj = {
        name: name,
        type: 'line',
        symbolSize: 1,
        lineStyle: {
          type: lineType,
          color: lineColor,
        },
        emphasis: {
          focus: 'series'
        },
        endLabel: {
          show: true,
          position: 'right',
          rich: {
            bg: {
              align: 'right',
              backgroundColor: lineColor,
              color: '#fff',
              padding: [4, 4, 4, 7],
              fontWeight: 'bold',
              width: 50
            },
            bf: {
              width: 50,
              align: 'right',
              fontWeight: 'bold',
              padding: [4, 4, 4, 7],
            }
          },
          formatter: () => {
            return `{bf|${data[data.length - 1].value}%}`;
          }
        },
        labelLayout: {
          moveOverlap: 'shiftY',   //设置这个配置项之后标签不在重叠
        },
      };
      obj.data = this.setAverageLineLastDataMark(data);
      return obj;
    },
    async getChartData() {
      const req = {
        analysisSchemeId: this.currentTabData.analysisSchemeId,
        type: this.currentTab === CURRENTTIME ? '1' : '2',
        particleSize: this.piIndexChartParams.particleSize,
        dimension: this.piIndexChartParams.dimensionHandle,
        beginTime: this.piIndexChartParams.beginTime,
        endTime: this.piIndexChartParams.endTime,
      };
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
                waveType: item.waveType,
                currency: itemData.currency
              };
            });
            return this.setLineData({
              lineType: this.getLineType(item.waveType),
              lineColor: item.color,
              name: item.waveTypeName,
              data,
            });
          });
          this.xLabelData = res.data[0].timeList;
          this.setStorePiChartData();
        } else {
          this.seriesArray = [];
          this.xLabelData = [];
          this.resChartData = [];
        }
        this.chartLoading = false;
      } catch {
        this.setStorePiChartData();
        this.chartLoading = false;
      }
    },
    getLineType(type) {
      switch (type) {
        case 'compositeWaveAvg':
          return 'dashed';
        case 'mixPriceAvg':
          return 'dashed';
        case 'purchase':
          return 'solid';
        case 'mixPrice':
          return 'solid';
        case 'compositeWaveRatio':
          return 'solid';
        case 'waveRatio':
          return 'dotted';
      }
    },
    setStorePiChartData() {
      const copyValue = _.cloneDeep(this.piIndexChartData);
      copyValue.seriesArray = this.seriesArray;
      copyValue.xLabelData = this.xLabelData;
      copyValue.resChartData = this.resChartData;
      this.$store.dispatch('setPiIndexChartData', copyValue);
    },
    previewChartData() {
      this.seriesArray = this.piIndexChartData.seriesArray;
      this.xLabelData = this.piIndexChartData.xLabelData;
      this.resChartData = this.piIndexChartData.resChartData;
      this.initEcharts();
    },
  },
  watch: {
    previewDialog(val) {
      if (this.isPreview) {
        this.previewChartData();
      }
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
      max-height: 450px;
      overflow-y: scroll;

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
          color: #41434a;
        }
      }

      .legendItem + .legendItem {
        margin-top: 10px;
      }
    }
  }

  .tooltipContainer {
    .tooltipText {
      font-size: 14px;
      color: #000000;
    }
  }
}
</style>
