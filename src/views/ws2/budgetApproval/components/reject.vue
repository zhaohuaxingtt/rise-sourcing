<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="878" top="0" @close='clearDiolog' z-index="1000"
           class="iDialogReject">
    <div slot="title" class="title">
      <div class="text">{{ $t(title) }}<span>*</span></div>
    </div>
    <div class="changeContent">
      <iInput
          type="textarea"
          placeholder="请输入拒绝原因"
          v-model="rejectReason">
      </iInput>
    </div>
    <span slot="footer" class="dialog-footer">
      <iButton @click="save">{{ $t('LK_QUEREN') }}</iButton>
      <iButton @click="value = false">{{ $t('LK_QUXIAO') }}</iButton>
    </span>
  </iDialog>
</template>
<script>
import {
  iDialog,
  iInput,
  iButton,
} from 'rise'
import {pageMixins} from "@/utils/pageMixins";
import {tableHeight} from "@/utils/tableHeight";

export default {
  mixins: [pageMixins, tableHeight],
  components: {
    iDialog,
    iInput,
    iButton,
  },
  props: {
    title: {type: String, default: '拒绝'},
    value: {type: Boolean},
  },
  data() {
    return {}
  },
  mounted() {
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.rejectReason = ''
      }
    },
    save(){
      this.rejectReason = ''
    }
  }
}
</script>
<style lang='scss' scoped>
.iDialogReject {
  ::v-deep .el-dialog {
    height: 488px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.iDialogAdd.el-dialog__wrapper {
  overflow: hidden;
}

.title {
  position: relative;
  display: inline-block;

  .text {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;

    span {
      color: #FF0000;
    }
  }
}

.changeContent {
  margin-top: 18px;
  padding-bottom: 30px;

  .el-textarea {
    ::v-deep .el-textarea__inner {
      height: 274px;
    }
  }
}
</style>

