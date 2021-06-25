<!--
 * @Author: wentliao
 * @Date: 2021-05-26 13:53:02
 * @Description: 特殊定点-配附件--附件需求导入列表----附件清单页
-->
<template>
    <iPage class="filesDetailList">
        <div v-if="!showUploadList">
            <p class="title margin-bottom10">{{language('LK_FUJIANQINGDAN','附件清单')}}：{{importfilesId}}</p>
            <iCard collapse>
                <!-- 搜索区域 -->
                <iSearch @sure="sure" @reset="reset">
                    <el-form>
                        <el-form-item :label="language('LK_FUJIANLINGJIANHAO','附件零件号')">
                            <iInput v-model="searchParams['partNum']"></iInput> 
                        </el-form-item>
                        <el-form-item :label="language('LK_FUJIANLINGJIANMINGCHENG','附件零件名称')">
                            <iInput v-model="searchParams['partNameCh']"></iInput> 
                        </el-form-item>
                        <el-form-item :label="language('LK_SHIYONGCHEXING','使⽤⻋型')">
                            <iInput v-model="searchParams['carType']"></iInput> 
                        </el-form-item>
                        <el-form-item :label="language('LK_FUJIANSHANGSHISHIJIAN','附件上市时间')">
                            <iDatePicker format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="searchParams['timeToMarket']"></iDatePicker> 
                        </el-form-item>
                    </el-form>
                </iSearch>
            </iCard>
            <iCard class="margin-top20">
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
                    <!-- RFQ编号 -->
                    <template #rfqId="scope">
                        <span @click="goFilesList(scope.row.rfqId)" class="link-underline" >{{scope.row.rfqId}}</span>
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
            importfilesId:'',
        }
    },
    created(){
        const {query={}} = this.$route;
        const {id} = query;
        this.importfilesId = id;
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
            const {query={}} = this.$route;
            const {id} = query;
            const data = { 
                code:id,
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

        // 跳转RFQ详情
        goFilesList(rfqId){
             const router =  this.$router.resolve({path: `/costanalysismanage/rfqdetail?rfqId=${rfqId}`})
             window.open(router.href,'_blank');
            // this.$router.push({
            //     path:'/costanalysismanage/rfqdetail',
            //     query:{rfqId}
            // })
        }
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
