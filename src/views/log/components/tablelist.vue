<template>
  <el-table :data='tableData'>
    <el-table-column type="index"></el-table-column>
    <template v-for="(item, $index) in tableTitle">
      <el-table-column :key="$index" align="center" :label="item.name" :prop="item.prop"></el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  props:{
    tableData: { 
      type: Array,
      default: () => ([])
    },
    tableTitle: { 
      type: Array,
      default: () => ([])
    }
  },
}
</script>

<style lang="scss" scoped>

</style>