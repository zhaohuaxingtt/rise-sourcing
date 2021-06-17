<!--
 * @Author: wentliao
 * @Date: 2021-05-28 10:29:24
 * @Description: CBD弹窗
-->
<template>
    <iDialog
        :visible.sync="dialogVisible"
        @close="clearDialog"
        width="90%"
    >
    <div class="cbdStatus">
        <div class="header clearFloat margin-bottom15">
          <span class="title">CBD状态</span>

          <div class="floatright">
              <iButton disabled>{{$t('LK_XIAZAI')}}</iButton>
          </div>
      </div>
      <!-- 表格区域 -->
      <tableList :activeItems="null" selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
      <!-- 分页 -->
      <iPagination 
        v-update 
        @size-change="handleSizeChange($event, getList)" 
        @current-change="handleCurrentChange($event, getList)" 
        background :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
        class="padding-bottom20"
     />
    </div>
    </iDialog>
</template>

<script>
import {
    iDialog,
    iButton,
    iPagination,
} from 'rise'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import { CbdTitle } from '../data'
import { getKmCbdList } from "@/api/costanalysismanage/rfqdetail"
export default {
    name:'cbdStatus',
    mixins: [pageMixins],
    components:{
        iDialog,
        tableList,
        iButton,
        iPagination,
        
    },
    props:{
        dialogVisible:{
            type:Boolean,
            default:false
        },
        rfqId:{
            type:String,
            default:'',
        }
    },
    data(){
        return{
            tableData:[],
            tableTitle:CbdTitle,
            selectItems:[],
            tableLoading:false,
        }
    },
    created(){
        this.getList();
    },
    methods:{
        openPage(){
            const router =  this.$router.resolve({path: '/sourcing/accessorypartdetail', query: {  }})
            window.open(router.href,'_blank')
        },
        handleSelectionChange(val) {
            this.selectItems = val;
        },
        
        clearDialog() {
            this.$emit('changeVisible', false);
        },
        
        // 获取CBD列表信息
        async getList(){
            this.tableLoading = true;
            const {rfqId} = this;
            const { page } = this;
            const data = {
                rfqId,
                pageNo:page.currPage,
                pageSize:page.pageSize,
            }
            await getKmCbdList(data).then((res)=>{
                const {code,data} = res;
                if(code == 200 && data){
                    console.log(data);
                    this.tableData = data;
                    this.page.totalCount = res.total;
                }
                this.tableLoading = false;
            }).catch((err)=>{ this.tableLoading = false; })
        },
    }
}
</script>

<style  lang="scss" scoped>
.cbdStatus{
    .header{
        .title{
            font-size: 18px;
            font-weight: bold;
        }
    }
}
</style>