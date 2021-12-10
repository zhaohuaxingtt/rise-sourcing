<!--
 * @Author: yuszhou
 * @Date: 2021-04-23 09:16:48
 * @LastEditTime: 2021-12-10 14:30:05
 * @LastEditors: caopeng
 * @Description: 供应商维度展示
 * @FilePath: \德勤项目\front-sourcing-new\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringEcartsCard\index.vue
-->
<template>
  <!----------------------------------------------------------->
  <!------------------- 供应商报价报价趋势图 --------------------->
  <!----------------------------------------------------------->
  <iCard :title="language('LK_BAOJIAQS','报价趋势')" class="margin-top20" collapse>
    <previewsCom ref='previewsCom'></previewsCom>
  </iCard>
</template>
<script>
import previewsCom from './previewEcharts'
import {iCard} from 'rise'
export default{
 components:{previewsCom,iCard}
}
</script>
