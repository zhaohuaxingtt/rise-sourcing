<template>
  <iDialog title="提示" :visible="visible" @close='clearDiolog' width="380px" z-index="1000" class="iDialog">
    
    <slot name="msg"></slot>

  </iDialog>
</template>

<script>
import {
  iDialog,
  iMessage,
  iButton,
} from 'rise'

export default {
  components: {
    iDialog,
  },

  props:  {
    visible: {type: Boolean, default: false},
  },
  
  methods: {
    clearDiolog(){
      this.$emit('changeLayer', false);
    }
  }
}
</script>

<style lang='scss' scoped>
.iDialog{
    display: flex;
    justify-content: center;
    align-items: center;

  .head-msg{
    font-size: 14px;
    margin-bottom: 20px;

    span{
      color: #1660F1;
    }
  }

  .iDialog-head{
    display: flex;
    justify-content: space-between;
    padding-right: 25px;

    div{
      font-size: 18px;
      font-weight: bold;
    }
  }

  ::v-deep .el-dialog__header{
    padding-top: 23px;
  }
  
  ::v-deep .el-dialog{
    height: 217px !important;
    overflow: auto;
    margin: 0;
  }
}
</style>