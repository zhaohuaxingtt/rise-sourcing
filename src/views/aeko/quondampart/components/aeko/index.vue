<!--
 * @Author: your name
 * @Date: 2021-07-27 10:51:18
 * @LastEditTime: 2021-08-24 15:27:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aeko\quondampart\components\aeko\index.vue
-->
<template>
  <iCard class="margin-top20" :title="language('ZHIDINGAEKOKUYUANLINGJIAN', '指定AEKO库原零件')">
    <template #header-control>
       <iButton >{{ language("DAOCHU", "导出") }}</iButton>
    </template>

    <div class="body">
      <tableList
        class="table"
        index
        :lang="true"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
        ></tableList>

        
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

  </iCard>
</template>

<script>
import{
  iCard,iButton,iPagination
} from 'rise';
import tableList from "@/views/partsign/editordetail/components/tableList"
import { pageMixins } from "@/utils/pageMixins"
import { aekoPartTableTitle } from '../data'
export default {
  name:'aekoPartList',
  mixins: [ pageMixins ],
  components:{
    iCard,iButton,iPagination,
    tableList,
  },
  data(){
    return{
      loading:false,
      tableListData:[],
      tableTitle:aekoPartTableTitle,
      multipleSelection: [],
    }
  },
  methods:{
    handleSelectionChange(list) {
      this.multipleSelection = list
    },

    getList(){

    },
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 260px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: #1660f1;
  text-shadow: 1px 1px 0 #ccc, 2px 2px 0 #ccc;
}
</style>