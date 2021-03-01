<template>
  <el-table height="100%" :data="tableData" v-loading="loading">
    <el-table-column type="index" align="center" label="#"></el-table-column>
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
    },
    loading: {
      type: Boolean,
      defalut: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>