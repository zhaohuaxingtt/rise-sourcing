<template>
  <div class="margin-bottom25" style="display: flex;justify-content: space-between;align-items: center">
    <span class="akeoTitle">Aeko号:{{ transmitObj.aekoApprovalDetails.aekoNum }}</span>
    <div style="display: flex;justify-content: space-between;align-items: center">
      <iNavMvp :lev="2" :list="subNavList" :lang="true" routerPage class="nav-sub" :query="queryParams"/>
      <i-button v-if="$route.name !== 'explainattach'" v-permission.auto="AEKO_APPROVAL_DETAILS_PAGE_BTN_VIEW_APPROVED|查看已审批" @click="goViewApproved"  class="margin-left25">{{language('LK_CHAKANYISHENPI','查看已审批')}}</i-button>
      <i-button v-if="$route.name !== 'explainattach'" @click="lookAEKODetails"  v-permission.auto="AEKO_APPROVAL_DETAILS_PAGE_BTN_AEKO_DETAILS|AEKO详情"   class="margin-left25">{{language('LK_AEKO详情','AEKO详情')}}</i-button>
      <log-button v-if="$route.name !== 'explainattach'" v-permission.auto="AEKO_APPROVAL_DETAILS_PAGE_BTN_LOG|日志" @click="gotoLog" class="margin-left25"/>
      <icon @click.native="gotoDBhistory" symbol name="icondatabaseweixuanzhong"
            class="log-icon margin-left20 cursor myLogIcon"></icon>
    </div>
  </div>
</template>

<script>
import {iNavMvp, icon, iButton} from "rise"
import LogButton from "./LogButton";

export default {
  name: "ApprovalDetailsComponents",
  components: {
    LogButton,
    iNavMvp,
    icon,
    iButton
  },
  created() {
    this.queryParams = this.$route.query
    let str_json = window.atob(this.queryParams.transmitObj)
    this.transmitObj = JSON.parse(decodeURIComponent(escape(str_json)))
  },
  data() {
    return {
      transmitObj: {},
      queryParams: {},
      subNavList: [
        {
          value: 1,
          name: "审批单",
          message: 0,
          url: "/aeko/AEKOApprovalDetails/Approvalform",
          activePath: "Approvalform",
          key: "审批单",
        },
        {
          value: 2,
          name: "CBD汇总",
          message: 0,
          url: "/aeko/AEKOApprovalDetails/CBDSummary",
          activePath: "CBDSummary",
          key: "CBD汇总",
        },
        {
          value: 3,
          name: "审批附件",
          message: 0,
          url: "/aeko/AEKOApprovalDetails/explainattach",
          activePath: "explainattach",
          key: "审批附件",
        },
      ],
    }
  },
  methods: {
    //查看AEKO详情
    lookAEKODetails(){
      let routeData = this.$router.resolve({
        path: `/aeko/describe`,
        query: {
          requirementAekoId: this.transmitObj.aekoApprovalDetails.requirementAekoId,
          aekoCode: this.transmitObj.aekoApprovalDetails.aekoNum,
          from:'approve'
        },
      })
      window.open(routeData.href, '_blank')
    },
    //查看已审批
    goViewApproved(){
      let routeData = this.$router.resolve({
        path: `/aeko/AEKOApprovalDetails/RecommendationTable`,
        query: this.$route.query
      })
      window.open(routeData.href, '_blank')
    },
    // 跳转日志
    gotoLog(){
      this.$router.push({
        path: '/aeko/log',
        query: {}
      })
    },
    gotoDBhistory() {
    }
  }
}
</script>

<style scoped lang="scss">
.akeoTitle {
  font-size: 20px;
  font-family: Arial;
  font-weight: bold;
  align-items: center;
  color: #000000;

}

.myLogIcon {
  width: 21px;
  height: 21px;
}

.margin-left25 {
  margin-left: 25px !important;
}
</style>