<template>
  <div class="partBox margin-bottom20">
    <div class="partItemContainer">
      <div class="partItem"
           v-for="(item,index) of partList"
           :key="item"
           :class="{'partItemActive': partItemCurrent === index}"
           @click="handlePartItemClick(item ,index)"
      >
        <div class="quxiaoIconBox" @click="handlePartItemClose($event,item)">
          <icon symbol
                name="iconrs-quxiao"
                class="quxiaoIcon"
                v-if="partItemCurrent === index && partList.length > 1 "
          />
        </div>
        {{ item.partsId }}
      </div>
    </div>
    <!--      自定义图标-->
    <div class="customBox" @click="handleOpenCustomDialog">
      <icon symbol name="iconzidingyi" class="customIcon"/>
    </div>
  </div>
</template>

<script>
import {icon} from 'rise';

export default {
  components: {
    icon,
  },
  props: {
    partList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    partItemCurrent: {
      type: Number,
      default: null,
    },
  },
  methods: {
    handleOpenCustomDialog() {
      this.$emit('handleOpenCustomDialog');
    },
    handlePartItemClose(event, item) {
      this.$emit('handlePartItemClose', {event, item});
    },
    handlePartItemClick(item, index) {
      this.$emit('handlePartItemClick', {item, index});
    },
  },
};
</script>

<style scoped lang="scss">
.partBox {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .partItemContainer {
    display: flex;

    .partItem {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 30px;
      height: 35px;
      padding: 9px 15px;
      background: #FFFFFF;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      color: #000000;
      cursor: pointer;

      .quxiaoIconBox {
        position: absolute;
        right: -10px;
        top: -10px;
      }

      .quxiaoIcon {
        font-size: 20px;
      }
    }

    .partItemActive {
      color: #1763F7;
    }
  }

  .customBox {
    .customIcon {
      cursor: pointer;
      font-size: 20px;
    }
  }
}
</style>
