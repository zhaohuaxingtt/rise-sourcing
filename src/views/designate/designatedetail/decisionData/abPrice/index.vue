<!--
 * @Author: yuszhou
 * @Date: 2021-06-09 15:26:57
 * @LastEditTime: 2021-09-07 16:06:53
 * @LastEditors: Hao,Jiang
 * @Description: fs 供应商 横轴纵轴界面。基于报价分析界面组件。
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\abPrice\index.vue
-->
<template>
  <iCard v-permission.auto="SOURCING_NOMINATION_ATTATCH_ABPRICE|决策资料-abprice">
      <fsandsupplier></fsandsupplier>
  </iCard>
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