<!--
 * @Author: your name
 * @Date: 2021-06-23 11:59:22
 * @LastEditTime: 2021-07-19 19:29:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\currentSupplier\index.vue
-->
<template>
  <iDialog :visible.sync="dialogVisible.show" :title="language('WEIHUXGGYX','维护现供供应商')" width='80%'>
    <div class="search margin-bottom20">
      <template v-if='edit'>
        <iButton @click="edit = false">{{language('EDITBTN','编辑')}}</iButton>
      </template>
      <template v-else>
        <iButton @click='deleteRow'>{{language('DELETEHANG','删除行')}}</iButton>
        <iButton @click='saveAll'>{{language('SAVE','保存')}}</iButton>
        <iButton @click="edit = true">{{language('REMOVE','取消')}}</iButton>
      </template>
    </div>
    <el-table :data='dataListTop.filter(items=>!items.isDelete)' v-loading='loadingTop' @selection-change="handleSelectionChangeTop">
      <el-table-column type='selection' v-if='!edit' align="center" width="56"></el-table-column>
      <template v-for='(items,index) in titleListTop'>
        <el-table-column align="center" :key='index' :label='language(items.key,items.name)' :prop='items.props'>
          <template slot-scope="scope">
              <template v-if='items.props == "qualtity"' >
                  <span v-if='edit'>{{scope.row[items.props]}}</span>
                  <iInput type='number' v-else v-model="scope.row[items.props]"></iInput>
              </template>
              <template v-else>
                {{scope.row[items.props]}}
              </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="line"></div>
    <iSearch :icon='false' class="searchCard margin-bottom20">
    <template slot='button'>
        <iButton @click='sure'>{{language('FIND','查询')}}</iButton>
        <iButton @click='reset'>{{language('REST','重置')}}</iButton>
        <iButton @click="addTop">{{language('ADD','添加')}}</iButton>
    </template>
      <el-form>
        <el-form-item :label='language("PART1NUMBER","零件号")'>
          <iInput v-model="searchForm.partNum"></iInput>  
        </el-form-item>
        <el-form-item :label="language('CAIGOUGONGC1','采购工厂')">
          <iSelect v-model="searchForm.procureFactoryId">
            <template v-for="(items,index) in factoryList">
                <el-option :key='index' :label="items.factoryName" :value="items.procureFactory"></el-option>
            </template>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('GONGYSSAPNUMBER','供应商SAP号')">
          <iInput v-model="searchForm.supplierSapCode"></iInput>  
        </el-form-item>
        <el-form-item :label="language('GONGYINGHSANGNAME','供应商名称')">
          <iInput v-model="searchForm.supplierName"></iInput>  
        </el-form-item>
      </el-form>
    </iSearch> 
    <el-table :data='dataListBottom' v-loading='loadingBottom' @selection-change="handleSelectionChangeBottom">
      <el-table-column type="selection" align="center" width="40"></el-table-column>
      <template v-for='(items,index) in titleListBottom'>
        <el-table-column align="center" :key='index' :label='language(items.key,items.name)' :prop='items.props'></el-table-column>
      </template>
    </el-table>
    <!------------------------------------------------------------------------>
    <!--                  表格分页                                          --->
    <!------------------------------------------------------------------------>
    <iPagination
        v-update
        @size-change="handleSizeChange($event, supplierCurentBottom)"
        @current-change="handleCurrentChange($event, supplierCurentBottom)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page='page.currPage'
        :total="page.totalCount"
    />
    <div style="height:20px;"></div> 
  </iDialog>
