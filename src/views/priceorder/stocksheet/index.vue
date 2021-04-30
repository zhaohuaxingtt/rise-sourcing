<!--
 * @Author: yz
 * @Date: 2021-04-21 09:50:42
-->
<template>
  <iPage class="partsprocureHome" v-permission="PARTSPROCURE_INDEXPAGE">
    <!------------------------------------------------------------------------>
    <!--                  导航                                  --->
    <!------------------------------------------------------------------------>
    <iNavWS2 :tabtitle="tabtitle" @click="log" @changeNav="changeNav"></iNavWS2>
    <!------------------------------------------------------------------------>
    <!--                  内容                                  --->
    <!------------------------------------------------------------------------>
    <!--预算管理-->
    <div v-if="index === 1">
      <carTypeOverview
          @toGenerateInvestmentList="val => budgetManagement(val, 'generateInvestmentListParams')"
          v-if="indexChilden === 0"
      ></carTypeOverview>
      <generateInvestmentList
          @toinvestmentList="val => budgetManagement(val, 'investmentListParams')"
          :params="generateInvestmentListParams"
          v-if="indexChilden === 1"
      ></generateInvestmentList>
      <investmentList
          :params="investmentListParams"
          v-if="indexChilden === 2"
      ></investmentList>
    </div>
  </iPage>
</template>
<script>
import {
  iPage,
  iNavWS2
} from "@/components";
import {tabtitle} from "./components/data";
import carTypeOverview from "./carTypeOverview";
import generateInvestmentList from "./generateInvestmentList";
import investmentList from "./investmentList";

export default {
  components: {
    iPage,
    iNavWS2,
    carTypeOverview,
    generateInvestmentList,
    investmentList
  },
  data() {
    return {
      tabtitle: tabtitle,
      index: 1,
      indexChilden: 0,
      generateInvestmentListParams: {}
    };
  },
  methods: {
    changeNav(val) {
      this.index = val
      this.indexChilden = 0
    },
    budgetManagement(val, params) {
      this[params] = val
      this.indexChilden = val.step
      if(val.step == 2){
        this.investmentListParams = val
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.checkBox {
  position: relative;
  top: 30px;
  left: -70px;
}

.partsprocureHome {
  position: relative;
}
</style>
