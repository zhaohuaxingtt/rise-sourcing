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
    <div class="padding-left10 padding-right10">
        <p class="margin-bottom20">{{ language(errDialogTips[tableType]['languageKey'],errDialogTips[tableType]['languageTips'])}}</p>
        <tableList
            class="table"
            index
            :selection="false"
            :lang="true"
            :tableData="tableListData"
            :tableTitle="errTipsTableTitle[tableType]"
        ></tableList>

    </div>
    <span slot="footer" class="dialog-footer">
    <iButton class="margin-top15" type="primary" @click="dialogVisible = false">{{language('QUEDING','确定')}}</iButton>
  </span>
    </iDialog>
</template>

<script>

import {iDialog, iButton} from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { errTipsTableTitle,errDialogTips } from './data'
export default {
    name:'dialogTableTips',
    components:{
    iDialog,
    tableList,
    iButton,
  },
  props:{
      tableType:{
          type:String,
          default:'RFQ',
      },
      tableListData:{
          type:Array,
          default:()=>[],
      }
  },
  data(){
      return{
          dialogVisible:false,
          errTipsTableTitle,
          errDialogTips,
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