<template>
  <el-upload
    class="upload"
    :show-file-list="false"
    :data="{ applicationName: 'rise' }"
    name="multipartFile"
    with-credentials
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :http-request="myUpload"
    accept=".xlsx,.xls"
  >
    <iButton :loading="uploadButtonLoading">{{ $t(buttonText) }}</iButton>
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

    };
  },
  methods: {
    beforeAvatarUpload() {},
    handleAvatarSuccess() {},
    myUpload(content) {
      const formData = new FormData();
      formData.append("file", content.file);
      this.$emit("uploadedCallback", formData);
    },
  },
};
</script>
<style lang='scss' scoped>
.upload {
  display: inline-block;
}
</style>

