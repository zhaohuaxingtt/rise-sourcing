<template>
<iPage>
  <div class="nomination-wraper">
    <div class="nomination-layout">
      <!-- 进度条,基本信息 -->
      <designateStep />
      <!-- 三级导航栏 -->
      <decisionDataHeader />
    </div>
    <div class="nomination-content">
      <router-view></router-view>
    </div>
  </div>
</iPage>
</template>
<script>
import {
  iPage
} from "rise";
import designateStep from './components/designateStep.vue'
import decisionDataHeader from './components/decisionDataHeader'

export default {
  components: {
    designateStep,
    decisionDataHeader,
    iPage
  }
}
</script>