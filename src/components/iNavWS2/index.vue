<!--
* @author: yz
* @Date: 2021-4-26 11点32分
* @Description: WS2顶部导航栏
 -->
<template>
  <div class="nav">
    <div class="tabs">
      <ul>
        <li v-for="(items, index) in tabtitle" :key="index" :class="{ 'active': items.active }"
            @click="changeNav(items.index)">
          {{ items.name }}
        </li>
      </ul>
      <span class="bottom-line"></span>
    </div>
    <div class="btnList flex-align-center">
      <iButton
          v-if="isGenerateInvestmentList"
          class="nextStep"
          @click="$emit('nextStep')"
          :disabled="$store.state.mouldManagement.isBudget == 3"
          v-loading="nextStepLoading"
      >下一步
      </iButton>
<!--      <div class="logButton" @click="$emit('click')">-->
<!--        <icon symbol name="iconrizhiwuzi" class="icon"/>-->
<!--        <span @click="changeDataBase">{{ $t("LK_RIZHI") }}</span>-->
<!--      </div>-->
      <span @click="changeDataBase" class="dataBase">
        <transition name="bounce">
          <icon v-if="!dataBase" @click="changeDataBase" symbol name="icondatabaseweixuanzhong"></icon>
        </transition>
        <transition name="bounceTo">
          <icon v-if="dataBase" symbol name="icondatabasexuanzhongzhuangtai" class="openIcon"></icon>
        </transition>
      </span>
    </div>
  </div>
</template>
<script>
import {
  icon,
  iButton, iMessage
} from "@/components";
import logButton from "pages/priceorder/stocksheet/components/logButton";

export default {
  props: {
    tabtitle: {
      type: Array
    },
    routerPage: Boolean,
    isGenerateInvestmentList: Boolean,
    nextStepLoading: Boolean,
  },
  mounted() {
    console.log(this.tabtitle)
  },
  components: {
    icon,
    iButton
  },
  data() {
    return {
      activeIndex: 0,
      dataBase: false,
    }
  },
  created() {

  },
  methods: {
    changeNav(index) {
      this.tabtitle = this.tabtitle.map(item => {
        item.active = item.index == index ? true : false
        return item
      })
      this.dataBase = false
      this.$emit('changeNav', index)
    },
    changeDataBase() {
      this.dataBase = true
      this.$emit('toDataBase')
    }
  }
}
</script>

<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in .5s;
}
//
//.bounce-leave-active {
//  animation: bounce-in .5s reverse;
//}
//
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.bounceTo-enter-active {
  animation: bounceTo-in .5s;
}

//.bounceTo-leave-active {
//  animation: bounceTo-in .5s reverse;
//}

@keyframes bounceTo-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;

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
    .nextStep {
      margin-right: 20px;
    }
    > span {
      font-size: 20px;

      // opacity: 0.5;
      .log {
        font-size: 16px;
        color: #1660f1;
        margin-left: 5px;
      }
    }

    .dataBase {
      width: 31px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      .openIcon {
        width: 31px;
        height: 36px;
      }
    }

    .logButton {
      display: inline-block;
      user-select: none;
      cursor: pointer;
      margin-right: 20px;
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
