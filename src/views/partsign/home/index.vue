<!--
 * @Author: yuszhou
 * @Date: 2021-02-24 09:17:57
 * @LastEditTime: 2021-02-24 16:55:05
 * @LastEditors: Please set LastEditors
 * @Description: 零件签收列表界面.
 * @FilePath: \rise\src\views\partsign\index.vue
-->
<template>
  <iPage>
    <!------------------------------------------------------------------------>
    <!--                  table模块，向外入参表格数据，表头                    --->
    <!------------------------------------------------------------------------>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <iButton @click='save'>签收</iButton>
        <iButton @click="openDiologBack">退回</iButton>
        <iButton @click="openDiologChangeItems">转派</iButton>
      </div>
    </div>
    <!------------------------------------------------------------------------>
    <!--                  table模块，向外入参表格数据，表头                    --->
    <!------------------------------------------------------------------------>
    <iCard>
      <tablelist :tableData='tableListData' :tableTitle='tableTitle' :tableLoading='tableLoading' @handleSelectionChange='handleSelectionChange'></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <el-pagination
        @size-change="handleSizeChange($event,getTableList)"
        @current-change="handleCurrentChange($event,getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.total"/>
    </iCard>
      <!------------------------------------------------------------------------>
      <!--                  转派弹出框                                         --->
      <!------------------------------------------------------------------------>
      <el-dialog title="新建信息单转派" :visible.sync="diologChangeItems" width="400px" @close='clearDiolog'>
        <div class="changeContent">
          <span class="fontSize14">采购员：</span>
          <iSelect v-model='inquiryBuyer' placeholder='请选择询价采购员'>
            <el-option v-for="(items,index) in inquiryBuyerList" :key='index' :value='JSON.stringify(items)' :label="items.label"/>
          </iSelect>
        </div>
        <span slot="footer" class="dialog-footer">
          <iButton @click="diologChangeItems = false">取 消</iButton>
          <iButton @click="sureChangeItems">确 定</iButton>
        </span>
      </el-dialog>
      <!------------------------------------------------------------------------>
      <!--                  退回弹出框                                         --->
      <!------------------------------------------------------------------------>
      <el-dialog title="新建信息单退回" :visible.sync="diologBack" width="400px" @close='clearDiolog'>
         <iInput v-model='backmark' show-word-limit class="textarea" :autosize='{minRows:4}' placeholder='请填写退回理由，退回理由为必填' maxLength='200' type='textarea'></iInput>
         <span slot="footer" class="dialog-footer">
          <iButton @click="diologBack = false">取 消</iButton>
          <iButton @click="sureBackmark">确 定</iButton>
        </span>
      </el-dialog>
  </iPage>
</template>
<script>
import {iPage,iButton,iCard,iMessage,iInput,iSelect} from '@/components'
import tablelist from './components/tablelist'
import {tableTitle} from './components/data'
import {getTabelData,getInquiryBuyerList} from '@/api/partsign/home'
import {pageMixins} from '@/utils/pageMixins'
export default{
  components:{iPage,tablelist,iButton,iCard,iInput,iSelect},
  mixins:[pageMixins],
  data(){
    return {
      tableListData:[],
      tableTitle:tableTitle,
      tableLoading:false,
      selectTableData:[],
      diologChangeItems:false,
      diologBack:false,
      backmark:'',
      inquiryBuyer:'',
      inquiryBuyerList:[]
    }
  },
  created(){
    this.getTableList()
    this.getInquiryBuyerListFn()
  },
  methods:{
    //获取询价采购员数据。
    getInquiryBuyerListFn(){
      getInquiryBuyerList().then(res=>this.inquiryBuyerList = res.data)
    },
    //获取表格数据
    getTableList(){
      this.tableLoading = true
      getTabelData().then(res=>{this.tableListData = res.data;this.tableLoading = false})
    },
    //修改表格改动列
    handleSelectionChange(val){
      this.selectTableData = val
    },
    //签收
    save(){
      if(this.selectTableData.length == 0) return iMessage.warn('抱歉，您当前还未选择您需要签收的信息单！')
      console.log(this.selectTableData)
    },
    //退回
    openDiologBack(){
      if(this.selectTableData.length == 0) return iMessage.warn('抱歉，您当前还未选择您需要退回的信息单！')
      this.diologBack = true
    },
    //转派
    openDiologChangeItems(){
      if(this.selectTableData.length == 0) return iMessage.warn('抱歉，您当前还未选择您需要转派的信息单！')
      this.diologChangeItems = true;
    },
    sureBackmark(){
      if(this.backmark == '') return iMessage.warn('抱歉，您当前还未填写退回理由！')
      this.diologBack = false
    },
    sureChangeItems(){
      this.diologChangeItems = false
    },
    clearDiolog(){
      this.backmark = ''
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
