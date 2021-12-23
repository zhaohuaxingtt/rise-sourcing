<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
<div class="headerNav-wraper margin-bottom10">
  <div class="headerNav">
    <iNavMvp :list="navListLeft" lang @change="change" :lev="1" routerPage ></iNavMvp>
    <iNavMvp @change="change" lang class="pull-right" right routerPage lev="2" reversePosit :list="headerSubMenu" @message="clickMessage" />
  </div>
  <div class="headerNav-sub margin-top30">
    <!-- <iTabsList type="card" v-model="tab" @tab-click="handleTabClick">
      <el-tab-pane v-for="(item,index) in headerSubMenuWithPermission" :key="index" :label="item.name" :name="item.key" v-permission.dynamic.auto="item.permissionKey"></el-tab-pane>
    </iTabsList> -->
  </div>
</div>
</template>
<script>
import {MENU, headerSubMenu} from './components/data'
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
      headerSubMenu,
      tab: ''
    }
  },
  components: {
    iNavMvp,
    // icon,
    iTabsList
  },
  created() {
    const headerSubMenuItem = this.headerSubMenu.find(o => o.path === this.$route.path)
    this.tab = headerSubMenuItem ? headerSubMenuItem.key : 'nomination'
    this.updateNavList
  },
  computed: {
    ...mapState(["navList","navListLeft"]),
    ...mapActions(["updateNavList"]),
    headerSubMenuWithPermission() {
      // return process.env.NODE_ENV == 'dev' ? this.headerSubMenu.filter(item => this.$store.state.permission.whiteBtnList[item.permissionKey.split('|')[0]]) : this.headerSubMenu
      // return this.headerSubMenu.filter(item => this.$store.state.permission.whiteBtnList[item.permissionKey.split('|')[0]])
      return this.headerSubMenu
    }
  },
  methods: {
    change() {

    },
    // tab切换
    handleTabClick(){
      const { query } =  this.$route;
      const path = this.headerSubMenu.find(o => o.key === this.tab).path
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