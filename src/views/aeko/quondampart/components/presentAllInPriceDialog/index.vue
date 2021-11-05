<!--
 * @Author: your name
 * @Date: 2021-07-27 13:59:01
 * @LastEditTime: 2021-08-13 03:10:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aeko\quondampart\components\presentAllInPriceDialog\index.vue
-->
<template>
  <iDialog
    class="presentAllInPriceDialog"
    v-bind="$props"
    :visible.sync="status"
    v-on="$listeners"
  >
    <template #title>
      <p class="title">{{ language("DANGQIANAJIA", "当前A价") }}</p>
      <div class="control" id="control">
        <iButton @click="handleConfirm" v-permission="AEKO_QUONDAMPARTLEDGER_PRESENTALLINPRICEDIALOG_BUTTON_CONFIRM">{{ language("QUEREN", "确认") }}</iButton>
      </div>
    </template>
    <div class="body">
      <tableList
        index
        ref="table"
        height="100%"
        class="table"
        lang
        singleSelect
        v-permission="AEKO_QUONDAMPARTLEDGER_PRESENTALLINPRICEDIALOG_TABLE"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSingleSelectChange="handleSingleSelectChange">
      </tableList>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { presentAllInPriceDialogTableTitle as tableTitle } from "../data"
import filters from "@/utils/filters"
import { getAekoOriginPartAPrice } from "@/api/aeko/detail"
import { orderBy } from "lodash"

export default {
  components: { iDialog, iButton, tableList },
  mixins: [ filters ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    apriceId: {
      type: String || Number,
      require: true,
      default: ""
    }
  },
  watch: {
    status(nv) {
      if (nv) {
        this.getAekoOriginPartAPrice()
      } else {
        this.selectRow = null
        this.tableListData = []
      }
    },
  },
  computed: {
    status: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit("update:visible", value)
      }
    }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      selectRow: null
    };
  },
  methods: {
    // 获取列表
    getAekoOriginPartAPrice() {
      this.loading = true

      getAekoOriginPartAPrice({
        apriceId: this.apriceId
      })
      .then(res => {
        if (res.code == 200) {
          this.selectRow = {}
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.tableListData.forEach(item => {
            item.startDateTimestamp = +moment(item.startDate)
            item.endDateTimestamp = +moment(item.endDate)
          })
          
          this.tableListData = orderBy(this.tableListData, ["startDate", "endDate"], ["desc", "desc"])

          if (this.tableListData.length > 0) {
            this.$nextTick(() => {
              this.$refs.table.$refs.table.toggleRowSelection(this.tableListData[0], true)
              this.selectRow = this.tableListData[0]
            })
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleSingleSelectChange(row) {
      this.selectRow = row
    },
    // 确认
    handleConfirm() {
      if (!this.selectRow) return iMessage.warn(this.language("QINGXUANZEYIGEAJIASHUJU", "请选择一个A价数据"))

      this.$emit("confirm", this.selectRow)
      this.status = false
    },
  }
};
</script>

<style lang="scss" scoped>
.presentAllInPriceDialog {
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