<!--
 * @Author: wentliao
 * @Date: 2021-06-21 13:35:11
 * @Description: 定点信详情页面--非标准定点信内容区
-->
<template>
    <iCard class="nonStandard-files">
        <template v-slot:header-control>
            <span class="margin-right10" v-if="isEdit">
                <Upload 
                    hideTip
                    :buttonText="$t('LK_SHANGCHUAN')"
                    accept=".pdf"
                    @on-success="onDraingUploadsucess"
                />
            </span>
            <iButton >{{$t('LK_XIAZAI')}}</iButton>
            <iButton v-if="isEdit">{{$t('delete')}}</iButton>
        </template>
        <p class="title">
            {{$t('LK_FUJIAN')}}
            <span class="title-tips">上传时文件请旋转至正常方向后上传</span>
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
export default {
    name:'nonStandard',
    mixins: [ pageMixins ],
    props:{
        isEdit:{
            type:Boolean,
            default:false,
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
    methods:{
        // 获取列表
        getList(){

        },
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