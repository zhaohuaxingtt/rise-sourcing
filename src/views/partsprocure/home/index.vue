<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 09:50:42
 * @LastEditTime: 2021-02-25 12:00:19
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目建立首页。
 * @FilePath: \rise\src\views\partsprocure\home\index.vue
-->
<template>
  <iPage>
    <!------------------------------------------------------------------------>
    <!--                  table模块，向外入参表格数据，表头                    --->
    <!------------------------------------------------------------------------>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <iButton>生成Fs/GsNr</iButton>
        <iButton>取消零件采购</iButton>
        <iButton>批量维护</iButton>
        <iButton>启动询价</iButton>
        <iButton @click="changeItems">转派</iButton>
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
        @size-change="handleSizeChange($event,getTableListFn)"
        @current-change="handleCurrentChange($event,getTableListFn)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.total"/>
    </iCard>
  </iPage>
</template>
<script>
import {iPage,iButton,iCard} from '@/components'
import {pageMixins} from '@/utils/pageMixins'
import {tableTitle} from './component/data'
import tablelist from '../../partsign/home/components/tablelist'
import {getTabelData} from '@/api/partsprocure/home'
export default{
  components:{iPage,iButton,iCard,tablelist},
  mixins:[pageMixins],
  data(){
    return {
      tableListData:[],
      tableLoading:false,
      tableTitle:tableTitle
    }
  },
  created(){
    this.getTableListFn();
  },
  methods:{
    handleSelectionChange(val){

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
