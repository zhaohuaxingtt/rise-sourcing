<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-22 17:01:55
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-03-08 16:09:57
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\abPrice\components\partTableDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <iDialog
    class="dialog"
    v-bind="$props"
    width="80%"
    :visible.sync="visible"
    v-on="$listeners"
    :title="'Quotation Detail of ' + (row.partPrjCode || row.fsNum)"
  >
    <div class="body">
      <supplierTableListOne :key="row.partPrjCode || row.fsNum" class="content" :row="row" />
    </div>
  </iDialog>
</template>

<script>
import { iDialog } from "rise";
import supplierTableListOne from "./supplierTableListOne.vue";

export default {
  name: "partTableDetail",
  components: {
    supplierTableListOne,
    iDialog,
  },
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.dialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top;
    padding-bottom: $bottom;
  }
  ::v-deep .el-dialog {
    position: absolute;
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .body {
      height: 650px;
    }

    .el-dialog__header {
      @include pdtb(30px, 30px);
    }

    .el-dialog__body {
      @include pdtb(6px, 0);
    }
  }
}
.content {
  height: calc(100% - 40px);
}
</style>