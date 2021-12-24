<!--
 * @Author: your name
 * @Date: 2021-11-08 11:48:04
 * @LastEditTime: 2021-12-23 17:33:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-sourcing\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\components\tableListSupplier.vue
-->
<template>
  <el-table class="table" :data="tabelData" :show-header='false' border :span-method='spanMethod' :cell-style='cellStyleName' :stripe='false'>
    <el-table-column v-for="(i,index) in tabelTitle" :props='i' :key='index' align="center">
      <template slot-scope="scope">
        {{scope.row[i].data | deleteContent}}
      </template>
    </el-table-column>
  </el-table>  
</template>
<script>
export default{
  inject:['getbaseInfoData'],
  props:{
    parentsData:{
      type:Object,
      default:()=>{}
    }
  },
  filters:{
    deleteContent(val){
      if(val == 'DEL') {
        return ''
      }else{
        return val
      }
    }
  },
  computed:{
    tabelData(){
      try {
        return this.parentsData.data
      } catch (error) {
        console.log(error)
        return []
      }
    },
    tabelTitle() {
      try {
        return this.parentsData.data[0].map((r,index)=>index)
      } catch (error) {
        return []
      }
    }
  },
  methods:{
    spanMethod({ row, column, rowIndex, columnIndex }){
      return row[columnIndex].mergeArray
    },
    cellStyleName({row, column, rowIndex, columnIndex}){
      console.log(row, column, rowIndex, columnIndex)
      try {
        return {
        'fontWeight':row[columnIndex].style.isBold?'bold':'',
        'color':row[columnIndex].style.fontColor || '#707070',
        'backgroundColor':row[columnIndex].style.backgroundColor || 'white'
      }
      } catch (error) {
        console.log(error)
       return {
        'fontWeight':'',
        'color':'#707070',
        'backgroundColor':'white'
      } 
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .table{
    ::v-deep tr:nth-child(even){
      background-color: white;
    }
    ::v-deep td{
        border-bottom: 1px solid #EBEEF5;
    }
  }
</style>