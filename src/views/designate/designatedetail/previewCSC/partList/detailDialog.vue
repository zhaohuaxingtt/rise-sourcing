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
        :tableLoading="loading">
          <template #fileName="scope">
            <span class="link-underline" >{{ scope.row.fileName }}</span>
          </template>
      </tableList>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iMessage } from "rise"
// import tableList from "@/views/partsign/editordetail/components/tableList"
import tableList from "@/components/iTableSort";
import { detailTableTitle as tableTitle } from "./data"

export default {
  components: { iDialog, tableList },
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    nominateAppId: {
      type: String,
      require: true
    },
    row: {
      type: Object,
      default:()=>({}),
      require: true
    }
  },
  data() {
    return {
      loading: false,
      timer: 0,
      tableTitle,
      tableListData: [],
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: state => state.nomination.nominationDisabled,
      rsDisabled: state => state.nomination.rsDisabled,
    }),
    isDisabled() {
      return this.isPreview || this.nominationDisabled || this.rsDisabled
    },
  },
  watch: {
    visible(nv) {
      if (nv) {
        this.getData()
      } else {
        this.loading = false
        this.tableListData = []
        this.$emit("afterClose")
      }

      this.$emit("update:visible", nv)
    },
  },
  methods: {
    // 获取列表
    getData() {
      this.loading = true
        
        this.tableListData = []
        this.loading = false
    //   getData({
    //     nominateAppId: this.nominateAppId, // 定点申请id
    //     categoryCode: this.categoryCode // 材料组code
    //   })
    //   .then(res => {
    //     if (res.code == 200) {
    //       try {
    //         const data = JSON.parse(res.data.reportFiles)
    //         this.tableListData = Array.isArray(data.fileList) ? data.fileList : []
    //       } catch(e) {
    //         this.tableListData = []
    //       }
    //     } else {
    //       iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
    //     }
    //   })
    //   .finally(() => this.loading = false)
    },
  }
}
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
      @include pdtb(30px, 30px);
    }

    .el-dialog__body {
      @include pdtb(6px, 0);
      margin-bottom: 40px;
    }

    .pagination {
      margin-top: 0;
    }

    .el-dialog__footer {
      @include pdtb(28px, 28px);
    }
  }

  .table {
    ::v-deep .el-table__body-wrapper {
      height: 580px !important;
    }
  }
}
</style>