<!--
 * @Author: Luoshuang
 * @Date: 2021-09-24 10:36:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-05 10:37:03
 * @Description: 指示灯修改弹窗
 * @FilePath: \front-sourcing\src\views\project\progressmonitoring\monitorDetail\components\changeLight\index.vue
-->

<template>
  <iDialog 
    :title="language('FENGXIANDENGJITIAOZHENG','风险等级调整')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="saveLoading">{{language('QUEDING','确定')}}</iButton>
      <iButton @click="clearDialog">{{language('QUXIAO','取消')}}</iButton>
    </template>
    <el-form label-position="top">
      <el-form-item class="formItem-inRow" >
        <span slot="label"><span class="margin-right5" style="color:red;font-size:14px">*</span>{{language('FENGXIANDENGJI','风险等级')}}:</span>
        <iSelect v-model="delayLevelPro" :placeholder="language('QINGXUANZE','请选择')" style="width:220px" >
          <el-option
            v-for="item in lightOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option> 
        </iSelect> 
      </el-form-item>
      <el-form-item>
        <span slot="label"><span class="margin-right5" style="color:red;font-size:14px">*</span>{{language('TIAOZHENGBEIZHU','调整备注')}}:</span>
        <iInput v-model="actionPlan" :placeholder="language('QINGSHURUTIAOZHENGBEIZHU','请输入调整备注') + ':'" type="textarea" :rows="6" resize="none" ></iInput> 
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iInput, iMessage } from 'rise'
export default {
  components: { iDialog, iButton, iSelect, iInput },
  props: {
    dialogVisible: { type: Boolean, default: false },
    // delayLevelPro: {type:String},
    // actionPlan: {type:String}
  },
  data() {
    return {
      lightOption: [
        {value: '1', label: this.language('WUFENGXIANLVDENG', '无风险(绿灯)')},
        {value: '2', label: this.language('DIFENGXIANHUANGDENG', '中风险(黄灯)')},
        {value: '3', label: this.language('GAOFENGXIANHONGDENG', '高风险(红灯)')}
      ],
      loading: false,
      saveLoading: false,
      delayLevelPro: '',
      actionPlan: ''
    }
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        this.actionPlan = ''
        this.delayLevelPro = ''
      }
    }
  },
  methods: {
    clearDialog() {
      this.actionPlan = ''
      this.delayLevelPro = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      if (!this.delayLevelPro || this.delayLevelPro == '') {
        iMessage.warn(this.language('LKQINGXUANZEYUJINGDENGYANSE', '请选择预警灯颜色'))
        return
      }
      if (!this.actionPlan || this.actionPlan == '') {
        iMessage.warn(this.language('QINGSHURUTIAOZHENGBEIZHU', '请输入调整备注'))
        return
      }
      this.saveLoading = true
      this.$emit('handleActionPlan', this.delayLevelPro, this.actionPlan)
    },
    changeSaveLoading(loading) {
      this.saveLoading = loading
    }
  }
}
</script>

<style lang="scss" scoped>
.formItem-inRow {
  display: flex;
  margin-bottom: 0;
  ::v-deep .el-form-item__label {
    margin-right: 20px;
  }
}
</style>