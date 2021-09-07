<!--
 * @Author: 上会rs单复核
 * @Date: 2021-06-25 10:04:33
 * @LastEditTime: 2021-09-06 17:06:12
 * @LastEditors: Hao,Jiang
 * @Description: In User Settings Edit
 * @FilePath: /front-web/src/views/designate/home/rsReview/details.vue
-->
<template>
  <iPage class="designateHome" v-permission.auto="SOURCING_NOMINATION_RSREVIEW_RSDETAILSPAGE|RS单详情页面">
    <div class="rsReview-details">
      <rs
        :otherPreview="true"
        :showSignatureForm="true"
        :otherNominationId="otherNominationId"
        :otherNominationType="otherNominationType"
        :otherPartProjectType="otherPartProjectType"
       />
    </div>
  </iPage>
</template>

<script>
import rs from '@/views/designate/designatedetail/decisionData/rs'

export default {
  components: {
    rs
  },
  data() {
    return {
      otherNominationId: '',
      otherNominationType: '',
      otherPartProjectType: ''
    }
  },
  created() {
    const {
      otherNominationId,
      otherNominationType,
      otherPartProjectType
    } = this.$route.query
    this.otherNominationId = otherNominationId || ''
    this.otherNominationType = otherNominationType || ''
    this.otherPartProjectType = otherPartProjectType || ''
  }
}
</script>
<style lang="scss" scoped>
.rsReview-details {
  padding: 20px;
}
</style>