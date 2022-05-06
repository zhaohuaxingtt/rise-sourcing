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
      <designateStep v-if="isPreview=='0'" :showDecision="showDecision" @updateNomi="updateNomi" />
      <!-- 三级导航栏 -->
      <decisionDataHeader :isPreview="isPreview" v-if="!$route.meta.hideTabLV3 && showDecision" />
    </div>
    <div v-if="!showDecisionLoading" class="nomination-content" v-loading="loading">
      <router-view v-if="$route.meta.hideTabLV3 ? true : showDecision"></router-view>
      <div v-else class="tip">{{ this.language('LK_DUIBUQIMEIYOUQUANXIAN2', '对不起，您没有查看权限')}}</div>
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
import { nominateAppSDetail, getNomiPosition } from '@/api/designate'
import { getNominateDisabled } from "rise/web/common"

export default {
  components: {
    designateStep,
    decisionDataHeader,
    iPage
  },
  beforeRouteEnter(to, from, next) {
    // 定点管理预览跳转逻辑
    if (!(from.meta.layoutPath && !to.meta.layoutPath && to.meta.path)) {
      next()
    }
  },
  data(){
    return{
      loading: false,
      isPreview:'0',
      showDecisionLoading: false,
      showDecision: false, // 是否显示决策资料
    }
  },
  created(){
    const {query} = this.$route;
    const {isPreview = '0'} = query;
    this.isPreview = isPreview;
    this.$store.dispatch('setPreviewState', isPreview)
    this.nominateAppSDetail()
    if (this.$route.query.sd == 1) {
      this.getNomiPosition()
    } else {
      this.showDecision = true
          // 缓存当前步骤
      this.getStepStatus(); //只有当前组件被渲染过后，再通过异步修改的数据才会触发内部watch 这里不能放在showDecision=true之前
    }
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
            this.$store.dispatch('setNominationDisabled', getNominateDisabled({ ...res.data, designateType: this.$route.query.designateType } || {}))
            this.$store.dispatch('setRsDisabled', res.data.rsStatus === "FROZEN")
            this.$store.dispatch('setApplicationStatus', res.data.applicationStatus)
            this.$store.dispatch('setNominationType', res.data.nominateProcessType)
            this.$store.dispatch('setMtzAppid',res.data.mtzApplyId)
            this.$store.dispatch('setNominateData',res.data || {})

            const query = this.$router.history.current.query
            const path = this.$router.history.current.path
            const newQuery = JSON.parse(JSON.stringify(query))
            newQuery.designateType = res.data.nominateProcessType
            this.$router.replace({path, query: newQuery})
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
        })
        .finally(() => this.loading = false)
      } else{
        this.loading = false
      }
    },
    updateNomi() {
      this.nominateAppSDetail()
      this.getStepStatus()
    },
    getNomiPosition() {
      this.showDecisionLoading = true

      getNomiPosition({
        nomiId: this.$route.query.desinateId || this.$store.getters.nomiAppId
      })
      .then(res => {
        if (res.code == 200) {
          this.showDecision = res.data
          // 缓存当前步骤
          this.getStepStatus();
        }
      })
      .finally(() => {
        this.showDecisionLoading = false
      })
    }
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

  .tip {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    color: rgb(151, 166, 196);
    line-height: calc(100vh - 360px);
  }
}

  ::v-deep .pdf-item{
    width: 100%;
    height: 0;
    overflow: hidden;
    .rsPdfCard{
      box-shadow: none;
      & + .rsCard {
        margin-top: 20px; /*no*/
      }
      .cardHeader{
        padding: 30px 0px;
      }
      .cardBody{
        padding: 0px;
      }
    }
  }
  ::v-deep .pageCard-main{
    overflow: hidden;
    margin-top: 20px;
  }
</style>