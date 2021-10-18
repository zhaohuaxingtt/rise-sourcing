<!--
 * @Author: Luoshuang
 * @Date: 2021-10-13 10:57:27
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-10-13 15:14:25
 * @Description: 
 * @FilePath: \front-web\src\views\project\progressreport\partprogress\components\detailChart\index.vue
-->

<template>
  <iCard class="overviewChartWrapper margin-top20 ">
    <div v-for="(item, index) in chartList" :key="item.name + index">
      <!-- <div class="chartTitle">{{item.name}}</div> -->
      <drawChart v-if="item.id" :id="item.id" :options="item.options"></drawChart>
    </div>
  </iCard>
</template>

<script>
import { iCard } from 'rise'
import { getStackBarOptions } from '../overviewChart/data'
import drawChart from '../drawChart'
export default {
  components: { iCard, drawChart },
  props: {
  },
  data() {
    return {
      chartList: [
        {
          name: 'Tiguan X 2022 Nomination status',
          xAxisNames: ['Total', 'CKD/HT', 'Nomi.done', 'Released', 'Not released'],
          legend: ['temp', 'ZP5', 'ZP7', 'total'],
          data: [[0,266,95,54,0],[200, 10, 121, 20, 49],[81,5,50,21,5], [0,0,0,0,0]],
          showLegend: true,
          id: 'detailNominationStatus',
          marklines: [281,266,95,54],
          showName: true,
          total: [281, 15, 171, 41, 54],
          showTooltip: true
        },
        {
          name: 'Tiguan X 2022 EM Soll1 open',
          xAxisNames: ['Total', 'No BF or Color Panel', 'Kick-off pending', 'Nomi.Pending', 'Sub-compoment'],
          legend: ['temp', 'ZP5', 'ZP7', 'total'],
          data: [[0,266,95,54,0],[200, 10, 121, 20, 49],[81,5,50,21,5], [0,0,0,0,0]],
          showLegend: true,
          id: 'detailEMSoll1Open',
          marklines: [281,266,95,54],
          showName: true,
          total: [281, 15, 171, 41, 54],
          showTooltip: true
        },
        {},
        {
          name: 'Tiguan X 2022 Kick-off status',
          xAxisNames: ['Total', 'Kick-off done', 'Kick-off pending'],
          legend: ['temp', 'ZP5', 'ZP7', 'total'],
          data: [[0,266,95,54,0],[200, 10, 121, 20, 49],[81,5,50,21,5], [0,0,0,0,0]],
          showLegend: true,
          id: 'detailKickoffStatus',
          marklines: [281,266,95,54],
          showName: true,
          total: [281, 15, 171, 41, 54],
          showTooltip: true
        },
        {
          name: 'Tiguan X 2022 OTS Soll1 open',
          xAxisNames: ['Total', 'No BF or Color Panel', 'Kick-off pending', 'Nomi. Pending'],
          legend: ['temp', 'ZP5', 'ZP7', 'total'],
          data: [[0,266,95,54,0],[200, 10, 121, 20, 49],[81,5,50,21,5], [0,0,0,0,0]],
          showLegend: true,
          id: 'detailOTSSoll1Open',
          marklines: [281,266,95,54],
          showName: true,
          total: [281, 15, 171, 41, 54],
          showTooltip: true
        },
        {}
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * @Description: 获取图表数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getChartValues() {
      this.chartList = this.chartList.map(item => {
        return {
          ...item,
          options: item.id ? getStackBarOptions(item) : {}
        }
      })
    },
    async init() {
      await this.getChartValues()
    }
  }
}
</script>

<style lang="scss" scoped>
.overviewChartWrapper {
  .chartTitle {
    font-size: 18px;
    font-weight: bold;
  }
  ::v-deep .cardBody {
    height: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    & > div {
      width: 33%;
      height: 360px;
      margin-bottom: 80px;
    }
  }
}

</style>