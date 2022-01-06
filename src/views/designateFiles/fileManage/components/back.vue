<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 13:43:37
 * @LastEditors: Luoshuang
 * @LastEditTime: 2022-01-06 14:17:42
 * @Description: 
 * @FilePath: \front-sourcing\src\views\designateFiles\fileManage\components\back.vue
-->

<template>
  <iDialog 
    :title="language('TUIHUIYUANYIN','退回原因')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="878px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="loading">{{language('BAOCUN','保存')}}</iButton>
      <iButton @click="clearDialog">{{language('QUXIAO','取消')}}</iButton>
    </template>
    <el-form>
      <el-form-item>
        <iInput v-model="reason" :placeholder="language('QINGSHURUCHEXIAOYUANYIN','请输入撤销原因')" type="textarea" :rows="12" resize="none" ></iInput> 
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput, iMessage } from 'rise'
export default {
  components: { iDialog, iButton, iInput },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      reason: '',
      loading: false
    }
  },
  methods: {
    clearDialog() {
      this.reason = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      if (!this.reason || this.reason === '') {
        iMessage.warn(this.language('QINGSHURUTUIHUIYUANYIN', '请输入退回原因'))
        return
      }
      this.loading = true
      this.$emit('handleBack', this.reason)
    },
    changeLoading(loading) {
      this.loading = loading
    } 
  }
}
</script>

<style lang="scss" scoped>

</style>