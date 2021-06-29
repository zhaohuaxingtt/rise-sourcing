<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-29 14:18:56
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="878px" @close='clearDiolog'>
    <div class="changeContent">
      <iFormGroup row="1" icon>
        <iFormItem label="" name="memo">
          <i-input type="textarea" :rows="10" resize="none" :placeholder="!disabled ? $t('LK_QINGSHURUBEIZHU') : ''" v-model="memo" :disabled="disabled"></i-input>
        </iFormItem>
      </iFormGroup>
    </div>
    <span slot="footer" class="dialog-footer">
      <iButton @click="submit" v-if="!disabled">{{ $t('LK_QUEREN') }}</iButton>
      <iButton @click="clearDiolog">{{$t('LK_QUXIAO')}}</iButton>
    </span>
  </iDialog>
</template>
<script>
import { iButton, iDialog, iFormGroup, iFormItem, iInput, iMessage } from '@/components'

export default {
  components: {
    iButton,
    iDialog,
    iFormGroup,
    iFormItem,
    iInput
  },
  props: {
    title: { type: String, default: 'LK_BEIZHU' },
    value: { type: Boolean },
    repeatClick: Boolean,
    memo: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {}
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
    submit() {
      if (this.memo == '' || this.memo == null) return iMessage.warn(this.$t('LK_BEIZHUBUNENGWEIKONG'))
      this.$emit('submit', this.memo)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>

