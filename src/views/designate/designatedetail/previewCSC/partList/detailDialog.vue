<template>
  <iDialog
    class="fileManageDialog"
    v-bind="$props"
    :visible.sync="visible"
    v-on="$listeners"
  >
    <template #title>
      <p class="title">Config Detail</p>
    </template>
    <div class="body">
      <tableList
        index
        lang
        height="100%"
        class="table"
        :selection="false"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
      >
      </tableList>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iMessage } from "rise";
import { latestVersionInfo } from "@/api/designate/designatedetail/decisionData/partlist";
import tableList from "@/components/iTableSort";
import { detailTableTitle as tableTitle } from "./data";

export default {
  components: { iDialog, tableList },
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Object,
      default: () => ({}),
      require: true,
    },
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
    };
  },
  watch: {
    visible(nv) {
      if (nv) {
        this.getData();
      } else {
        this.loading = false;
        this.tableListData = [];
        this.$emit("afterClose");
      }

      this.$emit("update:visible", nv);
    },
  },
  methods: {
    // 获取列表
    getData() {
      this.loading = true;
      latestVersionInfo(this.row.purchasingRequirementId)
        .then((res) => {
          if (res?.code == 200) {
            this.tableListData = res.data;
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style lang="scss" scoped>
.fileManageDialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top !important;
    padding-bottom: $bottom !important;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
    vertical-align: bottom;
  }

  ::v-deep .el-dialog__header {
    position: relative;
  }

  ::v-deep .el-dialog {
    width: 75% !important;
    position: absolute;
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .el-dialog__header {
      @include pdtb(25px, 25px);
      padding-left: 25px !important;
      padding-right: 25px !important;
    }

    .el-dialog__body {
      @include pdtb(0, 0);
      margin-bottom: 40px;
    }
  }

  .table {
    ::v-deep .el-table__body-wrapper {
      height: 580px !important;
    }
  }
}
</style>