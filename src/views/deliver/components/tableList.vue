<template>
  <iCard :title="title">
    <template #header-control>
      <iButton :loading="downloadLoading" @click="handleDownload">{{
        language("DAOCHU", "导出")
      }}</iButton>
    </template>
    <div>
      <tableList
        class="table"
        ref="tableList"
        :lang="true"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        :selection='false'
      >
        <!-- 延迟级别 -->
        <template #col8="scope">
          <div class="table-item-aeko">
            <icon
              class="margin-right5 font20"
              symbol
              :name="showIcon(scope.row.status)"
            ></icon>
            <span>{{ scope.row.col8 }}</span>
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
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import { tableTitle } from "./data.js";
import { pageMixins } from "@/utils/pageMixins";
export default {
  components: {
    iCard,
    tableList,
    iPagination,
    iButton,
    icon,
  },
  mixins: [tableSortMixins, pageMixins],
  props:{
    title:{ type: String, },
    dataList:{type:Array,default:[]},
  },
  data() {
    return {
      downloadLoading: false,
      loading: false,
      tableTitle,
      tableListData: [
        {
          cartypeProNameZh: "ID4.X",
          rfq: "80000967",
          materialGroupCode: "123",
          partNum: "111",
          partNameZh: "示例零件1",
          partType: "Nomi",
          soll: "20W-20",
          progress: "重度延期4周",
          supplierName: "宁波金鑫粉末冶金有限公司",
        },
      ],
    };
  },
  methods: {
    handleDownload() {},
    getTableData() {},
    showIcon(status) {
      let result = "";
      switch (status) {
        case 1:
          result = "iconyouxianji-landeng";
          break;
        case 2:
          result = "iconyouxianji-huangdeng";
          break;
        case 3:
          result = "iconyouxianji-hongdeng";
          break;
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>