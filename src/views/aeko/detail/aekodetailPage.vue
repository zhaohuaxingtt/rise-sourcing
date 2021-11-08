<!--
 * @Author: YoHo
 * @Date: 2021-11-08 18:51:56
 * @LastEditTime: 2021-11-08 18:58:23
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div class="aekodetailItemPage">
    <pageContent />
  </div>
</template>

<script>
import pageContent from './components'
  export default {
    components:{
      pageContent
    }
  }
</script>

<style lang="scss" scoped>
.aekodetailItemPage{
  height:100%;
  overflow:auto
}
</style>