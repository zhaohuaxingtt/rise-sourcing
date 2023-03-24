<template>
  <el-upload
    class="uploadButton"
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
  import {iButton,iMessage} from 'rise'
import {uploadUdFile as uploadFile} from "@/api/file/upload";
import {uploadfile} from "@/api/file";
export default {
  props: {
    /**
     * @description: 上传按钮文本
     * @param {*}
     * @return {*}
     */
    buttonText: String,
    /**
     * @description: 错误提示文本
     * @param {*}
     * @return {*}
     */
    errorTipsText: String,
    /**
     * @description: 文件类型
     * @param {*}
     * @return {*}
     */    
    fileType: String,
    /**
     * @description: hostId
     * @param {*}
     * @return {*}
     */    
    hostId: String,
    /**
     * @description: 是否隐藏错误提示
     * @param {*}
     * @return {*}
     */    
    hideTip: {type: Boolean, default: false},
    /**
     * @description: 是否开启sourcing上传回调，默认不开启
     * @param {*}
     * @return {*}
     */
    sourcingCallback: {type: Boolean, default: false},
    /**
     * @description: 按钮上传状态
     * @param {*}
     * @return {*}
     */
    uploadButtonLoading: {type: Boolean, default: false},
    /**
     * @description: 接受类型
     * @param {*}
     * @return {*}
     */    
    accept: {type: String, default: '.pdf,.docx'},
    /**
     * @description: 额外参数
     * @param {*}
     * @return {*}
     */    
    props: {type: Object, default: () => ({})},
    /**
     * @description: 回调函数
     * @param {*}
     * @return {*}
     */    
    onHttpUploaded: {type: Function},
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
    beforeAvatarUpload(content){
        let result = this.beforeUpload ? this.beforeUpload(content) : this.beforeUploadFun(content)
        return result
    },
    // 上传判断
    beforeUploadFun(content) {
        let arr = content.name.split('.')
        let fileType = arr[arr.length-1]
        if(fileType.toUpperCase().indexOf('PPT')>-1){
            iMessage.warn('请不要上传PPT文件');
            return false
        }else{
            return true
        }
    },
    /**
     * @description: 上传回调
     * @param {*} content
     * @return {*}
     */    
    async onUploaded(content) {
      const formData = new FormData()
      formData.append('multipartFile', content.file)
      formData.append('applicationName', 'rise')
      const params = {
        multifile:content.file
      }
      this.loading = true
      try {
        // 可以提供上传方法回调
        const res = this.onHttpUploaded ? await this.onHttpUploaded(formData,content) : await uploadFile(params)
        let callbackData = {
          data: (res && res.data && res.data[0]) || {} ,
          file: content.file || {},
          fileType: this.fileType,
          hostId: this.hostId,
        }
        if (this.sourcingCallback) {
          this.onUploadsucess(callbackData)
        } else {
          this.$emit('on-success', callbackData)
        }
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    /**
     * @description: 上传成功回调，配合@/components/Upload 食用
     * @param {*} data 回传参数
     * @param {*} callback 回调
     * @return {*}
     */    
    onUploadsucess(data) {
      if (!data.data.name && !data.data.path) {
        this.loading = false
        // 上传发生错误，oss无文件名，路径返回
        iMessage.error(this.language('UPLOADERRORRETRYLATER','上传发生错误，请稍后重试'))
        return
      }
      this.loading = true
      const params = {
        // 业务配置相关
        fileType: data.fileType || '',
        hostId: data.hostId || '',
        fileCode: data.fileCode || '0',
        // 文件内容🇭相关
        fileName: data.data.name || '',
        filePath: data.data.path || '',
        fileSize: data.file.size || 0,
        size: data.file.size || 0,
        uploadId:data.data.id,
      }
      uploadfile(params).then(res => {
        if (res.code === '200') {
          iMessage.success('上传成功')
          this.$emit('on-success', data)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.loading = false
      }).catch(e => {
        this.loading = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : event.desEn)
      })

    },
  }
}
</script>
<style lang="scss" scoped>
.uploadButton {
  display: inline-block;
}
</style>