<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:08:30
 * @LastEditors: YoHo
 * @LastEditTime: 2022-01-21 17:35:28
 * @Description: 
 * @FilePath: \front-web\src\views\project\components\projectHeader.vue
-->

<template>
  <div :class="`projectTop`">
    <iNavMvp v-if="navList" :lev="1" :list="navList" :lang="true" routerPage class="nav" />
    <div style="display:flex;align-items:center">
      <iNavMvp v-if="subNavList" :lev="2" :list="subNavList" :lang="true" routerPage class="nav-sub" />
      <switchPost />
      <iLoger :config="{module_obj_ae: 'AEKO管理', menuName_obj_ae: 'AEKO管理-AEKO分配', queryParams:[]}" isPage :isUser="true" class="margin-left25" />
      <icon @click.native="gotoDBhistory" symbol name="icondatabaseweixuanzhong" class="log-icon margin-left10 cursor"></icon>
    </div>
  </div>
</template>

<script>
import { iNavMvp, icon } from "rise"
import switchPost from '@/components/switchPost'
// import iLoger from '@/components/iLoger'
import iLoger from 'rise/web/components/iLoger'
import { getLeftTab,TAB as SUBMENU } from '@/views/aeko/data'

export default {
  components: {
    iNavMvp,
    icon,
    switchPost,
    iLoger
  },
  props: {
    navList: {type:Array, 
    // default: window._.cloneDeep(TAB)
    default:()=>getLeftTab(0)
    },
    subNavList: {type:Array, default: window._.cloneDeep(SUBMENU)},
  },
  data() {
    return {
    }
  },
  methods: {
    gotoDBhistory() {
      const router =  this.$router.resolve({path: `/projectmgt/projectscheassistant/historyprocessdb`})
      window.open(router.href,'_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.projectTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 27px;
  position: relative;
  border-bottom: 1px solid #E3E3E3;
  padding-bottom: 5px;
  &.withAfter::after {
    content: '';
    width: 100%;
    height: 1px;
    display: block;
    background: rgba(197, 206, 229, 0.5);
    position: absolute;
    left: 0px;
    bottom: -0.5rem;
  }
  .log-icon {
    font-size: 20px;
  }
}
</style>