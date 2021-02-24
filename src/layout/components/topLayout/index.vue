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
    <pInput v-model="search" />
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
import pInput from './input.vue';
import { icon } from '@/components';

export default{
  components: {
    pInput,
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
    min-width: 1400px;
    background-color: $color-white;
    position: fixed;
    top: 0px;
    left: 0px;
    padding-left: 100px;
    box-shadow: 0px 1px 0px #DFE6F7;
    position: fixed;
    top: 0;
    left: 0;

    .left {
      height: 97px;
      line-height: 97px;
      padding-left: 60px;

      
    }

    .right {
      position: absolute;
      top: 0;
      right: 0;
      height: 97px;
      color: $color-header-black;
      padding-right: 33px;
      display: flex;
      align-items: center;

      .user {
        height: 97px;
        line-height: 97px;
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
            line-height: 20px;
          }

          .dept {
            margin-top: 4px;
            font-size: 16px;
            line-height: 16px;
            color: $color-header-gray;
          }
        }
      }

      .setting {
        font-size: 20px;
        margin-left: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;

        
        .icon {
          font-size: 28px;
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
          line-height: 97px;
          font-size: 28px;
        }
      }
    }
  }
</style>