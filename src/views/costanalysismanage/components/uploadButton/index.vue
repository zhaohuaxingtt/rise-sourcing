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
import { uploadFile } from "@/api/file/upload"

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
    params: {
      type: Object,
      default: () => {}
    },
    beforeUpload: {
      type: Function,
      default: () => file => { return true }
    }
  },
  methods: {
    upload(content) {
      const formData = new FormData()

      formData.append("multipartFile", content.file)
      Object.keys(this.params).forEach(key => formData.append(key, this.params[key]))

      uploadFile(formData)
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