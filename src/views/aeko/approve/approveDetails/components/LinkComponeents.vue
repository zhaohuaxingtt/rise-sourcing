<template>
  <span :class="'openLinkText cursor'" > {{ content}}</span>
</template>

<script>
export default {
  name: "LinkComponeents",
  props:{
    content:{ type: String, default:'' }
  }
}
</script>

<style scoped lang="scss">
.openLinkText {
  color: $color-blue;
}
</style>