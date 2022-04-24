<!--
 * @Author: yuszhou
 * @Date: 2021-06-09 15:26:57
 * @LastEditTime: 2022-01-05 14:17:11
 * @LastEditors: Please set LastEditors
 * @Description: fs 供应商 横轴纵轴界面。基于报价分析界面组件。
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\abPrice\index.vue
-->
<template>
<div>
  <slot name="tabTitle"></slot>
  <iCard v-permission.auto="SOURCING_NOMINATION_ATTATCH_ABPRICE|决策资料-abprice">
      <fsandsupplier preview></fsandsupplier>
  </iCard>
</div>
</template> 
<script>
import {iCard} from 'rise'
import fsandsupplier from './components/extend'
export default{
  components:{fsandsupplier,iCard},
  methods:{
    getbaseInfoData(){
      return {}
    }
  }
}
</script>