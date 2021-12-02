<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:08:30
 * @LastEditors: YoHo
 * @LastEditTime: 2021-11-30 16:58:30
 * @Description: 
 * @FilePath: \front-web\src\views\project\components\projectHeader.vue
-->

<template>
  <div :class="`projectTop`">
    <iNavMvp v-if="navList" :lev="1" :list="navList" :lang="true" routerPage class="nav" />
    <div style="display:flex;align-items:center">
      <iNavMvp v-if="subMenu" :lev="2" :list="subMenu" :lang="true" routerPage class="nav-sub" />
      <switchPost />
    </div>
  </div>
</template>

<script>
import { iNavMvp, icon } from "rise"
import { TAB,SUBMENU } from "./data"
import { roleMixins } from '@/utils/roleMixins'
import switchPost from '@/components/switchPost'
export default {
  mixins:[roleMixins],
  components: {
    iNavMvp,
    icon,
    switchPost
  },
  props: {
    // navList: {type:Array, default: window._.cloneDeep(TAB)},
    subNavList: {type:Array, default: window._.cloneDeep(SUBMENU)},
    from: {type:Object, default:()=>({})}
  },
  data(){
    return{
      TAB
    }
  },
  computed: {
    navList(){
      let TAB = window._.cloneDeep(this.TAB)
      let path = this.from.path
      if(!path||path=='/'){
        if(this.userRole.isCSFAEKOFENPEI){ // AEKO 管理
          path = '/aeko/managelist'
        }else if(this.userRole.isZYCG){ // AEKO 表态
          path = '/aeko/stancelist'
        }else if(this.userRole.isZYCG){ // AEKO 审批
          path = '/aeko/approve'
        }else if(this.userRole.isZYCG){ // AEKO 查看
          path = '/aeko/checklist'
        }
      }
      TAB[0].url = path
      return TAB
    },
    isProgressConfirm() {
      return this.$route.path.includes('progressconfirmsummary') || this.$route.path.includes('proconfirm')
    },
    subMenu() {
      return this.subNavList
    },
    //eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
      permission: state => state.permission
    }),
  },
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