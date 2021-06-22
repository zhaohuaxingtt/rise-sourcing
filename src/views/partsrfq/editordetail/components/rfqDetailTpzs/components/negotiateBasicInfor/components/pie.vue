<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 17:50:19
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div>
    <el-row type="flex" justify="start">
      <el-col :span="4" class="flex">
        <iLabel style="width:100px" :label="$t('LK_CAILIAOZU')+':' "></iLabel>
        <iSelect></iSelect>
      </el-col>
      <el-col :span="4" class="flex margin-left20">
        <iLabel style="width:100px" :label="$t('TPZS.DW') "></iLabel>
        <iSelect></iSelect>
      </el-col>
    </el-row>
    <div v-if="flag" class="chart" ref="chart"></div>
  </div>
</template>

<script>
import { iCard, iButton, iLabel, iFormGroup, iFormItem, iSelect } from "rise";
import echarts from '@/utils/echarts'

export default {
  components: { iCard, iButton, iLabel, iFormGroup, iFormItem, iSelect },
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Array,
      default: () => ['#1863F5', '#5C90F7', '#8BB1FB', '#A2C0FC', '#D0E0FE', '#E8F1FF', '#F3F7FF']
    }
  },
  data() {
    return {
      flag: false
    }
  },
  methods: {
    initCharts() {
      const myChart = echarts().init(this.$refs.chart);
      var option = {}
      option = {
        tooltip: {
          trigger: 'item'
        },
        color: ['#1863F5', '#5C90F7', '#8BB1FB', '#A2C0FC', '#D0E0FE', '#E8F1FF', '#F3F7FF'],
        graphic: {
          type: 'text',
          top: "center",
          left: 'center',
          style: {
            text: 1235,
            fill: '#ACB8CF',
            fontSize: 28,
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            minAngle: 5,
            radius: ['35%', '50%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center',
                textStyle: {
                  fontSize: 40,
                  color: '#ACB8CF'
                },
              },
            },
            data: this.chartData
          }
        ]
      }
      myChart.setOption(option);
    }
  },
  mounted() {
    this.initCharts();
  },
  watch: {
    chartData: {
      handler(newVal) {
        console.log(newVal);
        if (newVal) {
          this.flag = true
        }
      },
      immediate: true,
    }
  }
}
</script>

<style>
.chart {
  width: 436px;
  height: 436px;
}
</style>