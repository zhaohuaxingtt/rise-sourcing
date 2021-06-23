<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ $t('TPZS.TIAZONGLAN') }}</span>
      <div class="floatright">
        <template v-if="!tableStatus">
          <!--编辑-->
          <iButton @click="handleEdit">{{ $t('LK_BIANJI') }}</iButton>
        </template>
        <template v-else>
          <!--取消-->
          <iButton @click="handleCancel">{{ $t('LK_QUXIAO') }}</iButton>
          <!--保存-->
          <iButton @click="handleSave">{{ $t('LK_BAOCUN') }}</iButton>
        </template>
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
          <template v-if="scope.row.children">
            <span class="number">{{ scope.row.children && scope.row.children.length }}</span>
            <icon symbol name="iconwenjianshuliangbeijing" class="reportIcon"/>
          </template>
          <template v-else>
            <div @click="handleOpenPreviewDialog" class="openLinkText cursor">{{ scope.row['2'] }}</div>
          </template>
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
    <!--    预览弹窗-->
    <previewDialog v-model="previewDialog"/>
  </iCard>
</template>

<script>
import {iCard, iButton, iPagination, icon} from 'rise';
import tableList from '@/components/ws3/commonTable';
import {pageMixins} from '@/utils/pageMixins';
import resultMessageMixin from '@/utils/resultMessageMixin';
import previewDialog from './previewDialog';
import {tableTitle} from './data';

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard,
    iButton,
    tableList,
    iPagination,
    icon,
    previewDialog,
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
      tableStatus: '',
      previewDialog: false,
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
    handleEdit() {
      this.tableStatus = 'edit';
    },
    handleCancel() {
      this.tableStatus = '';
    },
    handleSave() {},
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
    handleOpenPreviewDialog() {
      this.previewDialog = true;
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}

.reportContainer {
  position: relative;

  .reportIcon {
    font-size: 20px;
  }

  .number {
    position: absolute;
    left: 48.5%;
    font-size: 14px;
    color: #FFFFFF;
  }
}

.openLinkText {
  color: $color-blue;
  text-decoration: underline;
}

</style>
