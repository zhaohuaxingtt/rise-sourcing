<!--
 * @Author: Luoshuang
 * @Date: 2021-11-08 11:25:09
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-12-02 11:28:28
 * @Description: 
 * @FilePath: \front-sourcing\src\views\partsrfq\editordetail\components\rfqDetailInfo\components\referenceOutput\index.vue
-->
<template>
  <div>
    <parts-production v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_OUTPUT|零件产量导出"/>
    <time-plan class="mt20" v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN|时间计划"/>
  </div>
</template>

<script>
import partsProduction from './components/partsProduction'
import timePlan from './components/timePlan'

export default {
  components: {
    partsProduction,
    timePlan
  },
  data() {
    return {};
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.mt20{
  margin-top: 20px;
}
</style>