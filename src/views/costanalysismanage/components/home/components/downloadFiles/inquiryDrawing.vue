<!--
 * @Author: wentliao
 * @Date: 2021-05-27 20:26:28
 * @Description: 
-->
<template>
    <div class="inquiryDrawing">
        <div class="header clearFloat margin-bottom15">
          <span class="title">{{$t('LK_XUNJIATUZHI')}}</span>

          <div class="floatright">
              <iButton>{{$t('LK_XIAZAI')}}</iButton>
          </div>
      </div>
      <!-- 表格区域 -->
      <tableList
        index
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #fileName="scope">
            <span class="link" @click="download(scope.row)">{{ scope.row.fileName }}</span>
        </template>
      </tableList>
      <!-- 分页 -->
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
      class="padding-bottom20"
    />
    </div>
</template>

<script>
import {
    iButton,
    iPagination,
} from 'rise'
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins"
import { DrawingTitle } from '../data'
import { getFileHistory } from "@/api/costanalysismanage/rfqdetail"
export default {
    name:'inquiryDrawing',
    mixins: [pageMixins],
    components:{
        tableList,
        iButton,
        iPagination,
    },
    props:{
        rfqNum:{
            type:String,
            default:'',
        }
    },
    data(){
        return{
            tableData:[],
            tableTitle:DrawingTitle,
            selectItems:[],
            tableLoading:false,
        }
    },
    created(){
        this.getList();
    },
    methods:{
        handleSelectionChange(val) {
            this.selectItems = val;
        },
        download(){
        },
        // 获取列表
        async getList(){
            this.tableLoading =  true;
            const {rfqNum} = this;
            const { page } = this;
            const data = {
                nomiAppId:rfqNum,
                fileType:'101',   // 101 109: 报告清单,110:询价图纸,111:询价附件
                pageNo:page.currPage,
                pageSize:page.pageSize,
            }
            getFileHistory(data).then((res)=>{
                const {code,data} = res; 
                 this.tableLoading =  false;
                if(code === '200' && data){
                    const {records,total} = data;
                    this.tableLoading =  false;
                    this.tableData = records;
                    this.page.totalCount = total;
                }
            }).catch((err)=>{
                 this.tableLoading =  false;
            })
        },
    }
}
</script>

<style lang="scss" scoped>
    .inquiryDrawing{
        .header{
            .title{
                font-size: 18px;
                font-weight: bold;
            }
        }
    }
</style>