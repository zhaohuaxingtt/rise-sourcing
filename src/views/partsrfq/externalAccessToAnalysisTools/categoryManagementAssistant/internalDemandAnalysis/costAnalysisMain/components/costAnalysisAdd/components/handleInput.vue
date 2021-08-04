<!--
 * @Author: youyuan
 * @Date: 2021-08-03 11:09:23
 * @LastEditTime: 2021-08-03 14:45:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\components\costAnalysisMain\components\costAnalysisAdd\components\handleInput.vue
-->
<template>
  <div>
    <iDialog :visible.sync="value" :title="language('SHOUGONGSHURUSHUZHI', '手工输入数值')" width="20%" @close="handleCloseDialog">
      <el-form ref="form" :model="form" label-position="left" label-width="130px" style="paddingBottom: 10px;">
        <el-form-item :label="language('YUANCAILIAOSANJIANCHENGBEN', '原材料/散件成本')">
          <iInput v-model="form.rawMaterial"  :placeholder="language('QINGSHURU', '请输入')"></iInput>
        </el-form-item>
        <el-form-item :label="language('ZHIZAOCHENGBEN', '制造成本')">
          <iInput v-model="form.manufacture" :placeholder="language('QINGSHURU', '请输入')"></iInput>
        </el-form-item>
        <el-form-item :label="language('BAOFEICHENGBEN', '报废成本')">
          <iInput v-model="form.scrap" :placeholder="language('QINGSHURU', '请输入')"></iInput>
        </el-form-item>
        <el-form-item :label="language('GUANLIFEI', '管理费')">
          <iInput v-model="form.manageCost" :placeholder="language('QINGSHURU', '请输入')"></iInput>
        </el-form-item>
        <el-form-item :label="language('QITAFEIYONG', '其他费用')">
          <iInput v-model="form.otherCost" :placeholder="language('QINGSHURU', '请输入')"></iInput>
        </el-form-item>
        <el-form-item :label="language('LIRUN', '利润')">
          <iInput v-model="form.profit" :placeholder="language('QINGSHURU', '请输入')"></iInput>
        </el-form-item>
        <el-form-item style="textAlign: right">
          <iButton @click="clickSubmit">{{language('SHENGCHENG', '生成')}}</iButton>
        </el-form-item>
      </el-form>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iInput, iButton } from 'rise'
export default {
  name: '',
  components: {
    iDialog,
    iInput,
    iButton,
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      form: {}
    }
  },
  created() {
  },
  methods: {
    // 关闭弹窗
    handleCloseDialog() {
      this.$emit('handleCloseDialog')
    },
    // 点击生成按钮
    clickSubmit() {
      this.handleCloseDialog()
      this.$emit('handleSubmitDialog', this.form)
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep .el-form--label-left .el-form-item__label {
    font-weight: bold;
}
 
</style>

