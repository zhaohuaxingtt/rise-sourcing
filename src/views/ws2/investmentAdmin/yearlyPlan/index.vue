<template>
  <div class="container">
    <HeadTool @refresh="refresh">
      <template slot="btns">
        <iButton @click="save">{{ $t('LK_BAOCUN') }}</iButton><!-- 保存 -->
        <iButton @click="saveNewVersion">{{ $t('LK_BAOCUNWEIZUIXINBANBEN') }}</iButton><!-- 保存为最新版本 -->
      </template>
    </HeadTool>

    <div class="content">
      <div class="c-left">
        <iCard class="c-card-l">
          <div class="title">上半年SOP付款⽐</div>
          <icon symbol name="iconSOPfukuanbi" class="card-icon"></icon>
          <iInput class="input" v-model="no1"></iInput>
        </iCard>
        <iCard class="c-card-l"></iCard>
      </div>
      <div class="c-right">
        <iCard class="c-card-r"></iCard>
      </div>
    </div>
  </div>
</template>

<script>
import {
  icon,
  iTableList
} from "@/components";
import {iPage, iMessage, iInput, iButton, iCard} from "rise";
import HeadTool from "../components/headTool"

export default {
  components: {
    HeadTool, iButton, iCard, iInput, icon
  },

  data(){
    return {
      no1: ''
    }
  },

  methods: {

    //  刷新
    refresh(){

    },

    //  保存
    save(){

    },

    //  保存为最新版本
    saveNewVersion(){

    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-top: 20px;
  height: 92%;

  .content{
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 25px;

    .c-right{
      width: 78%;
      height: 100%;

      .c-card-r{
        width: 100%;
        height: 97%;
      }
    }

    .c-left{
      width: 20%;
      height: 100%;
      margin-right: 2%;

      .c-card-l > div{
        height: 100% !important;
      }

      .c-card-l{
        width: 100%;
        height: 47%;
        margin-bottom: 6%;

        &>div{
          height: 100%;
        }

        ::v-deep .el-input{
          width: 200px !important;
          height: 80px !important;
          font-size: 70px;
          font-weight: bold;

          .el-input__inner{
            width: 100%;
            height: 100%;
            color: #1763F7;
          }
        }

        .card-icon{
          width: 80px;
          height: 80px;
        }

        .title{
          font-size: 18px;
          text-align: center;
          font-weight: bold;
        }

        &:nth-last-child(1){
          margin-bottom: 0;
        }
      }

      
    }
  }
}
</style>