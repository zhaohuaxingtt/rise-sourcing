<!--
 * @Author: yuszhou
 * @Date: 2021-02-22 16:46:47
 * @LastEditTime: 2021-02-23 15:13:30
 * @LastEditors: Please set LastEditors
 * @Description: 存在于界面上方的组件。
 * @FilePath: \rise\src\layout\components\topLayout.vue
-->
<template>
<div class="topLayout">
  <div class="left">
    <iInput class="search" v-model="search" :placeholder="$t('search')">
      <icon class="icon" slot="prefix" name="iconsousudingbu" />
    </iInput>
  </div>
  <div class="right">
    <div class="user">
      <div class="icon"></div>
      <div class="info">
        <p class="name">Kong Pengfei</p>
        <p class="dept">CSP</p>
      </div>
    </div>
    <div class="setting">
      <icon class="icon" name="iconSetting" />
      <span>{{ $t('setting') }}</span>
    </div>
    <div class="language">
      <icon class="icon" name="iconzhongyingwenzhuanhuanzhong" />
    </div>
    <div class="message">
      <icon class="icon" name="iconxiaoxi" />
    </div>
  </div>
</div>
</template>
<script>
import { iInput, icon } from "@/components";

export default{
  components: {
    iInput,
    icon
  },
  data() {
    return {
      search: ''
    }
  }
}
</script>
<style lang='scss' scoped>
  .topLayout{
    height: 97px;
    width: 100%;
    background-color: $color-white;
    position: fixed;
    top: 0px;
    left: 0px;
    padding-left: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      padding-left: 60px;
    }

    .search {
      width: 667px;
      height: 50px;
      background: #F8F8FA;
      border-radius: 10px;

      .icon {
        height: 100%;
        margin-right: 20px;
        font-size: 26px;
      }

      ::v-deep .el-input__prefix {
        width: 76px;
        text-align: right;
      }

      ::v-deep .el-input__inner {
        height: 50px;
        padding: 0 40px 0 76px;
        background: transparent;
        box-shadow: 0 0 0 0;

        &::placeholder {
          color: $color-header-black;
          opacity: 0.3;
        }
      }
    }

    .right {
      color: $color-header-black;
      display: flex;
      align-items: center;
      padding-right: 33px;

      .user {
        display: flex;
        align-items: center;

        .icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: url('https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3729239676,1542549068&fm=26&gp=0.jpg') no-repeat;
          background-size: auto 52px;
          background-position: center;
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        }

        .info {
          margin-left: 26px;

          .name {
            font-size: 20px;
          }

          .dept {
            margin-top: 4px;
            font-size: 16px;
            color: $color-header-gray;
          }
        }
      }

      .setting {
        font-size: 20px;
        margin-left: 30px;
        display: flex;
        align-items: center;
        cursor: pointer;
        
        .icon {
          font-size: 26px;
        }

        span {
          margin-left: 8px;
          line-height: 1em;
        }
      }

      .language,
      .message {
        margin-left: 30px;
        cursor: pointer;

        .icon {
          font-size: 28px;
        }
      }
    }
  }
</style>