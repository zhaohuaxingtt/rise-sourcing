<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:08:30
 * @LastEditors: YoHo
 * @LastEditTime: 2021-11-04 17:28:37
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
import { getLogCount } from '@/api/aeko/manage'
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
    },
    //eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
      permission: state => state.permission
    }),
  },
  created(){
    this.getLogCount();
  },
  methods: {
    // 查询待办数量
    getLogCount(){
      let params = {
        pageCode:'SPR',  // LINIE: AEKO表态; ADMIN: AEKO管理; SPR: AEKO审批
        id: this.userInfo.id
      }
      getLogCount(params).then(res=>{
        if(res?.code==200){
          this.subMenu.forEach(item=>{
            if(item.name=='AEKO审批'){
              item.message = res.data
            }
          })
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
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