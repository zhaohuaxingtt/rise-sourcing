<!--
 * @Author: wentliao
 * @Date: 2021-05-11 16:31:08
 * @Description: 
-->
<template>
  <div v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_PARTSCORING_INDEXPAGE">
    <supplier-score/>
    <supplier-rating-attachment class="margin-top20"/>
  </div>
</template>

<script>
import supplierScore from './components/supplierScore'
import supplierRatingAttachment from './components/supplierRatingAttachment'

export default {
  components: {
    supplierScore,
    supplierRatingAttachment,
  },
  data() {
    return {};
  },
  methods: {}
}
</script>

<style scoped lang="scss">

</style>