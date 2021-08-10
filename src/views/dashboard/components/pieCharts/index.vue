<!--
 * @Author: your name
 * @Date: 2021-08-05 16:16:30
 * @LastEditTime: 2021-08-06 14:36:15
 * @LastEditors: Please set LastEditors
 * @Description: 材料组定点时率及平均定点周期
 * @FilePath: /front-web/src/views/designate/home/components/headerNav/components/nomiCharts.vue
-->
<template>
  <iCard class="picharts">
    <div class="margin-bottom20 clearFloat">
      <div class="picharts-title">
        <span class="font18 font-weight">
          {{ language('LIUZHUANZHUANGTAIGENZHONG','流转状态跟踪') }}
        </span>
        <span class="updateTime">
          {{language('SHUJUJIEZHIZHI','数据截止至')}}:
          {{freshDate}}
        </span>
      </div>
    </div>
    <div class="picharts-content">
      <div id="charts1"></div>
      <div class="picharts-legend">
        <ul>
          <li>
            <p class="legend-title">{{language('LIUZHUAN4ZHOUNEI','流转4周内')}}</p>
            <p class="legend-value"><strong>100</strong></p>
            <p class="legend-percent">（83.33%）</p>
          </li>
          <li>
            <p class="legend-title">{{language('LIUZHUANCHAO4ZHOU', '流转超4周')}}</p>
            <p class="legend-value"><strong>20</strong></p>
            <p class="legend-percent">（16.67%）</p>
          </li>
        </ul>
      </div>
    </div>
    
  </iCard>
</template>

<script>
import echarts from "@/utils/echarts";
import {iCard} from 'rise'
import {option as mokeChartsData} from '../pieChartsData'
import moment from 'moment'

export default {
  components: {
    iCard
  },
  computed: {
    freshDate() {
      return moment().format('YYYY-MM-DD')
    }
  },
  data() {
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log('mokeChartsData', mokeChartsData)
      const vm = echarts().init(document.getElementById("charts1"));
      const self = this
      let option = mokeChartsData
      vm.clear()
      vm.setOption(option);
    }
  }
}
</script>
<style lang="scss" scoped>
.picharts {
  width: 100%;
  min-height: 500px;
}
#charts1 {
  width: 100%;
  height: 500px;
}
.picharts-title {
  display: flex;
  justify-content: space-between;
  .updateTime {
    color: #bdbdbd;
  }
}
.picharts-content {
  width: 100%;
  position: relative;
  .picharts-legend {
    width: 100%;
    min-height: 100px;
    position: absolute;
    bottom: 0px;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      li {
        width: 50%;
        height: 100%;
        &:first-child {
          .legend-value strong {
            border-bottom: 2px solid #6192f0;
          }
        }
        &:last-child {
          .legend-value strong {
            border-bottom: 2px solid #fab738;
          }
        }
        p {
          text-align: center;
          &.legend-title {
            color: #000;
          }
          &.legend-value {
            text-align: center;
            strong {
              display: inline-block;
              width: 60px;
              line-height: 30px;
              font-size: 18px;
              border-bottom: 2px solid #6192f0;
              margin: 10px 0;
              font-weight: bold;
              
            }
          }
          &.legend-percent {
            color: #666666;
          }
        }
      }
    }
  }
}

</style>