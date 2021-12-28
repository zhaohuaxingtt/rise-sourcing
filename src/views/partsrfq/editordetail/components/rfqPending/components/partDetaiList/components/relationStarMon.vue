<template>
  <iDialog
    :visible.sync="startVisible"
    @close="changeVisible"
    :title="language('STARMONITORDINGDIANJILUCHAXUN','STARMONITOR定点记录查询')"
    width='70%'
    class="StarMo"
  >
    <div class="queryNumber">
      <div>
        <label class="fontsize">Sourcing Number</label>
        <iInput class="queryInput" v-model="inputNumber" :placeholder="language('QINGSHURU','请输入')"  />
      </div>
      <div class="btnPlace">
        <iButton>{{language('QUERY','查询')}}</iButton>
        <iButton>{{language('RESET','重置')}}</iButton>
      </div>
    </div>
    <el-divider class="divider"/>
    <main class="tableMain">
      <div class="btnRight">
        <iButton @click="apply"> {{ language("YINGYONG",'应用') }}</iButton>
      </div>
      <tableList
        :selection="true"
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      ></tableList>
    </main>
    <tipsDialog :tipsVislble="tipsVislble" @tipsChangeVisble="tipsChangeVisble" />
  </iDialog>
</template>
<script>
import {iDialog, iButton, iInput, iMessage} from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import {startMonitorTitle as tableTitle} from  "../data"
import tipsDialog from './tipsDialog'
  export default {
    components:{iDialog, iButton, iInput, tableList, tipsDialog},
    props:{
      startVisible: {
        type:Boolean
      }
    },
    data() {
      return{
        inputNumber:'',
        tableTitle,
        selection:[],
        tableData:[
          {
            SourcingNumber:'2',
            PartNumber:'3',
            SvwPlant:'4',
            Supplier:'5',
            DunsCode:'6',
            Share:'3',
            A:'d',
            B:'f',
            Ltc:'2',
            Tooling:'4',
          },
                    {
            SourcingNumber:'2',
            PartNumber:'3',
            SvwPlant:'4',
            Supplier:'5',
            DunsCode:'6',
            Share:'3',
            A:'d',
            B:'f',
            Ltc:'2',
            Tooling:'4',
          }
        ],
        tipsVislble:false,

      }
    },
    created() {
      console.log(this.startVisible,'startVisible');
      console.log(this.tableTitle,'tableTitle');
      },
      methods: {
        changeVisible() {
          this.$emit('relationStarMon',false)
        },
        handleSelectionChange(val){
          this.selection = val
        },
        apply() {
          if(!this.selection.length) {
            iMessage.error(this.language('QINZHISHAOXUANZEYITIAOSHUJU','请至少选择一条数据'))
            return
          }
          if(this.selection[0].SourcingNumber == '2') {
            console.log('111');
            this.tipsChangeVisble(true)
          }  
        },
        tipsChangeVisble(val) {
          this.tipsVislble = val
        }
      }
  }
</script>
<style scoped lang='scss' >
  .StarMo{
    .queryNumber{
      margin: auto;
      display: flex;
      justify-content: space-between;
      .fontsize{
        font-size: 14px;
        font-weight: bold;
      }
      .queryInput{
        margin: 10px 0 0 0 ;
      }
      .btnPlace{
        align-items: flex-end;
      }
    }
    .divider{
      margin: 1.5rem 0;
    }
    .tableMain{
      .btnRight{
        display: flex;
        justify-content: flex-end;
        margin: 0 0 20px 0 ;
      }
    }
  }
</style>
