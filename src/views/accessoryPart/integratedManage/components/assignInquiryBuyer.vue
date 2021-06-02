<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 16:11:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-02 14:11:06
 * @Description: 分配询价采购员弹窗
 * @FilePath: \front-web\src\views\accessoryPart\integratedManage\components\assignInquiryBuyer.vue
-->

<template>
  <iDialog 
    title="分配询价采购员"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="381px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm">确认</iButton>
      <iButton @click="handleCancel">取消</iButton>
    </template>
    <el-form>
      <el-form-item label="请选择询价采购员">
        <iSelect v-model="inquiryDepartment"></iSelect> 
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect } from 'rise'
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      inquiryBuyer: ''
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