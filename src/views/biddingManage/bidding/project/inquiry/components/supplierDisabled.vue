<template>
  <!--转派-->
  <iDialog
    :title="language('BIDDING_XJFSSB', '询价发送失败')"
    :visible.sync="show"
    append-to-body="true"
    top="20vh"
    @close="clearDiolog"
    :close-on-click-modal="false"
  >
    <div class="card">
      <div class="card__body">
        <div class="spuplierContent">{{language('BIDDING_YXGYSXJSKWFFSXJQQXXZ', '以下供应商询价受控，无法发送询价，请取消选择！')}}</div>
        <iTableCustom
          ref="multipleTable"
          :loading="tableLoading"
          :data="tableListData"
          :columns="supplierDisabledColumns"
          @handle-selection-change="handleSelectionChange"
        >
        </iTableCustom>
        <!-- <iPagination
          v-update
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :prev-text="language('BIDDING_SHANGYIYE','上一页')"
          :next-text="language('BIDDING_XIAYIYE','下一页')"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="tableListData.length"
        /> -->
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iPagination } from "rise";
import iTableCustom from "@/components/biddingComponents/iTableCustom";
import { pageMixins } from "@/utils/pageMixins";
import { supplierDisabledColumns } from "./data";
export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    // iPagination,
    iTableCustom,
  },
  props: {
    show: { type: Boolean, default: false },
    tableListData: {
      type: Array,
      default:() => {
        return []
      }
    }
  },
  watch: {
  },
  computed: {
    // suppliersPage() {
    //   const { tableListData } = this;
    //   const { currPage, pageSize } = this.page;
    //   return tableListData?.slice((currPage - 1) * pageSize, pageSize * currPage);
    // },
  },
  data() {
    return {
      typeObject: {},
      supplierDisabledColumns,
      selectedTableData: [],
      tableLoading: false,
    };
  },
  mounted() {

  },
  methods: {
    handleSearch() {
      this.query();
    },
    handleReset() {
      this.$refs["ruleForm"].resetFields();
      this.query();
    },
    clearDiolog() {
      this.$emit("update-show");
    },
    handleSizeChange(val) {
      this.page.currPage = 1;
      this.page.pageSize = val;
    },
    handleCurrentChange(e) {
      this.page.currPage = e;
    },
  },
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">
::v-deep .el-table {
  margin-bottom: 20px;
}
.card {
  padding-bottom: 20px;
  min-height: 278px;
  color: $color-black;

  .card__header {
    display: flex;
    justify-content: space-between;
    .card__header__item {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .card__body {
    margin-top: 10px;
    height: auto;
    overflow: hidden;
    min-height: 278px;
    .spuplierContent {
      padding-bottom: 2.5rem;
    }
    .tab_top {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 30px;
    }
  }
}
::v-deep .el-divider--horizontal {
  height: 1px;
}
::v-deep .el-button--default {
  min-width: 130px;
}
::v-deep .has-gutter tr {
  background-color: #eaf1fd;
}
::v-deep .el-table th {
  background-color: #eaf1fd;
}
</style>
