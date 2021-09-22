<template>
  <div>
    <div class="navBox">
      <iNavMvp :list="tabRouterList" class="margin-bottom20" routerPage :lev="1"/>
      <div class="rightNav" v-if="!isShowKpiMenu">
        <iNavMvp
            :list="categoryManagementAssistantList"
            :lev='2'
            right
            routerPage
            class="margin-right20"
        />
        <slot name="extralButton" ></slot>
      </div>
      <div class="rightNav" v-if="isShowKpiMenu">
        <iNavMvp
            :list="categoryManagementAssistantList"
            :lev='2'
            right
            routerPage
            class="margin-right20"
        />
        <slot name="extralButton" ></slot>
      </div>
      <logButton class="logButton"/>
    </div>
  </div>
</template>

<script>
import {iNavMvp } from 'rise'
import { tabRouterList, categoryManagementAssistantList } from './navData'
import logButton from '@/components/logButton'

export default {
  components: {
    iNavMvp,
    logButton
  },
  data () {
    return {
      tabRouterList,
      categoryManagementAssistantList,
      isShowKpiMenu:true
    }
  }
}
</script>

<style scoped lang="scss">
.navBox {
  position: relative;

  .rightNav {
    display: flex;
    position: absolute;
    top: 0;
    right: 110px;
  }

  .logButton {
    position: absolute;
    top: 5px;
    right: 0;
  }
}
</style>

