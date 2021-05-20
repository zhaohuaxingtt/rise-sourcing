<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="420px" top="0" @close='clearDiolog' class="iDialogCon">
    <div slot="title" class="title">
      <div class="text">{{ $t(title) }}</div>

    </div>
    <p class="newVersion">请注意！车型一旦关联后便无法修改！请确认所选车型准确性。</p>
    <span slot="footer" class="dialog-footer">
<!--      <iButton @click="save" :loading='saveLoading'>{{ $t('LK_QUEREN') }}</iButton>-->
      <iButton @click="save" :loading='saveLoading'>确认关联</iButton>
    </span>
  </iDialog>
</template>
<script>
import {iDialog, iSearch, iInput, iButton, icon, iMessage} from 'rise'
import {Popover} from "element-ui"
import {pageMixins} from "@/utils/pageMixins";
import {relationMainCarType} from "@/api/ws2/budgetManagement/investmentList";

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iSearch,
    iInput,
    iButton,
    Popover,
    icon,
  },
  props: {
    title: {type: String, default: '关联车型提示'},
    value: {type: Boolean},
    associatedCarlineParams: {type: Object, default: () => {}}
  },
  data() {
    return {
      conversionVal: ''
    }
  },
  mounted() {
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
      this.$emit('notConfirm')
    },
    save() {
      this.saveLoading = true
      relationMainCarType(this.associatedCarlineParams).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.$emit('input', false)
          this.$emit('confirm')
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.saveLoading = false
      }).catch(() => {
        this.saveLoading = false
      });
    },
  },
  watch: {}
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

</style>

