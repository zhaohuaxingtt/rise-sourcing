/* 
 * @Author: ldh  
 * @Date: 2021-02-22 11:32:08  
 * @Last Modified by: ldh
 * @Last Modified time: 2021-03-04 19:09:27
 */
<template>
  <div class="card" :class="{ tabCard }">
    <div class="card__header" :style="{ ...headerStyle }" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div 
      class="card__header" 
      :style="{ justifyContent: title ? 'space-between' : 'flex-end', ...headerStyle }" 
      v-else-if="title || $slots['header-control'] || headerControl"
      >
        <span v-if="title" class="title" :style="titleStyle">{{ title }}</span>
        <div>
          <div v-if="$slots['header-control'] || headerControl" class="control">
            <slot name="header-control">{{ headerControl }}</slot>
          </div>
          <i @click="handleCollapse" v-if='collapse' class="el-icon-arrow-up collapse margin-left20 cursor" :class="{ rotate: !collapseValue }"></i>
        </div>
    </div>
    <el-collapse-transition>
      <div v-show="collapseValue" v-if="$slots.default">
        <div class="card__body" :style="{ paddingTop: !!($slots.header || header || title || $slots['header-control'] || headerControl) ? '0px': '30px', ...bodyStyle }">
          <slot></slot>
        </div>
      </div>
    </el-collapse-transition>
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
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      collapseValue: true
    }
  },
  methods: {
    handleCollapse() {
      this.collapseValue = !this.collapseValue
      this.$emit('handleCollapse', this.collapseValue)
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

    .control {
      display: inline-block;
    }

    .el-icon-arrow-up {
      transition: all 0.5s;
    }

    .rotate {
      transform: rotate(180deg);
      color: $color-blue;
    }

    .collapse {
      font-size: 20px;
      color:#D3D3DB;

      &:hover {
        color:$color-blue;
      }
    }
  }

  .card__body {
    height: 100%;
    padding: 0 40px 30px;
  }
}

.tabCard {
  .card__header {
    padding: 30px 40px 25px;

    .title {
      color: $color-font;
      font-size: 18px;
      font-weight: bold;
      line-height: 25px;
    }
  }
}
</style>