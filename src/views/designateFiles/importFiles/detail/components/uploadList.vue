<!--
 * @Author: wentliao
 * @Date: 2021-05-26 15:36:14
 * @Description: 上传列表
-->

<template>
  <div class="uploadList">
      <!-- 按钮区域 -->
      <p class="btn-list">
          <iButton @click="download">{{$t('LK_XIAZAI')}}</iButton>
          <iButton @click="deleteFiles">{{$t('LK_SHANCHU')}}</iButton>
            <span class="margin-left10">
                <Upload 
                    hideTip
                    :buttonText="$t('LK_SHANGCHUANWENJIAN')"
                    :request="uploadImportFile"
                    @on-success="onDraingUploadsucess"
                />
            </span>
      </p>
        <!-- 表格区域 -->
        <tableList
            class="table"
            index
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
            @handleSelectionChange="handleSelectionChange"
            >
            <!-- 编号 -->
            <template #code="scope">
            <span @click="goFilesList(scope.row.code)" class="link-underline" >{{scope.row.code}}</span>
            </template>
            <!-- 附件 -->
            <template #LK_FUJIAN="scope">
            <span @click="checkUploadList(scope.row.id)" class="link-underline" >{{$t('LK_SHANGCHUAN')}}</span>
            </template>
        </tableList>
        <!-- 分页 -->
        <iPagination
            class="margin-bottom20"
            @size-change="handleSizeChange($event, purchaseFactory)"
            @current-change="handleCurrentChange($event, purchaseFactory)"
            background
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :current-page="page.currPage"
            :total="page.totalCount" v-update
        />
  </div>
</template>

<script>
import {
    iPagination,
    iButton,
    iMessage,
} from 'rise';
import {pageMixins} from '@/utils/pageMixins'
import { filesTableTitle } from '../data'
import tableList from "@/views/partsign/editordetail/components/tableList";
import Upload from '@/components/Upload'
import {
    getAffixListById,
    uploadAttachments,
    deleteattachments,
} from '@/api/designateFiles/importFiles'
import { downloadFile } from '@/api/file'

export default {
    name:'uploadList',
    mixins:[pageMixins],
    components:{
        iPagination,
        iButton,
        tableList,
        Upload,
    },
    props:{
        uploadId:{
            type:String,
            default:'',
        }
    },
    data(){
        return{
            tableListData:[],
            tableTitle:filesTableTitle,
            loading:false,
            selectItems:[],

        }
    },
    created(){
        this.getList();
    },
    methods:{

        // 获取列表
        async getList(){
            this.loading = true;
            const {uploadId,page} = this;
            const data = {
                affixId:uploadId,
                pageNo:page.currPage,
                pageSize:page.pageSize,

            };
            await getAffixListById(data).then((res)=>{
                 const {code,data} = res; 
                if(code === '200' && data){
                    const {records,total} = data;
                    this.tableListData = records;
                    this.page.totalCount = total;
                }
                this.loading =  false;
            }).catch((err)=>{ this.loading = false;})
        },
        // 上传附件
        async onDraingUploadsucess(data){
            console.log(data,'data');
            const { uploadId } = this;
            const filesData = data.data;
            const {id,fileName,filePath} = filesData;
            const formData = new FormData(); 
            formData.append('file', data.file);
            formData.append('affixId', uploadId);
            formData.append('id', id);
            formData.append('fileName', fileName);
            formData.append('filePath', filePath);
            // const sendData = {
            //     affixId:uploadId,
            //     ...filesData,
            // }
            await uploadAttachments(formData).then((res)=>{
                const { code } = res;
                if(code == 200) this.getList();

            }).catch((e)=>{
                iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
            });
        },
        
        handleSelectionChange(val) {
            this.selectItems = val;
        },
        // 删除附件
        async deleteFiles(){
            const { selectItems } = this;
            if(!selectItems.length){
                iMessage.warn(this.$t('LK_QINGXUANZHEXUYAOSHANCHUYOUJIAN'));
            }else{
                const confirmInfo = await this.$confirm(this.$t('deleteSure'))
                if (confirmInfo !== 'confirm') return;
                const attachmentIds = selectItems.map((item)=>item.id);
                await deleteattachments({attachmentIds}).then((res)=>{
                    const {code} = res;
                    if(code == 200 ){
                        iMessage.success(this.$t('LK_CAOZUOCHENGGONG'));
                        this.getList();
                    } else {
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                    }
                }).catch((err)=>{});
            }
        },
        
        // 下载附件
        async download(){
            const  {selectItems } = this;
            if(!selectItems.length){
             iMessage.warn(this.$t('LK_QINGXUANZHEXUYAOXIAZHAIDEFUJIAN'));
            }else{
                const list = selectItems.map((item)=>item.id);
                const data = {
                    applicationName: 'rise',
                    fileList:list.join(),
                };
                await downloadFile(data);
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .uploadList{
        position: relative;
        .btn-list{
            position: absolute;
            right: 40px;
            top: -50px;
            text-align: right;
        }
    }
</style>
