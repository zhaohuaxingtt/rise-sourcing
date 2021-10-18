<!--审批单--->
<template>
  <div>
    <AEKOApprovalComponents :audit-items="auditItems" :transmit-obj="transmitObj" @refreshForm="refreshForm($event)"/>
    <CoverStatementComponents class="margin-top20" :audit-cover-status="auditContentStatus" :audit-cover="auditCover"/>
    <RecommendationTablePendingApprovalComponents  :audit-contents="auditContents"
                                                  :audit-content-status="auditContentStatus" class="margin-top20"/>
  </div>
</template>

<script>
import AEKOApprovalComponents from "./components/AEKOApprovalComponents";
import CoverStatementComponents from "./components/CoverStatementComponents";
import RecommendationTablePendingApprovalComponents from "./components/RecommendationTablePendingApprovalComponents";
import {queryAKEOApprovalForm, getAKEOApprovalForm} from "@/api/aeko/approve";

export default {
  name: "ApprovalFormDetails",
  components: {RecommendationTablePendingApprovalComponents, CoverStatementComponents, AEKOApprovalComponents},
  data() {
    return {
      auditItems: [],//审批数据
      auditCoverStatus: '',//封面状态
      auditCover: [],//封面数据集合
      auditContents: [],//推荐表集合
      auditContentStatus: '',//推荐表状态
      transmitObj: {},
      aekoApprovalDetails: {},
      queryParams: {},
    }
  },
  created() {
    this.queryParams = this.$route.query
    let str_json = window.atob(this.queryParams.transmitObj)
    this.transmitObj = JSON.parse(decodeURIComponent(escape(str_json)))
    this.aekoApprovalDetails = this.transmitObj.aekoApprovalDetails
    if (this.transmitObj.option == 1) {
      this.loadAKEOApprovalForm()
    } else {
      this.lookAKEOApprovalForm()
    }
  },
  methods: {
    refreshForm(option) {
      this.transmitObj.option = option
      this.queryParams.transmitObj = window.btoa(JSON.stringify(this.transmitObj))
      this.$router.replace({
        path: '/aeko/AEKOApprovalDetails/Approvalform',
        query: this.queryParams
      })
      /*sessionStorage.setItem('AEKO-APPROVAL-DETAILS-ITEM', JSON.stringify(this.transmitObj))
      if (this.transmitObj.option == 1) {
        this.loadAKEOApprovalForm()
      } else {
        this.lookAKEOApprovalForm()
      }*/
    },

    loadAKEOApprovalForm() {
      let reqData = {
        aekoAuditType: this.aekoApprovalDetails.aekoAuditType,
        workFlowDTOS: this.aekoApprovalDetails.workFlowDTOS
      }
      queryAKEOApprovalForm(reqData).then(res => {
        if (res.code == 200) {
          this.auditItems = res.data.auditItems
          this.auditCoverStatus = res.data.auditCoverStatusDesc
          this.auditCover = res.data.auditCover
          this.auditContents = res.data.auditContents
          this.auditContentStatus = res.data.auditContentStatusDesc
          //获取到审批数据
          this.auditItems.forEach((item, index) => {
            item.approvalResult = 1
          })

        }
      })
    },

    lookAKEOApprovalForm() {
      let reqData = {
        aekoAuditType: this.aekoApprovalDetails.aekoAuditType,
        workFlowDTOS: this.aekoApprovalDetails.workFlowDTOS,
        approvalResult:this.aekoApprovalDetails.approvalResult
      }
      getAKEOApprovalForm(reqData).then(res => {
        if (res.code == 200) {
          this.auditItems = res.data.auditItems
          this.auditCoverStatus = res.data.auditCoverStatusDesc
          this.auditCover = res.data.auditCover
          this.auditContents = res.data.auditContents
          this.auditContentStatus = res.data.auditContentStatusDesc
        }
      })
    }

  },

}
</script>

<style scoped>

</style>