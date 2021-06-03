<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="878" top="0" @close='clearDiolog' z-index="1000"
           v-loading="iDialogLoading" class="iDialogReject">
    <div slot="title" class="title">
      <div class="text">{{ $t(title) }}</div>
    </div>
    <div class="changeContent">
      <iInput
          type="textarea"
          placeholder="请输入拒绝原因"
          v-model="approvalComments">
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
  iButton, iMessage,
} from 'rise'
import {reject} from "@/api/ws2/budgetApproval";

export default {
  components: {
    iDialog,
    iInput,
    iButton,
  },
  props: {
    title: {type: String, default: '拒绝'},
    value: {type: Boolean},
    multipleSelection: {type: Array, default: () => []},
  },
  data() {
    return {
      approvalComments: ''
    }
  },
  mounted() {
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
    save(){
      // if(!this.approvalComments){
      //   iMessage.warn('请输入拒绝原因')
      //   return
      // }
      this.iDialogLoading = true
      reject({
        applyIds: this.multipleSelection.map(item => item.id),
        approvalComments: this.approvalComments
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          iMessage.success(result);
          this.$emit('input', false)
          this.$emit('refresh')
        } else {
          iMessage.error(result);
        }
        this.iDialogLoading = false
      }).catch(() => {
        this.iDialogLoading = false
      });
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.approvalComments = ''
      }
    },
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

