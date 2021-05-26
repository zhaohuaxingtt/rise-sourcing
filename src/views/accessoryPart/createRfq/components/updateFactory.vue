<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 16:00:14
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-26 16:01:06
 * @Description: 批量更新采购工厂
 * @FilePath: \front-web\src\views\accessoryPart\createRfq\components\updateFactory.vue
-->

<template>
  <iDialog 
    title="批量更新采购工厂"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="381px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm">确认</iButton>
      <iButton @click="handleCancel">取消</iButton>
    </template>
    <el-form>
      <el-form-item label="请选择采购工厂">
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