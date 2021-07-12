<!--
 * @Author: your name
 * @Date: 2021-06-24 10:58:04
 * @LastEditTime: 2021-07-07 16:27:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\bob\bobAnalysis\components\dialog.vue
-->
<template>
  <div>
    <iDialog :visible="visible" :width="width" :title="title" @close="cancel">
      <iInput
        type="textarea"
        clearable
        :autosize="{ minRows: 6, maxRows: 6 }"
        resize="none"
        v-model="remark"
      ></iInput>
      <div slot="footer">
        <iButton @click="cancel">取 消</iButton>
        <iButton type="primary" @click="sure"> 确 定 </iButton>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iInput, iButton } from "rise";
export default {
  name: "myDialog",
  components: {
    iDialog,
    iInput,
    iButton,
  },
  data() {
    return {
      remark: "",
    };
  },
  mounted() {

  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "40%",
    },
    title: {
      type: String,
      default: "备注",
    },
  },
  methods: {
    sure() {
      this.$emit("remake", this.remark, false);
    },
    cancel() {
      this.$emit("cancel", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>