<template>
  <iDialog 
    :title="language('LK_ZHAOPIANCHAKAN', '照片查看')" 
    :visible.sync="visible" 
    @close='clearDiolog' width="50%" top="5vh" z-index="1000" class="iDialog"
    :destroy-on-close="true"
  >
    <!-- <div slot="title">
      <div class="iDialog-head">
        <div>{{$t('LK_APPLYBANUMBER')}}</div>
        <iButton @click="confirm" :loading="buttonLoading">{{$t('LK_QUEREN')}}</iButton>
      </div>
    </div> -->
    <div class="content">
      <icon @click.native="turnPages('-')" symbol name="iconzhaopianchakanzuo" class="card-icon"></icon>
      <img class="img" :src="imgList[index]" alt="">
      <icon @click.native="turnPages('+')" symbol name="iconzhaopianchakanyou" class="card-icon"></icon>
    </div>

  </iDialog>
</template>

<script>
import {
  iDialog,
  iMessage,
  iButton,
} from 'rise'
import {
  icon,
} from "@/components";
export default {
  props: {
    visible: {type: Boolean, default: false},
    imgList: {type: Array, default: () => []},
  },

  components: {
    iDialog,
    icon
  },

  data(){
    return{
      index: 0,
    }
  },

  methods: {

    turnPages(type){
      const masIndex = this.$props.imgList.length - 1;
      let index = this.index;
      if(type === '-'){
        this.index = this.index === 0 ? masIndex : index - 1;
      }
      if(type === '+'){
        this.index = this.index === masIndex ? 0 : index + 1;
      }
    },

    clearDiolog(){
      this.$emit('changeLayer', false);
    },
  }
}
</script>

<style lang='scss' scoped>
.iDialog{
  display: flex;
  align-items: center;

  .content{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .img{
      width: 76%;
      max-height: 90%;
    }

    .card-icon{
      width: 38px;
      height: 38px;
      cursor: pointer;
    }
  }

  ::v-deep .el-dialog__header{
    padding-top: 23px;
    position: relative;
    z-index: 333;
  }

  ::v-deep .el-dialog__body{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    padding-top: 64px !important;
  }
  
  ::v-deep .el-dialog{
    height: 60%;
    overflow: auto;
  }
}
</style>