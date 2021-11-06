<template>
  <div class="tab" :class="{ active: active }" @click="$emit('click')">
    <span class="badge" v-if="badge > 0">{{ badge }}</span>
    <span class="name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.tab {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.42);
  position: relative;
  cursor: pointer;
  &.active {
    color: #1660f1;
  }
  .name {
    font-weight: bold;
  }
  .badge {
    min-width: 20px;
    height: 20px;
    background: #e30d0d;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    display: block;
    position: absolute;
    top: -10px;
    right: -20px;
  }
}
</style>
