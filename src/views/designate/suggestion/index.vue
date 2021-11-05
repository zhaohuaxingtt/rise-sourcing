<!--
 * @Author: haojiang
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-09-07 14:25:05
 * @description: 定点建议页面
-->
<template>
  <div class="nomination-sugestion" v-permission.auto="SOURCING_NOMINATION_SUGGESTION_PAGE|定点建议">
    <!-- 供应商列表 -->
    <supplierTable :onlyTable="onlyTable" v-permission.auto="SOURCING_NOMINATION_SUGGESTION_SUPPLIERLIST|供应商列表" />
    <!-- 业务分配模拟 -->
    <buMonitor
      v-if="!onlyTable"
      :mode="'nomi'"
      :tableSelection="true"
      :hideCombine="false"
      :readOnly="false"
      v-permission.auto="SOURCING_NOMINATION_SUGGESTION_BUMONITOR|业务分配模拟" />
  </div>
</template>
<script>
import supplierTable from "./components/supplierTable";
import buMonitor from "@/views/designate/suggestion/components/buMonitor";

export default {
  components: {
    supplierTable,
    buMonitor
  },
  data() {
    return {
      onlyTable: false
    }
  },
  created() {
    // 仅仅显示定点建议的表格（只读）
    this.onlyTable = this.$route.query.onlyTable || false
  }
}
</script>