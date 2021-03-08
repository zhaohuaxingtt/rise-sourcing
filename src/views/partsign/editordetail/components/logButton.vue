<template>
  <div class="logButton" @click="$emit('click')">
    <icon symbol name="iconrizhiwuzi" class="icon" />
    <span>日志</span>
  </div>
</template>

<script>
import { icon } from '@/components'

export default {
  components: { icon }  
}
</script>

<style lang="scss" scoped>
.logButton {
  display: inline-block;
  user-select: none;
  cursor: pointer;

  .icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;

    & + span {
      margin-left: 4px;
    }
  }

  span {
    font-size: 14px;
    line-height: 20px;
    color: $color-blue;
  }
}
</style>