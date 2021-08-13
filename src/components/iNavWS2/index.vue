<!--
* @author: yz
* @Date: 2021-4-26 11点32分
* @Description: WS2顶部导航栏
 -->
<template>
  <div class="btnList flex-align-center">
    <!-- v-permission="TOOLING_PAYMENTPLAN_PAYMENTBOARD" -->
    <icon v-permission="TOOLING_PAYMENTPLAN_PAYMENTBOARD" @click.native="powerBiUrl" v-if="isIconShow" symbol name="iconicon-xiazai" class="card-icon"></icon>
    <iNavMvp
        :lev='2'
        :routerPage="true"
        :list="navList"
        class="iNavMvp"
        v-if="($route.path.indexOf('budgetManagement') > -1 && $route.path.indexOf('addModelBag') === -1) || $route.path.indexOf('investmentAdmin') > -1"
    ></iNavMvp>
    <iButton
        v-if="$route.path.indexOf('budgetManagement/generateInvestmentList') > -1"
        class="nextStep"
        @click="$emit('nextStep')"
        :disabled="$store.state.mouldManagement.isBudget == 3"
        v-loading="nextStepLoading"
    >{{ $t('LK_XIAYIBU') }}
    </iButton>
    <!--      <div class="logButton" @click="$emit('click')">-->
    <!--        <icon symbol name="iconrizhiwuzi" class="icon"/>-->
    <!--        <span @click="changeDataBase">{{ $t("LK_RIZHI") }}</span>-->
    <!--      </div>-->
    <span @click="changeDataBase" class="dataBase">
      <transition name="bounce">
        <Popover
            content="历史数据库"
            placement="top-start"
            trigger="hover">
            <icon slot="reference" v-if="!dataBase" symbol name="icondatabaseweixuanzhong"></icon>
        </Popover>
      </transition>
      <transition name="bounceTo">
        <Popover
            content="历史数据库"
            placement="top-start"
            trigger="hover">
            <icon slot="reference" v-if="dataBase" symbol name="icondatabasexuanzhongzhuangtai" class="openIcon"></icon>
        </Popover>
      </transition>
    </span>
  </div>
</template>
<script>
import {
  icon,
  iButton,
} from "rise";
import { Popover } from "element-ui";
import logButton from "pages/ws2/budgetManagement/components/logButton";
import {budgetManagement3rd} from "pages/ws2/budgetManagement/components/data";
import {iNavMvp} from 'rise';
import store from '@/store';

export default {
  props: {
    nextStepLoading: Boolean,
    dataBaseInit: Boolean,
    navList: Array,
    isIconShow: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
  },
  components: {
    icon,
    iButton,
    iNavMvp,
    Popover
  },
  data() {
    return {
      activeIndex: 999,
      routerPage: true,
      query: true,
      dataBase: false,
      onleySelf: true,
      checkHistory: false,
      budgetManagement3rd: budgetManagement3rd,
    }
  },
  created() {
    this.$store.commit('SET_onleySelf', this.onleySelf)
    this.$store.commit('SET_checkHistory', this.checkHistory)
    if(this.$route.path == '/tooling/dataBase'){
      this.dataBase = true
    }
  },
  methods: {

    powerBiUrl(){ //  打印
      const report = store.state.investmentAdmin.report;
      report.print();
    },

    changeDataBase() {
      this.dataBase = true
      this.activeIndex = 999
      this.$router.push({path: '/tooling/dataBase'})
      this.$emit('changeDataBase')
    }
  },
  watch: {
    dataBaseInit(val){
      this.dataBase = false
    }
  }
}
</script>

<style lang="scss" scoped>
.card-icon{
  width: 20px;
  height: 20px;
  margin-right: 20px;
  cursor: pointer;
}
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

.iNavMvp{
  margin-right: 30px;
}
.tabs {
  display: flex;

  > ul {
    display: flex;
    flex-direction: row;

    > li {
      //max-width: 130px;
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


</style>
