<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2022-12-26 21:52:44
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-27 18:40:16
 * @FilePath: \front-web\src\components\buttonTableSetting\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <span class="button-table-setting" @click="handleClick">
    <icon name="iconSetting" class="font24" symbol />
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
  display: inline-flex;
  align-items: center;
}
</style>
