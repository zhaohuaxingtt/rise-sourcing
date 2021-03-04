<template>
  <div>
    <parts-production/>
    <time-plan class="mt20"/>
  </div>
</template>

<script>
import partsProduction from './components/partsProduction'
import timePlan from './components/timePlan'

export default {
  components: {
    partsProduction,
    timePlan
  },
  data() {
    return {};
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.mt20{
  margin-top: 20px;
}
</style>