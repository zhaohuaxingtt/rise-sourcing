<template>
  <el-table :data=tableDat>
    <el-table-column v-for="item in tableTitle" :key="item.props" :prop="item.props"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    props:{
      tableTitle: { type: Object, default: ()=> ({})},
      tableData: { type: Object, default: ()=> ({})},
    }
  }
</script>

<style lang="scss" scoped>

</style>