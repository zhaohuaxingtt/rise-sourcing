<!--
 * @Author: wentliao
 * @Date: 2021-07-29 09:44:04
 * @Description: 供cover可用的tablelist
-->
<template>
  <el-table 
    ref="table" 
    class="table" 
    :class="singleSelect ? 'singleSelectTable' : ''" 
    :height="height" 
    :data="tableData" 
    :cell-class-name="cellClassName" 
    v-loading="tableLoading" 
    @selection-change="handleSelectionChange" 
    @select="handleSelect" 
    :empty-text="language('LK_ZANWUSHUJU','暂无数据')" 
    @select-all="handleSelectAll" 
    :cell-style="borderLeft" 
    :show-summary="showSummary"
    :summary-method="getSummaries"
    :sum-text="sumText"
    :header-cell-class-name="headerClass"
    @row-click="cellClick"
  >
    <el-table-column v-if="selection || singleSelect" type="selection" align="center" width="55" :selectable="selectable"></el-table-column>
    <el-table-column v-if="index" type="index" align="center" :label="indexLabel"></el-table-column>
    <template v-for="(item, $index) in tableTitle">
      <el-table-column :key="$index" align="center" :label="lang ? language(item.key, item.name) : item.name" :prop="item.props" :show-overflow-tooltip="item.tooltip" :width="item.width" :min-width="item.minWidth ? item.minWidth.toString():''">
        <template v-if="$scopedSlots[item.props] || $slots[item.props]" v-slot="scope">
          <slot :name="item.props" :row="scope.row" :index="scope.$index"></slot>
        </template>
        
        <template #header="scope">
          <span>{{ scope.column.label }}</span>
          <i v-if="item.require" class="label-require margin-left3 margin-right3">*</i>
          <el-popover
            placement="top"
            trigger="hover"
            popper-class="tableTitleTip"
            :visible-arrow="false"
            :disabled="!item.showTips">
            <p v-html="item.showTips ? item.tips() : ''"></p>
            <span slot="reference">
              <icon v-if="item.showTips" class="require margin-left4" symbol name="iconxinxitishi" />
            </span>
          </el-popover>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import tablelist from '@/views/partsign/home/components/tableList'
import { icon } from 'rise';

export default {
  components:{
    icon,
  },
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
    showSummary: { type: Boolean, default: false }, //  是否显示总结行
    getSummaries: { type: Function },
    headerClass: { type: Function },
    selectable: { type: Function },
    sumText:{type:String,default:''}
  },
  created() {
    console.log(this.$slots)
  },
  methods: {
    rowClick(row){
      this.$refs.table.toggleRowSelection(row)
    },
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
    },
    handleSelectAll(selection){  
      const flag = selection.length
      for(let i= 0  ; i<flag;i++){
        this.$set(selection[i],'selectedBorder',!!flag)
      }
      !flag? this.tableData.forEach(i=>{i.selectedBorder=!i.selectedBorder}):''
    },
    borderLeft({row, column, rowIndex, columnIndex}){
      if(columnIndex === 0 && row.selectedBorder === true){
         return "border-left:2px solid #67C23A;"
      }
      else{
        return ""
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

  ::v-deep th>.cell .label-require{
    color: #f56c6c;
    font-style:normal;
  }
}

.singleSelectTable {
  ::v-deep .el-table__header-wrapper .el-checkbox {
    display: none;
  }

}
</style>