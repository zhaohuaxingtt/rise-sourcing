<template>
<iPage>
 
    <div class="row-menu">
        <iNavMvp
            ref="iNavMvpRef"
            :lev='1'
            :routerPage="true"
            :list="newTableTitle"
            @change="changeNav"
        ></iNavMvp>
        <!-- <iNavWS2
            @click="log"
            :nextStepLoading="nextStepLoading"
            :dataBaseInit="dataBaseInit"
            :navList="budgetManagement3rd"
            :isIconShow="isIconShow"
            @nextStep="nextStep"
            @changeDataBase="$refs.iNavMvpRef.activeIndex = 999"
        ></iNavWS2> -->
        <router-view></router-view>
    </div>
</iPage>
</template>

<script>
import {tabtitle} from './data'
import {iPage, iMessage, iDialog, iButton, iNavMvp} from "rise";
export default {
    components:{
        tabtitle,
        iPage, 
        iMessage, 
        iDialog, 
        iButton, 
        iNavMvp
    },
    data(){
      return {

      }  
    },
    computed:{
        newTableTitle: () => {
        // const ksy1 = store.state.permission.whiteBtnList['TOOLING_BUDGET_BAAPPLICATION_TOTAL'];  //  是否有汇总页面权限
        // const ksy2 = store.state.permission.whiteBtnList['TOOLING_BUDGET_BAAPPLICATION_DETAILS'];  //  是否有详情页权限
        const list = tabtitle.map(item => {
            if(item.activePath === '/tooling/baApplyIndex'){ //  ba申请
            const url = ksy1 ? '/tooling/baApplyIndex' : (!ksy1 && !ksy2 ? '/views/404' : '/tooling/modelDetails');
            item.activePath = url;
            item.url = url;
            }

            return item;
        })
        return list;
        },
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
    .row-menu{
        width: 100%;
        padding: 20px 40px;
    }
</style>