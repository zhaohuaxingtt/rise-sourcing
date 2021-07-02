<!--
 * @Author: wentliao
 * @Date: 2021-06-30 17:28:55
 * @Description: LOI预览页----仅做跳转的预览页不做任何操作
-->
<template>
    <iPage>
        <iCard class="previewLoi" title="预定点通知书(LOI)">
            
        <!-- 表单区域 -->
        <tableList
            class="table"
            index
            :lang="true"
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="loading"
            :selection="false"
        >
            <!-- LOI状态 -->
            <template #loiStatus="scope">
                <span >{{ scope.row.loiStatus &&  scope.row.loiStatus.desc}}</span>
            </template>
        </tableList>
        <!-- 分页 -->
        <!-- <iPagination
            v-update
            @size-change="handleSizeChange($event, getList)"
            @current-change="handleCurrentChange($event, getList)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
        /> -->
        </iCard>
    </iPage>
</template>

<script>
import {
    iPage,
    iCard,
    // iPagination,
    iMessage,
} from 'rise';
import tableList from "@/views/partsign/editordetail/components/tableList"
import {
    loiListTitle,
} from '../data';
// import { pageMixins } from "@/utils/pageMixins";
import {
    findNomiLoiSingle,
} from '@/api/letterAndLoi/loi'
export default {
    name:'previewLoi',
    // mixins: [pageMixins],
    components:{
        iPage,
        iCard,
        tableList,
        // iPagination,
    },
    data(){
        return{
            tableListData:[],
            tableTitle:loiListTitle,
            loading:false,
        }
    },
    created(){
        this.getList();
    },
    methods:{
        async getList(){
            this.loading = true;
            const { page } = this;
            const { query } = this.$route;
            const { id } = query;
            const data = {
                // current:page.currPage,
                // size:page.pageSize
            };
            await findNomiLoiSingle(id).then((res)=>{
                 this.loading = false;
                const {code,data} = res;
                if(code==200){
                   this.tableListData = [data];
                //    this.page.totalCount = total;
                }else{
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            }).catch((err)=>{
                this.loading = false;
            })
        }
    }
}
</script>

<style>

</style>