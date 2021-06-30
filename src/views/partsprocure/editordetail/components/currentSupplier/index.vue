<!--
 * @Author: your name
 * @Date: 2021-06-23 11:59:22
 * @LastEditTime: 2021-06-28 15:14:01
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
        <iButton>{{language('DELETEHANG','删除行')}}</iButton>
        <iButton>{{language('SAVE','保存')}}</iButton>
        <iButton @click="edit = true">{{language('REMOVE','取消')}}</iButton>
      </template>
    </div>
    <el-table :data='dataListTop' v-loading='loadingTop'>
      <template v-for='(items,index) in titleListTop'>
        <el-table-column align="center" :key='index' :label='language(items.key,items.name)' :prop='items.props'>
          <template slot-scope="scope">
              <template v-if='items.props == "ratio"' >
                  <span v-if='!edit'>{{scope.row[items.props]}}</span>
                  <iInput v-else v-model="scope.row[items.props]"></iInput>
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
        <iButton>{{language('ADD','添加')}}</iButton>
    </template>
      <el-form>
        <el-form-item :label='language("PART1NUMBER","零件号")'>
          <iInput></iInput>  
        </el-form-item>
        <el-form-item :label="language('CAIGOUGONGC','采购工厂')">
          <iSelect>
            <el-option></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('GONGYSSAPNUMBER','供应商SAP号')">
          <iInput></iInput>  
        </el-form-item>
        <el-form-item :label="language('GONGYINGHSANGNAME','供应商名称')">
          <iInput></iInput>  
        </el-form-item>
      </el-form>
    </iSearch> 
    <el-table :data='dataListBottom' v-loading='loadingBottom'>
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
import {supplierCurentBottom,supplierCurentTop} from '@/api/partsprocure/editordetail'
import {pageMixins} from "@/utils/pageMixins";
export default{
  components:{iDialog,iButton,iInput,iSelect,iSearch,iPagination},
  mixins:[pageMixins],
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

      },
      dataListTop:[],
      dataListBottom:[],
      loadingTop:false,
      loadingBottom:false
    }
  },
  created(){
    this.supplierCurentTop()
    this.supplierCurentBottom()
  },
  methods:{
    /**
     * @description: 已经维护过的现价供应商查询
     * @param {*}
     * @return {*}
     */
    supplierCurentTop(){
      this.loadingTop = true
      supplierCurentTop().then(res=>{
        if(res.code == 200 && res.data){
          this.loadingTop = false
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
      supplierCurentBottom().then(res=>{
        if(res.code == 200 && res.data){
          this.loadingBottom = false
          this.dataListBottom = res.data
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