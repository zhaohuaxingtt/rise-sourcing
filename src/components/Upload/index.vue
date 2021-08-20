<!--
 * @Author: wentliao
 * @Date: 2021-06-02 11:12:35
 * @Description: 
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
    :http-request="onUploaded"
    :accept="accept"
    v-bind="props"
    ref="uploadRef"
  >
		<iButton :loading="uploading">{{buttonText || language('SHANGCHUANFUJIJAN',"上传附件")}}</iButton>
		<div v-if="!hideTip" slot="tip" class="el-upload__tip">{{errorTipsText || language('LK_ZHINENGSHANGCHUANWENJIAN','只能上传文件')}}</div>
  </el-upload>
</template>
<script>
import {iButton} from 'rise'
import {uploadUdFile as uploadFile} from "@/api/file/upload";
export default {
  props: {
    buttonText: String,
    errorTipsText: String,
    uploadButtonLoading: {type: Boolean, default: false},
    hideTip: {type: Boolean, default: false},
    accept: {type: String, default: '.xlsx,.pdf,.docx'},
    props: {type: Object, default: () => ({})},
    // 回调函数
    onHttpUploaded: {type: Function}
  },
  components: {
    iButton
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    uploading() {
      return this.loading || this.uploadButtonLoading
    }
  },
  methods: {
    async onUploaded(content) {
      const formData = new FormData()
      formData.append('multipartFile', content.file)
      formData.append('applicationName', 'rise')
      this.loading = true

      const params = {
        multifile:content.file
      }
      try {
        const res = this.onHttpUploaded ? await this.onHttpUploaded(formData,content) : await uploadFile(params)
        this.$emit('on-success', {
          data: (res && res.data && res.data[0]) || {} ,
          file: content.file || {}
        })
        this.loading = false
      } catch (e) {
        this.loading = false
      }
      
      
    },
  }
}
</script>
<style lang="scss" scoped>
.upload {
  display: inline-block;
}
</style>