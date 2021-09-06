<template>
  <div class="container">
    <div class="itemBox"
         v-for="(item,index) of list"
         :key="index"
    >
      <div class="deleteBox" @click="handleDelete($event,item)">
        <icon symbol
              name="iconrs-quxiao"
              class="deleteIcon"
        />
      </div>
      {{ item }}
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
    list: {
      type: Array,
      default: () => {
        return [
        ];
      },
    },
  },
  methods: {
    handleDelete(e, item) {
      e.stopPropagation();
      this.$emit('handleDelete', item)
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  height: 55px;
  overflow-x: auto;

  .itemBox {
    margin-top: 10px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 6px 50px;
    background: #EEF2FB;
    border-radius: 5px;
    margin-right: 20px;
    color: #0D0D0D;
    font-size: 13px;
    white-space: nowrap;

    .deleteBox {
      position: absolute;
      right: -10px;
      top: -10px;
      cursor: pointer;

      .deleteIcon {
        font-size: 20px;
      }
    }
  }
}
</style>
