<template>
  <iDialog class="dialog" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">{{language('CHEHUIYUANYIN', '撤回原因')}}</div>
    </div>
    <div class="body">
      <iInput type="textarea" :rows="9" v-model="revokeReason" :placeholder="language('QINGSHURUCHEHUIYUANYIN','请输入撤回原因')" />
    </div>
    <div slot="footer" class="footer">
      <iButton
        @click="confirm()"
        :loading="loading">
        {{language('SAVE', '保存')}}
      </iButton>
      <iButton
        @click="close()">
        {{language('QUXIAO', '取消')}}
      </iButton>
    </div>
  </iDialog>
</template>

<script>
import {iDialog, iInput, iMessage, iButton } from 'rise'

export default {
  components: { iDialog, iButton, iInput},
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
  },
  watch: {
  },
  data() {
    return {
      revokeReason: '',
      loading: false
    }
  },
  methods: {
   close() {
     this.$emit('update:visible', false)
     this.loading = false
     this.revokeReason = ''
   },
   confirm() {
     if (!this.revokeReason) {
       iMessage.error(this.language('QINGSHURUCHEHUIYUANYIN','请输入撤回原因'))
       return
     }
     this.$emit('confirm', this.revokeReason)
   }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top;
    padding-bottom: $bottom;
  }
  .dialog-Header {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 40px;
  }

  ::v-deep .el-dialog {
    width: 870px!important;
    position: absolute;
    margin: 0!important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .body {
      height: 100%;
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