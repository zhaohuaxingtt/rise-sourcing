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
    accept=".xlsx,.xls"
    :disabled="upLoading"
  >
    <iButton :loading="upLoading">{{ $t(buttonText) }}</iButton>
  </el-upload>
</template>
<script>
import { iButton } from "rise";
export default {
  components: {
    iButton,
  },
  props: {
    buttonText: { type: String, default: "LK_DAORU" },
    repeatClick: Boolean,
    uploadButtonLoading: { type: Boolean, default: false },
    dataInfo: { type: Object, default: () => {} },
  },
  data() {
    return {
      loading: false
    }
  },
  computed:{
    upLoading(){
      return this.loading || this.uploadButtonLoading
    }
  },
  methods: {
    beforeAvatarUpload() {},
    handleAvatarSuccess() {},
    myUpload(content) {
      this.loading = true
      const formData = new FormData();
      formData.append("file", content.file);
      formData.append("riseCode", this.dataInfo.riseCode);
      formData.append("type", this.dataInfo.type);
      formData.append("subType", this.dataInfo.subType);
      this.$emit("uploadedCallback", formData);
      this.loading = false
    },
  },
};
</script>
<style lang='scss' scoped>
.upload {
  display: inline-block;
}
</style>

