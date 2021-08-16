<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 11:24:30
 * @LastEditTime: 2021-07-07 16:03:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\home\components\backItems.vue
-->
<template>
    <iDialog :title="title || language('LK_XINJIANXINXIDANTUIHUI','新件信息单退回')" :visible.sync="value" width="400px" @close='clearDiolog'>
         <iInput v-model='backmark' show-word-limit class="textarea" :autosize='{minRows:4}' :placeholder="language('LK_QINGTIANXIELIYOUSHURUKUANGBITIAN','请填写理由，该输入框为必填')" maxLength='200' type='textarea'></iInput>
         <span slot="footer" class="dialog-footer">
           <iButton @click="$emit('input',false)">{{language("LK_QUXIAO",'取 消')}}</iButton>
          <iButton :loading='repeatClick' @click="sureBackmark">{{language('LK_QUEREN','确认')}}</iButton>
        </span>
      </iDialog>
</template>
<script>
import {iInput,iButton,iMessage,iDialog} from 'rise' 
export default{
  components:{iInput,iButton,iDialog},
  props:{
    value:{type:Boolean},
    title:{type:String,default:''},
    repeatClick:Boolean
  },
  data(){
    return {
      backmark:''
    }
  },
  methods:{
    sureBackmark(){
      if(this.backmark == '') return iMessage.warn(this.language('LK_LIYOUBUNENGWEIKONG','抱歉，理由不能为空！'))
      this.$emit('sure',this.backmark)
    },
    clearDiolog(){this.$emit('input',false);this.backmark=''},
  }
}
</script>
<style lang='scss' scoped>
</style>
