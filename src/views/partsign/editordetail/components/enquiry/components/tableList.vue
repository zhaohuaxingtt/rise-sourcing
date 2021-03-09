<!--
 * @Author: your name
 * @Date: 2021-02-24 16:57:16
 * @LastEditTime: 2021-03-01 15:57:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\editordetail\components\enquiry\components\tablelist.vue
-->
<template>
  <el-table class="table" :data="tableData" v-loading="tableLoading" @selection-change="handleSelectionChange">
    <el-table-column type="selection" align="center"></el-table-column>
    <el-table-column type="index" align="center" label="#"></el-table-column>
    <template v-for="(item, $index) in tableTitle">
      <el-table-column :key="$index" align="center" :label="item.name" :prop="item.prop">
        <template v-slot="scope">
          <slot v-if="$scopedSlots[item.prop] || $slots[item.prop]" :name="item.prop" :row="scope.row"></slot>
          <div v-else>{{ scope.row[item.prop] }}</div>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import tablelist from '@/views/partsign/home/components/tableList'

export default {
  props:{
    ...tablelist.props,
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
  },
  methods: {
    handleSelectionChange(val){
      this.$emit('handleSelectionChange', val)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>