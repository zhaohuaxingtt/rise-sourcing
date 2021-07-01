<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 14:42:20
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-30 14:26:29
 * @Description: 财务目标价公用表格
 * @FilePath: \front-web\src\views\financialTargetPrice\components\tableList.vue
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
      <!---------------------------可编辑列---------------------------------->
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip='items.tooltip' v-else-if="items.editable" :prop="items.props" :label="items.key ? $t(items.key) : items.name">
        <template slot="header">
          <span>{{items.key ? $t(items.key) : items.name}}</span>
          <span v-if="items.required" style="color:red;">*</span>
        </template>
        <template slot-scope="scope">
          <iInput v-if="isEdit && selectedItems.some(item => item.applyId === scope.row.applyId) && items.type === 'input'" v-model="scope.row[items.props]" @input="val=>changeValue(val, scope.row, items)"></iInput>
          <iSelect v-else-if="isEdit  && selectedItems.some(item => item.applyId === scope.row.applyId) && items.type === 'select'" v-model="scope.row[items.props]" @change="val=>changeValue(val, scope.row, items)">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="(item, index) in items.selectOption"
              :key="index"
            ></el-option>
          </iSelect>
          <span v-else>{{scope.row[items.props]}}</span>
        </template>
      </el-table-column>
      <!-------------------------正常列--------------------------->
      <el-table-column :key="index" align='center' :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip='items.tooltip'  v-else :label="items.key ? $t(items.key) : items.name" :prop="items.props">
        <template slot="header">
          <span v-if="items.enName">{{items.name}}<span><br />{{items.enName}}<br v-if="items.enName1" />{{items.enName1}}</span></span>
          <span v-else>{{items.key ? $t(items.key) : items.name}}</span>
        </template>
        <template slot-scope="scope">
          <!------------------图纸列--------------------------->
          <span class="openLinkText cursor" v-if="items.props === 'tuzhi'" @click="$emit('openAttachmentDialog',scope.row)">查看</span>
          <!------------------操作列--------------------------->
          <span class="openLinkText cursor" v-else-if="items.props === 'caozuo'" @click="$emit('openEditdetail', scope.row)" >编辑</span>
          <!------------------修改记录列--------------------------->
          <span class="openLinkText cursor" v-else-if="items.props === 'xiugai'" @click="$emit('openModifyDialog',scope.row)">查看</span>
          <!------------------审批记录列--------------------------->
          <span class="openLinkText cursor" v-else-if="items.props === 'shenpi'" @click="$emit('openApprovalDialog',scope.row)">查看</span>
          <!------------------审批列--------------------------->
          <span class="openLinkText cursor" v-else-if="items.props === 'shenpipi'" @click="$emit('openApprovalDetailDialog',scope.row)">审批</span>
          <!------------------审批状态列--------------------------->
          <span v-else-if="items.props === 'approveStatus'">{{scope.row.approveStatus ? scope.row.approveStatus.desc : ''}}</span>
          <!------------------正常--------------------------->
          <span v-else>{{scope.row[items.props]}}</span>
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
    isEdit:{type:Boolean,default:false}
  },
  inject:['vm'],
  methods:{
    getRate(row, props) {
      const findItem = row.departmentRate.find(item => item.rateDepart === props)
      return findItem || {}
    },
    handleAttachmentDonwload(row) {
      if (row.fileList?.length < 1) {
        return
      }
      this.$emit('handleFileDownload', row.fileList?.map(item => item.fileName))
    },
    getFileList(row) {
      return row.fileList?.map(item => item.fileName).join('\n')
    },
    changeValue(val, row, item) {
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
  .isChange {
    ::v-deep .el-input__inner {
      color: red;
      background: rgb(255 0 0 / 10%);
      border-color: red;
    }
  }
</style>