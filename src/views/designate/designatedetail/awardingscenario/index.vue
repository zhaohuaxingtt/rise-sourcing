<template>
  <div class="awardingscenario">
    <buMonitor
      title="Awarding Scenario"
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