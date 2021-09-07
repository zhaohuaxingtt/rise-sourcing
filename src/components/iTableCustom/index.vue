<template>
  <div
    class="i-table-custom"
    :class="{
      'single-choise': singleChoice,
      'disable-children-selection': disableChildrenSelection,
      'i-table-custom-expand': treeExpand
    }"
  >
    <el-table
      tooltip-effect="light"
      :height="height"
      :max-height="maxHeight"
      :data="tableData"
      v-loading="loading"
      :row-key="rowKey || 'uniqueId'"
      :highlight-current-row="highlightCurrentRow"
      :empty-text="$t('LK_ZANWUSHUJU')"
      ref="theCustomTable"
      :row-class-name="getRowClassNameDefault"
      :row-style="getRowStyle"
      :cell-class-name="getCellClassName"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      @select-all="handleAllSelect"
      @current-change="handleCurrentChange"
      @cell-click="handleCellClick"
      fit
      :span-method="getSpanMethod"
      :stripe="stripe"
      @row-click="rowClick"
    >
      <template v-for="(item, index) in columns">
        <el-table-column
          :key="index"
          v-if="['selection', 'index'].includes(item.type)"
          :reserve-selection="item.reserveSelection || false"
          :type="item.type"
          :label="item.i18n ? $t(item.i18n) : item.label"
          :width="item.width || '50'"
          :min-width="item.minWidth"
          :align="item.align || 'center'"
          :selectable="handleSelectable"
        />
        <el-table-column
          :key="index"
          v-else-if="['customSelection'].includes(item.type)"
          reserve-selection
          :type="item.type"
          :label="item.i18n ? $t(item.i18n) : item.label"
          :width="item.width || '50'"
          :min-width="item.minWidth || '50'"
          :align="item.align || 'center'"
          :selectable="handleSelectable"
        >
          <template slot="header">
            <el-checkbox
              v-model="checkedAll"
              :indeterminate="indeterminateAll"
              @change="handleCheckedAll"
            />
          </template>
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.checked"
              :indeterminate="scope.row.isIndeterminate"
              :disabled="scope.row.disabledChecked"
              @change="val => handleCheckedRow(val, scope.row)"
            >
            </el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          v-else-if="['fullIndex'].includes(item.type)"
          :type="item.type"
          :label="item.i18n ? $t(item.i18n) : item.label"
          :width="item.width || '50'"
          :align="item.align || 'center'"
          :selectable="handleSelectable"
        >
          <template slot-scope="scope">
            {{ getFullIndex(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :render-header="item.headerRender"
          :key="index"
          :type="item.type"
          :align="item.align || 'center'"
          :header-align="item.headerAlign"
          :show-overflow-tooltip="item.tooltip"
          :prop="item.prop"
          :label="item.i18n ? $t(item.i18n) : item.label"
          :width="item.width ? item.width.toString() : ''"
          :min-width="item.minWidth ? item.minWidth.toString() : ''"
        >
          <template slot-scope="scope">
            <div @click="handleEmit(item, scope.row)">
              <i-table-column
                v-if="item.customRender || item.type === 'expanded'"
                :scope="scope"
                :column="item"
                :custom-render="item.customRender"
                :extra-data="extraData"
                :prop="item.prop"
                :child-num-visible="childNumVisible"
              />
              <span v-else>
                {{ scope.row[item.prop] }}
              </span>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { iButton, iSelect, iInput, iRadio, Icon } from 'rise'
import iTableColumn from './iTableColumn'

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { iTableColumn, iButton, iSelect, iInput, iRadio, Icon },
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    columns: {
      type: Array,
      default: function() {
        return []
      }
    },
    loading: { type: Boolean, default: false },
    height: { type: Number || String },
    maxHeight: { type: Number || String },
    extraData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 多层级展开选项
    treeExpand: {
      type: Object
    },
    rowKey: {
      type: String
    },
    // 是否默认展开
    defaultExpand: {
      type: Boolean,
      default: false
    },
    // 是否禁用子集选择
    disableChildrenSelection: {
      type: Boolean,
      default: false
    },
    // 是否单选
    singleChoice: {
      type: Boolean,
      default: false
    },
    // 是不是级联选择
    cascade: {
      type: Boolean,
      default: false
    },
    // 使用自定义选择框
    customSelection: {
      type: Boolean,
      default: false
    },
    // 使用自定义选择框, 是否要回传半选状态记录
    emitHalfSelection: {
      type: Boolean,
      default: true
    },
    // 子元素数量是否显示
    childNumVisible: {
      type: Boolean,
      default: false
    },
    // 行的class名
    rowClassName: {
      type: Function
    },
    // 高亮当前行
    highlightCurrentRow: {
      type: Boolean,
      defalut: false
    },
    defaultSelectedRows: {
      type: Array
    },
    //合并列
    isColSpan: {
      type: Boolean,
      defalut: false
    },
    spanMethod: {
      type: Function
    },
    stripe: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: [],
      selectedRows: [],
      checkedAll: false,
      indeterminateAll: false
    }
  },
  watch: {
    data() {
      this.getTableData()
    },
    defaultSelectedRows() {
      this.getTableData()
    }
  },
  created() {
    console.log(this.getColumnFn)
    this.getTableData()
  },
  methods: {
    rowClick(row, column, event) {
      this.$emit('row-click', row, column, event)
    },
    handleCurrentChange(val) {
      this.$emit('handle-current-change', val)
    },
    handleSelectionChange(val) {
      this.selectedRows = val
      this.$emit('handle-selection-change', val)
    },
    handleEmit(item, row) {
      if (item.emit) {
        this.$emit(item.emit, row)
      }
    },
    getTableData() {
      if (this.treeExpand) {
        this.tableData = this.getTreeTableData(this.data)
      } else {
        this.tableData = this.data
        this.tableData.forEach((e, index) => {
          e.uniqueId = index + ''
          e.visible = true
          e.parentUniqueId = null
          if (this.customSelection) {
            e.checked = false
            e.isIndeterminate = false
          }
          // 设置已选中值
          if (
            this.customSelection &&
            this.defaultSelectedRows &&
            this.defaultSelectedRows.filter(
              d => d[this.rowKey] === e[this.rowKey]
            ).length > 0
          ) {
            e.checked = true
            this.selectedRows.push(e)
          }
        })
      }
    },
    getTreeTableData(data, parentKey, res) {
      parentKey = parentKey || ''
      res = res || []
      const { childrenKey } = this.treeExpand
      for (let i = 0; i < data.length; i++) {
        const row = data[i]
        const uniqueId = parentKey ? `${parentKey}-${i}` : `${i}`
        let hasChild = Object.hasOwnProperty.call(row, childrenKey)
        if (hasChild && (!row[childrenKey] || row[childrenKey].length === 0)) {
          hasChild = false
        }
        const visible = uniqueId.includes('-') ? this.defaultExpand : true
        const resItem = {
          uniqueId,
          isLeaf: !hasChild,
          expanded: this.defaultExpand,
          visible: visible,
          parentUniqueId: parentKey,
          childNum: (hasChild && row[childrenKey].length) || 0
        }

        for (const k in row) {
          if (Object.hasOwnProperty.call(row, k)) {
            const item = row[k]
            if (k !== childrenKey) {
              resItem[k] = item
            }
          }
        }

        if (this.customSelection) {
          if (!Object.prototype.hasOwnProperty.call(row, 'checked')) {
            resItem.checked = false
          }
          resItem.isIndeterminate = false
          // 设置已选中值
          if (this.defaultSelectedRows) {
            if (
              this.defaultSelectedRows.filter(
                e => e[this.rowKey] === row[this.rowKey]
              ).length > 0
            ) {
              resItem.checked = true
              this.selectedRows.push(resItem)
            }
          }
        }

        res.push(resItem)
        if (
          Object.hasOwnProperty.call(row, childrenKey) &&
          row[childrenKey] &&
          row[childrenKey].length > 0
        ) {
          this.getTreeTableData(row[childrenKey], uniqueId, res)
        }
      }
      return res
    },
    handleCellClick(row, column) {
      if (this.treeExpand) {
        if (this.treeExpand.expandKey === column.property) {
          row.expanded = !row.expanded
          this.tableData.forEach(element => {
            const isChildren =
              element.uniqueId.indexOf(row.uniqueId + '-') === 0
            if (row.expanded) {
              if (isChildren && element.parentUniqueId === row.uniqueId) {
                element.visible = row.expanded
                // element.expanded = row.expanded
              }
            } else {
              if (isChildren) {
                element.visible = row.expanded
                element.expanded = row.expanded
              }
            }
          })
        }
      }
    },
    expandAll() {
      // 全部展开
      if (this.treeExpand) {
        this.tableData.forEach(element => {
          element.expanded = true
          element.visible = true
        })
      }
    },
    collapseAll() {
      // 全部收起
      if (this.treeExpand) {
        this.tableData.forEach(element => {
          element.expanded = false
          if (element.uniqueId.indexOf('-') > -1) {
            element.visible = false
          }
        })
      }
    },
    toggleRowSelection(row, selected) {
      let toggleRow = row
      if (this.rowKey) {
        const filterRow = this.tableData.filter(
          e => e[this.rowKey] === row[this.rowKey]
        )
        if (filterRow.length > 0) {
          toggleRow = filterRow[0]
        }
        if (
          selected &&
          this.selectedRows.filter(
            e => e[this.rowKey] === toggleRow[this.rowKey]
          ).length === 0
        ) {
          this.$refs.theCustomTable.toggleRowSelection(toggleRow, selected)
        }
      } else {
        this.$refs.theCustomTable.toggleRowSelection(toggleRow, selected)
      }
    },
    toggleRowAndChildrenSelection(row, selected) {
      let toggleRow = row

      if (this.rowKey) {
        const filterRow = this.tableData.filter(
          e => e[this.rowKey] === row[this.rowKey]
        )
        if (filterRow.length > 0) {
          toggleRow = filterRow[0]
        }
      }
      this.$refs.theCustomTable.toggleRowSelection(toggleRow, selected)
      const rowUniqueId = toggleRow.uniqueId
      const rowChildren = this.tableData.filter(
        e => e.uniqueId.indexOf(rowUniqueId + '-') === 0
      )
      if (rowChildren.length > 0) {
        rowChildren.forEach(e => {
          this.$refs.theCustomTable.toggleRowSelection(e, selected)
        })
      }
    },
    toggleAllSelection() {
      this.$refs.theCustomTable.toggleAllSelection()
    },
    clearSelection() {
      this.$refs.theCustomTable.clearSelection()
    },
    handleSelectable(row) {
      if (
        this.disableChildrenSelection &&
        row.uniqueId &&
        row.uniqueId.indexOf('-') > 0
      ) {
        return false
      }

      if (this.singleChoice && this.selectedRows.length === 0) {
        return true
      }
      if (this.singleChoice && this.selectedRows.length > 0) {
        if (this.selectedRows.indexOf(row) > -1) {
          return true
        } else {
          return false
        }
      }

      return true
    },
    handleSelect(selection, row) {
      this.$emit('select', selection, row)
    },
    handleAllSelect(selection) {
      this.$emit('select-all', selection)
    },
    getRowClassNameDefault({ row, rowIndex }) {
      let rowClass = ''
      if (this.rowClassName) {
        rowClass = this.rowClassName({ row, rowIndex })
      }
      if (row.visible) {
        rowClass += ' visible'
      } else {
        rowClass += ' hidden'
      }

      if (this.treeExpand && row.visible) {
        const index = this.tableData.filter(e => e.visible).indexOf(row)
        rowClass += index % 2 === 0 ? ' odd' : ' even'
      }

      if (
        row.uniqueId === null ||
        row.uniqueId === undefined ||
        row.uniqueId.indexOf('-') === -1
      ) {
        return `${rowClass} root-row`
      }

      return `${rowClass} row-child`
    },
    getRowStyle({ row }) {
      if (!row.visible) {
        return { display: 'none' }
      }
      return ''
    },
    getCellClassName({ column, columnIndex }) {
      if (column.showOverflowTooltip) {
        if (this.isColSpan && columnIndex === 0) {
          return 'bgColor cell-ellipsis'
        } else {
          return 'cell-ellipsis'
        }
      } else {
        if (this.isColSpan && columnIndex === 0) {
          return 'bgColor'
        }
        return 'cell-ellipsis'
      }
    },
    getFullIndex(row) {
      const uniqueIdArr = row.uniqueId.split('-')
      const newIndex = uniqueIdArr.map(e => parseInt(e) + 1)
      return newIndex.join('.')
    },
    getChildRows(row) {
      return this.tableData.filter(
        e => e.uniqueId.indexOf(row.uniqueId + '-') === 0
      )
    },
    /*-----------------------------------------------------------------------------------------
    ---------------------------------------下面是自定义级联复选框的------------------------------
    ------------------------------------------------------------------------------------------*/
    handleCheckedAll(val) {
      this.tableData.forEach(e => {
        e.checked = val
        e.isIndeterminate = false
      })
      this.indeterminateAll = false

      const returnData = val ? this.tableData : []
      this.$emit('handle-selection-change', returnData, {
        checked: val,
        checkedAll: true,
        rows: this.tableData
      })
    },
    handleCheckedRow(val, row) {
      const childs = this.getChildRows(row)
      if (childs.length > 0) {
        childs.forEach(e => {
          e.checked = val
          e.isIndeterminate = false
        })
      }
      if (!val) {
        row.isIndeterminate = false
      }
      // 如果是取消选中
      this.setParentChecked(row.parentUniqueId)

      // 头部全选反选
      const checkedData = this.tableData.filter(e => e.checked)
      this.indeterminateAll =
        checkedData.length > 0 && checkedData.length !== this.tableData.length
      this.checkedAll = checkedData.length === this.tableData.length
      const returnProptities = {
        checked: val,
        isCheckedAll: false,
        row
      }
      if (this.emitHalfSelection) {
        this.$emit(
          'handle-selection-change',
          this.tableData.filter(e => e.checked),
          returnProptities
        )
      } else {
        this.$emit(
          'handle-selection-change',
          this.tableData.filter(e => e.checked && !e.isIndeterminate),
          returnProptities
        )
      }
    },
    // 手动设置选中状态
    handleToggleSelectedRow(val, row) {
      const filterRow = this.tableData.filter(
        e => e[this.rowKey] === row[this.rowKey]
      )
      if (filterRow.length > 0) {
        console.log('filterRow', filterRow)
        filterRow[0].checked = val
        this.handleCheckedRow(val, row)
      }
    },
    handleToggleSelectedAll(val) {
      this.handleCheckedAll(val)
      this.indeterminateAll = false
      this.checkedAll = val
    },
    // 设置父级反选
    setParentChecked(parentUniqueId) {
      if (parentUniqueId) {
        const parentFilters = this.tableData.filter(
          e => e.uniqueId === parentUniqueId
        )
        if (parentFilters.length > 0) {
          const parent = parentFilters[0]
          //  所有子集
          const parentAllChild = this.tableData.filter(
            e => e.parentUniqueId === parentUniqueId
          )
          // 包括半选和全选
          const parentAllChildChecked = this.tableData.filter(
            e => e.parentUniqueId === parentUniqueId && e.checked
          )
          // 只是半选
          const parentAllChildIndeterminate = parentAllChildChecked.filter(
            e => e.isIndeterminate
          )
          const childLength = parentAllChild.length
          const CheckedLength = parentAllChildChecked.length
          const IndeterminateLength = parentAllChildIndeterminate.length
          if (CheckedLength > 0) {
            if (CheckedLength === childLength) {
              parent.checked = true
              parent.isIndeterminate = false
            }
            if (CheckedLength < childLength) {
              parent.checked = true
              parent.isIndeterminate = true
            }
            if (
              IndeterminateLength > 0 &&
              IndeterminateLength < CheckedLength
            ) {
              parent.isIndeterminate = true
            }
          } else {
            parent.isIndeterminate = false
            parent.checked = false
          }
          this.setParentChecked(parent.parentUniqueId)
        }
      }
    },
    getSpanMethod(val) {
      if (this.spanMethod) {
        return this.spanMethod(val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.i-table-custom {
  &.disable-children-selection {
    .row-child {
      .el-table-column--selection {
        .el-checkbox__input.is-disabled {
          display: none;
        }
      }
    }
  }
  .cell-ellipsis {
    .cell.el-tooltip {
      overflow: hidden;
      text-overflow: ellipsis;
      > div {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  &.single-choise {
    thead .el-table-column--selection .cell {
      display: none;
    }
  }
}
::v-deep.i-table-custom {
  .bgColor {
    background: #d8e5fd !important;
    border-top: 2px solid #fff;
    height: calc(100% - 2px);
  }
}

::v-deep.i-table-custom-expand {
  .el-table .tbody tr {
    background-color: none;
  }
  .el-table tr:nth-child(even) {
    background-color: #fff !important;
  }
  .el-table tr.even {
    background-color: rgba(22, 99, 246, 0.07) !important;
  }
}
</style>