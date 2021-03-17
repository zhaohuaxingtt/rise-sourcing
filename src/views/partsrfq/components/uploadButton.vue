<!--
 * @Author: moxuan
 * @Date: 2021-03-17 17:24:15
-->
<template>
  <el-upload
      class="upload"
      action="1"
      :show-file-list="false"
      with-credentials
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="myUpload"
      :limit="1"
      accept=".xlsx,.pdf,.docx"
  >
    <iButton :loading="uploadButtonLoading">{{buttonText}}</iButton>
  </el-upload>
</template>
<script>
import {iButton} from '@/components'

export default {
  components: {
    iButton
  },
  props: {
    buttonText: {type: String, default: '上传附件'},
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
      /*  this.uploadLoading = true
        let formData = new FormData()
        formData.append('upfile', content.file)
        const res = await uploadImg(formData)
        this.uploadLoading = false
        this.$emit('uploadedCallback', res)*/
      this.$emit('uploadedCallback')
    },
  }
}
</script>
<style lang='scss' scoped>
.upload {
  display: inline-block;
}
</style>

