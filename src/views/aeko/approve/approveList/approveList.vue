<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-09-26 16:47:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-01 15:57:10
 * @Description: 审批列表 Commodity审批人/CSF审批人
-->
<template>
  <div class="aeko-assign">
    <!-- tab 待审批/已审批切换permissionKey-->
    <div class="headerNav-sub">
      <iTabsList type="card" v-model="tab" @tab-click="handleTabClick">
        <el-tab-pane lazy v-for="(item,index) in navList" :key="index" :label="language(item.key, item.name)"
                     :name="item.code"
                     ></el-tab-pane>
      </iTabsList>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import {navList} from '../components/data'
import AKEOPendingPage from "./AKEOPendingPage"
import AKEOApprovedPage from "./AKEOApprovedPage";
import {iTabsList} from 'rise'
import { permissionArray } from "@/utils"


export default {
  components: {
    iTabsList
  },
  data() {
    return {
      tab: '1',
      navList,
    }
  },
  created() {
    // 通过permissionKey(权限)字段过滤tabs
    this.navList = permissionArray('permissionKey',this.navList);
    const {navList} = this;
    if(navList.length == 1){ // 只显示已审批
      if( navList[0].code == '2'){
        this.tab = '2';
        this.$router.replace({
          path:'/aeko/AKEOPageContent/approvelistcsf/AKEOApprovedPage',
        })
      }
      if(navList[0].code == '1'){
        this.tab = '1';
        this.$router.replace({
          path:'/aeko/AKEOPageContent/approvelistcsf/AKEOPendingPage',
        })
      }
    }else{
      if(this.$route.name=='AKEOPendingPage'){
        this.tab='1'
      }
      if(this.$route.name=='AKEOApprovedPage'){
        this.tab='2'
      }
     }


    
  },
  methods: {
    //tab切换
    handleTabClick(tab) {
      let isOutSide = false
      // 外部使用待审批，已审批页面
      if(this.$route.path.indexOf('AKEOPageContent')>-1){
        isOutSide = true
      }

      if (tab.name == '1') {
        this.tab='1'
        if(this.$route.name!='AKEOPendingPage'){
          this.$router.replace({
            path: `/aeko/${isOutSide?'AKEOPageContent':'approve'}/approvelistcsf/AKEOPendingPage`,
          })
        }
      } else if (tab.name == '2') {
        this.tab='2'
        if(this.$route.name!='AKEOApprovedPage'){
          this.$router.replace({
            path: `/aeko/${isOutSide?'AKEOPageContent':'approve'}/approvelistcsf/AKEOApprovedPage`,
          })
        }
      }
    },

  }
}
</script>
<style lang="scss" scoped>
.aeko-assign {
  .aeko-assign-table {
    .cardBody {
      padding: 10px;
    }
  }
}

.icon {
  svg {
    font-size: 24px;
  }
}
</style>
