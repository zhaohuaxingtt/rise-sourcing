<!--
 * @Author: your name
 * @Date: 2021-06-22 11:07:21
 * @LastEditTime: 2021-08-10 14:53:04
 * @LastEditors: Luoshuang
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\components\logButton\index.vue
-->
<template>
  <div class="logButton" @click="$emit('click')">
    <icon symbol name="iconrizhiwuzi" class="icon" />
    <span>{{ $t("LK_RIZHI") }}</span>
  </div>
</template>

<script>
import { icon } from 'rise';

export default {
  components: { icon },
};
</script>

<style lang="scss" scoped>
.logButton {
  display: inline-block;
  user-select: none;
  cursor: pointer;

  .icon {
    width: 20px;
    height: 20px;
    vertical-align: top;

    & + span {
      margin-left: 4px;
    }
  }

  span {
    display: inline-block;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    color: $color-blue;
  }
}
</style>