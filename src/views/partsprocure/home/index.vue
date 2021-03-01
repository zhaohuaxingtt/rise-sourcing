<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 09:50:42
 * @LastEditTime: 2021-03-01 15:51:27
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目建立首页。
 * @FilePath: \rise\src\views\partsprocure\home\index.vue
-->
<template>
  <iPage>
    <div class="margin-bottom20">
      <iNav-mvp @change="change" right></iNav-mvp>
    </div>
    <!------------------------------------------------------------------------>
    <!--                  search 搜索模块                                   --->
    <!------------------------------------------------------------------------>
    <iSearch class="margin-bottom20">
      <el-form>
        <el-form-item label="零件号">
						<iInput placeholder='请输入零件号,多个逗号分隔'></iInput>
				</el-form-item>
        <el-form-item label="零件名（中）">
						<iInput placeholder='请输入零件名（中）'></iInput>
				</el-form-item>
        <el-form-item label="FSNR/GSNR/SPNR">
						<iInput placeholder='请输入FSNR/GSNR/SPNR'></iInput>
				</el-form-item>
        <el-form-item label="询价采购员">
							<iSelect placeholder='请选择询价采购员'></iSelect>
				</el-form-item>
        <el-form-item label="LINIE">
							<iInput placeholder='请填写LINIE'></iInput>
				</el-form-item>
        <el-form-item label="零件状态">
							<iSelect placeholder='请选择零件状态'></iSelect>
				</el-form-item>
        <el-form-item label="信息单状态">
						<iSelect placeholder='请选择信息单状态'></iSelect>
				</el-form-item>
        <el-form-item label="车型">
						<iSelect placeholder='请选择车型'></iSelect>
				</el-form-item>
        <el-form-item label="车型项目">
						<iSelect placeholder='请选择车型项目'></iSelect>
				</el-form-item>
        <el-form-item label="零件项目类型">
						<iSelect placeholder='请选择零件项目类型'></iSelect>
				</el-form-item>
        <el-form-item label="采购工厂">
						<iSelect placeholder='请选择采购工厂'></iSelect>
				</el-form-item>
        <el-form-item label="显示自己">
						<div class="checkBox">
              <el-checkbox></el-checkbox>
            </div>
				</el-form-item>
      </el-form>
    </iSearch>
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
      <tablelist :tableData='tableListData' :tableTitle='tableTitle' :tableLoading='tableLoading' @handleSelectionChange='handleSelectionChange' @openPage='openPage'></tablelist>
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
import {iPage,iButton,iCard,iMessage,iPagination,iNavMvp,iSearch,iInput,iSelect} from '@/components'
import {pageMixins} from '@/utils/pageMixins'
import {tableTitle} from './component/data'
import tablelist from '../../partsign/home/components/tableList'
import {getTabelData} from '@/api/partsprocure/home'
import changeItems from '../../partsign/home/components/changeItems'
export default{
  components:{iPage,iButton,iCard,tablelist,changeItems,iPagination,iNavMvp,iSearch,iInput,iSelect},
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
    openPage(){
      this.$router.push({
        path:'/partsprocure/editordetail'
      })
    },
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
  .checkBox{
    position: relative;
    top: 30px;
    left: -70px;
  }
</style>
