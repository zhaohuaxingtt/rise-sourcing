<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 11:24:15
 * @LastEditTime: 2021-08-18 17:33:47
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\batchSupplier\marks.vue
-->
<template>
      <iDialog :title="language('BEIZHU','备注')" :visible.sync="value" width="600px" @close='clearDiolog' top="40vh">
        <div class="changeContent">
          <!-- <span class="fontSize14">{{ language('QSRBZ','请输入备注') }}：</span> -->
          <iInput v-model='inquiryBuyer' type="textarea" rows="8"></iInput>
        </div>
        <span slot="footer" class="dialog-footer">
          <iButton @click="$emit('input',false)">{{language('LK_QUXIAO','取 消')}}</iButton>
          <iButton :loading='repeatClick' @click="sureChangeItems">{{language('LK_QUEREN','确认')}}</iButton>
        </span>
      </iDialog>
</template>
<script>
import {iInput,iButton,iDialog} from 'rise'
export default{
  components:{iButton,iDialog,iInput},
  props:{
    value:{type:Boolean},
    repeatClick:Boolean
  },
  data(){
      return {
      inquiryBuyer:"",
    }
  },
  methods:{
    clearDiolog(){
      this.inquiryBuyer = ""
      this.$emit('input',false)
    },
    sureChangeItems(){
      this.$emit('sure',this.inquiryBuyer)
    },
    getMarkdefalut(mark){
      this.inquiryBuyer=mark
    }
  }
}
</script>
<style lang='scss' scoped>
  .changeContent{
    display: flex;
    padding-bottom: 20px;
    span{
      display: inline-block;
      width: 140px;
      font-size: 14px;
      height: 35px;
      line-height: 35px;
    }
  }
</style>
