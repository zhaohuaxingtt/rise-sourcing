<!--
 * @Author: YoHo
 * @Date: 2021-12-23 17:37:24
 * @LastEditTime: 2021-12-23 17:42:08
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <iPage class="dashboard">
    <headerNav :type="sourceinquirypoint" />
    <router-view></router-view>
  </iPage>
</template>

<script>
import {iPage, iCard, icon, iMessage} from 'rise'
import headerNav from '@/components/headerNav'
  export default {
    components:{
      iPage,
      headerNav
    }
  }
</script>

<style lang="scss" scoped>

</style>