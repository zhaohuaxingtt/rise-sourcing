<!--
 * @Author: wentliao
 * @Date: 2021-08-25 09:56:39
 * @Description: 
-->
<template>
  <div>
    <mouldAndDevelopmentCost @save="save" :isAeko="true"/>
  </div>
</template>

<script>
import mouldAndDevelopmentCost from 'rise/web/quotationdetail/components/mouldAndDevelopmentCost/components/developmentCost'
export default {
  components:{
    mouldAndDevelopmentCost,
  },
  methods:{
    // 保存
    save(value){
      console.log(value,'savesavesave');
    }
  }
}
</script>

<style lang="scss" scoped>
</style>