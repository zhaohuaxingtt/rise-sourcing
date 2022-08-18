<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:08:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-18 13:51:18
 * @Description: 
 * @FilePath: \front-sourcing\src\views\project\components\projectHeader.vue
-->

<template>
  <div :class="`projectTop ${isProgressConfirm ? 'withAfter' : ''}`">
    <iNavMvp v-if="navList" :lev="1" :list="navList" :lang="true" @change="dsadasdad" routerPage class="nav" />
    <div style="display:flex;align-items:center" class="right-control">
      <iNavMvp v-if="subNavList && $route.path !== '/projectmgt/projectoverview'"  :lev="2" :list="subNavList" :lang="true" routerPage class="nav-sub" />
      <div class="control">
        <iLoger ref="log" :config="{ bizId_obj_ae: bizId}" isPage  :isUser="true" class="margin-left20 margin-right10" />
        <!-- <logButton class="margin-left20" @click="toLogPage" /> -->
        <!-- <icon @click.native="gotoDBhistory" symbol name="icondatabaseweixuanzhong" class="log-icon margin-left10 cursor"></icon> -->
      </div>
      <!-- <iLog :show.sync="showDialog" :bizId="bizId"></iLog> -->
    </div>
  </div>
</template>

<script>
import { iNavMvp, icon } from "rise"
import { TAB,navList } from "./data"
import logButton from "@/components/logButton"
import iLog from '@/views/project/log'
import iLoger from 'rise/web/components/iLoger'

export default {
  components: {
    iNavMvp,
    logButton,
    icon,
    iLog,
    iLoger
  },
  data() {
    return {
      // bizId: 'scheduleRecordId',
      showDialog: false,
      module: '零件排程'
    }
  },
  props: {
    // eslint-disable-next-line no-undef
    navList: {type:Array, default: _.cloneDeep(TAB)},
    subNavList: {type:Array,default: _.cloneDeep(navList)}
  },
  computed: {
    isProgressConfirm() {
      return this.$route.path.includes('progressconfirmsummary') || this.$route.path.includes('proconfirm')
    },
    bizId() {
      return this.$route.path.includes('projectprogressmonitoring') ? 'progressMonitorId' : 'scheduleRecordId'
    }
  },
  methods: {
    dsadasdad(val){
      console.log(val);
    },
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
  .right-control {
    width: 60%;
    // flex-wrap: wrap;
    justify-content: flex-end;
    .control {
      flex-shrink: 0;
      // width: 150px;
    }
  }
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