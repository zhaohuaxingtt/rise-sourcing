<template>
  <iDialog
    :visible.sync="startVisible"
    :title="language('STARMONITORDINGDIANJILUCHAXUN','STARMONITOR定点记录查询')"
    width='70%'
    class="StarMo"
    
  >
    <div class="queryNumber">
      <div>
        <label class="fontsize">Sourcing Number</label>
        <iInput  v-on:keyup.enter.native="queryinitStartMon" class="queryInput" v-model="inputNumber" :placeholder="language('QINGSHURU','请输入')"  />
      </div>
      <div >
        <iButton @click="apply"> {{ language("YINGYONG",'应用') }}</iButton>
      </div>
      <!-- <div class="btnPlace">
        <iButton>{{language('QUERY','查询')}}</iButton>
        <iButton>{{language('RESET','重置')}}</iButton>
      </div> -->
    </div>
    <!-- <el-divider class="divider"/> -->
    <main class="tableMain">
      
      <tableList
        :selection="true"
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      ></tableList>
       <iPagination v-update
        class="pagination"
        @size-change="handleSizeChange($event, initStartMon)"
        @current-change="handleCurrentChange($event, initStartMon)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </main>
    <tipsDialog ref="tips" @tipsChangeVisble="tipsChangeVisble"  :applyTable="applyTable" @closeshowStarMo="closeshowStarMo" />
    <div style="height:20px"></div>
  </iDialog>
</template>
<script>
import {iDialog, iButton, iInput, iMessage, iPagination} from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import {startMonitorTitle as tableTitle} from  "../data"

import { pageMixins } from "@/utils/pageMixins"
import {
  starMonitorList,
  checkInfo
} from '@/api/partsrfq/editordetail';
import tipsDialog from './tipsDialog'
  export default {
    components:{iDialog, iButton, iInput, tableList, tipsDialog, iPagination},
    mixins: [ pageMixins ],
    props:{
      ...iDialog.props,
      handleSelectArr: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return{
        inputNumber:'',
        tableTitle,
        selection:[],
        tableData:[],
        tipsVislble:false,
        tableLoading:false,
        startVisible:false,
        applyTable:[],
        
      }
    },
    watch: {
      startVisible(val) {
        if (val) { 
          // 请求
          this.initStartMon()
        } 
    },
    },
    created() {
      // this.initStartMon()
      },
    methods: {
      queryinitStartMon(){
        this.page.currPage = 1
        this.initStartMon()
      },
      initStartMon() {
        this.tableLoading = true
        console.log(this.handleSelectArr,'handleSelectArr');
        let data ={
          refRfqId:this.$route.query.id,
          partNums:this.handleSelectArr.map(val=>val.partNum),
          procureFactoryIds:this.handleSelectArr.map(val=>val.procureFactoryId),
          current: this.page.currPage,
          size: this.page.pageSize,
          sourcingNo:this.inputNumber
        }
          starMonitorList(data).then(res=>{
            if(res.code === "200") {
              this.tableData= Array.isArray(res.data)?res.data:[]
              this.page.totalCount = res.total || 0
            } else {
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            }
            this.tableLoading = false
          }
        )
      },
      handleSelectionChange(val){
        this.selection = val
      },
      apply() {
        if(!this.selection.length) {
          iMessage.warn(this.language('QINZHISHAOXUANZEYITIAOSHUJU','请至少选择一条数据'))
          return
        }
        let data={
          refRfqId:this.$route.query.id,
          projectIds:this.handleSelectArr.map(val=>val.id),
          ids:this.selection.map(val=>val.id),
        }
        if(data.projectIds.length<data.ids.length) {
          iMessage.warn(this.language('XUANZEDELINGJIANCAIGOXIANGMUSHULIANGBUNENGXIAOYUXUANZEDESTARTMONITORJILUSHULIANG','选择的零件采购项目数量不能小于选择的StartMonitor记录数量'))
          return
        }
        checkInfo(data).then(res=>{
          if(res.code === '200') {
            if(res.data) {
              this.applyTable = Array.isArray(res.data)?res.data:[]
              this.$refs.tips.dunsshow()
              // this.startVisible = false
            } else {
              console.log('-------------------------------------------------------------------------------------------------------------------------');
              this.$emit('updateStarMonitor')
              iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
              this.startVisible = false
            }
          } else {
            this.startVisible = false
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        })
        // this.
      },
      tipsChangeVisble(val) {
        this.tipsVislble = val
      },
      showStarMo() {
        this.startVisible = true
      },
      closeshowStarMo(val) {
        this.startVisible = val
        console.log(this.startVisible);
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
      margin: 0 0 20px 0;
      align-items: center;
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
