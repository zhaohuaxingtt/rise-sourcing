<!--
 * @Author: yz
 * @Date: 2021-04-21 09:50:42
-->
<template>
  <iPage class="partsprocureHome">
    <!------------------------------------------------------------------------>
    <!--                  导航                                  --->
    <!------------------------------------------------------------------------>
    <iNavWS2
        :tabtitle="tabtitle"
        @click="log"
        @changeNav="changeNav"
        :isGenerateInvestmentList="isGenerateInvestmentList"
        @nextStep="nextStep"
    ></iNavWS2>
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
import {iPage, iMessage} from "rise";
import {iNavWS2} from "@/components";
import {tabtitle} from "./components/data";
import carTypeOverview from "./carTypeOverview";
import generateInvestmentList from "./generateInvestmentList";
import investmentList from "./investmentList";
import {
  saveInvestBuildBottom,
} from "@/api/priceorder/stocksheet/edit";

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
      this.isGenerateInvestmentList = false
    },
    budgetManagement(val, params) {
      this.isGenerateInvestmentList = val.step == 1 ? true : false
      this[params] = val
      this.indexChilden = val.step
      if (val.step == 2) {
        this.investmentListParams = val
      }
    },
    nextStep() {
      let carTypeProject = this.$store.state.mouldManagement.budgetManagement.carTypeProject
      let sourceStatus = this.$store.state.mouldManagement.budgetManagement.sourceStatus
      if (this.$store.state.mouldManagement.budgetManagement.carTypeProject &&
          this.$store.state.mouldManagement.budgetManagement.sourceStatus) {
        // if (this.tableListData.length == 0) {
        //   iMessage.warn('请先添加行');
        //   return
        // }
        saveInvestBuildBottom({
          id: carTypeProject,
          sourceStatus: sourceStatus
        }).then((res) => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 0) {
            iMessage.success(result);
            this.budgetManagement({
                  id: carTypeProject,
                  sourceStatus: sourceStatus,
                  step: 2
                },
                'investmentListParams'
            )
          } else if (Number(res.code) === 1) {
            iMessage.error(result);
            this.tableLoading = false
          } else {
            const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
            iMessage.error(result);
            this.tableLoading = false
          }
        }).catch(() => {
          this.tableLoading = false
        });

      } else {
        iMessage.warn('请先选择车型项目');
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
