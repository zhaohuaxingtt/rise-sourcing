<template>
  <iDialog
    class="dialog"
    v-bind="$props"
    width="80%"
    :visible.sync="visible"
    v-on="$listeners"
    :title="'Quotation Detail of ' + row.partPrjCode"
  >
    <div class="body">
      <supplierTableList :row="row" />
    </div>
  </iDialog>
</template>

<script>
import { iDialog } from "rise";
import supplierTableList from "./supplierTableList.vue";

export default {
  components: { supplierTableList, iDialog },
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
      height: 380px;
    }

    .el-dialog__header {
      @include pdtb(30px, 30px);
    }

    .el-dialog__body {
      @include pdtb(6px, 0);
    }
  }
}
</style>