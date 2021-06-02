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
    :http-request="onHttpUploaded"
    :accept="accept"
    v-bind="props"
  >
		<iButton :loading="uploadButtonLoading">{{buttonText || $t('LK_DIANJISHANGCHUAN')}}</iButton>
		<div v-if="!hideTip" slot="tip" class="el-upload__tip">{{$t('LK_ZHINENGSHANGCHUANWENJIAN')}}</div>
  </el-upload>
</template>
<script>
import {iButton} from '@/components'
import {uploadFile} from "@/api/file/upload";

export default {
  props: {
    buttonText: {type: String, default: 'LK_SHANGCHUANFUJIAN'},
    uploadButtonLoading: {type: Boolean, default: false},
    hideTip: {type: Boolean, default: false},
    accept: {type: String, default: '.xlsx,.pdf,.docx'},
    props: {type: Object, default: () => ({})}
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
    async onHttpUploaded(content) {
      const formData = new FormData()
      formData.append('multipartFile', content.file)
      formData.append('applicationName', 'rise')
      this.loading = true
      const res = await uploadFile(formData)
      this.$emit('on-success', {
        data: (res && res.data && res.data[0]) || {} ,
        file: content.file || {}
      })
      this.loading = false
    },
  }
}
</script>
<style lang="scss" scoped>
.upload {
  display: inline-block;
}
</style>