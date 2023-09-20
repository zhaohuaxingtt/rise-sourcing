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
          :hoverText="$t('MOULDADD.LK_LISHISHUJUKU')"
          @nextStep="nextStep"
          @changeDataBase="$refs.iNavMvpRef.activeIndex = 999"
      ></iNavWS2>
    </div>

    <router-view></router-view>
    
    <!------------------------------------------------------------------------>
    <!--                  内容                                  --->
    <!------------------------------------------------------------------------>
    <iDialog :title="$t('MOULDADD.LK_SHIFOUJIXU')" :visible.sync="nextStepvalue" width="381px" top="0s" @close='clearDiolog'
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
        // this.budgetManagement3rd = this.filterRoutePermission(list);
        this.budgetManagement3rd = list;
      },
    },
  },
  created() {
    this.getInitRoute()
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
      const codes = ['SOURCINGTZGLY', 'KCNTZGLY'];  //  JV和扩产能code
      const roleList = store.state.permission.roleList;
      // const ksy1 = store.state.permission.whiteBtnList['TOOLING_BUDGET_BAAPPLICATION_TOTAL'];  //  是否有汇总页面权限
      // const ksy2 = store.state.permission.whiteBtnList['TOOLING_BUDGET_BAAPPLICATION_DETAILS'];  //  是否有详情页权限
      const list = tabtitle.map(item => {
        if(item.activePath === '/tooling/baApplyIndex'){ //  ba申请
          const isKey = roleList.some(item => codes.includes(item));
          const url = isKey ? '/tooling/modelDetails' : '/tooling/baApplyIndex';
          item.activePath = url;
          item.url = url;
        }

        return item;
      })
      return list;
    },

    whiteBtnList: () => {
      return store.state.permission.whiteBtnList
    }
  },
  mounted() {
    if(this.$route.path == '/tooling/dataBase'){
      this.$refs.iNavMvpRef.activeIndex = 999
    }
    console.log('newTableTitle=========>',this.newTableTitle)
  },
  methods: {
    filterRoutePermission(list){
      list = list.filter(item => this.whiteBtnList[item.permissionKey]);
      console.log('权限对应：', list, this.whiteBtnList);
      return list;
    },
    changeNav(val) {
      this.dataBaseInit = !this.dataBaseInit
    },
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
    // 获取初始路由 （解决无权限情况默认进入预算管理）
    getInitRoute() {
      if (this.$route.path == '/tooling') {
        for (let index = 0; index < this.newTableTitle.length; index++) {
          const item = this.newTableTitle[index];
          if (this.$store.state.permission.whiteBtnList[item.permissionKey]) {
            this.$router.push({
              path: item.url,
            })
            return
          }
          if (index == this.newTableTitle.length) {
            this.$router.push({
              path: this.newTableTitle[0].url,
            })
          }
        }
      }
    }
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
.partsprocureHome{
  display: flex;
  flex-flow: column;
  height: 100%;
  ::v-deep .table-card {
    flex: 1;
    overflow: hidden;
    min-height: 400px;
    .card-body-box {
      height: 100%;
    }
  }
}
</style>
