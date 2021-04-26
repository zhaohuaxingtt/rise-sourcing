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
          @toGenerateInvestmentList="val => budgetManagement(val, 1, 'generateInvestmentListParams')"
          v-if="indexChilden === 0"
      ></carTypeOverview>
      <generateInvestmentList
          @toinvestmentList="budgetManagement(val, 2)"
          :params="generateInvestmentListParams"
          v-if="indexChilden === 1"
      ></generateInvestmentList>
      <investmentList :params="generateInvestmentListParams" v-if="indexChilden === 2"></investmentList>
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
      budgetManagementIndex: '1-1',
      generateInvestmentListParams: {}
    };
  },
  methods: {
    changeNav(val) {
      this.index = val
      this.indexChilden = 0
    },
    budgetManagement(val, step, params) {
      this[params] = val
      this.indexChilden = step
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
