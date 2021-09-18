<!--
 * @Author: yuszhou
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-09-18 01:59:35
 * @LastEditors: Please set LastEditors
 * @Description: 零件签收-table组件。
 * @FilePath: \front-web\src\views\partsign\home\components\tableList.vue
-->
<template>
  <el-table fit tooltip-effect='light' :height="height" :data='tableData' v-loading='tableLoading' @selection-change="handleSelectionChange" :empty-text="language('LK_ZANWUSHUJU','暂无数据')" ref="moviesTable" :class="radio && 'radio'" @select="handleSelect"  @select-all="handleSelectAll" :cell-style="borderLeft" @row-click='rowClick'>
    <el-table-column v-if="selection" :selectable='selectable' type='selection' width="40" align='center'></el-table-column>
    <el-table-column v-if='index' type='index' width='50' align='center' :label='indexLabel'></el-table-column>
    <template v-for="(items,index) in tableTitle">
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth ? items.minWidth.toString():''" :show-overflow-tooltip='items.tooltip' v-if='items.props == activeItems' :prop="items.props" :label="items.key ? language(items.key,items.name) : items.name">
        <template slot-scope="row">
          <span class="flexRow">
            <span class="openLinkText cursor " @click="openPage(row.row)"> {{ row.row[activeItems] }}</span>
            <span v-if="row.row[activeItems]" class="icon-gray  cursor "  @click="openPage(row.row)">
                <icon symbol class="show" name="icontiaozhuananniu" />
                <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            </span>
          </span>  
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth ? items.minWidth.toString():''" :show-overflow-tooltip='items.tooltip'  v-else :label="items.key ? language(items.key,items.name) : items.name" :prop="items.props">
        <template v-if="$scopedSlots[items.props] || $slots[items.props]" v-slot="scope">
          <slot :name="items.props" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
import {icon} from "rise"
export default{
  props:{
    tableData:{type:Array},
    tableTitle:{type:Array},
    tableLoading:{type:Boolean,default:false},
    selection:{type:Boolean,default:true},
    index:{type:Boolean,default:false},
    indexLabel:{type:String,default:'#'},
    height:{type:Number||String},
    activeItems:{type:String,default:'b'},
	  radio:{type:Boolean,default:false},// 是否单选
    selectable:{type:Function,default:()=> true},
    borderLeftStatus:{type:Boolean,default:true}
  },
  inject:['vm'],
  components: { icon } ,
  methods:{
    rowClick(row){
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    clearSelection(){
      this.$refs.moviesTable.clearSelection()
    },
    toggleRowSelection(data,b=true){
      this.$refs.moviesTable.toggleRowSelection(data,b)
    },
    handleSelectionChange(val){
		if (this.radio) {
			if (val.length > 1) {
			//取出最后val的最后一个返回出来
			var duoxuans=val.pop();
			this.handleSelectArr=val.pop();
			//清除所有选中
			this.$refs.moviesTable.clearSelection()
			//给最后一个加上选中
			this.$refs.moviesTable.toggleRowSelection(duoxuans)
			} else {
			this.$emit('handleSelectionChange',val)
			}
		}else{
			this.$emit('handleSelectionChange',val)
		}
    },
    openPage(e){
      this.$emit('openPage',e)
    },
    translateData(key,row){
      try {
        return this.vm.getGroupList(key).find(i=>i.key == row).value
      } catch (error) {
        return ''
      }
    },
    handleSelect(selection,row){
      this.$emit('select',{selection,row})
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
    defaultSelectAll(){
      this.$refs.moviesTable.toggleAllSelection()
    },
    borderLeft({row, column, rowIndex, columnIndex}){
      if(columnIndex === 0 && row.selectedBorder === true && this.borderLeftStatus){
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
 
  .openLinkText{
    color:$color-blue;
  }
  .radio{
	  ::v-deep thead .el-table-column--selection .cell {
	  	display: none;
	  }
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
    justify-content: space-between;
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