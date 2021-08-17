<template>
  <div class="tabBox">
    <div class="boxContainer">
      <div class="item"
           :class="{'item-active': current === index + 1}"
           v-for="(item,index) of list"
           :key="item"
           @click="handleItemClick(index + 1,item.flag)"
      >
        {{ language(item.key, item.title) }}
      </div>
    </div>
    <div class="timeBox" v-if="currentTab !== CURRENTTIME">
      <span class="text">{{ language('PI.SHIJIANDAN', '时间段') }}</span>
      <el-date-picker
          v-model='timeRange'
          value-format='yyyy-MM'
          type="monthrange"
          style="width: 200px"
          @change="handleTimeChange"
      ></el-date-picker>
    </div>
  </div>
</template>

<script>

import {CURRENTTIME, AVERAGE} from './data';

export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [
          {title: '当前时点', key: 'PI.DANGQIANSHIDIAN', flag: CURRENTTIME},
          {title: '平均', key: 'PI.PINGJUN', flag: AVERAGE},
        ];
      },
    },
    currentTab: {
      type: String,
      default: '',
    },
    timeRange: {
      type: Array,
      default: () => {
        return null;
      },
    },
  },
  data() {
    return {
      current: 1,
      CURRENTTIME,
      AVERAGE,
    };
  },
  methods: {
    handleItemClick(index, flag) {
      this.current = index;
      this.$emit('handleItemClick', flag);
    },
    handleTimeChange(time) {
      this.$emit('handleTimeChange', time);
    },
  },
};
</script>

<style scoped lang="scss">
.tabBox {
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 10px;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 136px;
    background: #F5F6F7;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
    font-size: 16px;
    line-height: 25px;
    padding: 8px 20px;
    cursor: pointer;
  }

  .item-active {
    font-weight: bold;
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
    color: #1660F1;
  }

  .iconStyle {
    margin-left: 20px;
    font-size: 20px;
  }

  .boxContainer {
    display: flex;
    border-radius: 10px;
    overflow: hidden;
  }

  .timeBox {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;

    .text {
      margin-right: 20px;
      font-size: 16px;
      font-weight: 400;
      line-height: 18px;
      color: #000000;
    }
  }
}
</style>
