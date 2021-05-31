<!--
 * @Author: your name
 * @Date: 2021-05-24 13:45:08
 * @LastEditTime: 2021-05-29 17:56:59
 * @LastEditors: ldh
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
      <p class="title">{{ $t("nominationSuggestion.MoJuYuSuanGuanLi") }}</p>
      <div class="control" id="control">
        <iButton :loading="submitLoading" @click="handleSubmit">{{ $t("nominationSuggestion.TiJiao") }}</iButton>
        <iButton :loading="recallLoading" @click="handleRecall">{{ $t("nominationSuggestion.CheHui") }}</iButton>
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
        <template #partNum="scope">
          <span class="link" @click="jump(scope.row)">{{ scope.row.partNum }}</span>
        </template>
        <template #applyTime="scope">
          <span>{{ scope.row.applyTime | dateFilter("YYYY-MM-DD") }}</span>
        </template>
        <template #budget="scope">
          <iInput class="input-center" v-model="scope.row.budget" @input="handleInputByBudget($event, scope.row)" />
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
import { getMouldBudget, patchMouldBudget } from "@/api/designate"

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
        this.getMouldBudget()
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
      tableListData: [],
      multipleSelection: [],
      submitLoading: false,
      recallLoading: false
    };
  },
  methods: {
    // 获取列表
    getMouldBudget() {
      this.loading = true

      this.multipleSelection = [
        { rfqId: "50002000" },
        { rfqId: "50002001" },
      ]

      getMouldBudget({
        currPage: this.page.currPage,
        pageSize: this.page.pageSize,
        rfqIds: this.multipleSelection.map(item => item.rfqId).join('&rfqIds=')
      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data.records) ? res.data.records : []
          this.page.totalCount = res.data.total || 0
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
    handleInputByBudget(val, row) {
      this.$set(row, "budget", numberProcessor(val, 4))
    },
    // 提交
    handleSubmit() {
      if (this.multipleSelection.length < 1) {
        return iMessage.warn(this.$t("nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu"))
      }

      this.submitLoading = true
      patchMouldBudget({
        updateType: 1,
        mouldBudgetDTOS: this.multipleSelection
      })
      .then(res => {
        if (res.code == 200) {
          if (!res.data.length) {
            iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            this.getMouldBudget()
          } else {
            if (this.multipleSelection.length === res.data.length) {
              iMessage.warn(`${ this.$t("nominationSuggestion.RfqBianHao") }: ${ res.data.join(", ") } ${ this.$t("nominationSuggestion.ChongFuTiJiao") }`)
            } else {
              iMessage.warn(`${ this.$t("nominationSuggestion.RfqBianHao") }: ${ res.data.join(", ") } ${ this.$t("nominationSuggestion.ChongFuTiJiao") }, ${ this.$t("nominationSuggestion.QiYuShuJuZhengChangTiJiao") }`)
              this.getMouldBudget()
            }
          }

          this.$emit("submit", this.multipleSelection.filter(item => !res.data.includes(item)))
          this.submitLoading = false
          // this.$emit("update:visible", false)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => this.submitLoading = false)
    },
    // 撤回
    handleRecall() {
      if (this.multipleSelection.length < 1) {
        return iMessage.warn(this.$t("nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu"))
      }

      this.recallLoading = true
      patchMouldBudget({
        updateType: 0,
        mouldBudgetDTOS: this.multipleSelection
      })
      .then(res => {
        if (res.code == 200) {
          if (!res.data.length) {
            iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            this.getMouldBudget()
          } else {
            if (this.multipleSelection.length === res.data.length) {
              iMessage.warn(`${ this.$t("nominationSuggestion.RfqBianHao") }: ${ res.data.join(", ") } ${ this.$t("nominationSuggestion.ChongFuCheHui") }`)
            } else {
              iMessage.warn(`${ this.$t("nominationSuggestion.RfqBianHao") }: ${ res.data.join(", ") } ${ this.$t("nominationSuggestion.ChongFuCheHui") }, ${ this.$t("nominationSuggestion.QiYuShuJuZhengChangCheHui") }`)
              this.getMouldBudget()
            }
          }

          this.$emit("recall", this.multipleSelection.filter(item => !res.data.includes(item)))
          this.recallLoading = false
          // this.$emit("update:visible", false)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => this.recallLoading = false)
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