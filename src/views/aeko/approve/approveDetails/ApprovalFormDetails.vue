<!--审批单--->
<template>
  <div>
    <AEKOApprovalComponents :audit-items="auditItems" :transmit-obj="transmitObj" />
    <CoverStatementComponents class="margin-top20" :audit-cover="auditCover" />
    <RecommendationTablePendingApprovalComponents class="margin-top20"/>
  </div>
</template>

<script>
import AEKOApprovalComponents from "./components/AEKOApprovalComponents";
import CoverStatementComponents from "./components/CoverStatementComponents";
import RecommendationTablePendingApprovalComponents from "./components/RecommendationTablePendingApprovalComponents";
import {queryAKEOApprovalForm} from "@/api/aeko/approve";

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
    }
  },
  created() {
    this.transmitObj = JSON.parse(sessionStorage.getItem('AEKO-APPROVAL-DETAILS-ITEM'))
    this.aekoApprovalDetails = this.transmitObj.aekoApprovalDetails
    this.loadAKEOApprovalForm()
  },
  methods: {
    loadAKEOApprovalForm() {
      let reqData={aekoAuditType:this.aekoApprovalDetails.aekoAuditType,workFlowDTOS:this.aekoApprovalDetails.workFlowDTOS}
      queryAKEOApprovalForm(reqData).then(res => {
        if (res.code == 200) {
          this.auditItems = res.data.auditItems
          this.auditCoverStatus = res.data.auditCoverStatus
          this.auditCover = res.data.auditCover
          this.auditContents = res.data.auditContents
          this.auditContentStatus = res.data.auditContentStatus
          //获取到审批数据
          this.auditItems.forEach((item, index) => {
            item.approvalResult = 1
          })

        }
      })
    }
  },

}
</script>

<style scoped>

</style>