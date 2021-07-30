<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight" v-if="pageType === 'PCA'">{{ $t('TPZS.PCAZONGLAN') }}</span>
      <span class="font18 font-weight" v-else-if="pageType === 'TIA'">{{ $t('TPZS.TIAZONGLAN') }}</span>
      <!--            <div class="floatright">
                    <template v-if="!tableStatus">
                      &lt;!&ndash;编辑&ndash;&gt;
                      <iButton @click="handleEdit">{{ $t('LK_BIANJI') }}</iButton>
                    </template>
                    <template v-else>
                      &lt;!&ndash;取消&ndash;&gt;
                      <iButton @click="handleCancel">{{ $t('LK_QUXIAO') }}</iButton>
                      &lt;!&ndash;保存&ndash;&gt;
                      <iButton @click="handleSave">{{ $t('LK_BAOCUN') }}</iButton>
                    </template>
                  </div>-->
    </div>
    <tableList
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        :tiledTableData="tiledTableListData"
        :treeTable="true"
        treeProps="fileList"
        rowKey="id"
        @handleSelectionChange="handleSelectionChange"
    >
      <template #fileName="scope">
        <div class="reportContainer">
          <template v-if="scope.row.fileList">
            <span class="number">{{ scope.row.fileList && scope.row.fileList.length }}</span>
            <icon symbol name="iconwenjianshuliangbeijing" class="reportIcon"/>
          </template>
          <template v-else>
            <div @click="handleOpenPreviewDialog(scope.row)" class="openLinkText cursor">{{
                scope.row['fileName']
              }}
            </div>
          </template>
        </div>
      </template>
      <template #createName="scope">
        <template v-if="scope.row.fileList">
          <span>{{ scope.row.createName }}</span>
        </template>
        <template v-else>
          <span>{{ scope.row.uploadBy }}</span>
        </template>
      </template>
      <template #categoryName="scope">
        <template v-if="scope.row.categoryName">
          <span>{{ scope.row.categoryCode }}-{{ scope.row.categoryName }}</span>
        </template>
      </template>
      <template #rfqName="scope">
        <template v-if="scope.row.rfqName">
          <span>{{ scope.row.id }}-{{ scope.row.rfqName }}</span>
        </template>
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
    <previewDialog v-model="previewDialog" :fileUrl="fileUrl" :fileName="fileName"/>
  </iCard>
</template>

<script>
import {iCard, iPagination, icon} from 'rise';
import tableList from '@/components/ws3/commonTable';
import {pageMixins} from '@/utils/pageMixins';
import resultMessageMixin from '@/utils/resultMessageMixin';
import previewDialog from './previewDialog';
import {tableTitle} from './data';
import {getRfqKmInfo} from '../../../../../api/partsrfq/pcaAndTiaAnalysis';

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard,
    tableList,
    iPagination,
    icon,
    previewDialog,
  },
  props: {
    pageType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tableListData: [],
      tiledTableListData: [],
      tableTitle,
      tableLoading: false,
      selectTableData: [],
      tableStatus: '',
      previewDialog: false,
      fileUrl: '',
      fileName: '',
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    handleSearch() {
      this.page.currPage = 1;
      this.getTableList();
    },
    async getTableList() {
      this.tableLoading = true;
      const searchItem = this.$parent.$children.filter(item => {
        return item.$attrs.name === 'theSearch';
      });
      const searchForm = searchItem[0].form;
      try {
        const req = {
          heavyItem: this.pageType,
          current: this.page.currPage,
          size: this.page.pageSize,
          ...searchForm,
        };
        const res = await getRfqKmInfo(req);
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
      }
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
        if (item.fileList) {
          item.fileList.map((itemChildren, indexChildren) => {
            itemChildren.treeIndex = `${index + 1}.${indexChildren + 1}`;
            this.tiledTableListData.push(itemChildren);
          });
        }
      });
    },
    handleOpenPreviewDialog(row) {
      this.previewDialog = true;
      this.fileUrl = row.filePath;
      this.fileName = row.fileName.split('.pdf')[0];
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

::v-deep .el-table__expand-icon {
  float: right !important;
  // line-height: 31px!important;
  // width: 10px!important;
}

::v-deep .el-tree .el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}

//有子节点 且未展开
::v-deep .el-table .el-icon-arrow-right:before {
  background: url('../../../../../assets/images/Icon - Arrow Drop Down.png') no-repeat 0 0;
  content: '';
  display: block;
  width: 10px;
  height: 4px;
  font-size: 10px;
  background-size: 10px;
}

//有子节点 且已展开
::v-deep .el-table .el-table__expand-icon--expanded {
  .el-icon-arrow-right:before {
    background: url('../../../../../assets/images/Icon - Arrow收起.png') no-repeat 0 0;
    content: '';
    display: block;
    width: 10px;
    height: 4px;
    font-size: 10px;
    background-size: 10px;
    transform: rotate(270deg);
  }
}
</style>
