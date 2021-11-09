<!--
 * @Author: your name
 * @Date: 2021-11-02 15:35:20
 * @LastEditTime: 2021-11-09 19:27:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\strategy\index.vue
-->
<template>
<div>
  <div>data组数据湖提供</div>
  <higthligthts class='margin-top20 margin-bottom20'></higthligthts>
  <div>三组提供</div>
</div>
</template>
<script>
import {iCard} from 'rise'
import higthligthts from './components/highligths'
export default{
  components:{iCard,higthligthts},
  data(){},
  created(){
    this.costAnalysisGet()
  },
  methods:{
    costAnalysisGet(){
      costAnalysisGet(this.$route.query.desinateId).then(r=>{
        console.log(r)
      }).catch(err=>{console.warn(err)})
    }
  }
}
</script>
<style lang='scss' scoped>
</style>