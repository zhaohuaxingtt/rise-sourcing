<!--
 * @Author: moxuan
 * @Date: 2021-03-16 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="400px" @close='clearDiolog'>
    <div slot="title" class="title">
      <div class="text">{{$t(title)}}</div>
      <div class="star" v-if="!disabled">*</div>
    </div>
    <div class="changeContent">
      <iFormGroup row="1" icon>
        <iFormItem label="" name="memo">
          <i-input type="textarea" :rows="8" resize="none" :placeholder="!disabled ? language('LK_QINGSHURUBEIZHU','请输入备注') : ''" v-model="memo" :disabled="disabled"></i-input>
        </iFormItem>
      </iFormGroup>
    </div>
    <span slot="footer" class="dialog-footer">
       <iButton @click="submit" v-if="!disabled">{{ language('LK_QUEREN','确认') }}</iButton>
       <iButton @click="clearDiolog">{{language('LK_QUXIAO','取 消')}}</iButton>
    </span>
  </iDialog>
</template>
<script>
import {iButton, iDialog, iFormGroup, iFormItem, iInput, iMessage} from 'rise'

export default {
  components: {
    iButton,
    iDialog,
    iFormGroup,
    iFormItem,
    iInput
  },
  props: {
    title: {type: String, default: 'LK_BEIZHU'},
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
      if(this.memo == '' || this.memo == null) return iMessage.warn(this.language('LK_BEIZHUBUNENGWEIKONG','抱歉，备注不能为空！'))
      this.$emit('submit', this.memo)
    }
  }
}
</script>
<style lang='scss' scoped>
.title{
  position: relative;
  display: inline-block;
  .text{
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
  }
  .star{
    position: absolute;
    right: -15px;
    top: 0;
    font-size: 30px;
    color: red;
  }
}

.changeContent {
  padding: 0 10px 20px 10px;
}
</style>

