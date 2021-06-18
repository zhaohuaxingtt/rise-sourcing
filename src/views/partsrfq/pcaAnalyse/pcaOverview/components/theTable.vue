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
        :tiledTableData="tiledTableListData"
        :treeTable="true"
        @handleSelectionChange="handleSelectionChange"
    >
      <template #2="scope">
        <div class="reportContainer">
          <span class="number">{{scope.row.children && scope.row.children.length}}</span>
          <icon symbol name="iconwenjianshuliangbeijing" class="reportIcon" v-if="scope.row.children"/>
        </div>
      </template>
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
import {iCard, iButton, iPagination, icon} from 'rise';
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
    icon
  },
  data() {
    return {
      tableListData: [
        {
          id: 1, '1': 1, '2': 2,
          children: [
            {id: 2, '1': 1, '2': 2},
          ],
        },
        {
          id: 3, '1': 1, '2': 2,
          children: [
            {id: 4, '1': 1, '2': 2},
            {id: 5, '1': 1, '2': 2},
            {id: 6, '1': 1, '2': 2},
          ],
        },
      ],
      tiledTableListData: [],
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
      this.getTiledTableListData();
    },
    handleEdit() {},
    getTiledTableListData() {
      this.tiledTableListData = [];
      this.tableListData.map((item, index) => {
        item.treeIndex = index + 1;
        this.tiledTableListData.push(item);
        if (item.children) {
          item.children.map((itemChildren, indexChildren) => {
            itemChildren.treeIndex = `${index + 1}.${indexChildren + 1}`;
            this.tiledTableListData.push(itemChildren);
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
.reportContainer{
  position: relative;
  .reportIcon{
    font-size: 20px;
  }
  .number{
    position: absolute;
    left: 48.5%;
    font-size: 14px;
    color: #FFFFFF;
  }
}

</style>
