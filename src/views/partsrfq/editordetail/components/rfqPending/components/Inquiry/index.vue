<!--
 * @Author: YoHo
 * @Date: 2021-12-31 17:58:21
 * @LastEditTime: 2022-01-24 15:58:12
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div>
    <referenceOutput />
    <inquiryAttachment :rfqId='$route.query.id' class="margin-top20" />
    <logisticsRequirements class="margin-top20" />
  </div>
</template>

<script>
import referenceOutput from "../../../rfqDetailInfo/components/referenceOutput";
import inquiryAttachment from "../../../rfqDetailInfo/components/inquiryAttachment";
import logisticsRequirements from "../../../rfqDetailInfo/components/logisticsRequirements";
  export default {
    components:{
      referenceOutput,
      inquiryAttachment,
      logisticsRequirements
    }
  }
</script>

<style lang="scss" scoped>

</style>