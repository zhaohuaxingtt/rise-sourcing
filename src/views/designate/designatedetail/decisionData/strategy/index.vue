<!--
 * @Author: your name
 * @Date: 2021-11-02 15:35:20
 * @LastEditTime: 2021-11-11 23:21:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\strategy\index.vue
-->
<template>
<div>
  <iCard :title="language('OVERVIEWS','Overviews')">
    <powerBi :query='powerBiQuery'></powerBi>
  </iCard>
  <higthligthts class='margin-top20 margin-bottom20'></higthligthts>
  <listOfinit></listOfinit>
</div>
</template>
<script>
import {iCard} from 'rise'
import higthligthts from './components/highligths'
import powerBi from './components/powBi'
import listOfinit from '@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/listOfInitiatives'
export default{
  components:{iCard,higthligthts,powerBi,listOfinit},
  data(){
    return {}
  }
}
</script>
<style lang='scss' scoped>
</style>