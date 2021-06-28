<!--
 * @Author: your name
 * @Date: 2021-06-24 10:58:04
 * @LastEditTime: 2021-06-25 15:01:14
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
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sure"> 确 定 </el-button>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iInput } from "rise";
export default {
  name:"myDialog",
  components: {
    iDialog,
    iInput,
  },
  data() {
    return {
      remark: "",
    };
  },
  mounted(){
    console.log(this)
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