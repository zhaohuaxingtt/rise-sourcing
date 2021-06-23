<!--
 * @Author: wentliao
 * @Date: 2021-06-21 15:45:40
 * @Description: 历史LOI
-->
<template>
  <iDialog
    :title="$t('LK_LISHILOI')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="historyDialog"
    >
    <div class="contain padding-bottom20">
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
            :total="page.totalCount" />
    </div>
    </iDialog>
</template>

<script>
import {
  iDialog,
  iPagination,
} from 'rise';
import tableList from "@/views/partsign/editordetail/components/tableList"
import { historyListTitle } from '../../../data'
import { pageMixins } from "@/utils/pageMixins"
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
      }
    },
    data(){
      return{
        tableTitle:historyListTitle,
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
        getList(){

        },
        handleSelectionChange(val) {
            this.selectItems = val;
        },
    }
}
</script>

<style>

</style>
