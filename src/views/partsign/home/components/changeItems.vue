<!--
 * @Author: your name
 * @Date: 2021-02-25 11:24:15
 * @LastEditTime: 2021-02-25 11:59:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\home\components\changeItems.vue
-->
<template>
      <el-dialog title="新建信息单转派" :visible.sync="value" width="400px" @close='clearDiolog'>
        <div class="changeContent">
          <span class="fontSize14">采购员：</span>
          <iSelect v-model='inquiryBuyer' placeholder='请选择询价采购员'>
            <el-option v-for="(items,index) in inquiryBuyerList" :key='index' :value='JSON.stringify(items)' :label="items.label"/>
          </iSelect>
        </div>
        <span slot="footer" class="dialog-footer">
          <iButton @click="$emit('input',false)">取 消</iButton>
          <iButton @click="sureChangeItems">确 定</iButton>
        </span>
      </el-dialog>
</template>
<script>
import {iSelect,iButton,iMessage} from '@/components'
import {getInquiryBuyerList} from '@/api/partsign/home'
export default{
  components:{iSelect,iButton},
  props:{
    value:{type:Boolean}
  },
  data(){
    return {inquiryBuyer:'',inquiryBuyerList:[]}
  },
  created(){
    this.getInquiryBuyerListFn()
  },
  methods:{
    //获取询价采购员数据。
    getInquiryBuyerListFn(){
      getInquiryBuyerList().then(res=>this.inquiryBuyerList = res.data)
    },
    clearDiolog(){
      this.inquiryBuyer = ''
      this.$emit('input',false)
    },
    sureChangeItems(){
      if(this.inquiryBuyer == '') return iMessage.warn('抱歉！您当前还未选择询价采购员！')
      this.$emit('sure',JSON.parse(this.inquiryBuyer))
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
      width: 80px;
      font-size: 14px;
      height: 35px;
      line-height: 35px;
    }
  }
</style>
