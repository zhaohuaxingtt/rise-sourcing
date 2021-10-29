<!--
 * @Author: your name
 * @Date: 2021-07-26 16:45:48
 * @LastEditTime: 2021-10-29 09:52:29
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aeko\detail\index.vue
-->
<template>
  <iPage class="aekodetail">
    <div class="header flex-between-center margin-bottom20">
      <h2>AEKO号：{{ aekoInfo.aekoCode }}</h2>
      <div>
        <iButton v-if="pending" @click="goToApprovalform">{{language('SHENPIDANYUANLIAN','审批单预览')}}</iButton>
        <iButton @click="goToDetail">{{language('LK_AEKO_BUTTON_DETAIL','AEKO详情')}}</iButton>
        <logButton class="margin-left20" />
      </div>
    </div>
    <page-content ref="pageContent" @setAekoInfo="setAekoInfo"></page-content>
  </iPage>
</template>

<script>
import { 
  iPage, 
  iButton,
 } from "rise"
import logButton from "@/components/logButton"
import pageContent from "./components"

export default {
  components: { 
    iPage, 
    iButton,
    logButton,
    pageContent,
  },
  created() {
    this.aekoInfo = {
      requirementAekoId: this.$route.query.requirementAekoId
    }
  },
  data() {
    return {
      aekoInfo: {},
      pending:false
    }
  },
  methods: {
    // 修改aekoInfo
    setAekoInfo(val){
      this.$set(this,'aekoInfo',val)
    },

    // 跳转到描述页
    goToDetail(){
       const { aekoInfo } = this;
       const {requirementAekoId,aekoCode} = aekoInfo;
        const routeData = this.$router.resolve({
          path: '/aeko/describe',
          query: {
            requirementAekoId,
            aekoCode,
          },
        })
        window.open(routeData.href, '_blank')
    },
    // 跳转到审批单预览
    goToApprovalform(){
       const { aekoInfo } = this;
       console.log(aekoInfo);
       let transmitObj = {
            option: 4,
            aekoApprovalDetails: {
              aekoNum: aekoInfo.aekoCode,
              requirementAekoId: aekoInfo.requirementAekoId,
              aekoManageId: aekoInfo.aekoManageId,
              // aekoAuditType: aekoInfo.auditType||'',
              // workFlowDTOS: aekoInfo.data||''
            }
       }
      let routeData = this.$router.resolve({
        path: `/aeko/AEKOApprovalDetails`,
        query: {
          from:'aekodetail',
          requirementAekoId: aekoInfo.requirementAekoId,
          aekoManageId: aekoInfo.aekoManageId,
          linieId: this.$store.state.permission.userInfo.id,
          taskId: '1',
          transmitObj: window.btoa(unescape(encodeURIComponent(JSON.stringify(transmitObj))))
        }
      })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.aekodetail {
  .basic-form{
    ::v-deep.el-form-item__content {
      margin-left: 0!important;
    }
  }
  .aekodetail-tabs {
    ::v-deep.el-tabs__item {
      position: relative;
      .icon-alarm {
        display: block;
        position: absolute;
        right: 1px;
        top: 1px;
      }
    }
  }
}
</style>