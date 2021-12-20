<!--
 * @Author: yuszhou
 * @Date: 2021-04-23 09:16:48
 * @LastEditTime: 2021-12-20 15:17:08
 * @LastEditors: caopeng
 * @Description: 供应商维度展示
 * @FilePath: \front-sourcing-new\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringEcartsCard\index.vue
-->
<template>
  <!----------------------------------------------------------->
  <!------------------- 供应商报价报价趋势图 --------------------->
  <!----------------------------------------------------------->
  <iCard :title="language('LK_BAOJIAQS','报价趋势')+`<span class='cursor' ><i style='color:#1660f1; font-weight: bold;font-size: 18px;' class='el-icon-shopping-cart-1'></i></span>`" class="margin-top20" collapse>
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
