<!--
 * @Author: your name
 * @Date: 2021-05-24 13:45:08
 * @LastEditTime: 2021-05-24 15:30:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\designate\suggestion\components\mouldBudgetManagementDialog.vue
-->
<template>
  <iDialog
    class="mouldBudgetManagementDialog"
    v-bind="$props"
    :visible.sync="visible"
    v-on="$listeners"
  >
    <template #title>
      <p class="title">{{ $t("nominationSuggestion.Mujuyusuanguanli") }}</p>
      <div class="control" id="control">
        <iButton @click="handleSubmit">{{ $t("nominationSuggestion.Tijiao") }}</iButton>
        <iButton @click="handleRecall">{{ $t("nominationSuggestion.Chehui") }}</iButton>
      </div>
    </template>
    <div class="body">
      <tableList
        index
        height="100%"
        v-show="visible"
        class="table"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #c="scope">
          <span class="link" @click="jump(scope.row)">{{ scope.row.c }}</span>
        </template>
        <template #d="scope">
          <span>{{ scope.row.d | dateFilter("YYYY-MM-DD") }}</span>
        </template>
        <template #f="scope">
          <iInput class="input-center" v-model="scope.row.f" @input="handleInputByF($event, scope.row)" />
        </template>
      </tableList>
    </div>
    <template #footer class="footer">
      <iPagination v-update
        class="pagination"
        @size-change="handleSizeChange($event, getList)"
        @current-change="handleCurrentChange($event, getList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </template>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput, iPagination, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { mouldBudgetManagementDialogTableTitle as tableTitle } from "./data"
import filters from "@/utils/filters"
import { numberProcessor } from "@/utils"
import { pageMixins } from "@/utils/pageMixins"

export default {
  components: { iDialog, iButton, iInput, iPagination, tableList },
  mixins: [ filters, pageMixins ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    visible(nv) {
      if (nv) { 
        // 请求 
      }

      this.$emit("update:visible", nv)
    },
  },
  computed: {
    // eslint-disable-next-line no-undef
    // ...Vuex.mapState({
    //   userInfo: state => state.permission.userInfo,
    // }),
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [
        { c: "51142061" }
      ],
      multipleSelection: []
    };
  },
  methods: {
    // 获取列表
    getList() {
      this.loading = true

      const getList = function() {}
      getList({
      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    // 跳转rfq
    jump(row) {},
    // 投资预算
    handleInputByF(val, row) {
      console.log(val)
      this.$set(row, "f", numberProcessor(val, 4))
    },
    // 提交
    handleSubmit() {
      if (this.multipleSelection.length < 1) {
        return iMessage.warn(this.$t("nominationSuggestion.Qingxuanzezhishaoyitiaoshuju"))
      }

      this.$emit("submit", this.multipleSelection)
      this.$emit("update:visible", false)
    },
    // 撤回
    handleRecall() {
      if (this.multipleSelection.length < 1) {
        return iMessage.warn(this.$t("nominationSuggestion.Qingxuanzezhishaoyitiaoshuju"))
      }

      this.$emit("recall", this.multipleSelection)
      this.$emit("update:visible", false)
    }
  }
};
</script>

<style lang="scss" scoped>
.mouldBudgetManagementDialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top !important;
    padding-bottom: $bottom !important;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
  }

  ::v-deep .el-dialog__header {
    position: relative;
  }

  .control {
    position: absolute;
    top: 50%;
    right: 94px;
    transform: translate(0, -50%);
  }

  ::v-deep .el-dialog {
    width: 1745px !important;
    position: absolute;
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .body {
      height: 580px;
    }

    .el-dialog__header {
      @include pdtb(30px, 30px);
    }

    .el-dialog__body {
      @include pdtb(6px, 0);
    }

    .pagination {
      margin-top: 0;
    }

    .el-dialog__footer {
      @include pdtb(28px, 28px);
    }
  }
}
</style>