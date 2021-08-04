<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="818px" top="0" @close='clearDiolog' class="iDialogCon">
    <div slot="title" class="title">
      <div class="text">
        {{ $t(title) }} <span style="font-size: 20px; color: #FF0000;">*</span>
      </div>
    </div>
    <div class="changeContent">
      <iInput
          type="textarea"
          :placeholder="language('LK_QINGSHURUTUIHUIYUANYIN', '请输入退回原因')"
          v-model="returnReason">
      </iInput>
    </div>
    <span slot="footer" class="dialog-footer">
      <iButton @click="save" :loading='saveLoading'>{{ language('LK_QUEREN', '确认') }}</iButton>
      <iButton @click="clearDiolog" :loading='saveLoading'>{{ language('LK_QUXIAO', '取消') }}</iButton>
    </span>
  </iDialog>
</template>
<script>
import {iDialog, iInput, iButton, iMessage} from 'rise'
import {pageMixins} from "@/utils/pageMixins";
import {bmSupplierBack} from "@/api/ws2/purchaseSupplier/investmentList";


export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iInput,
    iButton,
  },
  props: {
    title: {type: String, default: '退回'},
    id: {type: String, default: ''},
    value: {type: Boolean},
  },
  data() {
    return {
      returnReason: '',
      saveLoading: false,
    }
  },
  mounted() {
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
    save() {
      if(!this.returnReason){
        iMessage.success(this.language('LK_QINGSHURUTUIHUIYUANYIN', '请输入退回原因'));
        return
      }
      this.saveLoading = true
      bmSupplierBack({
        id: this.id,
        reason: this.returnReason,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          iMessage.success(result);
          this.$emit('input', false)
          this.$emit('sure')
        } else {
          iMessage.error(result);
        }
        this.saveLoading = false
      }).catch(() => {
        this.saveLoading = false
      });
    },
  },
  watch: {
    value(val){
      if(val){
        this.returnReason = ''
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.iDialogCon {
  ::v-deep .el-dialog {
    top: 50%;
    transform: translateY(-50%);
  }
}
.title {
  position: relative;
  display: inline-block;

  .text {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
    .icon {
      cursor: pointer;
    }
  }

  .star {
    position: absolute;
    right: -15px;
    top: 0;
    font-size: 30px;
    color: red;
  }
}

.changeContent {
  padding-bottom: 30px;
  font-size: 14px;
  p{
    color: #000000;
    margin-bottom: 6px;
  }
  ::v-deep .el-input{
    width: calc(100% - 20px);
  }
  ::v-deep .el-textarea__inner{
    height: 274px!important;
  }
  ::v-deep .card {
    box-shadow: none;
    border-radius: 0;
    background: none;

    .cardBody {
      margin-top: 0;
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }

    .iSearch-content {
      border-bottom: 1px solid #E3E3E3;
      padding-bottom: 20px;
    }
  }

  .add {
    float: right;
    margin-bottom: 10px;
  }
}
</style>

