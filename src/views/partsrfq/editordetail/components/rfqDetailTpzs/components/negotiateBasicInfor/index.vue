<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 16:23:12
 * @LastEditors: Please set LastEditors
 * @Descripttion: 谈判基本信息
-->
<template>
  <div>
    <div class="right-btn">
      <iButton @click="handleReport" v-permission.auto="RFQ_DETAIL_TIPS_NEGOTIATEBASIC_BUTTON_BAOGAOQINGDAN|报告清单">{{ $t('TPZS.BGQD') }}</iButton>
    </div>
    <projectOverview />
    <bulkSupplierOverview class="margin-top20" />
    <bulkSupplierPandect class="margin-top20" />
    <fixedRecord class="margin-top20" />
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
      title: 'BoB(Best of Best)'
    }
  },
  created() {
  },
  methods: {
    handleReport() {
      this.$router.push({ path: '/sourcing/partsrfq/reportList' });
    },
  }
}
</script>

<style>
.right-btn {
  position: absolute;
  top: -3.5rem;
  right: 0;
}
</style>