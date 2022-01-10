<!--
 * @Author: YoHo
 * @Date: 2021-12-31 17:58:21
 * @LastEditTime: 2022-01-07 10:02:48
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div>
    <referenceOutput />
    <inquiryAttachment :rfqId='$route.query.id' class="margin-top20" />
    <!-- <logisticsRequirements class="margin-top20" /> -->
  </div>
</template>

<script>
import referenceOutput from "../../../rfqDetailInfo/components/referenceOutput";
import inquiryAttachment from "../../../rfqDetailInfo/components/inquiryAttachment";
// import logisticsRequirements from "../../../rfqDetailInfo/components/logisticsRequirements";
  export default {
    components:{
      referenceOutput,
      inquiryAttachment,
      // logisticsRequirements
    }
  }
</script>

<style lang="scss" scoped>

</style>