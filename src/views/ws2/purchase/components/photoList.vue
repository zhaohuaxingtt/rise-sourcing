<template>
  <div v-if="visible">
    <iDialog 
      :title="language('LK_ZHAOPIANCHAKAN', '照片查看')" 
      :visible.sync="visible" 
      @close='clearDiolog' width="50%" top="5vh" z-index="1000" class="iDialog"
      :destroy-on-close="true"
    >
      <div class="content">
        <div class="card-div">
          <icon v-show="isSwitch" @click.native="turnPages('-')" symbol name="iconzhaopianchakanzuo" class="card-icon"></icon>
        </div>
        <img class="img" :src="imgList[index]" alt="">
        <div class="card-div">
          <icon v-show="isSwitch" @click.native="turnPages('+')" symbol name="iconzhaopianchakanyou" class="card-icon"></icon>
        </div>
      </div>

    </iDialog>
  </div>
  
</template>

<script>
import {
  iDialog,
  iMessage,
  iButton,
  icon
} from 'rise'
export default {
  props: {
    visible: {type: Boolean, default: false},
    imgList: {type: Array, default: () => []},
  },

  watch: {
    imgList(){
      this.index = 0;
      this.isSwitch = this.imgList.length !== 0;
      console.log('this.imgListthis.imgList', this.imgList, this.isSwitch, icon);
    }
  },

  components: {
    iDialog,
    icon
  },

  data(){
    return{
      index: 0,
      isSwitch: false,
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

    .card-div{
      width: 38px;

      .card-icon{
        width: 38px;
        height: 38px;
        cursor: pointer;
      }
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