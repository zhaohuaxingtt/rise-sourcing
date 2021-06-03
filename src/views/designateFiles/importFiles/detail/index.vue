<!--
 * @Author: wentliao
 * @Date: 2021-05-26 13:53:02
 * @Description: 特殊定点-配附件--附件需求导入列表----附件清单页
-->
<template>
    <iPage class="filesDetailList">
        <div v-if="!showUploadList">
            <p class="title margin-bottom10">{{$t('LK_FUJIANQINGDAN')}}：SAZJ1029</p>
            <iCard collapse>
                <!-- 搜索区域 -->
                <iSearch @sure="sure" @reset="reset">
                    <el-form>
                        <el-form-item :label="$t('LK_FUJIANLINGJIANHAO')">
                            <iInput v-model="searchParams['partNum']"></iInput> 
                        </el-form-item>
                        <el-form-item :label="$t('LK_FUJIANLINGJIANMINGCHENG')">
                            <iInput v-model="searchParams['partNameCh']"></iInput> 
                        </el-form-item>
                        <el-form-item :label="$t('LK_SHIYONGCHEXING')">
                            <iInput v-model="searchParams['carType']"></iInput> 
                        </el-form-item>
                        <el-form-item :label="$t('LK_FUJIANSHANGSHISHIJIAN')">
                            <iDatePicker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="searchParams['timeToMarket']"></iDatePicker> 
                        </el-form-item>
                    </el-form>
                </iSearch>
            </iCard>
            <iCard>
                
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
            </iCard>
        </div>
        <div v-else>
            <iCard>
                <p class="uploadList-icon margin-bottom20">
                    <span @click="changeShowStatus">
                        <icon symbol name="iconguanbixiaoxiliebiaokapiannei" class="close-icon" ></icon>
                    </span>
                </p>
                <uploadList  :uploadId="uploadId" />
            </iCard>
        </div>
    </iPage>
</template>

<script>
import {
    iPage,
    iCard,
    iSearch,
    iInput,
    iDatePicker,
    iPagination,
    icon,
} from 'rise'
import { tableTitle } from './data'
import {pageMixins} from '@/utils/pageMixins'
import uploadList from './components/uploadList'
import tableList from "@/views/partsign/editordetail/components/tableList";
import {
    postAffixList
} from '@/api/designateFiles/importFiles'

export default {
    name:'filesDetailList',
    mixins:[pageMixins],
    components:{
        uploadList,
        iPage,
        iCard,
        iSearch,
        iInput,
        iDatePicker,
        iPagination,
        icon,
        tableList,
    },
    data(){
        return{
            searchParams:{
                partNum:'',
                partNameCh:'',
                carType:'',
                timeToMarket:'',
            },
            tableTitle:tableTitle,
            tableListData:[
                {code:'Z00856102',b:'SP123',c:'SVAA432',d:'1',e:'1111'}
            ],
            showUploadList:false,
            loading:false,
            uploadId:'',
        }
    },
    created(){
        this.getList();
    },
    methods:{
        // 查询
        sure(){
            this.page.currPage = 1;
            this.getList();
            console.log(this.searchParams);
        },
        // // 重置
        reset(){
            const {searchParams} = this;
            for(let i in searchParams){
                searchParams[i] = '';
            }
            this.searchParams = searchParams;
        },
        // 改变弹窗是否显示状态
        changeShowStatus(){
            const {showUploadList} = this;
            this.showUploadList = !showUploadList;
        },
        // 查看上传列表
        checkUploadList(id){
            this.uploadId = id ;
            this.changeShowStatus();
        },
        // 获取列表
        async getList(){
            this.loading =  true;
            const { page,searchParams } = this;
            const data = { 
                ...searchParams,
                pageNo:page.currPage,
                pageSize:page.pageSize,
            };
            await postAffixList(data).then((res)=>{
            const {code,data} = res; 
            if(code === '200' && data){
                const {records,total} = data;
                this.tableListData = records;
                this.page.totalCount = total;
            }
            this.loading =  false;

            }).catch((err)=>{
                this.loading =  false;
            });
        },
    }
}
</script>

<style lang="scss" scoped>
    .filesDetailList{
        .title{
        font-size: 20px;
        font-weight: bold;
        }
        .uploadList-icon{
            text-align: right;
            .close-icon{
                width: 24px;
                height: 24px;
            }
        }
    }
</style>
