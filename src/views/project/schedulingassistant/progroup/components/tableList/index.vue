<!--
 * @Author: Luoshuang
 * @Date: 2021-07-28 16:13:36
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-03 16:58:26
 * @Description: 
 * @FilePath: \front-web\src\views\project\schedulingassistant\progroup\components\tableList\index.vue
-->

<template>
  <el-table ref="multipleTable" fit tooltip-effect='light' :height="height" :data='tableData' v-loading='tableLoading' @selection-change="handleSelectionChange" :empty-text="language('ZANWUSHUJU', '暂无数据')" @select="handleSelect"  @select-all="handleSelectAll" :cell-style="borderLeft" >
    <el-table-column v-if="selection" type='selection' width="56" align='center'></el-table-column>
    <el-table-column v-if='indexKey' type='index' width='50' align='center' label='#'>
      <template slot-scope="scope">
        {{tableIndexString+(scope.$index+1)}}
      </template>
    </el-table-column>
    <template v-for="(items,index) in tableTitle">
      <!----------------------需要高亮的列并且带有打开详情事件------------------------>
      <el-table-column :key="index" align='center' :width="items.width * detectZoom " :min-width="items.minWidth* detectZoom " :show-overflow-tooltip='items.tooltip' v-if='items.props == activeItems' :prop="items.props" :label="items.key ? language(items.key, items.name) : items.name">
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
      <!---------------------------可编辑列---------------------------------->
      <el-table-column :key="index" align='center' :width="items.width * detectZoom " :min-width="items.minWidth* detectZoom " :show-overflow-tooltip='items.tooltip' v-else-if="items.editable" :prop="items.props" :label="items.key ? language(items.key, items.name) : items.name">
        <template slot="header">
          <span>{{items.key ? language(items.key, items.name) : items.name}}</span>
          <span v-if="items.required" style="color:red;">*</span>
        </template>
        <template slot-scope="scope">
          <iInput v-if="items.type === 'input'" v-model="scope.row[items.props]"></iInput>
          <iSelect v-else-if="items.type === 'select'" v-model="scope.row[items.props]" @change="val => $emit('handleSelectChange', val, scope.row)">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="(item, index) in scope.row.selectOption"
              :key="index"
            ></el-option>
          </iSelect>
          <iDatePicker value-format="yyyy-MM-dd" v-else-if="items.type === 'date'" v-model="scope.row[items.props]" />
        </template>
      </el-table-column>
      <!-------------------------正常列--------------------------->
      <el-table-column :key="index" align='center' :width="items.width * detectZoom " :min-width="items.minWidth* detectZoom " :show-overflow-tooltip='items.tooltip'  v-else :label="items.key ? language(items.key, items.name) : items.name" :prop="items.props">
        <template slot="header">
          <span v-if="items.enName">{{items.name}}<span><br />{{items.enName}}<br v-if="items.enName1" />{{items.enName1}}</span></span>
          <span v-else>{{items.key ? language(items.key, items.name) : items.name}}</span>
        </template>
        <template v-if="$scopedSlots[items.props] || $slots[items.props]" v-slot="scope">
          <slot :name="items.props" :row="scope.row"></slot>
        </template>
        <template v-else slot-scope="scope">
          <!------------------正常--------------------------->
          <span>{{scope.row[items.props] || scope.row[items.props] === 0 ? scope.row[items.props].desc || scope.row[items.props] : showPot ? '-':''}}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
import {icon,iSelect,iInput,iDatePicker} from 'rise'
import {_getMathNumber} from '@/utils'
export default{
  components:{icon,iSelect,iInput,iDatePicker},
  props:{
    tableData:{type:Array},
    tableTitle:{type:Array},
    tableLoading:{type:Boolean,default:false},
    selection:{type:Boolean,default:true},
    height:{type:Number||String},
    activeItems:{type:String,default:'b'},
    tableIndexString:{
      type:String,
      default:''
    },
    indexKey:Boolean,
    notEdit:Boolean,
    doubleHeader:Boolean,
    selectedItems:{type:Array},
    editCompare: {type: Boolean, default: true},
    activeItems2:{type:String,default:'b'},
    showPot: {type: Boolean,default:false}
  },
  inject:['vm'],
  computed: {
    detectZoom() {
      const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (!clientWidth) return 1;
      const ratio = clientWidth / 1920;
      console.log('fontSize', ratio)
  //  return Number((res * fontSize).toFixed(1));
      return ratio < 0.8 ? 0.8 : ratio;
    }
  },
  methods:{
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val){
      this.$emit('handleSelectionChange',val)
    },
    openPage(e){
      this.$emit('openPage',e)
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
    // text-decoration: underline;
  }
  .radio{
    ::v-deep thead .el-table-column--selection .cell {
    display: none;
	}
  
  }
  .isChange {
    ::v-deep .el-input__inner {
      color: red;
      background: rgb(255 0 0 / 10%);
      border-color: red;
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
  ::v-deep .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
</style>