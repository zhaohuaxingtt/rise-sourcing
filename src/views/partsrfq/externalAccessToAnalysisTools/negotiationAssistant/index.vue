<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 11:05:40
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iPage>
    <div class="flex-between-center-center margin-bottom20">
      <iNavMvp :list="tabRouterList" routerPage :lev="1" :query='$route.query' @change='changeRouter' />
      <div>
        <iButton @click="handleSearch">{{$t('search')}}</iButton>
        <iButton @click="handleReport">{{$t('TPZS.BGQD')}}</iButton>
        <icon class="icondatabaseweixuanzhong" name="icondatabaseweixuanzhong" symbol></icon>
      </div>
    </div>
    <gather ref="gather"/>
  </iPage>
</template>

<script>
import { icon, iButton } from "rise";
import { iPage, iNavMvp } from 'rise';
import { tabRouterList } from '../data';
import gather from './gather';



export default {
  components: {
    iPage,
    iNavMvp,
    icon, 
    iButton,
    gather
  },
  data() {
    return {
      tabRouterList,
    };
  },

  created() {
  },
  methods: {
    handleSearch() {
      this.$refs.gather.$refs.specialAnalysisTool.handleSearch()
    },
    handleReport() {
      this.$router.push({ path: '/sourcing/partsrfq/reportList' })
    },
  },
};
</script>

<style >
.icondatabaseweixuanzhong {
  font-size: 21px;
  margin-left: 1.875rem;
}
.flex-end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
