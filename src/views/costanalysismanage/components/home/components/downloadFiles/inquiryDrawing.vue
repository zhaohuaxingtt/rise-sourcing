<!--
 * @Author: wentliao
 * @Date: 2021-05-27 20:26:28
 * @Description: 
-->
<template>
    <div class="inquiryDrawing">
        <div class="header clearFloat margin-bottom15">
          <span class="title">询价图纸</span>

          <div class="floatright">
              <iButton>下载</iButton>
          </div>
      </div>
      <!-- 表格区域 -->
      <tableList :activeItems='"a"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
      <!-- 分页 -->
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
      class="padding-bottom20"
    />
    </div>
</template>

<script>
import {
    iButton,
    iPagination,
} from 'rise'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import { DrawingTitle } from '../data'
export default {
    name:'inquiryDrawing',
    mixins: [pageMixins],
    components:{
        tableList,
        iButton,
        iPagination,
    },
    data(){
        return{
            tableData:[
                {'e':'零件号1','a':'1a.jpg','b':'1.14','c':'2021-03-04','d':'张一'},
                {'e':'零件号2','a':'2a.jpg','b':'2.14','c':'2021-03-04','d':'张二'},
                {'e':'零件号3','a':'3c.jpg','b':'3.14','c':'2021-03-04','d':'张三'},
        ],
            tableTitle:DrawingTitle,
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
    }
}
</script>

<style lang="scss" scoped>
    .inquiryDrawing{
        .header{
            .title{
                font-size: 18px;
                font-weight: bold;
            }
        }
    }
</style>