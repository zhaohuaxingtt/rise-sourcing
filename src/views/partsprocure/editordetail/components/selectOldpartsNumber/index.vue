<!--
 * @Author: your name
 * @Date: 2021-08-02 20:05:09
 * @LastEditTime: 2021-08-13 14:11:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\selectOldpartsNumber\index.vue
-->
<template>
  <iDialog :visible.sync="diolog.show" :title="language('XUANZHEYUANFSHAO','选择原FS号')" width='80%'>
    <div class="padding-bottom20">
      <div class="text-align-right margin-bottom20"><iButton @click="selectFn">{{language('XUANZHE','选择')}}</iButton></div> 
      <tableList radio :tableTitle='tableTitle' :tableData='tableData' :tableLoading='loading' @handleSelectionChange='handleSelectionChange'></tableList>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
          v-update
          @size-change="handleSizeChange($event, getPageData)"
          @current-change="handleCurrentChange($event, getPageData)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"
      />
    </div>
  </iDialog>
</template>
<script>
import {iDialog,iButton,iPagination,iMessage} from 'rise'
import tableList from '@/views/partsign/home/components/tableList'
import {tableTitle} from './data'
import {pageMixins} from "@/utils/pageMixins";
import {getPageData} from '@/api/partsprocure/editordetail'
export default{
  props:{
    diolog:{
      type:Object,
      default:()=>{}
    }
  },
  mixins:[pageMixins],
  inject:['detailData'],
  components:{tableList,iDialog,iButton,iPagination},
  data(){
    return {
      tableTitle:tableTitle,
      tableData:[],
      loading:false,
      selectTableData:[]
    }
  },
  watch:{
    'diolog.show':function (params) {
      if(params) this.getPageData()
    }
  },
  methods:{
    selectFn(){
      if(this.selectTableData.length == 0) return iMessage.warn(this.language('NINGHAIWEIXUANZESHUJU','抱歉，您还未选择定点记录！'))
      this.$emit('input',this.selectTableData[0])
      this.diolog.show = false
    },
    handleSelectionChange(res){
      this.selectTableData = res
    },
    getPageData(){
      this.loading = true
      let {partNum,carTypeProjectNum,procureFactory} = this.detailData() || {}
      getPageData({...{carTypeProject:carTypeProjectNum,partNum:partNum,procureFactory:procureFactory},...{current:this.page.currPage,size:this.page.pageSize}}).then(res=>{
         this.tableData = res.data
         this.page.currPage = res.pageNum
         this.page.totalCount = res.total
         this.loading = false
      }).catch(err=>{
         this.loading = false
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>