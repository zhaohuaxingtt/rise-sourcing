<!--
 * @Author: your name
 * @Date: 2021-08-05 16:16:30
 * @LastEditTime: 2021-08-20 10:43:37
 * @LastEditors: Please set LastEditors
 * @Description: 材料组定点时率及平均定点周期
 * @FilePath: /front-web/src/views/designate/home/components/headerNav/components/nomiCharts.vue
-->
<template>
  <iCard class="nomicharts">
    <div class="margin-bottom20 clearFloat">
      <div class="nomicharts-title">
        <span class="font20 font-weight">
          {{ language('CAILIAOZUDINGDIANJISHILVDINGDIANZHOUQI','材料组定点及时率及平均定点周期') }}
        </span>
        <span class="updateTime">
          {{language('LINGJIANJITONGJISHUJUJIEZHI','以零件级统计，数据截止至')}}:
          {{freshDate}}
          ({{language('TONGJIANWEI1NIANNEI','统计范围：1年内')}})
        </span>
      </div>
    </div>
    <div id="charts0"></div>
  </iCard>
</template>

<script>
import echarts from "@/utils/echarts";
import {iCard} from 'rise'
import {generateOptions} from '../mokeChartsData'
import moment from 'moment'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    iCard
  },
  computed: {
    freshDate() {
      return moment().format('YYYY-MM-DD')
    }
  },
  data() {
    return {}
  },
  watch: {
    data(data) {
      this.init(data)
    }
  },
  mounted() {
    this.init(this.data)
  },
  methods: {
    init(params) {
      if (!Object.keys(params).length) return
      const options = generateOptions(params)
      console.log('-mokeChartsData-', options)
      const vm = echarts().init(document.getElementById("charts0"));
      vm.clear()
      vm.setOption(options);
    }
  }
}
</script>
<style lang="scss" scoped>
.nomicharts {
  width: 100%;
  min-height: 500px;
  ::v-deep.cardBody {
    padding: 20px 15px;
  }
}
#charts0 {
  width: 100%;
  height: 500px;
}
.nomicharts-title {
  display: flex;
  justify-content: space-between;
  .updateTime {
    color: #5f6879;
    font-size: 12px;
    opacity: 0.67;
  }
}
</style>