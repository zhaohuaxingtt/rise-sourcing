<!--
 * @Author: wentliao
 * @Date: 2021-07-27 16:59:22
 * @Description: 查看附件 aekoFilesList
-->
<template>
<iDialog     
    :title="language('LK_AEKO_FUJIANCHAKAN','查看附件')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="filesListDialog"
>
  <div class="uploadList">
      <!-- 按钮区域 -->
      <p class="btn-list">
          <iButton @click="download">{{language('LK_XIAZAI','下载')}}</iButton>
          <iButton v-permission="AEKO_MANAGELIST_TABLE" @click="deleteFiles">{{language('LK_SHANCHU','删除')}}</iButton>
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
            <!-- 附件 -->
            <template #fileName="scope">
                <span class="link" @click="downloadSingleFile(scope.row)">{{scope.row.fileName}}</span>
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
import { downloadUdFile as downloadFile } from '@/api/file'
import { deleteFiles } from '@/api/aeko/manage'
import {
    getFilesList,
} from '@/api/aeko/manage'
export default {
    name:'filesListDialog',
    mixins:[pageMixins],
    components:{
        iPagination,
        iButton,
        tableList,
        iDialog,
    },
    props:{
        dialogVisible:{
            type:Boolean,
            default:false,
        },
        itemFile:{
            type:Object,
            default:()=>{},
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
            const { itemFile,page } = this;
            const data = {
                hostId:itemFile.requirementAekoId,
                pageNo:page.currPage,
                pageSize:page.pageSize,
            }
            await getFilesList(data).then((res)=>{
                this.loading = false;
                const { code,data=[],total } = res;
                if(code == 200){
                    this.tableListData = data;
                    this.page.totalCount = total;
                }
            }).catch((err)=>{
                this.loading = false;
            })
        },

        handleSelectionChange(val) {
            this.selectItems = val;
        },

        // 下载单文件
        async downloadSingleFile(row){
            // 如果是pdf就直接新开页面预览
             const { fileName,filePath,uploadId } = row;
            const isPdf = (fileName.toLowerCase()).indexOf('.pdf')>=0;
            if(isPdf){
                window.open(filePath)
            }else{
                await downloadFile([uploadId]);
            }
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
                deleteFiles({fileIds:attachmentIds}).then((res)=>{
                    if(res.code == 200){
                        iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        this.getList();
                        this.$emit('getTableList');
                    }else{
                        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
                    }
                })
            }
        },
        
        // 下载附件
        async download(){
            const  {selectItems } = this;
            if(!selectItems.length){
             iMessage.warn(this.language('LK_QINGXUANZHEXUYAOXIAZHAIDEFUJIAN','请选择需要下载的附件'));
            }else{
                const list = selectItems.map((item)=>item.uploadId);
                await downloadFile(list);
            }
        },
        clearDialog() {
            this.$emit('changeVisible','filesVisible',false);
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
