<!--
 * @Author: your name
 * @Date: 2021-06-03 16:32:25
 * @LastEditTime: 2021-06-03 17:18:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\uploadButton\index.vue
-->
<template>
  <el-upload 
    :class="uploadClass"
    multiple
    ref="upload"
    name="multipartFile"
    :http-request="upload"
    :show-file-list="false" 
    :before-upload="beforeUpload"
    :accept="accept">
      <slot></slot>
  </el-upload>
</template>

<script>
import { uploadFile, uploadUdFile } from "@/api/file/upload"

export default {
  props: {
    uploadClass: {
      type: String,
      default: "uploadButton"
    },
    accept: {
      type: String,
      default: ".pdf,.xlsx,.docx"
    },
    beforeUpload: {
      type: Function,
      default: () => file => { return true }
    }
  },
  methods: {
    upload(content) {
      uploadUdFile({
        multifile: content.file
      })
      .then(res => {
        this.$emit("success", res, content.file)
      })
      .catch(rej => {
        this.$emit("error", rej, content.file)
      })
    },
  }
}
</script>

<style>

</style>