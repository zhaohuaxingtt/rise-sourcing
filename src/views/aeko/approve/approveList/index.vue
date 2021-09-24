<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-09-23 15:32:13
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-24 10:10:41
 * @Description: 
-->
<template>
  <div>
    <!-- 搜索 -->
    <search />
    <!-- 表格 -->
    <div class="table">
      <tablelist
        height="400"
        index
        :selection="true"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :lang="true"
        v-loading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
      </tablelist>
    </div>
    <div class="pagination">
      <iPagination v-update
          class="pagination"
          @size-change="handleSizeChange($event, getFetchData)"
          @current-change="handleCurrentChange($event, getFetchData)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
    </div>
  </div>
</template>
<script>
import search from '../components/search'
import {tableTitle} from '../components/data'
import tablelist from 'rise/web/components/iFile/tableList'; 
import {iPagination} from 'rise'
import { pageMixins } from '@/utils/pageMixins'

export default {
  mixins: [pageMixins],
  components: {
    iPagination,
    search,
    tablelist
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      tableSelecteData: [],
      tableLoading: false
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.tableSelecteData = val
    }
  }
}
</script>
