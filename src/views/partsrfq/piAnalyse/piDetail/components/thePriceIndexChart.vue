<template>
  <div>
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
        },
        grid: {
          top: 30,
          left: '3%',
          right: '3%',
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
          {
            name: '汇率合成波动比例',
            type: 'line',
            symbol: 'none',
            lineStyle: {
              type: 'solid',
              color: '#C62928',
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: '汇率合成波动均线',
            type: 'line',
            symbol: 'none',
            lineStyle: {
              type: 'dashed',
              color: '#C62928',
            },
            data: [150, 150, 150, 150, 150, 150, 150],
          },
          {
            name: '汇率1波动比例',
            type: 'line',
            symbol: 'none',
            lineStyle: {
              type: 'dotted',
              color: '#C62928',
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
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

<style scoped lang="scss">
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
</style>
