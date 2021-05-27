<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 13:43:37
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-26 14:09:13
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\integratedManage\components\back.vue
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
      <iButton @click="handleCancel">取消</iButton>
    </template>
    <el-form>
      <el-form-item>
        <iInput v-model="backReason" placeholder="请输入撤销原因" type="textarea" :rows="12" resize="none" ></iInput> 
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iInput } from 'rise'
export default {
  components: { iDialog, iButton, iSelect, iInput },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      backType: '',
      backReason: ''
    }
  },
  methods: {
    clearDialog() {
      this.$emit('changeVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>