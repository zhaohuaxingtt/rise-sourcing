<!--
 * @Author: wentliao
 * @Date: 2021-06-18 10:22:21
 * @Description: 定点信/LOI 列表页
-->
<template>
  <iPage class="letterAndLoi" v-permission.auto="LK_LETTERANDLOI_PAGE|定点信/LOI页面">
    <headerNav />
    <letterList />
  </iPage>
</template>

<script>
import { iPage } from 'rise';
import headerNav from "@/components/headerNav"
import letterList from './letter/list';

export default {
    name:'letterAndLoi',
    components:{
      iPage,
      headerNav,
      letterList
    }
}
</script>

<style lang="scss" scoped>
</style>