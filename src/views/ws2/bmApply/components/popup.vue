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

    <div class="iDialog-bottomTxt">
      <UnitExplain />
    </div>
    
  </iDialog>
</template>

<script>
import UnitExplain from "./unitExplain";
import {
  iDialog,
} from 'rise'
export default {
  props: {
    visible: {type: Boolean, default: false},
    title: {type: String, default: ''},
  },
  components: {
    iDialog, UnitExplain
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

  .btns-txt{

  }

  .iDialog-bottomTxt{
    position: absolute;
    bottom: 1.875rem;
    display: flex;
    justify-content: flex-end;
    right: 0;
  }

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

  ::v-deep .el-dialog__body{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding-bottom: 30px !important;
    padding-top: 76px !important;
    overflow-y: auto;
  }

  ::v-deep .el-dialog__header{
    padding-top: 23px;
    position: relative;
    z-index: 999;
  }
  
  ::v-deep .el-dialog{
    height: 90% !important;
    overflow: auto;
    margin: 0 !important;
  }
}
</style>