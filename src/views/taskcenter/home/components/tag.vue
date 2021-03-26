<template>
  <div class="tag">
    <div class="content font-weight font-size16">{{ $slots.default && $slots.default[0] && $slots.default[0].text }}<i></i></div>
  </div>
</template>

<script>
export default { }
</script>

<style lang="scss" scoped>
.tag {
  .content {
    position: relative;
    min-width: 80px;
    height: 28px;
    line-height: 28px;
    padding: 0 10px;
    background: #CEDEFF;
    text-align: center;
    font-size: 16px;
    color: #2D539B;

    &::before,
    &::after {
      position: absolute;
      left: -8px;
      content: "";
      width: 0; 
      height: 0; 
      border-style: solid;
    }

    &::before {
      top: 0;
      border-width: 0 8px 14px 0; 
      border-color: transparent #CEDEFF transparent transparent;
    }

    &::after {
      bottom: 0;
      border-width: 14px 8px 0 0; 
      border-color: transparent #CEDEFF transparent transparent;
    }

    i {
      position: absolute;
      bottom: -4px;
      right: 0px;
      width: 4px;
      height: 4px;
      border-width: 4px 4px 0 0; 
      border-style: solid;
      border-color: #6D86B9 transparent transparent transparent;
    }
  }
}
</style>