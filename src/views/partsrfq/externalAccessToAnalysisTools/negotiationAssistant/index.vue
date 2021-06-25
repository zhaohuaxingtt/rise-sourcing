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
     
    </div>
    <gather ref="gather" />
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
    
    gather
  },
  data() {
    return {
      tabRouterList,
      flag: false,
    };
  },

  created() {
  },
  methods: {
   
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
