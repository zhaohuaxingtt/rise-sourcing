<!--
 * @Author: yuszhou
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-02-24 15:23:31
 * @LastEditors: Please set LastEditors
 * @Description: 零件签收-table组件。
 * @FilePath: \rise\src\views\partsign\components\tablelist.vue
-->
<template>
  <el-table :data='tableData' v-loading='tableLoading' @selection-change="handleSelectionChange">
     <el-table-column type='selection' width="50" align='center'></el-table-column>
    <template v-for="(items,index) in tableTitle">
      <el-table-column :key="index" align='center' :label="items.name" :prop="items.props"></el-table-column>
    </template>
  </el-table>
</template>
<script>
export default{
  props:{
    tableData:{type:Array},
    tableTitle:{type:Array},
    tableLoading:{type:Boolean,default:false}
  },
  methods:{
    handleSelectionChange(val){
      this.$emit('handleSelectionChange',val)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>