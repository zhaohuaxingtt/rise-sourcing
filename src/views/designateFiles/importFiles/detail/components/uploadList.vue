<!--
 * @Author: wentliao
 * @Date: 2021-05-26 15:36:14
 * @Description: 上传列表
-->

<template>
  <div class="uploadList">
      <!-- 按钮区域 -->
      <p class="btn-list">
          <iButton>下载</iButton>
          <iButton>删除</iButton>
          <upload-button
            @uploadedCallback="uploadAttachments"
            :upload-button-loading="uploadAttachmentsButtonLoading"
            class="margin-left8 margin-right8"
            buttonText="上传文件"
            />
      </p>
      <!-- 表格区域 -->
      <el-table
        :data="tableData"
        fit 
        tooltip-effect='light'
        :empty-text="$t('LK_ZANWUSHUJU')"
        >
        <el-table-column
            type="selection"
            align='center'
            width="50">
        </el-table-column>
        <el-table-column
            type="index"
            label="#"
            align='center'
            width="50">
        </el-table-column>
        <el-table-column v-for="(item,index) in filesTableTitle" 
            :key="'filesDetailListTable'+index" 
            align='center'
            :label="item.name"
            :prop="item.key"
            >
        </el-table-column>
      </el-table>
      
    <!-- 分页 -->
    <iPagination
        class="margin-bottom20"
        @size-change="handleSizeChange($event, purchaseFactory)"
        @current-change="handleCurrentChange($event, purchaseFactory)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount" v-update
    />
  </div>
</template>

<script>
import {
    iPagination,
    iButton,
} from 'rise';
import uploadButton from 'pages/partsrfq/components/uploadButton'
import {pageMixins} from '@/utils/pageMixins'
import { filesTableTitle } from '../data'
export default {
    name:'uploadList',
    mixins:[pageMixins],
    components:{
        uploadButton,
        iPagination,
        iButton,
    },
    data(){
        return{
            tableData:[
                {a:'xxx.png',b:'2021-01-10',c:'xxx'},
            ],
            filesTableTitle:filesTableTitle,
            uploadAttachmentsButtonLoading:false,

        }
    },
    created(){
        console.log('2323232');
    },
    methods:{
        // 上传附件
        uploadAttachments(data,size){
            console.log(data,size);

        }
    }
}
</script>

<style lang="scss" scoped>
    .uploadList{
        position: relative;
        .btn-list{
            position: absolute;
            right: 40px;
            top: -50px;
            text-align: right;
        }
    }
</style>
