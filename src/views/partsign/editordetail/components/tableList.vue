<!--
 * @Author: your name
 * @Date: 2021-02-24 16:57:16
 * @LastEditTime: 2022-03-25 14:42:38
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsign\editordetail\components\tableList.vue
-->
<template>
  <el-table ref="table" class="table" :class="(singleSelect ? 'singleSelectTable' : '' )||(isminHeight?'aotoTableHeight':'')" :height="height" :min-height="minHeight" :data="tableData" :cell-class-name="cellClassName" v-loading="tableLoading" @selection-change="handleSelectionChange" @select="handleSelect" :empty-text="language('LK_ZANWUSHUJU','暂无数据')" @select-all="handleSelectAll" @row-click="handleRowClick" :cell-style="borderLeft" :span-method="spanMethod" v-bind="$attrs">
    <el-table-column v-if="selection || singleSelect" type="selection" align="center" width="55" :fixed="fixed" :selectable="selectable"></el-table-column>
    <el-table-column v-if="index" type="index" align="center" :label="indexLabel" :fixed="fixed"></el-table-column>
    <template v-for="(item, $index) in tableTitle">
      <el-table-column :key="$index" align="center" v-if='$slots[item.props] && item.editable' :label="lang ? (showName ? item.name : language(item.key, item.name)) : (showName ? item.name : $t(item.key))" :prop="item.props" tooltip :width="item.width" :min-width="item.minWidth ? item.minWidth.toString():''" :fixed="item.fixed" :sortable="item.sortable||false" :sort-method="item.sortMethod">
        <template slot-scope="scope">
          <iInput v-if="item.type === 'input'" v-model="scope.row[item.props]" @click.native.stop></iInput>
        </template>
      </el-table-column>
      <el-table-column :key="$index" align="center" v-else :label="lang ? (showName ? item.name : language(item.key, item.name)) : (showName ? item.name : $t(item.key))" :prop="item.props" :show-overflow-tooltip="item.tooltip" :width="item.width" :min-width="item.minWidth ? item.minWidth.toString():''" :fixed="item.fixed" :render-header="item.renderHeader" :sortable="item.sortable||false" :sort-method="item.sortMethod">
        <template #header="scope">
          <el-popover
            v-if="item.showTips"
            placement="top"
            trigger="hover"
            popper-class="tableTitleTip"
            :visible-arrow="false"
            :disabled="!item.showTips">
            <p v-html="item.showTips ? item.tips() : ''"></p>
            <span slot="reference">
              <span>{{ scope.column.label }}</span>
              <icon v-if="item.showTips" class="require margin-left4" symbol name="iconxinxitishi" />
            </span>
          </el-popover>
          <span v-else>{{ scope.column.label }}</span>
        </template>
        <template v-if="$scopedSlots[item.props] || $slots[item.props]" v-slot="scope">
          <slot :name="item.props" :row="scope.row" :$index="scope.$index"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import tablelist from '@/views/partsign/home/components/tableList'
import { iInput, icon } from 'rise'
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
    isminHeight: {
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
    showName: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    selectable: { type: Function },
    spanMethod: { type: Function }
  },
  components: { iInput, icon },
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
          this.$set(item, "selectedBorder", false)
        })

        this.$refs.table.toggleRowSelection(row, !!selection.length)
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
    handleRowClick(row, column, event) {
      this.$emit("handleRowClick", row, column, event)
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
.aotoTableHeight{
    ::v-deep .el-table__body-wrapper {
      max-height: 422px !important;  
      overflow: auto !important ;
    }
  }
.singleSelectTable {
  ::v-deep .el-table__header-wrapper .el-checkbox {
    display: none;
  }
}
</style>