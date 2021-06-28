<!--
 * @Author: wentliao
 * @Date: 2021-06-21 13:35:11
 * @Description: 定点信详情页面-非标准定点信内容区
-->
<template>
    <iCard class="nonStandard-files">
        <template v-slot:header-control>
            <span class="margin-right10" v-if="isEdit">
                <Upload 
                    hideTip
                    :buttonText="language('LK_SHANGCHUAN','上传')"
                    accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.pdf,.tif"
                    @on-success="onUploadsucess(Object.assign(...arguments, {fileType: '120'}), getFetchDataList)"
                    
                />
            </span>
            <iButton @click="downloadFile">{{language('LK_XIAZAI','下载')}}</iButton>
            <iButton 
            v-if="isEdit" 
            @click="deleteFile($event, getFetchDataList)"
          >{{language('delete','删除')}}</iButton>
        </template>
        <p class="title">
            {{language('LK_FUJIAN','附件')}}
            <span class="title-tips">{{language('LK_SHANGCHUANSHIWENJIANQINGXUANZHUANZHIZHENGCHANGFANGXIANGHOUSHANGCHUAN','上传时文件请旋转至正常方向后上传')}}</span>
        </p>
        <div> 
            <tableList
                class="table"
                index
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
                :total="page.totalCount" 
            />
        </div>
    </iCard>
</template>

<script>
import {
    iCard,
    iButton,
    iPagination,
} from 'rise';
import Upload from '@/components/Upload'
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins"
import { historyListTitle as tableTitle } from '../../../data'
import { attachMixins } from '@/utils/attachMixins'
export default {
    name:'nonStandard',
    mixins: [ pageMixins,attachMixins ],
    props:{
        isEdit:{
            type:Boolean,
            default:false,
        },
        nomiAppId:{
            type:String,
            default:'',
        }
    },
    components:{
        iCard,
        Upload,
        iButton,
        tableList,
        iPagination,
    },
    data(){
        return{
            tableListData:[],
            tableTitle,
        }
    },
    created(){
        this.getFetchDataList();
    },
    methods:{
        // 获取列表
        async getFetchDataList() {
            const params = {
                nomiAppId: this.nomiAppId,
                sortColumn: 'sort',
                isAsc: true,
                fileType: '120',
            }
            await this.getDataList(params)
        }
    }
}
</script>

<style lang="scss" scoped>
    .nonStandard-files{
        position: relative;
        .title{
            padding: 30px 0 25px 40px;
            position: absolute;
            top: 0;
            left: 0;
            font-size: 18px;
            color: #020918;
            font-weight: bold;
            .title-tips{
                font-weight: normal;
                color: #131523;
                font-size: 14px;
                margin-left: 14px;
            }
        }
    }
</style>