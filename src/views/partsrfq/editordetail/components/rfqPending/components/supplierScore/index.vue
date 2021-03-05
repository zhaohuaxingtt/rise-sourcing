<template>
  <div>
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