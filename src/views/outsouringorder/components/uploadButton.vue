<!--
 * @Author: moxuan
 * @Date: 2021-03-17 17:24:15
-->
<template>
  <el-upload :disabled="upLoading" class="upload" action="/fileApi/upload" :show-file-list="false" :data="{ applicationName: 'rise' }" name="multipartFile" with-credentials :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :http-request="myUpload" accept=".xlsx,.xls">
    <iButton :loading="upLoading">{{ $t(buttonText) }}</iButton>
  </el-upload>
</template>
<script>
import { iButton } from 'rise'
// import { importSopPrice } from '@/api/ws2/sopManagement'
export default {
  components: {
    iButton,
  },
  props: {
    buttonText: { type: String, default: 'LK_DAORU' },
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
    async myUpload(content) {
      this.loading = true
      const { id, cstBookType, isSpareParts } = this.dataInfo
      const formData = new FormData()
      formData.append('file', content.file)
      formData.append('changePriceId', id)
      formData.append('cstBookType', cstBookType)
      formData.append('isSpareParts', isSpareParts)
      const res = await importSopPrice(formData)
      this.$emit('uploadedCallback', res)
      this.loading = false
    },
  },
}
</script>
<style lang='scss' scoped>
.upload {
  display: inline-block;
}
</style>

