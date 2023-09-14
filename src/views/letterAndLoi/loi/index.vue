<!--
 * @Author: wentliao
 * @Date: 2021-12-23 15:53:12
 * @Description: LOI首页
-->
<template>
  <iPage class="letterAndLoi" v-permission.auto="LK_LETTERANDLOI_PAGE|定点信/LOI页面">
    <headerNav />
    <loiList/>
  </iPage>
</template>

<script>
import { iPage } from 'rise';
import headerNav from "@/components/headerNav"
import loiList from './list';

export default {
    name:'letterAndLoi',
    components:{
      iPage,
      headerNav,
      loiList
    },
}
</script>

<style lang="scss" scoped>
</style>