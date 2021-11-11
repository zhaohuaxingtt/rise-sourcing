<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:08:30
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-11 17:30:33
 * @Description: 
 * @FilePath: \front-sourcing\src\views\project\components\projectHeader.vue
-->

<template>
  <div :class="`projectTop ${isProgressConfirm ? 'withAfter' : ''}`">
    <iNavMvp v-if="navList" :lev="1" :list="navList" :lang="true" routerPage class="nav" />
    <div style="display:flex;align-items:center">
      <iNavMvp v-if="subNavList" :lev="2" :list="subNavList" :lang="true" routerPage class="nav-sub" />
      <logButton class="margin-left20" @click="toLogPage" />
      <icon @click.native="gotoDBhistory" symbol name="icondatabaseweixuanzhong" class="log-icon margin-left10 cursor"></icon>
      <iLog :show.sync="showDialog" :bizId="bizId"></iLog>
    </div>
  </div>
</template>

<script>
import { iNavMvp, icon } from "rise"
import { TAB } from "./data"
import logButton from "@/components/logButton"
import iLog from '@/views/project/log'

export default {
  components: {
    iNavMvp,
    logButton,
    icon,
    iLog
  },
  data() {
    return {
      bizId: 'scheduleRecordId',
      showDialog: false,
      module: '零件排程'
    }
  },
  props: {
    // eslint-disable-next-line no-undef
    navList: {type:Array, default: _.cloneDeep(TAB)},
    subNavList: {type:Array}
  },
  computed: {
    isProgressConfirm() {
      return this.$route.path.includes('progressconfirmsummary') || this.$route.path.includes('proconfirm')
    }
  },
  methods: {
    // 跳转查看日志
    toLogPage() {
      this.showDialog = true
      // const router =  this.$router.resolve({path: `/log?recordId=${id}`})
      // window.open(router.href, '_blank')
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