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
      <headerNav type="costanalysismanage">
        <div class="right-control">
          <div class="control">
            <iLoger
            :config="{
              module_obj_ae: '数据维护', 
              menuName_obj_ae: ''
            }"
            isPage
            credentials
            class="margin-left20" />
            <span class="margin-left20">
              <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
            </span>
          </div>
        </div>
      </headerNav>
    </div>
    <router-view></router-view>
  </iPage>
</template>

<script>
import { iPage, iNavMvp, icon } from "rise";
import headerNav from "@/components/headerNav"
import { navList } from "./components/data";
import { cloneDeep } from "lodash";
import iLoger from 'rise/web/components/iLoger'
import { TAB } from '@/views/financialTargetPrice/components/data'

export default {
  components: {
    iNavMvp,
    iPage,
    icon,
    iLoger,
    headerNav
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ::v-deep .headerNav-wraper {
    width: 100%;
  }
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
