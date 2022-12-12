<!--
 * @Author: Luoshuang
 * @Date: 2021-12-14 13:39:10
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-12 12:24:06
 * @Description: 退回弹窗
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\signin\components\sendBack.vue
-->

<template>
  <iDialog 
    :title="language('请输入驳回意见(必填)','请输入驳回意见(必填)')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="30%"
  >
    <template slot="footer">
      <iButton @click="clearDialog">{{language('QUXIAO','取消')}}</iButton>
      <iButton @click="handleConfirm" :loading="saveLoading">{{language('QUEREN','确认')}}</iButton>
    </template>
    <iInput v-model="remark" :placeholder="language('QINGSHURU','请输入')" type="textarea" :rows="6" resize="none" ></iInput> 
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput, iMessage } from 'rise'
import {
  approvalReturn,
} from "@/api/SELTargetPrice";
export default {
  components: { iDialog, iButton, iInput },
  props: {
    dialogVisible: { type: Boolean, default: false },
    selectItems: { type: Array, default:()=>[]}
  },
  watch:{
    dialogVisible(val) {
      if(val) {
        this.remark = ''
      }
    }
  },
  data() {
    return {
      backType: '',
      remark: '',
      saveLoading: false
    }
  },
  methods: {
    clearDialog() {
      this.remark = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      this.saveLoading = true
      approvalReturn({
        remark:this.remark,
        taskId: this.selectItems.map((item) => item.rfqId),
      }).then(res=>{
        if(res?.code=='200'){
          iMessage.success('操作成功')
          this.clearDialog()
          this.$emit('getTableList')
        }
      }).finally(()=>{
        this.saveLoading = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>