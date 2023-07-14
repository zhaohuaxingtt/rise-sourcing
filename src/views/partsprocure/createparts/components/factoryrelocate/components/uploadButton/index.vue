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
    :multiple="multiple"
    ref="upload"
    name="file"
    :http-request="upload"
    :show-file-list="false" 
    :before-upload="beforeUpload"
    :disabled="upLoading"
    :accept="accept">
      <slot></slot>
  </el-upload>
</template>

<script>
import { factoryImportRecords } from '@/api/partsprocure/editordetail'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    uploadClass: {
      type: String,
      default: 'uploadButton'
    },
    multiple: {
      type: Boolean,
      default: true
    },
    accept: {
      type: String,
      default: '.xls,.xlsx,.XLS,.XLSX'
    },
    beforeUpload: {
      type: Function,
      default: () => file => { return true }
    },
    uploadButtonLoading: { type: Boolean, default: false },
  },
  computed:{
    upLoading(){
      return this.loading || this.uploadButtonLoading
    }
  },
  methods: {
    upload(content) {
      const formData = new FormData()
      formData.append('file', content.file)

      factoryImportRecords(
        formData, 
        { id: this.id || 0 }
      )
      .then(res => {
        this.$emit('success', res, content.file)
      })
      .catch(rej => {
        this.$emit('error', rej, content.file)
      })
    },
  }
}
</script>

<style>

</style>