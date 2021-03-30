<!--
 * @Author: yuszhou
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-03-30 20:02:34
 * @LastEditors: Please set LastEditors
 * @Description: 零件签收-table组件。
 * @FilePath: \rise\src\views\partsign\components\tableList.vue
-->
<template>
  <el-table :height="height" :data='tableData' v-loading='tableLoading' @selection-change="handleSelectionChange">
    <el-table-column v-if="selection" type='selection' width="50" align='center'></el-table-column>
    <el-table-column v-if='index' type='index' width='50' align='center' :label='indexLabel'></el-table-column>
    <template v-for="(items,index) in tableTitle">
      <el-table-column :key="index" align='center' v-if='items.props == activeItems' :prop="items.props" :label="items.key ? $t(items.key) : items.name">
        <template slot-scope="row"><span class="openLinkText cursor" @click="openPage(row.row)">{{row.row[activeItems]}}</span></template>
      </el-table-column>
      <el-table-column :key="index" align='center'  v-else-if='items.props == "tpInfoType"' :label="items.key ? $t(items.key) : items.name" :prop="items.props">
        <template slot-scope="scope">
          <span>{{translateData('tp_info_type',scope.row[items.props])}}</span>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center'  v-else :label="items.key ? $t(items.key) : items.name" :prop="items.props"></el-table-column>
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
    activeItems:{type:String,default:'b'}
  },
  inject:['vm'],
  methods:{
    handleSelectionChange(val){
      this.$emit('handleSelectionChange',val)
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
    }
  }
}
</script>
<style lang='scss' scoped>
  .openLinkText{
    color:$color-blue;
  }
</style>