</template>
<script>
import {iDialog,iButton,iInput,iSelect,iSearch,iMessage,iPagination} from 'rise'
import {tableTileList,tabelTitleListLast} from './data'
import {supplierCurentBottom,supplierCurentTop,purchaseFactory,updateCurrentSupplierPage} from '@/api/partsprocure/editordetail'
import {pageMixins} from "@/utils/pageMixins";
export default{
  components:{iDialog,iButton,iInput,iSelect,iSearch,iPagination},
  mixins:[pageMixins],
  inject:['detailData'],
  props:{
    dialogVisible:{
      type:Object,
      default:()=>{}
    }
  },
  data(){
    return {
      edit:true,
      titleListTop:[...tableTileList,...tabelTitleListLast],
      titleListBottom:[...tableTileList],
      searchForm:{
        partNum:'',
        procureFactoryId:'',
        supplierSapCode:'',
        supplierName:''
      },
      dataListTop:[],
      dataListBottom:[],
      loadingTop:false,
      loadingBottom:false,
      factoryList:[],
      topSelect:[],
      bottomSelect:[]
    }
  },
  watch:{
    'dialogVisible.show':function(){
      this.topSelect = []
      this.bottomSelect = []
      this.dataListTop = []
      this.dataListBottom = []
      Object.keys(this.searchForm).forEach(element => {
        this.searchForm[element] = ''
      });
      this.searchForm.partNum = JSON.parse(this.$route.query.item).partNum
      this.supplierCurentTop()
      this.supplierCurentBottom()
      this.purchaseFactory()
    },
    'edit':function(val){
      if(val){
        this.topSelect = []
        this.bottomSelect = []
        this.dataListTop = []
        this.dataListBottom = []
        this.supplierCurentTop()
      }
    }
  },
  methods:{
    deleteRow(){
      if(this.topSelect.length == 0) return iMessage.warn(this.language('QINGXUANZEYIGELIE','请选择一条数据！'))
      this.dataListTop.forEach((value,index)=>{
        this.topSelect.forEach(i=>{
            if(i.deleteFlag == value.deleteFlag){
              value['isDelete'] = true
              this.$set(this.dataListTop,index,value)
            }
        })
      })
    },
    /**
     * @description: 上方表格保存
     * @param {*}
     * @return {*}
     */
    saveAll(){
      //if(this.dataListTop.length == 0 ) return iMessage.warn(this.language('NIHAWEIXUNAZXIAFANGGYS','请先添加供应商！'))
      updateCurrentSupplierPage({fsnrGsnrNum:this.detailData().fsnrGsnrNum,effectingSupplierDTOList:this.dataListTop}).then(res=>{
        console.log(res)
        if(res.code == 200){
          iMessage.success(this.language('CHAOZUOCHENGGONG','操作成功！'))
          this.supplierCurentTop()
        }else{
          iMessage.error(res.desZh)
        }
      }).catch(err=>{
        iMessage.error(err.desZh)
      })
    },  
    addTop(){
      if(this.bottomSelect.length == 0) return iMessage.warn(this.language('QINGXUANZEYIGELIE','请选择一条数据！'))
      this.bottomSelect.forEach(items=>{
        if(!this.dataListTop.find(i=>i.supplierId == items.supplierId)){
          this.dataListTop.push(items)
        }
      })
      this.dataListTop = Array.from(new Set(this.dataListTop))
    },
    handleSelectionChangeTop(res){this.topSelect = res},
    handleSelectionChangeBottom(res){this.bottomSelect = res},
    /**
     * @description: 重置操作
     * @param {*}
     * @return {*}
     */
    reset(){
      Object.keys(this.searchForm).forEach(element => {
        this.searchForm[element] = ''
      });
      this.searchForm.partNum = JSON.parse(this.$route.query.item).partNum
      this.supplierCurentBottom()
    },
    /**
     * @description: 确认查询
     * @param {*}
     * @return {*}
     */
    sure(){
      if(this.searchForm.procureFactoryId != '' && this.searchForm.supplierName == '' && this.searchForm.supplierSapCode == '' && this.searchForm.partNum == ""){
        iMessage.warn(this.language('QINGXUANZEQITAXINXI','请选择其他信息共同筛选!'))
      }
      this.supplierCurentBottom()
    },
    /**
     * @description: 获取采购工厂
     * @param {*}
     * @return {*}
     */
    purchaseFactory(){
      purchaseFactory().then(res=>{
        this.factoryList = res.data
      }).catch(err=>{
        iMessage.error(err.desZh)
      })
    },
    /**
     * @description: 已经维护过的现价供应商查询
     * @param {*}
     * @return {*}
     */
    supplierCurentTop(){
      this.loadingTop = true
      supplierCurentTop({fsnrGsnrNum:this.detailData().fsnrGsnrNum}).then(res=>{
        if(res.code == 200 && res.data){
          this.loadingTop = false
          res.data.forEach((items,index)=>items['deleteFlag'] = 'a'+index)
          this.dataListTop = res.data
        }
      }).catch(err=>{
        this.loadingTop = false
        iMessage.error(err.desZh)
        console.warn(err)
      })
    },
    /**
     * @description: 未维护过的现价供应商查询
     * @param {*}
     * @return {*}
     */
    supplierCurentBottom(){
      this.loadingBottom = true
      supplierCurentBottom({...this.searchForm,...this.page}).then(res=>{
        if(res.code == 200 && res.data){
          this.loadingBottom = false
          res.data.forEach((items,index)=>items['deleteFlag'] = 'b'+index)
          this.dataListBottom = res.data
          this.page.pageSize = res.pageSize
          this.page.currPage = res.currPage
          this.page.totalCount = res.totalCount
        }
      }).catch(err=>{
        this.loadingBottom = false
        iMessage.error(err.desZh)
        console.warn(err)
      })
    },
  }
}
</script>
<style lang='scss' scoped>
  .search{
    text-align: right;
    transition: all 0.5s;
  }
  .line{
    border-bottom: 2px dotted $color-border;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  .searchCard{
    box-shadow:inherit!important;
    ::v-deep .cardBody{
      padding: 0px!important;
    }
  }
</style>