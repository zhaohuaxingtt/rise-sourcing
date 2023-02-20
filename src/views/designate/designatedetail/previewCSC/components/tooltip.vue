<template>
  <el-tooltip
    placement="top"
    :open-delay="280"
    maxWidth="600"
    popper-class="font-family"
    effect="light"
    :content="content||text"
  >
    <div class="tooltip">
      {{ text }}
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