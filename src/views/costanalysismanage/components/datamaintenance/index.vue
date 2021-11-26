<!--
 * @Author: your name
 * @Date: 2021-05-27 11:30:28
 * @LastEditTime: 2021-11-25 16:37:33
 * @LastEditors: Luoshuang
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\costanalysismanage\components\datamaintenance\index.vue
-->
<template>
  <iPage>
    <div class="headerNav">
      <iNavMvp :lev="1" :list="list" :lang="true" routerPage class="nav" />
      <div class="right-control">
        <iNavMvp class="pull-right" :lang="true" right routerPage lev="2" :list="navList" />
        <div class="control">
          <logButton class="margin-left20" />
          <span class="margin-left20">
            <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
          </span>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </iPage>
</template>

<script>
import { iPage, iNavMvp, icon } from "rise";
import { navList } from "./components/data";
import { cloneDeep } from "lodash";
import logButton from "@/components/logButton"
import { TAB } from '@/views/financialTargetPrice/components/data'

export default {
  components: {
    iNavMvp,
    iPage,
    icon,
    logButton
  },
  data() {
    return {
      list: TAB,
      navList: cloneDeep(navList),
    };
  },
};
</script>

<style lang="scss" scoped>
.headerNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  .nav div {
    margin-left: 0;
  }
  .right-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .control {
    // position: absolute;
    // top: 30px;
    // right: 50px;
    display: flex;
    align-items: center;
    height: 30px;
  }
}
</style>
