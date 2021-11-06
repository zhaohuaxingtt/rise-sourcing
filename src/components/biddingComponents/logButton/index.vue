<template>
  <div class="log-box" @click="toLogPage">
    <icon symbol name="iconrizhiwuzi" class="log-icon"/>
    <span class="log-word">{{ $t('LK_RIZHI') }}</span>
    <icon symbol name="icondatabaseweixuanzhong" class="log-icon margin-left20"></icon>
  </div>
</template>

<script>
import {icon} from 'rise'

export default {
  components: {
    icon
  },
  methods: {
    toLogPage() {
      this.$emit('toLogPage')
    }
  }
}
</script>

<style scoped lang="scss">
.log-box {
  display: flex;
  align-items: center;
  margin-left: 10px;

  .log-icon {
    font-size: 20px;
  }

  .log-word {
    color: $color-blue;
  }
}
</style>