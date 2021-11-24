<!--
 * @Author: wentliao
 * @Date: 2021-05-28 11:06:19
 * @Description: 报告清单列表
-->
<template>
    <iCard :title="language('costanalysismanage.BaoGaoQingDan','报告清单')">
        <template v-slot:header-control>
            <span class="margin-right10">
                <!-- <Upload 
                    hideTip
                    :buttonText="language('LK_SHANGCHUAN','上传')"
                    accept=".pdf"
                    @on-success="onDraingUploadsucess"
                /> -->
                <uploadButton uploadClass="uploadButton" :beforeUpload="beforeUpload" @success="uploadSuccess" @error="uploadError" v-permission.auto="COSTANALYSISMANAGE_RFQDETAIL_REPORTLIST_BUTTON_UPLOAD|上传">
                    <iButton :loading="uploadLoading">{{ language("SHANGCHUAN", "上传") }}</iButton>
                </uploadButton>
            </span>
            <iButton @click="downloadList" v-permission.auto="COSTANALYSISMANAGE_RFQDETAIL_REPORTLIST_BUTTON_DOWNLOAD|下载">{{language('LK_XIAZAI','下载')}}</iButton>
            <iButton @click="deleteItem" v-permission.auto="COSTANALYSISMANAGE_RFQDETAIL_REPORTLIST_BUTTON_DELETE|删除">{{language('delete','删除')}}</iButton>
        </template>
        <div class="body">
        <tableList
            class="table"
            index
            :lang="true"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
            @handleSelectionChange="handleSelectionChange"
        >
            <template #fileName="scope">
                <a class="trigger" href="javascript:;" @click="downloadLine(scope.row)">
                    <span class="link" >{{ scope.row.fileName }}</span>
                </a>
            </template>
            <template #uploadDate="scope">
                {{ scope.row.uploadDate | dateFilter("YYYY-MM-DD") }}
            </template>
        </tableList>
        <iPagination 
            v-update
            class="margin-top30"
            @size-change="handleSizeChange($event, getList)"
            @current-change="handleCurrentChange($event, getList)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount" />
        </div>
    </iCard>
  
</template>

<script>
import { 
    iCard, 
    iButton, 
    iPagination,
    iMessage,
} from "rise"
import Upload from '@/components/Upload'
import tableList from "@/views/partsign/editordetail/components/tableList"
import { reportListTableTitle as tableTitle } from "../data"
import { pageMixins } from "@/utils/pageMixins"
// import { getFileHistory } from "@/api/costanalysismanage/rfqdetail"
import {
  batchDeleteDaring,
} from '@/api/designate/decisiondata/drawing'
import { uploadDaring } from '@/api/costanalysismanage/rfqdetail'
import { downloadFile, downloadUdFile } from '@/api/file'
import { getKmFileHistory, kmUploadFiles } from "@/api/costanalysismanage/costanalysis"
import filters from "@/utils/filters"
import uploadButton from "@/views/costanalysismanage/components/uploadButton"

