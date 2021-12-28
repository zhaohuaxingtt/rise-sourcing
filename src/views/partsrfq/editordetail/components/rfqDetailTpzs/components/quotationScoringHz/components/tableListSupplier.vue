<!--
 * @Author: your name
 * @Date: 2021-11-08 11:48:04
 * @LastEditTime: 2021-12-28 14:57:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-sourcing\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\components\tableListSupplier.vue
-->
<template>
  <el-table class="table" :data="tabelData" :fit='true' :show-header='false' border :span-method='spanMethod' :cell-style='cellStyleName' :stripe='false'>
    <el-table-column v-for="(i,index) in tabelTitle" :props='i' :key='index' :fixed='fixedFn(index)' align="center">
      <template slot-scope="scope">
        {{scope.row[i].data | deleteContent | dateFillter}}
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
    dateFillter(val){
      // eslint-disable-next-line no-undef
      if(isNaN(val)&&!isNaN(Date.parse(val))){
        // eslint-disable-next-line no-undef
        return moment(val).format('YYYY-MM-DD')
      }else{
        return val
      }
    },
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
    fixedFn(index){
      if(index<4) return 'left'
      if(index>this.tabelTitle.length-4) return 'right'
      return false
    },
    spanMethod({ row, column, rowIndex, columnIndex }){
      return row[columnIndex].mergeArray
    },
    cellStyleName({row, column, rowIndex, columnIndex}){
      try {
        const style = {
        'fontWeight':row[columnIndex].style.isBold?'bold':'',
        'color':row[columnIndex].style.fontColor || '#707070',
        'backgroundColor':row[columnIndex].style.backgroundColor || 'white',
        }
        if(row[columnIndex].style.borderRight) return {...style,...{borderRight:'none'}}
        return style
      } catch (error) {
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