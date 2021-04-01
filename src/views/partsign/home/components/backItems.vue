<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 11:24:30
 * @LastEditTime: 2021-03-18 22:50:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\home\components\backItems.vue
-->
<template>
    <iDialog :title="$t(title)" :visible.sync="value" width="400px" @close='clearDiolog'>
         <iInput v-model='backmark' show-word-limit class="textarea" :autosize='{minRows:4}' :placeholder="$t('LK_QINGTIANXIELIYOUSHURUKUANGBITIAN')" maxLength='200' type='textarea'></iInput>
         <span slot="footer" class="dialog-footer">
           <iButton @click="$emit('input',false)">{{$t("LK_QUXIAO")}}</iButton>
          <iButton :loading='repeatClick' @click="sureBackmark">{{$t('LK_QUEREN')}}</iButton>
        </span>
      </iDialog>
</template>
<script>
import {iInput,iButton,iMessage,iDialog} from '@/components' 
export default{
  components:{iInput,iButton,iDialog},
  props:{
    value:{type:Boolean},
    title:{type:String,default:'LK_XINJIANXINXIDANTUIHUI'},
    repeatClick:Boolean
  },
  data(){
    return {
      backmark:''
    }
  },
  methods:{
    sureBackmark(){
      if(this.backmark == '') return iMessage.warn(this.$t('LK_LIYOUBUNENGWEIKONG'))
      this.$emit('sure',this.backmark)
    },
    clearDiolog(){this.$emit('input',false);this.backmark=''},
  }
}
</script>
<style lang='scss' scoped>
</style>
