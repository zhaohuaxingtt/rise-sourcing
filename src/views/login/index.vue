<!--
 * @Author: your name
 * @Date: 2021-03-10 15:22:16
 * @LastEditTime: 2021-03-12 14:23:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\login\index.vue
-->
<template>
    <div class="login">
        <div class="title">RISE</div>
        <div class="content">
          <el-form :rules="rules">
            <el-form-item label='用户名' >
              <el-input v-model='userName' autocomplete="off" :readonly="readonly" @focus="stopAutoComplate"></el-input>
            </el-form-item>
            <el-form-item label='密码'>
              <el-input v-model="passWord" autocomplete="off" type="password" :readonly="readonly" @focus="stopAutoComplate"></el-input>
            </el-form-item>
          </el-form>
          <el-button class="button" @click="login">登录</el-button>
        </div>
    </div>
</template>
<script>
export default{
  data(){
    return {
      userName:'',
      passWord:'',
      readonly:true
    }
  },
  watch:{
    'passWord':function(val){
      if(val == '') this.stopAutoComplate()
    },
    'userName':function(val){
      if(val == '') this.stopAutoComplate()
    }
  },
  methods:{
    login(){
      this.$router.replace({
        path:'/partsign'
      })
    },
    stopAutoComplate(){
      this.readonly = true
      setTimeout(()=>this.readonly=false,10)
    }
  }
}
</script>
<style lang='scss' scoped>
   $colorpage:rgb(67,152,217);
  .login{
    background-color: rgb(1, 5, 32);
    height: 100%;
    width: 100%;
    border-top: 4px solid $color-blue;
    position: relative;
    .title{
      padding: 40px;
      font-size: 40px;
      font-weight: bold;
      color: white;
    }
    .content{
      @include centerAbsolute;
      //background-color: white;
      width: 500px;
      height: 500px;
    }
  }
  .el-form{
    ::v-deep .el-form-item__label{
      font-size: 14px;
      color: #e4e7ed;
    }
      ::v-deep .el-input__inner{
        border:none;
        border-bottom: 3px solid #e4e7ed;
        background-color: transparent;
        border-radius: 0px;
        padding-left: 0px;
        font-size: 30px;
        padding-bottom: 20px;
        height: 50px;
        transition: all 0.3s;
        color: #e4e7ed!important;
        &:-internal-autofill-selected { 
          box-shadow: 0 0 0px 1000px #010520 inset !important;
          background-color: transparent!important;
          color: $colorpage!important;
        }
        &:-internal-autofill { 
          box-shadow: 0 0 0px 1000px #010520 inset !important;
          background-color: transparent!important;
          color: $colorpage!important;
        }
        &:focus{
          border-bottom: 4px solid $colorpage;
          color: $colorpage;
          padding-bottom: 30px;
          height: 60px;
          padding-top: 10px;
            .el-form-item__label{
              color: $colorpage;
            }
        }
      }
  }
    .button{
      width: 100%;
      margin-top: 100px;
      background-color: $colorpage;
      font-size: #e4e7ed;
      border-radius: 20px;
      border:none;
      ::v-deep span{
        color: white;
      }
      &:hover{
        opacity: 0.7;
      }
    }
</style>