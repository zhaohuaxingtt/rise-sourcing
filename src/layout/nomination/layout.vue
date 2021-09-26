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
    <div class="nomination-content" v-loading="loading">
      <router-view></router-view>
    </div>
  </div>
</iPage>
</template>
<script>
import {
  iPage,
  iMessage
} from "rise";
import designateStep from './components/designateStep.vue'
import decisionDataHeader from './components/decisionDataHeader'
import { applyStep } from './components/data'
import { nominateAppSDetail } from '@/api/designate'

export default {
  components: {
    designateStep,
    decisionDataHeader,
    iPage
  },
  data(){
    return{
      loading: false,
      isPreview:'0'
    }
  },
  created(){
    const {query} = this.$route;
    const {isPreview = '0'} = query;
    this.isPreview = isPreview;
    this.$store.dispatch('setPreviewState', isPreview)
    this.nominateAppSDetail()
    // 缓存当前步骤
    this.getStepStatus();
  },
  methods: {
    // 获取步骤状态
    async getStepStatus(){
      const nominateId = this.$route.query.desinateId || this.$store.getters.nomiAppId
      // 临时跳转，将不调接口更新当前步骤
      if (this.$route.query.route !== 'temp') {
        await this.$store.dispatch('setNominationStep',{nominateId})
      }
      // 检查是否带强制路由参数，force表示不做step检测跳转
      if (this.$route.query.route === 'force') return
      this.$nextTick(() => {
        let phaseType = this.$store.getters.phaseType
        // 已经到决策资料阶段，默认phaseType=5
        phaseType = phaseType >= 5 ? 5 : phaseType
        let item = applyStep.find(o => o.id === phaseType )
        const {query, path} = this.$route;
        // 在决策资料前的步骤，支持正确的step跳转
        if (path.indexOf('/designate/decisiondata') === -1) {
          this.$router.push({
            path:item.path,
            query: {
                ...query,
            }
          })
        }
        
      })
    },
    nominateAppSDetail() {
      this.loading = true
      if(this.$route.query.desinateId){
        nominateAppSDetail({
          nominateAppId: this.$route.query.desinateId
        })
        .then(res => {
          if (res.code == 200) {
            console.log(this.setDisabled(res.data || {}))
            this.$store.dispatch('setNominationDisabled', this.setDisabled(res.data || {}))
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
        })
        .finally(() => this.loading = false)
      }
    },
    setDisabled(data) {
      const isPriceConsistent = data.isPriceConsistent // 一次性校验
      const applicationStatus = data.applicationStatus // 定点申请状态
      if (!applicationStatus) return true

      switch(this.$route.query.designateType) {
        case "MEETING": // 上会
          const disabledCodes = ["FREERE", "M_CHECK_INPROCESS", "M_CHECK_FAIL", "NOMINATE"] // 冻结, M审批中, M退回, 定点
          if (isPriceConsistent) return disabledCodes.concat(["PASS", "CHECK_INPROCESS", "CHECK_PASS", "CHECK_FAIL"]).includes(applicationStatus) // 通过一致性校验 已通过, 复核中, 复核通过, 复核未通过

          return disabledCodes.includes(applicationStatus)
        case "TRANFORM": // 流转
          return ["FREERE", "ONFLOW", "FINISHFLOW", "NOMINATE"].includes(applicationStatus) // 冻结, 流转中, 流转完成, 定点
        case "RECORD": // 备案
          return ["FREERE", "NOMINATE"].includes(applicationStatus) // 冻结, 定点
        default:
          return true
      }
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