<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
<div class="headerNav-wraper margin-bottom10">
  <div class="headerNav">
    <iNavMvp lang :lev="1" :list="list" routerPage></iNavMvp>
    <iNavMvp lang class="pull-right" right routerPage lev="2" :list="menu" />
  </div>
</div>
</template>
<script>
import {TAB, MENU} from '../data'
import {
  iNavMvp,
  // icon,
  
} from "rise";


export default {
  data() {
    return {
      list: TAB,
      menu: MENU,
      tab: ''
    }
  },
  components: {
    iNavMvp,
  },
  created() {
  },
  methods: {
    // tab切换
    handleTabClick(){
      const { query } =  this.$route;
      const path = this.heaederSubMenu.find(o => o.key === this.tab).path
      this.$router.push({
          path,
          query,
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.headerNav {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.headerNav-sub {
  ::v-deep.el-tabs {
    .el-tabs__header {
      margin-bottom: 0px;
    }
  }
}
.pull-right{
  float: right;
}
</style>