<!--
 * @Author: youyuan
 * @Date: 2021-06-16 20:44:29
 * @LastEditTime: 2021-06-17 20:56:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\analysisTool\index.vue
-->
<template>
  <div>
    <analysisSearch/>
    
    <iCard :title="title" class="margin-top20">
      <!-- <div slot="headerControl">
        <iButton>编辑</iButton>
        <iButton>新建</iButton>
        <iButton>删除</iButton>
      </div> -->
      <analysisTable/>
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton} from 'rise'
import analysisSearch from './components/analysisSearch'
import analysisTable from './components/analysisTable'

export default {
  name: 'AnalysisTool',
  components: {iCard, iButton, analysisSearch, analysisTable},
  data () {
    return {
      title: 'volume Pricing分析库'
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang='less' scoped>

 
</style>
