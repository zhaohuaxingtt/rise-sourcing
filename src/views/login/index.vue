<!--
 * @Author: your name
 * @Date: 2021-03-10 15:22:16
 * @LastEditTime: 2023-03-15 16:16:15
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\login\index.vue
-->
<template>
  <div v-if="ssoLogin">
    <div>Loading...to redirect...</div>
  </div>
  <div v-else class="login">
    <!-- <div class="title">RISE</div> -->
    <img src="~@/assets/images/back2.png" alt="" class="logo">
    <div class="title">数字化采购平台</div>
    <div class="content">
      <el-form :rules="rules">
        <el-form-item :label="language('LK_YONGHUMING', '用户名')">
          <el-input
            v-model="userName"
            autocomplete="off"
            :readonly="readonly"
            @focus="stopAutoComplate"
          ></el-input>
        </el-form-item>
        <el-form-item :label="language('LK_MIMA', '密码')">
          <el-input
            v-model="passWord"
            autocomplete="off"
            type="password"
            :readonly="readonly"
            @focus="stopAutoComplate"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button :loading="loading" class="button" @click="login">{{
        language("LK_DENGLU", "登录")
      }}</el-button>
    </div>
  </div>
</template>
<script>
import { iMessage } from "rise";
import { login } from "@/api/usercenter";
import { setToken, getToken, encryptPwd } from "@/utils";

export default {
  data() {
    return {
      userName: "",
      passWord: "",
      readonly: true,
      loading: false,
      ssoLogin: false,
    };
  },
  watch: {
    passWord: function (val) {
      if (val == "") this.stopAutoComplate();
    },
    userName: function (val) {
      if (val == "") this.stopAutoComplate();
    },
  },
  methods: {
    login() {
      if (this.passWord === "" || this.userName === "") {
        return iMessage.error(this.language("抱歉，用户名或密码不能为空！"));
      }
      this.loading = true;
      const requestData = {
        userName: this.userName,
        passWord: encryptPwd(this.passWord),
      };
      login(requestData)
        .then(async (res) => {
          if (res && res.result) {
            this.loading = false;
            await setToken(res.data.token);
            this.$router
              .replace({
                path: "/index",
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => {
          console.log("err", err);
          iMessage.error(err.desEn || this.language("登录失败"));
        })
        .finally(() => {
          this.loading = false;
        });
    },

    stopAutoComplate() {
      this.readonly = true;
      setTimeout(() => (this.readonly = false), 10);
    },
  },
  created() {
    // 禁用 prod 环境小黑窗(superLogin)
    if (
      this.$route.path.indexOf("superLogin") > -1 &&
      !["production"].includes(process.env.NODE_ENV)
    ) {
      //nothing to do
    } else {
      const token = getToken();
      let redirectUrl = "";
      if (token) {
        redirectUrl =
          process.env.VUE_APP_LOGOUT_URL || process.env.VUE_APP_LOGIN_URL;
      } else {
        redirectUrl =
          process.env.VUE_APP_LOGIN_URL +
            `?state=${encodeURIComponent(this.$route.query.state)}` ||
          process.env.VUE_APP_LOGOUT_URL;
      }
      if(redirectUrl){
        this.ssoLogin = true;
        location.href = redirectUrl;
      }
    }
  },
};
</script>
<style lang="scss" scoped>
$colorpage:#67C23A;
.login {
  background-image: url("~@/assets/images/back1.png");
  background-repeat:round;
  height: 100%;
  width: 100%;
  border-top: 4px solid $color-blue;
  position: relative;
  .logo{
    position: absolute;
    left: 100px;
    top: 140px;
    width: 200px;
    height: 40px;
  }
  &::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);/*半透明黑色*/ 
  }
  .title {
    position: absolute;
    left: 100px;
    top: 200px;
    width: 100%;
    height: 80px;
    font-size: 80px;
    font-weight: 300;
    color: white;
  }
  .content {
    // @include centerAbsolute;
    //background-color: white;
    position: absolute;
    margin: auto;
    padding: 60px;
    top: 0px;
    left: 1000px;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 500px;
    height: 500px
  }
}
.el-form {
  ::v-deep .el-form-item__label {
    font-size: 14px;
    color: #e4e7ed;
  }
  ::v-deep .el-input__inner {
    border: none;
    border-bottom: 3px solid #e4e7ed;
    background-color: transparent;
    border-radius: 0px;
    padding-left: 0px;
    font-size: 30px;
    padding-bottom: 20px;
    height: 50px;
    transition: all 0.3s;
    color: #e4e7ed !important;
    &:-internal-autofill-selected {
      box-shadow: 0 0 0px 1000px #010520 inset !important;
      background-color: transparent !important;
      color: $colorpage !important;
    }
    &:-internal-autofill {
      box-shadow: 0 0 0px 1000px #010520 inset !important;
      background-color: transparent !important;
      color: $colorpage !important;
    }
    &:focus {
      border-bottom: 4px solid $colorpage;
      color: $colorpage;
      padding-bottom: 30px;
      height: 60px;
      padding-top: 10px;
      .el-form-item__label {
        color: $colorpage;
      }
    }
  }
}
.button {
  width: 100%;
  margin-top: 100px;
  background-color: $colorpage;
  font-size: #e4e7ed;
  border-radius: 20px;
  border: none;
  ::v-deep span {
    color: white;
  }
  &:hover {
    opacity: 0.7;
  }
}
</style>
