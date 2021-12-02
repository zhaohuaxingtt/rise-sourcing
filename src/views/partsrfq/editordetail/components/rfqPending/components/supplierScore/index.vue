<!--
 * @Author: wentliao
 * @Date: 2021-05-11 16:31:08
 * @Description: 
-->
<template>
  <div v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_PARTSCORING_INDEXPAGE|供应商评分页面">
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