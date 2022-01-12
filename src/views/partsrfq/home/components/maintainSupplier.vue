<template>
  <iDialog 
    class="createDesignateTips"
    :visible.sync="maintainSupplierVislble"
    :title="language('BIDDING_TISHI','提示')"
    @close="sure"
  >
  <!-- <div class="btnPlace">
    <iButton @click="batchMaintainSupplier">{{language('PILIANGWEIHUGONGYINGSHANG','批量维护供应商')}}</iButton>
    <iButton @click="submit">{{language('TIJIAO','提交')}}</iButton>
  </div> -->
  <div>
    <span class="fontStyle">
      {{language('QINWEIYIXIAGONGYINGSHANGWEIHUGONGCHANGDIZHI','请为一下供应商维护工厂地址')}}
    </span>
  </div>
  <main>
    <tableList
      v-show="maintainSupplierVislble"
      class="dunsTable"
      :selection="false"
      :tableData="tableData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      @handleSelectionChange="handleSelectionChange"
    ></tableList>
      <!-- <iPagination v-update
      class="pagination"
      @size-change="handleSizeChange($event, maintainSupplierTable)"
      @current-change="handleCurrentChange($event, maintainSupplierTable)"
      background
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount" /> -->
      <footer class="footerBtn">
      <iButton @click="sure">{{language('QUEDING','确定')}}</iButton>
    </footer>
    <div style="height:20px"></div>
  </main>
  </iDialog>
</template>
<script>
import {iDialog, iButton} from "rise"
import { pageMixins } from "@/utils/pageMixins"
import tableList from "@/views/partsign/editordetail/components/tableList"
import {maintainSupplierTitle as tableTitle} from  "./data"
export default {
  components:{iDialog, iButton, tableList},
  mixins: [ pageMixins ],
  props:{
    supplierNamesTable: {
      type:Array,
      default:()=>[]
    }
  },
  data(){
    return {
      tableTitle,
      selection:[],
      tableData:[],
      maintainSupplierVislble:false
    }
  },
  watch:{
    maintainSupplierVislble(val) {
      if(val) {
        this.tableData = this.supplierNamesTable
      }
    }
  },
  methods:{
    show() {
      this.maintainSupplierVislble = true
    },
    sure() {
      this.$emit('changeTipsDialog','supplier')
    },
    close() {
       this.maintainSupplierVislble = false
    }
  }
}
</script>
<style scoped lang="scss">
  .createDesignateTips{
    .fontStyle{
      font-size: 14px;
      font-weight: bold;
    }
    .dunsTable{
      margin: 10px 0 0 0 ;
    }
    .footerBtn{
      margin: 20px 0 0 0;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>