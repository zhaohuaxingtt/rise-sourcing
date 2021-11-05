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
          :list="tabtitle"
          @change="changeNav"
      ></iNavMvp>
      <iNavWS2
          @click="log"
          :nextStepLoading="nextStepLoading"
          :dataBaseInit="dataBaseInit"
          :navList="navList"
          :isIconShow="isIconShow"
          :historyDataBase="false"
          :mouldBook="true"
          hoverText="模具台账"
          @changeDataBase="$refs.iNavMvpRef.activeIndex = 999"
      ></iNavWS2>
    </div>

    <router-view></router-view>
  </iPage>
</template>
<script>
import {iPage, iMessage, iDialog, iButton, iNavMvp} from "rise";
import {iNavWS2} from "@/components";
import {tabtitle, navList} from "./components/data";
import store from '@/store';
import {
  getRelationCarTypeById,
  saveInvestBuildBottom,
} from "@/api/ws2/budgetManagement/edit";

export default {
  components: {
    iPage,
    iNavWS2,
    iNavMvp
  },
  data() {
    return {
      tabtitle: tabtitle,
      navList,
      index: 1,
      indexChilden: 0,
      generateInvestmentListParams: {},
      nextStepvalue: false,
      iDialogLoading: false,
      nextStepLoading: false,
      dataBaseInit: false,
      isIconShow: false,
    };
  },
  computed: {
    whiteBtnList: () => {
      return store.state.permission.whiteBtnList
    }
  },
  mounted() {
    if(this.$route.path == '/tooling/dataBase' || this.$route.path == '/purchase/mouldBook'){
      this.$refs.iNavMvpRef.activeIndex = 999
    }
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
