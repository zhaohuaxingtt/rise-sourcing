<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-11-05 12:03:00
 * @LastEditTime: 2021-11-09 10:40:11
 * @LastEditors:  
-->
<template>
    <iPage  class="partsignHome">
        <div class="topMenu">
            <iNavMvp class="margin-bottom30" :list="navListLeft" lang @change="change" :lev="1" routerPage></iNavMvp>
            <iNavMvp class="margin-bottom30" lang @change="change"  right routerPage lev="2" :list="navList" @message="clickMessage" />
        </div>
        <bidding/>
    </iPage>
</template>
<script>
import { iPage, iNavMvp } from "rise";
import bidding from "./bidding"
// import projectlist from "../../../node_modules/front-bidding/src/views/manage/bidding/projectlist/components/projectList.vue"
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing")
export default {
    components:{iPage, iNavMvp, bidding},
      computed: {
    ...mapState(["navList","navListLeft"]),
    ...mapActions(["updateNavList"])
  }
}
</script>

<style lang="scss" scoped>
.partsignHome {
  position: relative;
  .aotoTableHeight{
    ::v-deep .el-table__body-wrapper {
      min-height: 422px !important;  
      overflow: auto !important ;
    }
  }
  .topMenu{
    display: flex;
    justify-content: space-between;
  }
  
  .tab {
    ::v-deep .el-tabs__header {
      position: absolute;
      top: 20px;
      transform: translate(0, 5px);
      z-index: 1;

      .el-tabs__nav-wrap::after {
        background: transparent;
      }

      .el-tabs__active-bar {
        height: 3px;
        background: $color-blue;
        border-radius: 2px;
      }

      .el-tabs__item {
        font-size: 18px;
        color: #000000;
        opacity: 0.42;
        height: 35px;
        line-height: 35px;
        & + & {
          padding: 0 25px;
        }
      }
      .is-active {
        opacity: 1;
        font-weight: bold;
      }
    }
  }
  
}
</style>