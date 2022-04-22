<template>
  <div class="awardingscenario pageCard-main" v-permission.auto="SOURCING_NOMINATION_ATTATCH_AWARDSCENARIO|决策资料-awardingscenario">
    <buMonitor
      title="Awarding Scenario"
      :mode="'nomi'"
      :hideUpdateTime="true"
      :isnomination="'awardingscenario'"
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