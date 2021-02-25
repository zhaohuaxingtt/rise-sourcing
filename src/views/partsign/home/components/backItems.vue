<!--
 * @Author: your name
 * @Date: 2021-02-25 11:24:30
 * @LastEditTime: 2021-02-25 13:54:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\home\components\backItems.vue
-->
<template>
    <el-dialog :title="title" :visible.sync="value" width="400px" @close='clearDiolog'>
         <iInput v-model='backmark' show-word-limit class="textarea" :autosize='{minRows:4}' placeholder='请填写退回理由，退回理由为必填' maxLength='200' type='textarea'></iInput>
         <span slot="footer" class="dialog-footer">
          <iButton @click="$emit('input',false)">取 消</iButton>
          <iButton :loading='repeatClick' @click="sureBackmark">确 定</iButton>
        </span>
      </el-dialog>
</template>
<script>
import {iInput,iButton,iMessage} from '@/components' 
export default{
  components:{iInput,iButton},
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
      if(this.backmark == '') return iMessage.warn('抱歉，您当前还未填写退回理由！')
      this.$emit('sure',this.backmark)
    },
    clearDiolog(){this.$emit('input',false);this.backmark=''},
  }
}
</script>
<style lang='scss' scoped>
</style>
