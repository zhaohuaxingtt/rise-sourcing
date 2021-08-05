<template>
  <div class="tabBox">
    <div class="item"
         :class="{'item-active': current === index + 1}"
         v-for="(item,index) of list"
         :key="item"
         @click="handleItemClick(index + 1,item.flag)"
    >
      {{ language(item.key, item.title) }}
    </div>
  </div>
</template>

<script>

import {RAWMATERIAL, LABOUR, ENERGY} from './data';

export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [
          {title: '原材料', key: 'TPGLZS.YUANCHAOLIAO', flag: RAWMATERIAL},
          {title: '劳动力', key: 'TPGLZS.LAODONGLI', flag: LABOUR},
          {title: '能源', key: 'TPGLZS.NENGYUAN', flag: ENERGY},
        ];
      },
    },
  },
  data() {
    return {
      current: 1,
    };
  },
  methods: {
    handleItemClick(index, flag) {
      this.current = index;
      this.$emit('handleClick', flag);
    },
  },
};
</script>

<style scoped lang="scss">
.tabBox {
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
}
</style>
