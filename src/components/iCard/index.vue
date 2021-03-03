/* 
 * @Author: ldh  
 * @Date: 2021-02-22 11:32:08  
 * @Last Modified by: ldh
 * @Last Modified time: 2021-03-03 16:29:46
 */
<template>
  <div class="card" :class="{ tabCard }">
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
    bodyStyle: {},
    tabCard: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang='scss' scoped>
.card {
  box-shadow: $btn-box-shadow;
  border-radius: 6px;
  background: $color-white;
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
    padding: 32px 50px;
  }
}

.tabCard {
  .card__header {
    padding: 20px 40px 0!important;

    .title {
      color: $color-font;
      font-size: 18px;
      font-weight: bold;
      line-height: 25px;
    }
  }
  .card__body {
    padding: 30px 40px!important;
  }
}
</style>