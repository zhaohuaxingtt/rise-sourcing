<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-09-26 16:47:13
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-27 09:58:16
 * @Description: 审批列表 Commodity审批人/CSF审批人
-->
<template>
  <div class="aeko-assign">
    <!-- tab 待审批/已审批切换 -->
    <div class="headerNav-sub margin-top30">
      <iTabsList type="card" v-model="tab" @tab-click="handleTabClick">
        <el-tab-pane lazy v-for="(item,index) in navList" :key="index" :label="language(item.key, item.name)"
                     :name="item.code"></el-tab-pane>
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
    if(this.$route.name=='AKEOPendingPage'){
      this.tab='1'
    }
    if(this.$route.name=='AKEOApprovedPage'){
      this.tab='2'
    }
  },
  methods: {
    //tab切换
    handleTabClick(tab) {
      console.log(this.$route.name)

      if (tab.name == '1') {
        this.tab='1'
        if(this.$route.name!='AKEOPendingPage'){
          this.$router.replace({
            path: `/aeko/approve/approvelistcsf/AKEOPendingPage`,
          })
        }
      } else if (tab.name == '2') {
        this.tab='2'
        if(this.$route.name!='AKEOApprovedPage'){
          this.$router.replace({
            path: `/aeko/approve/approvelistcsf/AKEOApprovedPage`,
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
