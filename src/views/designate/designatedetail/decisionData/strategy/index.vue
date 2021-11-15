<!--
 * @Author: your name
 * @Date: 2021-11-02 15:35:20
 * @LastEditTime: 2021-11-12 13:55:26
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
  <iCard :title='language("KEYINITIATIVE","Key initiatives")'>
    <listOfinit :extendsIsedit='false' :isEdit='isEdit'></listOfinit>
  </iCard>
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
    return {
      isEdit:''
    }
  },
  mounted(){
    setTimeout(() => {
      this.isEdit = false
    }, 800);
  }
}
</script>
<style lang='scss' scoped>
</style>