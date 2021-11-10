<!--
 * @Author: yuszhou
 * @Date: 2021-04-23 09:16:48
 * @LastEditTime: 2021-11-10 15:48:45
 * @LastEditors: Please set LastEditors
 * @Description: 供应商维度展示
 * @FilePath: \front-supplier\src\views\rfqManageMent\partsOffer\components\ecartsCard\index.vue
-->
<template>
  <!----------------------------------------------------------->
  <!------------------- 供应商报价报价趋势图 --------------------->
  <!----------------------------------------------------------->
  <iCard :title="language('LK_BAOJIAQS','报价趋势')" class="margin-top20" collapse>
    <previewsCom></previewsCom>
  </iCard>
</template>
<script>
import previewsCom from './previewEcharts'
export default{
 components:{previewsCom}
}
</script>
