<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-08 15:44:25
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-09 10:10:50
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\awardingscenario\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="awardingscenario" v-permission.auto="SOURCING_NOMINATION_ATTATCH_AWARDSCENARIO|决策资料-awardingscenario">
    <buMonitorExportPdf v-if="hasTitle"
      title="Awarding Scenario"
      :mode="'nomi'"
      :hideUpdateTime="true"
      :isnomination="'awardingscenario'"
      readOnly>
      <template #tabTitle>
        <slot name="tabTitle"></slot>
      </template>
    </buMonitorExportPdf>
    <buMonitor
      v-else
      title="Awarding Scenario"
      :mode="'nomi'"
      :hideUpdateTime="true"
      :isnomination="'awardingscenario'"
      readOnly />
  </div>
</template>
<script>
import buMonitor from "@/views/designate/suggestion/components/buMonitor";
import buMonitorExportPdf from "@/views/designate/suggestion/components/buMonitorExportPdf";

export default {
  components: {
    buMonitor,
    buMonitorExportPdf
  },
  computed:{
    hasTitle(){
      return this.$slots.tabTitle && true || false
    }
  }
}
</script>
<style lang="scss" scoped>
.awardingscenario{
  ::v-deep .monitorTable{
    .el-table{
      .el-table__header {
        background-color: #364d6e;
        tr:nth-child(even){
          background-color: #364d6e;
        }
      }
    }
  }
}
</style>