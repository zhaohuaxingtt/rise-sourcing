<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:08:30
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-10-13 15:34:52
 * @Description: 
 * @FilePath: \front-web\src\views\project\components\projectHeader.vue
-->

<template>
  <div :class="`projectTop`">
    <iNavMvp v-if="navList" :lev="1" :list="navList" :lang="true" routerPage class="nav" />
    <div style="display:flex;align-items:center">
      <iNavMvp v-if="subMenu" :lev="2" :list="subMenu" :lang="true" routerPage class="nav-sub" />
      <icon @click.native="gotoDBhistory" symbol name="icondatabaseweixuanzhong" class="log-icon margin-left10 cursor"></icon>
    </div>
  </div>
</template>

<script>
import { iNavMvp, icon } from "rise"
import { TAB,SUBMENU,ATTACHSUBMENU } from "./data"
export default {
  components: {
    iNavMvp,
    icon,
  },
  props: {
    navList: {type:Array, default: window._.cloneDeep(TAB)},
    subNavList: {type:Array, default: window._.cloneDeep(SUBMENU)},
  },

  computed: {
    isProgressConfirm() {
      return this.$route.path.includes('progressconfirmsummary') || this.$route.path.includes('proconfirm')
    },
    subMenu() {
      return this.$route.meta.subMenuType === 2 ? ATTACHSUBMENU : this.subNavList
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
  margin-bottom: 20px;
  position: relative;
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