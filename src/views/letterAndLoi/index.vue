<!--
 * @Author: wentliao
 * @Date: 2021-06-18 10:22:21
 * @Description: 定点信/LOI 列表页
-->
<template>
  <iPage class="letterAndLoi">
    <div class="headerNav">
    <iNavMvp :list="navListLeft" lang @change="change" :lev="1" routerPage></iNavMvp>
    <iNavMvp @change="change" lang class="pull-right" right routerPage lev="2" :list="navList" @message="clickMessage" />
  </div>
    <!-- 类型TAB -->
    <div class="headerNav-sub margin-top30">
      <iTabsList type="card" v-model="cardType">
      <template v-for="(item,index) in tabData">
        <el-tab-pane lazy  :key="'tabData_'+index" :label="language(item.label,item.name)" :name="item.key"></el-tab-pane>
      </template>
      </iTabsList>
    </div>

    <letterList  class="margin-top30" v-if="cardType=='letter'"/>
    <loiList  class="margin-top30" v-if="cardType=='LOI'"/>
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
      ...mapState(["navList","navListLeft"]),
      ...mapActions(["updateNavList"])
    },
    data(){
      return{
        tab:'source',
        cardType:this.$route.query.cardType || 'letter',
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
  .headerNav-sub {
  ::v-deep.el-tabs {
    .el-tabs__header {
      margin-bottom: 0px;
    }
  }
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
  .headerNav {
  display: flex;
  justify-content: space-between;
  position: relative;
  &:after {
    content: '';
    width: 100%;
    height: 1px;
    display: block;
    background: rgba(197, 206, 229, 0.5);
    position: absolute;
    left: 0px;
    bottom: -0.5rem;
  }
  .ext {
    ul {
      display: inline-block;
      vertical-align: middle;
      li {
        position: relative;
        display: inline-block;
        padding: 0 17px;
        line-height: 25px;
        &:after {
          display: inline-block;
          content: '';
          width: 1px;
          height: 16px;
          background: #000000;
          opacity: 0.42;
          position: absolute;
          right: 0px;
          top: 50%;
          margin-top: -8px
        }
        &:last-child {
          padding-right: 0px;
          &:after {
            display: none;
          }
        }
        a {
          font-size: 18px;
          color: #000000;
          opacity: 0.42;
        }
      }
    }
    .iconMenu {
      display: inline-block;
      vertical-align: middle;
      padding: 0px 5px;
      // height: 21px;
      // overflow: hidden;
      svg {
        width: 80px;
        font-size: 16px;
        font-size: 1.175rem;
        vertical-align: middle;
      }
    }
    .iconDatabase {
      display: inline-block;
      vertical-align: middle;
      color: #f8f9fa !important;
      // height: 21px;
      // overflow: hidden;
      svg {
        width: 20px;
        font-size: 20px;
        font-size: 1.4rem;
        vertical-align: middle;
        color: #f8f9fa !important;
      }
    }
  }
}
}
</style>