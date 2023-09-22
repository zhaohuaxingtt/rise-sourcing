<!--
 * @Author: your name
 * @Date: 2021-06-22 11:36:01
 * @LastEditTime: 2022-01-20 11:35:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\supplierScore\index.vue
-->
<template>
  <div class="supplierScore">
    <score :rfqInfo="rfqInfo" ref="score" :rfqId="rfqId" :showSQE="showSQE" />
    <attachment class="margin-top20" ref="attachment" :rfqId="rfqId" />
  </div>
</template>

<script>
import score from "./components/score"
import attachment from "./components/attachment"

export default {
  components: {
    score,
    attachment
  },
  props: {
    rfqId: {
      type: String,
      require: true
    },
    rfqInfo:{
      type:Object,
      default:()=>{},
    },
    showSQE: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    init() {
      this.$refs.score.getRfqBdlRatingsByCurrentDept()
      this.$refs.attachment.getAllAnnex()
    },
  },
}
</script>

<style lang="scss" scoped>

</style>