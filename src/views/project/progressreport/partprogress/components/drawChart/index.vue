<!--
 * @Author: Luoshuang
 * @Date: 2021-10-12 16:49:39
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-10-12 17:11:27
 * @Description: 
 * @FilePath: \front-web\src\views\project\progressreport\partprogress\components\drawChart\index.vue
-->
<template>
  <div :id="id" class="chartWrapper"></div>
</template>

<script>
import echarts from "@/utils/echarts"
export default {
  props: {
    id: {type:String,default: `chart${Math.floor(Math.random()*100000000)}`},
    options: {type:Object}
  },
  watch: {
    options(option) {
      if (option) {
        this.drawChart()
      }
    }
  },
  data() {
    return {
      vm: null
    }
  },
  mounted() {
    this.vm = echarts().init(document.getElementById(this.id))
    this.vm.clear()
  },
  methods: {
    drawChart() {
      if (this.vm) {
        this.vm.clear()
        this.vm.setOption(this.options)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chartWrapper {
  width: 100%;
  height: 100%;
}
</style>