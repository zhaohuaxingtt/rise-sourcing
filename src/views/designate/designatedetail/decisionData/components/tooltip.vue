<template>
  <el-tooltip
    placement="top"
    :open-delay="280"
    maxWidth="600"
    popper-class="font-family"
    effect="light"
  >
    <div slot="content">
      <slot name="content">
        {{ content||text }}
      </slot>
    </div>
    <div class="tooltip">
      <slot name="text">
        {{ text }}
      </slot>
    </div>
  </el-tooltip>
</template>

<script>
export default {
    props:{
        text:String,
        content:String
    }
};
</script>

<style lang="scss" scoped>
.tooltip {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
<style>
.font-family {
  font-family: 'Arial', 'Helvetica', 'sans-serif';
}
</style>