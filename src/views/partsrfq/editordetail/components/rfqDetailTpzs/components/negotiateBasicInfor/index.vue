<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:23:12
 * @LastEditors: caopeng
 * @Descripttion: 谈判基本信息
-->
<template>
  <div class="negotiateBasicInfor">
    <div class="right-btn">
      <iButton @click="handleReport" v-permission.auto="RFQ_DETAIL_TIPS_NEGOTIATEBASIC_BUTTON_BAOGAOQINGDAN|报告清单">{{ $t('TPZS.BGQD') }}</iButton>
    </div>
    <projectOverview :rfqInfoData="rfqInfoData" v-permission.auto="RFQ_DETAIL_TIPS_NEGOTIATEBASIC_MOUDULES_PROJECTOVERVIEW|项目概览" @rfqInfo="emitRfq"/>
    <bulkSupplierOverview :rfqInfoData="rfqInfoData"  class="margin-top20" v-permission.auto="RFQ_DETAIL_TIPS_NEGOTIATEBASIC_MOUDULES_SUPPLIEROVERVIEW|批量供应商概览" :categoryCode="rfqInfo.categoryCode"/>
    <bulkSupplierPandect   :rfqInfoData="rfqInfoData" class="margin-top20" v-permission.auto="RFQ_DETAIL_TIPS_NEGOTIATEBASIC_MOUDULES_FACTORYOVERVIEW|批量供应商工厂总览" :paramCategoryCode="rfqInfo.categoryCode" :paramCategoryName="rfqInfo.categoryName"/>
    <fixedRecord  :rfqInfoData="rfqInfoData" class="margin-top20 fixedRecord" v-permission.auto="RFQ_DETAIL_TIPS_NEGOTIATEBASIC_MOUDULES_NOMINATERECORD|定点记录" />
  </div>
</template>

<script>
import { iButton } from "rise";
import bulkSupplierOverview from "./components/bulkSupplierOverview.vue";
import bulkSupplierPandect from "./components/bulkSupplierPandect.vue";
import projectOverview from "./components/projectOverview.vue";
import fixedRecord from "./components/fixedRecord.vue";
export default {
  components: { bulkSupplierOverview, bulkSupplierPandect, projectOverview, fixedRecord, iButton },
  data() {
    return {
      title: 'BoB(Best of Best)',
      rfqInfo: {},
      isMapShow:false
    }
  },
  props:{
          rfqInfoData: { type: Object },
  },
  created() {
  },
   watch:{
      rfqInfoData(val){
          this.rfqInfoData=val
          console.log(val)
      }
  },
  methods: {
      
 
    handleReport() {
      this.$router.push({ path: '/sourcing/partsrfq/reportList' });
    },
    emitRfq(rfq) {
      this.rfqInfo = rfq;
    }
  }
}
</script>

<style lang="scss" scoped>
.negotiateBasicInfor {
  .right-btn {
    position: absolute;
    top: -3.5rem;
    right: 0;
  }

  .fixedRecord {
    margin-bottom: 70px;
  }
}
</style>