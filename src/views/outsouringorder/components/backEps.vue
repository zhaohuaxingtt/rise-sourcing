<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 16:14:32
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-25 13:42:56
 * @Description: 退回EPS弹窗
 * @FilePath: \front-web\src\views\accessoryPart\integratedManage\components\backEps.vue
-->

<template>
  <iDialog 
    :title="mode == 'back' ? language('TUIHUIYUANYIN','退回原因') : $t('关闭原因')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="878px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="saveLoading">{{language('BAOCUN','保存')}}</iButton>
      <iButton @click="clearDialog">{{language('QUXIAO','取消')}}</iButton>
    </template>
    <el-form label-position="top">
      <el-form-item :label="language('TUIHUILIYOUMIAOSHU','退回理由描述')">
        <iInput v-model="reasonDescription" :placeholder="language('QINGSHURUCHEXIAOYUANYIN','请输入撤销原因')" type="textarea" :rows="6" resize="none" ></iInput> 
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iInput } from 'rise'

export default {
  components: { iDialog, iButton, iSelect, iInput },
  props: {
    dialogVisible: { type: Boolean, default: false },
    mode: { type: String, default: 'back' }
  },
  data() {
    return {
      reasonDescription: '',
      loading: false,
      saveLoading: false
    }
  },

  watch: {
    dialogVisible(val) {
      if(val) {
        this.reasonDescription = ''
      }
    }
  },
  methods: {
    clearDialog() {
      this.reasonDescription = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      this.saveLoading = true
      this.$emit('handleBack', this.reasonDescription)
    },
    changeSaveLoading(loading) {
      this.saveLoading = loading
    }
  }
}
</script>

<style lang="scss" scoped>

</style>