<template>
  <iDialog :title="$t('LK_APPLYBANUMBER')" :visible="visible" @close='clearDiolog' width="95%" top="5vh" z-index="1000" class="iDialog">
    <div slot="title">
      <div class="iDialog-head">
        <div>{{title}}</div>
        <slot name="btns">

        </slot>
        <!-- <iButton @click="confirm">确认</iButton> -->
      </div>
    </div>

    <slot name="table"></slot>

  </iDialog>
</template>

<script>
import {
  iDialog,
  iMessage,
  iButton,
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
  }
}
</style>