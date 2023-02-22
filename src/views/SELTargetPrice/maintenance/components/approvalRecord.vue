<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 16:30:06
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-22 14:13:37
 * @Description: 审批记录弹窗
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\maintenance\components\approvalRecord.vue
-->
<template>
  <iDialog
    :title="language('SHENPIJILU', '审批记录')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="addPartsDialog"
  >
    <tableList
      :activeItems="'a1'"
      :selection="false"
      indexKey
      :tableData="tableData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      @handleSelectionChange="handleSelectionChange"
      @openPage="openPage"
    >
      <!-- 目标价·分摊 -->
      <template #shareTargetPrice="scope">
        <span>{{ scope.row.shareTargetPrice | thousandsFilter(2)}}</span>
      </template>
      <!-- 目标价·一次性 -->
      <template #targetPrice="scope">
        <span>{{ scope.row.targetPrice | thousandsFilter(2)}}</span>
      </template>
      <!-- 预计A价分摊 -->
      <template #estimateShareAPrice="scope">
        <span>{{ scope.row.estimateShareAPrice | thousandsFilter }}</span>
      </template>
    </tableList>
    <!------------------------------------------------------------------------>
    <!--                  表格分页                                          --->
    <!------------------------------------------------------------------------>
    <iPagination
      v-update
      @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
      class="padding-bottom20"
    />
  </iDialog>
</template>

<script>
import { iDialog, iPagination, iMessage } from "rise";
import tableList from "../../components/tableList";
import { pageMixins } from "@/utils/pageMixins";
import { approvalTableTitle } from "../data";
import { getSelTargetApprovalRecord } from "@/api/SELTargetPrice";
import filters from '@/utils/filters'
export default {
  mixins: [pageMixins, filters],
  components: { iDialog, tableList, iPagination },
  props: {
    dialogVisible: { type: Boolean, default: false },
    id: { type: String },
  },
  data() {
    return {
      tableData: [],
      tableTitle: approvalTableTitle,
      tableLoading: false,
      selectParts: [],
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.getTableList();
      }
    },
  },
  methods: {
    /**
     * @Description: 表格数据选中
     * @Author: Luoshuang
     * @param {*} val 选中的行
     * @return {*}
     */
    handleSelectionChange(val) {
      this.selectParts = val;
    },
    /**
     * @Description: 获取列表数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    getTableList() {
      if (!this.id) {
        return;
      }
      this.tableLoading = true;
      const params = {
        current: this.page.currPage,
        size: this.page.pageSize,
        taskId: this.id,
      };
      getSelTargetApprovalRecord(params)
        .then((res) => {
          if (res.result) {
            this.page = {
              ...this.page,
              totalCount: Number(res.total),
              currPage: Number(res.pageNum),
              pageSize: Number(res.pageSize),
            };
            this.tableData = res.data;
          } else {
            this.tableData = [];
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    clearDialog() {
      this.$emit("changeVisible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.addPartsDialog {
  .card {
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(112, 112, 112, 0.1);
    ::v-deep .cardBody {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
  // ::v-deep .el-dialog {
  //   margin-top: 30px !important;
  //   height: 90%;
  //   .el-dialog__body {
  //     height: calc(100% - 70px);
  //     overflow: auto;
  //   }
  // }
}
</style>