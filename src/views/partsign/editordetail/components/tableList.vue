<!--
 * @Author: your name
 * @Date: 2021-02-24 16:57:16
 * @LastEditTime: 2021-06-23 15:21:06
 * @LastEditors: ldh
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsign\editordetail\components\tableList.vue
-->
<template>
  <el-table ref="table" class="table" :class="singleSelect ? 'singleSelectTable' : ''" :height="height" :data="tableData" :cell-class-name="cellClassName" v-loading="tableLoading" @selection-change="handleSelectionChange" @select="handleSelect" :empty-text="$t('LK_ZANWUSHUJU')">
    <el-table-column v-if="selection || singleSelect" type="selection" align="center"></el-table-column>
    <el-table-column v-if="index" type="index" align="center" :label="indexLabel"></el-table-column>
    <template v-for="(item, $index) in tableTitle">
      <el-table-column align="center" :key="$index" :label="$t(item.key)" :prop="item.props" :show-overflow-tooltip="item.tooltip" :width="item.width">
        <template v-if="$scopedSlots[item.props] || $slots[item.props]" v-slot="scope">
          <slot :name="item.props" :row="scope.row"></slot>
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
      default: false
    },
    selection: {
      type: Boolean,
      default: true
    },
    singleSelect: {
      type: Boolean,
      default: false
    },
    index: {
      type: Boolean,
      default: false
    },
    indexLabel: {
      type: String,
      default: '#'
    },
    height: {
      type: String
    },
    cellClassName: {
      type: Function
    }
  },
  created() {
    console.log(this.$slots)
  },
  methods: {
    handleSelectionChange(list) {
      if (this.singleSelect) return
      this.$emit('handleSelectionChange', list)
    },
    handleSelect(selection, row) {
      if (this.singleSelect) {
        this.tableData.forEach(item => {
          if (item === row) return
          this.$refs.table.toggleRowSelection(item, false)
        })

        this.$refs.table.toggleRowSelection(row, !!selection.length)
        this.$emit('handleSingleSelectChange', selection.length ? row : null)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  ::v-deep .el-input {
    width: 97%; // 解决tooltip异常弹出
  }

  ::v-deep .el-checkbox {
    z-index: 0
  }
}

.singleSelectTable {
  ::v-deep .el-table__header-wrapper .el-checkbox {
    display: none;
  }
}
</style>