<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
  <div class="headerNav">
    <iNavMvp :list="list" @change="change" :lev="1" routerPage></iNavMvp>
    <div class="ext">
      <ul>
        <li v-for="(item, index) in menu" :key="index">
          <a href="javascript:;" @click="$router.push({ path: item.url })">{{item.key}}</a>
        </li>
      </ul>
      <a href="javascript:;" class="iconMenu">
        <icon symbol
          name="iconrizhi"
        ></icon>
      </a>
      <a href="javascript:;" class="iconDatabase">
        <icon symbol
          name="icondatabaseweixuanzhong"
        ></icon>
      </a>
    </div>
    
  </div>
</template>
<script>
import {TAB, MENU} from './components/data'
import {
  iNavMvp,
  icon
} from "rise";

export default {
  data() {
    return {
      list: TAB,
      menu: MENU
    }
  },
  components: {
    iNavMvp,
    icon
  },
  created() {
    console.log(this.list)
  },
  methods: {
    change() {

    }
  }
}
</script>

<style lang="scss" scoped>
.headerNav {
  display: flex;
  justify-content: space-between;
  .ext {
    ul {
      display: inline-block;
      vertical-align: middle;
      li {
        position: relative;
        display: inline-block;
        padding: 0 17px;
        line-height: 25px;
        &:after {
          display: inline-block;
          content: '';
          width: 1px;
          height: 16px;
          background: #000000;
          opacity: 0.42;
          position: absolute;
          right: 0px;
          top: 50%;
          margin-top: -8px
        }
        &:last-child {
          padding-right: 0px;
          &:after {
            display: none;
          }
        }
        a {
          font-size: 18px;
          color: #000000;
          opacity: 0.42;
        }
      }
    }
    .iconMenu {
      display: inline-block;
      vertical-align: middle;
      padding: 0px 5px;
      // height: 21px;
      // overflow: hidden;
      svg {
        width: 80px;
        font-size: 16px;
        font-size: 1.175rem;
        vertical-align: middle;
      }
    }
    .iconDatabase {
      display: inline-block;
      vertical-align: middle;
      color: #f8f9fa !important;
      // height: 21px;
      // overflow: hidden;
      svg {
        width: 20px;
        font-size: 20px;
        font-size: 1.4rem;
        vertical-align: middle;
        color: #f8f9fa !important;
      }
    }
  }
}
</style>