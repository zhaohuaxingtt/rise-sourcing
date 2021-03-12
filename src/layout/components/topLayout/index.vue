<!--
 * @Author: yuszhou
 * @Date: 2021-02-22 16:46:47
 * @LastEditTime: 2021-03-08 10:37:10
 * @LastEditors: Please set LastEditors
 * @Description: 存在于界面上方的组件。
 * @FilePath: \rise\src\layout\components\topLayout.vue
-->
<template>
<div class="topLayout">
  <div class="left">
    <pInput v-model="search" :placeholder="$t('search') | capitalizeFilter" />
  </div>
  <div class="right">
    <div class="user">
      <el-avatar class="icon" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3729239676,1542549068&fm=26&gp=0.jpg"></el-avatar>
      <div class="info">
        <p class="name">Kong Pengfei</p>
        <p class="dept">CSP</p>
      </div>
    </div>
    <div class="setting">
      <icon symbol class="icon" name="iconSetting" />
      <span>{{ $t('setting') | capitalizeFilter }}</span>
    </div>
    <div class="language" @click="handleChangeLang">
      <icon symbol v-if="lang === 'zh'" class="icon" name="iconzhongyingwenzhuanhuanzhong" />
      <icon symbol v-else class="icon" name="iconzhongyingwenzhuanhuanying" />
    </div>
    <div class="message">
      <el-badge :value="message" :hidden="!message">
        <icon symbol class="icon" name="iconxiaoxi" />
      </el-badge>
    </div>
  </div>
</div>
</template>
<script>
import pInput from './input.vue';
import { icon } from '@/components';

import filters from '@/utils/filters'

export default{
  mixins: [ filters ],
  components: {
    pInput,
    icon
  },
  data() {
    return {
      lang: '',
      search: '',
      message: 2
    }
  },
  created() {
    this.lang = localStorage.getItem('lang')
  },
  methods: {
    handleChangeLang() {
      this.lang = this.lang === 'zh' ? 'en' : 'zh'
      localStorage.setItem('lang', this.lang)
      this.$i18n.locale = this.lang
    }
  }
}
</script>
<style lang='scss' scoped>
  .topLayout{
    height: 60px;
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
	z-index: 9999;
    .left {
      height: 60px;
      line-height: 60px;
      padding-left: 60px;

      
    }

    .right {
      position: absolute;
      top: 0;
      right: 0;
      height: 60px;
      color: $color-header-black;
      padding-right: 33px;
      display: flex;
      align-items: center;

      .user {
        height: 60px;
        line-height: 60px;
        display: flex;
        align-items: center;
        .icon {
          width: 44px;
          height: 44px;

          ::v-deep img {
            position: relative;
            left: 50%;
            transform: translate(-50%, 0);
          }
        }

        .info {
          margin-left: 26px;
          .name {
            font-size: 16px;
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
        font-size: 16px;
        margin-left: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;

        
        .icon {
          font-size: 25px;
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
          font-size: 25px;
        }
      }
    }

    .message {
      ::v-deep .el-badge {
        .el-badge__content {
          background: #E30D0D;
          top: auto;
          bottom: -3px;
          min-width: 25px;
          height: 25px;
          padding: 0;
          font-size: 14px;
          text-align: center;
        }
      }
    }
  }
</style>