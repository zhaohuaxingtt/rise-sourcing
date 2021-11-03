<template>
  <div class="margin-bottom25" style="display: flex;justify-content: space-between;align-items: center">
    <span class="akeoTitle">Aeko号:{{ transmitObj.aekoApprovalDetails.aekoNum }}</span>
    <div style="display: flex;justify-content: space-between;align-items: center">
      <iNavMvp :lev="2" :list="subNavList" :lang="true" routerPage class="nav-sub" :query="queryParams"/>
      <i-button v-if="$route.name !== 'explainattach'&& !disabled" v-permission.auto="AEKO_APPROVAL_DETAILS_PAGE_BTN_VIEW_APPROVED|查看已审批" @click="goViewApproved"  class="margin-left25">{{language('LK_CHAKANYISHENPI','查看已审批')}}</i-button>
      <i-button v-if="$route.name !== 'explainattach'" @click="lookAEKODetails"  v-permission.auto="AEKO_APPROVAL_DETAILS_PAGE_BTN_AEKO_DETAILS|AEKO详情"   class="margin-left25">{{language('LK_AEKO详情','AEKO详情')}}</i-button>
      <log-button v-if="$route.name !== 'explainattach'" v-permission.auto="AEKO_APPROVAL_DETAILS_PAGE_BTN_LOG|日志" @click="openLog" class="margin-left25"/>
      <icon @click.native="gotoDBhistory" symbol name="icondatabaseweixuanzhong"
            class="log-icon margin-left20 cursor myLogIcon"></icon>
      <iLog :show.sync="showDialog" :bizId="bizId"></iLog>
    </div>
  </div>
</template>

<script>
import {iNavMvp, icon, iButton, iLog, iMessage} from "rise"
import LogButton from "./LogButton";

export default {
  name: "ApprovalDetailsComponents",
  components: {
    LogButton,
    iNavMvp,
    icon,
    iButton,
    iLog
  },
  created() {
    this.queryParams = this.$route.query
    // 标记审批单跳转的参数
    this.queryParams.from = 'approve'
    let str_json = window.atob(this.queryParams.transmitObj)
    this.transmitObj = JSON.parse(decodeURIComponent(escape(str_json)))
    if (this.transmitObj.option == 1) {
      this.disabled = false // 待审批
    } else if (this.transmitObj.option == 2) {
      this.disabled = true  // 已审批
    }
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
      disabled:false,
      showDialog: false,
      bizId: ''
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
    // 打开跳转
    openLog(){
      this.bizId = this.transmitObj.aekoApprovalDetails.requirementAekoId || iMessage.error('AEKO id 获取失败')
      this.bizId = Number(this.bizId)
      if(this.bizId)
      this.showDialog = true
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