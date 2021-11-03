<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 13:43:37
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-03 10:11:30
 * @Description: 
 * @FilePath: \front-web\src\views\modelTargetPrice\signin\components\noInvestConfirm.vue
-->

<template>
  <iDialog 
    :title="language('WUTOUZIQUEREN','无投资确认')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="30%"
  >
    <template slot="footer">
      <iButton @click="clearDialog">{{language('QUXIAO','取消')}}</iButton>
      <iButton @click="handleConfirm" :loading="saveLoading">{{language('QUEREN','确认')}}</iButton>
    </template>
    <el-form>
      <el-form-item :label="language('BEIZHU', '备注')">
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