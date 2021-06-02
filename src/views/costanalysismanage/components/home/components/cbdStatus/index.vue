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
              <iButton>{{$t('LK_XIAZAI')}}</iButton>
          </div>
      </div>
      <!-- 表格区域 -->
      <tableList :activeItems="null" selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
      <!-- 分页 -->
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
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
        }
    },
    data(){
        return{
            tableData:[
                {'a':'FS号','b':'3q11','c':'空调器','d':'KTQ','e':'B-MPV2','f':'XXX','g':'2021-01-01','h':'1','i':'已关闭','j':'BUC.TIA'},
        ],
            tableTitle:CbdTitle,
            selectItems:[],
            tableLoading:false,
        }
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