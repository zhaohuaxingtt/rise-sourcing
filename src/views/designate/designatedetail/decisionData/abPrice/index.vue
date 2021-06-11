<!--
 * @Author: yuszhou
 * @Date: 2021-06-09 15:26:57
 * @LastEditTime: 2021-06-11 11:51:22
 * @LastEditors: Please set LastEditors
 * @Description: fs 供应商 横轴纵轴界面。基于报价分析界面组件。
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\abPrice\index.vue
-->
<template>
  <iCard>
    <fsAndSupplierTable></fsAndSupplierTable>
  </iCard>
</template>
<script>
import {iCard} from 'rise'
import fsAndSupplierTable from '@/views/partsrfq/editordetail/components/rfqDetailTpzs/components/quotationScoringHz'
export default{
  extends:fsAndSupplierTable,
  components:{iCard,fsAndSupplierTable}
}
</script>