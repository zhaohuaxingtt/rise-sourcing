<!--
 * @Author: yuszhou
 * @Date: 2021-04-23 09:16:48
 * @LastEditTime: 2022-01-18 10:06:48
 * @LastEditors: caopeng
 * @Description: 供应商维度展示
 * @FilePath: \front-sourcing-new\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringEcartsCard\index.vue
-->
<template>
  <!----------------------------------------------------------->
  <!------------------- 供应商报价报价趋势图 --------------------->
  <!----------------------------------------------------------->
  <iCard @handleTitle="addFile($event,4,'报价趋势',2)"  :title="language('LK_BAOJIAQS','报价趋势')" class="margin-top20" collapse>
    <previewsCom ref='previewsCom'></previewsCom>
  </iCard>
</template>
<script>
import previewsCom from './previewEcharts'
import {iCard} from 'rise'
import {  downloadPdfMixins } from '@/utils/pdf'
import { icardData } from '../data'
export default {
  mixins: [downloadPdfMixins],
 components:{previewsCom,iCard},
   props: {
    rfqInfoData: { type: Object },
  },
 data(){
     return {
            cardShow: JSON.parse(JSON.stringify(icardData)),
     }
 }
}
</script>
