<!--
 * @Author: your name
 * @Date: 2021-05-27 17:29:13
 * @LastEditTime: 2021-05-27 19:37:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\rfqdetail\components\partList\index.vue
-->
<template>
  <iCard :title="$t('costanalysismanage.Lingjianqingdan')">
    <template v-slot:header-control>
      <iButton>{{ $t("costanalysismanage.Baocun") }}</iButton>
      <iButton>{{ $t("costanalysismanage.Xiazaijishuziliao") }}</iButton>
      <iButton>{{ $t("costanalysismanage.Xiazaicbd") }}</iButton>
    </template>
    <div class="body">
      <tableList
        class="table"
        index
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
      >
        <template #b="scope">
          <span class="link" @click="download(scope.row)">{{ scope.row.b }}</span>
        </template>
        <template #k="scope">
          <span>{{ scope.row.k | dateFilter("YYYY-MM-DD") }}</span>
        </template>
        <template #m="scope">
          <iInput v-model="scope.row.m" />
        </template>
        <template #n="scope">
          <iInput v-model="scope.row.n" />
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
  </iCard>
</template>

<script>
import { iCard, iButton, iInput, iPagination } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { partListTableTitle as tableTitle } from "../data"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"

export default {
  components: {
    iCard,
    iButton,
    iInput,
    iPagination,
    tableList
  },
  mixins: [ filters, pageMixins ],
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>