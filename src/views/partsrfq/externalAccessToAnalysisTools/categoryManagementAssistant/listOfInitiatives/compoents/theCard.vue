<template>
  <el-card>
    <div class="cardHeader">
      <div class="title">
        <icon symbol name="iconwenjianshuliangbeijing" class="titleIcon"/>
        <span class="text">{{ title }}</span>
      </div>
      <i class="el-icon-arrow-up collapse margin-left20 cursor" @click="handleShowHide"
         :class="{ rotate: !showSlot }"></i>
    </div>
    <el-collapse-transition>
      <slot v-if="showSlot"></slot>
    </el-collapse-transition>
  </el-card>
</template>

<script>
import {icon} from 'rise'
export default {
  components: {
    icon
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showSlot: true,
    };
  },
  methods: {
    handleShowHide() {
      this.showSlot = !this.showSlot;
    },
  },
};
</script>

<style scoped lang="scss">
.cardHeader {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 5px 0;
  border-bottom: 1px solid #CDDAF0;
  margin-bottom: 20px;

  .title{
    .text{
      font-size: 18px;
      line-height: 21px;
      color: #000000;
    }
  }

  .rotate {
    transform: rotate(180deg);
  }

  .collapse {
    font-size: 25px;
    color: #D3D3DB;

    &:hover {
      color: $color-blue;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
