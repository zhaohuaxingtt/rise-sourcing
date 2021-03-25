<!--
 * @Author: moxuan
 * @Date: 2021-03-16 17:24:15
-->
<template>
  <iDialog :title="title" :visible.sync="value" width="400px" @close='clearDiolog'>
    <div class="changeContent">
      <iFormGroup row="1" icon>
        <iFormItem label="" name="memo">
          <i-input type="textarea" :rows="8" resize="none" placeholder="请输入备注" v-model="memo" :disabled="disabled"></i-input>
        </iFormItem>
      </iFormGroup>
    </div>
    <span slot="footer" class="dialog-footer">
       <iButton @click="submit" v-if="!disabled">确认</iButton>
       <iButton @click="clearDiolog">取消</iButton>
    </span>
  </iDialog>
</template>
<script>
import {iButton, iDialog, iFormGroup, iFormItem, iInput, iMessage} from '@/components'

export default {
  components: {
    iButton,
    iDialog,
    iFormGroup,
    iFormItem,
    iInput
  },
  props: {
    title: {type: String, default: '备注'},
    value: {type: Boolean},
    repeatClick: Boolean,
    memo: {type: String, default: ''},
    disabled: {type: Boolean, default: false}
  },
  data() {
    return {}
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },
    submit() {
      if(this.memo == '') return iMessage.warn('抱歉，备注不能为空！')
      this.$emit('submit', this.memo)
    }
  }
}
</script>
<style lang='scss' scoped>
.changeContent {
  padding: 0 10px 20px 10px;
}
</style>

