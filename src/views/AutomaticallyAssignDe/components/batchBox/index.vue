<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 11:24:15
 * @LastEditTime: 2021-07-09 13:49:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\home\components\changeItems.vue
-->
<template>
      <iDialog :title="title || language('LK_XINJIANXINXIDANZHUANPAI','新件信息单转派')" :visible.sync="value" width="400px" @close='clearDiolog' top="40vh">
        <div class="changeContent">
          <span class="fontSize14">{{language('LK_FENPEIKESHI','分配科室')}}：</span>
          <iSelect v-model='inquiryBuyer' :placeholder="language('LK_QINGXUANZHEXUNJIACAIGOUYUAN','请选择询价采购员')" value-key="id">
           <el-option v-for="(items,index) in inquiryBuyerList" :key='index' :value='items' :label="items.nameZh"/>
          </iSelect>
        </div>
        <span slot="footer" class="dialog-footer">
          <iButton @click="$emit('input',false)">{{language('LK_QUXIAO','取 消')}}</iButton>
          <iButton :loading='repeatClick' @click="sureChangeItems">{{language('LK_QUEREN','确认')}}</iButton>
        </span>
      </iDialog>
</template>
<script>
import {iSelect,iButton,iMessage,iDialog} from 'rise'
import {purchaseUsers} from '@/api/usercenter'
import store from '@/store'
export default{
  components:{iSelect,iButton,iDialog},
  props:{
    title:{type:String,default:''},
    value:{type:Boolean},
    repeatClick:Boolean
  },
  data(){
    return {
		inquiryBuyer:{id:"",nameZh:""},
		inquiryBuyerList:[],
		// list:[{id:12,nameZh:"舒杰"},{id:13,nameZh:"周瑜松"}]
	}
  },
  created(){
    this.getInquiryBuyerListFn()
  },
  methods:{
    //获取询价采购员数据。
    getInquiryBuyerListFn(){
      purchaseUsers({userId:store.state.permission.userInfo.id}).then(res=>this.inquiryBuyerList = res.data || [])
    },
    clearDiolog(){
      this.inquiryBuyer = {}
      this.$emit('input',false)
    },
    sureChangeItems(){
		// console.log(this.inquiryBuyer);
      if(!this.inquiryBuyer.id) return iMessage.warn(this.language('LK_NINDANGQIANHAIWEIXUANZEXUNJIACAIGOUYUAN','抱歉！您当前还未选择询价采购员！'))
      this.$emit('sure',this.inquiryBuyer)
    }
  }
}
</script>
<style lang='scss' scoped>
  .changeContent{
    display: flex;
    padding: 20px 10px 20px 10px;
    span{
      display: inline-block;
      width: 140px;
      font-size: 14px;
      height: 35px;
      line-height: 35px;
    }
  }
</style>
