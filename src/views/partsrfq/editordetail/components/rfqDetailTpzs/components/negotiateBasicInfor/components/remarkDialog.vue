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
          <i-input type="textarea" :rows="10" resize="none" :placeholder="$t('LK_QINGSHURUBEIZHU')" v-model="remark"></i-input>
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
import { iButton, iDialog, iFormGroup, iFormItem, iInput, iMessage } from 'rise'
import { modifyRfqToRemark } from "@/api/partsrfq/negotiateBasicInfor/negotiateBasicInfor.js";
import resultMessageMixin from '@/utils/resultMessageMixin.js';

export default {
  mixins: [resultMessageMixin],
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
    remark: { type: String, default: '' }
  },
  watch: {
    remark(data) {
      this.remark = data
    }
  },
  data() {
    return {
      remark: ''
    }
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
    getRemark() {

    },
    async submit() {
      const pms = {
        remark: this.remark,
        rfqCode: this.$route.query.id
      }
      const res = await modifyRfqToRemark(pms)
      this.resultMessage(res, () => {
        this.clearDiolog()
        this.$emit('getRemark')
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>

