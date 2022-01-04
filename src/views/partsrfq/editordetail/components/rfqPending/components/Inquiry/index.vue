<!--
 * @Author: YoHo
 * @Date: 2021-12-31 17:58:21
 * @LastEditTime: 2021-12-31 18:12:03
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div>
    <referenceOutput />
    <inquiryAttachment :rfqId='$route.query.id' class="margin-top20" />
  </div>
</template>

<script>
import referenceOutput from "../../../rfqDetailInfo/components/referenceOutput";
import inquiryAttachment from "../../../rfqDetailInfo/components/inquiryAttachment";
  export default {
    components:{
      referenceOutput,
      inquiryAttachment
    }
  }
</script>

<style lang="scss" scoped>

</style>