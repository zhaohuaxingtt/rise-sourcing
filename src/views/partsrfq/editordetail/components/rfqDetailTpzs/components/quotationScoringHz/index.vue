<!--
 * @Author: yuszhou
 * @Date: 2021-05-28 14:32:04
 * @LastEditTime: 2021-05-29 23:27:20
 * @LastEditors: Please set LastEditors
 * @Description: 报价分析汇总表格
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\index.vue
-->
<template>
  <div>
    <div class="quotationHz margin-bottom20">
      <!--------------输入框模块-------------->
      <div class='search'>
        <div>
          <span>Hide/unHide：</span>
          <iSelect></iSelect> 
        </div>
        <div>
          <span>Quota. Round：</span>
          <iSelect></iSelect> 
        </div>
        <div>
          <span>Layout: </span>
          <iSelect v-model="layout">
            <el-option label="FS-Parts as Row" value="caseOne"></el-option>
            <el-option label="FS-Supplier as Row" value="caseTow"></el-option>
          </iSelect> 
        </div>            
      </div>
      <div class="btnSearch">
        <iButton @click="group">组合</iButton>
        <iButton>取消组合</iButton>
        <iButton>导出</iButton>
      </div>
      <!--------------表格模块-------------->
    </div>
    <tableList :tableTitle='title' v-if='layout == "caseOne"' :tableData='exampelData' @handleSelectionChange='handleSelectionChange'></tableList>
    <tableListSupplier :tableTitle='supplierTile'  :tableData='supplierData' v-if='layout == "caseTow"'></tableListSupplier>
    <!--------------弹窗-------------->
    <iDialog title="组合名" :visible.sync="groupVisble" width='25%'>
      <div class="mine_height">
        <span>组合名：</span><iInput />
      </div>
    </iDialog>
  </div>
</template>
<script>
import {iButton,iSelect,iDialog,iInput,iMessage} from 'rise'
import tableList from './components/table'
import tableListSupplier from './components/tableListSupplier'
import {title,exampelData,supplierData,concactTitlle,centerSupplierList} from './components/data'
export default{
  components:{iButton,iSelect,tableList,iDialog,iInput,tableListSupplier},
  data(){return {
    title:title,
    exampelData:exampelData,
    groupSelectData:[],
    groupVisble:false,
    layout:'caseOne',
    supplierData:supplierData,
    supplierTile:[]
  }},
  mounted(){
    this.concactTitlle()
  },
  methods:{
    concactTitlle(){
      this.supplierTile = concactTitlle([...centerSupplierList,...centerSupplierList])
    },
    handleSelectionChange(val){
      this.groupSelectData = val
    },
    group(){
      if(this.groupSelectData.length == 0){
        iMessage.warn('请选择您要组合的项');
        return
      }
      if(this.groupSelectData.length == 1){
        iMessage.warn('请至少选择两项组合');
        return 
      }
      this.groupVisble = !this.groupVisble
    }
  }
}
</script>
<style lang='scss' scoped>
  .mine_height{
    min-height: 150px;
    display: flex;
    span{
      width: 100px;
      line-height: 35px;
    }
  }
  .quotationHz{
    display: flex;
    justify-content: space-between;
    .search{
      &>div{
        float: left;
        margin-right: 20px;
        display: flex;
        justify-content: space-between;
        span{
          width: 180px;
          line-height: 30px;
          font-size: 14px;
        }
      }
    }
  }
</style>
