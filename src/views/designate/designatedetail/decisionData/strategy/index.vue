<!--
 * @Author: your name
 * @Date: 2021-11-02 15:35:20
 * @LastEditTime: 2021-11-11 17:49:13
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
  <div>三组提供</div>
</div>
</template>
<script>
import {iCard} from 'rise'
import higthligthts from './components/highligths'
import powerBi from './components/powBi'
export default{
  components:{iCard,higthligthts,powerBi},
  data(){
    return {}
  }
}
</script>
<style lang='scss' scoped>
</style>