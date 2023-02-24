<template>
  <div class="todayIcon">
    <div class="circle" :style="{ width: `${ parseInt(size) || 18 }px`, height: `${ parseInt(size) || 18 }px` }">
      <div class="l" :style="{ width: `${ (parseInt(size) || 18) - 1 }px` }"></div>
      <div class="r" :style="{ width: `${ (parseInt(size) || 18) - 1 }px` }"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String || Number,
      default: 18
    }
  }
}
</script>

<style lang="scss" scoped>
.todayIcon {
  .circle {
    border: 1.5px solid rgb(112, 112, 112);
    border-radius: 50%;
    position: relative;

    .l {
      height: 1.2px;
      background: rgb(112, 112, 112);
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: left;
      transform: rotate(45deg) translate(-50%, -50%);
    }
    .r {
      height: 1.2px;
      background: rgb(112, 112, 112);
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: left;
      transform: rotate(135deg) translate(-50%, -50%);
    }
  }
}
</style>