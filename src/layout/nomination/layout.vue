<!--
 * @Author: wentliao
 * @Date: 2021-05-21 16:44:09
 * @Description: 
-->
<template>
<iPage>
  <div class="nomination-wraper" :class="{isPreview: isPreview === '1'}">
    <div class="nomination-layout">
      <!-- 进度条,基本信息 -->
      <designateStep v-if="isPreview=='0'"/>
      <!-- 三级导航栏 -->
      <decisionDataHeader :isPreview="isPreview" v-if="!$route.meta.hideTabLV3" />
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
import { applyStep } from './components/data'

export default {
  components: {
    designateStep,
    decisionDataHeader,
    iPage
  },
  data(){
    return{
      isPreview:'0'
    }
  },
  created(){
    const {query} = this.$route;
    const {isPreview = '0'} = query;
    this.isPreview = isPreview;
    // 缓存当前步骤
    this.getStepStatus();
  },
  methods: {
    // 获取步骤状态
    async getStepStatus(){
      const nominateId = this.$store.getters.nomiAppId || this.$route.query.desinateId
      await this.$store.dispatch('setNominationStep',{nominateId})
      this.$nextTick(() => {
        const phaseType = this.$store.getters.phaseType
        let item = applyStep.find(o => o.id === phaseType )
        const {query} = this.$route;
        this.$router.push({
            path:item.path,
            query: {
                ...query,
            }
        })
      })
    },
  },
  watch:{$route(to,from){
    console.log(to,from)
    const {query={}} = to;
    const {isPreview = '0', nominateId} = query;
    this.isPreview = isPreview;
    // 缓存/更新预览状态
    this.$store.dispatch('setPreviewState', isPreview)
    // 缓存当前步骤
    this.getStepStatus();
  }}
}
</script>
<style lang="scss" scoped>
.nomination-wraper {
  &.isPreview {
    box-shadow: 0 0 1.25rem rgb(27 29 33 / 8%);
    border-radius: 0.375rem;
    background: #fff;
    .nomination-content {
      ::v-deep.card {
        box-shadow: none !important;
      }
    }
  }
}
</style>