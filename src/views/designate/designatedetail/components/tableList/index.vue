<!--
 * @Descripttion: 
 * @Author: Luoshuang
 * @Date: 2021-05-21 14:30:41
 * @LastEditTime: 2021-06-05 14:06:16
-->
<template>
  <el-table ref="multipleTable" fit tooltip-effect='light' :height="height" :data='tableData' v-loading='tableLoading' @selection-change="handleSelectionChange" :empty-text="$t('LK_ZANWUSHUJU')" >
    <el-table-column v-if="selection" type='selection' width="50" align='center'></el-table-column>
    <el-table-column v-if='indexKey' type='index' width='50' align='center' label='#'>
      <template slot-scope="scope">
        {{tableIndexString+(scope.$index+1)}}
      </template>
    </el-table-column>
    <template v-for="(items,index) in tableTitle">
      <!----------------------需要高亮的列并且带有打开详情事件------------------------>
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip='items.tooltip' v-if='items.props == activeItems' :prop="items.props" :label="items.key ? $t(items.key) : items.name">
        <template slot-scope="row"><span class="openLinkText cursor" @click="openPage(row.row)">{{row.row[activeItems]}}</span></template>
      </el-table-column>
      <!----------------------需要进行排序的列------------------------>
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth"  v-else-if='items.props == "paixu"'>
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
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip='items.tooltip' v-else-if="items.editable" :prop="items.props" :label="items.key ? $t(items.key) : items.name">
        <template slot="header">
          <span>{{items.key ? $t(items.key) : items.name}}</span>
          <span v-if="items.required" style="color:red;">*</span>
        </template>
        <template slot-scope="scope">
          <iInput v-if="items.type === 'input'" v-model="scope.row[items.props]" :class="scope.row[items.isChange] && 'isChange'"></iInput>
          <iSelect v-else-if="items.type === 'select'" v-model="scope.row[items.props]" :class="scope.row[items.isChange] && 'isChange'">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="(item, index) in items.selectOption"
              :key="index"
            ></el-option>
          </iSelect>
          <iDatePicker v-else-if="items.type === 'date' && items.parentProps" :value="getValue(scope.row, items)" @change="val=>changeValue(val, scope.row, items)" value-format="" :class="scope.row[items.isChange] && 'isChange'"></iDatePicker>
          <iDatePicker v-else-if="items.type === 'date'" :value="getValue(scope.row, items)" @change="val=>changeValue(val, scope.row, items)" value-format="" :class="scope.row[items.isChange] && 'isChange'"></iDatePicker>
          <iInput v-else-if="items.type === 'rate' && items.parentProps" :value="getValue(scope.row, items)" @change="val=>changeValue(val, scope.row, items)" :class="scope.row[items.isChange] && 'isChange'"></iInput>
          <iInput v-else-if="items.type === 'rate'" :value="getValue(scope.row, items)" @change="val=>changeValue(val, scope.row, items)" :class="scope.row[items.isChange] && 'isChange'"></iInput>
        </template>
      </el-table-column>
      <!-------------------------正常列--------------------------->
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip='items.tooltip'  v-else :label="items.key ? $t(items.key) : items.name" :prop="items.props">
        <template slot="header">
          <span v-if="items.enName">{{items.name}}<span><br />{{items.enName}}<br v-if="items.enName1" />{{items.enName1}}</span></span>
          <span v-else>{{items.key ? $t(items.key) : items.name}}</span>
        </template>
        <template slot-scope="scope">
          <!----------------------------附件综合管理-创建RFQ-产能计划列-------------------------------->
          <span v-if="items.props === 'channeng'" class="openLinkText cursor" @click="$emit('openPlan', scope.row)">编辑</span>
          <!----------------------------附件综合管理-附件列-------------------------------->
          <el-popover
            v-else-if="items.props === 'fujian'"
            placement="right"
            trigger="hover"
            popper-class="tableTitleTip"
            :content="getFileList(scope.row)"
            :visible-arrow="false">
            <span slot="reference" @click="handleAttachmentDonwload(scope.row)" class="openLinkText cursor">下载</span>
          </el-popover>
          <!------------------正常--------------------------->
          <span v-else>{{scope.row[items.props]}}</span>
        </template>
        <template v-if="items.children">
          <el-table-column v-for="(childItem, childIndex) in items.children" :key="childIndex" align='center' :width="childItem.width" :show-overflow-tooltip='childItem.tooltip'  :label="childItem.key ? $t(childItem.key) : childItem.name" :prop="childItem.props">
            <template slot-scope="scope">
              <!----------------------------备注列-------------------------------->
              <span v-if="childItem.props === 'beizhu'" class="openLinkText cursor">查看</span>
              <span v-else>{{scope.row[childItem.props]}}</span>
              <icon v-if="scope.row.withIcon && scope.row.withIcon.includes(childItem.props)" symbol class="cursor" name='icontishi-cheng' style="margin-left:8px" @click.native="$emit('openDialog')"></icon>
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
    selectedItems:{type:Array}
  },
  inject:['vm'],
  methods:{
    handleAttachmentDonwload(row) {
      if (row.fileList?.length < 1) {
        return
      }
      this.$emit('handleFileDownload', row.fileList?.map(item => item.fileName))
    },
    getFileList(row) {
      return row.fileList?.map(item => item.fileName).join('<br/>')
    },
    changeValue(val, row, item) {
      if (item.parentProps) {
        if (row && row[item.parentProps] && row[item.parentProps][item.propsIndex - 1]) {
          // return row[item.parentProps][item.propsIndex - 1][item.props]
        }
      } else {
        // return row[item.props]
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
    activeTop(e){
      this.$emit('activeTop',e)
    },
    updateSlot(e,a){
      this.$emit('updateSlot',[e,a])
    },
  }
}
</script>
<style lang='scss' scoped>
  .openLinkText{
    color:$color-blue;
    text-decoration: underline;
  }
  .radio{
    ::v-deep thead .el-table-column--selection .cell {
    display: none;
	}
  
  }
</style>