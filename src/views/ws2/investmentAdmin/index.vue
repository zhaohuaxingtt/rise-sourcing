<template>
  <iPage>
    <div class="head">
      <div class="title">
        付款计划制定与查看
      </div>
      <div class="tab-box">
        <div @click="tabClick(0)" class="tab-item" :class="tabIndex === 0 ? 'tab-on' : ''">付款看板</div>
        <div @click="tabClick(1)" class="tab-item tab-line" :class="tabIndex === 1 ? 'tab-on' : ''">年度计划</div>
        <div @click="tabClick(2)" class="tab-item tab-line" :class="tabIndex === 2 ? 'tab-on' : ''">月度计划</div>
        <!-- <div v-permission="TOOLING_PAYMENTPLAN_PAYMENTBOARD" @click="tabClick(0)" class="tab-item" :class="tabIndex === 0 ? 'tab-on' : ''">付款看板</div>
        <div v-permission="TOOLING_PAYMENTPLAN_YEAR" @click="tabClick(1)" class="tab-item tab-line" :class="tabIndex === 1 ? 'tab-on' : ''">年度计划</div>
        <div v-permission="TOOLING_PAYMENTPLAN_MONTH" @click="tabClick(2)" class="tab-item tab-line" :class="tabIndex === 2 ? 'tab-on' : ''">月度计划</div> -->
        <iNavWS2 />
      </div>
    </div>

    <router-view></router-view>
  </iPage>
  
</template>

<script>
import {iPage, iMessage, iDialog, iButton, iNavMvp} from "rise";
import { iNavWS2 } from "@/components";
export default {
  components: {
    iPage,
    iNavWS2
  },
  data(){
    return {
      tabIndex: 0,
      urlList: {
        0: '',
        1: '/investmentAdmin/yearlyPlan',
        2: '/investmentAdmin/monthlyPlan'
      },
    }
  },

  methods: {

    tabClick(index){
      const { urlList } = this;
      this.tabIndex = index;
      this.$router.push({
        path: urlList[index],
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.head{
  display: flex;
  justify-content: space-between;
  padding-bottom: 7PX;
  border-bottom: 1PX solid #E3E3E3;

  .tab-box{
    display: flex;
    align-items: center;

    .tab-on{
      color: #1660F1 !important;
      opacity: 1 !important;
      font-weight: bold !important;
    }

    .tab-line::after{
      content: '';
      width: 1px;
      height: 16px;
      background-color: #909091;
      position: absolute;
      top: 5px;
      left: -25px;
    }

    .tab-item{
      font-size: 18px;
      color: #000;
      opacity: 0.42;
      cursor: pointer;
      margin-right: 60px;
      position: relative;

      &:nth-last-child(2){
        margin-right: 20px;
      }
    }
  }

  .title{
    font-size: 20px;
    font-weight: bold;
    position: relative;

    &::after{
      content: '';
      width: 70px;
      height: 3px;
      background-color: #1763F7;
      border-radius: 2px;
      position: absolute;
      bottom: -10px;
      left: 0;
    }
  }
}
</style>