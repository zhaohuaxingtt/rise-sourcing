<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 09:50:42
 * @LastEditTime: 2021-03-01 11:19:22
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目建立首页。
 * @FilePath: \rise\src\views\partsprocure\home\index.vue
-->
<template>
  <iPage>
    <!------------------------------------------------------------------------>
    <!--                  table模块，向外入参表格数据，表头                    --->
    <!------------------------------------------------------------------------>
    <iCard>
    <!------------------------------------------------------------------------>
    <!--                  table模块，向外入参表格数据，表头                    --->
    <!------------------------------------------------------------------------>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">新建信息单签收</span>
        <div class="floatright">
          <iButton>生成Fs/GsNr</iButton>
          <iButton>取消零件采购</iButton>
          <iButton>批量维护</iButton>
          <iButton>启动询价</iButton>
          <iButton @click="openDiologChangeItems">转派</iButton>
        </div>
      </div>
      <tablelist :tableData='tableListData' :tableTitle='tableTitle' :tableLoading='tableLoading' @handleSelectionChange='handleSelectionChange'></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
        @size-change="handleSizeChange($event,getTableListFn)"
        @current-change="handleCurrentChange($event,getTableListFn)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.total"/>
    </iCard>
      <!------------------------------------------------------------------------>
      <!--                  转派弹出框                                         --->
      <!------------------------------------------------------------------------>
      <changeItems v-model="diologChangeItems" @sure='sureChangeItems' title='零件采购项目转派'></changeItems>
  </iPage>
</template>
<script>
import {iPage,iButton,iCard,iMessage,iPagination} from '@/components'
import {pageMixins} from '@/utils/pageMixins'
import {tableTitle} from './component/data'
import tablelist from '../../partsign/home/components/tablelist'
import {getTabelData} from '@/api/partsprocure/home'
import changeItems from '../../partsign/home/components/changeItems'
export default{
  components:{iPage,iButton,iCard,tablelist,changeItems,iPagination},
  mixins:[pageMixins],
  data(){
    return {
      tableListData:[],
      tableLoading:false,
      tableTitle:tableTitle,
      selectTableData:[],
      diologChangeItems:false
    }
  },
  created(){
    this.getTableListFn();
  },
  methods:{
    //转派
    openDiologChangeItems(){
      if(this.selectTableData.length == 0) return iMessage.warn('抱歉，您当前还未选择您需要转派的零件采购项目！')
      this.diologChangeItems = true;
    },
    //确认转派弹窗值。
    sureChangeItems(val){
      console.log(val)
      this.diologChangeItems = false;
      this.getTableListFn()
    },
    //表格选中值集
    handleSelectionChange(val){
      this.selectTableData = val
    },
    getTableListFn(){
      this.tableLoading = true
      getTabelData().then(res=>{
        this.tableListData = res.data;
        this.tableLoading = false
        }).catch(()=>this.tableLoading=false)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
