<template>
  <div class="tabPane" v-show="active">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'tabPane',
  props: {
    label: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require: true
    }
  },
  computed: {
    active() {
      const active = this.$parent.value === this.name
      return active;
    }
  },
  mounted() {
    this.$parent.$emit('tabUpdate');
  },
  updated() {
    this.$parent.$emit('tabUpdate');
  }
}
</script>

<style scoped>
.tabPane {

}
</style>