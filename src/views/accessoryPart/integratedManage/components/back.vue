<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 13:43:37
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-16 22:46:06
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\integratedManage\components\back.vue
-->

<template>
  <iDialog 
    :title="language('TUIHUIYUANYIN','退回原因')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="878px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="saveLoading">{{language('BAOCUN','保存')}}</iButton>
      <iButton @click="clearDialog">{{language('QUXIAO','取消')}}</iButton>
    </template>
    <el-form>
      <el-form-item>
        <iInput v-model="reasonDescription" :placeholder="language('QINGSHURUCHEXIAOYUANYIN','请输入撤销原因')" type="textarea" :rows="12" resize="none" ></iInput> 
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput } from 'rise'
export default {
  components: { iDialog, iButton, iInput },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  watch:{
    dialogVisible(val) {
      if(val) {
        this.reasonDescription = ''
      }
    }
  },
  data() {
    return {
      backType: '',
      reasonDescription: '',
      saveLoading: false
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