<template>
  <div class="awardingscenario" v-permission.auto="SOURCING_NOMINATION_ATTATCH_AWARDSCENARIO|决策资料-awardingscenario">
    <buMonitor
      title="Awarding Scenario"
      :mode="'nomi'"
      :hideUpdateTime="true"
      readOnly />
  </div>
</template>
<script>
import buMonitor from "@/views/designate/suggestion/components/buMonitor";

export default {
  components: {
    buMonitor
  }
}
</script>