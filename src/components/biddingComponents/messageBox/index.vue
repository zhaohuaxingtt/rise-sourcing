<!--
* @author:shujie
* @Date: 2021-4-20 16:01:53
* @Description: In User Settings Edit
 -->
<template>
    <iDialog :title="$t(title)" :visible.sync="value" :width="width" @close='clearDiolog'>
		<p class="tip margin-bottom10">{{tip}}</p>
         <iInput v-model='backmark' show-word-limit class="textarea" :autosize='{minRows:4}' :placeholder="$t(placeholder)" :type='type'></iInput>
         <span slot="footer" class="dialog-footer">
           <iButton @click="clearDiolog">{{$t("LK_QUXIAO")}}</iButton>
          <iButton :loading='repeatClick' @click="sureBackmark">{{$t('LK_QUEREN')}}</iButton>
        </span>
      </iDialog>
</template>
<script>
import {iInput,iButton,iMessage,iDialog} from 'rise' 
export default{
  components:{iInput,iButton,iDialog},
  props:{
    value:{type:Boolean},
    title:{type:String},
    tip:{type:String},
    repeatClick:Boolean,
    type:{type:String,default:'input'},
    placeholder:{type:String,default:'LK_QINGSHURU'},
    error:{type:String,default:''},
    width:{type:String,default:'400px'},
    required:{type:Boolean,default:true}
  },
  data(){
    return {
      backmark:''
    }
  },
  methods:{
  sureBackmark(){
    if(this.backmark == '' && this.required) return iMessage.warn(this.error)
    this.$emit('sure',this.backmark)
  },
	clearDiolog(){this.$emit('input',false);this.backmark=''},
	// 修改input默认值
	changeBackmark(remarks){
		console.log(remarks);
		this.backmark=remarks
	}
  }
}
</script>
<style lang='scss' scoped>
	.tip{
		font-size: 14px;
		color: $color-black;
	}
</style>
