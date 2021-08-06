<!--
 * @Author: your name
 * @Date: 2021-08-04 13:54:47
 * @LastEditTime: 2021-08-04 15:21:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\batchmiantain\components\onlyPartsChange.vue
-->
<template>
  <iCard>
    <iTalbeList @handleSelectionChange='handleSelectionChange' :tableTitle='tableTitleOnlyPartsChange' :tableData='tableData'></iTalbeList>
  </iCard> 
</template>
<script>
import {iCard} from 'rise'
import iTalbeList from '@/views/partsign/home/components/tableList'
import {tableTitleOnlyPartsChange} from './data'
import {} from '@/api/partsprocure/editordetail'
export default{
  components:{iCard,iTalbeList},
  data(){return {
    tableTitleOnlyPartsChange,
    tableData:[]
  }},
  methods:{
    handleSelectionChange(res){
      this.$emit('handleSelectionChange',res)
    },
    /**
     * @description:获取仅零件号变更的历史记录 
     * @param {*}
     * @return {*}
     */
    getDataList(){

    }
  }
}
</script>
<style lang='scss' scoped>
</style>