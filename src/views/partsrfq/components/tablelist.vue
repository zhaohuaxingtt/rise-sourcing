<!--
 * @Author: moxuan
 * @Date: 2021-03-04 17:33:00
 * @LastEditors: Please set LastEditors
 * @Description: RFQ-table组件。
-->
<template>
  <el-table :height="height" tooltip-effect='light' :data='tableData' :empty-text="$t('LK_ZANWUSHUJU')" v-loading='tableLoading' @selection-change="handleSelectionChange" @select="handleSelect"  @select-all="handleSelectAll" :cell-style="borderLeft">
    <el-table-column v-if="selection" type='selection' width="50" align='center'></el-table-column>
<!--    <el-table-column v-if='index' type='index' width='50' align='center' label='#'></el-table-column>-->
    <template v-for="(items,index) in tableTitle">
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth ? items.minWidth.toString():''" :show-overflow-tooltip='items.tooltip' v-if='items.props === openPageProps' :prop="items.props"
                       :label="lang ? language(items.key, items.name) : (items.key ? $t(items.key) : items.name)" :fixed="items.fixed">
        <template slot-scope="scope">
          <span class="flexRow">
            <span class="openLinkText cursor" @click="openPage(openPageGetRowData ?  scope.row : scope.row[items.props])">{{customOpenPageWord ? customOpenPageWord : scope.row[openPageProps]}}</span>
              <span class="icon-gray  cursor "  @click="openPage(openPageGetRowData ?  scope.row : scope.row[items.props])">
                <icon symbol class="show" name="icontiaozhuananniu" />
                <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
              </span>
          </span>  
        </template>
      </el-table-column>
      <el-table-column :width="items.width" :min-width="items.minWidth ? items.minWidth.toString():''" :show-overflow-tooltip='items.tooltip' :key="index" align='center' v-else-if='inputProps.includes(items.props)' :prop="items.props"
                       :label="lang ? language(items.key, items.name) : (items.key ? $t(items.key) : items.name)">
        <template slot-scope="scope">
          <i-input v-model="scope.row[items.props]" v-if="inputType" :type="inputType"/>
          <i-input v-model="scope.row[items.props]" v-else/>
        </template>
      </el-table-column>
      <el-table-column :width="items.width" :min-width="items.minWidth ? items.minWidth.toString():''" :show-overflow-tooltip='items.tooltip' :key="index" align='center'
                       v-else-if='isSelectOptionsLinkage && selectProps.includes(items.props)' :prop="items.props"
                       :label="lang ? language(items.key, items.name) : (items.key ? $t(items.key) : items.name)">
        <template slot-scope="scope">
          <i-select v-model="scope.row[items.props]"
                    @change="(val)=>handleSelectChange(items.props,val, scope.row.time)">
            <el-option v-for="items in selectPropsOptionsObject[scope.row.time][items.props]" :key='items.code'
                       :value='items.code'
                       :label="lang ? language(items.key, items.name) : (items.key ? $t(items.key) : items.name)"/>
          </i-select>
        </template>
      </el-table-column>
      <el-table-column :min-width="items.minWidth ? items.minWidth.toString():''" :show-overflow-tooltip='items.tooltip' :key="index" align='center'
                       v-else-if='!isSelectOptionsLinkage && selectProps.includes(items.props)' :prop="items.props"
                       :label="lang ? language(items.key, items.name) : (items.key ? $t(items.key) : items.name)">
        <template slot-scope="scope">
          <i-select v-model="scope.row[items.props]">
            <el-option v-for="items in selectPropsOptionsObject[items.props]" :key='items.code' :value='items.code'
                       :label="lang ? language(items.key, items.name) : (items.key ? $t(items.key) : items.name)"/>
          </i-select>
        </template>
      </el-table-column>
      <el-table-column :width="items.width" :min-width="items.minWidth ? items.minWidth.toString():''" :show-overflow-tooltip='items.tooltip' :key="index" align='center' v-else-if='items.props === iconProps' :prop="items.props"
                       :label="lang ? language(items.key, items.name) : (items.key ? $t(items.key) : items.name)">
        <template slot-scope="scope">
          <slot name="icon" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <el-table-column :min-width="items.minWidth ? items.minWidth.toString():''" :show-overflow-tooltip='items.tooltip' :key="index" align='center' v-else-if='items.props === fileSizeProps' :prop="items.props"
                       :label="lang ? language(items.key, items.name) : (items.key ? $t(items.key) : items.name)">
        <template slot-scope="scope">
          {{ scope.row[items.props] }}
        </template>
      </el-table-column>
      <el-table-column :width="items.width" :min-width="items.minWidth ? items.minWidth.toString():''" :show-overflow-tooltip='items.tooltip' :key="index" align='center' v-else :label="lang ? language(items.key, items.name) : (items.key ? $t(items.key) : items.name)"
                       :prop="items.props" :fixed="items.fixed">
        <template v-if="$scopedSlots[items.props] || $slots[items.props]" v-slot="scope">
          <slot :name="items.props" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
import {iInput, iSelect} from 'rise'
import {icon} from "rise"
export default {
  props: {
    tableData: {type: Array},
    tableTitle: {type: Array},
    tableLoading: {type: Boolean, default: false},
    selection: {type: Boolean, default: true},
    index: {type: Boolean, default: false},
    height: {type: Number || String},
    openPageProps: {type: String, default: ''},
    inputProps: {
      type: Array, default: () => {
        return []
      }
    },
    selectProps: {
      type: Array, default: () => {
        return []
      }
    },
    selectPropsOptionsObject: {
      type: Object, default: () => {
        return {}
      }
    },
    isSelectOptionsLinkage: {
      type: Boolean, default: false
    },
    iconProps: {type: String, default: ''},
    customOpenPageWord: {type: String, default: ''},
    openPageGetRowData: {type: Boolean, default: false},
    fileSizeProps: {type: String, default: 'fileSize'},
    inputType: {type: String, default: ''},
    lang: {type: Boolean, default: false}
  },
  components: {
    iInput,
    iSelect,
    icon
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    handleSelectChange(type, val, time) {
      const res = {
        type,
        val,
        time
      }
      this.$emit('handleSelectChange', res)
    },
    openPage(params) {
      this.$emit('openPage', params)
    },
    handleSelect(selection,row){
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
         return "border-left:2px solid #1660F1;"
      }
      else{
        return ""
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
}

.el-select {
  margin: 2px 0;
}

::v-deep .el-table__row .el-input {
  height: 35px !important;

  .el-input__inner {
    height: 35px !important;
  }
}

.icon {
  // color: $color-blue;
}
.icon-gray{
  cursor: pointer;
  .active{
    display: none;
  }
    .show{
      display: block;
    }
  }
.flexRow{
  display: flex;
  justify-content: space-between ;
  align-items: center;  
}
.icon-gray:hover{
  cursor: pointer;
  .show{
    display: none;
  }
  .active{
    display: block;
  }
}
</style>