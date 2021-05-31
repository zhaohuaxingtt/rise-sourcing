<!--
 * @Author: haojiang
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-05-28 17:22:37
 * @description: 定点建议页面
-->
<template>
  <div class="nomination-sugestion">
    <!-- 供应商列表 -->
    <supplierTable />
    <!-- 业务分配模拟 -->
    <buMonitor />
  </div>
</template>
<script>
import supplierTable from "./components/supplierTable";
import buMonitor from "@/views/designate/suggestion/components/buMonitor";

export default {
  components: {
    supplierTable,
    buMonitor
  }
}
</script>