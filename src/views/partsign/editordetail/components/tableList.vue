<!--
 * @Author: your name
 * @Date: 2021-02-24 16:57:16
 * @LastEditTime: 2021-08-26 16:16:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsign\editordetail\components\tableList.vue
-->
<template>
  <el-table 
    ref="table" 
    class="table" 
    v-loading="tableLoading" 
    :class="singleSelect ? 'singleSelectTable' : ''" 
    :cell-style="borderLeft"
    :empty-text="language('LK_ZANWUSHUJU','暂无数据')" 
    :height="height" 
    :data="tableData" 
    :cell-class-name="cellClassName" 
    @selection-change="handleSelectionChange" 
    @select="handleSelect" 
    @select-all="handleSelectAll"
    @row-click="handleRowClick" >
    <el-table-column v-if="selection || (selection && singleSelect)" type="selection" align="center" width="40" :fixed="fixed" :selectable="selectable"></el-table-column>
    <el-table-column v-if="index" type="index" align="center" :label="indexLabel" :fixed="fixed"></el-table-column>
    <template v-for="(item, $index) in tableTitle">
      <el-table-column :key="$index" align="center" :label="lang ? language(item.key, item.name) : $t(item.key)" :prop="item.props" :show-overflow-tooltip="item.tooltip" :width="item.width" :min-width="item.minWidth ? item.minWidth.toString():''" :fixed="item.fixed">
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
    },
    lang: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    selectable: { type: Function },
  },
  data() {
    return {
      selections: []
    }
  },
  methods: {
    handleSelectionChange(list) {
      if (this.singleSelect) return
      this.selections = list
      this.$emit('handleSelectionChange', list)
    },
    handleSelect(selection, row) {
      if (this.singleSelect) {
        this.tableData.forEach(item => {
          if (item === row) return
          this.$refs.table.toggleRowSelection(item, false)
          this.$set(item, "selectedBorder", false)
        })

        this.$refs.table.toggleRowSelection(row, !!selection.length)
        this.selections = selection.length ? [row] : []
        this.$emit('handleSingleSelectChange', selection.length ? row : null)
      }

      const selectdBorder = row.selectedBorder
      this.$set(row,'selectedBorder',!selectdBorder)

      this.$emit('handleSelect', selection, row)
    },
    handleSelectAll(selection){  
      const flag = selection.length
      for(let i= 0  ; i<flag;i++){
        this.$set(selection[i],'selectedBorder',!!flag)
      }
      !flag? this.tableData.forEach(i=>{i.selectedBorder=!i.selectedBorder}):''

      this.$emit('handleSelectAll', selection)
    },
    borderLeft({row, column, rowIndex, columnIndex}){
      if(columnIndex === 0 && row.selectedBorder === true){
         return "border-left:2px solid #1660F1;"
      }
      else{
        return ""
      }
    },
    handleRowClick(row, column, e) {
      if (this.selection) {
        const targetEl = e.srcElement || e.target
        const preventTagNames = ["INPUT", "SVG"]
        const preventClassNames = ["link", "cursor"]

        if (preventTagNames.some(tagName => targetEl.tagName === tagName)) return
        if (preventClassNames.some(className => (targetEl.className || "").toLowerCase().includes(className))) return

        if (this.singleSelect) {
          this.tableData.forEach(item => {
            if (item === row) return
            this.$refs.table.toggleRowSelection(item, false)
            this.$set(item, "selectedBorder", false)
          })

          if (this.selections.includes(row)) {
            this.$refs.table.toggleRowSelection(row, false)
            this.selections = []
          } else {
            this.$refs.table.toggleRowSelection(row, true)
            this.selections = [ row ]
          }
        } else {
          this.$refs.table.toggleRowSelection(row)
        }
        
        this.$nextTick(() => {
          this.$emit('handleSingleSelectChange', this.selections.length ? row : null)
          this.$set(row,'selectedBorder', this.selections.includes(row))
        })
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