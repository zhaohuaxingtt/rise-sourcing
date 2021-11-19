<!--
 * @Descripttion: 
 * @Author: Luoshuang
 * @Date: 2021-05-21 14:30:41
 * @LastEditTime: 2021-11-15 10:29:16
-->
<template>
  <el-table class="table" ref="multipleTable" fit tooltip-effect='light' :height="height" :data='tableData' v-loading='tableLoading' @selection-change="handleSelectionChange" :empty-text="language('ZANWUSHUJU', '暂无数据')" @select="handleSelect"  @select-all="handleSelectAll" :cell-style="borderLeft" >
    <el-table-column v-if="selection" type='selection' width="34" align='center'></el-table-column>
    <el-table-column v-if='indexKey' :class-name="indexKey ? 'tableIndex': ''" type='index' width='36' align='center' label='#' :fixed="isFixedIndex">
      <template slot-scope="scope">
        {{tableIndexString+(scope.$index+1)}}
      </template>
    </el-table-column>
    <template v-for="(items,index) in tableTitle">
      <!----------------------需要高亮的列并且带有打开详情事件------------------------>
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip='items.tooltip' v-if='items.props == activeItems' :prop="items.props" :label="items.key ? language(items.key, items.name) : items.name" :fixed="items.fixed">
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
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip='items.tooltip' v-else-if='items.props == activeItems2' :prop="items.props" :label="items.key ? language(items.key, items.name) : items.name" :fixed="items.fixed">
        <template slot-scope="row">
          <span class="flexRow">
            <span class="openLinkText cursor " @click="openPage2(row.row)"> {{ row.row[activeItems2] }}</span>
            <span v-if="row.row[activeItems2]" class="icon-gray  cursor "  @click="openPage2(row.row)">
                <icon symbol class="show" name="icontiaozhuananniu" />
                <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            </span>
          </span>  
        </template>
      </el-table-column>
      <!----------------------需要进行排序的列------------------------>
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth"  v-else-if='items.props == "paixu"' :fixed="items.fixed">
        <tempalte slot-scope="scope">
          <span @click="updateSlot(scope.row,0)" v-if='scope.row.recordId && parseInt(scope.row.recordId)'>
            <icon symbol class="cursor" name='iconliebiaoyizhiding' ></icon>
          </span>
          <span @click="updateSlot(scope.row,1)" v-else>
            <icon symbol class="cursor" name='iconliebiaoweizhiding'></icon>
          </span>
        </tempalte>
      </el-table-column>
      <!---------------------------可编辑列---------------------------------->
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip='items.tooltip' v-else-if="items.isPC" :prop="items.props" :label="items.key ? language(items.key, items.name) : items.name" :fixed="items.fixed">
        <template slot-scope="scope">
          <iInput type="number" v-if="items.type === 'input' && !disabled" v-model="scope.row[items.props]"  @input="val=>changeValue(val, scope.row, items)"></iInput>
          <span>{{ scope.row[items.props] }}</span>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip='items.tooltip' v-else-if="items.editable" :prop="items.props" :label="items.key ? language(items.key, items.name) : items.name" :fixed="items.fixed">
        <template slot="header">
          <span>{{items.key ? language(items.key, items.name) : items.name}}</span>
          <span v-if="items.required" style="color:red;">*</span>
        </template>
        <template slot-scope="scope">
          <div v-if="!disabled">
            <iInput v-if="items.type === 'input'" v-model="scope.row[items.props]" :class="scope.row[items.isChange] && editCompare && 'isChange'" @input="val=>changeValue(val, scope.row, items)"></iInput>
            <iSelect v-else-if="items.type === 'select'" v-model="scope.row[items.props]" :class="scope.row[items.isChange] && editCompare && 'isChange'" @change="val=>changeValue(val, scope.row, items)">
              <el-option
                :value="item.value"
                :label="item.label"
                v-for="(item, index) in items.selectOption"
                :key="index"
              ></el-option>
            </iSelect>
            <iDatePicker v-else-if="items.type === 'date' && items.parentProps" type="month" :value="getValue(scope.row, items)" @change="val=>changeValue(val, scope.row, items)" format="yyyy-MM" value-format="yyyy-MM" :class="scope.row[items.isChange] && editCompare && 'isChange'"></iDatePicker>
            <iDatePicker v-else-if="items.type === 'date'" type="month" v-model="scope.row[items.props]" @change="val=>changeValue(val, scope.row, items)" format="yyyy-MM" value-format="yyyy-MM" :class="scope.row[items.isChange] && editCompare && 'isChange'"></iDatePicker>
            <iInput v-else-if="items.type === 'rate' && items.parentProps" :value="getValue(scope.row, items)" @input="val=>changeValue(val, scope.row, items)" :class="scope.row[items.isChange] && editCompare && 'isChange'"></iInput>
            <iInput v-else-if="items.type === 'rate'" v-model="scope.row[items.props]" @input="val=>changeValue(val, scope.row, items)" :class="scope.row[items.isChange] && editCompare && 'isChange'"></iInput>
          </div>
          <div v-else>
            <span v-if="items.type === 'select'">{{ showLabel(scope.row[items.props], items.selectOption) }}</span>
            <span v-else>{{ scope.row[items.props] }}</span>
          </div>
        </template>
      </el-table-column>
      <!-------------------------正常列--------------------------->
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip='items.tooltip'  v-else :label="items.key ? language(items.key, items.name) : items.name" :prop="items.props" :fixed="items.fixed">
        <template slot="header">
          <span v-if="items.enName">{{items.name}}<br/>{{items.enName}}<span v-if="items.enName1">{{items.enName1}}</span></span>
          <span v-else>{{items.key ? language(items.key, items.name) : items.name}}</span>
        </template>
        <template v-if="$scopedSlots[items.props] || $slots[items.props]" v-slot="scope">
          <slot :name="items.props" :row="scope.row"></slot>
        </template>
        <template v-else slot-scope="scope">
          <!----------------------------附件综合管理-创建RFQ-产能计划列-------------------------------->
          <span v-if="items.props === 'channeng'" class="openLinkText cursor" @click="$emit('openPlan', scope.row)">编辑</span>
          <!----------------------------附件综合管理-附件列-------------------------------->
          <el-popover
            v-else-if="items.props === 'fujian'"
            placement="right"
            trigger="hover"
            popper-class="tableTitleTip"
            :visible-arrow="false">
            <template slot="">
              <p v-for="(item, index) in (scope.row.fileList || [])" :key="index">{{item.fileName}}</p>
            </template>
            <span slot="reference" @click="handleAttachmentDonwload(scope.row)" class="openLinkText cursor">下载</span>
          </el-popover>
          <span v-else-if="items.props === 'ltcRateOfThree'">{{(scope.row.ltcs[0]?scope.row.ltcs[0].ltcRate:'')+'/'+(scope.row.ltcs[1]?scope.row.ltcs[1].ltcRate:'')+'/'+(scope.row.ltcs[2]?scope.row.ltcs[2].ltcRate:'')}}</span>
          <!------------------枚举列--------------------------->
          <span v-else-if="items.isObject">{{scope.row[items.props].name || scope.row[items.props] }}</span>
           <!----------------现供供应商----------------------------->
          <span v-else-if="items.props === 'suppliersNow'" v-html="scope.row[items.props]">
            </span>
          <!------------------正常--------------------------->
          <span v-else>{{scope.row[items.props] || scope.row[items.props] === 0 ? scope.row[items.props].desc || scope.row[items.props] : ''}}</span>
        </template>
        <template v-if="items.children">
          <el-table-column v-for="(childItem, childIndex) in items.children" :key="childIndex" align='center' :width="childItem.width" :show-overflow-tooltip='childItem.tooltip'  :label="childItem.key ? language(childItem.key, childItem.name) : childItem.name" :prop="childItem.props">
            <template slot-scope="scope">
              <!----------------------------备注列-------------------------------->
              <span v-if="childItem.props === 'beizhu'" class="openLinkText cursor">查看</span>
              <span v-else-if="childItem.type === 'rate'">{{getRate(scope.row, childItem.props).rate}}</span>
              <icon v-else-if="childItem.type == 'rate' && getRate(scope.row, childItem.props).partSupplierRate === 0" symbol class="cursor" name='icontishi-cheng' style="margin-left:8px" @click.native="$emit('openDialog', scope.row)"></icon>
              <span>{{scope.row[childItem.props]}}</span>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
