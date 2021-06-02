<!--
 * @Author: wentliao
 * @Date: 2021-05-28 11:06:19
 * @Description: 报告清单列表
-->
<template>
    <iCard :title="$t('costanalysismanage.baogaoqingdan')">
        <template v-slot:header-control>
            <iButton>{{$t('LK_SHANGCHUAN')}}</iButton>
            <iButton>{{$t('LK_XIAZAI')}}</iButton>
            <iButton>{{$t('delete')}}</iButton>
        </template>
        <div class="body">
        <tableList
            class="table"
            index
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
        >
            <template #fileName="scope">
            <span class="link" @click="download(scope.row)">{{ scope.row.fileName }}</span>
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
import { iCard, iButton, iPagination } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { reportListTableTitle as tableTitle } from "../data"
import { pageMixins } from "@/utils/pageMixins"
import { getFileHistory } from "@/api/costanalysismanage/rfqdetail"
export default {
    name:'reportList',
    mixins: [ pageMixins ],
    components: {
        iCard,
        iButton,
        iPagination,
        tableList
    },
    created(){
        this.getList();
    },
    data() {
        return {
        loading: false,
        tableTitle,
        tableListData: []
        }
    },
    methods:{
        download(row){
            console.log(row);
        },
        
        // 获取列表
        getList(){
            this.loading =  true;
            const { query } = this.$route;
            const {rfqNum="1" } = query;
            const { page } = this;
            const data = {
                nomiAppId:rfqNum,
                fileType:'109',   // 101 109: 报告清单,110:询价图纸,111:询价附件
                pageNo:page.currPage,
                pageSize:page.pageSize,
            }
            getFileHistory(data).then((res)=>{
                const {code,data} = res; 
                if(code === '200' && data){
                    const {records,total} = data;
                    this.loading =  false;
                    this.tableListData = records;
                    this.page.totalCount = total;
                }else{
                     this.loading =  false;
                }
            }).catch((err)=>{
                 this.loading =  false;
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>