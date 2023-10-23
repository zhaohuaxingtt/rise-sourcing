<template>
  <iDialog 
    :title="$t('LK_APPLYBANUMBER')" 
    :visible.sync="visible" 
    @close='clearDiolog' width="95%" top="5vh" z-index="1000" class="iDialog"
    :destroy-on-close="true"
  >
    <div class="title-name">
      <iInput v-model="applyTitleName" @change="inputChange"></iInput>
    </div>
    <div slot="title">
      <div class="iDialog-head">
        <div>{{$t('LK_APPLYBANUMBER')}}</div>
        <iButton @click="confirm" :loading="buttonLoading">{{$t('LK_QUEREN')}}</iButton>
      </div>
    </div>

    <div class="head-msg">
      {{$t('LK_BADETAILSPOPUPTXT1')}}
      <slot name="nameArry"></slot>
      {{$t('LK_BADETAILSPOPUPTXT2')}}
    </div>

    <slot name="table"></slot>

    <slot name="historyTable"></slot>
  </iDialog>
</template>

<script>
import {
  iDialog,
  iMessage,
  iButton,iInput
} from 'rise'

export default {
  props: {
    visible: {type: Boolean, default: false},
    // applyTitleName:{
    //   type:String,
    //   default:"",
    // }
  },
  components: {
    iDialog,
    iButton,iInput
  },

  data(){
    return {
      buttonLoading: false,
      applyTitleName:"",
    }
  },

  methods: {
    clearDiolog(){
      this.buttonLoading = false;
      this.$emit('changeLayer', false);
    },

    //  确认
    confirm(){
      this.buttonLoading = true;
      this.$emit('confirm',this.applyTitleName);
    }
  }
}
</script>

<style lang='scss' scoped>

.title-name{
  position: absolute;
  top: 20px;
  left: 140px;
  font-size: 15px;
  width:450px;
}

.iDialog{

  .head-msg{
    font-size: 14px;
    margin-bottom: 20px;

    span{
      color: #67C23A;
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
    height: 90%;
    overflow: auto;
  }
}
</style>