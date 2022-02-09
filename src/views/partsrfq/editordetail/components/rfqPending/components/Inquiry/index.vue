<!--
 * @Author: YoHo
 * @Date: 2021-12-31 17:58:21
 * @LastEditTime: 2022-01-28 23:53:39
 * @LastEditors: Please set LastEditors
 * @Description: 
-->
<template>
  <div>
    <referenceOutput />
    <inquiryAttachment :rfqId='$route.query.id' :baseInfo="baseInfo" class="margin-top20" />
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
    },
    props:{
      baseInfo:{
        type:Object,
        default:()=>{},
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>