<!--
 * @Author: YUSZHOU
 * @Date: 2021-05-24 17:17:01
 * @LastEditTime: 2021-06-29 16:37:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\createparts\components\factoryrelocate\index.vue
-->
<template>
    <iCard class="margin-top60">
      <div class="textalineright margin-bottom20">
        <iButton>{{language('DUNLOADTEMPATE','下载模板')}}</iButton>
        <iButton>{{language('UPLOADFILE','上传文件')}}</iButton>
      </div> 
      <el-table v-loading='tablaLoading' :data='tableData'>
        <template v-for="(items,index) in tableFileTitle">
          <el-table-column align="center" :prop="items.props" :label="language(items.key,items.name)" :key='index'></el-table-column>
        </template>
      </el-table>  
      <iPagination
        class="pagination margin-top30"
        @size-change="handleSizeChange($event, factoryTranslate)"
        @current-change="handleCurrentChange($event, factoryTranslate)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
	      v-update
      />
    </iCard> 
</template>

<script>
import {iCard,iButton,iPagination} from 'rise'
import {tableFileTitle} from './components/data'
import { pageMixins } from "@/utils/pageMixins";
import {factoryTranslate} from '@/api/partsprocure/editordetail'
export default {
  components:{iCard,iButton,iPagination},
  mixins:[pageMixins],
  data(){
    return {
      tableData:[],
      tableFileTitle:tableFileTitle,
      tablaLoading:false
    }
  },
  created(){this.factoryTranslate()},
  methods:{
    factoryTranslate(){
      this.tablaLoading = true
      factoryTranslate().then(res=>{
        this.tablaLoading = false
        this.tableData = res.list
      }).catch(err=>{
        this.tablaLoading = false
        //iMessage.error()
      })
    }
  }
}
</script>

<style>
  .textalineright{
    text-align: right;
  }
</style>