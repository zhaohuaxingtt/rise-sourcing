<!--
 * @Author: wentliao
 * @Date: 2021-06-21 11:04:25
 * @Description: 历史定点信列表
-->
<template>
  <iDialog
    :title="language('LK_LISHIDINGDIANXIN','历史定点信')"
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
import { letterHistoryTitle } from '../../../data'
import { pageMixins } from "@/utils/pageMixins"
import { downloadUdFile as downloadFile } from '@/api/file'
import {
  getHistoryLetter,
} from '@/api/letterAndLoi/letter'
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
      nominateLetterId:{
        type:String,
        default:'',
      }
    },
    data(){
      return{
        tableTitle:letterHistoryTitle,
        tableListData:[],
        loading:false,
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
          const { nominateLetterId,page } = this; 
          const data = {
            nominateLetterId,
            current:page.currPage,
            size:page.pageSize,
          };
          await getHistoryLetter(data).then((res)=>{
            this.loading = false;
            const { code,data={} } = res;
            if(code == 200){
              const {records=[],total} = data;
              this.tableListData = records;
              this.page.totalCount = total;
            }else{
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          }).catch((err)=>{
            this.loading = false;
          })
        },

        // 下载附件
        async downloadLine(row){
           const params = [row.uploadId]
          await downloadFile(params);
        },
    }
}
</script>

<style>

</style>