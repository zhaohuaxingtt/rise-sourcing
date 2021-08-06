<!--
 * @Author: your name
 * @Date: 2021-08-05 16:16:30
 * @LastEditTime: 2021-08-06 14:44:10
 * @LastEditors: Please set LastEditors
 * @Description: 材料组定点时率及平均定点周期
 * @FilePath: /front-web/src/views/designate/home/components/headerNav/components/nomiCharts.vue
-->
<template>
  <iCard class="nomicharts">
    <div class="margin-bottom20 clearFloat">
      <div class="nomicharts-title">
        <span class="font18 font-weight">
          {{ language('CAILIAOZUDINGDIANJISHILVDINGDIANZHOUQI','材料组定点及时率及平均定点周期') }}
        </span>
        <span class="updateTime">
          {{language('LINGJIANJITONGJISHUJUJIEZHI','以零件级统计，数据截止至')}}:
          {{freshDate}}
        </span>
      </div>
    </div>
    <div id="charts0"></div>
  </iCard>
</template>

<script>
import echarts from "@/utils/echarts";
import {iCard} from 'rise'
import {option as mokeChartsData} from '../mokeChartsData'
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
      const vm = echarts().init(document.getElementById("charts0"));
      const self = this
      let option = mokeChartsData
      vm.clear()
      vm.setOption(option);
    }
  }
}
</script>
<style lang="scss" scoped>
.nomicharts {
  width: 100%;
  min-height: 500px;
}
#charts0 {
  width: 100%;
  height: 500px;
}
.nomicharts-title {
  display: flex;
  justify-content: space-between;
  .updateTime {
    color: #bdbdbd;
  }
}
</style>