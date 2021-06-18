<!--
 * @Author: yuszhou
 * @Date: 2021-06-09 15:26:57
 * @LastEditTime: 2021-06-18 17:39:54
 * @LastEditors: Please set LastEditors
 * @Description: fs 供应商 横轴纵轴界面。基于报价分析界面组件。
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\abPrice\index.vue
-->
<template>
  <iCard>
      <fsandsupplier></fsandsupplier>
  </iCard>
</template> 
<script>
import {iCard} from 'rise'
import fsandsupplier from './components/extend'
export default{
  components:{fsandsupplier,iCard}
}
</script>