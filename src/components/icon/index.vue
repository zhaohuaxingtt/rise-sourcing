<template>
  <svg class="icon" :style="{ fontSize: `${ size }px` }" aria-hidden="true">
    <use :xlink:href="`#${ name }`"></use>
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    size: {
      type: Number || String,
      default: 16
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>