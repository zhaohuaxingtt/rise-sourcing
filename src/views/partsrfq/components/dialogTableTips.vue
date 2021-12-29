<!--
 * @Author: wentliao
 * @Date: 2021-12-29 14:50:27
 * @Description: 需展示表格的错误提示框
-->
<template>
    <iDialog
    width="40%"
    :visible.sync="dialogVisible"
    class="dialogTableTips"
    :title="language('BIDDING_TISHI','提示')"
    >
    <div>
        <p>{{messageTips}}</p>
        <tableList
            class="table"
            index
            :lang="true"
            :tableData="tableListData"
            :tableTitle="errTipsTableTitle[tableType]"
        ></tableList>

    </div>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">{{language('QUEDING','确定')}}</el-button>
  </span>
    </iDialog>
</template>

<script>

import {iDialog, iButton} from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { errTipsTableTitle } from './data'
export default {
    name:'dialogTableTips',
    components:{
    iDialog,
    tableList,
  },
  props:{
      messageTips:{
          type:String,
          default:'',
      },
      tableType:{
          type:String,
          default:'1',
      }
  },
  data(){
      return{
          dialogVisible:false,
          tableListData:[],
          errTipsTableTitle,
      }
  },
  methods:{
      show(){
          this.dialogVisible = true;
      }
  }
}
</script>

<style lang="scss" scoped>
    .dialogTableTips{

    }
</style>