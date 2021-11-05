<!--
 * @Author: moxuan
 * @Date: 2021-03-17 17:24:15
-->
<template>
  <el-upload
      class="upload"
      action="/fileApi/upload"
      :show-file-list="false"
      :data="{ applicationName: 'rise' }"
      name="multipartFile"
      with-credentials
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="myUpload"
      accept=".xlsx,.pdf,.docx"
  >
    <iButton :loading="uploadButtonLoading">{{ $t(buttonText) }}</iButton>
  </el-upload>
</template>
<script>
import {iButton} from 'rise'
import {uploadFile, uploadUdFile} from "@/api/file/upload";

export default {
  components: {
    iButton
  },
  props: {
    buttonText: {type: String, default: 'LK_SHANGCHUANFUJIAN'},
    repeatClick: Boolean,
    uploadButtonLoading: {type: Boolean, default: false}
  },
  data() {
    return {}
  },
  methods: {
    beforeAvatarUpload() {
    },
    handleAvatarSuccess() {
    },
    async myUpload(content) {
      // const formData = new FormData()
      // formData.append('multipartFile', content.file)
      // formData.append('applicationName', 'rise')
      // const res = await uploadFile(formData)
      // this.$emit('uploadedCallback', res.data[0], content.file.size)
      const res = await uploadUdFile({
        multifile: content.file
      })
      
      this.$emit('uploadedCallback', res.data[0], content.file.size)
    },
  }
}
</script>
<style lang='scss' scoped>
.upload {
  display: inline-block;
}
</style>

