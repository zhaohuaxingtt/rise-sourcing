/* 
 * @Author: ldh  
 * @Date: 2021-02-22 11:32:08  
 * @Last Modified by: ldh
 * @Last Modified time: 2021-02-22 15:18:44
 */
<template>
  <div class="card">
    <div class="card__header" :style="{ paddingBottom: $slots.default ? '0px': '25px', ...headerStyle }" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div 
      class="card__header" 
      :style="{ paddingBottom: $slots.default ? '0px': '25px', justifyContent: title ? 'space-between' : 'flex-end', ...headerStyle }" 
      v-else-if="title || $slots['header-control'] || headerControl"
      >
        <span v-if="title" class="title" :style="titleStyle">{{ title }}</span>
        <div v-if="$slots['header-control'] || headerControl" class="control">
          <slot name="header-control">{{ headerControl }}</slot>
        </div>
    </div>
    <div class="card__body" :style="bodyStyle" v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    header: {},
    headerControl: {},
    headerStyle: {},
    titleStyle: {},
    bodyStyle: {}
  }
};
</script>

<style lang='scss' scoped>
.card {
  box-shadow: $btn-box-shadow;
  border-radius: 6px;

  .card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 0px;

    div,
    span {
      font-size: 20px;
    }
  }

  .card__body {
    padding: 20px;
  }
}
</style>