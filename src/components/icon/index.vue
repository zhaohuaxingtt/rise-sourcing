<template>
  <svg v-if="symbol" class="icon" :color='color' aria-hidden="true">
    <use :xlink:href="`#${ name }`"></use>
  </svg>
  <i v-else class="iconfont" :class="name"></i>
</template>

<script>
export default {
  props: {
    symbol: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    color:{
      type:String
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