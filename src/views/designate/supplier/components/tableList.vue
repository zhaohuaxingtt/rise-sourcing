<!--
 * @Author: haojiang
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-07-16 15:31:21
 * @LastEditors: Please set LastEditors
 * @Description: 来自零件签收-table组件，新增了单列的异常配置
-->
<template>
  <el-table fit tooltip-effect='light' :height="height" :data='tableData' default-expand-all  v-bind="treeProps" v-loading='tableLoading' @selection-change="handleSelectionChange" :empty-text="$t('LK_ZANWUSHUJU')" ref="moviesTable" :class="{'moviesTable': true, 'radio': radio}" @select="handleSelect"  @select-all="handleSelectAll" :cell-style="borderLeft">
    <el-table-column v-if="selection" type='selection' width="56" align='center'></el-table-column>
    <el-table-column v-if='index' type='index' width='50' align='center' :label='indexLabel'>
      <template slot-scope="scope">
        <slot :name="`_index`" :row="scope.row" :$index="scope.$index">
          {{scope.$index+1}}
        </slot>
      </template>
    </el-table-column>
    <template v-for="(items,index) in tableTitle">
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth ? items.minWidth.toString():''" :show-overflow-tooltip='items.tooltip' v-if='items.props == activeItems' :prop="items.props" :label="lang ? language(items.key, items.name) : $t(items.key)">
        <template slot-scope="row">
           <span class="flexRow">
            <span class="openLinkText cursor "  @click="openPage(row.row)"> {{ row.row[activeItems]}}</span>
            <span class="icon-gray  cursor " v-if="row.row[activeItems]"  @click="openPage(row.row)">
                <icon symbol class="show" name="icontiaozhuananniu" />
                <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            </span>
          </span> 
          </template>
      </el-table-column>
      <el-table-column :key="index" align='center' :show-overflow-tooltip='items.tooltip'  v-else-if='items.props == "tpInfoType"' :label="lang ? language(items.key, items.name) : $t(items.key)" :prop="items.props">
        <template slot-scope="scope">
          <span>{{translateData('tp_info_type',scope.row[items.props])}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-else 
        :key="index" 
        align='center' 
        :width="items.width"
        :min-width="items.minWidth ? items.minWidth.toString():''" 
        :show-overflow-tooltip='items.tooltip'
        :label="lang ? language(items.key, items.name) : $t(items.key)" 
        :prop="items.props"
        :class-name="items.tree ? 'tree' : ''">
        <template slot-scope="scope">
          <span :class="{normal: true, child: scope.row.children}">
            <slot :name="items.props" :row="scope.row" :$index="scope.$index">
              {{scope.row[items.props]}}
            </slot>
          </span>
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
    radio:{type:Boolean,default:false}, //是否单选
    treeProps: {type:Object},
    lang: {type: Boolean}
  },
  inject:['vm'],
  components:{icon},
  methods:{
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
  .openLinkText{
    color:$color-blue;
  }
  .radio {
    ::v-deep thead .el-table-column--selection .cell {
      display: none;
    }
  }
  ::v-deep.el-table.moviesTable {
    .tree {
      text-align: right;
      box-sizing: border-box;
      padding-right: 40px;
      .normal {
        width: 270px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        margin-right: 20px;
        &.child {
          margin-right: 0px;
        }
      }
      .el-table__expand-icon {
        float: right;
        transform: rotate(180deg);
        &.el-table__expand-icon--expanded {
          transform: rotate(0deg);
        }
        i::before {
          content: '\e78f';
        }
      }
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