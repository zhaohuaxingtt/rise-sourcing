<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 13:43:37
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-02 15:45:03
 * @Description: 
 * @FilePath: \front-web\src\views\designateFiles\fileManage\components\back.vue
-->

<template>
  <iDialog 
    title="退回原因"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="878px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm">保存</iButton>
      <iButton @click="clearDialog">取消</iButton>
    </template>
    <el-form>
      <el-form-item>
        <iInput v-model="reason" placeholder="请输入撤销原因" type="textarea" :rows="12" resize="none" ></iInput> 
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
  data() {
    return {
      reason: ''
    }
  },
  methods: {
    clearDialog() {
      this.reason = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      this.$emit('handleBack', this.reason)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>