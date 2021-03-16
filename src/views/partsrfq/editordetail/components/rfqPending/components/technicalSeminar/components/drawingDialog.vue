<!--
 * @Author: moxuan
 * @Date: 2021-03-16 17:24:15
-->
<template>
  <iDialog :title="title" :visible.sync="value" width="878px" @close='clearDiolog'>
    <div class="changeContent">
     图纸
    </div>
    <span slot="footer" class="dialog-footer">
       <iButton @click="clearDiolog">取消</iButton>
    </span>
  </iDialog>
</template>
<script>
import {iButton, iDialog} from '@/components'

export default {
  components: {
    iButton,
    iDialog,
  },
  props: {
    title: {type: String, default: '图纸'},
    value: {type: Boolean},
    repeatClick: Boolean
  },
  data() {
    return {}
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang='scss' scoped>
.changeContent {
  padding: 0 10px 20px 10px;
}
</style>