import {icon,iSelect,iInput, iDatePicker} from 'rise'
import {_getMathNumber} from '@/utils'
export default{
  components:{icon,iSelect,iInput, iDatePicker},
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
    disabled: {type:Boolean,default: false}
  },
  inject:['vm'],
  watch: {
    tableData(nv) {
      this.$nextTick(() => {
        const headerWrapperDom = this.$el.querySelector(".el-table__header-wrapper")
        const bodyWrapperDom = this.$el.querySelector(".el-table__body-wrapper")
        const tableFixedDom = this.$el.querySelector(".el-table__fixed")
        tableFixedDom.style.minHeight = tableFixedDom.style.maxHeight = (headerWrapperDom.clientHeight + bodyWrapperDom.clientHeight) + "px"
      })
    }
  },
  computed: {
    isFixedIndex() {
      if (Array.isArray(this.tableTitle)) {
        return this.tableTitle.find(item => item.fixed) ? true : false
      } else return false
    }
  },
  methods:{
    getRate(row, props) {
      const findItem = row.departmentRate?.find(item => item.rateDepartNum === props)
      return findItem || {}
    },
    handleAttachmentDonwload(row) {
      if (row.fileList?.length < 1) {
        return
      }
      this.$emit('handleFileDownload', row.fileList?.map(item => item.fileName), row.fileList)
    },
    getFileList(row) {
      return row.fileList?.map(item => item.fileName).join('\n')
    },
    changeValue(val, row, item) {
      this.$set(row, item.props, val)
      if (item.isPC) {
        this.$emit('tableValueChange', val, row, item)
        console.log(val, row, item)
      } else {
        row[item.isChange] = row[item.props+'Temp'] != (val === null ? '' : val)
      }
    },
    getValue(row, item) {
      if (item.parentProps) {
        if (row && row[item.parentProps] && row[item.parentProps][item.propsIndex - 1]) {
          return row[item.parentProps][item.propsIndex - 1][item.props]
        }
      } else {
        return row[item.props]
      }
    },
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
    openPage2(e){
      this.$emit('openPage2',e)
    },	
    activeTop(e){
      this.$emit('activeTop',e)
    },
    updateSlot(e,a){
      this.$emit('updateSlot',[e,a])
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
    },
    showLabel(value, options = []) {
      const current =  options.find(item => item.value === value)

      return current ? current.label : value
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

  .table {
    ::v-deep .el-table-column--selection .cell,
    ::v-deep .tableIndex .cell {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
</style>