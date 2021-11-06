<template>
  <iDialog
    :visible="open"
    :width="width"
    :modal="modal"
    center
    @close="$emit('onCancle')"
  >
    <div class="content-box">
      <span class="title">{{ title }}</span>
      <div>
        <iButton @click="$emit('onOK')">是</iButton>
        <iButton @click="$emit('onCancle')">否</iButton>
      </div>
    </div>
  </iDialog>
</template>
<script>
import { iDialog, iButton } from "rise";
export default {
  name: "pageHeader",
  components: { iDialog, iButton },
  props: {
    title: {
      type: String,
      default: "删除后无法恢复，是否确认删除？",
    },
    width: {
      type: Number,
      default: 300,
    },
    open: {
      type: Boolean,
      default: false,
    },
    modal: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    open(val, oldVal) {
      //普通的watch监听
      console.log("open: " + val, oldVal);
    },
    obj: {
      // 对象深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        console.log("b.c: " + val.c, oldVal.c);
      },
      // deep: true, //true 深度监听
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  display: none;
}
.dialog-box {
  background: olivedrab;
}
.content-box {
  padding: 10px;
  .title {
    padding-left: 10px;
  }
}
</style>
