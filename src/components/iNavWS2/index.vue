<!--
* @author: yz
* @Date: 2021-4-26 11点32分
* @Description: WS2顶部导航栏
 -->
<template>
  <div class="nav">
    <div class="tabs">
      <ul>
        <li v-for="(items, index) in tabtitle" :key="index" :class="{ 'active': items.active }" @click="$emit('changeNav', items.index)">
          {{ items.name }}
        </li>
      </ul>
      <span class="bottom-line"></span>
    </div>
    <div class="btnList flex-align-center">
      <div class="logButton" @click="$emit('click')">
        <icon symbol name="iconrizhiwuzi" class="icon" />
        <span>{{ $t("LK_RIZHI") }}</span>
      </div>
      <span>
        <icon symbol name="icondatabaseweixuanzhong"></icon>
      </span>
    </div>
  </div>
</template>
<script>
import {
  icon,
} from "@/components";
import logButton from "pages/priceorder/stocksheet/components/logButton";
export default {
  props: {
    tabtitle: {
      type: Array
    },
    routerPage: Boolean,
  },
  mounted() {
    console.log(this.tabtitle)
  },
  components: {
    icon,
  },
  data() {
    return {
      activeIndex: 0,
    }
  },
  created() {

  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.nav{
  display: flex;
  align-items: center;
  justify-content: space-between;
  .tabs {
    display: flex;

    > ul {
      display: flex;
      flex-direction: row;

      > li {
        max-width: 130px;
        color: #000000;
        line-height: 23px;
        font-size: 20px;
        font-weight: 400;
        opacity: 0.42;
        padding-bottom: 5px;
        margin-right: 50px;
        cursor: pointer;
        &.active {
          font-weight: bold;
          color: #000000;
          opacity: 1;
          border-bottom: 3px solid #1763F7;
        }
      }
    }

    > ul::after {
      width: 100%;
      height: 2px;
      border-bottom: 2px solid red;
    }
  }
  .btnList {
    > span {
      font-size: 20px;
      margin-left: 20px;

      // opacity: 0.5;
      .log {
        font-size: 16px;
        color: #1660f1;
        margin-left: 5px;
      }
    }
    .logButton {
      display: inline-block;
      user-select: none;
      cursor: pointer;

      .icon {
        width: 20px;
        height: 20px;
        vertical-align: top;

        & + span {
          margin-left: 4px;
        }
      }

      span {
        display: inline-block;
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        color: $color-blue;
      }
    }
  }

}

</style>
