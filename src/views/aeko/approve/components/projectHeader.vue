<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:08:30
 * @LastEditors: YoHo
 * @LastEditTime: 2021-11-08 13:07:30
 * @Description: 
 * @FilePath: \front-web\src\views\project\components\projectHeader.vue
-->

<template>
  <div :class="`projectTop`">
    <iNavMvp v-if="navList" :lev="1" :list="navList" :lang="true" routerPage class="nav" />
    <div style="display:flex;align-items:center">
      <iNavMvp v-if="subMenu" :lev="2" :list="subMenu" :lang="true" routerPage class="nav-sub" />
      <log-button v-if="$route.name !== 'explainattach'" v-permission.auto="AEKO_APPROVAL_DETAILS_PAGE_BTN_LOG|日志" @click="openLog" class="margin-left25"/>
      <icon @click.native="gotoDBhistory" symbol name="icondatabaseweixuanzhong" class="log-icon margin-left10 cursor"></icon>
      <iLog :show.sync="showDialog" :bizId="bizId" :module="module"></iLog>
    </div>
  </div>
</template>

<script>
import { iNavMvp, icon } from "rise"
import { TAB,SUBMENU,ATTACHSUBMENU } from "./data"
import iLog from "../../log";
import logButton from "../../../../components/logButton";
export default {
  components: {
    iNavMvp,
    icon,
    logButton,
    iLog
  },
  props: {
    navList: {type:Array, default: window._.cloneDeep(TAB)},
    subNavList: {type:Array, default: window._.cloneDeep(SUBMENU)},
  },
  data() {
    return {
      showDialog: false,
      bizId: '',
      module: 'AEKO审批'
    }
  },
  computed: {
    isProgressConfirm() {
      return this.$route.path.includes('progressconfirmsummary') || this.$route.path.includes('proconfirm')
    },
    subMenu() {
      return this.$route.meta.subMenuType === 2 ? ATTACHSUBMENU : this.subNavList
    },
    //eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
      permission: state => state.permission,
      count: state => state.aekoApproveStore.count
    }),
  },
  watch: {
    count(val){
      this.subMenu.forEach(item=>{
        if(item.name=='AEKO审批'){
          item.message = val
        }
      })
    }
  },
  methods: {
    // 打开跳转
    openLog(){
      this.bizId = ''
      this.showDialog = true
    },
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