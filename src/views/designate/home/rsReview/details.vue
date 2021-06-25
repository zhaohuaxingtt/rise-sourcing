<!--
 * @Author: 上会rs单复核
 * @Date: 2021-06-25 10:04:33
 * @LastEditTime: 2021-06-25 10:35:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-web/src/views/designate/home/rsReview/details.vue
-->
<template>
  <iPage class="designateHome">
    <div class="rsReview-details">
      <rs />
    </div>
  </iPage>
</template>

<script>
import rs from '@/views/designate/designatedetail/decisionData/rs'

export default {
  components: {
    rs
  }
}
</script>
<style lang="scss" scoped>
.rsReview-details {
  padding: 20px;
}
</style>