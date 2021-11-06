<template>
  <el-table
    tooltip-effect="light"
    :height="height"
    :data="realTableData"
    v-loading="loading"
    @selection-change="handleSelectionChange"
    highlight-current-row
    @current-change="handleCurrentChange"
    @cell-click="handleCellClick"
    :empty-text="$t('LK_ZANWUSHUJU')"
    ref="customTable"
  >
    <template v-for="(item, index) in columns">
      <el-table-column
        :key="index"
        v-if="['selection', 'index'].includes(item.type)"
        :type="item.type"
        :label="item.i18n ? $t(item.i18n) : item.label"
        :width="item.width || 50"
        align="center"
      />
      <el-table-column
        v-else
        :key="index"
        :type="item.type"
        :align="item.align || 'center'"
        :header-align="item.headerAlign"
        :show-overflow-tooltip="item.tooltip"
        :prop="item.prop"
        :label="item.i18n ? $t(item.i18n) : item.label"
        :width="item.width || 'auto'"
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
            />
            <span v-else>
              {{ scope.row[item.prop] }}
            </span>
          </div>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import { iButton, iSelect, iInput, iRadio } from 'rise'
import iTableColumn from './iTableColumn'
/**
 * 自定义表格组件
 * @params data 表格列表数据
 * @params columns 列配置
 * @params loading loading
 * @params height 高度
 * @params extraData 注入的扩展数据
 * @params treeExpand 展开行 { expandKey: 'name', childrenKey: 'children' }
 * @method handleSelectionChange 选择框回调
 * @method handleEmit 点击单元格回调
 *
 * @example columns
   {
      prop: 'attach', // 可选 
      label: '附件', // label，i18n 必填一个
      align: 'left', // 可选 
      headerAlign: 'center', // 可选
      width: 100, // 可选 
      tooltip: false, // 可选 
      i18n: '', // label，i18n 必填一个
      type: "", // 类型 "selection/index/expanded"
      customRender: (h, scope) => {
        return (
          <span class='open-link-text'>
            {scope.row.text}
          </span>
        )
      }
    }
 */
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { iTableColumn, iButton, iSelect, iInput, iRadio },

  props: {
    data: {
      type: Array,
      default: function() {
        return []
      },
    },
    columns: {
      type: Array,
      default: function() {
        return []
      },
    },
    loading: { type: Boolean, default: false },
    height: { type: Number || String },
    extraData: {
      type: Object,
      default: function() {
        return {}
      },
    },
    treeExpand: {
      type: Object,
    }
  },
  computed: {
    realTableData() {
      if (this.treeExpand) {
        return this.tableData.filter((e) => e.visible)
      } else {
        return this.tableData
      }
    },
  },
  data() {
    return {
      tableData: [],
    }
  },
  watch: {
    data() {
      this.getTableData()
    },
  },
  created() {
    this.getTableData()
  },

  methods: {
    handleCurrentChange (val) {
      this.$emit('handle-current-change', val)
    },
    handleSelectionChange(val) {
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
      }
    },
    getTreeTableData(data, parentKey, res) {
      parentKey = parentKey || ''
      res = res || []
      const { childrenKey } = this.treeExpand
      for (let i = 0; i < data.length; i++) {
        const row = data[i]
        const uniqueId = parentKey ? `${parentKey}-${i}` : `${i}`
        const resItem = {
          uniqueId,
          isLeaf: !Object.hasOwnProperty.call(row, childrenKey),
          expanded: true,
          visible: true,
          parentUniqueId: parentKey,
        }

        for (const k in row) {
          if (Object.hasOwnProperty.call(row, k)) {
            const item = row[k]
            if (k !== childrenKey) {
              resItem[k] = item
            }
          }
        }
        res.push(resItem)
        if (Object.hasOwnProperty.call(row, childrenKey)) {
          this.getTreeTableData(row[childrenKey], uniqueId, res)
        }
      }
      return res
    },
    handleCellClick(row, column) {
      if (this.treeExpand) {
        if (this.treeExpand.expandKey === column.property) {
          row.expanded = !row.expanded
          this.tableData.forEach((element, i) => {
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
  },
}
</script>

<style lang="scss" scoped>
</style>
