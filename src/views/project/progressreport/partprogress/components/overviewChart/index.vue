<!--
 * @Author: Luoshuang
 * @Date: 2021-10-12 10:30:30
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-10-13 11:13:15
 * @Description: 
 * @FilePath: \front-web\src\views\project\progressreport\partprogress\components\overviewChart\index.vue
-->

<template>
  <iCard class="overviewChartWrapper margin-top20 ">
    <div v-for="item in chartList" :key="item.name">
      <div class="chartTitle">{{item.name}}</div>
      <drawChart :id="item.id" :options="item.options"></drawChart>
    </div>
  </iCard>
</template>

<script>
import { iCard } from 'rise'
import { getPartOptions, getStackBarOptions } from './data'
import drawChart from '../drawChart'
export default {
  components: { iCard, drawChart },
  props: {
    widthTips: {type:Boolean, default: false}
  },
  data() {
    return {
      chartList1: [
        {
          name: 'Nomination status',
          barNames: ['Nomi. open', 'Nomi. done', 'Released', 'Unreleased'],
          barValues: [80, 520, 60, 20],
          id: 'nominationStatus'
        },
        {
          name: 'EM/OTS status',
          barNames: ['EM/OTS open', 'EM/OTS done', 'Nomi. Done', 'Nomi. Open'],
          barValues: [80, 520, 60, 20],
          id: 'emotsStatus'
        }
      ],
      chartList2: [
        {
          name: 'Tiguan X 2022 Nomination status - Product Group',
          xAxisNames: ['Total', 'Nomi.done', 'Released', 'Not'],
          legend: ['temp', 'nomi'],
          data: [[0,33,23,0],[63, 30, 10, 23]],
          showLegend: false,
          id: 'nominationStatusProductGroup',
          marklines: [63,33,23]
        }
      ]
    }
  },
  computed: {
    chartList() {
      return this.widthTips ? this.chartList1 : this.chartList2
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
      if (this.widthTips) {
        this.chartList1 = this.chartList1.map(item => {
          return {
            ...item,
            options: getPartOptions(item)
          }
        })
      } else {
        this.chartList2 = this.chartList2.map(item => {
          return {
            ...item,
            options: getStackBarOptions(item)
          }
        })
      }
      
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
    height: 360px;
    display: flex;
    & > div {
      width: 50%;
    }
  }
}
</style>