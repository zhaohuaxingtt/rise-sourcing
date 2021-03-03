<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 11:24:15
 * @LastEditTime: 2021-03-01 11:20:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\home\components\changeItems.vue
-->
<template>
  <iDialog :title="title" :visible.sync="value" width="80%" @close='clearDiolog'>
    <div class="changeContent">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <iButton @click="edit">编辑</iButton>
          <iButton @click="save">保存</iButton>
        </div>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
      ></tablelist>
    </div>
    <span slot="footer" class="dialog-footer">
          <iButton @click="$emit('input',false)">取 消</iButton>
          <iButton :loading='repeatClick' @click="sureChangeItems">确 定</iButton>
        </span>
  </iDialog>
</template>
<script>
import {iButton,iMessage,iDialog} from '@/components'
import tablelist from "pages/partsrfq/home/components/tableList";
import {assignmentOfScroingTasksTableTitle} from "pages/partsrfq/home/components/data";
import {getTabelData} from "@/api/partsign/home";

export default{
  components:{iButton,iDialog, tablelist},
  props:{
    title:{type:String,default:'转派评分任务'},
    value:{type:Boolean},
    repeatClick:Boolean
  },
  data(){
    return {
      tableListData: [],
      tableTitle: assignmentOfScroingTasksTableTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  created(){

  },
  methods:{
    //获取表格数据
    getTableList() {
      this.tableLoading = true;
      getTabelData().then((res) => {
        this.tableListData = res.data;
        this.tableLoading = false;
      });
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    clearDiolog(){
      this.$emit('input',false)
    },
    sureChangeItems(){
      if(this.selectTableData.length == '') return iMessage.warn('抱歉！您当前还未选择！')
      this.$emit('sure',JSON.parse(this.selectTableData))
    },
    edit() {},
    save() {}
  }
}
</script>
<style lang='scss' scoped>
.changeContent{
  padding: 0px 10px 20px 10px;

}
</style>

