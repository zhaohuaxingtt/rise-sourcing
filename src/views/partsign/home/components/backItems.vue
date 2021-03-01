<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 11:24:30
 * @LastEditTime: 2021-03-01 12:05:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\home\components\backItems.vue
-->
<template>
    <iDialog :title="title" :visible.sync="value" width="400px" @close='clearDiolog'>
         <iInput v-model='backmark' show-word-limit class="textarea" :autosize='{minRows:4}' placeholder='请填写理由，该输入框为必填' maxLength='200' type='textarea'></iInput>
         <span slot="footer" class="dialog-footer">
          <iButton :loading='repeatClick' @click="sureBackmark">确 定</iButton>
          <iButton @click="$emit('input',false)">取 消</iButton>
        </span>
      </iDialog>
</template>
<script>
import {iInput,iButton,iMessage,iDialog} from '@/components' 
export default{
  components:{iInput,iButton,iDialog},
  props:{
    value:{type:Boolean},
    title:{type:String,default:'新件信息单退回'},
    repeatClick:Boolean
  },
  data(){
    return {
      backmark:''
    }
  },
  methods:{
    sureBackmark(){
      if(this.backmark == '') return iMessage.warn('抱歉，理由不能为空！')
      this.$emit('sure',this.backmark)
    },
    clearDiolog(){this.$emit('input',false);this.backmark=''},
  }
}
</script>
<style lang='scss' scoped>
</style>
