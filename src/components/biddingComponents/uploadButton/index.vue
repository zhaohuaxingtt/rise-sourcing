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
      :before-upload="beforeUpload"
      :http-request="myUpload"
      accept=".xlsx,.pdf,.docx"
  >
    <span v-if="showText" class="openLinkText cursor" :class="{'underline': showTextUnderLine}">{{
        $t(buttonText)
      }}</span>
    <iButton v-else :loading="uploadButtonLoading">{{ $t(buttonText) }}</iButton>
  </el-upload>
</template>
<script>
import {iButton} from 'rise';
import {uploadFileWithNoToken} from '@/api/file/upload';

export default {
  components: {
    iButton,
  },
  props: {
    buttonText: {type: String, default: 'LK_SHANGCHUANFUJIAN'},
    repeatClick: Boolean,
    uploadButtonLoading: {type: Boolean, default: false},
    showText: {type: Boolean, default: false},
    showTextUnderLine: {type: Boolean, default: false},
  },
  data() {
    return {};
  },
  methods: {
    beforeUpload() {
    },
    handleAvatarSuccess() {
    },
    async myUpload(content) {
      const formData = new FormData();
      formData.append('file', content.file);
      formData.append('applicationName', 'rise');
      const res = await uploadFileWithNoToken(formData);
      const resData = res.data;
      resData.fileSize = content.file.size;
      this.$emit('uploadedCallback', resData);
    },
  },

};
</script>
<style lang='scss' scoped>
.upload {
  display: inline-block;
}

.openLinkText {
  color: $color-blue;
}

.underline {
  text-decoration: underline;
}

</style>

