<!--
 * @Author: wentliao
 * @Date: 2021-05-27 20:22:50
 * @Description: 弹窗内容-询价附件
-->
<template>
  <div class="inquiryFiles">
      <div class="header clearFloat margin-bottom15">
          <span class="title">{{$t('LK_XUNJIAFUJIAN')}}</span>
          <span class="tips">{{$t('LK_WENJIANQINGXUANZHUANZHIZHENGCHANG')}}</span>

          <div class="floatright">
              <iButton @click="downloadList" >{{$t('LK_XIAZAI')}}</iButton>
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
        <template #tpPartAttachmentName="scope">
            <span class="link" @click="downloadLine(scope.row)">{{ scope.row.fileName }}</span>
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
    iMessage,
} from 'rise'
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins"
import { FilesTitle } from '../data'
// import { getFileHistory } from "@/api/costanalysismanage/rfqdetail"
import { findByRfqs } from "@/api/rfqManageMent/rfqDetail"
import { downloadFile } from '@/api/file'

export default {
    name:'inquiryFiles',
    mixins: [pageMixins],
    components:{
        tableList,
        iButton,
        iPagination,
        iMessage,
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
            tableTitle:FilesTitle,
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
        },// 下载附件
        async download(fileList){
             const data = {
              applicationName: 'rise',
              fileList:fileList.join(),
            };
            await downloadFile(data);
        },
        
        // 批量下载附件
        downloadList(){
            const  {selectItems } = this;
            if(!selectItems.length){
            iMessage.warn(this.$t('LK_QINGXUANZHEXUYAOXIAZHAIDEFUJIAN'));
            }else{
                const list = selectItems.map((item)=>item.id);
                this.download(list);
            }
        },
        // 单文件下载
        downloadLine(row){
            const {id} = row;
            this.download([id]);
        },
        // 获取列表
        async getList(){
            this.tableLoading =  true;
            const {rfqNum} = this;
            const { page } = this;
            const data = {
                otherInfoPackage:{
                    rfqId:rfqNum,
                    current:page.currPage,
                    size:page.pageSize,
                    findType:'03',
                }
            };
            findByRfqs(data).then((res)=>{
                const {code,data} = res; 
                this.tableLoading =  false;
                if(code === '200' && data){
                    const { inquiryDrawingsVO={},total } = data;
                    const { inquiryDrawingsVOS } = inquiryDrawingsVO;
                    this.tableData = inquiryDrawingsVOS;
                    this.page.totalCount = total;
                }
            }).catch((err)=>{
                this.tableLoading =  false;
            });
            // const data = {
            //     nomiAppId:rfqNum,
            //     fileType:'111',   // 101 109: 报告清单,110:询价图纸,111:询价附件
            //     pageNo:page.currPage,
            //     pageSize:page.pageSize,
            // }
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
.inquiryFiles{
    .header{
        .title{
            font-size: 18px;
            font-weight: bold;
        }
        .tips{
            font-size: 14px;
            color: #999999;
            margin-left: 10px;
        }
    }
}
</style>