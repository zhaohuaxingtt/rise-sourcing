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