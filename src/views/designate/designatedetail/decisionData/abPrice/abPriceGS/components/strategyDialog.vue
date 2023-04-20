<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-02-14 11:34:22
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-22 18:40:48
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\abPrice\components\editDialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <iDialog
    class="dialog"
    v-bind="$props"
    :visible.sync="visible"
    v-on="$listeners"
  >
    <template #title>
      <p class="title">Strategy</p>
    </template>
    <p class="content">{{value}}</p>
  </iDialog>
</template>

<script>
import { iInput, iDialog, iMessage, iButton } from "rise";
export default {
  components: { iInput, iDialog, iButton },
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    strategy: {
      type: String,
    },
  },
  data() {
    return {
      value: "",
    };
  },
  created() {
    this.value = _.clone(this.strategy);
  },
  methods: {
    cancel() {
      this.$emit("update:strategyVisible", false);
    },
    save() {
      this.$emit("updateData", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  ::v-deep td {
    padding-top: 4px;
    padding-bottom: 4px;
    .cell {
      padding: 0 4px;
    }
  }
}
.table {
  ::v-deep .el-table__header {
    tr {
      background-color: #364d6e;
    }
    tr:nth-child(even) {
      background-color: #364d6e;
    }
  }
}
</style>
<style lang="scss" scoped>
.dialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top !important;
    padding-bottom: $bottom !important;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    line-height: 25px;
    vertical-align: bottom;
  }
  .content{
    white-space: pre-wrap;
    font-size: 18px;
  }

  ::v-deep .el-dialog {
    width: 65% !important;
    min-width: 500px;
    position: absolute;
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0;
    overflow-x: hidden;

    .el-dialog__header {
      @include pdtb(25px, 25px);
      padding-left: 25px !important;
      padding-right: 25px !important;
      position: relative;
      .el-dialog__headerbtn {
        background: #364d6e;
      }
    }

    .el-dialog__body {
      @include pdtb(0, 0);
      padding-left: 25px !important;
      padding-right: 25px !important;
      margin-bottom: 40px;
    }
  }
}
</style>