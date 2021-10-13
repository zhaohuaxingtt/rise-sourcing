<!--审批单--->
<template>
  <div>
    <AEKOApprovalComponents/>
    <CoverStatementComponents class="margin-top20"/>
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
    }
  },
  created() {
    let obj=JSON.parse(sessionStorage.getItem('AEKO-APPROVAL-DETAILS-ITEM'))

    console.log('obj传递至',obj)
  },
  methods: {
    loadAKEOApprovalForm() {
      let queryParams = {aekoAuditType: '', workFlowIds: []}
      queryAKEOApprovalForm().then(res => {
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