<!--
 * @Author: your name
 * @Date: 2021-06-22 11:36:21
 * @LastEditTime: 2021-06-28 17:35:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\rfqdetail\components\inquiryAttachment\index.vue
-->
<template>
  <div class="inquiryAttachment">
    <inquiryAttachment ref="inquiryAttachment" :rfqId="rfqId" />
    <inquiryDrawing class="margin-top20" ref="inquiryDrawing" :rfqId="rfqId" />
  </div>
</template>

<script>
import inquiryAttachment from "./components/inquiryAttachment"
import inquiryDrawing from "./components/inquiryDrawing"

export default {
  components: {
    inquiryAttachment,
    inquiryDrawing
  },
  props: {
    rfqId: {
      type: String,
      require: true
    }
  },
  methods: {
    init() {
      this.$refs.inquiryAttachment.getAllAnnex()
      this.$refs.inquiryDrawing.getRfqDataList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>