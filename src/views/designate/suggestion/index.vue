<!--
 * @Author: haojiang
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-06-21 16:08:40
 * @description: 定点建议页面
-->
<template>
  <div class="nomination-sugestion">
    <!-- 供应商列表 -->
    <supplierTable :onlyTable="onlyTable" />
    <!-- 业务分配模拟 -->
    <buMonitor
      v-if="!onlyTable"
      :mode="'nomi'"
      :hideCombine="false"
      :readOnly="false" />
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
    this.onlyTable = this.$route.query.onlyTable || false
  }
}
</script>