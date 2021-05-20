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
        :nextStepLoading="nextStepLoading"
        @nextStep="nextStep"
        @toDataBase="toDataBase"
    ></iNavWS2>
    <router-view></router-view>

    <!------------------------------------------------------------------------>
    <!--                  内容                                  --->
    <!------------------------------------------------------------------------>
    <!--数据库-->
<!--    <dataBase v-if="index === 999"></dataBase>-->
    <!--预算管理-->
<!--    <div v-if="index === 1">-->
<!--      <carTypeOverview-->
<!--          @toGenerateInvestmentList="val => budgetManagement(val, 'generateInvestmentListParams')"-->
<!--          v-if="indexChilden === 0"-->
<!--      ></carTypeOverview>-->
<!--      <generateInvestmentList-->
<!--          @toinvestmentList="val => budgetManagement(val, 'investmentListParams')"-->
<!--          :params="generateInvestmentListParams"-->
<!--          v-if="indexChilden === 1"-->
<!--      ></generateInvestmentList>-->
<!--      <investmentList-->
<!--          :params="investmentListParams"-->
<!--          v-if="indexChilden === 2"-->
<!--      ></investmentList>-->
<!--    </div>-->
    <iDialog title="您还没有选择参考车型项目，是否继续?" :visible.sync="nextStepvalue" width="381px" top="0s" @close='clearDiolog'
             v-loading="iDialogLoading" class="iDialogNextStep">
      <span slot="footer" class="dialog-footer">
        <iButton @click="nextStepvalue = false">{{ $t('LK_QUXIAO') }}</iButton>
        <iButton @click="nextStepsave">{{ $t('LK_QUEREN') }}</iButton>
      </span>
    </iDialog>
  </iPage>
</template>
<script>
import {iPage, iMessage, iDialog, iButton} from "rise";
import {iNavWS2} from "@/components";
import {tabtitle} from "./budgetManagement/components/data";
import carTypeOverview from "./budgetManagement/carTypeOverview";
import generateInvestmentList from "./budgetManagement/generateInvestmentList";
import investmentList from "./budgetManagement/investmentList";
import dataBase from "./dataBase";
import {
  getRelationCarTypeById,
  saveInvestBuildBottom,
} from "@/api/ws2/budgetManagement/edit";

export default {
  components: {
    iPage,
    iNavWS2,
    carTypeOverview,
    generateInvestmentList,
    investmentList,
    dataBase,
    iDialog,
    iButton,
  },
  data() {
    return {
      tabtitle: tabtitle,
      index: 1,
      indexChilden: 0,
      generateInvestmentListParams: {},
      nextStepvalue: false,
      iDialogLoading: false,
      nextStepLoading: false,
    };
  },
  methods: {
    // changeNav(val) {
    //   this.index = val
    //   this.indexChilden = 0
    //   this.isGenerateInvestmentList = false
    // },
    // budgetManagement(val, params) {
    //   this.isGenerateInvestmentList = val.step == 1 ? true : false
    //   this[params] = val
    //   this.indexChilden = val.step
    //   if (val.step == 2) {
    //     this.investmentListParams = val
    //   }
    // },
    nextStep() {
      this.nextStepLoading = true
      let carTypeProject = this.$store.state.mouldManagement.budgetManagement.carTypeProject
      let sourceStatus = this.$store.state.mouldManagement.budgetManagement.sourceStatus
      if (this.$store.state.mouldManagement.budgetManagement.carTypeProject &&
          this.$store.state.mouldManagement.budgetManagement.sourceStatus) {
        saveInvestBuildBottom({
          id: carTypeProject,
          sourceStatus: sourceStatus
        }).then((res) => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 0) {
            getRelationCarTypeById({id: carTypeProject}).then((res2) => {
              if (Number(res2.code) == 0) {
                let data = res2.data
                if (!data.refCartypeProFirstId && !data.refCartypeProSecondId && !data.refCartypeProThirdId && !data.carTypeAlternativeId) {
                  this.nextStepvalue = true
                } else {
                  iMessage.success(result);
                  // this.budgetManagement({
                  //       id: carTypeProject,
                  //       sourceStatus: sourceStatus,
                  //       step: 2
                  //     },
                  //     'investmentListParams'
                  // )
                  this.$router.push({
                    path: '/tooling/budgetManagement/investmentList',
                    query: {
                      id: carTypeProject,
                      sourceStatus: sourceStatus,
                      step: 2
                    },
                  })
                  this.$store.commit('SET_nextStep', false);
                }
              } else {
                this.nextStepvalue = true
              }
            });
            this.nextStepLoading = false
          } else if (Number(res.code) === 1) {
            iMessage.error(result);
            this.tableLoading = false
          } else {
            const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
            iMessage.error(result);
            this.tableLoading = false
          }
          this.nextStepLoading = false
        }).catch(() => {
          this.tableLoading = false
          this.nextStepLoading = false
        });

      } else {
        iMessage.warn('请先选择车型项目');
        this.nextStepLoading = false
      }
    },
    clearDiolog() {
      this.nextStepvalue = false
    },
    nextStepsave() {
      // this.budgetManagement({
      //       id: this.$store.state.mouldManagement.budgetManagement.carTypeProject,
      //       sourceStatus: this.$store.state.mouldManagement.budgetManagement.sourceStatus,
      //       step: 2
      //     },
      //     'investmentListParams'
      // )
      this.$router.push({
        path: '/tooling/budgetManagement/investmentList',
        query: {
          id: this.$store.state.mouldManagement.budgetManagement.carTypeProject,
          sourceStatus: this.$store.state.mouldManagement.budgetManagement.sourceStatus,
          step: 2
        },
      })
      this.$store.commit('SET_nextStep', false);
      this.nextStepvalue = false
    },
    toDataBase(){
      this.tabtitle = this.tabtitle.map(item => {
        item.active = false
        return item
      })
      this.$router.push({path: '/tooling/dataBase'})
    }
  },
};
</script>
<style lang="scss" scoped>
.iDialogNextStep {
  ::v-deep .el-dialog {
    top: 50%;
    transform: translateY(-50%);
  }
}

.checkBox {
  position: relative;
  top: 30px;
  left: -70px;
}

.partsprocureHome {
  position: relative;
}
</style>
