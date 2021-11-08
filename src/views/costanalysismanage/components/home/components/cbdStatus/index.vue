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
          <span class="title">{{language('LK_CBDSTATUS','CBD状态')}}</span>

          <div class="floatright">
              <iButton :loading="downloadLoading" @click="handleDownload">{{language('LK_XIAZAI','下载')}}</iButton>
          </div>
      </div>
      <!-- 表格区域 -->
      <tableList 
        index
        :lang="true"
        singleSelect
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSingleSelectChange="handleSingleSelectChange"
        > 
      </tableList>
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
    iMessage
} from 'rise'
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins"
import { CbdTitle } from '../data'
import { getKmCbdList } from "@/api/costanalysismanage/rfqdetail"
import { partCbdKmFile } from "@/api/costanalysismanage/costanalysis"
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
            tableLoading:false,
            downloadLoading: false,
            currentRow: null
        }
    },
    created(){
        this.getList();
    },
    methods:{
        openPage(){
            const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/accessorypartdetail', query: {  }})
            window.open(router.href,'_blank')
        },
        handleSingleSelectChange(row) {
            this.currentRow = row
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
                    this.currentRow = null
                    this.tableData = data;
                    this.page.totalCount = res.total;
                } else {
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
                this.tableLoading = false;
            }).catch((err)=>{ this.tableLoading = false; })
        },

        async handleDownload() {
            if (!this.currentRow) return iMessage.warn(this.language("QINGXUANZEXUYAOXIAZAIDESHUJU", "请选择需要下载的数据"))
            this.downloadLoading = true
            try {
                await partCbdKmFile({
                    quotationId: this.currentRow.quotationId
                })
            } catch(e) {
                iMessage.error(this.language("XIAZAISHIBAI", "下载失败"))
            } finally {
                this.downloadLoading = false
            }
        }
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