<!--
 * @Author: yuszhou
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-02-24 10:10:01
 * @LastEditors: Please set LastEditors
 * @Description: 零件签收-table组件。
 * @FilePath: \rise\src\views\partsign\components\tablelist.vue
-->
<template>
  <el-table :data='tableData'>
    <el-table-column v-for="(items,index) in tableTitle" :key="index" align='center' :label="items.name" :prop="items.props"></el-table-column>
  </el-table>
</template>
<script>
export default{
  props:{
    tableData:{type:Array},
    tableTitle:{type:Array}
  }
}
</script>
<style lang='scss' scoped>
</style>