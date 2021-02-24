<!--
 * @Author: yuszhou
 * @Date: 2021-02-24 09:17:57
 * @LastEditTime: 2021-02-24 14:58:40
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
        <iButton>签收</iButton>
        <iButton>退回</iButton>
        <iButton>转派</iButton>
      </div>
    </div>
    <!------------------------------------------------------------------------>
    <!--                  table模块，向外入参表格数据，表头                    --->
    <!------------------------------------------------------------------------>
    <iCard>
      <tablelist :tableData='tableListData' :tableTitle='tableTitle' :tableLoading='tableLoading'></tablelist>
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
  </iPage>
</template>
<script>
import {iPage,iButton,iCard} from '@/components'
import tablelist from './components/tablelist'
import {tableTitle} from './components/data'
import {getTabelData} from '@/api/partsign/home'
import {pageMixins} from '@/utils/pageMixins'
export default{
  components:{iPage,tablelist,iButton,iCard},
  mixins:[pageMixins],
  data(){
    return {
      tableListData:[],
      tableTitle:tableTitle,
      tableLoading:false
    }
  },
  created(){this.getTableList()},
  methods:{
    getTableList(){
      this.tableLoading = true
      getTabelData().then(res=>{this.tableListData = res.data;this.tableLoading = false})
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
