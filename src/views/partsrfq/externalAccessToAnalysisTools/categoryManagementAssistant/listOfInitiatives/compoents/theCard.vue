<template>
  <el-card>
    <div class="cardHeader">
      {{title}}
      <i class="el-icon-arrow-up collapse margin-left20 cursor" ></i>
    </div>
    <slot>

    </slot>
  </el-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped lang="scss">
.cardHeader {
  width: 100%;
  padding:  0;
  border-bottom: 1px solid #CDDAF0;
  .collapse{
    font-size: 20px;
    color:#D3D3DB;

    &:hover {
      color:$color-blue;
    }
  }
}
</style>
