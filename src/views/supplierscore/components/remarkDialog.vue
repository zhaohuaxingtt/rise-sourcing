<!--
 * @Author: your name
 * @Date: 2021-06-29 11:07:48
 * @LastEditTime: 2021-06-29 17:30:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\remarkDialog.vue
-->
<template>
  <iDialog
    class="remarkDialog"
    v-bind="$props"
    v-on="$listeners"
    :visible.sync="status"
    :title="language('BEIZHU', '备注')"
    :close-on-click-modal="false">
    <div class="body">
      <iInput type="textarea" v-model="remark" resize="none" :disabled="disabled" :placeholder="language('BEIZHU', '备注')" />
    </div>
    <template #footer class="footer" v-if="!disabled">
      <iButton :loading="confirmLoading" @click="handleConfirm">{{ language("QUEREN", "确认") }}</iButton>
      <iButton @click="handleCancel">{{ language("QUXIAO", "取消") }}</iButton>
    </template>
  </iDialog>
</template>

<script>
import { iDialog, iInput, iButton } from "rise"

export default {
  components: { iDialog, iInput, iButton },
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: String || Number,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    status(nv) {
      if (nv) {
        this.remark = this.data
      } else {
        this.remark = ""
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
      remark: "",
      confirmLoading: false
    }
  },
  methods: {
    // 确认
    handleConfirm() {
      this.$emit("confirm", this.remark)
      // this.status = false
    },
    // 取消
    handleCancel() {
      this.$emit("cancel")
      this.status = false
    },
    // 更新loading
    updateConfirmLoading(status = false) {
      this.confirmLoading = status
    }
  }
};
</script>

<style lang="scss" scoped>
.remarkDialog {
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

  ::v-deep .el-dialog {
    width: 878px !important;
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
      @include pdtb(6px, 28px);
    }

    .pagination {
      margin-top: 0;
    }

    .el-dialog__footer {
      @include pdtb(0, 28px);
    }

    .el-textarea__inner {
      height: 274px!important;
      min-height: 274px!important;
    }
  }
}
</style>