export default {
    name:'reportList',
    mixins: [ pageMixins, filters ],
    components: {
        iCard,
        iButton,
        iPagination,
        tableList,
        Upload,
        uploadButton
    },
    created(){
        this.getList();
    },
    data() {
        return {
        loading: false,
        tableTitle,
        tableListData: [],
        selectItems:[],
        uploadLoading: false,
        fileList: [],
        }
    },
    methods:{
        // 下载附件
        async download(fileList){
             const data = {
              applicationName: 'rise',
              fileList:fileList.join(),
            };
            await downloadFile(data);
        },
        // 单文件下载
        downloadLine(row){
            // const {tpPartAttachmentName} = row;
            // this.download([tpPartAttachmentName]);
            downloadUdFile(row.uploadId)
        },
        // 批量下载附件
        downloadList(){
            const  {selectItems } = this;
            if(!selectItems.length){
            iMessage.warn(this.language('LK_QINGXUANZHEXUYAOXIAZHAIDEFUJIAN','请选择需要下载的附件'));
            }else{
                // const list = selectItems.map((item)=>item.tpPartAttachmentName);
                // this.download(list);
                downloadUdFile(selectItems.map(item => item.uploadId))
            }
        },
        
        // 获取列表
        getList(){
            // this.loading =  true;
            // const { query } = this.$route;
            // const {rfqId='' } = query;
            // const { page } = this;
            // const params = {
            //     nomiAppId:rfqId,
            //     fileType:'109',   // 101 109: 报告清单,110:询价图纸,111:询价附件
            //     pageNo:page.currPage,
            //     pageSize:page.pageSize,
            // }
            // getFileHistory(params).then((res)=>{
            //     const {code,data,total} = res; 
            //     if(code === '200' && data){
            //         // const {records,total} = data;
            //         this.tableListData = data;
            //         this.page.totalCount = total;
            //     }
            //     this.loading =  false;
            // }).catch((err)=>{
            //      this.loading =  false;
            // })
        
            this.loading = true

            getKmFileHistory({
                type: 1,
                hostId: this.$route.query.rfqId,
                currPage: this.page.currPage,
                pageSize: this.page.pageSize
            })
            .then(res => {
                if (res.code == 200) {
                    this.tableListData = Array.isArray(res.data) ? res.data : []
                    this.page.totalCount = res.total || 0
                    this.selectItems = []
                } else {
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }

                this.loading = false
            })
            .catch(() => this.loading = false)
        },
        
        handleSelectionChange(val) {
            this.selectItems = val;
        },
        // 上传附件
        // onDraingUploadsucess(data){
        //     const { query } = this.$route;
        //     const {rfqId } = query;
        //     const params = {
        //         fileCode: '0',
        //         fileName: data.data.fileName || '',
        //         filePath: data.data.filePath || '',
        //         fileSize: data.file.size || 0,
        //         size: data.file.size || 0,
        //         fileType: '109',
        //         hostId: rfqId
        //     };
        //     uploadDaring(params).then((res)=>{
        //         const {code} = res;
        //         if (res.code == 200) {
        //         iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        //         this.getList();
        //         } else {
        //         iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        //         }
        //     })
        // },
        beforeUpload() {
            this.uploadLoading = true
        },
        uploadFiles() {
            this.loading = true

            kmUploadFiles({
                fileHistoryDTOS: this.fileList.map(item => ({
                    fileCode: "0",
                    fileName: item.fileName,
                    filePath: item.filePath,
                    fileSize: item.size,
                    hostId: this.$route.query.rfqId,
                    uploadId: item.id,
                    source: 0
                })),
                type: 1
            })
            .then(res => {
                if (res.code == 200) {
                this.getList()
                } else {
                iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
                this.loading = false
                }

                this.uploadLoading = false
            })
            .catch(() => {
                this.uploadLoading = false
                this.loading = false
            })
        },
        uploadSuccess(res, file) {
            if (res.code != 200) {
                iMessage.error(`${ this.$i18n.locale === "zh" ? res.desZh : res.desEn }`)
            } else {
                this.fileList = []
                clearTimeout(this.timer)
                iMessage.success(`${ file.name } ${ this.language("SHANGCHUANCHENGGONG", "上传成功") }`)
                this.fileList.push({ id: res.data[0].id, fileName: res.data[0].name, filePath: res.data[0].path, size: file.size })
                this.timer = setTimeout(() => {
                    this.uploadFiles()
                    clearTimeout(this.timer)
                }, 700)
            }
        },
        uploadError(err, file) {
            this.uploadLoading = false
            iMessage.error(`${ file.name } ${ this.language("SHANGCHUANSHIBAI", "上传失败") }`)
        },
        // 删除附件
        async deleteItem(){
            const { selectItems } = this;
            if(!selectItems.length){
                iMessage.warn(this.language('LK_QINGXUANZHEXUYAOSHANCHUYOUJIAN','请选择需要删除的附件'));
            }else{
                const confirmInfo = await this.$confirm( this.language('deleteSure','您确定要执行删除操作吗？'))
                if (confirmInfo !== 'confirm') return;
                const idList = selectItems.map((item)=>item.id);
                await batchDeleteDaring(idList).then((res)=>{
                    const {code} = res;
                    if(code == 200 ){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                    } else {
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                    }
                }).catch((err)=>{});
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.uploadButton {
    display: inline;
}
</style>