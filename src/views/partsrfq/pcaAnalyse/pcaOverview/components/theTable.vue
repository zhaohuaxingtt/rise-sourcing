<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ $t('TPZS.PCAZONGLAN') }}</span>
      <div class="floatright">
        <!--编辑-->
        <iButton @click="handleEdit">{{ $t('LK_BIANJI') }}</iButton>
      </div>
    </div>
    <tableList
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        @handleSelectionChange="handleSelectionChange"
    >
    </tableList>
    <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page='page.currPage'
        :total="page.totalCount"/>

  </iCard>
</template>

<script>
import {iCard, iButton, iPagination} from 'rise';
import tableList from '@/components/ws3/commonTable';
import {pageMixins} from '@/utils/pageMixins';
import resultMessageMixin from '@/utils/resultMessageMixin';
import {tableTitle} from './data';

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard,
    iButton,
    tableList,
    iPagination,
  },
  data() {
    return {
      tableListData: [],
      tableTitle,
      tableLoading: false,
      selectTableData: [],
      inDepthRatingDialog: false,
      vwagRatingDialog: false,
      inDepthRatingDialogLoading: false,
      exportFinancialReportDialog: false,
      exportFinancialReportDialogLoading: false,
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    async getTableList() {
      // this.tableLoading = true;
      const searchItem = this.$parent.$children.filter(item => {
        return item.$attrs.name === 'theSearch';
      });
      const searchForm = searchItem[0].form;
      /* try {
         const req = {
           pageNo: this.page.currPage,
           pageSize: this.page.pageSize,
           ...searchForm,
         };
         const res = await getFrmList(req);
         if (res.result) {
           this.tableListData = res.data;
           this.page.currPage = res.pageNum;
           this.page.pageSize = res.pageSize;
           this.page.totalCount = res.total || 0;
         } else {
           this.resultMessage(res);
           this.tableListData = [];
         }
         this.tableLoading = false;
       } catch {
         this.tableListData = [];
         this.tableLoading = false;
       }*/
    },
    handleEdit() {},
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
