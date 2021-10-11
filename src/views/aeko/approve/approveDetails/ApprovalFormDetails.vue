<!--审批单--->
<template>
  <div>
    <AEKOApprovalComponents/>
    <CoverStatementComponents/>
    <RecommendationTablePendingApprovalComponents/>
  </div>
</template>

<script>
import AEKOApprovalComponents from "./components/AEKOApprovalComponents";
import CoverStatementComponents from "./components/CoverStatementComponents";
import RecommendationTablePendingApprovalComponents from "./components/RecommendationTablePendingApprovalComponents";

export default {
  name: "ApprovalFormDetails",
  components: {RecommendationTablePendingApprovalComponents, CoverStatementComponents, AEKOApprovalComponents}
}
</script>

<style scoped>

</style>