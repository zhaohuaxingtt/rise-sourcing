<!--
 * @Author: wentliao
 * @Date: 2021-05-27 20:22:50
 * @Description: 弹窗内容-询价附件
-->
<template>
  <div class="inquiryFiles">
      <div class="header clearFloat margin-bottom15">
          <span class="title">{{language('LK_XUNJIAFUJIAN','询价附件')}}</span>
          <span class="tips">{{language('LK_WENJIANQINGXUANZHUANZHIZHENGCHANG','上传附件:文件请旋转至正常方向后上传')}}</span>

          <div class="floatright">
              <iButton @click="downloadList" >{{language('LK_XIAZAI','下载')}}</iButton>
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
        <template #fileName="scope">
            <span class="link" @click="downloadLine(scope.row)">{{ scope.row.fileName }}</span>
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
import { FilesTitle } from '../data'
import { getAllAnnex } from "@/api/partsrfq/editordetail";
import { downloadFile, downloadUdFile, downloadUdFileWithName } from '@/api/file'

export default {
    name:'inquiryFiles',
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
            tableTitle:FilesTitle,
            selectItems:[],
            tableLoading:false,
        }
    },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    })
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
              fileList:fileList,
            };
            await downloadFile(data);
        },
        
        // 批量下载附件
        downloadList(){
            const  {selectItems } = this;
            if(!selectItems.length){
            iMessage.warn(this.language('QINGXUANZHEXUYAOXIAZHAIDEFUJIAN', '请选择需要下载的附件'));
            }else{
                // const list = selectItems.map((item)=>item.fileName);
                // this.download(list);
                // downloadUdFile(selectItems.map(item => item.uploadId))
                downloadUdFileWithName(selectItems.map(item => item.uploadId), `${ selectItems[0].rfqId }_${ moment().format("YYYY-MM-DD_HH：mm：ss") }`)
            }
        },
        // 单文件下载
        downloadLine(row){
            // const {fileName} = row;
            // this.download([fileName]);
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
            const params={
                fileType:'2',
                rfqId:rfqNum,
                userId: this.userInfo.id,
                current:page.currPage,
                size:page.pageSize,
            };
            getAllAnnex(params).then((res)=>{
                const {code,data,total} = res;
                if(code==200 && data){
                    this.tableData= data;
                    this.page.totalCount = total;
                }
                this.tableLoading =  false;
            }).catch((err)=>{
                this.tableLoading =  false;
            });
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