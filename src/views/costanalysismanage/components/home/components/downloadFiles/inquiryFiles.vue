<!--
 * @Author: wentliao
 * @Date: 2021-05-27 20:22:50
 * @Description: 弹窗内容-询价附件
-->
<template>
  <div class="inquiryFiles">
      <div class="header clearFloat margin-bottom15">
          <span class="title">询价附件</span>
          <span class="tips">上传附件:文件请旋转至正常方向后上传</span>

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
import { FilesTitle } from '../data'

export default {
    name:'inquiryFiles',
    mixins: [pageMixins],
    components:{
        tableList,
        iButton,
        iPagination,
    },
    data(){
        return{
            tableData:[
                {'a':'1a.jpg','b':'1.14','c':'2021-03-04','d':'张一'},
                {'a':'2a.jpg','b':'2.14','c':'2021-03-04','d':'张二'},
                {'a':'3c.jpg','b':'3.14','c':'2021-03-04','d':'张三'},
           ],
            tableTitle:FilesTitle,
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
.inquiryFiles{
    .header{
        .title{
            font-size: 18px;
            font-weight: bold;
        }
        .tips{
            font-size: 14px;
            color: #999999;
            margin-left: 10px;
        }
    }
}
</style>