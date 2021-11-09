<!--
 * @Author: yuszhou
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-09-18 02:06:44
 * @LastEditors: Please set LastEditors
 * @Description: 零件签收-table组件。
 * @FilePath: \rise\src\views\partsign\components\tableList.vue
-->
<template>
  <el-table fit tooltip-effect='light' :height="height" :data='tableData' v-loading='tableLoading' @selection-change="handleSelectionChange" :empty-text="$t('LK_ZANWUSHUJU')" ref="moviesTable" :class="radio && 'radio'" @row-click='rowClick'>
    <el-table-column v-if="selection && hasList(tableTitle)" type='selection' width="56" align='center'></el-table-column>
    <el-table-column v-if='indexKey && hasList(tableTitle)' type='index' width='50' align='center' label='#'>
      <template slot-scope="scope">
        {{tableIndexString+(scope.$index+1)}}
      </template>
    </el-table-column>
    <template v-for="(items,index) in tableTitle">
      <!----------------------需要高亮的列并且带有打开详情事件------------------------>
      <el-table-column :key="index" align='center' :width="items.width" :show-overflow-tooltip='items.tooltip' v-if='items.props == activeItems' :prop="items.props" :label="items.key ? $t(items.key) : items.name">
        <template slot-scope="row"><span class="openLinkText cursor" @click="openPage(row.row)">{{row.row[activeItems]}}</span></template>
      </el-table-column>
      <el-table-column :key="index" align='center' :width="items.width" :show-overflow-tooltip='items.tooltip'  v-else :label="items.key ? $t(items.key) : items.name" :prop="items.props">
        <!----------------------------存在二级表头的情况------------------------------->
        <template v-if='items.list && items.list.length > 0'>
           <template v-for="(itemss,indexs) in items.list">
              <el-table-column v-if="selection && itemss.props == 'selection'" :key="indexs" type='selection' width="55" align='center'></el-table-column>
              <el-table-column v-else-if='indexKey && itemss.props == "index"' :key="indexs" type='index' width='50' align='center' label='#'>
                <template slot-scope="scope">{{tableIndexString+(scope.$index+1)}}</template>
              </el-table-column>
              <el-table-column v-else :key="indexs" align='center' :width="itemss.width" :show-overflow-tooltip='itemss.tooltip'  :label="itemss.key ? $t(itemss.key) : itemss.name" :prop="itemss.props">
                  <!----------------------------如果是展示select 或者input------------------------>
                  <tempalte slot-scope="scope">
                    <template v-if='itemss.type == "select" && !notEdit'>
                      <iSelect v-model="scope.row[itemss.props]">
                          <el-option :value="options.code" v-for='(options,optionIndex) in items.options' :key='optionIndex' :label='options.name'></el-option>
                      </iSelect>
                    </template>
                    <template v-else-if='itemss.type == "input" && !notEdit'>
                      <iInput v-model="scope.row[itemss.props]"></iInput>
                    </template>
                    <template v-else>{{scope.row[itemss.props]}}</template>
                  </tempalte>
              </el-table-column>
           </template>
        </template>
        <!----------------------------如果是展示select 或者input------------------------>
        <template v-if='!items.list' slot-scope="scope">
          <template v-if='items.type == "select" && !notEdit'>
            <iSelect v-model="scope.row[items.props]">
                <el-option :value="options.value" v-for='(options,optionIndex) in items.options' :key='optionIndex'>{{options.label}}</el-option>
            </iSelect>
          </template>
          <template v-else-if='items.type == "input" && !notEdit'>
            <iInput v-model="scope.row[items.props]"></iInput>
          </template>
          <template v-else>{{scope.row[items.props]}}</template>
          </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
import {iSelect,iInput} from 'rise'
import {_getMathNumber} from '@/utils'
export default{
  components:{iSelect,iInput},
  props:{
    tableData:{type:Array},
    tableTitle:{type:Array},
    tableLoading:{type:Boolean,default:false},
    selection:{type:Boolean,default:true},
    height:{type:Number||String},
    activeItems:{type:String,default:'b'},
    radio:{type:Boolean,default:false},// 是否单选
    tableIndexString:{
      type:String,
      default:''
    },
    indexKey:Boolean,
    notEdit:Boolean
  },
  inject:['vm'],
  methods:{
    rowClick(row){
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    hasList(list){
      if(list && list.length>0 && list[0].list){
        return false
      }else {
        return true
      }
    },
    handleSelectionChange(val){
      if (this.radio) {
        if (val.length > 1) {
        var duoxuans=val.pop();
        this.handleSelectArr=val.pop();
        this.$refs.moviesTable.clearSelection()
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
    activeTop(e){
      this.$emit('activeTop',e)
    },
    updateSlot(e,a){
      this.$emit('updateSlot',[e,a])
    }
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