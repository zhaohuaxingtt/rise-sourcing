<!--
 * @Author: wentliao
 * @Date: 2021-06-21 15:45:40
 * @Description: 历史LOI
-->
<template>
  <iDialog
    :title="language('LK_LISHILOI','历史LOI')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="historyDialog"
    >
    <div class="contain padding-bottom20">
        <tableList
            class="table"
            index
            :selection="false"
            :lang="true"
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
            :total="page.totalCount" />
    </div>
    </iDialog>
</template>

<script>
import {
  iDialog,
  iPagination,
  iMessage,
} from 'rise';
import tableList from "@/views/partsign/editordetail/components/tableList"
import { historyLoiListTitle as  tableTitle } from '../../../data'
import { pageMixins } from "@/utils/pageMixins"
import {
    historyLoiPage,
    getFileDownload,
} from '@/api/letterAndLoi/loi'
// import { downloadFile } from '@/api/file'
export default {
    name:'historyDialog',
    mixins: [ pageMixins ],
    components:{
      iDialog,
      tableList,
      iPagination,
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      },
      loiInfo:{
        type:Object,
        default:()=>{},
      }
    },
    data(){
      return{
        loading:false,
        tableTitle:tableTitle,
        tableListData:[],
        selectItems:[],
      }
    },
    created(){
      this.getList();
    },
    methods:{
        clearDialog() {
          this.$emit('changeVisible', false)
        },
        // 获取列表
        async getList(){
          this.loading = true;
          const { loiInfo={},page } = this;
          const { id,loiNum } = loiInfo;
          const data = {
            id,loiNum,
            isHistory:1,
            current:page.currPage,
            size:page.pageSize,
          }
          await historyLoiPage(data).then((res)=>{
            this.loading = false;
            const {code,data=[],total} = res;
            if(code == 200){
              this.tableListData = data;
              this.page.totalCount = total;
            }else{
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          }).catch((err=>{
            this.loading = false;
          }))
        },
        handleSelectionChange(val) {
            this.selectItems = val;
        },
        // 下载附件
        async downloadLine(row){
          //   const params = {
          //   applicationName: 'rise',
          //   fileList:[row.fileName]
          // };
          // await downloadFile(params);
          const {hostId,fileType} = row;
            const params = {
                hostId,
                fileType,
            }
            await getFileDownload(params);
        },
    }
}
</script>

<style>

</style>
