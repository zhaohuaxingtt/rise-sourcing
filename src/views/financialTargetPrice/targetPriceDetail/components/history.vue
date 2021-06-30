<!--
 * @Author: Luoshuang
 * @Date: 2021-06-23 14:08:28
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-23 14:17:44
 * @Description: 修改历史card
 * @FilePath: \front-web\src\views\financialTargetPrice\targetPriceDetail\components\history.vue
-->

<template>
  <iCard class="margin-top20">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">修改历史</span>
        <div class="floatright">
          <!--------------------分配询价科室按钮----------------------------------->
          <iButton @click="handleExport" >导出</iButton>
        </div>
    </div>
    <!------------------------------------------------------------------------>
    <!--                  表格                                              --->
    <!------------------------------------------------------------------------>
    <tableList :activeItems='"spnrNum"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
    <!------------------------------------------------------------------------>
    <!--                  表格分页                                          --->
    <!------------------------------------------------------------------------>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
    />
  </iCard>
</template>

<script>
import {iCard,iPagination,iButton} from 'rise'
import tableList from '../../components/tableList'
import { historyTableTitle } from '../data'
import { pageMixins } from "@/utils/pageMixins"
export default {
  mixins: [pageMixins],
  components: {iCard,iPagination,tableList,iButton},
  data() {
    return {
      tableTitle: historyTableTitle,
      tableData: [],
      tableLoading: false,
    }
  },
  methods: {
    /**
     * @Description: 导出
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleExport() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>