<template>
  <iDialog :title="$t('LK_APPLYBANUMBER')" :visible="visible" @close='clearDiolog' width="95%" z-index="1000" class="iDialog">
    <div slot="title">
      <div class="iDialog-head">
        <div>{{title}}</div>
        <slot name="btns">

        </slot>
      </div>
    </div>

    <slot name="content"></slot>

  </iDialog>
</template>

<script>
import {
  iDialog,
} from 'rise'
export default {
  props: {
    visible: {type: Boolean, default: false},
    title: {type: String, default: ''},
  },
  components: {
    iDialog,
  },

  methods: {

    clearDiolog(){
      this.$emit('changeLayer', false);
    },

    //  确认
    confirm(){
      this.$emit('confirm');
    }
  }
}
</script>

<style lang='scss' scoped>
.iDialog{
  display: flex;
  align-items: center;
  justify-content: center;

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
    height: 90% !important;
    overflow: auto;
    margin: 0 !important;
  }
}
</style>