<!--
 * @Author: 上会rs单复核
 * @Date: 2021-06-25 10:04:33
 * @LastEditTime: 2021-06-29 17:17:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-web/src/views/designate/home/rsReview/details.vue
-->
<template>
  <iPage class="designateHome">
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