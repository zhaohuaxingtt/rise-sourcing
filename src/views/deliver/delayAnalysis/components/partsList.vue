<template>
  <iCard title="零件清单列表">
    <template #header-control>
      <iButton :loading="downloadLoading" @click="handleDownload">{{ language("DAOCHU", "导出") }}</iButton>
    </template>
    <div >
        <tableList
          class="table"
          ref="tableList"
          index
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
        >
        <!-- 延迟级别 -->
        <template #col8="scope">
          <div class="table-item-aeko">
            <icon class="margin-right5 font20" symbol name="iconyouxianji-hongdeng"></icon>
            <span >{{scope.row.col8}}</span>
          </div>
        </template>

        </tableList>
        <!-- 分页 -->
          <iPagination
            v-update
            @size-change="handleSizeChange($event, getList)"
            @current-change="handleCurrentChange($event, getList)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
          />
        </div>
  </iCard>
</template>

<script>
import { iCard, iPagination, iButton, icon } from "rise";
import tableList from "@/components/iTableSort"
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins"
import { tableTitle } from "./data.js";
import { pageMixins } from "@/utils/pageMixins";
  export default {
    components:{
      iCard,
      tableList,
      iPagination,
      iButton,
      icon
    },
    mixins:[tableSortMixins, pageMixins],
    data() {
      return {
        downloadLoading: false,
        loading:false,
        tableTitle,
        tableListData:[
          {
            'col1':'ID4.X',
            'col2':'80000967',
            'col3':'123',
            'col4':'111',
            'col5':'示例零件1',
            'col6':'Nomi',
            'col7':'Nomi',
            'col8':'Nomi',
            'col9':'Nomi',
            'col10':'Nomi',
            'status':1,
          }
        ],

      }
    },
    methods:{
      handleDownload(){

      },
      getTableData(){

      },
      showIcon(status){
        let result = ''
        switch(status){
          case 1:
            result = 'iconyouxianji-landeng'
            break
          case 2:
            result =  'iconyouxianji-huangdeng';
            break
          case 3:
            result =  'iconyouxianji-hongdeng';
            break
        }
        return result
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>