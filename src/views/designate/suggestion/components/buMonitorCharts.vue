<template>
  <div class="buNonitorCharts">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        {{ 'Nomination Scenario Overview' }}
      </span>
    </div>
    <div class="legendLine">
      <ul class="legend">
        <li>SH Huashi</li>
        <li class="corlor1">NBHX</li>
      </ul>
      <div class="control">
        <!-- 方案选择 -->
        <iSelect
          v-model="mapControl"
          :placeholder="$t('nominationSuggestion.FanAnXuanZhe')">
          <el-option
            value=""
            :label="$t('all') | capitalizeFilter"
          ></el-option>
          <el-option
            :value="items.key"
            :label="items.value"
            v-for="(items, index) in mapOptions"
            :key="index"
          ></el-option>
        </iSelect>
      </div>
    </div>
    <div id="charts0"></div>
  </div>
</template>
<script>
import { iSelect } from "rise";
import echarts from "@/utils/echarts";
import {rich} from './lib/chart'

export default {
  components: {
    iSelect
  },
  props: {
    data: {
      type: Array,
      default: () => ([[0, 0, 0, 0], [0, 0, 0, 0]])
    }
  },
  data() {
    return {
      mapControl: '',
      mapOptions: [
        {
          key: 'A',
          value: '整体最佳'
        },
        {
          key: 'B',
          value: '分组最佳'
        },
        {
          key: 'C',
          value: '单一零件最佳'
        },
        {
          key: 'D',
          value: '手动分配'
        }
      ],
      dataList: []
      
    }
  },
  mounted() {
  },
  methods: {
    init() {
      const vm = echarts().init(document.getElementById("charts0"));
      this.$nextTick(() => {
        let option = {
          grid: {
            left: '10',
            right: '0',
            bottom: '20',
            top: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            offset: 0,
            data: [
              'Best TTO \n for Whole Package',
              'Best TTO \n by Group',
              'Best TTO \n by Part',
              'Recommend \n Scenario'],
            axisTick: {
              show: false
            },
            axisLine:{
              lineStyle:{
                color: '#CDD4E2'
              }
            },
            axisLabel:{
              textStyle:{
                color: '#485465'
              },
              formatter: function (val) {
                // console.log(val)
                return `{n|${val}}` // 使用 rich 中的 n 来设置样式
              },
              rich,
              interval: 0 // 显示所有的 x 轴上的文字不隐藏
            },
            axisPointer: {  // 柱子背景
              show: true,
              type: 'shadow',
              shadowStyle: {
                color: '#cdd4E2',
                opacity: 0.13
              }
            },
          },
          yAxis: {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true
            },
            splitLine: {
              show: true, 
              lineStyle: {
                color: ['#ececf1']
              }
            },
            axisLine: {
              show: false
            },
        
          },
          series: [
            {
              data: this.dataList[0],
              type: 'bar',
              barWidth: 30,
                stack: 'total',
              label: {
                show: false,
                position: 'top',
                textStyle: {
                  color: '#485465'
                }
              },
              itemStyle: {
                normal: {
                  color: function(params){
                    let colorlist = ['#005cfa','#005cfa','#005cfa','#005cfa'];
                    return colorlist[params.dataIndex];
                  }
                },
              }
            },
            {
              data: this.dataList[1],
              type: 'bar',
              barWidth: 30,
                stack: 'total',
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#485465'
                }
              },
              itemStyle: {
                normal: {
                  barBorderRadius: [5, 5, 0, 0],
                  color: function(params){
                    let colorlist = ['#94c8fc','#94c8fc','#94c8fc','#94c8fc'];
                    return colorlist[params.dataIndex];
                  }
                },
              }
            }
          ]
        };
        vm.setOption(option);
      })
    }
  },
  watch: {
    data: {
      handler(newVal) {
        this.dataList = newVal
        this.$nextTick(() => {
          this.init()
        })
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.buNonitorCharts {
  width: 100%;
  height: 560px;
  .legendLine {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    .legend {
      li {
        font-size: 16px;
        display: inline-block;
        padding-right: 15px;
        &:before {
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          background: $color-blue;
          border-radius: 50%;
          margin-right: 5px;
        }
        &.corlor0:before {
          background: $color-blue;
        }
        &.corlor1:before {
          background: #94c8fc;
        }
      }
    }
  }
  #charts0 {
    width: 100%;
    height: 560px;
  }
}
</style>