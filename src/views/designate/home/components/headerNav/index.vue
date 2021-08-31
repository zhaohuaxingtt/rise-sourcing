<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
<div class="headerNav-wraper margin-bottom10">
  <div class="headerNav">
    <iNavMvp :list="navListLeft" lang @change="change" :lev="1" routerPage></iNavMvp>
    <!-- <div class="ext">
      <div class="pull-right">
        <a href="javascript:;" class="iconMenu">
          <icon symbol
            name="iconrizhi"
          ></icon>
        </a>
        <a href="javascript:;" class="iconDatabase">
          <icon symbol
            name="icondatabaseweixuanzhong"
          ></icon>
        </a>
      </div> -->
<!--       
    </div> -->
    <iNavMvp @change="change" lang class="pull-right" right routerPage lev="2" :list="navList" @message="clickMessage" />
  </div>
  <div class="headerNav-sub margin-top30">
    <iTabsList type="card" v-model="tab" @tab-click="handleTabClick">
      <el-tab-pane lazy v-for="(item,index) in heaederSubMenu" :key="index" :label="item.name" :name="item.key"></el-tab-pane>
    </iTabsList>
  </div>
</div>
</template>
<script>
import {MENU, heaederSubMenu} from './components/data'
import {
  iNavMvp,
  // icon,
  iTabsList
} from "rise";
import { clickMessage } from "@/views/partsign/home/components/data"

// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing")

export default {
  data() {
    return {
      heaederSubMenu,
      tab: ''
    }
  },
  components: {
    iNavMvp,
    // icon,
    iTabsList
  },
  created() {
    const heaederSubMenuItem = this.heaederSubMenu.find(o => o.path === this.$route.path)
    this.tab = heaederSubMenuItem ? heaederSubMenuItem.key : 'nomination'
    this.updateNavList
  },
  computed: {
    ...mapState(["navList","navListLeft"]),
    ...mapActions(["updateNavList"])
  },
  methods: {
    change() {

    },
    // tab切换
    handleTabClick(){
      const { query } =  this.$route;
      const path = this.heaederSubMenu.find(o => o.key === this.tab).path
      this.$router.push({
          path,
          query,
      });
    },
    // 通过待办数跳转
    clickMessage,
  }
}
</script>

<style lang="scss" scoped>
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