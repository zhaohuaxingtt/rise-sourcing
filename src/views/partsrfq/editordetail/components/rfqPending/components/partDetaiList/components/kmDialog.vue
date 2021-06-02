<!--
 * @Author: ldh
 * @Date: 2021-05-29 16:29:00
 * @LastEditTime: 2021-06-02 19:30:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqPending\components\partDetaiList\components\kmDialog.vue
-->
<template>
  <iDialog
    class="kmDialog"
    v-bind="$props"
    :visible.sync="visible"
    v-on="$listeners"
  >
    <template #title>
      <p class="title"></p>
      <div class="control" id="control">
        <iButton :loading="sendLoading" @click="handleSend">{{ $t("partsprocure.FaSong") }}</iButton>
        <iButton :loading="recallLoading" @click="handleRecall">{{ $t("partsprocure.CheHui") }}</iButton>
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
        @handleSelectionChange="handleSelectionChange">
        <template #sendKmFlag="scope">
          <span>{{ scope.row.sendKmFlag | sendKmFlagFilter }}</span>
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
import { iDialog, iButton, iPagination, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { kmDialogTableTitle as tableTitle } from "../data"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"
import { getPartsBySupplier, sendKm, cancelKm } from "@/api/partsrfq/editordetail"

export default {
  components: { iDialog, iButton, iPagination, tableList },
  mixins: [ filters, pageMixins ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    rfqId: {
      type: String,
      require: true
    },
    parts: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    visible(nv) {
      if (nv) { 
        // 请求
        this.getPartsBySupplier()
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
  filters: {
    sendKmFlagFilter(value) {
      const obj = {
        "0": "未发送",
        "1": "已发送"
      }
    }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      sendLoading: false,
      recallLoading: false
    };
  },
  methods: {
    // 获取列表
    getPartsBySupplier() {
      if (!this.parts.length) return

      this.loading = true

      getPartsBySupplier({
        current: this.page.currPage,
        size: this.page.pageSize,
        rfqId: this.rfqId,
        partFsInfos: this.parts.map(part => ({
          fs: part.fsnrGsnrNum,
          partNum: part.partNum
        }))
      })
      .then(res => {
        if (res.code == 200) {
          this.multipleSelection = []
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
    // 提交
    handleSend() {
      if (this.multipleSelection.length < 1) return iMessage.warn(this.$t("nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu"))
      if (this.multipleSelection.some(item => item.sendKmFlag == 1)) return iMessage.warn(this.$t("nominationSuggestion.QingWuXuanZeYiFaSongDeShuJu"))

      this.sendLoading = true
      sendKm(this.multipleSelection.map(item => ({
        fsNum: item.fsnrGsnrNum,
        quotationId: item.quotationId,
        rfqId: this.rfqId,
        round: item.round,
        supplierId: item.supplierId
      })))
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          this.$emit("send", this.multipleSelection)
          this.getPartsBySupplier()
          // this.$emit("update:visible", false)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.sendLoading = false
      })
      .catch(() => this.sendLoading = false)
    },
    // 撤回
    handleRecall() {
      if (this.multipleSelection.length < 1) return iMessage.warn(this.$t("nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu"))
      if (this.multipleSelection.some(item => item.sendKmFlag == 0)) return iMessage.warn(this.$t("nominationSuggestion.QingWuXuanZeWeiFaSongDeShuJu"))

      this.recallLoading = true
      cancelKm({
        idList: this.multipleSelection.map(item => item.recordId)
      })
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          this.$emit("recall", this.multipleSelection)
          this.getPartsBySupplier()
          // this.$emit("update:visible", false)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.recallLoading = false
      })
      .catch(() => this.recallLoading = false)
    }
  }
};
</script>

<style lang="scss" scoped>
.kmDialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top !important;
    padding-bottom: $bottom !important;
  }

  .title {
    height: 25px;
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