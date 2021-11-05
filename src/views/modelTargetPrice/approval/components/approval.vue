<!--
 * @Author: Luoshuang
 * @Date: 2021-06-23 18:12:01
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-03 13:18:42
 * @Description: 审批弹窗
 * @FilePath: \front-web\src\views\modelTargetPrice\approval\components\approval.vue
-->

<template>
  <iDialog 
    :title="type === '1' ? language('PIZHUNQUEREN','批准确认') : language('BOHUIQUEREN','驳回确认')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="30%"
  >
    <template slot="footer">
      <iButton @click="clearDialog">{{language('QUXIAO','取消')}}</iButton>
      <iButton @click="handleConfirm" :loading="saveLoading">{{language('QUEREN','确认')}}</iButton>
    </template>
    <el-form>
      <el-form-item :label="language('SHENPIYIJIAN', '审批意见')">
        <iInput v-model="reasonDescription" :placeholder="language('QINGSHURU','请输入')" type="textarea" :rows="6" resize="none" ></iInput> 
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput } from 'rise'
export default {
  components: { iDialog, iButton, iInput },
  props: {
    dialogVisible: { type: Boolean, default: false },
    type: {type:String, default: '1'}
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
      this.$emit('handleConfirm', this.reasonDescription)
    },
    changeSaveLoading(loading) {
      this.saveLoading = loading
    }
  }
}
</script>

<style lang="scss" scoped>

</style>