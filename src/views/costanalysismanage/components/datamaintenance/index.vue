<!--
 * @Author: your name
 * @Date: 2021-05-27 12:33:07
 * @LastEditTime: 2021-05-28 16:33:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\datamaintenance\index.vue
-->
<template>
  <div class="datamaintenance">
    <div class="control">
      <logButton class="margin-left20" />
      <span class="margin-left20">
        <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
      </span>
    </div>
    <iCard class="card margin-top65" :title="$t('costanalysismanage.Rengongchengbenshujuweihu')">
      <template v-slot:header-control>
        <iButton>{{ $t("costanalysismanage.Daochu") }}</iButton>
        <iButton>{{ $t("costanalysismanage.Shangchuan") }}</iButton>
        <iButton>{{ $t("costanalysismanage.Xiazai") }}</iButton>
        <iButton>{{ $t("costanalysismanage.Shanchu") }}</iButton>
      </template>
      <div class="body">
        <tableList
          class="table"
          index
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          height="calc(100% - 54px)"
        >
          <template #fileName="scope">
            <span class="link" @click="download(scope.row)">{{ scope.row.fileName }}</span>
          </template>
          <template #date="scope">
            <span>{{ scope.row.date | dateFilter("YYYY-MM-DD") }}</span>
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
  </div>
</template>

<script>
import { icon, iCard, iButton, iPagination } from "rise"
import logButton from "@/views/partsign/editordetail/components/logButton"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { tableTitle } from "./components/data"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"

export default {
  components: { 
    icon,
    iCard,
    iButton,
    iPagination,
    logButton,
    tableList
  },
  mixins: [ filters, pageMixins ],
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: []
    }
  },
  methods: {
    getList() {}
  }
}
</script>

<style lang="scss" scoped>
.datamaintenance {
  .control {
    position: absolute;
    top: 30px;
    right: 40px;
    display: flex;
    align-items: center;
    height: 30px;
  }

  .card {
    .body {
      height: calc(100vh - 310px);
      min-height: 480px;
    }
  }
}
</style>
