<!--
 * @Author: yuszhou
 * @Date: 2021-02-22 16:50:10
 * @LastEditTime: 2021-03-08 14:33:35
 * @LastEditors: Please set LastEditors
 * @Description: 项目菜单。
 * @FilePath: \rise\src\layout\components\menu.vue
-->
<template>
  <ul class="menuItems">
    <li
      :class="{ items: true, active: items.active }"
      v-for="(items, index) in menuData"
      :key="index"
    >
      <icon
        :name="
          items.active
            ? iconxunyuandingdianxuanzhong
            : iconxunyuandingdianweixuanzhong
        "
      ></icon>
      <span>{{ items.label }}</span>
      <icon name="iconmuluweixuanzhongshijiantou"></icon>
    </li>
  </ul>
</template>
<script>
import { icon } from "@/components";
import { menuData } from "./data";
export default {
  components: { icon },
  data() {
    return {
      menuData: menuData,
    };
  },
};
</script>
<style lang="scss" scoped>
.menuItems {
  height: calc(100% - 60px);
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0px;
  padding: 0px;
  .items {
    height: 84px;
    padding-left: 40px;
    line-height: 84px;
    span{
      color: #5f6f8f;
      font-size: 20px;
      font-weight: 400;
    }
  }
  .active {
    background: #1660f1;
    span{
      color:white
    }
  }
}
</style>
