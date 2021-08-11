<!--
 * @Author: yz
 * @Date: 2021-04-21 09:50:42
-->
<template>
  <iPage class="partsprocureHome">
    <!------------------------------------------------------------------------>
    <!--                  导航                                  --->
    <!------------------------------------------------------------------------>
    <div class="navBar">
      <iNavMvp
          ref="iNavMvpRef"
          :lev='1'
          :routerPage="true"
          :list="newTableTitle"
          @change="changeNav"
      ></iNavMvp>
      <iNavWS2
          @click="log"
          :nextStepLoading="nextStepLoading"
          :dataBaseInit="dataBaseInit"
          :navList="budgetManagement3rd"
          :isIconShow="isIconShow"
          @nextStep="nextStep"
          @changeDataBase="$refs.iNavMvpRef.activeIndex = 999"
      ></iNavWS2>
    </div>

    <router-view></router-view>
    
    <!------------------------------------------------------------------------>
    <!--                  内容                                  --->
    <!------------------------------------------------------------------------>
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
import {iPage, iMessage, iDialog, iButton, iNavMvp} from "rise";
import {iNavWS2} from '@/components';
import {tabtitle} from "./budgetManagement/components/data";
import store from '@/store';
import {
  getRelationCarTypeById,
  saveInvestBuildBottom,
} from "@/api/ws2/budgetManagement/edit";
import {budgetManagement3rd} from "pages/ws2/budgetManagement/components/data";

export default {
  components: {
    iPage,
    iNavWS2,
    iDialog,
    iButton,
    iNavMvp
  },
  watch: {
    $route: {
      deep: true,
      immediate: true, // 一旦监听到路由的变化立即执行
      handler(to, from) {
        const index = to.name.indexOf('investmentAdmin');
        let list = [];
        if(index >= 0){
          list = budgetManagement3rd.filter(item => item.value >=3 && item.value <= 5);
          this.isIconShow = to.name.indexOf('PayBlock') >= 0 ? true : false
        }else{
          list = budgetManagement3rd.filter(item => item.value === 1 || item.value === 2);
          this.isIconShow = false;
        }

        list = list.map((item, index) => ({
          ...item,
          value: index + 1
        }))

        this.budgetManagement3rd = list;
      },
    },
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
      dataBaseInit: false,
      budgetManagement3rd,
      isIconShow: false,
    };
  },
  computed: {
    newTableTitle: () => {
      // let whiteBtnList = store.state.permission.whiteBtnList
      // let tabtitleTemp = []
      //
      // if(whiteBtnList['TOOLING_BUDGET_OVERVIEW'] || whiteBtnList['TOOLING_BUDGET_BUILD'] || whiteBtnList['TOOLING_BUDGET_INVESTMENT']){
      //   tabtitleTemp.push(tabtitle[1])
      // }
      // if(whiteBtnList['TOOLING_BUDGET_BUDGETAPPROVAL']){
      //   tabtitleTemp.push(tabtitle[2])
      // }
      // if(whiteBtnList['TOOLING_BUDGET_BAAPPLICATION_TOTAL'] || whiteBtnList['TOOLING_BUDGET_BAAPPLICATION_DETAILS'] || whiteBtnList['TOOLING_BUDGET_BAAPPLICATION_CARTYPE']){
      //   tabtitleTemp.push(tabtitle[3])
      // }
      // if(whiteBtnList['TOOLING_BUDGET_BAAPPROVAL_APPLY'] || whiteBtnList['TOOLING_BUDGET_BAAPPROVAL_MONEY'] || whiteBtnList['TOOLING_BUDGET_BAAPPROVAL_ALL']){
      //   tabtitleTemp.push(tabtitle[6])
      // }
      // tabtitleTemp = tabtitleTemp.map((item, index) => {
      //   item.value = index + 1
      //   return item
      // })
      const ksy1 = store.state.permission.whiteBtnList['TOOLING_BUDGET_BAAPPLICATION_TOTAL'];  //  是否有汇总页面权限
      const ksy2 = store.state.permission.whiteBtnList['TOOLING_BUDGET_BAAPPLICATION_DETAILS'];  //  是否有详情页权限
      const list = tabtitle.map(item => {
        if(item.activePath === '/tooling/baApplyIndex'){ //  ba申请
          const url = ksy1 ? '/tooling/baApplyIndex' : (!ksy1 && !ksy2 ? '/views/404' : '/tooling/modelDetails');
          item.activePath = url;
          item.url = url;
        }

        return item;
      })
      return list;
    }
  },
  mounted() {
    if(this.$route.path == '/tooling/dataBase'){
      this.$refs.iNavMvpRef.activeIndex = 999
    }
  },
  methods: {
    changeNav(val) {
      this.dataBaseInit = !this.dataBaseInit
      },
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
                    path: '/tooling/budgetManagement/investmentListJV',
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
        path: '/tooling/budgetManagement/investmentListJV',
        query: {
          id: this.$store.state.mouldManagement.budgetManagement.carTypeProject,
          sourceStatus: this.$store.state.mouldManagement.budgetManagement.sourceStatus,
          step: 2
        },
      })
      this.$store.commit('SET_nextStep', false);
      this.nextStepvalue = false
    },
  },
};
</script>
<style lang="scss" scoped>
.navBar{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #E3E3E3;
  padding-bottom: 5px;
  position: relative;
  z-index: 1;
}
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
  ::v-deep .nav.flex-align-center{
    > div:first-of-type{
      margin-left: 0;
    }
  }
}
</style>
