<!--
 * @Author: haojiang
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-07-12 18:07:54
 * @LastEditors: Please set LastEditors
-->
<template>
  <el-table fit tooltip-effect='light' :height="height" :data='tableData' default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id" v-loading='tableLoading' @selection-change="handleSelectionChange" :empty-text="$t('LK_ZANWUSHUJU')" ref="moviesTable" :class="{'moviesTable': true, 'radio': radio}">
    <el-table-column v-if="selection" type='selection' width="56" align='center'></el-table-column>
    <el-table-column v-if='index' type='index' width='50' align='center' :label='indexLabel'></el-table-column>
    <template v-for="(items,index) in tableTitle">
      <el-table-column :key="index" align='center' :width="items.width" :show-overflow-tooltip='items.tooltip' v-if='items.props == activeItems' :prop="items.props" :label="items.key ? $t(items.key) : items.name">
        <template slot-scope="row"><span class="openLinkText cursor" @click="openPage(row.row)">{{row.row[activeItems]}}</span></template>
      </el-table-column>
      <el-table-column :key="index" align='center' :show-overflow-tooltip='items.tooltip'  v-else-if='items.props == "tpInfoType"' :label="items.key ? $t(items.key) : items.name" :prop="items.props">
        <template slot-scope="scope">
          <span>{{translateData('tp_info_type',scope.row[items.props])}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-else 
        :key="index" 
        align='center' 
        :width="items.width" 
        :show-overflow-tooltip='items.tooltip'
        :label="items.key ? $t(items.key) 
        :items.name" 
        :prop="items.props"
        :class-name="items.tree ? 'tree' : ''">
        <template slot-scope="scope">
          <slot :name="items.props" :row="scope.row">
            <span :class="{normal: true, child: scope.row.children}">{{scope.row[items.props]}}</span>
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
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
    treeProps: {type:Object}
  },
  inject:['vm'],
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
        width: 140px;
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
  
</style>