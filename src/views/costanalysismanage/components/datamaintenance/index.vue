<!--
 * @Author: your name
 * @Date: 2021-05-27 11:30:28
 * @LastEditTime: 2022-01-24 20:30:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\costanalysismanage\components\datamaintenance\index.vue
-->
<template>
  <iPage>
    <div class="headerNav">
      <headerNav type="costanalysismanage">
        <div class="right-control">
          <div class="control">
            <iUserLog :show.sync="changeLogDialog"
                      menuId="BDM-001"
                      isPage
                      class="margin-left20" />
            <span class="margin-left20"
                  @click="changeLog">
              <icon symbol
                    name="iconrizhiwuzi"
                    class="icon font24"
                    style="cursor: pointer;" />
              <span>{{ language("LK_RIZHI", '日志') }}</span>
            </span>
            <span class="margin-left20">
              <icon symbol
                    name="icondatabaseweixuanzhong"
                    class="font24"></icon>
            </span>
          </div>
        </div>
      </headerNav>
    </div>
    <router-view></router-view>
  </iPage>
</template>

<script>
import { iPage, iNavMvp, icon, iUserLog } from "rise";
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
    headerNav,
    iUserLog
  },
  data () {
    return {
      list: TAB,
      navList: cloneDeep(navList),
      changeLogDialog: false
    };
  },
  methods: {
    changeLog () {
      this.changeLogDialog = true
    }
  }
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
