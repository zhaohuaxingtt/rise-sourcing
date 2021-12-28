<template>
  <iDialog 
    class="createDesignateTips"
    :visible.sync="maintainSupplierVislble"
    :title="language('BIDDING_TISHI','提示')"
    @close="changeTips"
  >
  <div class="btnPlace">
    <iButton @click="batchMaintainSupplier">{{language('PILIANGWEIHUGONGYINGSHANG','批量维护供应商')}}</iButton>
    <iButton @click="submit">{{language('TIJIAO','提交')}}</iButton>
  </div>
  <div>
    <span class="">
      {{language('QINWEIYIXIAGONGYINGSHANGWEIHUGONGCHANGDIZHI','请为一下供应商维护工厂地址')}}
    </span>
  </div>
  <main>
    <tableList
      :selection="true"
      :tableData="tableData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      @handleSelectionChange="handleSelectionChange"
    ></tableList>
      <iPagination v-update
      class="pagination"
      @size-change="handleSizeChange($event, maintainSupplierTable)"
      @current-change="handleCurrentChange($event, maintainSupplierTable)"
      background
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount" />
  </main>
  </iDialog>
</template>
<script>
import {iDialog, iButton, iPagination} from "rise"
import { pageMixins } from "@/utils/pageMixins"
import tableList from "@/views/partsign/editordetail/components/tableList"
import {maintainSupplierTitle as tableTitle} from  "./data"
export default {
  components:{iDialog, iButton, tableList, iPagination},
  mixins: [ pageMixins ],
  props:{

  },
  data(){
    return {
      tableTitle,
      selection:[],
      tableData:[],
      maintainSupplierVislble:false
    }
  },
  methods:{
    show(){
      this.maintainSupplierVislble = true
    },
    batchMaintainSupplier() {

    },
    submit() {
     
    },
    changeTips() {
      let data ={
          maintainSupplierVislble:false,
          noStarMonitorVisible:true,
          noBNKVisible:false
        }
        this.$emit('createDesignateTips',data)
      }
  }
}
</script>
<style scoped lang="scss">
  .createDesignateTips{
    display: flex;
    justify-content: flex-end;
  }
</style>