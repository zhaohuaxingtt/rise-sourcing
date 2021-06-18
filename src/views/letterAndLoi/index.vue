<!--
 * @Author: wentliao
 * @Date: 2021-06-18 10:22:21
 * @Description: 定点信/LOI 列表页
-->
<template>
  <iPage class="letterAndLoi">
    <el-tabs v-model="tab" class="tab">
      <el-tab-pane label="概览" name="overview"></el-tab-pane>
      <el-tab-pane :label="$t('LK_XUNYUANZHIHANG')" name="source">
        <div class="margin-bottom33">
            <iNavMvp right routerPage lev="2" :list="navList" @message="clickMessage" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="报表管理" name="report"></el-tab-pane>
    </el-tabs>
    <!-- 类型TAB -->
    <iTabsList type="card" v-model="cardType">
      <template v-for="(item,index) in tabData">
        <el-tab-pane  :key="'tabData_'+index" :label="$t(item.label)" :name="item.key"></el-tab-pane>
      </template>
    </iTabsList>

    <letterList v-if="cardType=='letter'"/>
    <loiList v-if="cardType=='LOI'"/>
  </iPage>
</template>

<script>
import {
  iPage,
  iNavMvp,
  iTabsList,
} from 'rise';
import { clickMessage } from "@/views/partsign/home/components/data"
import { letterAndLoiType } from './data';
import letterList from './letter/list';
import loiList from './loi/list';


// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing")


export default {
    name:'letterAndLoi',
    components:{
      letterList,
      loiList,
      iPage,
      iNavMvp,
      iTabsList,
    },
    computed: {
      ...mapState(["navList"]),
      ...mapActions(["updateNavList"])
    },
    data(){
      return{
        tab:'source',
        tabType:'letter',
        cardType:'letter',
        tabData:letterAndLoiType,
      }
    },
    created(){
      console.log(this);
      this.updateNavList
    },
    methods:{
      // 通过待办数跳转
      clickMessage,
    }
}
</script>

<style lang="scss" scoped>
  .letterAndLoi {
  position: relative;

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