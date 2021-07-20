<!--
 * @Author: wentliao
 * @Date: 2021-05-26 15:36:14
 * @Description: 上传列表
-->

<template>
<iDialog     
    :title="language('LK_SHANGCHUANWENJIAN','上传文件')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="uploadListDialog"
>
  <div class="uploadList">
      <!-- 按钮区域 -->
      <p class="btn-list">
          <iButton @click="download">{{language('LK_XIAZAI','下载')}}</iButton>
          <iButton @click="deleteFiles">{{language('LK_SHANCHU','删除')}}</iButton>
            <span class="margin-left10">
                <Upload 
                    hideTip
                    :buttonText="language('LK_SHANGCHUANWENJIAN','上传文件')"
                    :request="uploadImportFile"
                    @on-success="onDraingUploadsucess"
                />
            </span>
      </p>
        <!-- 表格区域 -->
        <tableList
            class="table"
            index
            :lang="true"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
            @handleSelectionChange="handleSelectionChange"
            >
            <!-- 编号 -->
            <template #code="scope">
            <span class="flexRow">
                <span class="openLinkText cursor " @click="goFilesList(scope.row.code)"> {{scope.row.code}}</span>
                <span class="icon-gray  cursor  " v-if="scope.row.code"  @click="goFilesList(scope.row.code)">
                    <icon symbol class="show" name="icontiaozhuananniu" />
                    <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
                </span>
            </span>  
            </template>
            <!-- 附件 -->
            <template #LK_FUJIAN="scope">
            <span @click="checkUploadList(scope.row.id)" class="link-underline" >{{language('LK_SHANGCHUAN','上传')}}</span>
            </template>
        </tableList>
        <!-- 分页 -->
        <iPagination
            class="margin-bottom20"
            @size-change="handleSizeChange($event, getList)"
            @current-change="handleCurrentChange($event, getList)"
            background
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :current-page="page.currPage"
            :total="page.totalCount" v-update
        />
  </div>

</iDialog>
</template>

<script>
import {
    iPagination,
    iButton,
    iMessage,
    iDialog,
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
import { downloadUdFile as downloadFile } from '@/api/file'

export default {
    name:'uploadList',
    mixins:[pageMixins],
    components:{
        iPagination,
        iButton,
        tableList,
        Upload,
        iDialog,
    },
    props:{
        uploadId:{
            type:String,
            default:'',
        },
        dialogVisible:{
            type:Boolean,
            default:false,
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
            const {id,name,path} = filesData;
            const formData = new FormData(); 
            formData.append('file', data.file);
            formData.append('affixId', uploadId);
            formData.append('uploadId', id);
            formData.append('fileName', name);
            formData.append('filePath', path);
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
                iMessage.warn(this.language('LK_QINGXUANZHEXUYAOSHANCHUYOUJIAN','请选择需要删除的附件'));
            }else{
                const confirmInfo = await this.$confirm(this.language('deleteSure','您确定要执行删除操作吗？'))
                if (confirmInfo !== 'confirm') return;
                const attachmentIds = selectItems.map((item)=>item.id);
                await deleteattachments({attachmentIds}).then((res)=>{
                    const {code} = res;
                    if(code == 200 ){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
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
             iMessage.warn(this.language('LK_QINGXUANZHEXUYAOXIAZHAIDEFUJIAN','请选择需要下载的附件'));
            }else{
                const list = selectItems.map((item)=>item.uploadId);
                // const data = {
                //     applicationName: 'rise',
                //     fileList:list.join(),
                // };
                await downloadFile(list);
            }
        },
        clearDialog() {
        this.$emit('changeShowStatus');
        },
    }
}
</script>

<style lang="scss" scoped>
    .openLinkText{
        color:$color-blue;
    }
    .uploadList{
        position: relative;
        padding-bottom: 20px;
        .btn-list{
            position: absolute;
            right: 40px;
            top: -50px;
            text-align: right;
        }
    }
    .icon-gray{
        cursor: pointer;
        .active{
        display: none;
        }
        .show{
        display: block;
        }
    }
    .flexRow{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .icon-gray:hover{
        cursor: pointer;
        .show{
        display: none;
        }
        .active{
        display: block;
    }
  }
</style>
