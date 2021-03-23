<template>
  <i-page>
    <div class="pageTitle flex-between-center-center">
      <div class="flex nav-box">
        <span>零件评分</span>
      </div>
      <div class="btnList">
        <iButton type="text">
          <icon symbol name="iconrizhiwuzi" class="log-icon"/>
          <span class="log-word">日志</span>
        </iButton>
        <span>
					<icon symbol name="icondatabaseweixuanzhong"></icon>
				</span>
      </div>
    </div>
    <iCard class="margin-top20">
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          :index="true"
          @openMultiHeaderPropsPage="openMultiHeaderPropsPage"
          multi-header-props="l"
          multi-header-props-text="查看"
          action-props=""
      ></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"
      />
    </iCard>
    <!------------------------------------------------------------------------>
    <!--                  备注弹框                                          --->
    <!------------------------------------------------------------------------>
    <tpb-remarks
        v-model="dialogRemarks"
    />
  </i-page>

</template>

<script>
import {iCard, iPagination, iPage, icon, iButton} from "@/components";
import tablelist from './supplierScoreTableList'
import {partScroingTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";

import tpbRemarks from './tpbRemarks'

export default {
  components: {
    iCard,
    iPage,
    iPagination,
    iButton,
    icon,
    tablelist,
    tpbRemarks
  },
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: partScroingTitle,
      tableLoading: false,
      selectTableData: [],
      dialogRemarks: false
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      this.tableLoading = true;

    },
    deleteItems() {
    },
    uploadAttachments() {

    },
    openMultiHeaderPropsPage() {
      this.dialogRemarks = true
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
  }
}
</script>

<style scoped lang="scss">
.pageTitle {
  .nav-box {
    > span {
      font-size: 20px;
      font-weight: bold;
    }

    .ml30 {
      margin-left: 30px;
    }
  }

  .btnList {
    > span {
      font-size: 20px;
      margin-left: 30px;
    }
  }
}
.log-icon{
  font-size: 20px;
}
.log-word{
  color: $color-blue;
  margin-left: 4px;
}
</style>