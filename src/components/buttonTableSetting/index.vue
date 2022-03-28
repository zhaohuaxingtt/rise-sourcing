<!--
 * @Author: wentliao
 * @Date: 2022-03-21 10:34:32
 * @Description: 
-->
<template>
  <span class="button-table-setting" @click="handleClick">
    <icon class="font18" name="iconSetting" symbol />
  </span>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'buttonTableSetting',
  components: { Icon },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.button-table-setting {
  cursor: pointer;
  margin-left: 10px;
}
</style>
