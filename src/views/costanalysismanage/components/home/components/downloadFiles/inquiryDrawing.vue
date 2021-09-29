<!--
 * @Author: wentliao
 * @Date: 2021-05-27 20:26:28
 * @Description: 
-->
<template>
    <div class="inquiryDrawing">
        <div class="header clearFloat margin-bottom15">
          <span class="title">{{language('LK_XUNJIATUZHI','询价图纸')}}</span>

          <div class="floatright">
              <iButton @click="downloadList">{{language('LK_XIAZAI','下载')}}</iButton>
          </div>
      </div>
      <!-- 表格区域 -->
      <tableList
        index
        :lang="true"
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #tpPartAttachmentName="scope">
            <span class="link" @click="downloadLine(scope.row)">{{ scope.row.tpPartAttachmentName }}</span>
        </template>
      </tableList>
      <!-- 分页 -->
      <iPagination v-update @size-change="handleSizeChange($event, getList)" @current-change="handleCurrentChange($event, getList)" background :page-sizes="page.pageSizes"
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
    iMessage,
} from 'rise'
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins"
import { DrawingTitle } from '../data'
// import { getFileHistory } from "@/api/costanalysismanage/rfqdetail"
import { pageInquiryDrawingsByRfqId } from "@/api/partsrfq/home/index"
import { downloadFile, downloadUdFile, downloadUdFileWithName } from '@/api/file'

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
        // 下载附件
        async download(fileList){
             const data = {
              applicationName: 'procurereq-service',
              fileList:fileList,
            };
            await downloadFile(data);
        },
        
        // 批量下载附件
        downloadList(){
            const  {selectItems } = this;
            if(!selectItems.length){
            iMessage.warn(this.language('LK_QINGXUANZHEXUYAOXIAZHAIDEFUJIAN','请选择需要下载的附件'));
            }else{
                // const list = selectItems.map((item)=>item.tpPartAttachmentName);
                // this.download(list);
                // downloadUdFile(selectItems.map(item => item.uploadId))
                downloadUdFileWithName(selectItems.map(item => item.uploadId), `${ selectItems[0].partNum }_${ selectItems[0].carTypeProj }_${ moment().format("YYYY-MM-DD_HH：mm：ss") }`)
            }
        },
        // 单文件下载
        downloadLine(row){
            // const {tpPartAttachmentName} = row;
            // this.download([tpPartAttachmentName]);
            downloadUdFile(row.uploadId)
        },
        // 获取列表
        async getList(){
            if (!this.rfqNum) {
                return
            }
            this.tableLoading =  true;
            const {rfqNum} = this;
            const { page } = this;
            const data = {
                    rfqId:rfqNum,
                    current:page.currPage,
                    size:page.pageSize,
                    findType:12
            };
            pageInquiryDrawingsByRfqId(data).then((res)=>{
                this.tableLoading =  false;
                if(res.code === '200' && res.data){
                    this.tableData = res.data;
                    this.page.totalCount = res.total;
                }
            }).catch((err)=>{
                this.tableLoading =  false;
            });

            // getFileHistory(data).then((res)=>{
            //     const {code,data} = res; 
            //      this.tableLoading =  false;
            //     if(code === '200' && data){
            //         const {records,total} = data;
            //         this.tableLoading =  false;
            //         this.tableData = records;
            //         this.page.totalCount = total;
            //     }
            // }).catch((err)=>{
            //      this.tableLoading =  false;
            // })
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