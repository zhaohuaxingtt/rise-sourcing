<!--
 * @Author: moxuan
 * @Date: 2021-03-16 17:24:15
-->
<template>
  <iDialog :title="title" :visible.sync="value" width="500px" @close='clearDiolog'>
    <div class="changeContent">
      <el-upload
          class="avatar-uploader"
          action="1"
          :show-file-list="fileList"
          with-credentials
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :http-request="myUpload"
          :limit="1"
          accept=".xlsx"
      >
        <iButton>点击上传</iButton>
        <div slot="tip" class="el-upload__tip">只能上传.xlsx文件</div>
      </el-upload>
    </div>
    <span slot="footer" class="dialog-footer">
       <iButton @click="submit">确认</iButton>
       <iButton @click="clearDiolog">取消</iButton>
    </span>
  </iDialog>
</template>
<script>
import {iButton, iDialog} from '@/components'

export default {
  components: {
    iButton,
    iDialog
  },
  props: {
    title: {type: String, default: '上传'},
    value: {type: Boolean},
    repeatClick: Boolean,
    fileList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
    }
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
    submit() {
      this.$emit('submit')
    },
    beforeAvatarUpload() {},
    handleAvatarSuccess() {},
    async myUpload(content) {
    /*  this.uploadLoading = true
      let formData = new FormData()
      formData.append('upfile', content.file)
      const res = await uploadImg(formData)
      this.uploadLoading = false
      this.$emit('uploadedCallback', res)*/
    },
  }
}
</script>
<style lang='scss' scoped>
.changeContent {
  padding: 0 10px 20px 10px;
}
</style>

